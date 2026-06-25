import os
import re
import glob

def main():
    base_dir = r"c:\website_college1\templates"
    
    # We will replace any HTML footer block with this single include statement.
    include_statement = "{% include 'footer_content.html' %}"
    
    # Pattern to match the footer HTML block
    # We match from <footer to </footer>, non-greedy.
    pattern = re.compile(r"<footer[^>]*>.*?</footer>", re.IGNORECASE | re.DOTALL)
    
    # Pattern to match the old inline CSS for the footer
    style_pattern = re.compile(r"<style>\s*/\*\s*Home Page Footer Specific Styles\s*\*/.*?</style>", re.IGNORECASE | re.DOTALL)
    
    # Also remove any <!-- FOOTER --> comments that might precede the block
    comment_pattern = re.compile(r"<!--\s*=*.*?FOOTER.*?=*.*?-->\s*", re.IGNORECASE)
    
    html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
    
    files_updated = 0
    for file_path in html_files:
        # Skip the files that are the source of truth
        if file_path.endswith("base.html") or file_path.endswith("footer_content.html") or file_path.endswith("header_footer.html"):
            continue
            
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = content
        
        # If the file has the old HTML footer block, replace it
        if pattern.search(content):
            # First remove the comment if it exists right before the footer
            temp_content = comment_pattern.sub("", content)
            
            # Then replace the footer block with the include
            new_content = pattern.sub(include_statement, temp_content)
            
            # Then remove the inline styles
            if style_pattern.search(new_content):
                new_content = style_pattern.sub("", new_content)
                
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated: {os.path.relpath(file_path, base_dir)}")
            files_updated += 1
                
    print(f"\nDone! Successfully updated the footer across {files_updated} individual files.")

if __name__ == "__main__":
    main()
