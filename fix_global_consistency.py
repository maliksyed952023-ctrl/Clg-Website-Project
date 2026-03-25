import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        file_dir = os.path.dirname(file_path)
        
        # --- 1. Fix Facilities Links ---
        # Calculate relative path to FACILITIES/Facility.html
        target_abs = os.path.join(base_dir, "FACILITIES", "Facility.html")
        rel_to_facility = os.path.relpath(target_abs, file_dir).replace("\\", "/")
        
        # Pattern 1: href="facilities.html" (with or without #hash)
        content = re.sub(r'href="facilities\.html(#\w+)?"', f'href="{rel_to_facility}"', content)
        # Also handles ?section=
        content = re.sub(r'href="facilities\.html\?section=([^"]+)"', f'href="{rel_to_facility}?section=\\1"', content)
        # Pattern 2: href="FACILITIES/Facility.html" (ensure it is relative from this file)
        content = re.sub(r'href="FACILITIES/Facility\.html([^"]*)"', f'href="{rel_to_facility}\\1"', content)

        # --- 2. Standardize Sidebar Styling ---
        if '<div class="sidebar"' in content:
            # Inject sidebar.css link
            rel_to_css = os.path.relpath(os.path.join(base_dir, "css", "sidebar.css"), file_dir).replace("\\", "/")
            css_link = f'<link rel="stylesheet" href="{rel_to_css}">'
            
            if css_link not in content:
                content = content.replace("</head>", f"  {css_link}\n</head>")

            # Remove inline sidebar styles (aggressive cleanup)
            # Identifying the blocks by common keywords
            style_blocks = re.findall(r'<style>.*?</style>', content, re.DOTALL)
            for block in style_blocks:
                if ".sidebar" in block or ".main-btn" in block or ".sub-btn" in block:
                    # We only remove it if it looks like the old local one
                    # but be careful not to remove global dark mode or translate fixes
                    clean_block = block
                    # Regex to remove specific CSS rules
                    rules_to_remove = [
                        r'\.sidebar\s*\{[^}]*\}',
                        r'\.main-btn\s*\{[^}]*\}',
                        r'\.sub-btn\s*\{[^}]*\}',
                        r'\.submenu\s*\{[^}]*\}',
                        r'\.arrow\s*\{[^}]*\}',
                        r'\.content\s*\{[^}]*\}'
                    ]
                    for rule in rules_to_remove:
                        clean_block = re.sub(rule, "", clean_block, flags=re.MULTILINE|re.DOTALL)
                    
                    # If after cleaning the block is essentially empty or just has comments, remove the whole block
                    if not re.search(r'[a-zA-Z0-9]', re.sub(r'/\*.*?\*/', "", clean_block, flags=re.DOTALL).replace("<style>", "").replace("</style>", "").strip()):
                        content = content.replace(block, "")
                    else:
                        content = content.replace(block, clean_block)

        # --- 3. Font Uniformity ---
        # Ensure Playfair Display and Source Sans 3 are included
        font_link = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
        if 'fonts.googleapis.com' in content and font_link not in content and '<head>' in content:
             content = content.replace("</head>", f"  {font_link}\n</head>")

        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Fixed: {file_path}")

    except Exception as e:
        print(f"Error {file_path}: {e}")

print("Global update complete.")
