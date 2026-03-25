import os
import glob

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

search_index_script = '<script src="{prefix}js/search_index.js"></script>'
search_script = '<script src="{prefix}js/search.js"></script>'

for file_path in html_files:
    if "header_footer.html" in file_path:
        continue
        
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Check if already injected
        if "js/search.js" in content:
            continue
            
        # Determine prefix for js/ folder
        rel_path = os.path.relpath(file_path, base_dir)
        depth = len(rel_path.split(os.sep)) - 1
        prefix = ""
        if depth > 0:
            prefix = "../" * depth
            
        index_tag = search_index_script.format(prefix=prefix)
        logic_tag = search_script.format(prefix=prefix)
        
        # Inject before </body>
        if "</body>" in content:
            new_content = content.replace("</body>", f"\n  {index_tag}\n  {logic_tag}\n</body>")
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Injected into {file_path}")
            
    except Exception as e:
        print(f"Error {file_path}: {e}")
