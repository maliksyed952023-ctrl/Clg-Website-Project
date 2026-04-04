import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def final_cleanup():
    try:
        # 1. Fetch all images belonging to departments
        res = supabase.table('managed_images').select('id, slug').ilike('slug', 'dept_%').execute()
        records = res.data or []
        
        if not records:
            print("No department lab photos found in database.")
            return

        print(f"Found {len(records)} department image records. Starting deletion...")
        
        # 2. Extract IDs
        ids = [r['id'] for r in records]
        
        # 3. Batch delete by ID
        # Note: We delete in chunks if there are too many (Supabase limit is usually large)
        supabase.table('managed_images').delete().in_('id', ids).execute()
        
        print(f"Successfully cleared all {len(records)} test images from lab slots.")
    except Exception as e:
        print(f"Error during cleanup: {str(e)}")

if __name__ == "__main__":
    final_cleanup()
