import os
import glob
import re
from bs4 import BeautifulSoup

base_dir = r"c:\collge_web\Clg Website Project"
base_file = os.path.join(base_dir, "base.html")

with open(base_file, "r", encoding="utf-8") as f:
    base_content = f.read()

css_match = re.search(r'(<!-- FOOTER & POLICY CSS -->.*?</style>)', base_content, flags=re.DOTALL)
css_block = css_match.group(1) if css_match else ""

header_match = re.search(r'(<!-- ===== UTILITY BAR ===== -->.*?<!-- NAVBAR ENDS HERE -->)', base_content, flags=re.DOTALL|re.IGNORECASE)
header_block = header_match.group(1) if header_match else ""

footer_match = re.search(r'(<footer class="college-footer">.*?</footer>)', base_content, flags=re.DOTALL|re.IGNORECASE)
footer_block = footer_match.group(1) if footer_match else ""

js_match = re.search(r'(<script>\s*function setFont.*?</script>)', base_content, flags=re.DOTALL)
js_block = js_match.group(1) if js_match else ""


def adjust_paths(html_snippet, depth):
    if depth == 0 or not html_snippet:
        return html_snippet
    prefix = '../' * depth
    soup = BeautifulSoup(html_snippet, 'html.parser')
    
    for tag in soup.find_all(['a', 'link']):
        href = tag.get('href')
        if href and not href.startswith(('http', '#', 'mailto:', '//', 'javascript:')):
            tag['href'] = prefix + href
            
    for tag in soup.find_all(['img', 'script']):
        src = tag.get('src')
        if src and not src.startswith(('http', '//', 'data:')):
            tag['src'] = prefix + src
            
    return str(soup)

html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for file_path in html_files:
    if os.path.basename(file_path).lower() in ["base.html", "header_footer.html"]:
        continue

    rel_path = os.path.relpath(file_path, base_dir)
    # Exclude directories
    if os.path.isdir(file_path): continue
    depth = rel_path.count(os.sep)

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # REMOVE DUMMY HEADERS/FOOTERS
        content = re.sub(r'<div class="header">.*?</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<div class="topnav">.*?</div>', '', content, flags=re.DOTALL)
        content = re.sub(r'<header class="header".*?</header>', '', content, flags=re.DOTALL|re.IGNORECASE)
        content = re.sub(r'<header class="top-header".*?</header>', '', content, flags=re.DOTALL|re.IGNORECASE)
        content = re.sub(r'<nav class="navbar".*?</nav>', '', content, flags=re.DOTALL|re.IGNORECASE)
        content = re.sub(r'<div class="utility-bar">.*?</div>', '', content, flags=re.DOTALL|re.IGNORECASE)
        content = re.sub(r'<footer.*?>.*?</footer>', '', content, flags=re.DOTALL|re.IGNORECASE)

        # Remove previous instances to prevent duplicates if script was run multiple times
        content = re.sub(r'<!-- ===== UTILITY BAR ===== -->.*?<!-- NAVBAR ENDS HERE -->', '', content, flags=re.DOTALL)
        content = re.sub(r'<script>\s*function setFont.*?</script>', '', content, flags=re.DOTALL)

        target_css = adjust_paths(css_block, depth)
        target_header = adjust_paths(header_block, depth)
        target_footer = adjust_paths(footer_block, depth)
        target_js = adjust_paths(js_block, depth)

        # ADD CSS
        if target_css and "FOOTER & POLICY CSS" not in content:
            if "</head>" in content.lower():
                content = re.sub(r'</head>', f'\n{target_css}\n</head>', content, flags=re.IGNORECASE)

        # ADD HEADER
        if target_header and '<div class="utility-bar">' not in content:
            body_match = re.search(r'<body.*?>', content, flags=re.IGNORECASE)
            if body_match:
                end_pos = body_match.end()
                content = content[:end_pos] + '\n' + target_header + '\n' + content[end_pos:]

        # ADD FOOTER AND JS
        if target_footer and "college-footer" not in content:
            if '<div id="google_translate_element"' in content:
                content = content.replace('<div id="google_translate_element"', f'\n{target_footer}\n{target_js}\n\n<div id="google_translate_element"')
            elif '</body>' in content.lower():
                content = re.sub(r'</body>', f'\n{target_footer}\n{target_js}\n</body>', content, flags=re.IGNORECASE)
            else:
                content += f"\n{target_footer}\n{target_js}\n"

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"Updated {rel_path}")

    except Exception as e:
        print(f"Error on {rel_path}: {e}")

print("Done")
