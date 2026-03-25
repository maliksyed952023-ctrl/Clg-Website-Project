import os
import glob
import re

base_dir = r"c:\collge_web\Clg Website Project"

# The robust, comprehensive dark mode CSS block
dark_mode_css = """
<!-- ================= COMPREHENSIVE DARK MODE ================= -->
<style id="global-dark-mode">
  /* Base Backgrounds and Text */
  body.dark {
    background: #121212 !important;
    color: #e0e0e0 !important;
  }
  
  /* Navbar, Header, Footer overrides */
  body.dark .top-header,
  body.dark .navbar,
  body.dark .college-footer,
  body.dark header,
  body.dark footer,
  body.dark .news-bar {
    background: #1a1a1a !important;
    border-color: #333 !important;
  }
  
  /* Utility Bar */
  body.dark .utility-bar {
    background: #1f1f1f !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.8) !important;
  }
  
  body.dark .util-dropdown button,
  body.dark .icon-btn {
    background: #333 !important;
    color: #fff !important;
  }
  
  body.dark .dropdown-panel {
    background: #252525 !important;
    border: 1px solid #444 !important;
    color: #e0e0e0 !important;
  }
  body.dark .dropdown-panel a:hover,
  body.dark .dropdown-panel p:hover {
    background: #333 !important;
    color: #fff !important;
  }

  /* Search Box */
  body.dark .search-box {
    background: #333 !important;
  }
  body.dark .search-box input {
    background: #333 !important;
    color: #fff !important;
  }

  /* Main Navigation Dropdowns (Bootstrap) */
  body.dark .dropdown-menu {
    background-color: #2a2a2a !important;
    border: 1px solid #444 !important;
  }
  body.dark .dropdown-item {
    color: #e0e0e0 !important;
  }
  body.dark .dropdown-item:hover {
    background-color: #3b3b3b !important;
    color: #fff !important;
  }

  /* Main content areas, cards, sidebars */
  body.dark .content,
  body.dark .sidebar,
  body.dark .section,
  body.dark .card-inner,
  body.dark .faculty-card .card-inner,
  body.dark .submenu {
    background: #1e1e1e !important;
    color: #e0e0e0 !important;
    border-color: #333 !important;
    box-shadow: none !important;
  }
  
  body.dark .main-btn {
    background: #2a2a2a !important;
    color: #e0e0e0 !important;
    border-color: #444 !important;
  }
  body.dark .main-btn:hover, body.dark .main-btn.active {
    background: #3b3b3b !important;
  }
  body.dark .sub-btn {
    background: #1e1e1e !important;
    color: #e0e0e0 !important;
    border-left-color: #555 !important;
    border-bottom-color: #333 !important;
  }
  body.dark .sub-btn.active, body.dark .sub-btn.active-item {
    background: #2a2a2a !important;
    color: #fff !important;
    border-left-color: #f4c430 !important;
  }
  body.dark .sub-btn:hover {
    background: #2a2a2a !important;
  }

  /* Tables */
  body.dark table, body.dark th, body.dark td {
    border-color: #444 !important;
  }
  body.dark th {
    background: #2a2a2a !important;
    color: #e0e0e0 !important;
  }
  body.dark tr:nth-child(even) td {
    background: #222 !important;
  }
  body.dark tr:hover td {
    background: #333 !important;
  }
  
  /* Titles / Breadcrumbs */
  body.dark .title, body.dark .dept-title, body.dark .breadcrumb {
    background: transparent !important;
    color: #f5c842 !important;
    border-color: #333 !important;
  }
  body.dark h1, body.dark h2, body.dark h3, body.dark h4, body.dark p, body.dark span, body.dark a {
    color: unset; /* Let it inherit unless specifically overridden */
  }
  
  /* Cards specific */
  body.dark .card {
    background: #2a2a2a !important;
    border: 1px solid #444 !important;
  }
</style>
<!-- ======================================================= -->
"""

# The robust JS to persist theme across all pages via localStorage
dark_mode_js = """
<!-- ================= PERSISTENT DARK MODE LOGIC ================= -->
<script id="global-dark-mode-js">
  // Function called by the theme toggle button
  function toggleTheme(){
    document.body.classList.toggle('dark');
    // Save preference to localStorage
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('site_theme', isDark ? 'dark' : 'light');
  }

  // Apply immediately on load to prevent white flash
  (function() {
    const savedTheme = localStorage.getItem('site_theme');
    // If explicitly set to dark, add class
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    }
  })();
</script>
<!-- ============================================================== -->
"""

html_files = glob.glob(os.path.join(base_dir, "**", "*.html"), recursive=True)
count = 0

for file_path in html_files:
    if os.path.basename(file_path).lower() in ["header_footer.html"]:
        continue

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # 1. Strip out the legacy CSS block
        content = re.sub(
            r'/\*\s*=====\s*DARK MODE\s*=====\s*\*/\s*body\.dark[\s\S]*?(?=(?:/\*|</style>))',
            '', content
        )
        
        # 2. Strip out our new exact CSS block if we already injected it previously
        content = re.sub(
            r'<!-- ================= COMPREHENSIVE DARK MODE ================= -->[\s\S]*?<!-- ======================================================= -->',
            '', content
        )

        # 3. Strip out the legacy JS function toggleTheme() anywhere it exists individually
        content = re.sub(
            r'function\s+toggleTheme\s*\(\)\s*\{\s*document\.body\.classList\.toggle\([\'"]dark[\'"]\);\s*\}',
            '', content
        )
        
        # Strip out our new JS block if already injected
        content = re.sub(
            r'<!-- ================= PERSISTENT DARK MODE LOGIC ================= -->[\s\S]*?<!-- ============================================================== -->',
            '', content
        )

        # 4. Inject the comprehensive CSS before </head>
        content = re.sub(
            r'(</head>)',
            f"{dark_mode_css}\n\\1",
            content, flags=re.IGNORECASE
        )

        # 5. Inject the JS exactly before </body> to ensure DOM and button functionality
        content = re.sub(
            r'(</body>)',
            f"{dark_mode_js}\n\\1",
            content, flags=re.IGNORECASE
        )

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

        count += 1
        print(f"Applied Dark Mode to: {os.path.relpath(file_path, base_dir)}")

    except Exception as e:
        print(f"Error on {file_path}: {e}")

print(f"Successfully updated theme logic on {count} pages.")
