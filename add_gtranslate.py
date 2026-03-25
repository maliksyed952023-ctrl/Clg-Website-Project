import os
import glob

base_dir = r"c:\collge_web\Clg Website Project"
html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)

css_snippet = """
<style>
/* ===== GOOGLE TRANSLATE CSS TO HIDE DEFAULT BAR ===== */
body { top: 0px !important; }
.goog-te-banner-frame { display: none !important; }
.skiptranslate { display: none !important; }
.goog-tooltip { display: none !important; }
.goog-tooltip:hover { display: none !important; }
.goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
</style>
"""

js_snippet = """
<div id="google_translate_element" style="display:none;"></div>
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,mr', autoDisplay: false}, 'google_translate_element');
  }
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
"""

count = 0
for file_path in html_files:
    if os.path.basename(file_path).lower() == "base.html":
        continue

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        if "google_translate_element" in content:
            continue

        # Insert CSS before </head>
        if "</head>" in content.lower():
            # Use a case-insensitive replace by splitting
            parts = content.split("</head>")
            if len(parts) > 1:
                content = parts[0] + css_snippet + "</head>" + "".join(parts[1:])
        elif "<head>" in content.lower():
            parts = content.split("<head>")
            if len(parts) > 1:
                content = parts[0] + "<head>" + css_snippet + "".join(parts[1:])

        # Insert JS before </body>
        if "</body>" in content.lower():
            parts = content.split("</body>")
            if len(parts) > 1:
                content = parts[0] + js_snippet + "\n</body>" + "".join(parts[1:])
        else:
            # If no body tag, append to end
            content += "\n" + js_snippet

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
            
        count += 1
        print(f"Updated {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Successfully updated {count} files.")
