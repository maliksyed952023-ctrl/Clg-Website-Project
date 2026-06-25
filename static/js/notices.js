async function fetchNotices(category = "notice") {
    try {
        const response = await fetch(`/api/announcements?category=${category}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching notices:", error);
        return [];
    }
}

// =======================================================

const noticeBody = document.getElementById("noticeBody");
const yearFilter = document.getElementById("yearFilter");
const tableWrapper = document.querySelector(".table-wrapper");
const toggleBtn = document.getElementById("toggleMore");
const today = new Date(); // Using real today for dynamic data

let expanded = false;

async function renderNotices(filterYear = "all") {
    if (!noticeBody) return;
    noticeBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Loading...</td></tr>";
    
    const notices = await fetchNotices();
    
    noticeBody.innerHTML = "";
    
    if (notices.length === 0) {
        noticeBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>No notices found.</td></tr>";
        return;
    }

    const filteredNotices = notices.filter(notice => {
        const dateStr = notice.published_at || notice.date;
        if (filterYear === "all") return true;
        return new Date(dateStr).getFullYear() == filterYear;
    });

    filteredNotices.forEach(notice => {
        const dateStr = notice.published_at || notice.date;
        const publishDate = new Date(dateStr);
        const diffDays = Math.floor((today - publishDate) / (1000 * 60 * 60 * 24));

        const row = document.createElement("tr");
        
        const dateTd = document.createElement("td");
        dateTd.textContent = publishDate.toLocaleDateString("en-GB");

        const descTd = document.createElement("td");
        descTd.className = "description";
        descTd.textContent = notice.title || notice.description;

        // 10-day limit for NEW badge
        if (diffDays >= 0 && diffDays <= 10) {
            const newBadge = document.createElement("span");
            newBadge.className = "new-tag"; 
            newBadge.innerHTML = '<i class="fas fa-bolt"></i> NEW'; 
            descTd.appendChild(newBadge);
        }

        const downloadTd = document.createElement("td");
        const pdfUrl = notice.file_url || notice.pdf;
        if (pdfUrl) {
            downloadTd.innerHTML = `<a href="${pdfUrl}" download class="download-btn"><i class="fas fa-file-pdf"></i> PDF</a>`;
        } else {
            downloadTd.innerHTML = "-";
        }

        row.appendChild(dateTd);
        row.appendChild(descTd);
        row.appendChild(downloadTd);

        noticeBody.appendChild(row);
    });

    updateTicker(filteredNotices.length);
}

function updateTicker(count) {
    if (count > 4 && !expanded) {
        // Clear duplicates if any
        const existingClones = noticeBody.querySelectorAll(".clone");
        existingClones.forEach(c => c.remove());

        // Clone items for seamless loop
        const rows = Array.from(noticeBody.querySelectorAll("tr"));
        rows.forEach(row => {
            const clone = row.cloneNode(true);
            clone.classList.add("clone");
            noticeBody.appendChild(clone);
        });
        tableWrapper.classList.add("ticker-active");
    } else {
        tableWrapper.classList.remove("ticker-active");
        const existingClones = noticeBody.querySelectorAll(".clone");
        existingClones.forEach(c => c.remove());
    }
}


if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        expanded = !expanded;
        if (expanded) {
            tableWrapper.style.maxHeight = "none";
            tableWrapper.style.overflowY = "visible";
            toggleBtn.innerHTML = "Less <i class='fas fa-chevron-up'></i>";
            tableWrapper.classList.remove("ticker-active");
        } else {
            tableWrapper.style.maxHeight = "280px";
            tableWrapper.style.overflowY = "hidden";
            toggleBtn.innerHTML = "More <i class='fas fa-chevron-down'></i>";
            renderNotices(yearFilter.value);
        }
    });
}

if (yearFilter) {
    yearFilter.addEventListener("change", function () {
        expanded = false;
        tableWrapper.style.maxHeight = "280px";
        toggleBtn.innerHTML = "More <i class='fas fa-chevron-down'></i>";
        renderNotices(this.value);
    });
}

// Initial load
renderNotices();