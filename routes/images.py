from flask import Blueprint, request, jsonify
from config import supabase, SUPABASE_URL, SUPABASE_KEY
import re
import time
import json
import urllib.request
import urllib.error

images_bp = Blueprint('images', __name__)

# ─── SHARED HEADERS (service_role key bypasses RLS) ──────────────────────────
def _service_headers(content_type='application/json'):
    return {
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'apikey': SUPABASE_KEY,
        'Content-Type': content_type,
        'Prefer': 'return=representation',
    }

# ─── DIRECT HTTP DB HELPER ────────────────────────────────────────────────────
def db_insert(table: str, data: dict) -> list:
    """Insert a row via Supabase REST API (bypasses RLS with service_role key)."""
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    body = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=body, method='POST', headers=_service_headers())
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        body_err = e.read().decode('utf-8', errors='replace')
        raise Exception(f"DB Insert HTTP {e.code}: {body_err}")

def db_update(table: str, data: dict, filters: dict) -> list:
    """Update rows via Supabase REST API (bypasses RLS with service_role key)."""
    params = '&'.join([f"{k}=eq.{v}" for k, v in filters.items()])
    url = f"{SUPABASE_URL}/rest/v1/{table}?{params}"
    body = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=body, method='PATCH', headers=_service_headers())
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        body_err = e.read().decode('utf-8', errors='replace')
        raise Exception(f"DB Update HTTP {e.code}: {body_err}")

def db_delete(table: str, filters: dict) -> list:
    """Delete rows via Supabase REST API (bypasses RLS with service_role key)."""
    params = '&'.join([f"{k}=eq.{v}" for k, v in filters.items()])
    url = f"{SUPABASE_URL}/rest/v1/{table}?{params}"
    req = urllib.request.Request(url, method='DELETE', headers=_service_headers())
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode('utf-8')
            return json.loads(raw) if raw else []
    except urllib.error.HTTPError as e:
        body_err = e.read().decode('utf-8', errors='replace')
        raise Exception(f"DB Delete HTTP {e.code}: {body_err}")

# ─── DIRECT HTTP STORAGE UPLOAD (bypasses supabase-py storage client auth bugs) ─
def storage_upload(bucket: str, file_path: str, file_bytes: bytes, content_type: str) -> str:
    """Upload directly to Supabase Storage REST API using service_role key.
    Returns the public URL of the uploaded file."""
    url = f"{SUPABASE_URL}/storage/v1/object/{bucket}/{file_path}"
    headers = {
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'apikey': SUPABASE_KEY,
        'Content-Type': content_type,
        'x-upsert': 'true',
    }
    req = urllib.request.Request(url, data=file_bytes, method='POST', headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            pass  # success (200/201)
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        raise Exception(f"Storage HTTP {e.code}: {body}")

    public_url = f"{SUPABASE_URL}/storage/v1/object/public/{bucket}/{file_path}"
    return public_url

# ─── ADMIN: DIRECT UPLOAD OR MANUAL UPDATE ────────────────────────────────────
@images_bp.route('/images/upload', methods=['POST'])
def admin_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    slug = request.form.get('slug')
    category = request.form.get('category', 'general')
    subcategory = request.form.get('subcategory', '')
    uploaded_by = request.form.get('uploaded_by', 'admin')

    if not slug:
        return jsonify({'error': 'Slug is required'}), 400

    try:
        # 1. Generate unique identifiers
        timestamp = int(time.time() * 1000)

        # 2. Upload to Storage via direct HTTP
        safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
        file_path = f"managed/{slug}/{timestamp}_{safe_filename}"
        content_type = file.content_type or 'image/jpeg'

        file_content = file.read()
        public_url = storage_upload('images', file_path, file_content, content_type)

        # 3. Insert into database via direct HTTP (bypasses RLS)
        unique_slug = f"{slug}::{timestamp}"
        insert_data = {
            'slug': unique_slug,
            'url': public_url,
            'category': category,
            'subcategory': subcategory,
            'uploaded_by': uploaded_by,
            'role': 'admin'
        }
        db_result = db_insert('managed_images', insert_data)

        # 4. Sync subcategory/title across all images in the same base slug
        if subcategory:
            # Use ilike via query param for REST API
            sync_url = f"{SUPABASE_URL}/rest/v1/managed_images?slug=ilike.{slug}%25"
            sync_body = json.dumps({'subcategory': subcategory}).encode('utf-8')
            sync_req = urllib.request.Request(sync_url, data=sync_body, method='PATCH', headers=_service_headers())
            try:
                with urllib.request.urlopen(sync_req) as r:
                    pass
            except Exception:
                pass  # Non-critical — don't fail the upload for this

        return jsonify({'data': db_result, 'file_url': public_url, 'title': subcategory}), 200

    except Exception as e:
        print(f"[ERROR] admin_upload failed: {type(e).__name__}: {e}")
        return jsonify({'error': str(e)}), 500

# ─── FETCH IMAGES ─────────────────────────────────────────────────────────────
@images_bp.route('/images', methods=['GET'])
def get_images():
    slug = request.args.get('slug')
    category = request.args.get('category')
    subcategory = request.args.get('subcategory')

    try:
        query = supabase.table('managed_images').select('*')

        if slug:
            query = query.ilike('slug', f"{slug}%")
        if category:
            query = query.eq('category', category)
        if subcategory:
            query = query.eq('subcategory', subcategory)

        try:
            res = query.order('updated_at', desc=True).order('slug', desc=True).execute()
        except Exception as sort_err:
            print(f"[DEBUG] Stable sort failed ({str(sort_err)}). Falling back to basic query.")
            res = query.execute()

        if slug:
            filtered_data = [
                d for d in (res.data or [])
                if d['slug'] == slug
                or d['slug'].startswith(f"{slug}::")
                or d['slug'].startswith(f"{slug}_")
            ]
            return jsonify({'data': filtered_data}), 200

        return jsonify({'data': res.data or []}), 200
    except Exception as e:
        print(f"[ERROR] get_images reached outer fallback: {str(e)}")
        res_safe = supabase.table('managed_images').select('*').execute()
        return jsonify({'data': res_safe.data or []}), 200

# ─── MAINTENANCE: SUBMIT IMAGE REQUEST ────────────────────────────────────────
@images_bp.route('/images/request', methods=['POST'])
def maintenance_request():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    slug = request.form.get('slug')
    category = request.form.get('category', 'general')
    subcategory = request.form.get('subcategory', '')
    submitted_by = request.form.get('submitted_by', 'maintenance')
    role = request.form.get('role', 'maintenance')

    if not slug:
        return jsonify({'error': 'Slug is required'}), 400

    file_bytes = file.read()
    safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
    file_path = f"requests/{slug}_{safe_filename}"
    content_type = file.content_type or 'application/octet-stream'

    try:
        # 1. Upload to Storage
        try:
            public_url = storage_upload('images', file_path, file_bytes, content_type)
        except Exception as storage_err:
            print(f"[ERROR] maintenance_request storage upload failed: {storage_err}")
            return jsonify({'error': f'Storage Upload Error: {str(storage_err)}'}), 403

        # 2. Log in pending table via direct HTTP
        req_data = {
            'slug': slug,
            'suggested_url': public_url,
            'category': category,
            'subcategory': subcategory,
            'submitted_by': submitted_by,
            'role': role,
            'status': 'pending'
        }
        try:
            result = db_insert('pending_image_updates', req_data)
        except Exception as db_err:
            return jsonify({'error': f'Database Insert Exception: {str(db_err)}'}), 403

        return jsonify({'data': result, 'message': 'Request submitted for Admin approval'}), 201

    except Exception as e:
        return jsonify({'error': f'Unexpected Error: {str(e)}'}), 500

# ─── ADMIN: GET PENDING REQUESTS ──────────────────────────────────────────────
@images_bp.route('/images/requests', methods=['GET'])
def get_image_requests():
    status = request.args.get('status', 'pending')
    res = supabase.table('pending_image_updates').select('*').eq('status', status).execute()
    return jsonify({'data': res.data or []}), 200

# ─── ADMIN: APPROVE REQUEST ───────────────────────────────────────────────────
@images_bp.route('/images/requests/<id>/approve', methods=['POST'])
def approve_image_request(id):
    try:
        req_res = supabase.table('pending_image_updates').select('*').eq('id', id).execute()
        if not req_res.data:
            return jsonify({'error': 'Request not found'}), 404

        req = req_res.data[0]
        unique_slug = f"{req['slug']}::{int(time.time() * 1000)}"

        upsert_data = {
            'slug': unique_slug,
            'url': req['suggested_url'],
            'category': req.get('category', 'general'),
            'subcategory': req.get('subcategory', ''),
            'uploaded_by': req.get('submitted_by', 'maintenance'),
            'role': req.get('role', 'maintenance')
        }
        db_insert('managed_images', upsert_data)
        db_update('pending_image_updates', {'status': 'approved'}, {'id': id})

        return jsonify({'message': 'Image approved and live!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ─── ADMIN: REJECT REQUEST ────────────────────────────────────────────────────
@images_bp.route('/images/requests/<id>/reject', methods=['POST'])
def reject_image_request(id):
    body = request.json or {}
    db_update('pending_image_updates', {
        'status': 'rejected',
        'admin_note': body.get('note', 'Rejected by admin')
    }, {'id': id})
    return jsonify({'message': 'Request rejected'}), 200

# ─── ADMIN: DELETE MANAGED IMAGE (ID BASED) ──────────────────────────────────
@images_bp.route('/images/id/<id>', methods=['DELETE'])
def delete_managed_image_by_id(id):
    try:
        result = db_delete('managed_images', {'id': id})
        return jsonify({'message': f'Image record {id} removed successfully', 'data': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ─── ADMIN: DELETE MANAGED IMAGE (SLUG BASED) ────────────────────────────────
@images_bp.route('/images/<slug>', methods=['DELETE'])
def delete_managed_image(slug):
    try:
        result = db_delete('managed_images', {'slug': slug})
        # Also clean up any pending requests for this slug
        try:
            db_delete('pending_image_updates', {'slug': slug, 'status': 'pending'})
        except Exception:
            pass  # Non-critical
        return jsonify({'message': f'Image slot {slug} cleared successfully', 'data': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
