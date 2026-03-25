import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

# Define the definitive sidewalk CSS link
def get_sidebar_link(file_path):
    file_dir = os.path.dirname(file_path)
    rel_to_css = os.path.relpath(os.path.join(base_dir, "css", "sidebar.css"), file_dir).replace("\\", "/")
    return f'<link rel="stylesheet" href="{rel_to_css}">'

# Define the definitive Facility link
def get_facility_link(file_path):
    file_dir = os.path.dirname(file_path)
    target_abs = os.path.join(base_dir, "FACILITIES", "Facility.html")
    return os.path.relpath(target_abs, file_dir).replace("\\", "/")

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        
        # --- 1. Robust Facility Link Fix ---
        fac_link = get_facility_link(file_path)
        # Match anything like href="...facilities.html#gymkhana" or href="facilities.html"
        content = re.sub(r'href="[^"]*?facilities\.html(#\w+)?"', f'href="{fac_link}\\1"', content)
        content = re.sub(r'href="[^"]*?facilities\.html\?section=([^"]+)"', f'href="{fac_link}?section=\\1"', content)

        # --- 2. Comprehensive Sidebar Restyling ---
        if '<div class="sidebar"' in content:
            # Link CSS
            sidebar_css = get_sidebar_link(file_path)
            if sidebar_css not in content:
                content = content.replace("</head>", f"  {sidebar_css}\n</head>")
            
            # Wipe out old internal sidebar styles
            # Look for <style> blocks and remove CSS rules for sidebar components
            style_pattern = re.compile(r'(<style>.*?</style>)', re.DOTALL)
            
            def style_replacer(match):
                block = match.group(1)
                # If block contains sidebar selectors, strip them
                if any(x in block for x in [".sidebar", ".main-btn", ".sub-btn", ".submenu", ".arrow"]):
                    # More aggressive rule removal
                    rules = [
                        r'\.sidebar\s*\{[^}]*\}',
                        r'\.main-btn[^}]*\{[^}]*\}',
                        r'\.sub-btn[^}]*\{[^}]*\}',
                        r'\.submenu\s*\{[^}]*\}',
                        r'\.arrow\s*\{[^}]*\}',
                        r'\/\*.*?(?:SIDEBAR|MAIN BUTTON|SUB MENU).*?\*\/',
                        r'/\* ✅ Active sidebar item highlight \*/'
                    ]
                    for r in rules:
                        block = re.sub(r, "", block, flags=re.IGNORECASE|re.DOTALL)
                
                # Check if block is now empty (ignoring white space and <style> tags)
                inner = block.replace("<style>", "").replace("</style>", "").strip()
                if not inner or not re.search(r'[a-zA-Z]', inner):
                    return ""
                return block

            content = style_pattern.sub(style_replacer, content)

        # --- 3. Content Title Standardizer ---
        # The user's screenshot has a specific underline for h2
        # My sidebar.css handles h2 in .content
        
        # --- 4. Font Fix (Ensuring common fonts) ---
        font_link = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
        if '<head>' in content and font_link[:50] not in content:
            content = content.replace("</head>", f"  {font_link}\n</head>")

        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated: {file_path}")

    except Exception as e:
        print(f"Error {file_path}: {e}")

print("V2 Update finished.")
