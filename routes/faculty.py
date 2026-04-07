from flask import Blueprint, request, jsonify
from config import supabase, SUPABASE_URL, SUPABASE_KEY
from routes.images import storage_upload, db_insert, db_update, db_delete
import time
import re

faculty_bp = Blueprint('faculty', __name__)

@faculty_bp.route('/faculty', methods=['GET'])
def get_faculty():
    department = request.args.get('department')
    try:
        query = supabase.table('faculty_members').select('*')
        if department:
            query = query.eq('department', department)
        # We order by created_at so they appear in insertion order
        res = query.order('created_at', desc=False).execute()
        return jsonify({'data': res.data or []}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@faculty_bp.route('/faculty', methods=['POST'])
def add_faculty():
    department = request.form.get('department')
    name = request.form.get('name')
    designation = request.form.get('designation')
    contact_no = request.form.get('contact_no', '')
    email = request.form.get('email', '')
    
    if not department or not name or not designation:
        return jsonify({'error': 'Missing required fields (department, name, designation)'}), 400
        
    photo_url = "/static/images/director4.jpg"  # default photo fallback
    
    if 'file' in request.files:
        file = request.files['file']
        if file.filename:
            try:
                timestamp = int(time.time() * 1000)
                safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
                file_path = f"faculty/{department}_{timestamp}_{safe_filename}"
                content_type = file.content_type or 'image/jpeg'
                photo_url = storage_upload('images', file_path, file.read(), content_type)
            except Exception as e:
                print(f"[ERROR] Faculty photo upload failed: {e}")
                
    data = {
        'department': department,
        'name': name,
        'designation': designation,
        'contact_no': contact_no,
        'email': email,
        'photo_url': photo_url
    }
    
    try:
        result = db_insert('faculty_members', data)
        return jsonify({'data': result, 'message': 'Faculty added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@faculty_bp.route('/faculty/<id>', methods=['PATCH'])
def update_faculty(id):
    department = request.form.get('department')
    name = request.form.get('name')
    designation = request.form.get('designation')
    contact_no = request.form.get('contact_no')
    email = request.form.get('email')
    
    data = {}
    if department: data['department'] = department
    if name: data['name'] = name
    if designation: data['designation'] = designation
    if contact_no is not None: data['contact_no'] = contact_no
    if email is not None: data['email'] = email
    
    if 'file' in request.files:
        file = request.files['file']
        if file.filename:
            try:
                timestamp = int(time.time() * 1000)
                safe_filename = re.sub(r'[^a-zA-Z0-9._-]', '_', file.filename)
                folder = department or 'faculty'
                file_path = f"faculty/{folder}_{timestamp}_{safe_filename}"
                content_type = file.content_type or 'image/jpeg'
                photo_url = storage_upload('images', file_path, file.read(), content_type)
                data['photo_url'] = photo_url
            except Exception as e:
                print(f"[ERROR] Faculty photo update failed: {e}")
                
    if not data:
        return jsonify({'error': 'No fields provided to update'}), 400
        
    try:
        result = db_update('faculty_members', data, {'id': id})
        return jsonify({'data': result, 'message': 'Faculty updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@faculty_bp.route('/faculty/<id>', methods=['DELETE'])
def delete_faculty(id):
    try:
        result = db_delete('faculty_members', {'id': id})
        return jsonify({'message': 'Faculty deleted successfully', 'data': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
