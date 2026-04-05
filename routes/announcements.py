from flask import Blueprint, request, jsonify
from config import supabase
import re

announcements_bp = Blueprint('announcements', __name__)

VALID_CATEGORIES = [
    'news_event',
    'tender',
    'notice',
    'notice_tpo',
    'notice_admission',
    'notice_examination',
    'notice_department',
    'notice_student',
    # Department-specific notice boards
    'notice_dept_aiml',
    'notice_dept_auto',
    'notice_dept_civil',
    'notice_dept_computer',
    'notice_dept_ddgm',
    'notice_dept_electrical',
    'notice_dept_entc',
    'notice_dept_it',
    'notice_dept_mechanical',
    'notice_dept_science_humanities',
    'notice_dept_applied_mechanics',
    'notice_dept_workshop',
    'notice_dept_mercedes_benz',
]

# All individual department categories
ALL_DEPT_CATEGORIES = [
    'notice_dept_aiml',
    'notice_dept_auto',
    'notice_dept_civil',
    'notice_dept_computer',
    'notice_dept_ddgm',
    'notice_dept_electrical',
    'notice_dept_entc',
    'notice_dept_it',
    'notice_dept_mechanical',
    'notice_dept_science_humanities',
    'notice_dept_applied_mechanics',
    'notice_dept_workshop',
    'notice_dept_mercedes_benz',
]

# ─── GET ALL (with optional category filter) ───────────────────────────────────
@announcements_bp.route('/announcements', methods=['GET'])
def get_announcements():
    category = request.args.get('category')

    response = supabase.table('announcements').select('*').eq('is_active', True).order('published_at', desc=True).execute()
    all_data = response.data or []

    if category:
        # If filtering by a specific dept category, also include notice_department records
        if category in ALL_DEPT_CATEGORIES:
            all_data = [
                r for r in all_data
                if category in (r.get('categories') or [])
                or r.get('category') == category
                or 'notice_department' in (r.get('categories') or [])
                or r.get('category') == 'notice_department'
            ]
        else:
            all_data = [
                r for r in all_data
                if category in (r.get('categories') or [])
                or r.get('category') == category
            ]

    return jsonify({ 'data': all_data }), 200


# ─── GET SINGLE ────────────────────────────────────────────────────────────────
@announcements_bp.route('/announcements/<id>', methods=['GET'])
def get_announcement(id):
    response = supabase.table('announcements').select('*').eq('id', id).single().execute()

    if not response.data:
        return jsonify({ 'error': 'Not found' }), 404

    return jsonify({ 'data': response.data }), 200


# ─── CREATE ────────────────────────────────────────────────────────────────────
@announcements_bp.route('/announcements', methods=['POST'])
def create_announcement():
    body = request.json

    # Support both single category (old) and multiple categories (new)
    categories = body.get('categories', [])
    if not categories and body.get('category'):
        categories = [body['category']]

    if not body.get('title') or not categories:
        return jsonify({ 'error': 'title and at least one category are required' }), 400

    for cat in categories:
        if cat not in VALID_CATEGORIES:
            return jsonify({ 'error': f'Invalid category: {cat}. Must be one of {VALID_CATEGORIES}' }), 400

    data = {
        'title':       body['title'],
        'description': body.get('description'),
        'category':    categories[0],   # keep for backward compat
        'categories':  categories,
        'file_url':    body.get('file_url'),
        'is_active':   body.get('is_active', True),
        'expires_at':  body.get('expires_at'),
        'created_by':  body.get('created_by'),
    }

    response = supabase.table('announcements').insert(data).execute()
    return jsonify({ 'data': response.data }), 201


# ─── UPDATE ────────────────────────────────────────────────────────────────────
@announcements_bp.route('/announcements/<id>', methods=['PUT'])
def update_announcement(id):
    body = request.json

    # Sync category field if categories array is being updated
    if 'categories' in body and body['categories']:
        body['category'] = body['categories'][0]

    response = supabase.table('announcements').update(body).eq('id', id).execute()

    if not response.data:
        return jsonify({ 'error': 'Not found or nothing updated' }), 404

    return jsonify({ 'data': response.data }), 200


# ─── DELETE (soft delete — sets is_active = false) ────────────────────────────
@announcements_bp.route('/announcements/<id>', methods=['DELETE'])
def delete_announcement(id):
    response = supabase.table('announcements').update({ 'is_active': False }).eq('id', id).execute()
    return jsonify({ 'message': 'Deleted successfully' }), 200


# ─── FILE UPLOAD ───────────────────────────────────────────────────────────────
@announcements_bp.route('/announcements/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({ 'error': 'No file provided' }), 400

    file = request.files['file']

    if not file.filename.lower().endswith('.pdf'):
        return jsonify({ 'error': 'Only PDF files are allowed' }), 400

    category = request.form.get('category', 'general')

    file_bytes = file.read()
    safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
    file_path = f"{category}/{safe_filename}"

    response = supabase.storage.from_('announcements-files').upload(
        path=file_path,
        file=file_bytes,
        file_options={ 'contentType': file.content_type or 'application/pdf' }
    )

    # Build public URL
    public_url = supabase.storage.from_('announcements-files').get_public_url(file_path)
    return jsonify({ 'file_url': public_url }), 200