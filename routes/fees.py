from flask import Blueprint, request, jsonify
from config import supabase

fees_bp = Blueprint('fees', __name__)

@fees_bp.route('/fees', methods=['GET'])
def get_fees():
    try:
        res = supabase.table('fees_structure').select('*').order('created_at', desc=False).execute()
        return jsonify({'data': res.data or []}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@fees_bp.route('/fees', methods=['POST'])
def add_fee():
    category = request.form.get('category')
    govt_fees = request.form.get('govt_fees')
    non_govt_fees = request.form.get('non_govt_fees')
    total_amount = request.form.get('total_amount')
    
    if not category:
        return jsonify({'error': 'Category is required'}), 400
        
    data = {
        'category': category,
        'govt_fees': govt_fees,
        'non_govt_fees': non_govt_fees,
        'total_amount': total_amount
    }
    
    try:
        res = supabase.table('fees_structure').insert(data).execute()
        return jsonify({'data': res.data, 'message': 'Fee record added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@fees_bp.route('/fees/<id>', methods=['PATCH'])
def update_fee(id):
    category = request.form.get('category')
    govt_fees = request.form.get('govt_fees')
    non_govt_fees = request.form.get('non_govt_fees')
    total_amount = request.form.get('total_amount')
    
    data = {}
    if category is not None: data['category'] = category
    if govt_fees is not None: data['govt_fees'] = govt_fees
    if non_govt_fees is not None: data['non_govt_fees'] = non_govt_fees
    if total_amount is not None: data['total_amount'] = total_amount
    
    if not data:
        return jsonify({'error': 'No fields provided to update'}), 400
        
    try:
        res = supabase.table('fees_structure').update(data).eq('id', id).execute()
        return jsonify({'data': res.data, 'message': 'Fee record updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@fees_bp.route('/fees/<id>', methods=['DELETE'])
def delete_fee(id):
    try:
        res = supabase.table('fees_structure').delete().eq('id', id).execute()
        return jsonify({'message': 'Fee record deleted successfully', 'data': res.data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
