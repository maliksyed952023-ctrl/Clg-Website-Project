
import os
from dotenv import load_dotenv
from supabase import create_client
import traceback

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

print(f"URL: {SUPABASE_URL}")
print(f"Key length: {len(SUPABASE_KEY) if SUPABASE_KEY else 0}")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Credentials missing!")
    exit(1)

try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Client created.")
    
    # Try a simple select
    print("Executing query...")
    response = supabase.table('announcements').select('*').limit(1).execute()
    print("Query success!")
    print(f"Data: {response.data}")
    
except Exception as e:
    print("Query failed!")
    print(f"Error type: {type(e)}")
    print(f"Error message: {e}")
    traceback.print_exc()
