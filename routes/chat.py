import os
import json
import urllib.request
import urllib.error
from flask import Blueprint, request, jsonify

chat_bp = Blueprint('chat_bp', __name__)

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = """You are GPCS AI Assistant for Government Polytechnic, Chhatrapati Sambhajinagar (Estd. 1955), Maharashtra. AICTE Approved, NBA Accredited. DTE Code: 2010. Contact: +91-240-2353644. Departments: AIML, Automobile, Civil, Computer, DDGM, Electrical, ENTC, IT, Mechanical, Science & Humanities. Facilities: Library, Hostels, Labs, Sports. Strong TPO for placements. Be helpful, concise and polite. If unsure, direct users to contact administration."""

@chat_bp.route('/chat', methods=['POST'])
def handle_chat_request():
    api_key = os.environ.get('GROQ_API_KEY')
    if not api_key:
        return jsonify({'error': 'Chat service is unavailable. API key missing.'}), 500

    data = request.get_json()
    if not data or 'messages' not in data:
        return jsonify({'error': 'No messages provided.'}), 400

    # Keep only last 4 messages to stay within free-tier token limits
    user_messages = data['messages'][-4:]

    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + user_messages

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": messages,
        "temperature": 0.5,
        "max_tokens": 512
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
        print(f"Groq HTTPError: {e.code} - {error_info}")
        # Extract the specific message from Groq's JSON error if possible
        try:
            err_json = json.loads(error_info)
            msg = err_json.get('error', {}).get('message', 'Unknown Error')
        except:
            msg = error_info[:100]
            
        return jsonify({'error': f'AI Service Error (Status {e.code}): {msg}'}), 502
    except Exception as e:
        print(f"Groq Exception: {e}")
        return jsonify({'error': f'An internal error occurred: {str(e)}'}), 500
