"""
Inject mobile.css link into all HTML templates that don't already have it.
Uses the presence of sidebar.css or header.css as the marker for injection point.
"""
import os
import re

templates_root = r"c:\website_college1\templates"
mobile_css_link = '  <link rel="stylesheet" href="{{ url_for(\'static\', filename=\'css/mobile.css\') }}">\n'

files_updated = []
files_skipped = []

for dirpath, dirnames, filenames in os.walk(templates_root):
    for fname in filenames:
        if not fname.endswith('.html'):
            continue
        
        fpath = os.path.join(dirpath, fname)
        
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Skip if already has mobile.css
        if 'mobile.css' in content:
            files_skipped.append(fpath)
            continue
        
        # Skip dashboard/login/maintenance — they are admin pages
        if fname in ('dashboard.html', 'login.html', 'maintenance_dashboard.html', '404.html'):
            files_skipped.append(fpath)
            continue
        
        # Find injection point: after the last stylesheet link in head
        # We'll inject after the LAST <link rel="stylesheet" ...> line
        lines = content.split('\n')
        last_link_idx = -1
        for i, line in enumerate(lines):
            if '<link rel="stylesheet"' in line or "link rel='stylesheet'" in line:
                last_link_idx = i
        
        if last_link_idx == -1:
            files_skipped.append(fpath)
            continue
        
        # Insert mobile.css link after the last stylesheet link
        lines.insert(last_link_idx + 1, mobile_css_link.rstrip('\n'))
        new_content = '\n'.join(lines)
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        files_updated.append(fpath)

print(f"\n=== DONE ===")
print(f"Updated: {len(files_updated)} files")
for f in files_updated:
    print(f"  + {f}")
print(f"\nSkipped: {len(files_skipped)} files")
for f in files_skipped:
    print(f"  - {f}")
