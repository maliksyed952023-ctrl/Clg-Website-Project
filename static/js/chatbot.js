// GPCS AI Chatbot - Global Logic
// HTML is injected via footer_content.html on every page
// This script initializes the chatbot once the DOM is ready.

// Guard against double-init when both base.html and footer_content.html are present
if (typeof window._gpcsChatInitialized === 'undefined') {
    window._gpcsChatInitialized = true;

    let chatHistory = [];
    let isFullscreen = false;

    document.addEventListener('DOMContentLoaded', function () {
        const fab = document.getElementById('gpcs-chatbot-fab');
        if (fab) {
            fab.style.display = 'flex'; // Reveal FAB
        }

        // Auto-resize textarea
        const textarea = document.getElementById('gpcs-chat-input');
        if (textarea) {
            textarea.addEventListener('input', function () {
                this.style.height = 'auto';
                let newHeight = this.scrollHeight;
                if (newHeight > 100) newHeight = 100;
                this.style.height = newHeight + 'px';
            });
        }

        // Load persisted history from this session
        loadGPCSChatHistory();
    });

    window.toggleGPCSChat = function () {
        const windowEl = document.getElementById('gpcs-chatbot-window');
        const badge = document.getElementById('gpcs-chat-badge');
        if (!windowEl) return;

        if (windowEl.classList.contains('gpcs-chat-open')) {
            windowEl.classList.remove('gpcs-chat-open');
        } else {
            windowEl.classList.add('gpcs-chat-open');
            if (badge) badge.style.display = 'none';
            const inp = document.getElementById('gpcs-chat-input');
            if (inp) inp.focus();
        }
    };

    window.toggleGPCSFullscreen = function () {
        const windowEl = document.getElementById('gpcs-chatbot-window');
        const btnIcon = document.querySelector('#gpcs-fullscreen-btn i');
        if (!windowEl) return;

        isFullscreen = !isFullscreen;
        if (isFullscreen) {
            windowEl.classList.add('gpcs-chat-fullscreen');
            if (btnIcon) { btnIcon.classList.remove('fa-expand'); btnIcon.classList.add('fa-compress'); }
        } else {
            windowEl.classList.remove('gpcs-chat-fullscreen');
            if (btnIcon) { btnIcon.classList.remove('fa-compress'); btnIcon.classList.add('fa-expand'); }
        }
    };

    window.clearGPCSChat = function () {
        if (!confirm('Clear chat history?')) return;

        chatHistory = [];
        sessionStorage.removeItem('gpcsChatHistory');

        const body = document.getElementById('gpcs-chat-body');
        const welcome = document.getElementById('gpcs-welcome-screen');
        if (!body || !welcome) return;

        body.innerHTML = '';
        welcome.style.display = 'block';
        body.appendChild(welcome);
    };

    window.handleGPCSKeyPress = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendGPCSMessage();
        }
    };

    window.sendGPCSSuggestion = function (text) {
        const input = document.getElementById('gpcs-chat-input');
        if (input) input.value = text;
        sendGPCSMessage();
    };

    window.sendGPCSMessage = async function () {
        const inputEl = document.getElementById('gpcs-chat-input');
        if (!inputEl) return;
        const text = inputEl.value.trim();
        if (!text) return;

        const welcomeEl = document.getElementById('gpcs-welcome-screen');
        if (welcomeEl) welcomeEl.style.display = 'none';

        addGPCSMessageToUI('user', text);
        chatHistory.push({ role: 'user', content: text });
        saveHistoricalContext();

        inputEl.value = '';
        inputEl.style.height = 'auto';
        const sendBtn = document.getElementById('gpcs-chat-send');
        if (sendBtn) sendBtn.disabled = true;

        const typingId = showGPCSTyping();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatHistory })
            });

            removeGPCSTyping(typingId);

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Server error');

            const botReply = data.reply;
            addGPCSMessageToUI('assistant', botReply);
            chatHistory.push({ role: 'assistant', content: botReply });
            saveHistoricalContext();

        } catch (error) {
            removeGPCSTyping(typingId);
            addGPCSMessageToUI('bot', 'Sorry, I am unavailable right now. ' + error.message);
        } finally {
            if (sendBtn) sendBtn.disabled = false;
            if (inputEl) inputEl.focus();
        }
    };

    function addGPCSMessageToUI(role, content) {
        const body = document.getElementById('gpcs-chat-body');
        if (!body) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `gpcs-chat-msg ${role === 'user' ? 'user' : 'bot'}`;

        // Basic markdown: bold, newlines
        let formatted = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');

        const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgDiv.innerHTML = `<div class="gpcs-chat-content">${formatted}</div><div class="gpcs-chat-time">${t}</div>`;

        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;
    }

    function showGPCSTyping() {
        const id = 'typing-' + Date.now();
        const body = document.getElementById('gpcs-chat-body');
        if (!body) return id;

        const msgDiv = document.createElement('div');
        msgDiv.className = 'gpcs-chat-msg bot';
        msgDiv.id = id;
        msgDiv.innerHTML = `
            <div class="gpcs-chat-content gpcs-typing-indicator">
                <div class="gpcs-typing-dot"></div>
                <div class="gpcs-typing-dot"></div>
                <div class="gpcs-typing-dot"></div>
            </div>`;
        body.appendChild(msgDiv);
        body.scrollTop = body.scrollHeight;
        return id;
    }

    function removeGPCSTyping(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    function saveHistoricalContext() {
        sessionStorage.setItem('gpcsChatHistory', JSON.stringify(chatHistory));
    }

    function loadGPCSChatHistory() {
        const saved = sessionStorage.getItem('gpcsChatHistory');
        if (!saved) return;
        try {
            chatHistory = JSON.parse(saved);
            if (chatHistory.length > 0) {
                const welcome = document.getElementById('gpcs-welcome-screen');
                if (welcome) welcome.style.display = 'none';
                chatHistory.forEach(msg => addGPCSMessageToUI(msg.role, msg.content));
            }
        } catch (e) {
            console.error('GPCS Chat: Failed to restore history', e);
        }
    }
}
