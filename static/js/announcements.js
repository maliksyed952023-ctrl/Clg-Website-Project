async function fetchAnnouncements() {
    try {
        const response = await fetch('/api/announcements');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return [];
    }
}

async function renderAnnouncements() {
    const track = document.getElementById("announcementTrack");
    if (!track) return;

    track.innerHTML = "<span>Loading announcements...</span>";

    const data = await fetchAnnouncements();
    
    if (data.length === 0) {
        track.innerHTML = "<span>No active announcements at this time.</span>";
        return;
    }

    track.innerHTML = "";

    // Create the items from database data
    const itemsHtml = data.map(item => {
        // Use file_url if available, else #
        const link = item.file_url || "#";
        return `<a href="${link}" target="_blank">${item.title}</a>`;
    }).join("");

    // Inject twice for seamless loop
    track.innerHTML = itemsHtml + itemsHtml;
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    renderAnnouncements();
    initPauseToggle();
});

function initPauseToggle() {
    const pauseToggle = document.getElementById("pauseToggle");
    const newsBar = document.querySelector(".news-bar");
    
    if (!pauseToggle || !newsBar) return;

    pauseToggle.addEventListener("click", () => {
        const isPaused = newsBar.classList.toggle("paused");
        const icon = pauseToggle.querySelector("i");
        
        if (isPaused) {
            icon.classList.replace("fa-pause-circle", "fa-play-circle");
            pauseToggle.title = "Play";
        } else {
            icon.classList.replace("fa-play-circle", "fa-pause-circle");
            pauseToggle.title = "Pause";
        }
    });
}
