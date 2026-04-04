/**
 * Utility Bar Functions for Government Polytechnic, Chhatrapati Sambhajinagar
 * Handles Dropdowns, Font Resizing, Theme Toggling, and Language Selection.
 */

// --- 1. FONT RESIZING (ACCESSIBILITY) ---
function setFont(action) {
    if (event) event.stopPropagation();
    let currentZoom = parseFloat(localStorage.getItem('site_zoom')) || 1.0;

    if (action === 'increase') {
        currentZoom = Math.min(currentZoom + 0.1, 1.3);
    } else if (action === 'decrease') {
        currentZoom = Math.max(currentZoom - 0.1, 0.8);
    } else {
        currentZoom = 1.0; // reset
    }

    localStorage.setItem('site_zoom', currentZoom);
    document.body.style.zoom = currentZoom;
}

// Apply zoom immediately on load
(function () {
    let savedZoom = parseFloat(localStorage.getItem('site_zoom'));
    if (savedZoom && savedZoom !== 1.0) {
        document.body.style.zoom = savedZoom;
    }
})();

// --- 2. DROPDOWN TOGGLE ---
function toggleDrop(id) {
    if (event) event.stopPropagation();

    document.querySelectorAll('.dropdown-panel').forEach(d => {
        if (d.id !== id) d.style.display = 'none';
    });

    const el = document.getElementById(id);
    if (el) {
        el.style.display = el.style.display === 'block' ? 'none' : 'block';
    }
}

// --- 3. THEME TOGGLE (DARK MODE) ---
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('site_theme', isDark ? 'dark' : 'light');
}

// Apply theme immediately on load
(function () {
    const savedTheme = localStorage.getItem('site_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
})();

// --- 4. LANGUAGE LOGIC (GOOGLE TRANSLATE) ---
function setLanguage(lang) {
    if (lang === 'mr') {
        document.cookie = "googtrans=/en/mr; path=/";
        document.cookie = "googtrans=/en/mr; domain=" + window.location.hostname + "; path=/";
    } else {
        document.cookie = "googtrans=/en/en; path=/";
        document.cookie = "googtrans=/en/en; domain=" + window.location.hostname + "; path=/";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    window.location.reload();
}

// Auto-Marathi for Marathi browsers (if not set)
(function() {
    let initialLang = navigator.language.startsWith("mr") ? "mr" : "en";
    if (document.cookie.indexOf('googtrans') === -1 && initialLang === 'mr') {
        document.cookie = "googtrans=/en/mr; path=/";
        window.location.reload();
    }
})();

// --- 5. GLOBAL CLICK LISTENER ---
document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".dropdown-panel");
    const buttons = document.querySelectorAll(".util-dropdown button");

    let clickedInside = false;

    buttons.forEach(btn => {
        if (btn.contains(event.target)) clickedInside = true;
    });

    dropdowns.forEach(panel => {
        if (panel.contains(event.target)) clickedInside = true;
    });

    if (!clickedInside) {
        dropdowns.forEach(panel => {
            panel.style.display = "none";
        });
    }
});
