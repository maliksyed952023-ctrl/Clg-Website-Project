import os
import re
import glob

def main():
    base_dir = r"c:\website_college1\templates"
    base_html_path = os.path.join(base_dir, "base.html")
    
    # 1. Extract the complete, updated navbar from base.html
    with open(base_html_path, "r", encoding="utf-8") as f:
        base_content = f.read()
        
    nav_pattern = re.compile(r"<!-- NAVBAR STARTS HERE -->.*?<!-- NAVBAR ENDS HERE -->", re.DOTALL)
    nav_match = nav_pattern.search(base_content)
    
    if not nav_match:
        print("Error: Could not find the NAVBAR block in base.html!")
        return
        
    updated_navbar = nav_match.group(0)
    print(f"Successfully extracted updated navbar from base.html ({len(updated_navbar)} characters).")
    
    # 2. Iterate through all .html files in the templates folder and its subfolders
    html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
    
    files_updated = 0
    for file_path in html_files:
        # Skip base.html and header_footer.html since they are already updated
        if file_path.endswith("base.html") or file_path.endswith("header_footer.html"):
            continue
            
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Check if file has the navbar block
        if nav_pattern.search(content):
            new_content = nav_pattern.sub(updated_navbar, content)
            
            # Only write if there was a change
            if new_content != content:
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated: {os.path.relpath(file_path, base_dir)}")
                files_updated += 1
                
    print(f"\nDone! Successfully updated the mobile menu and hamburger button across {files_updated} individual files.")

if __name__ == "__main__":
    main()
