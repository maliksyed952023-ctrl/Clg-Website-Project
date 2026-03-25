import re

# ---- Fix 1: ADDMISSION.html ----
addmission_path = r"c:\collge_web\Clg Website Project\Addmission\ADDMISSION.html"
with open(addmission_path, "r", encoding="utf-8") as f:
    content = f.read()

original = content

# Remove old grey submenu rule
old_rule = """.submenu div{\r\npadding:12px;\r\nborder-bottom:1px solid #ccc;\r\ncursor:pointer;\r\n}\r\n\r\n.submenu div:hover{\r\nbackground:#d0d5d7;\r\n}"""
content = content.replace(old_rule, "")

# Add class="sub-btn" to submenu divs that don't have it
content = re.sub(r'<div onclick="showAdmission\(', '<div class="sub-btn" onclick="showAdmission(', content)
content = re.sub(r'<div onclick="showSection\(', '<div class="sub-btn" onclick="showSection(', content)

# Add arrows to those sub-btns if missing
# Match sub-btn divs and append arrow if they don't already have one
def add_arrow(m):
    tag = m.group(0)
    if "arrow" not in tag:
        tag = tag[:-6] + ' <span class="arrow">&#9658;</span></div>'
    return tag

content = re.sub(r'<div class="sub-btn" onclick="showAdmission\([^"]+"\)>[^<]+</div>', add_arrow, content)
content = re.sub(r'<div class="sub-btn" onclick="showSection\([^"]+"\)>[^<]+</div>', add_arrow, content)

if content != original:
    with open(addmission_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Admission fixed.")
else:
    print("No changes to Admission (patterns may differ).")

# ---- Fix 2: Facility.html - fix all internal nav hrefs ----
facility_path = r"c:\collge_web\Clg Website Project\FACILITIES\Facility.html"
with open(facility_path, "r", encoding="utf-8") as f:
    content = f.read()

original_f = content

# The Facility.html navbar links are missing "../" prefix.
# They use: href="About Institute.html" instead of href="../About Institute.html"
# Strategy: find all hrefs that don't start with ./ or ../ or http and are pointing to root-level pages
replacements = [
    ('href="About Institute.html"', 'href="../About Institute.html"'),
    ('href="departments.html"', 'href="../departments.html"'),
    ('href="studentwelfare.html"', 'href="../studentwelfare.html"'),
    ('href="studentwelfare.html?section=emagazine"', 'href="../studentwelfare.html?section=emagazine"'),
    ('href="studentwelfare.html?section=scholarship"', 'href="../studentwelfare.html?section=scholarship"'),
    ('href="tposection.html"', 'href="../tposection.html"'),
    ('href="tposection.html?section=profile"', 'href="../tposection.html?section=profile"'),
    ('href="tposection.html?section=recruiters"', 'href="../tposection.html?section=recruiters"'),
    ('href="tposection.html?section=placement"', 'href="../tposection.html?section=placement"'),
    ('href="downloads.html"', 'href="../downloads.html"'),
    ('href="contact.html"', 'href="../contact.html"'),
    ('href="Exam-Cell/E-cell.html"', 'href="../Exam-Cell/E-cell.html"'),
    ('href="Exam-Cell/curriculum-development.html"', 'href="../Exam-Cell/curriculum-development.html"'),
    ('href="Addmission/ADDMISSION.html"', 'href="../Addmission/ADDMISSION.html"'),
    ('href="Addmission/ADDMISSION.html?section=programme"', 'href="../Addmission/ADDMISSION.html?section=programme"'),
    ('href="Addmission/ADDMISSION.html?section=admissiondetails"', 'href="../Addmission/ADDMISSION.html?section=admissiondetails"'),
    ('href="college_dept/departments/', 'href="../college_dept/departments/'),
    # Fix HOME button
    ('href="base.html"', 'href="../base.html"'),
    # Fix images
    ('src="images/logo.jpeg"', 'src="../images/logo.jpeg"'),
    ('src="images/college.jpg"', 'src="../images/college.jpg"'),
    # Fix CSS links
    ('href="css/footer.css"', 'href="../css/footer.css"'),
    ('href="css/header.css"', 'href="../css/header.css"'),
    ('href="css/navbar.css"', 'href="../css/navbar.css"'),
    ('href="css/sidebar.css"', 'href="../css/sidebar.css"'),
    # privacy link
    ('href="privacy.html"', 'href="../privacy.html"'),
    # contact link
    ('href="contact.html"', 'href="../contact.html"'),
    # JS files  
    ('src="JS/search_index.js"', 'src="../JS/search_index.js"'),
    ('src="JS/search.js"', 'src="../JS/search.js"'),
    ('src="js/search_index.js"', 'src="../js/search_index.js"'),
    ('src="js/search.js"', 'src="../js/search.js"'),
]

for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"Fixed: {old} -> {new}")

if content != original_f:
    with open(facility_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Facility.html path fixes applied.")
else:
    print("No changes to Facility.html.")
