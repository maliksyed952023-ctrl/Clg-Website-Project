from flask import Blueprint, request, jsonify
from config import supabase
from routes.images import storage_upload, db_insert, db_update, db_delete
import time
import re

downloads_bp = Blueprint('downloads', __name__)

@downloads_bp.route('/downloads', methods=['GET'])
def get_downloads():
    section = request.args.get('section')
    try:
        query = supabase.table('portal_downloads').select('*')
        if section:
            query = query.eq('section', section)
        res = query.order('created_at', desc=False).execute()
        return jsonify({'data': res.data or []}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@downloads_bp.route('/downloads', methods=['POST'])
def add_download():
    section = request.form.get('section')
    name = request.form.get('name')
    external_link = request.form.get('external_link', '')
    
    if not section or not name:
        return jsonify({'error': 'Missing required fields (section, name)'}), 400
        
    file_url = None
    
    if 'file' in request.files:
        file = request.files['file']
        if file.filename:
            try:
                timestamp = int(time.time() * 1000)
                safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
                file_path = f"downloads/{section}_{timestamp}_{safe_filename}"
                content_type = file.content_type or 'application/pdf'
                file_url = storage_upload('images', file_path, file.read(), content_type)
            except Exception as e:
                print(f"[ERROR] Document upload failed: {e}")
                return jsonify({'error': f'Storage upload failed: {str(e)}'}), 500
                
    data = {
        'section': section,
        'name': name,
        'file_url': file_url,
        'external_link': external_link if section in ['admission', 'exam'] else ''
    }
    
    try:
        result = db_insert('portal_downloads', data)
        return jsonify({'data': result, 'message': 'Download added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@downloads_bp.route('/downloads/<id>', methods=['PATCH'])
def update_download(id):
    section = request.form.get('section')
    name = request.form.get('name')
    external_link = request.form.get('external_link')
    
    data = {}
    if section is not None: data['section'] = section
    if name is not None: data['name'] = name
    if external_link is not None: 
        # Only admission and exam can have external_link
        data['external_link'] = external_link
        
    if 'file' in request.files:
        file = request.files['file']
        if file.filename:
            try:
                timestamp = int(time.time() * 1000)
                safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
                target_section = section or 'general'
                file_path = f"downloads/{target_section}_{timestamp}_{safe_filename}"
                content_type = file.content_type or 'application/pdf'
                file_url = storage_upload('images', file_path, file.read(), content_type)
                data['file_url'] = file_url
            except Exception as e:
                print(f"[ERROR] Document update failed: {e}")
                return jsonify({'error': f'Storage upload failed: {str(e)}'}), 500
                
    if not data:
        return jsonify({'error': 'No fields provided to update'}), 400
        
    try:
        result = db_update('portal_downloads', data, {'id': id})
        return jsonify({'data': result, 'message': 'Download updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@downloads_bp.route('/downloads/<id>', methods=['DELETE'])
def delete_download(id):
    try:
        result = db_delete('portal_downloads', {'id': id})
        return jsonify({'message': 'Download deleted successfully', 'data': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
