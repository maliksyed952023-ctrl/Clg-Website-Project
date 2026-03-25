import os
import glob
from bs4 import BeautifulSoup
import json
import re

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

search_data = []

for file_path in html_files:
    # Skip template or utility files
    if os.path.basename(file_path).lower() in ["header_footer.html"]:
        continue
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        soup = BeautifulSoup(content, 'html.parser')
        
        # Get title
        title_tag = soup.find('title')
        if title_tag and title_tag.text.strip():
            title = title_tag.text.strip().replace("Government Polytechnic, Chhatrapati Sambhajinagar", "").strip(" -|")
            if not title:
                title = os.path.basename(file_path).replace(".html", "").replace("-", " ").title()
        else:
            title = os.path.basename(file_path).replace(".html", "").replace("-", " ").title()
            
        # Get body text for indexing
        # Prefer <main> if it exists, otherwise use <body>
        main_content = soup.find('main')
        if not main_content:
            main_content = soup.find('body')
            
        if main_content:
            text = main_content.get_text(separator=' ', strip=True)
            # Clean up whitespace
            text = re.sub(r'\s+', ' ', text)
        else:
            text = ""
            
        # Calculate relative URL for the link
        rel_url = os.path.relpath(file_path, base_dir).replace("\\", "/")
        
        search_data.append({
            "title": title,
            "url": rel_url,
            "content": text
        })
        
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")

# Save to a JS file
js_dir = os.path.join(base_dir, "js")
os.makedirs(js_dir, exist_ok=True)
output_path = os.path.join(js_dir, "search_index.js")

with open(output_path, "w", encoding="utf-8") as f:
    f.write("const SEARCH_INDEX = " + json.dumps(search_data, ensure_ascii=False) + ";\n")

print(f"Successfully created search index at {output_path} with {len(search_data)} pages.")
