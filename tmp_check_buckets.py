import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(URL, KEY)

try:
    buckets = supabase.storage.list_buckets()
    print("Available buckets:")
    for b in buckets:
        print(f"- {b.name}")
except Exception as e:
    print(f"Error listing buckets: {e}")
