/**
 * Global Image Loader for Managed Images
 * Fetches dynamic URLs from Supabase based on a 'slug' and falls back to a provided local path.
 */

const ImageLoader = {
    cache: {},

    /**
     * Fetch all managed images and cache them
     */
    async init() {
        try {
            const res = await fetch('/api/images');
            const json = await res.json();
            const data = json.data || [];
            data.forEach(img => {
                // Strip unique suffix if present (e.g. slug::123456789)
                const baseSlug = img.slug.split('::')[0];
                
                // Use the first image (the one with the oldest updated_at) as the cover
                if (!this.cache[baseSlug]) {
                    this.cache[baseSlug] = img.url;
                }
            });
            console.log('[ImageLoader] Initialized with', data.length, 'slots');
        } catch (e) {
            console.warn('[ImageLoader] Initialization failed. Using fallbacks.');
        }
    },

    /**
     * Get URL for a slug
     * @param {string} slug - The unique identifier for the image slot
     */
    getUrl(slug) {
        return this.cache[slug] || null;
    },

    /**
     * Automatically update all <img> tags with [data-slug] attribute
     */
    updateDOM() {
        const elements = document.querySelectorAll('img[data-slug]');
        elements.forEach(el => {
            const slug = el.getAttribute('data-slug');
            const fallback = el.getAttribute('data-fallback') || el.src;
            const dynamicUrl = this.getUrl(slug);
            
            if (dynamicUrl) {
                el.loading = 'lazy';
                el.decoding = 'async';
                el.src = dynamicUrl;
            } else if (fallback) {
                el.loading = 'lazy';
                el.decoding = 'async';
                el.src = fallback;
            }
        });
    }
};

// Auto-init and update DOM on load
document.addEventListener('DOMContentLoaded', async () => {
    await ImageLoader.init();
    ImageLoader.updateDOM();
});
