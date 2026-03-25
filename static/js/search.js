document.addEventListener("DOMContentLoaded", function () {
    // Inject CSS for the recent searches wrapper only
    const style = document.createElement("style");
    style.innerHTML = `
        .search-results-wrapper {
            position: absolute;
            top: 100%;
            left: 0;
            width: 300px;
            background: #fff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            border-radius: 8px;
            z-index: 1000;
            display: none;
            overflow: hidden;
            border: 1px solid #eee;
        }
        .search-box {
            position: relative;
        }
        .search-results-header {
            padding: 10px 15px;
            background: #f8f9fa;
            border-bottom: 1px solid #eee;
            font-size: 13px;
            font-weight: bold;
            color: #666;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .search-results-list {
            max-height: 400px;
            overflow-y: auto;
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .recent-search-item {
            padding: 10px 15px;
            border-bottom: 1px solid #f1f1f1;
            cursor: pointer;
            color: #444;
            font-size: 14px;
            display: flex;
            align-items: center;
        }
        .recent-search-item:last-child {
            border-bottom: none;
        }
        .recent-search-item:hover {
            background: #f8f9fa;
        }
        .recent-search-item i {
            margin-right: 10px;
            color: #999;
        }
        .clear-recent {
            color: #dc3545;
            cursor: pointer;
            font-weight: normal;
        }
        .clear-recent:hover {
            text-decoration: underline;
        }

        /* Dark mode support */
        body.dark .search-results-wrapper {
            background: #2a2a2a;
            border-color: #444;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
        }
        body.dark .search-results-header {
            background: #1e1e1e;
            border-bottom-color: #444;
            color: #aaa;
        }
        body.dark .recent-search-item {
            border-bottom-color: #333;
            color: #e0e0e0;
        }
        body.dark .recent-search-item:hover {
            background: #333;
        }
    `;
    document.head.appendChild(style);

    const searchInput = document.querySelector('.search-box input');
    const searchIcon = document.querySelector('.search-box .fa-search');
    if (!searchInput) return;

    const searchBox = document.querySelector('.search-box');
    
    // Create results wrapper for recent searches
    const resultsWrapper = document.createElement('div');
    resultsWrapper.className = 'search-results-wrapper';
    searchBox.appendChild(resultsWrapper);

    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    function updateRecentSearches(query) {
        if (!query.trim()) return;
        recentSearches = recentSearches.filter(q => q.toLowerCase() !== query.toLowerCase());
        recentSearches.unshift(query);
        if (recentSearches.length > 3) recentSearches.pop();
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }

    function renderRecentSearches() {
        if (recentSearches.length === 0) {
            resultsWrapper.innerHTML = `
                <div class="search-results-header">Recent Searches</div>
                <div style="padding: 15px; color: #777; font-size: 13px; text-align: center;">No recent searches</div>
            `;
            return;
        }

        let html = `
            <div class="search-results-header">
                <span>Recent Searches</span>
                <span class="clear-recent">Clear</span>
            </div>
            <ul class="search-results-list">
        `;
        
        recentSearches.forEach(q => {
            html += `
                <li class="recent-search-item" data-query="${q.replace(/"/g, '&quot;')}">
                    <i class="fa fa-history"></i> ${q}
                </li>
            `;
        });
        html += `</ul>`;
        
        resultsWrapper.innerHTML = html;

        resultsWrapper.querySelector('.clear-recent').addEventListener('click', (e) => {
            e.stopPropagation();
            recentSearches = [];
            localStorage.setItem('recentSearches', JSON.stringify([]));
            renderRecentSearches();
        });

        resultsWrapper.querySelectorAll('.recent-search-item').forEach(item => {
            item.addEventListener('click', () => {
                const q = item.getAttribute('data-query');
                searchInput.value = q;
                performSearch(q);
            });
        });
    }

    function performSearch(query) {
        if (!query.trim()) return;
        updateRecentSearches(query);
        
        // Redirect to the Flask search route
        window.location.href = "/search?q=" + encodeURIComponent(query);
    }

    searchInput.addEventListener('focus', () => {
        resultsWrapper.style.display = 'block';
        renderRecentSearches();
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
    
    if (searchIcon) {
        searchIcon.addEventListener('click', () => performSearch(searchInput.value));
        searchIcon.style.cursor = 'pointer';
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target)) {
            resultsWrapper.style.display = 'none';
        }
    });
});
