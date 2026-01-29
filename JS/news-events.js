const toggleBtn = document.getElementById("toggleBtn");
const extras = document.querySelectorAll(".extra");
const yearFilter = document.getElementById("yearFilter");

let expanded = false;

// MORE / LESS TOGGLE
toggleBtn.addEventListener("click", () => {
    expanded = !expanded;

    extras.forEach(row => {
        row.style.display = expanded ? "table-row" : "none";
    });

    toggleBtn.textContent = expanded ? "LESS" : "MORE";
});

// YEAR FILTER
yearFilter.addEventListener("change", () => {
    const year = yearFilter.value;

    document.querySelectorAll("#newsTable tr").forEach(row => {
        if (year === "all") {
            row.style.display = row.classList.contains("extra") && !expanded
                ? "none"
                : "table-row";
        } else {
            row.style.display = row.dataset.year === year
                ? "table-row"
                : "none";
        }
    });
});