"""
One-shot script: Update all department pages to premium utility bar.
Run from c:\\website_college1: python update_dept_bars.py
"""
import os, re

BASE = r"c:\website_college1\templates\college_dept\departments"

# All dept pages that still need updating (aiml is already done)
FILES = [
    "applied-mechanics.html", "auto.html", "civil.html", "computer.html",
    "ddgm.html", "electrical.html", "entc.html", "it.html",
    "mechanical.html", "mercedes-benz.html", "science-humanities.html", "workshop.html"
]

PREMIUM_HTML = '''<!-- ===== UTILITY BAR ===== -->
<div class="utility-bar">
<div class="util-left">
  <div class="util-dropdown">
    <button onclick="toggleDrop('codes')"><i class="fa-solid fa-building-columns"></i> Institute Codes <i class="fa fa-chevron-down"></i></button>
    <div class="dropdown-panel" id="codes" style="min-width: 320px;">
      <div class="dropdown-header"><div class="icon-wrap" style="background:rgba(245,200,66,0.2)!important;color:#f5c842!important;width:44px!important;height:44px!important;"><i class="fa-solid fa-building-columns" style="font-size:20px;"></i></div><div class="header-info-wrap"><span class="header-title">Institute Codes</span><span class="header-subtitle">Important Academic &amp; Institute Codes</span></div></div>
      <div class="dropdown-list">
        <a href="#" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-building-columns"></i></div><div class="item-text"><span class="item-main-text">DTE Code</span><span class="item-sub-text">2010</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="#" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-graduation-cap"></i></div><div class="item-text"><span class="item-main-text">MSBTE</span><span class="item-sub-text">0019 (1st Shift)</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="#" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-graduation-cap"></i></div><div class="item-text"><span class="item-main-text">MSBTE</span><span class="item-sub-text">9019 (2nd Shift)</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="#" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-id-card"></i></div><div class="item-text"><span class="item-main-text">AICTE ID</span><span class="item-sub-text">1-493166031</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="#" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-book-open"></i></div><div class="item-text"><span class="item-main-text">AISHE</span><span class="item-sub-text">S-1785</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
      </div>
    </div>
  </div>
  <div class="util-dropdown">
    <button onclick="toggleDrop('social')"><i class="fa-solid fa-share-nodes"></i> Social Media <i class="fa fa-chevron-down"></i></button>
    <div class="dropdown-panel" id="social" style="min-width: 320px;">
      <div class="dropdown-header"><div class="icon-wrap" style="background:rgba(245,200,66,0.2)!important;color:#f5c842!important;width:44px!important;height:44px!important;"><i class="fa-solid fa-share-nodes" style="font-size:20px;"></i></div><div class="header-info-wrap"><span class="header-title">Follow &amp; Connect</span><span class="header-subtitle">Stay Updated with Us</span></div></div>
      <div class="dropdown-list">
        <a href="https://www.facebook.com/gpabad56" target="_blank" class="premium-item"><div class="social-icon-wrap social-icon-fb"><i class="fab fa-facebook-f"></i></div><div class="item-text"><span class="item-main-text">Facebook</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="#" class="premium-item"><div class="social-icon-wrap social-icon-ig"><i class="fab fa-instagram"></i></div><div class="item-text"><span class="item-main-text">Instagram</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="#" class="premium-item"><div class="social-icon-wrap social-icon-yt"><i class="fab fa-youtube"></i></div><div class="item-text"><span class="item-main-text">YouTube</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="https://x.com/gpabad56" target="_blank" class="premium-item"><div class="social-icon-wrap social-icon-tw"><i class="fab fa-x-twitter"></i></div><div class="item-text"><span class="item-main-text">X (Twitter)</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="https://www.linkedin.com/company/government-polytechnic-ch-sambhajinagar/" target="_blank" class="premium-item"><div class="social-icon-wrap social-icon-li"><i class="fab fa-linkedin-in"></i></div><div class="item-text"><span class="item-main-text">LinkedIn</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
      </div>
      <div class="dropdown-footer-banner"><i class="fa-solid fa-users footer-icon"></i><div class="footer-text"><strong>Stay Connected!</strong><span>Join us on social media for updates, events &amp; more.</span></div><a href="#" class="footer-action-btn"><i class="fa-solid fa-paper-plane"></i></a></div>
    </div>
  </div>
  <div class="accessibility"><span onclick="setFont('decrease')">A-</span><span onclick="setFont('reset')">A</span><span onclick="setFont('increase')">A+</span></div>
  <button class="icon-btn" onclick="toggleTheme()"><i class="fa fa-circle-half-stroke"></i></button>
  <div class="util-dropdown">
    <button onclick="toggleDrop('links')"><i class="fa-solid fa-link"></i> Quick Links <i class="fa fa-chevron-down"></i></button>
    <div class="dropdown-panel" id="links">
      <div class="dropdown-header"><i class="fa-solid fa-link"></i> QUICK LINKS</div>
      <div class="dropdown-list">
        <a href="https://msbte.ac.in/" target="_blank" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-book"></i></div><div class="item-text">MSBTE</div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="https://www.aicte-india.org/" target="_blank" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-graduation-cap"></i></div><div class="item-text">AICTE</div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="https://gpabadmis.in/gpabad_mis/" target="_blank" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-desktop"></i></div><div class="item-text">MIS Portal</div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="https://dte.maharashtra.gov.in/" target="_blank" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-building-columns"></i></div><div class="item-text">DTE Maharashtra</div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="https://nptel.ac.in/" target="_blank" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-play"></i></div><div class="item-text">NPTEL</div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="https://betacloud.ncs.gov.in/" target="_blank" class="premium-item"><div class="icon-wrap"><i class="fa-solid fa-briefcase"></i></div><div class="item-text">National Career Service</div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
      </div>
    </div>
  </div>
</div>
<div class="util-right">
  <div class="search-box"><i class="fa fa-search"></i><input data-key="search" placeholder="Search..." type="text"/></div>
  <div class="util-dropdown">
    <button data-key="languageBtn" onclick="toggleDrop('lang')"><i class="fa-solid fa-globe"></i> Language <i class="fa fa-chevron-down"></i></button>
    <div class="dropdown-panel" id="lang" style="min-width: 320px;">
      <div class="dropdown-header"><div class="icon-wrap" style="background:rgba(245,200,66,0.2)!important;color:#f5c842!important;width:44px!important;height:44px!important;"><i class="fa-solid fa-globe" style="font-size:20px;"></i></div><div class="header-info-wrap"><span class="header-title">Choose Language</span><span class="header-subtitle">Select your preferred language</span></div></div>
      <div class="dropdown-list">
        <a href="#" onclick="setLanguage('en')" class="premium-item"><div class="lang-icon-wrap lang-icon-en">A</div><div class="item-text"><span class="item-main-text">English</span><span class="item-sub-text">Default Language</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="#" onclick="setLanguage('mr')" class="premium-item"><div class="lang-icon-wrap lang-icon-mr">\u0905</div><div class="item-text"><span class="item-main-text">\u092e\u0930\u093e\u0920\u0940</span><span class="item-sub-text">\u0938\u094d\u0925\u093e\u0928\u093f\u0915 \u092d\u093e\u0937\u093e</span></div><i class="fa-solid fa-chevron-right arrow-icon"></i></a>
      </div>
    </div>
  </div>
  <button class="login-btn" data-key="login" onclick="window.location.href='/login'"><i class="fa fa-right-to-bracket"></i> Login</button>
</div>
</div>'''

OLD_CSS = re.compile(
    r'/\* ===== UTILITY BAR =====\s*\*/.+?/\* ===== ANNOUNCEMENT BAR \(Refined\) =====\s*\*/',
    re.DOTALL
)
OLD_HTML = re.compile(
    r'<!-- ===== UTILITY BAR ===== -->\s*<div class="utility-bar">.+?</div>\s*(?=<header class="top-header">)',
    re.DOTALL
)

changed = 0
for fname in FILES:
    path = os.path.join(BASE, fname)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    # Remove old CSS
    content = OLD_CSS.sub('/* ===== ANNOUNCEMENT BAR (Refined) ===== */', content)
    # Replace old HTML
    if OLD_HTML.search(content):
        content = OLD_HTML.sub(PREMIUM_HTML + '\n', content)
    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  UPDATED: {fname}")
        changed += 1
    else:
        print(f"  SKIPPED (no match): {fname}")

print(f"\nDone. {changed}/{len(FILES)} files updated.")
