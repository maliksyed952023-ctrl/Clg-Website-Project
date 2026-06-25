from flask import Blueprint, request, jsonify
from config import supabase

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/settings', methods=['GET'])
def get_settings():
    key = request.args.get('key')
    try:
        if key:
            res = supabase.table('website_settings').select('*').eq('key', key).single().execute()
            return jsonify({'data': res.data}), 200
        else:
            res = supabase.table('website_settings').select('*').execute()
            return jsonify({'data': res.data or []}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@settings_bp.route('/settings', methods=['POST'])
def update_setting():
    body = request.json
    key = body.get('key')
    value = body.get('value')
    
    if not key:
        return jsonify({'error': 'Key is required'}), 400
        
    try:
        # Upsert logic: check if exists, then update or insert
        res = supabase.table('website_settings').upsert({'key': key, 'value': value}).execute()
        return jsonify({'data': res.data, 'message': f'Setting {key} updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
