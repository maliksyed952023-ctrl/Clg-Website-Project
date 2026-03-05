// ==========================================
// SIMPLE SLIDER WITH AUTO-SCROLL
// ==========================================

let currentIndex = 0;
let autoSlideTimer;
const SLIDE_INTERVAL = 5000; // 5 seconds

// Get all slides and dots
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Function to show a specific slide
function showSlide(index) {
    // Remove active classes from all slides and dots
    slides.forEach(slide => {
        slide.classList.remove('slide-active');
    });
    dots.forEach(dot => {
        dot.classList.remove('dot-active');
    });
    
    // Handle wraparound
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    
    // Add active class to current slide and dot
    slides[currentIndex].classList.add('slide-active');
    dots[currentIndex].classList.add('dot-active');
    
    console.log('Showing slide:', currentIndex + 1);
}

// Function to change slide (used by prev/next buttons)
function changeSlide(direction) {
    stopAutoSlide();
    showSlide(currentIndex + direction);
    startAutoSlide();
}

// Function to go to specific slide (used by dots)
function goToSlide(index) {
    stopAutoSlide();
    showSlide(index);
    startAutoSlide();
}

// Start auto-slide
function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        showSlide(currentIndex + 1);
    }, SLIDE_INTERVAL);
}

// Stop auto-slide
function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// Pause on hover
const slider = document.querySelector('.main-slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Initialize slider
console.log('Government Polytechnic Website Loaded');
console.log('Total slides:', slides.length);
console.log('Auto-scroll interval: 5 seconds');

// Start auto-slide when page loads
startAutoSlide();

// Check for images
window.addEventListener('load', () => {
    console.log('Checking images...');
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img, index) => {
        if (img.complete && img.naturalHeight !== 0) {
            console.log(`✓ Image ${index + 1} loaded:`, img.src);
        } else {
            console.log(`✗ Image ${index + 1} failed or missing:`, img.src);
        }
    });
});
