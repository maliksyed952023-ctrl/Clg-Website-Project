from flask import Blueprint, request, jsonify
from config import supabase, SUPABASE_URL, SUPABASE_KEY
import re
import time
import urllib.request
import urllib.error

images_bp = Blueprint('images', __name__)

# ─── DIRECT HTTP STORAGE UPLOAD (bypasses supabase-py storage client auth bugs) ─
def storage_upload(bucket: str, file_path: str, file_bytes: bytes, content_type: str) -> str:
    """Upload directly to Supabase Storage REST API using service_role key.
    Returns the public URL of the uploaded file."""
    url = f"{SUPABASE_URL}/storage/v1/object/{bucket}/{file_path}"
    req = urllib.request.Request(
        url,
        data=file_bytes,
        method='POST',
        headers={
            'Authorization': f'Bearer {SUPABASE_KEY}',
            'apikey': SUPABASE_KEY,
            'Content-Type': content_type,
            'x-upsert': 'true',  # overwrite if same path exists
        }
    )
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
    role = request.form.get('role', 'admin')
    
    if not slug:
        return jsonify({'error': 'Slug is required'}), 400

    try:
        # 1. Generate unique identifiers
        timestamp = int(time.time() * 1000)
        
        # 2. Upload to Storage via direct HTTP (bypasses supabase-py auth issues)
        safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
        file_path = f"managed/{slug}/{timestamp}_{safe_filename}"
        content_type = file.content_type or 'image/jpeg'
        
        file_content = file.read()
        public_url = storage_upload('images', file_path, file_content, content_type)

        # 3. Insert into database with unique slug suffix
        unique_slug = f"{slug}::{timestamp}"
        
        upsert_data = {
            'slug': unique_slug,
            'url': public_url,
            'category': category,
            'subcategory': subcategory,
            'uploaded_by': uploaded_by,
            'role': 'admin'
        }
        
        db_res = supabase.table('managed_images').insert(upsert_data).execute()
        
        # 4. Sync subcategory/title across all images in the same base slug
        if subcategory:
            supabase.table('managed_images').update({'subcategory': subcategory})\
                .ilike('slug', f"{slug}%").execute()

        return jsonify({'data': db_res.data, 'file_url': public_url, 'title': subcategory}), 200
        
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
        
        # Match current exact or collection-style slugs (e.g., slug::ID)
        if slug:
            query = query.ilike('slug', f"{slug}%")
        if category:
            query = query.eq('category', category)
        if subcategory:
            query = query.eq('subcategory', subcategory)
        
        # ─── ATTEMPT STABLE SORTING ────────────────────────────────────────────────
        try:
            # Order by updated_at Descending so index 0 is always the latest (Latest as Cover)
            # Use 'slug' as a tie-breaker to ensure stable sorting and prevent "random" jumps
            res = query.order('updated_at', desc=True).order('slug', desc=True).execute()
        except Exception as sort_err:
            print(f"[DEBUG] Stable sort failed ({str(sort_err)}). Falling back to basic query.")
            # Fallback: same query with filters but without the specific order that failed
            res = query.execute()
        
        if slug:
            # Filter for: exact slug, collection slug (slug::id), or numbered slot slug (slug_N)
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
        # Global fallback (worst case): fetch all but log error
        res_safe = supabase.table('managed_images').select('*').execute()
        return jsonify({'data': res_safe.data or []}), 200

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
        # 1. Upload to Storage via direct HTTP
        try:
            public_url = storage_upload('images', file_path, file_bytes, content_type)
        except Exception as storage_err:
            print(f"[ERROR] maintenance_request storage upload failed: {storage_err}")
            return jsonify({'error': f'Storage Upload Error: {str(storage_err)}'}), 403

        # 2. Log in pending table
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
            res = supabase.table('pending_image_updates').insert(req_data).execute()
            if hasattr(res, 'error') and res.error:
                return jsonify({'error': f'Database Insert Error: {res.error.message}'}), 403
        except Exception as db_err:
            return jsonify({'error': f'Database Insert Exception: {str(db_err)}'}), 403
            
        return jsonify({'data': res.data, 'message': 'Request submitted for Admin approval'}), 201
        
    except Exception as e:
        return jsonify({'error': f'Unexpected Error: {str(e)}'}), 500

# ─── ADMIN: APPROVE/REJECT REQUESTS ──────────────────────────────────────────
@images_bp.route('/images/requests', methods=['GET'])
def get_image_requests():
    status = request.args.get('status', 'pending')
    res = supabase.table('pending_image_updates').select('*').eq('status', status).execute()
    return jsonify({'data': res.data or []}), 200

@images_bp.route('/images/requests/<id>/approve', methods=['POST'])
def approve_image_request(id):
    try:
        # Fetch the request
        req_res = supabase.table('pending_image_updates').select('*').eq('id', id).execute()
        if not req_res.data:
            return jsonify({'error': 'Request not found'}), 404
        
        req = req_res.data[0]
        
        # Update the live managed_images table
        # Use unique slug suffix
        import time
        unique_slug = f"{req['slug']}::{int(time.time() * 1000)}"
        
        upsert_data = {
            'slug': unique_slug,
            'url': req['suggested_url'],
            'category': req.get('category', 'general'),
            'subcategory': req.get('subcategory', ''),
            'uploaded_by': req.get('submitted_by', 'maintenance'),
            'role': req.get('role', 'maintenance')
        }
        supabase.table('managed_images').insert(upsert_data).execute()
        
        # Mark as approved
        supabase.table('pending_image_updates').update({'status': 'approved'}).eq('id', id).execute()
        
        return jsonify({'message': 'Image approved and live!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@images_bp.route('/images/requests/<id>/reject', methods=['POST'])
def reject_image_request(id):
    body = request.json
    supabase.table('pending_image_updates').update({
        'status': 'rejected',
        'admin_note': body.get('note', 'Rejected by admin')
    }).eq('id', id).execute()
    return jsonify({'message': 'Request rejected'}), 200
    
# ─── ADMIN: DELETE MANAGED IMAGE (ID BASED) ──────────────────────────────────
@images_bp.route('/images/id/<id>', methods=['DELETE'])
def delete_managed_image_by_id(id):
    try:
        # Delete from managed_images table by primary key ID
        res = supabase.table('managed_images').delete().eq('id', id).execute()
        return jsonify({'message': f'Image record {id} removed successfully', 'data': res.data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ─── ADMIN: DELETE MANAGED IMAGE (SLUG BASED - OPTIONAL ALL) ────────────────────
@images_bp.route('/images/<slug>', methods=['DELETE'])
def delete_managed_image(slug):
    try:
        # Delete from managed_images table
        res = supabase.table('managed_images').delete().eq('slug', slug).execute()
        
        # Also check if there's a pending request for this slug and mark it rejected/deleted
        supabase.table('pending_image_updates').delete().eq('slug', slug).eq('status', 'pending').execute()
        
        return jsonify({'message': f'Image slot {slug} cleared successfully', 'data': res.data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
