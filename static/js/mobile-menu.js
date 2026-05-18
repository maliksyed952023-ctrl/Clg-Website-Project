/**
 * Structural Mobile Sidebar Enhancements
 * Handles backdrop, drawer transitions, and premium accordion logic
 */

document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (!navbarCollapse || !backdrop) return;

    // --- 1. BACKDROP & SIDEBAR SYNC ---
    
    // Function to toggle backdrop
    function toggleBackdrop(show) {
        if (show) {
            backdrop.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            backdrop.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Listen for Bootstrap collapse events
    navbarCollapse.addEventListener('show.bs.collapse', () => toggleBackdrop(true));
    navbarCollapse.addEventListener('hide.bs.collapse', () => toggleBackdrop(false));

    // Close menu when clicking backdrop
    backdrop.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
    });

    // --- 2. PREMIUM ACCORDION LOGIC ---
    
    const dropdownToggles = navbarCollapse.querySelectorAll('.nav-item.dropdown > .nav-link');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                
                // Toggle active class for the indicator
                const wasActive = parent.classList.contains('active-mobile-dropdown');
                
                // Close other open menus for a clean look
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
                    if (menu) menu.style.maxHeight = menu.scrollHeight + 100 + "px"; // Extra padding for safety
                } else {
                    parent.classList.remove('active-mobile-dropdown');
                    if (menu) menu.style.maxHeight = null;
                }
            }
        });
    });

    // --- 3. SUB-LEVEL TOGGLES ---
    
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
                    
                    // Update parent height
                    const rootMenu = parent.closest('.nav-item.dropdown').querySelector('.dropdown-menu');
                    if (isOpen) {
                        rootMenu.style.maxHeight = (rootMenu.scrollHeight + menu.scrollHeight) + "px";
                    }
                }
            }
        });
    });
});
