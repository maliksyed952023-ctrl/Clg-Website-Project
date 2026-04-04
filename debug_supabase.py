import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def debug_supabase():
    with open('supabase_debug.txt', 'w') as f:
        try:
            f.write("--- SUPABASE DEBUG ---\n")
            # 1. Check if we can fetch ANYTHING from managed_images
            res = supabase.table('managed_images').select('*').limit(5).execute()
            f.write(f"Basic fetch (first 5): {len(res.data) if res.data else 0} records\n")
            if res.data:
                f.write(f"Sample Columns: {list(res.data[0].keys())}\n")
            
            # 2. Test the specific query that failed
            f.write("\nTesting .order('updated_at', ascending=True):\n")
            try:
                res2 = supabase.table('managed_images').select('*').order('updated_at', ascending=True).execute()
                f.write(f"Success! Found {len(res2.data)} records.\n")
            except Exception as e2:
                f.write(f"FAIL with updated_at: {str(e2)}\n")

            # 3. Test with 'id'
            f.write("\nTesting .order('id', ascending=True):\n")
            try:
                res3 = supabase.table('managed_images').select('*').order('id', ascending=True).execute()
                f.write(f"Success with id! Found {len(res3.data)} records.\n")
            except Exception as e3:
                f.write(f"FAIL with id: {str(e3)}\n")

        except Exception as e:
            f.write(f"\nFATAL ERROR: {str(e)}\n")

if __name__ == "__main__":
    debug_supabase()
