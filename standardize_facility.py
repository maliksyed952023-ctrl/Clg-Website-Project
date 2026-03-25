import os
import re

base_dir = r"c:\collge_web\Clg Website Project"
base_html = os.path.join(base_dir, "base.html")
about_html = os.path.join(base_dir, "About Institute.html")
facility_html = os.path.join(base_dir, "FACILITIES", "Facility.html")

with open(base_html, "r", encoding="utf-8") as f:
    base_content = f.read()

with open(about_html, "r", encoding="utf-8") as f:
    about_content = f.read()
    
with open(facility_html, "r", encoding="utf-8") as f:
    facility_content = f.read()

# Extract from about_html header and footer
header_match = re.search(r'(.*?<div class="container\">)', about_content, re.DOTALL)
header = header_match.group(1) if header_match else ""
# We need to adjust standard CSS link paths since this is inside FACILITIES/ folder
header = header.replace('href="css/', 'href="../css/')
header = header.replace('href="style.css"', 'href="../style.css"')
header = header.replace('src="images/', 'src="../images/')

# Extract sidebar and content logic from facility_html
sidebar_match = re.search(r'(<div class="sidebar\">.*?</div>\s*<div class="content\">.*?)<script', facility_content, re.DOTALL)
body_content = sidebar_match.group(1) if sidebar_match else ""
# Need to add closing </div> for content, </div> for container, </main> and then footer
body_content += '\n</div>\n</div>\n'

footer_match = re.search(r'(  <footer class="college-footer\">.*)', about_content, re.DOTALL)
footer = footer_match.group(1) if footer_match else ""
# Fix footer paths
footer = footer.replace('src="images/', 'src="../images/')
footer = footer.replace('href="privacy.html"', 'href="../privacy.html"')
footer = footer.replace('href="contact.html"', 'href="../contact.html"')
footer = footer.replace('src="js/', 'src="../js/')

# Fix facility body paths 
body_content = body_content.replace('href="facilities.html', 'href="Facility.html')
# Fix image paths inside body_content that might exist
body_content = body_content.replace('src="images/', 'src="../images/')


# Keep original facility css/js but since we are replacing head, we inject them into header
facility_head_inject = """
<link rel="stylesheet" href="facility_style.css">
<style>
/* Override to fit within new main/container structure */
.container { display: flex !important; }
.content { flex: 1; margin-left: 30px; }
.sidebar { width: 300px; }
.gallery-img { background: #ccc; }
/* Global active item fixes */
.sub-btn.active-item, .main-btn.active-item {
    background: #d4eef0;
    border-left: 5px solid #0e5a61;
    font-weight: bold;
    color: #0e5a61;
}
</style>
"""
header = header.replace('</head>', facility_head_inject + '</head>')


# The old facility used local facility_script.js. Let's include that at the end.
facility_script_inject = """
<script src="facility_script.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        let section = urlParams.get('section');
        if(section) {
            // Find function handling sections. Usually showSection()
            if(typeof showSection === 'function') {
                showSection(section);
            }
        }
    });
</script>
"""

footer = footer.replace('</body>', facility_script_inject + '\n</body>')

new_facility = header + body_content + footer

with open(facility_html, 'w', encoding='utf-8') as f:
    f.write(new_facility)

print('Updated FACILITIES/Facility.html with global layout')
