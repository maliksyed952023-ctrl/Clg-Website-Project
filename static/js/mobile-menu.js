/**
 * Mobile Menu Enhancements
 * Handles accordion submenus and sidebar transitions
 */

document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (!navbarCollapse) return;

    // Handle Dropdown Accordion on Mobile
    const dropdownToggles = navbarCollapse.querySelectorAll('.nav-item.dropdown > .nav-link');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                
                // Close other open menus
                navbarCollapse.querySelectorAll('.nav-item.dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active-mobile-dropdown');
                        const m = item.querySelector('.dropdown-menu');
                        if (m) m.style.maxHeight = null;
                    }
                });

                // Toggle current menu
                parent.classList.toggle('active-mobile-dropdown');
                if (menu) {
                    if (parent.classList.contains('active-mobile-dropdown')) {
                        menu.style.maxHeight = menu.scrollHeight + "px";
                    } else {
                        menu.style.maxHeight = null;
                    }
                }
            }
        });
    });

    // Handle nested dropdowns (Departments)
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
                    if (parent.classList.contains('active-nested-dropdown')) {
                        menu.style.maxHeight = menu.scrollHeight + "px";
                        // Update parent menu height to accommodate nested menu
                        const rootMenu = parent.closest('.nav-item.dropdown').querySelector('.dropdown-menu');
                        rootMenu.style.maxHeight = (rootMenu.scrollHeight + menu.scrollHeight) + "px";
                    } else {
                        menu.style.maxHeight = null;
                    }
                }
            }
        });
    });

    // Close menu when clicking links (not dropdown toggles)
    const navLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && !this.classList.contains('dropdown-toggle')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
});
