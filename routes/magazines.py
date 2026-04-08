from flask import Blueprint, request, jsonify
from config import supabase
from routes.images import storage_upload, db_insert, db_update, db_delete
import time
import re

magazines_bp = Blueprint('magazines', __name__)

@magazines_bp.route('/magazines', methods=['GET'])
def get_magazines():
    dept_slug = request.args.get('dept_slug')
    try:
        query = supabase.table('department_magazines').select('*')
        if dept_slug:
            query = query.eq('dept_slug', dept_slug)
        res = query.order('created_at', desc=True).execute()
        return jsonify({'data': res.data or []}), 200
    except Exception as e:
        # Fallback to empty if table doesn't exist yet
        print(f"[DEBUG] get_magazines error: {e}")
        return jsonify({'data': [], 'error': str(e)}), 200

@magazines_bp.route('/magazines', methods=['POST'])
def add_magazine():
    dept_slug = request.form.get('dept_slug')
    name = request.form.get('name')
    
    if not dept_slug or not name:
        return jsonify({'error': 'Missing required fields (dept_slug, name)'}), 400
        
    file_url = None
    
    if 'file' in request.files:
        file = request.files['file']
        if file.filename:
            try:
                timestamp = int(time.time() * 1000)
                safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
                # Store in 'magazines' folder within 'images' bucket
                file_path = f"magazines/{dept_slug}_{timestamp}_{safe_filename}"
                content_type = file.content_type or 'application/pdf'
                file_url = storage_upload('images', file_path, file.read(), content_type)
            except Exception as e:
                print(f"[ERROR] Magazine upload failed: {e}")
                return jsonify({'error': f'Storage upload failed: {str(e)}'}), 500
    else:
        return jsonify({'error': 'File is required'}), 400
                
    data = {
        'dept_slug': dept_slug,
        'name': name,
        'file_url': file_url
    }
    
    if 'thumbnail' in request.files:
        thumb = request.files['thumbnail']
        if thumb.filename:
            try:
                timestamp = int(time.time() * 1000)
                thumb_path = f"magazines/thumbnails/{dept_slug}_{timestamp}_thumb.webp"
                thumb_url = storage_upload('images', thumb_path, thumb.read(), 'image/webp')
                data['thumbnail_url'] = thumb_url
            except Exception as e:
                print(f"[WARNING] Thumbnail upload failed: {e}")
    
    try:
        result = db_insert('department_magazines', data)
        return jsonify({'data': result, 'message': 'Magazine added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@magazines_bp.route('/magazines/<id>', methods=['PATCH'])
def update_magazine(id):
    dept_slug = request.form.get('dept_slug')
    name = request.form.get('name')
    
    data = {}
    if dept_slug is not None: data['dept_slug'] = dept_slug
    if name is not None: data['name'] = name
        
    if 'file' in request.files:
        file = request.files['file']
        if file.filename:
            try:
                timestamp = int(time.time() * 1000)
                safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
                target_dept = dept_slug or 'general'
                file_path = f"magazines/{target_dept}_{timestamp}_{safe_filename}"
                content_type = file.content_type or 'application/pdf'
                file_url = storage_upload('images', file_path, file.read(), content_type)
                data['file_url'] = file_url
            except Exception as e:
                print(f"[ERROR] Magazine update failed: {e}")
                return jsonify({'error': f'Storage upload failed: {str(e)}'}), 500
                
    if 'thumbnail' in request.files:
        thumb = request.files['thumbnail']
        if thumb.filename:
            try:
                timestamp = int(time.time() * 1000)
                target_dept = dept_slug or 'general'
                thumb_path = f"magazines/thumbnails/{target_dept}_{timestamp}_thumb.webp"
                thumb_url = storage_upload('images', thumb_path, thumb.read(), 'image/webp')
                data['thumbnail_url'] = thumb_url
            except Exception as e:
                print(f"[WARNING] Thumbnail update failed: {e}")
                
    if not data:
        return jsonify({'error': 'No fields provided to update'}), 400
        
    try:
        result = db_update('department_magazines', data, {'id': id})
        return jsonify({'data': result, 'message': 'Magazine updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@magazines_bp.route('/magazines/<id>', methods=['DELETE'])
def delete_magazine(id):
    try:
        result = db_delete('department_magazines', {'id': id})
        return jsonify({'message': 'Magazine deleted successfully', 'data': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
