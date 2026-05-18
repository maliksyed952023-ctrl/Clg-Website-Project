from flask import Blueprint, jsonify, request
from config import supabase

visitors_bp = Blueprint('visitors', __name__)

@visitors_bp.route('/visitors/increment', methods=['POST'])
def increment_visitor():
    try:
        # Fetch current count
        res = supabase.table('website_settings').select('*').eq('key', 'visitor_count').execute()
        
        if res.data and len(res.data) > 0:
            current_count = int(res.data[0].get('value', 156947))
            new_count = current_count + 1
            # Update
            supabase.table('website_settings').update({'value': str(new_count)}).eq('key', 'visitor_count').execute()
        else:
            # Insert if doesn't exist
            new_count = 156948
            supabase.table('website_settings').insert({'key': 'visitor_count', 'value': str(new_count)}).execute()
            
        return jsonify({'count': new_count}), 200
    except Exception as e:
        print(f"Error incrementing visitor count: {e}")
        return jsonify({'error': 'Failed to increment', 'count': 156947}), 500

@visitors_bp.route('/visitors', methods=['GET'])
def get_visitors():
    try:
        res = supabase.table('website_settings').select('*').eq('key', 'visitor_count').execute()
        if res.data and len(res.data) > 0:
            count = int(res.data[0].get('value', 156947))
        else:
            count = 156947
        return jsonify({'count': count}), 200
    except Exception as e:
        return jsonify({'count': 156947}), 500
