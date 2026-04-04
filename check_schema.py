
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def check_table_schema():
    try:
        # Fetch one row to see columns
        res = supabase.table('managed_images').select('*').limit(1).execute()
        if res.data:
            print("Columns found in 'managed_images':", res.data[0].keys())
        else:
            print("No data in 'managed_images' to inspect columns.")
            # Try to fetch from pending
            res_p = supabase.table('pending_image_updates').select('*').limit(1).execute()
            if res_p.data:
                print("Columns found in 'pending_image_updates':", res_p.data[0].keys())
    except Exception as e:
        print("Error checking schema:", str(e))

if __name__ == "__main__":
    check_table_schema()
