from config import supabase

try:
    response = supabase.table('profiles').select('count', count='exact').execute()
    print("Found 'profiles' table.")
except Exception as e:
    print(f"Error accessing 'profiles': {e}")

try:
    response = supabase.table('user_roles').select('count', count='exact').execute()
    print("Found 'user_roles' table.")
except Exception as e:
    print(f"Error accessing 'user_roles': {e}")
