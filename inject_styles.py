import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"

css_files_to_inject = [
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">',
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">',
    '<link rel="stylesheet" href="css/header.css">',
    '<link rel="stylesheet" href="css/navbar.css">',
    '<link rel="stylesheet" href="style.css">'
]

js_files_to_inject = [
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>'
]

def adjust_path(tag_str, depth):
    if depth == 0:
        return tag_str
    prefix = '../' * depth
    # Adjust href attributes mapping to local files
    tag_str = re.sub(r'href="([^h/].*?)"', lambda m: f'href="{prefix}{m.group(1)}"', tag_str)
    # Adjust src attributes mapping to local files
    tag_str = re.sub(r'src="([^h/].*?)"', lambda m: f'src="{prefix}{m.group(1)}"', tag_str)
    return tag_str

html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
count = 0

for file_path in html_files:
    if os.path.basename(file_path).lower() in ["base.html", "header_footer.html"]:
        continue

    rel_path = os.path.relpath(file_path, base_dir)
    if os.path.isdir(file_path): continue
    depth = rel_path.count(os.sep)

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Inject CSS before </head>
        css_block = "\n<!-- HEADER & NAVBAR REQUIRED CSS -->\n"
        added_css = False
        for css in css_files_to_inject:
            # Check if likely already there by filename
            filename = re.search(r'href=".*?([^/]+\.css)"', css)
            if filename and filename.group(1) not in content:
                css_block += adjust_path(css, depth) + "\n"
                added_css = True
                
        if added_css:
            content = re.sub(r'(</head>)', rf'{css_block}\1', content, flags=re.IGNORECASE)

        # Inject JS before </body>
        js_block = "\n<!-- HEADER & NAVBAR REQUIRED JS -->\n"
        added_js = False
        for js in js_files_to_inject:
            filename = re.search(r'src=".*?([^/]+\.js)"', js)
            if filename and filename.group(1) not in content:
                js_block += adjust_path(js, depth) + "\n"
                added_js = True

        if added_js:
            content = re.sub(r'(</body>)', rf'{js_block}\1', content, flags=re.IGNORECASE)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"Injected styles/scripts into {rel_path}")
        count += 1
    except Exception as e:
        print(f"Error on {rel_path}: {e}")

print(f"Files updated: {count}")
