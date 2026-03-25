//  ADMIN ADDS ONLY THIS 
const notices = [
    {
        date: "2026-01-10",
        description: "Semester Examination Time Table Released",
        pdf: "pdfs/sample.pdf"

    },
    {
        date: "2026-01-05",
        description: "Scholarship Form Submission Last Date Extended",
        pdf: "pdfs/sample.pdf"

    },
    {
        date: "2025-12-20",
        description: "College Annual Sports Meet Notification",
        pdf: "pdfs/sample.pdf"

    },
    {
        date: "2025-12-01",
        description: "Holiday Notice for Winter Vacation",
        pdf: "pdfs/sample.pdf"

    },
    {
  date: "2026-01-15",
  description: "Admission Notice for First Year Students",
  pdf: "admission_notice.pdf"
    }
    ,
    {
  date: "2026-01-06",
  description: "Admission Notice for First Year Students",
  pdf: "admission_notice.pdf"
    }
    ,
    {
  date: "2026-01-05",
  description: "Admission Notice for First Year Students",
  pdf: "admission_notice.pdf"
    }

];


// =======================================================

// Sort latest first
notices.sort((a, b) => new Date(b.date) - new Date(a.date));

const noticeBody = document.getElementById("noticeBody");
const yearFilter = document.getElementById("yearFilter");
const today = new Date();

function renderNotices(filterYear = "all") {
  noticeBody.innerHTML = "";

  notices.forEach(notice => {
    const publishDate = new Date(notice.date);
    const noticeYear = publishDate.getFullYear();

    if (filterYear !== "all" && noticeYear != filterYear) return;

    const diffDays = Math.floor(
      (today - publishDate) / (1000 * 60 * 60 * 24)
    );

    const row = document.createElement("tr");

    const dateTd = document.createElement("td");
    dateTd.textContent = publishDate.toLocaleDateString("en-GB");

    const descTd = document.createElement("td");
    descTd.className = "description";
    descTd.textContent = notice.description;

    if (diffDays <= 10) {
      const newTag = document.createElement("span");
      newTag.className = "new-tag";
      newTag.textContent = "NEW";
      descTd.appendChild(newTag);
    }

    const downloadTd = document.createElement("td");
    const link = document.createElement("a");
    link.href = notice.pdf;
    link.setAttribute("download", "");
    link.className = "download-btn";
    link.textContent = "PDF";
    downloadTd.appendChild(link);

    row.appendChild(dateTd);
    row.appendChild(descTd);
    row.appendChild(downloadTd);

    noticeBody.appendChild(row);
  });
}

// Initial load
renderNotices();

// Dropdown filter
if (yearFilter) {
  yearFilter.addEventListener("change", function () {
    renderNotices(this.value);
  });
}
//more button 
const tableWrapper = document.querySelector(".table-wrapper");
const toggleBtn = document.getElementById("toggleMore");

let expanded = false;

toggleBtn.addEventListener("click", function () {
  if (!expanded) {
    tableWrapper.style.maxHeight = "none";
    toggleBtn.textContent = "Less ▴";
    expanded = true;
  } else {
    tableWrapper.style.maxHeight = "210px";
    toggleBtn.textContent = "More ▾";
    expanded = false;
  }
});