from flask import Blueprint, request, jsonify
from config import supabase

auth_bp = Blueprint('auth', __name__)

# ── LOGIN ──────────────────────────────────────────────────────────────────────
@auth_bp.route('/auth/login', methods=['POST'])
def login():
    body     = request.json
    email    = body.get('email')
    password = body.get('password')

    if not email or not password:
        return jsonify({ 'error': 'Email and password are required' }), 400

    try:
        # Authenticate with Supabase
        res = supabase.auth.sign_in_with_password({ 'email': email, 'password': password })

        user_id    = res.user.id
        user_email = res.user.email

        print(f"[LOGIN] user_id={user_id}, email={user_email}")

        # Fetch role from profiles table using user_id
        role = 'admin'  # safe default
        try:
            profile_res = supabase.table('profiles') \
                .select('role') \
                .eq('id', user_id) \
                .execute()

            print(f"[LOGIN] profile_res.data = {profile_res.data}")

            if profile_res.data and len(profile_res.data) > 0:
                fetched_role = profile_res.data[0].get('role')
                if fetched_role:
                    role = fetched_role

        except Exception as profile_err:
            print(f"[LOGIN] Profile fetch error: {profile_err}")
            role = 'admin'

        print(f"[LOGIN] Final role = {role}")

        return jsonify({
            'access_token': res.session.access_token,
            'user': {
                'id':    user_id,
                'email': user_email,
                'role':  role,
            }
        }), 200

    except Exception as e:
        print(f"[LOGIN] Auth error: {str(e)}")
        return jsonify({ 'error': 'Invalid email or password' }), 401


# ── LOGOUT ─────────────────────────────────────────────────────────────────────
@auth_bp.route('/auth/logout', methods=['POST'])
def logout():
    return jsonify({ 'message': 'Logged out' }), 200