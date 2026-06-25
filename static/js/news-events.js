async function fetchNews(category = "news_event") {
    try {
        const response = await fetch(`/api/announcements?category=${category}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

const newsTable = document.getElementById("newsTable");
const newsYearFilter = document.getElementById("newsyearFilter");
const newsTickerWrapper = document.querySelector(".news-ticker-wrapper");
const newsToggleBtn = document.getElementById("newstoggleBtn");
const todayDate = new Date();

let newsExpanded = false;

async function renderNews(filterYear = "all") {
    if (!newsTable) return;
    newsTable.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Loading...</td></tr>";
    
    const newsData = await fetchNews();
    
    newsTable.innerHTML = "";
    
    if (newsData.length === 0) {
        newsTable.innerHTML = "<tr><td colspan='3' style='text-align:center;'>No news found.</td></tr>";
        return;
    }

    const filteredNews = newsData.filter(item => {
        const dateStr = item.published_at || item.date;
        if (filterYear === "all") return true;
        return new Date(dateStr).getFullYear() == filterYear;
    });

    // Sort latest first
    filteredNews.sort((a, b) => {
        const dateA = new Date(a.published_at || a.date);
        const dateB = new Date(b.published_at || b.date);
        return dateB - dateA;
    });

    filteredNews.forEach(item => {
        const dateStr = item.published_at || item.date;
        const publishDate = new Date(dateStr);
        const diffDays = Math.floor((todayDate - publishDate) / (1000 * 60 * 60 * 24));

        const row = document.createElement("tr");
        row.dataset.year = publishDate.getFullYear();

        const dateTd = document.createElement("td");
        dateTd.textContent = publishDate.toLocaleDateString("en-GB");

        const titleTd = document.createElement("td");
        titleTd.textContent = item.title;

        if (diffDays >= 0 && diffDays <= 10) {
            const newBadge = document.createElement("span");
            newBadge.className = "new-tag"; 
            newBadge.innerHTML = '<i class="fas fa-bolt"></i> NEW'; 
            titleTd.appendChild(newBadge);
        }

        const downloadTd = document.createElement("td");
        const pdfUrl = item.file_url || item.pdf;
        if (pdfUrl) {
            downloadTd.innerHTML = `<a href="${pdfUrl}" target="_blank"><i class="fas fa-file-pdf"></i> PDF</a>`;
        } else {
            downloadTd.innerHTML = "-";
        }

        row.appendChild(dateTd);
        row.appendChild(titleTd);
        row.appendChild(downloadTd);

        newsTable.appendChild(row);
    });

    updateNewsTicker(filteredNews.length);
}

function updateNewsTicker(count) {
    if (count > 4 && !newsExpanded) {
        // Clear duplicates
        const existingClones = newsTable.querySelectorAll(".clone");
        existingClones.forEach(c => c.remove());

        // Double the content for seamless scroll
        const rows = Array.from(newsTable.querySelectorAll("tr"));
        rows.forEach(row => {
            const clone = row.cloneNode(true);
            clone.classList.add("clone");
            newsTable.appendChild(clone);
        });
        newsTickerWrapper.classList.add("news-ticker-active");
    } else {
        newsTickerWrapper.classList.remove("news-ticker-active");
        const existingClones = newsTable.querySelectorAll(".clone");
        existingClones.forEach(c => c.remove());
    }
}


if (newsToggleBtn) {
    newsToggleBtn.addEventListener("click", () => {
        newsExpanded = !newsExpanded;
        if (newsExpanded) {
            newsTickerWrapper.style.maxHeight = "none";
            newsTickerWrapper.classList.remove("news-ticker-active");
            newsToggleBtn.innerHTML = "LESS <i class='fas fa-chevron-up'></i>";
        } else {
            newsTickerWrapper.style.maxHeight = "250px";
            newsToggleBtn.innerHTML = "MORE <i class='fas fa-chevron-down'></i>";
            renderNews(newsYearFilter.value);
        }
    });
}

if (newsYearFilter) {
    newsYearFilter.addEventListener("change", () => {
        newsExpanded = false;
        newsTickerWrapper.style.maxHeight = "250px";
        newsToggleBtn.innerHTML = "MORE <i class='fas fa-chevron-down'></i>";
        renderNews(newsYearFilter.value);
    });
}

// Initial render
renderNews();