from flask import Blueprint, request, jsonify
from config import supabase
import re

pending_bp = Blueprint('pending', __name__)

VALID_CATEGORIES = [
    'news_event', 'tender', 'notice',
    'notice_tpo', 'notice_admission', 'notice_examination',
    'notice_department', 'notice_student',
    'notice_dept_aiml', 'notice_dept_auto', 'notice_dept_civil',
    'notice_dept_computer', 'notice_dept_ddgm', 'notice_dept_electrical',
    'notice_dept_entc', 'notice_dept_it', 'notice_dept_mechanical',
    'notice_dept_science_humanities', 'notice_dept_applied_mechanics',
    'notice_dept_workshop', 'notice_dept_mercedes_benz',
]


# ─── FILE UPLOAD ── must be BEFORE /<id> routes ───────────────────────────────
@pending_bp.route('/pending/upload', methods=['POST'])
def upload_pending_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({'error': 'Only PDF files are allowed'}), 400

    category = request.form.get('category', 'general')
    file_bytes = file.read()
    safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
    file_path = f"pending/{category}/{safe_filename}"

    supabase.storage.from_('announcements-files').upload(
        path=file_path,
        file=file_bytes,
        file_options={'content-type': file.content_type}
    )

    public_url = supabase.storage.from_('announcements-files').get_public_url(file_path)
    return jsonify({'file_url': public_url}), 200


# ─── GET ALL (maintenance dashboard) ── must be BEFORE /<id> routes ──────────
@pending_bp.route('/pending/all', methods=['GET'])
def get_all_pending():
    response = supabase.table('pending_announcements') \
        .select('*') \
        .order('created_at', desc=True) \
        .execute()
    return jsonify({'data': response.data or []}), 200


# ─── SUBMIT REQUEST (maintenance user) ────────────────────────────────────────
@pending_bp.route('/pending', methods=['POST'])
def submit_pending():
    body = request.get_json(force=True, silent=True) or {}

    categories = body.get('categories', [])
    if not categories and body.get('category'):
        categories = [body['category']]

    if not body.get('title') or not categories:
        return jsonify({'error': 'title and at least one category are required'}), 400

    for cat in categories:
        if cat not in VALID_CATEGORIES:
            return jsonify({'error': f'Invalid category: {cat}'}), 400

    data = {
        'title':        body['title'],
        'description':  body.get('description'),
        'category':     categories[0],
        'categories':   categories,
        'file_url':     body.get('file_url'),
        'expires_at':   body.get('expires_at'),
        'submitted_by': body.get('submitted_by', 'maintenance'),
        'status':       'pending',
        'admin_note':   None,
    }

    response = supabase.table('pending_announcements').insert(data).execute()
    return jsonify({'data': response.data}), 201


# ─── GET ALL PENDING (admin sees these) ───────────────────────────────────────
@pending_bp.route('/pending', methods=['GET'])
def get_pending():
    status = request.args.get('status', 'pending')
    response = supabase.table('pending_announcements') \
        .select('*') \
        .eq('status', status) \
        .order('created_at', desc=True) \
        .execute()
    return jsonify({'data': response.data or []}), 200


# ─── APPROVE ──────────────────────────────────────────────────────────────────
@pending_bp.route('/pending/<id>/approve', methods=['POST'])
def approve_pending(id):
    body = request.get_json(force=True, silent=True) or {}

    print(f"[APPROVE] id={id}")

    # Fetch the pending record
    try:
        pending_res = supabase.table('pending_announcements') \
            .select('*').eq('id', id).execute()

        if not pending_res.data or len(pending_res.data) == 0:
            return jsonify({'error': 'Pending request not found'}), 404

        rec = pending_res.data[0]
        print(f"[APPROVE] record title={rec.get('title')}")

    except Exception as e:
        print(f"[APPROVE] Fetch error: {e}")
        return jsonify({'error': f'Fetch error: {str(e)}'}), 500

    # Copy to announcements table
    try:
        cats = rec.get('categories') or []
        if not cats and rec.get('category'):
            cats = [rec['category']]

        announcement_data = {
            'title':       rec['title'],
            'description': rec.get('description'),
            'category':    rec['category'],
            'categories':  cats,
            'file_url':    rec.get('file_url'),
            'expires_at':  rec.get('expires_at'),
            'is_active':   True,
            'created_by':  rec.get('submitted_by'),
        }

        insert_res = supabase.table('announcements').insert(announcement_data).execute()
        print(f"[APPROVE] Inserted to announcements: {insert_res.data}")

    except Exception as e:
        print(f"[APPROVE] Insert error: {e}")
        return jsonify({'error': f'Insert error: {str(e)}'}), 500

    # Mark as approved
    try:
        supabase.table('pending_announcements').update({
            'status':     'approved',
            'admin_note': body.get('note', ''),
        }).eq('id', id).execute()

    except Exception as e:
        print(f"[APPROVE] Update status error: {e}")

    return jsonify({'message': 'Approved and published successfully'}), 200


# ─── REJECT ───────────────────────────────────────────────────────────────────
@pending_bp.route('/pending/<id>/reject', methods=['POST'])
def reject_pending(id):
    body = request.get_json(force=True, silent=True) or {}

    note = body.get('note', '')
    if not note:
        return jsonify({'error': 'Please provide a reason for rejection'}), 400

    try:
        response = supabase.table('pending_announcements').update({
            'status':     'rejected',
            'admin_note': note,
        }).eq('id', id).execute()

        if not response.data:
            return jsonify({'error': 'Pending request not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Request rejected'}), 200


# ─── DELETE PENDING ───────────────────────────────────────────────────────────
@pending_bp.route('/pending/<id>', methods=['DELETE'])
def delete_pending(id):
    supabase.table('pending_announcements').delete().eq('id', id).execute()
    return jsonify({'message': 'Deleted'}), 200