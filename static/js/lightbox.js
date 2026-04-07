/**
 * Global Slideshow Lightbox
 * Handles image popup with Prev/Next navigation across the website.
 */
(function() {
    const Lightbox = {
        images: [],
        currentIndex: 0,
        title: '',

        init() {
            if (document.getElementById('globalLightbox')) return;

            const html = `
                <div id="globalLightbox" class="global-lightbox">
                    <span class="lb-close-overlay" onclick="window.GlobalLightbox.close()">&times;</span>
                    <div class="lb-container">
                        <div class="lb-header">
                            <button class="lb-back-btn" onclick="window.GlobalLightbox.close()">
                                <i class="fas fa-arrow-left"></i> Back
                            </button>
                            <h3 id="lbTitle" class="lb-title">Gallery</h3>
                            <div style="width: 80px;"></div> <!-- Spacer -->
                        </div>
                        
                        <button class="lb-nav-btn lb-prev" onclick="window.GlobalLightbox.prev()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        
                        <img id="lbMainImage" src="" class="lb-main-image" alt="Gallery Image">
                        
                        <button class="lb-nav-btn lb-next" onclick="window.GlobalLightbox.next()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        
                        <div class="lb-footer">
                            <div id="lbCaption" class="lb-caption"></div>
                            <div id="lbCounter" class="lb-counter"></div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                const lb = document.getElementById('globalLightbox');
                if (!lb || !lb.classList.contains('active')) return;
                
                if (e.key === 'Escape') this.close();
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
            
            // Close on background click
            document.getElementById('globalLightbox').addEventListener('click', (e) => {
                if (e.target.id === 'globalLightbox') this.close();
            });
        },

        open(images, title = 'Gallery', startIndex = 0) {
            this.init();
            this.images = images || [];
            this.currentIndex = startIndex;
            this.title = title;

            if (this.images.length === 0) {
                console.warn('GlobalLightbox: No images provided');
                return;
            }

            const lb = document.getElementById('globalLightbox');
            document.getElementById('lbTitle').textContent = this.title;
            
            lb.style.display = 'flex';
            setTimeout(() => {
                lb.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
                this.updateDisplay();
            }, 10);
        },

        updateDisplay() {
            const imgEl = document.getElementById('lbMainImage');
            const captionEl = document.getElementById('lbCaption');
            const counterEl = document.getElementById('lbCounter');
            const current = this.images[this.currentIndex];

            if (!current) return;

            // Fade out current image
            imgEl.classList.remove('fade-in');

            setTimeout(() => {
                imgEl.src = current.url;
                imgEl.onload = () => imgEl.classList.add('fade-in');
                
                captionEl.textContent = current.label || '';
                counterEl.textContent = `${this.currentIndex + 1} of ${this.images.length}`;
                
                // Show/Hide Nav Buttons if only 1 image
                const prevBtn = document.querySelector('.lb-prev');
                const nextBtn = document.querySelector('.lb-next');
                if (this.images.length <= 1) {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                } else {
                    prevBtn.style.display = 'flex';
                    nextBtn.style.display = 'flex';
                }
            }, 50);
        },

        prev() {
            if (this.images.length <= 1) return;
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.updateDisplay();
        },

        next() {
            if (this.images.length <= 1) return;
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.updateDisplay();
        },

        close() {
            const lb = document.getElementById('globalLightbox');
            if (!lb) return;
            
            lb.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
            
            setTimeout(() => {
                lb.style.display = 'none';
                document.getElementById('lbMainImage').src = '';
            }, 300);
        }
    };

    window.GlobalLightbox = Lightbox;
})();
