import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Determine path to FACILITIES folder relative to this file
        rel_path = os.path.relpath(os.path.join(base_dir, "FACILITIES"), os.path.dirname(file_path))
        facility_link = f"{rel_path}/Facility.html".replace("\\", "/")
        
        # In case we are exactly IN the FACILITIES folder, rel_path is '.', we just want 'Facility.html'
        if facility_link.startswith("./"):
            facility_link = facility_link[2:]

        original_content = content
        
        # Replace main navbar dropdown header link
        # It was <a class="nav-link" href="facilities.html">Facilities</a>
        content = re.sub(
            r'href="facilities\.html"',
            f'href="{facility_link}"',
            content
        )
        
        # Replace sublinks: href="facilities.html#gymkhana" -> href="FACILITIES/Facility.html?section=gymkhana"
        content = re.sub(
            r'href="facilities\.html#([^"]+)"',
            f'href="{facility_link}?section=\\1"',
            content
        )

        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated links in {file_path}")

    except Exception as e:
        print(f"Error {file_path}: {e}")

print("Finished updating navbar links")
