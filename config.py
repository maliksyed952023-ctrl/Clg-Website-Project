import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()  # Load variables from .env into os.environ

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase credentials are missing!")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)