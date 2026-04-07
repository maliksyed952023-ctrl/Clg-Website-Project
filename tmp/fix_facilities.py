import re

file_path = r"c:\website_college1\templates\FACILITIES\Facility.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace the top CSS block
css_old = """    /* PHOTO GALLERY */

    .gallery {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-top: 20px;
    }

    .gallery-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      overflow: hidden;
    }

    .gallery-img {
      height: 150px;
      background: #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 14px;
    }

    .gallery-text {
      padding: 10px;
      text-align: center;
      font-weight: bold;
      color: #0e5a61;
    }"""

css_new = """    /* PHOTO GALLERY */

    .gallery {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-top: 20px;
    }

    .gallery-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }

    .gallery-card:hover {
      transform: translateY(-5px);
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    .event-card {
      cursor: pointer;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .event-card:hover {
      transform: translateY(-5px);
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
    }

    .gallery-img {
      height: 180px;
      background: #eee;
      position: relative;
      overflow: hidden;
    }

    .gallery-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }

    .gallery-img img.active {
      opacity: 1;
    }

    .gallery-text {
      padding: 12px;
      text-align: center;
      font-weight: 600;
      color: #0b3c5d;
      background: #f8f9fa;
      border-top: 1px solid #eee;
    }

    /* LIGHTBOX POPUP */
    .lightbox {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      z-index: 9999;
      justify-content: center;
      align-items: center;
      padding: 40px;
    }

    .lightbox-content {
      position: relative;
      background: white;
      width: 90%;
      max-width: 1000px;
      max-height: 90vh;
      border-radius: 12px;
      padding: 30px;
      overflow-y: auto;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }

    .lightbox-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 2px solid #0b3c5d;
      padding-bottom: 10px;
    }

    .lightbox-title {
      font-size: 24px;
      color: #0b3c5d;
      font-weight: bold;
      margin: 0;
    }

    .close-lightbox {
      font-size: 30px;
      color: #c1121f;
      cursor: pointer;
      transition: color 0.3s;
      line-height: 1;
    }

    .close-lightbox:hover {
      color: #8a0e16;
    }

    .lightbox-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .lightbox-item {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .lightbox-item:hover {
      transform: scale(1.03);
    }

    .lightbox-item img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }

    /* DARK MODE OVERRIDES FOR GALLERY/LIGHTBOX */
    body.dark .gallery-card, body.dark .event-card {
      background: #1e1e1e;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }

    body.dark .gallery-text {
      background: #2a2a2a;
      color: #f4c430;
      border-top-color: #333;
    }

    body.dark .lightbox-content {
      background: #1e1e1e;
      color: #e0e0e0;
    }

    body.dark .lightbox-title {
      color: #f4c430;
    }"""

if css_old in content:
    content = content.replace(css_old, css_new)
else:
    print("WARNING: Could not find old CSS block to replace.")

# 2. Remove the inline syntax error CSS block at lines 607-631
inline_css_old = """<style>
/* Override to fit within new main/container structure */



.gallery-img { 
    background: #f4f6f9; 
    height: 180px; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    overflow: hidden;
}
.gallery-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}
.gallery-card:hover .gallery-img img {
    transform: scale(1.05);
}
/* Global active item fixes */
.sub-btn.active-item, 
</style>"""
if inline_css_old in content:
    content = content.replace(inline_css_old, "")
else:
    print("WARNING: Could not find inline syntax error CSS block.")


# 3. Add JS script and Lightbox HTML.
lightbox_html = """  <!-- PHOTO GALLERY LIGHTBOX MODAL -->
  <div id="galleryLightbox" class="lightbox">
    <div class="lightbox-content">
      <div class="lightbox-header">
        <h3 class="lightbox-title" id="lightboxTitle">Gallery</h3>
        <span class="close-lightbox" onclick="closeLightbox()">&times;</span>
      </div>
      <div class="lightbox-grid" id="lightboxGrid">
        <!-- Images injected by JS -->
      </div>
    </div>
  </div>

  <script>
    let dynamicGalleryData = {};

    async function fetchGalleryData() {
      try {
        const res = await fetch('/api/images?category=facility');
        const json = await res.json();
        const data = json.data || [];
        
        // Group by subcategory name (normalized to lowercase)
        const grouped = {};
        data.forEach(img => {
          const sub = (img.subcategory || "").toLowerCase().trim();
          if (!grouped[sub]) grouped[sub] = [];
          grouped[sub].push(img.url);
        });
        dynamicGalleryData = grouped;
        return grouped;
      } catch (e) {
        console.error("Error fetching gallery data:", e);
        return {};
      }
    }

    // Initialize gallery images in cards
    async function initGallery() {
      await fetchGalleryData();
      const containers = document.querySelectorAll('.gallery-img');
      containers.forEach(container => {
        const category = (container.getAttribute('data-category') || "").toLowerCase().trim();
        const images = dynamicGalleryData[category] || [];

        if (images.length === 0) {
            // Leave hardcoded images alone if no dynamic results
            return;
        }

        container.innerHTML = '';
        images.forEach((src, index) => {
          const img = document.createElement('img');
          img.src = src;
          if (index === 0) img.classList.add('active');
          container.appendChild(img);
        });

        // Start cycling for this container
        let currentIndex = 0;
        setInterval(() => {
          const imgs = container.querySelectorAll('img');
          if (imgs.length <= 1) return;

          imgs[currentIndex].classList.remove('active');
          currentIndex = (currentIndex + 1) % imgs.length;
          imgs[currentIndex].classList.add('active');
        }, 5000);
      });
    }

    // Lightbox functions
    function openLightbox(category) {
      const lightbox = document.getElementById('galleryLightbox');
      const title = document.getElementById('lightboxTitle');
      const grid = document.getElementById('lightboxGrid');

      title.innerText = category;
      grid.innerHTML = ''; // Clear previous

      const images = dynamicGalleryData[category.toLowerCase().trim()] || [];

      if (images.length === 0) {
        // No uploads yet — show a clean empty state
        grid.innerHTML = `
          <div style="grid-column:1/-1; text-align:center; padding:40px 20px; color:#888;">
            <div style="font-size:48px; margin-bottom:12px;">🖼️</div>
            <p style="font-size:16px; font-weight:600; color:#555; margin-bottom:6px;">No Photos Uploaded Yet</p>
            <p style="font-size:13px; color:#999;">Photos for <strong>${category}</strong> will appear here once uploaded by the admin.</p>
          </div>`;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        return;
      }

      images.forEach(src => {
        const div = document.createElement('div');
        div.className = 'lightbox-item';
        const img = document.createElement('img');
        img.src = src;
        img.alt = category;
        div.appendChild(img);
        grid.appendChild(div);
      });

      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    function closeLightbox() {
      const lightbox = document.getElementById('galleryLightbox');
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Close lightbox on outside click
    window.onclick = function (event) {
      const lightbox = document.getElementById('galleryLightbox');
      if (event.target == lightbox) {
        closeLightbox();
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      initGallery();
    });
  </script>
"""

if "galleryLightbox" not in content:
    content = content.replace("<!-- FOOTER -->", lightbox_html + "\n  <!-- FOOTER -->")


# 4. Modify all the cards
def replace_card(match):
    card_class = match.group(1) # gallery-card or event-card
    img_tag = match.group(2)
    text = match.group(3)
    text_clean = text.strip()
    
    # Extract the original src from img_tag
    src_match = re.search(r'src="([^"]+)"', img_tag)
    src = src_match.group(1) if src_match else ""
    
    return f'''<div class="{card_class}" onclick="openLightbox('{text_clean}')">
<div class="gallery-img" data-category="{text_clean}">
    <img src="{src}" class="active" alt="{text_clean}">
</div>
<div class="gallery-text">{text_clean}</div>
</div>'''

# We need to find patterns like:
# <div class="gallery-card">
# <div class="gallery-img">
#     <img src="/static/images/campus1.jpg.jpeg" data-slug="facility_library_1" data-fallback="/static/images/campus1.jpg.jpeg" alt="Library">
# </div>
# <div class="gallery-text">Institute Library</div>
# </div>

pattern = re.compile(
    r'<div class="(gallery-card|event-card)">\s*<div class="gallery-img">(.*?)</div>\s*<div class="gallery-text">(.*?)</div>\s*</div>',
    re.DOTALL
)

content = pattern.sub(replace_card, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: Transformations applied.")
