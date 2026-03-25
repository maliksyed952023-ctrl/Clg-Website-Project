async function fetchTenders(category = "tender") {
  try {
    const response = await fetch(`/api/announcements?category=${category}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching tenders:", error);
    return [];
  }
}

const tenderBody = document.getElementById("tenderBody");
const tenderYearSelect = document.getElementById("yearSelect");
const tenderTickerWrapper = document.querySelector(".tenders-ticker-wrapper");
const tenderMoreBtn = document.getElementById("moreBtn");
const currentDay = new Date();

let tendersExpanded = false;

async function renderTenders(filterYear = "all") {
  if (!tenderBody) return;
  tenderBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>Loading...</td></tr>";

  const tenderData = await fetchTenders();

  tenderBody.innerHTML = "";

  if (tenderData.length === 0) {
    tenderBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>No tenders found.</td></tr>";
    return;
  }

  const filteredTenders = tenderData.filter(t => {
    const dateStr = t.published_at || t.date;
    if (filterYear === "all") return true;
    return new Date(dateStr).getFullYear() == filterYear;
  });

  // Sort latest first
  filteredTenders.sort((a, b) => {
    const dateA = new Date(a.published_at || a.date);
    const dateB = new Date(b.published_at || b.date);
    return dateB - dateA;
  });

  filteredTenders.forEach(t => {
    const dateStr = t.published_at || t.date;
    const pubDate = new Date(dateStr);
    const diff = Math.floor((currentDay - pubDate) / (1000 * 60 * 60 * 24));

    const row = document.createElement("tr");

    const dateTd = document.createElement("td");
    dateTd.textContent = pubDate.toLocaleDateString("en-GB");

    const descTd = document.createElement("td");
    descTd.textContent = t.title || t.desc;

    if (diff >= 0 && diff <= 10) {
      const badge = document.createElement("span");
      badge.className = "new-tag";
      badge.innerHTML = '<i class="fas fa-bolt"></i> NEW';
      descTd.appendChild(badge);
    }

    const fileTd = document.createElement("td");
    const pdfUrl = t.file_url || t.file || t.pdf;
    if (pdfUrl) {
      fileTd.innerHTML = `<a href="${pdfUrl}" class="pdf-btn" target="_blank"><i class="fas fa-file-invoice"></i> PDF</a>`;
    } else {
      fileTd.innerHTML = "-";
    }

    row.appendChild(dateTd);
    row.appendChild(descTd);
    row.appendChild(fileTd);

    tenderBody.appendChild(row);
  });

  updateTenderTicker(filteredTenders.length);
}

function updateTenderTicker(count) {
  if (count > 4 && !tendersExpanded) {
    // Clear duplicates
    const existingClones = tenderBody.querySelectorAll(".clone");
    existingClones.forEach(c => c.remove());

    // Clone for loop
    const rows = Array.from(tenderBody.querySelectorAll("tr"));
    rows.forEach(row => {
      const clone = row.cloneNode(true);
      clone.classList.add("clone");
      tenderBody.appendChild(clone);
    });
    tenderTickerWrapper.classList.add("tenders-ticker-active");
  } else {
    tenderTickerWrapper.classList.remove("tenders-ticker-active");
    const existingClones = tenderBody.querySelectorAll(".clone");
    existingClones.forEach(c => c.remove());
  }
}


if (tenderMoreBtn) {
  tenderMoreBtn.addEventListener("click", () => {
    tendersExpanded = !tendersExpanded;
    if (tendersExpanded) {
      tenderTickerWrapper.style.maxHeight = "none";
      tenderTickerWrapper.classList.remove("tenders-ticker-active");
      tenderMoreBtn.innerHTML = "View Less <i class='fas fa-chevron-up'></i>";
    } else {
      tenderTickerWrapper.style.maxHeight = "250px";
      tenderMoreBtn.innerHTML = "View More <i class='fas fa-chevron-down'></i>";
      renderTenders(tenderYearSelect.value);
    }
  });
}

if (tenderYearSelect) {
  tenderYearSelect.addEventListener("change", () => {
    tendersExpanded = false;
    tenderTickerWrapper.style.maxHeight = "250px";
    tenderMoreBtn.innerHTML = "View More <i class='fas fa-chevron-down'></i>";
    renderTenders(tenderYearSelect.value);
  });
}

// Initial render
renderTenders();
