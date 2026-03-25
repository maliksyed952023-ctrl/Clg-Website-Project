from config import supabase

print("--- Profiles ---")
try:
    res = supabase.table('profiles').select('*').execute()
    print(res.data)
except Exception as e:
    print(e)

print("\n--- User Roles ---")
try:
    res = supabase.table('user_roles').select('*').execute()
    print(res.data)
except Exception as e:
    print(e)
