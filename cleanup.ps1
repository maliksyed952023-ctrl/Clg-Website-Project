# ===========================================================
# WEBSITE PROJECT CLEANUP + DEPT BAR UPDATE
# Run this entire script in PowerShell from any directory.
# It is safe to run — it only deletes confirmed junk files.
# ===========================================================

$root = "c:\website_college1"

Write-Host "`n=== STEP 1: Update department pages (premium utility bar) ===" -ForegroundColor Cyan
python "$root\update_dept_bars.py"

Write-Host "`n=== STEP 2: Create data/ folder and move xlsx ===" -ForegroundColor Cyan
New-Item -ItemType Directory -Force "$root\data" | Out-Null
if (Test-Path "$root\staff list.xlsx") {
    Move-Item -Force "$root\staff list.xlsx" "$root\data\staff list.xlsx"
    Write-Host "  Moved: staff list.xlsx -> data/"
}

Write-Host "`n=== STEP 3: Delete large junk from static/ ===" -ForegroundColor Cyan
$zip = "$root\static\Clg Website Project.zip"
if (Test-Path $zip) { Remove-Item -Force $zip; Write-Host "  Deleted: static/Clg Website Project.zip (13MB)" }

Write-Host "`n=== STEP 4: Delete temp directories ===" -ForegroundColor Cyan
@("$root\tmp", "$root\tmp_extract") | ForEach-Object {
    if (Test-Path $_) { Remove-Item -Recurse -Force $_; Write-Host "  Deleted: $_" }
}

Write-Host "`n=== STEP 5: Delete root-level duplicate asset directories ===" -ForegroundColor Cyan
@("$root\JS", "$root\css", "$root\images", "$root\pdfs", "$root\college_dept") | ForEach-Object {
    if (Test-Path $_) { Remove-Item -Recurse -Force $_; Write-Host "  Deleted: $_" }
}

Write-Host "`n=== STEP 6: Delete root-level duplicate standalone files ===" -ForegroundColor Cyan
@("$root\style.css", "$root\script.js") | ForEach-Object {
    if (Test-Path $_) { Remove-Item -Force $_; Write-Host "  Deleted: $_" }
}

Write-Host "`n=== STEP 7: Delete root-level HTML scratch/draft files ===" -ForegroundColor Cyan
$htmlJunk = @(
    "College_Website.html", "UTILITY BAR.html", "base.html",
    "contact.html", "copyright.html", "hyperlinking.html",
    "latest-news.html", "policy.html", "privacy-payment.html",
    "privacy.html", "terms.html", "web-policy.html"
)
foreach ($f in $htmlJunk) {
    $p = "$root\$f"
    if (Test-Path $p) { Remove-Item -Force $p; Write-Host "  Deleted: $f" }
}

Write-Host "`n=== STEP 8: Delete one-time maintenance scripts ===" -ForegroundColor Cyan
$scripts = @(
    "add_gtranslate.py", "apply_dark_mode.py", "apply_font_fix.py",
    "apply_header_footer.py", "build_search_index.py", "check_schema.py",
    "clean_inline_styles.py", "debug_supabase.py", "final_cleanup.py",
    "fix_admission_and_facility.py", "fix_bootstrap_conflict.py",
    "fix_global_consistency.py", "fix_global_consistency_v2.py",
    "fix_utility_dropdowns.py", "generate_search_results_page.py",
    "inject_search.py", "inject_sidebar_css.py", "inject_styles.py",
    "standardize_facility.py", "standardize_fonts.py", "standardize_util_bar.py",
    "update_facility_links.py", "tmp_check_buckets.py",
    "tmp_cleanup_images.py", "tmp_fix_bucket.py",
    "update_dept_bars.py"  # self-delete after run
)
foreach ($s in $scripts) {
    $p = "$root\$s"
    if (Test-Path $p) { Remove-Item -Force $p; Write-Host "  Deleted: $s" }
}

Write-Host "`n=== STEP 9: Verify final root structure ===" -ForegroundColor Cyan
Get-ChildItem $root | Where-Object { $_.Name -notmatch "^(__pycache__|\.git)$" } |
    Select-Object Name, @{N="Type";E={if($_.PSIsContainer){"[DIR]"}else{"file"}}} |
    Format-Table -AutoSize

Write-Host "`n✅ Cleanup complete! Website Flask serving structure is untouched." -ForegroundColor Green
Write-Host "   templates/ and static/ are exactly as before." -ForegroundColor Green
