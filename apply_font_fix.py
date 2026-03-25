import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"

# We will replace the old setFont(size) with a new robust zoom-based scaler
font_js_replacement = """function setFont(action) {
  event.stopPropagation();
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
(function() {
  let savedZoom = parseFloat(localStorage.getItem('site_zoom'));
  if (savedZoom && savedZoom !== 1.0) {
    document.body.style.zoom = savedZoom;
  }
})();"""

html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
count = 0

for file_path in html_files:
    if os.path.basename(file_path).lower() in ["header_footer.html"]:
        continue

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Step 1: Replace old onclick="setFont('14px')" in the accessibility controls
        # Make sure to handle all forms like A-, A, A+
        content = re.sub(r'onclick="setFont\(\'14px\'\)"', 'onclick="setFont(\'decrease\')"', content)
        content = re.sub(r'onclick="setFont\(\'16px\'\)"', 'onclick="setFont(\'reset\')"', content)
        content = re.sub(r'onclick="setFont\(\'18px\'\)"', 'onclick="setFont(\'increase\')"', content)

        # Step 2: Replace the definition of setFont logic.
        # Find the old simple function:
        # function setFont(size){ document.body.style.fontSize=size; }
        
        old_func_pattern = r'function\s+setFont\s*\(\s*size\s*\)\s*\{\s*document\.body\.style\.fontSize\s*=\s*size\s*;\s*\}'
        
        if re.search(old_func_pattern, content):
            content = re.sub(old_func_pattern, font_js_replacement, content)
            
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            
            count += 1
            print(f"Patched fonts in: {os.path.relpath(file_path, base_dir)}")

    except Exception as e:
        print(f"Error on {file_path}: {e}")

print(f"\nFixed {count} files.")
