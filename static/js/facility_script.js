/**
 * Facility Page JavaScript Functions
 * Handles Sidebar Dropdowns (Toggle Menu) and Section Switching (Show Section).
 */

function toggleMenu(menuId, element) {
    if (event) event.stopPropagation(); // VERY IMPORTANT

    const allMenus = document.querySelectorAll(".submenu");
    const allBtns = document.querySelectorAll(".main-btn");
    const menu = document.getElementById(menuId);
    const isOpen = menu && menu.style.display === "block";

    // Close all other menus and reset their arrows
    allMenus.forEach(m => m.style.display = "none");
    allBtns.forEach(b => {
        b.classList.remove("active");
        const a = b.querySelector(".arrow");
        if (a) a.innerHTML = "▶";
    });

    // Toggle the clicked menu
    if (!isOpen && menu) {
        menu.style.display = "block";
        element.classList.add("active");
        const arrow = element.querySelector(".arrow");
        if (arrow) arrow.innerHTML = "▼";
    }
}

function showSection(id, element) {
    if (event) event.stopPropagation(); // VERY IMPORTANT

    // Hide all sections
    const sections = document.querySelectorAll(".section");
    sections.forEach(s => s.classList.remove("active"));

    // Remove active and reset arrows for all sidebar buttons (main and sub)
    document.querySelectorAll(".main-btn, .sub-btn").forEach(b => {
        b.classList.remove("active-item", "active");
        const a = b.querySelector(".arrow");
        if (a) a.innerHTML = "▶";
    });

    // Show the targeted section
    const target = document.getElementById(id);
    if (target) {
        target.classList.add("active");
    }

    // Mark the current button as active
    if (element) {
        if (element.classList.contains("sub-btn")) {
            element.classList.add("active-item");
            // If it's a sub-button, find the parent main-btn and its arrow
            const parentSubmenu = element.closest('.submenu');
            if (parentSubmenu) {
                const parentMainBtn = parentSubmenu.previousElementSibling;
                if (parentMainBtn && parentMainBtn.classList.contains('main-btn')) {
                    parentMainBtn.classList.add('active');
                    const arrow = parentMainBtn.querySelector('.arrow');
                    if (arrow) arrow.innerHTML = "▼";
                }
            }
        } else {
            element.classList.add("active");
            const arrow = element.querySelector(".arrow");
            if (arrow) arrow.innerHTML = "▼";
        }
    }
}

function scrollEvents(direction) {
    const container = document.getElementById('eventsScroll');
    if (container) {
        const scrollAmount = 300; // Adjusted for better scrolling
        container.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Initial setup to handle section in URL (e.g., from navbar links)
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    let section = urlParams.get('section');
    if(section) {
        showSection(section);
    }
});
