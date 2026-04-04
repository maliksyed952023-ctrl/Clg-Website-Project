import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(URL, KEY)

try:
    buckets = supabase.storage.list_buckets()
    bucket_names = [b.name for b in buckets]
    print(f"Available buckets: {bucket_names}")

    if "images" not in bucket_names:
        print("Creating 'images' bucket...")
        supabase.storage.create_bucket("images", options={"public": True})
        print("Bucket 'images' created successfully (Public).")
    else:
        print("Bucket 'images' already exists.")
except Exception as e:
    print(f"Error handling buckets: {e}")
