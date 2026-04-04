import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def cleanup_test_images():
    print("🧹 Cleaning up test images from managed_images table...")
    
    # 1. Fetch all managed images starting with 'dept_'
    res = supabase.table('managed_images').select('slug').ilike('slug', 'dept_%').execute()
    slugs = [r['slug'] for r in res.data]
    
    if not slugs:
        print("✅ No test images found.")
        return

    print(f"🗑️ Deleting {len(slugs)} records...")
    for slug in slugs:
        supabase.table('managed_images').delete().eq('slug', slug).execute()
        print(f"   - Deleted: {slug}")

    # 2. Also clear pending requests
    res_p = supabase.table('pending_image_updates').delete().ilike('slug', 'dept_%').execute()
    print(f"🗑️ Cleared pending requests for departments.")

    print("\n✨ Cleanup Complete!")

if __name__ == "__main__":
    cleanup_test_images()
