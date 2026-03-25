import os
import re

base_dir = r"c:\collge_web\Clg Website Project"
base_html = os.path.join(base_dir, "base.html")

with open(base_html, "r", encoding="utf-8") as f:
    content = f.read()

# Extract top part up to <main>
header_match = re.search(r"(.*?<main>)", content, re.DOTALL)
header = header_match.group(1) if header_match else ""

# Extract bottom part from </main>
footer_match = re.search(r"(</main>.*)", content, re.DOTALL)
footer = footer_match.group(1) if footer_match else ""

search_results_page = header + """
    <section class="section active" style="display:block; min-height: 400px; padding: 40px; background: white; border-radius: 6px; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); margin: 20px;">
        <h2 style="margin-bottom: 20px; color:#0e5a61;">Search Results for: <span id="search-query-display" style="color:#c1121f;"></span></h2>
        <div id="search-results-container" class="container" style="display:flex!important; flex-direction:column; padding:0; margin:0;">
            <!-- Results will be dynamically populated here -->
        </div>
    </section>

    <script src="js/search_index.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            const resultsContainer = document.getElementById('search-results-container');
            const queryDisplay = document.getElementById('search-query-display');
            
            if (!query) {
                queryDisplay.textContent = 'None';
                resultsContainer.innerHTML = '<p style="padding:15px; font-size:16px;">Please enter a search term.</p>';
                return;
            }
            
            queryDisplay.textContent = '"' + query + '"';
            const q = query.toLowerCase();
            
            let results = [];
            if (typeof SEARCH_INDEX !== 'undefined') {
                results = SEARCH_INDEX.filter(item => {
                    return item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q);
                });
                
                // Sort results
                results.sort((a, b) => {
                    let aTitleMatch = a.title.toLowerCase().includes(q) ? 1 : 0;
                    let bTitleMatch = b.title.toLowerCase().includes(q) ? 1 : 0;
                    return bTitleMatch - aTitleMatch;
                });
            }
            
            if (results.length === 0) {
                resultsContainer.innerHTML = '<p style="color:red; font-size:16px; font-weight:bold; padding:15px;">No results found for your query. Try different keywords.</p>';
                return;
            }
            
            let html = '<ul style="list-style:none; padding:0;">';
            results.forEach(item => {
                let excerpt = item.content.substring(0, 300) + "...";
                let matchIndex = item.content.toLowerCase().indexOf(q);
                if(matchIndex > -1) {
                    let start = Math.max(0, matchIndex - 150);
                    let end = Math.min(item.content.length, matchIndex + q.length + 150);
                    excerpt = (start > 0 ? "..." : "") + item.content.substring(start, end) + "...";
                    const regex = new RegExp(q, "gi");
                    excerpt = excerpt.replace(regex, match => `<strong>${match}</strong>`);
                }
                
                let targetLink = item.url;
                
                html += `
                    <li class="search-result-page-item" style="padding: 20px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 8px;">
                        <h4 style="margin-top:0;"><a href="${targetLink}" style="text-decoration:none; color:#0d6efd; font-size:18px;">${item.title}</a></h4>
                        <p class="text-muted" style="margin-bottom:0; font-size:15px; color:#555;">${excerpt}</p>
                    </li>
                `;
            });
            html += '</ul>';
            resultsContainer.innerHTML = html;
            
            const style = document.createElement('style');
            style.innerHTML = `
                body.dark .search-result-page-item {
                    background: #1e1e1e !important;
                    border-color: #333 !important;
                }
                body.dark .search-result-page-item p {
                    color: #aaa !important;
                }
            `;
            document.head.appendChild(style);
        });
    </script>
""" + footer

output_path = os.path.join(base_dir, "search_results.html")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(search_results_page)
    
print("Successfully created search_results.html")
