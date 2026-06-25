import os
import json
import urllib.request
import urllib.error
from flask import Blueprint, request, jsonify
from config import supabase

chat_bp = Blueprint('chat_bp', __name__)

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

BASE_SYSTEM_PROMPT = """You are GPCS AI Assistant for Government Polytechnic, Chhatrapati Sambhajinagar (Estd. 1955), Maharashtra. AICTE Approved, NBA Accredited. DTE Code: 2010. Contact: +91-240-2353644. Departments: AIML, Automobile, Civil, Computer, DDGM, Electrical, ENTC, IT, Mechanical, Science & Humanities. Facilities: Library, Hostels, Labs, Sports. Strong TPO for placements. Be helpful, concise and polite. If unsure, direct users to contact administration.

IMPORTANT: When real-time data is provided below from the database, ALWAYS use it to answer accurately. Never make up or guess any information that should come from the database."""

# ─── Language instruction injected per request ────────────────────────────────
LANGUAGE_INSTRUCTIONS = {
    'english': "Always respond in clear English.",
    'hindi':   "हमेशा हिंदी में जवाब दें। उत्तर स्पष्ट और सहायक होना चाहिए।",
    'marathi': "नेहमी मराठीत उत्तर द्या. उत्तर स्पष्ट आणि उपयुक्त असावे.",
}

# Common Marathi words (Maharashtra-specific, not used in Hindi)
MARATHI_WORDS = [
    'आहे', 'आहेत', 'नाही', 'सांगा', 'कुठे', 'कसे', 'कोण',
    'कधी', 'महाविद्यालय', 'विभाग', 'शिक्षक', 'मला', 'तुम्ही',
    'आपण', 'काय', 'हे', 'ते', 'मी', 'आम्ही', 'केले', 'करा',
]

# Common Hindi words (not used in Marathi)
HINDI_WORDS = [
    'है', 'हैं', 'नहीं', 'बताओ', 'कहाँ', 'कैसे', 'कौन',
    'कब', 'कॉलेज', 'मुझे', 'आप', 'हम', 'यह', 'वह', 'हूँ',
    'करना', 'बताइए', 'जानकारी', 'शिक्षक', 'विद्यालय',
]


def detect_language(text: str) -> str:
    """Detect if user message is English, Hindi, or Marathi."""
    # Count Devanagari characters (shared by both Hindi & Marathi)
    devanagari_count = sum(1 for ch in text if '\u0900' <= ch <= '\u097F')

    if devanagari_count == 0:
        return 'english'

    # Match known Marathi vs Hindi words
    marathi_score = sum(1 for word in MARATHI_WORDS if word in text)
    hindi_score   = sum(1 for word in HINDI_WORDS   if word in text)

    if marathi_score > hindi_score:
        return 'marathi'
    elif hindi_score > marathi_score:
        return 'hindi'
    else:
        # Default to Marathi for Maharashtra college context
        return 'marathi'

# ─── Department keyword → DB value mapping ────────────────────────────────────
DEPT_MAP = {
    'aiml': 'aiml',
    'ai ml': 'aiml',
    'artificial intelligence': 'aiml',
    'machine learning': 'aiml',
    'automobile': 'automobile',
    'auto': 'automobile',
    'civil': 'civil',
    'computer': 'computer',
    'cs': 'computer',
    'cse': 'computer',
    'ddgm': 'ddgm',
    'electrical': 'electrical',
    'entc': 'entc',
    'electronics': 'entc',
    'telecommunication': 'entc',
    'it': 'it',
    'information technology': 'it',
    'mechanical': 'mechanical',
    'mech': 'mechanical',
    'science': 'science-humanities',
    'humanities': 'science-humanities',
    'mercedes': 'mercedes-benz',
    'workshop': 'workshop',
    'applied mechanics': 'applied-mechanics',
}

# ─── Announcement category keyword mapping ────────────────────────────────────
CATEGORY_MAP = {
    'tpo': 'tpo',
    'placement': 'tpo',
    'training': 'tpo',
    'internship': 'tpo',
    'campus': 'tpo',
    'notice': 'notice',
    'circular': 'notice',
    'exam': 'exam',
    'result': 'result',
    'admission': 'admission',
    'scholarship': 'scholarship',
    'sports': 'sports',
    'cultural': 'cultural',
    'event': 'event',
}


def detect_intent(text: str) -> dict:
    """Detect which Supabase tables to query based on user message."""
    t = text.lower()

    intent = {
        'fetch_faculty': False,
        'faculty_dept': None,
        'fetch_announcements': False,
        'announcement_category': None,
        'fetch_labs': False,
        'labs_dept': None,
        'fetch_downloads': False,
        'fetch_settings': False,
    }

    # ── Faculty ──────────────────────────────────────────────────────────────
    faculty_triggers = [
        'faculty', 'teacher', 'professor', 'staff', 'hod',
        'head of department', 'lecturer', 'who teaches',
        'who is the', 'instructor', 'faculty member'
    ]
    if any(kw in t for kw in faculty_triggers):
        intent['fetch_faculty'] = True
        for kw, dept in DEPT_MAP.items():
            if kw in t:
                intent['faculty_dept'] = dept
                break

    # ── Announcements / Notices / Schedules ──────────────────────────────────
    announcement_triggers = [
        'notice', 'announcement', 'schedule', 'event', 'calendar',
        'upcoming', 'this month', 'today', 'news', 'update', 'latest',
        'recent', 'tpo', 'placement', 'training', 'exam', 'result',
        'admission', 'scholarship', 'sports', 'cultural', 'circular',
        'internship', 'campus drive', 'what is happening', 'any news'
    ]
    if any(kw in t for kw in announcement_triggers):
        intent['fetch_announcements'] = True
        for kw, cat in CATEGORY_MAP.items():
            if kw in t:
                intent['announcement_category'] = cat
                break

    # ── Labs / Facilities ────────────────────────────────────────────────────
    lab_triggers = [
        'lab', 'laboratory', 'equipment', 'facility', 'facilities',
        'infrastructure', 'workshop', 'computer lab', 'which labs'
    ]
    if any(kw in t for kw in lab_triggers):
        intent['fetch_labs'] = True
        for kw, dept in DEPT_MAP.items():
            if kw in t:
                intent['labs_dept'] = dept
                break

    # ── Downloads / Documents ─────────────────────────────────────────────────
    download_triggers = [
        'download', 'form', 'syllabus', 'brochure', 'document',
        'pdf', 'application form', 'fee structure', 'time table',
        'timetable', 'hall ticket', 'prospectus'
    ]
    if any(kw in t for kw in download_triggers):
        intent['fetch_downloads'] = True

    # ── Website Settings (general college info) ───────────────────────────────
    settings_triggers = [
        'contact', 'address', 'phone', 'email', 'website', 'principal',
        'director', 'timing', 'office hours', 'location'
    ]
    if any(kw in t for kw in settings_triggers):
        intent['fetch_settings'] = True

    return intent


def fetch_context_data(intent: dict) -> str:
    """Fetch live data from Supabase based on detected intent."""
    parts = []

    try:
        # ── Faculty ──────────────────────────────────────────────────────────
        if intent['fetch_faculty']:
            q = supabase.table('faculty_members').select(
                'name, department, designation, contact_no, email'
            )
            if intent['faculty_dept']:
                q = q.eq('department', intent['faculty_dept'])
            res = q.order('created_at', desc=False).execute()

            if res.data:
                rows = []
                for f in res.data:
                    row = f"• {f.get('name','N/A')} — {f.get('designation','N/A')} (Dept: {f.get('department','N/A')})"
                    if f.get('contact_no'):
                        row += f", Contact: {f['contact_no']}"
                    if f.get('email'):
                        row += f", Email: {f['email']}"
                    rows.append(row)
                label = f"({intent['faculty_dept'].upper()})" if intent['faculty_dept'] else "(All Departments)"
                parts.append(f"=== FACULTY {label} ===\n" + "\n".join(rows))
            else:
                dept_label = intent['faculty_dept'] or 'the specified department'
                parts.append(f"=== FACULTY ===\nNo faculty records found for {dept_label}.")

        # ── Announcements ────────────────────────────────────────────────────
        if intent['fetch_announcements']:
            q = supabase.table('announcements').select(
                'title, description, category, published_at, expires_at'
            ).eq('is_active', True)
            if intent['announcement_category']:
                q = q.eq('category', intent['announcement_category'])
            res = q.order('published_at', desc=True).limit(10).execute()

            if res.data:
                rows = []
                for a in res.data:
                    row = f"• [{a.get('category','General').upper()}] {a.get('title','N/A')}"
                    if a.get('description'):
                        row += f"\n  Details: {a['description'][:250]}"
                    if a.get('published_at'):
                        row += f"\n  Date: {a['published_at'][:10]}"
                    if a.get('expires_at'):
                        row += f"\n  Valid until: {a['expires_at'][:10]}"
                    rows.append(row)
                label = f"({intent['announcement_category'].upper()})" if intent['announcement_category'] else "(All)"
                parts.append(f"=== ANNOUNCEMENTS/NOTICES {label} ===\n" + "\n".join(rows))
            else:
                parts.append("=== ANNOUNCEMENTS/NOTICES ===\nNo active announcements found at this time.")

        # ── Labs ─────────────────────────────────────────────────────────────
        if intent['fetch_labs']:
            q = supabase.table('department_labs').select(
                'name, department, equipment, contact_no'
            )
            if intent['labs_dept']:
                q = q.eq('department', intent['labs_dept'])
            res = q.execute()

            if res.data:
                rows = []
                for lab in res.data:
                    row = f"• {lab.get('name','N/A')} — Dept: {lab.get('department','N/A')}"
                    if lab.get('equipment'):
                        row += f"\n  Equipment: {lab['equipment'][:200]}"
                    if lab.get('contact_no'):
                        row += f"\n  Contact: {lab['contact_no']}"
                    rows.append(row)
                parts.append("=== LABS & FACILITIES ===\n" + "\n".join(rows))
            else:
                parts.append("=== LABS & FACILITIES ===\nNo lab records found.")

        # ── Downloads ────────────────────────────────────────────────────────
        if intent['fetch_downloads']:
            res = supabase.table('portal_downloads').select(
                'section, name, file_url, external_link'
            ).order('created_at', desc=True).limit(15).execute()

            if res.data:
                rows = []
                for d in res.data:
                    row = f"• [{d.get('section','General')}] {d.get('name','N/A')}"
                    link = d.get('file_url') or d.get('external_link')
                    if link:
                        row += f" → {link}"
                    rows.append(row)
                parts.append("=== DOWNLOADS & DOCUMENTS ===\n" + "\n".join(rows))
            else:
                parts.append("=== DOWNLOADS & DOCUMENTS ===\nNo documents found.")

        # ── Website Settings ─────────────────────────────────────────────────
        if intent['fetch_settings']:
            res = supabase.table('website_settings').select('key, value').execute()
            if res.data:
                rows = [f"• {s.get('key','')}: {s.get('value','')}" for s in res.data]
                parts.append("=== WEBSITE SETTINGS / CONTACT INFO ===\n" + "\n".join(rows))

    except Exception as e:
        print(f"[CHAT] Supabase fetch error: {e}")

    return "\n\n".join(parts)


@chat_bp.route('/chat', methods=['POST'])
def handle_chat_request():
    api_key = os.environ.get('GROQ_API_KEY')
    if not api_key:
        return jsonify({
            'error': 'Chat service unavailable. GROQ_API_KEY is missing. Add it to your environment variables on Render/Vercel.'
        }), 500

    data = request.get_json()
    if not data or 'messages' not in data:
        return jsonify({'error': 'No messages provided.'}), 400

    # Keep last 4 messages to stay within token limits
    user_messages = data['messages'][-4:]

    # Get the latest user message for intent detection
    latest_user_msg = next(
        (m.get('content', '') for m in reversed(user_messages) if m.get('role') == 'user'),
        ''
    )

    # ── Detect language ───────────────────────────────────────────────────────
    lang = detect_language(latest_user_msg) if latest_user_msg else 'english'
    lang_instruction = LANGUAGE_INSTRUCTIONS[lang]

    # ── Detect intent & fetch real data ──────────────────────────────────────
    system_prompt = BASE_SYSTEM_PROMPT + f"\n\nLANGUAGE RULE: {lang_instruction}"
    if latest_user_msg:
        intent = detect_intent(latest_user_msg)
        if any(intent.values()):
            context_data = fetch_context_data(intent)
            if context_data:
                system_prompt += (
                    "\n\n━━━ REAL-TIME DATA FROM COLLEGE DATABASE ━━━\n"
                    f"{context_data}"
                    "\n━━━ END OF REAL-TIME DATA ━━━\n\n"
                    "Use the above live data to answer accurately. "
                    "If relevant data is present, always prefer it over general knowledge."
                )

    messages = [{"role": "system", "content": system_prompt}] + user_messages

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": messages,
        "temperature": 0.5,
        "max_tokens": 600
    }

    req = urllib.request.Request(GROQ_API_URL, method='POST')
    req.add_header('Authorization', f'Bearer {api_key.strip()}')
    req.add_header('Content-Type', 'application/json')
    req.add_header('User-Agent', 'GPCS-Chatbot-Python/1.0')

    try:
        data_bytes = json.dumps(payload).encode('utf-8')
        with urllib.request.urlopen(req, data=data_bytes) as response:
            result = json.loads(response.read().decode('utf-8'))
            bot_reply = result['choices'][0]['message']['content']
            return jsonify({'reply': bot_reply})

    except urllib.error.HTTPError as e:
        error_info = e.read().decode('utf-8')
        print(f"[CHAT] Groq HTTPError {e.code}: {error_info}")
        try:
            err_json = json.loads(error_info)
            msg = err_json.get('error', {}).get('message', 'Unknown Error')
        except Exception:
            msg = error_info[:100]
        return jsonify({'error': f'AI Service Error (Status {e.code}): {msg}'}), 502

    except Exception as e:
        print(f"[CHAT] Exception: {e}")
        return jsonify({'error': f'An internal error occurred: {str(e)}'}), 500
