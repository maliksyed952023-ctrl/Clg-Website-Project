import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

for file_path in html_files:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        
        # Standardize body font-family in any <style> block
        # Match body { ... font-family: ... }
        content = re.sub(
            r"(body\s*\{[^}]*font-family:\s*)[^;]+(;)",
            r"\1'Source Sans 3', 'Segoe UI', Arial, sans-serif\2",
            content,
            flags=re.IGNORECASE
        )

        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Font Updated: {file_path}")

    except Exception as e:
        print(f"Error {file_path}: {e}")

print("Font Standardization finished.")
