import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"

# Bootstrap and FontAwesome should go FIRST in head, before any page styles
# so that page-specific CSS properly overrides Bootstrap defaults
bootstrap_head = """<!-- HEADER & NAVBAR REQUIRED CSS - MUST BE FIRST -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">"""

# Local CSS (header, navbar, style) need correct relative paths
local_css_template = """<link rel="stylesheet" href="{prefix}css/header.css">
<link rel="stylesheet" href="{prefix}css/navbar.css">"""

# Additional fix: after all styles, add an override to restore flex for .container
# This ensures Bootstrap doesn't break the sidebar layouts
flex_fix = """<style>
/* FIX: Restore flex for page sidebar layout containers (Bootstrap override) */
.container { display: flex !important; }
</style>"""

html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
count = 0

for file_path in html_files:
    if os.path.basename(file_path).lower() in ["base.html", "header_footer.html"]:
        continue

    rel_path = os.path.relpath(file_path, base_dir)
    if os.path.isdir(file_path):
        continue
    depth = rel_path.count(os.sep)
    prefix = "../" * depth

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # STEP 1: Remove previously injected header+navbar CSS block to avoid duplicates
        content = re.sub(
            r'<!-- HEADER & NAVBAR REQUIRED CSS.*?</link>|<!-- HEADER & NAVBAR REQUIRED CSS.*?(?=<)',
            '', content, flags=re.DOTALL
        )
        # Remove any old injected blocks
        content = re.sub(
            r'<!-- HEADER & NAVBAR REQUIRED CSS -->\n.*?bootstrap\.min\.css.*?\n.*?navbar\.css.*?\n.*?style\.css.*?\n',
            '', content, flags=re.DOTALL
        )
        content = re.sub(
            r'<!-- HEADER & NAVBAR REQUIRED CSS -->\n(?:.*?\n){1,10}',
            '', content, flags=re.DOTALL
        )

        # Remove old flex-fix block if already present
        content = re.sub(
            r'<style>\s*/\* FIX: Restore flex.*?</style>',
            '', content, flags=re.DOTALL
        )

        # Remove old standalone bootstrap/fontawesome link injections
        content = re.sub(
            r'<link[^>]*font-awesome[^>]*>\n',
            '', content
        )
        content = re.sub(
            r'<link[^>]*bootstrap\.min\.css[^>]*>\n',
            '', content
        )

        # STEP 2: Build the local CSS with corrected paths
        local_css = local_css_template.format(prefix=prefix)

        # STEP 3: Insert bootstrap at the very START of <head> (right after <head> tag)
        head_match = re.search(r'<head>', content, flags=re.IGNORECASE)
        if head_match:
            insert_pos = head_match.end()
            content = content[:insert_pos] + "\n" + bootstrap_head + "\n" + content[insert_pos:]

        # STEP 4: Insert local CSS (header.css, navbar.css) just before </head>
        # Also add the flex fix LAST so it overrides Bootstrap's .container
        if "css/header.css" not in content:
            content = re.sub(
                r'(</head>)',
                f"{local_css}\n{flex_fix}\n\\1",
                content, flags=re.IGNORECASE
            )
        elif "FIX: Restore flex" not in content:
            # header.css already there, just add flex fix
            content = re.sub(
                r'(</head>)',
                f"{flex_fix}\n\\1",
                content, flags=re.IGNORECASE
            )

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Fixed: {rel_path}")
        count += 1

    except Exception as e:
        print(f"Error on {rel_path}: {e}")

print(f"\nDone. Fixed {count} files.")
