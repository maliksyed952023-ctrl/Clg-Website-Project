import os
import re

# Central Utility Bar Script Content for reference (already created in static/js/utility-bar.js)
JS_FILENAME = 'utility-bar.js'
SCRIPT_TAG = '<script src="{{ url_for(\'static\', filename=\'js/utility-bar.js\') }}"></script>'

TEMPLATES_DIR = r'c:\website_college1\templates'

def fix_template(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Only process if it has utility-bar
    if 'utility-bar' not in content:
        return

    # 1. Remove redundancy: toggleDrop, setFont, setLanguage functions and related listeners
    # This regex looks for script blocks containing setFont or toggleDrop
    
    # Remove inline toggleDrop, setFont, setLanguage, click listener
    content = re.sub(r'<script>\s*function setFont\(action\).+?document\.addEventListener\("click", function \(event\).+?\}\);\s*</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<script>\s*function setFont\(size\).+?document\.addEventListener\("click", function \(event\).+?\}\);\s*</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<script>\s*function setFont\(size\).+?\}\s*</script>', '', content, flags=re.DOTALL)
    content = re.sub(r'<script>\s*function toggleDrop\(id\).+?\}\s*</script>', '', content, flags=re.DOTALL)

    # Remove toggleTheme if it's in global-dark-mode-js
    content = re.sub(r'<script id="global-dark-mode-js">.+?</script>', '', content, flags=re.DOTALL)

    # 2. Inject the new script tag
    # We should place it before the closing </body> tag, or before other scripts.
    # To be safe, we'll place it before the search.js or before </body>
    
    if SCRIPT_TAG not in content:
        if '</body>' in content:
            content = content.replace('</body>', f'{SCRIPT_TAG}\n</body>')
        else:
            content += f'\n{SCRIPT_TAG}'

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed: {filepath}")

def main():
    for root, dirs, files in os.walk(TEMPLATES_DIR):
        for file in files:
            if file.endswith('.html'):
                fix_template(os.path.join(root, file))
    
    # Also fix root html
    if os.path.exists(r'c:\website_college1\College_Website.html'):
        fix_template(r'c:\website_college1\College_Website.html')

if __name__ == "__main__":
    main()
