const tenderData = [
  { date: "15/01/2026", desc: "Tender for Laboratory Equipment", file: "pdf/sample.pdf" },
  { date: "10/01/2026", desc: "Quotation for Network Infrastructure", file: "pdf/sample.pdf" },
  { date: "06/01/2026", desc: "Tender for CCTV Installation", file: "pdf/sample.pdf" },
  { date: "18/12/2025", desc: "Quotation for Library Software", file: "pdf/sample.pdf" },
  { date: "02/08/2024", desc: "Tender for Electrical Maintenance", file: "pdf/sample.pdf" }
];

let showAll = false;

function renderTenders() {
  const tbody = document.getElementById("tenderBody");
  const year = document.getElementById("yearSelect").value;

  tbody.innerHTML = "";

  let filtered = tenderData;
  if (year !== "all") {
    filtered = tenderData.filter(t => t.date.endsWith(year));
  }

  const display = showAll ? filtered : filtered.slice(0, 3);

  display.forEach((t, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${t.date}</td>
        <td>${t.desc} ${index < 3 && year === "all" ? '<span class="new-tag">NEW</span>' : ''}</td>
        <td><a href="${t.file}" class="pdf-btn" target="_blank">PDF</a></td>
      </tr>
    `;
  });
}

document.getElementById("moreBtn").onclick = () => {
  showAll = !showAll;

  document.getElementById("moreBtn").innerText = showAll ? "View Less" : "View More";
  renderTenders();
};

document.getElementById("yearSelect").onchange = renderTenders;

renderTenders();
