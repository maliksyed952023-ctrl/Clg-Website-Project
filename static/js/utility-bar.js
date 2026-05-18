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

// --- 6. GLOBAL MOBILE SIDEBAR & ACCORDION LOGIC ---
document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const backdrop = document.getElementById('sidebarBackdrop');
    
    // Backdrop toggling
    function toggleBackdrop(show) {
        if (!backdrop) return;
        if (show) {
            backdrop.classList.add('show');
            document.body.style.overflow = 'hidden';
        } else {
            backdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    if (navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', () => toggleBackdrop(true));
        navbarCollapse.addEventListener('hide.bs.collapse', () => toggleBackdrop(false));
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            if (window.bootstrap && bootstrap.Collapse) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    }

    // Accordion Logic
    if (navbarCollapse) {
        const dropdownToggles = navbarCollapse.querySelectorAll('.nav-item.dropdown > .nav-link');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    const menu = parent.querySelector('.dropdown-menu');
                    
                    const wasActive = parent.classList.contains('active-mobile-dropdown');
                    
                    // Close others
                    navbarCollapse.querySelectorAll('.nav-item.dropdown').forEach(item => {
                        if (item !== parent) {
                            item.classList.remove('active-mobile-dropdown');
                            const m = item.querySelector('.dropdown-menu');
                            if (m) m.style.maxHeight = null;
                        }
                    });

                    // Toggle current
                    if (!wasActive) {
                        parent.classList.add('active-mobile-dropdown');
                        if (menu) menu.style.maxHeight = menu.scrollHeight + 100 + "px";
                    } else {
                        parent.classList.remove('active-mobile-dropdown');
                        if (menu) menu.style.maxHeight = null;
                    }
                }
            });
        });

        // Nested toggles
        const nestedToggles = navbarCollapse.querySelectorAll('.dropend > .dropdown-item');
        nestedToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = this.parentElement;
                    const menu = parent.querySelector('.dropdown-menu');
                    
                    parent.classList.toggle('active-nested-dropdown');
                    if (menu) {
                        const isOpen = parent.classList.contains('active-nested-dropdown');
                        menu.style.maxHeight = isOpen ? menu.scrollHeight + "px" : null;
                        
                        const rootMenu = parent.closest('.nav-item.dropdown').querySelector('.dropdown-menu');
                        if (isOpen && rootMenu) {
                            rootMenu.style.maxHeight = (rootMenu.scrollHeight + menu.scrollHeight) + "px";
                        }
                    }
                }
            });
        });
    }
});
