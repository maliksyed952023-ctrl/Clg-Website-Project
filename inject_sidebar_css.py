import os
import glob

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        if '<div class="sidebar"' not in content and 'class="sidebar"' not in content:
            continue

        original = content
        file_dir = os.path.dirname(file_path)

        # Compute relative path to sidebar.css
        rel_css = os.path.relpath(os.path.join(base_dir, "css", "sidebar.css"), file_dir).replace("\\", "/")
        css_tag = f'<link rel="stylesheet" href="{rel_css}">'

        # Check if it's already included (match by rel path)
        if "sidebar.css" not in content:
            # Insert RIGHT BEFORE </head>
            content = content.replace("</head>", f"  {css_tag}\n</head>")

        if content != original:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Injected sidebar.css: {file_path}")
        else:
            print(f"Already has sidebar.css: {file_path}")

    except Exception as e:
        print(f"Error {file_path}: {e}")

print("Done injecting.")
