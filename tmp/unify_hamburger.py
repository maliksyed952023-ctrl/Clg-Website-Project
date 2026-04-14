"""
Unify navbar-toggler icon across all HTML templates.
Replaces <span class="navbar-toggler-icon"></span> with <i class="fas fa-bars"></i>
and removes inline styles from the button to let navbar.css handle it.
"""
import os
import re

templates_root = r"c:\website_college1\templates"
old_icon = r'<span class="navbar-toggler-icon"></span>'
new_icon = r'<i class="fas fa-bars"></i>'

files_updated = []
files_skipped = []

for dirpath, dirnames, filenames in os.walk(templates_root):
    for fname in filenames:
        if not fname.endswith('.html'):
            continue
        
        fpath = os.path.join(dirpath, fname)
        
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # 1. Replace the icon
        if old_icon in content:
            new_content = content.replace(old_icon, new_icon)
            
            # 2. Clean up navbar-toggler button inline styles if present (to let navbar.css take over)
            # Find: <button class="navbar-toggler" ... style="...">
            # Use regex to find button and pull out style
            match = re.search(r'<button class="navbar-toggler"[^>]+style="[^"]+"', new_content)
            if match:
                # Remove the style attribute specifically from the navbar-toggler button
                # We target border-color since that's what base.html had
                new_content = re.sub(r'(<button class="navbar-toggler"[^>]+)style="[^"]+"', r'\1', new_content)
            
            if new_content != content:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_updated.append(fpath)
            else:
                files_skipped.append(fpath)
        else:
            files_skipped.append(fpath)

print(f"\n=== DONE ===")
print(f"Updated: {len(files_updated)} files")
for f in files_updated:
    print(f"  + {f}")
print(f"\nSkipped: {len(files_skipped)} files")
