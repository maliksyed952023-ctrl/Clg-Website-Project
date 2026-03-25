import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

# Pages with sidebars that need the sidebar.css link
PAGES_WITH_SIDEBARS = [
    "About Institute.html", "tposection.html", "studentwelfare.html",
    "contactus.html", "privacy.html", "Addmission\\ADDMISSION.html",
    "Exam-Cell\\E-cell.html", "FACILITIES\\Facility.html"
]

def get_link(file_path, rel_target):
    file_dir = os.path.dirname(file_path)
    return os.path.relpath(os.path.join(base_dir, rel_target), file_dir).replace("\\", "/")

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original = content
        file_has_sidebar = '<div class="sidebar"' in content or 'class="sidebar"' in content

        if file_has_sidebar:
            # 1. Inject sidebar.css if not already there
            css_rel = get_link(file_path, "css/sidebar.css")
            css_tag = f'<link rel="stylesheet" href="{css_rel}">'
            if css_tag not in content and css_rel.replace("\\","/") not in content:
                content = content.replace("</head>", f"  {css_tag}\n</head>")

            # 2. Remove all remnant standalone inline sidebar/container override styles
            # Dangerous patterns to remove (only if they are inside the <style> blocks)
            inline_style_fixes = [
                # Old container flex overrides like: .container { display: flex !important; }
                r'/\*\s*FIX:.*?\*[/]\s*',
                r'\.container\s*\{\s*display\s*:\s*flex\s*!important\s*;\s*\}',
            ]
            
            style_pattern = re.compile(r'(<style[^>]*>)(.*?)(</style>)', re.DOTALL)
            
            def style_cleaner(m):
                opening = m.group(1)
                body = m.group(2)
                closing = m.group(3)
                
                changed = False
                
                old_body = body
                # Remove old sidebar specific inline rules
                rules_to_strip = [
                    r'/\*\s*FIX:?.*?\*/',                   # /* FIX: ... */
                    r'\.container\s*\{\s*display\s*:\s*flex\s*!important;\s*\}',  # .container...
                    r'/\*\s*SIDEBAR BUTTON\s*\*/[\s\S]*?(?=\n\n|/\*)',
                    r'/\*\s*SIDEBAR ACTIVE HIGHLIGHT[^\*]*\*/[^/]*',
                ]
                for rule in rules_to_strip:
                    body = re.sub(rule, "", body, flags=re.IGNORECASE|re.DOTALL)
                
                if body.strip() != old_body.strip():
                    changed = True
                
                # Remove completely empty remaining style blocks
                inner_stripped = re.sub(r'/\*.*?\*/', '', body, flags=re.DOTALL).strip()
                if not inner_stripped:
                    return ""
                
                return opening + body + closing
        
            content = style_pattern.sub(style_cleaner, content)

        if content != original:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Cleaned: {os.path.basename(file_path)}")

    except Exception as e:
        print(f"Error {file_path}: {e}")

print("Done cleaning inline overrides.")
