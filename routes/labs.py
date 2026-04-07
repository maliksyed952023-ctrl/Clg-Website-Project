from flask import Blueprint, request, jsonify
from config import supabase
from routes.images import db_insert, db_update, db_delete

labs_bp = Blueprint('labs', __name__)

@labs_bp.route('/labs', methods=['GET'])
def get_labs():
    department = request.args.get('department')
    try:
        query = supabase.table('department_labs').select('*')
        if department:
            query = query.eq('department', department)
        res = query.order('created_at', desc=False).execute()
        return jsonify({'data': res.data or []}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@labs_bp.route('/labs', methods=['POST'])
def add_lab():
    body = request.json or {}
    department = body.get('department')
    name = body.get('name')
    equipment = body.get('equipment', '')
    
    if not department or not name:
        return jsonify({'error': 'Missing required fields (department, name)'}), 400
        
    data = {
        'department': department,
        'name': name,
        'equipment': equipment
    }
    
    try:
        result = db_insert('department_labs', data)
        return jsonify({'data': result, 'message': 'Lab added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@labs_bp.route('/labs/<id>', methods=['PATCH'])
def update_lab(id):
    body = request.json or {}
    department = body.get('department')
    name = body.get('name')
    equipment = body.get('equipment')
    
    data = {}
    if department is not None: data['department'] = department
    if name is not None: data['name'] = name
    if equipment is not None: data['equipment'] = equipment
    
    if not data:
        return jsonify({'error': 'No fields provided to update'}), 400
        
    try:
        result = db_update('department_labs', data, {'id': id})
        return jsonify({'data': result, 'message': 'Lab updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@labs_bp.route('/labs/<id>', methods=['DELETE'])
def delete_lab(id):
    try:
        result = db_delete('department_labs', {'id': id})
        return jsonify({'message': 'Lab deleted successfully', 'data': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
