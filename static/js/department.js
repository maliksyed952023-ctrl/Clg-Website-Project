(function () {
  const DATA = DEPARTMENTS_DATA;
  const deptId = document.body.getAttribute("data-dept");
  const dept = DATA.departments[deptId];

  if (!dept) {
    document.getElementById("content").innerHTML = '<section class="section active"><h2>Department Not Found</h2><p>The requested department could not be loaded.</p></section>';
    return;
  }

  const S = dept.sections || {};

  // ─── BREADCRUMB ───
  const breadcrumbEl = document.getElementById("dept-breadcrumb");
  if (breadcrumbEl) breadcrumbEl.textContent = dept.name;

  // ─── TITLE ───
  const titleEl = document.getElementById("dept-title");
  if (titleEl) titleEl.textContent = dept.name.toUpperCase();

  // ─── HERO SLIDER ───
  const sliderImages = dept.sliderImages || DATA.defaultSliderImages;
  if (typeof initHeroSlider === "function") {
    initHeroSlider("dept-slider", sliderImages);
  }

  // ─── SIDEBAR ───
  renderSidebar();

  // ─── CONTENT ───
  renderContent();

  // ─── Init interactive elements ───
  setTimeout(() => {
    if (S.faculty) initFacultySlider("facultySlider", "prevBtn", "nextBtn");
    if (S.labPhotos) initLabPhotosSlider("labPhotosTrack", "labDots", "labPrev", "labNext");
    initViewToggle();
  }, 100);

  // ═══ FUNCTIONS ═══

  function renderNavbar() {
    const navbar = document.getElementById("navbar");
    let html = "";
    const cats = DATA.departmentCategories;

    let deptDropdown = '<div class="dropdown"><button class="dropbtn">Department</button><div class="dropdown-content">';
    for (const [category, list] of Object.entries(cats)) {
      deptDropdown += '<div class="sub-dropdown">';
      deptDropdown += `<a href="#">${category} ▸</a>`;
      deptDropdown += '<div class="sub-dropdown-content">';
      list.forEach(d => {
        deptDropdown += `<a href="/departments/${d.slug}.html">${d.name}</a>`;
      });
      deptDropdown += '</div></div>';
    }
    deptDropdown += '</div></div>';

    DATA.navLinks.forEach((link, i) => {
      if (i === 3) html += deptDropdown;
      html += `<a href="${link.href}">${link.label}</a>`;
    });
    if (DATA.navLinks.length <= 3) html += deptDropdown;
    navbar.innerHTML = html;
  }

  function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    let html = "";

    if (S.about) {
      html += `<div class="main-btn active" onclick="toggleMenu('menuAbout', this)">About Department <span class="arrow">▼</span></div>`;
      html += `<div class="submenu" id="menuAbout" style="display:block;">`;
      if (S.visionMission) {
        html += `<div class="sub-btn active" onclick="showSection('vision-mission', this)">Vision And Mission <span class="arrow">▼</span></div>`;
      }
      if (S.profile) {
        html += `<div class="sub-btn active" onclick="showSection('profile', this)">Profile <span class="arrow">▼</span></div>`;
      }
      if (S.peos) {
        html += `<div class="sub-btn" onclick="showSection('peos', this)">Programme Educational Objectives (PEOs) <span class="arrow">▶</span></div>`;
      }
      if (S.pos) {
        html += `<div class="sub-btn" onclick="showSection('pos', this)">Programme Outcomes (POs) <span class="arrow">▶</span></div>`;
      }
      if (S.psos) {
        html += `<div class="sub-btn" onclick="showSection('psos', this)">Programme Specific Outcomes (PSOs) <span class="arrow">▶</span></div>`;
      }
      if (S.committee) {
        html += `<div class="sub-btn" onclick="showSection('committee', this)">Program Wise Committee (PBOs) <span class="arrow">▶</span></div>`;
      }
      html += `</div>`;
    }

    if (S.salientFeatures) {
      html += `<div class="main-btn" onclick="showSection('salient-features', this)">Salient Features <span class="arrow">▶</span></div>`;
    }

    if (S.faculty) {
      html += `<div class="main-btn" onclick="showSection('faculty', this)">Faculty <span class="arrow">▶</span></div>`;
    }

    if (S.laboratory) {
      html += `<div class="main-btn" onclick="toggleMenu('menuLab', this)">Laboratories <span class="arrow">▶</span></div>`;
      html += `<div class="submenu" id="menuLab">`;
      html += `<div class="sub-btn" onclick="showSection('lab-info', this)">Lab Information <span class="arrow">▶</span></div>`;
      if (S.labPhotos) {
        html += `<div class="sub-btn" onclick="showSection('lab-photos', this)">Lab Photos <span class="arrow">▶</span></div>`;
      }
      html += `</div>`;
    }

    if (S.achievements) {
      html += `<div class="main-btn" onclick="showSection('achievements-sec', this)">Achievements <span class="arrow">▶</span></div>`;
    }

    if (S.magazine) {
      html += `<div class="main-btn" onclick="showSection('magazines-sec', this)">E-Magazines <span class="arrow">▶</span></div>`;
    }

    if (S.syllabus) {
      html += `<div class="main-btn" onclick="toggleMenu('menuSyllabus', this)">Syllabus <span class="arrow">▶</span></div>`;
      html += `<div class="submenu" id="menuSyllabus">`;
      html += `<div class="sub-btn" onclick="showSection('syllabus-fy', this)">First Year <span class="arrow">▶</span></div>`;
      html += `<div class="sub-btn" onclick="showSection('syllabus-sy', this)">Second Year / Direct Second Year <span class="arrow">▶</span></div>`;
      html += `<div class="sub-btn" onclick="showSection('syllabus-ty', this)">Third Year <span class="arrow">▶</span></div>`;
      html += `</div>`;
    }

    if (S.questionPaper) {
      html += `<div class="main-btn" onclick="toggleMenu('menuQP', this)">Question paper profile <span class="arrow">▶</span></div>`;
      html += `<div class="submenu" id="menuQP">`;
      html += `<div class="sub-btn" onclick="showSection('qp-fy', this)">First Year <span class="arrow">▶</span></div>`;
      html += `<div class="sub-btn" onclick="showSection('qp-sy', this)">Second Year / Direct Second Year <span class="arrow">▶</span></div>`;
      html += `<div class="sub-btn" onclick="showSection('qp-ty', this)">Third Year <span class="arrow">▶</span></div>`;
      html += `</div>`;
    }

    // Notice Board (ALWAYS ADDED)
    html += `<div class="main-btn" id="noticeBtn" onclick="showSection('notices', this)">Notice Board <span class="arrow">▶</span></div>`;

    sidebar.innerHTML = html;
  }

  function renderContent() {
    const content = document.getElementById("content");
    let html = "";

    // Vision & Mission
    if (S.visionMission && dept.vision) {
      html += `
        <section id="vision-mission" class="section active">
          <h2>About Department</h2>
          <h4>Vision</h4>
          <p>${dept.vision}</p>
          <h4>Mission</h4>
          <ul>${(dept.mission || []).map(m => `<li>${m}</li>`).join("")}</ul>
        </section>`;
    }

    // Profile
    if (S.profile && dept.profile) {
      html += `
        <section id="profile" class="section ${!S.visionMission ? 'active' : ''}">
          <h2>Department Profile</h2>
          <div class="profile-text">${dept.profile}</div>
        </section>`;
    }

    // PEOs
    if (S.peos && dept.peos) {
      html += `
        <section id="peos" class="section">
          <h2>Programme Educational Objectives (PEOs)</h2>
          <ol>${dept.peos.map(p => `<li>${p}</li>`).join("")}</ol>
        </section>`;
    }

    // POs
    if (S.pos && dept.pos) {
      html += `
        <section id="pos" class="section">
          <h2>Programme Outcomes (POs)</h2>
          <ol>${dept.pos.map(p => `<li>${p}</li>`).join("")}</ol>
        </section>`;
    }

    // PSOs
    if (S.psos && dept.psos) {
      html += `
        <section id="psos" class="section">
          <h2>Programme Specific Outcomes (PSOs)</h2>
          <ol>${dept.psos.map(p => `<li>${p}</li>`).join("")}</ol>
        </section>`;
    }

    // Committee
    if (S.committee && dept.committee) {
      const rows = dept.committee.map((m, i) => `
        <tr><td>${i + 1}</td><td>${m.name}</td><td>${m.designation}</td><td>${m.experience}</td><td>${m.organization}</td></tr>`).join("");
      html += `
        <section id="committee" class="section">
          <h2>Program Wise Committee (PBOs Committee)</h2>
          <div class="table-container">
            <div class="table-scroll" data-rows="${dept.committee.length}" data-limit="5">
              <table class="data-table">
                <thead><tr><th>Sr.</th><th>Name</th><th>Designation</th><th>Experience</th><th>Organization</th></tr></thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
            ${dept.committee.length > 5 ? '<button class="view-toggle-btn" onclick="toggleTableView(this)">View More</button>' : ''}
          </div>
        </section>`;
    }

    // Salient Features
    if (S.salientFeatures && dept.salientFeatures) {
      html += `
        <section id="salient-features" class="section">
          <h2>Salient Features</h2>
          <ul class="features-list">${dept.salientFeatures.map(f => `<li>${f}</li>`).join("")}</ul>
        </section>`;
    }

    // Faculty
    if (S.faculty && dept.faculty) {
      const cards = dept.faculty.map(f => `
        <div class="faculty-card">
          <div class="card-inner">
            <img class="photo" src="${f.image}" alt="${f.name}" loading="lazy">
            <div class="card-body">
              <h3>${f.name}</h3>
              <div class="role">${f.role}</div>
              <div class="contact">
                📞 <a href="tel:${f.phone}">${f.phone}</a><br>
                ✉️ <a href="mailto:${f.email}">${f.email}</a>
              </div>
            </div>
          </div>
        </div>`).join("");

      html += `
        <section id="faculty" class="section">
          <h2>Faculty</h2>
          <div class="slider-container">
            <div class="slider-wrapper"><div class="slider" id="facultySlider">${cards}</div></div>
            <div class="arrows">
              <button class="arrow-btn" id="prevBtn" aria-label="Previous">←</button>
              <button class="arrow-btn" id="nextBtn" aria-label="Next">→</button>
            </div>
          </div>
        </section>`;
    }

    // Lab Info
    if (S.laboratory && dept.labs) {
      const rows = dept.labs.map((l, i) => `
        <tr><td>${i + 1}</td><td>${l.name}</td><td>${l.equipment}</td><td>${l.area}</td><td>${l.cost}</td><td>${l.remarks || ''}</td></tr>`).join("");
      html += `
        <section id="lab-info" class="section">
          <h2>Lab Information</h2>
          <div class="table-container">
            <div class="table-scroll" data-rows="${dept.labs.length}" data-limit="5">
              <table class="data-table">
                <thead><tr><th>Sr.</th><th>Name of Lab</th><th>Major Equipment</th><th>Area (sq.m)</th><th>Cost (₹)</th><th>Remarks</th></tr></thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
            ${dept.labs.length > 5 ? '<button class="view-toggle-btn" onclick="toggleTableView(this)">View More</button>' : ''}
          </div>
        </section>`;
    }

    // Lab Photos
    if (S.labPhotos && dept.labPhotos) {
      const imgs = dept.labPhotos.map((img, i) => `<img src="${img}" class="slide ${i === 0 ? 'active' : ''}" alt="Lab Photo ${i + 1}" loading="lazy">`).join("");
      const dots = dept.labPhotos.map((_, i) => `<span class="slider-dot ${i === 0 ? 'active' : ''}"></span>`).join("");
      html += `
        <section id="lab-photos" class="section">
          <h2>Lab Photos</h2>
          <div class="lab-photos-slider">
            <button class="slider-arrow prev" id="labPrev" aria-label="Previous">←</button>
            <div class="slider-wrapper"><div class="slider-track" id="labPhotosTrack">${imgs}</div></div>
            <button class="slider-arrow next" id="labNext" aria-label="Next">→</button>
            <div class="slider-dots" id="labDots">${dots}</div>
          </div>
        </section>`;
    }

    // Achievements
    if (S.achievements) {
      let cardsHtml = '<div class="gallery-style-grid">';
      for (let i = 1; i <= 5; i++) {
        cardsHtml += `
          <div class="gallery-style-card">
            <div class="gallery-style-img">
              <img src="/static/images/campus${(i % 4) + 1}.jpg.jpeg" alt="Achievement ${i}" loading="lazy">
            </div>
            <div class="gallery-style-text">Achievement Item ${i}</div>
          </div>`;
      }
      cardsHtml += '</div>';
      html += `
        <section id="achievements-sec" class="section">
          <h2>Achievements</h2>
          ${cardsHtml}
        </section>`;
    }

    // E-Magazines
    if (S.magazine) {
      const mags = (dept.magazines && dept.magazines.length > 0) ? dept.magazines : [
        { title: "Technical", subtitle: "BITS & Bytes – Issue 1\nDept. June 2023", downloadUrl: "#", viewUrl: "#" },
        { title: "Technical", subtitle: "Innovation Edition\nDept. Dec 2023", downloadUrl: "#", viewUrl: "#" }
      ];
      const cards = mags.map(m => `
        <div class="card" onclick="window.open('${m.viewUrl}','_blank')">
          <div class="download-btn" onclick="event.stopPropagation();window.open('${m.downloadUrl}','_blank')">DOWNLOAD</div>
          <div class="card-title">${m.title}</div>
          <div class="card-subtitle">${m.subtitle}</div>
        </div>`).join("");
      html += `
        <section id="magazines-sec" class="section">
          <h2>E-Magazines</h2>
          <div class="cards-wrapper"><div class="cards-scroll">${cards}</div></div>
        </section>`;
    }

    // Syllabus Sections
    if (S.syllabus) {
      html += `
        <section id="syllabus-fy" class="section"><h2>Syllabus - First Year</h2><p>Content coming soon...</p></section>
        <section id="syllabus-sy" class="section"><h2>Syllabus - Second Year / Direct Second Year</h2><p>Content coming soon...</p></section>
        <section id="syllabus-ty" class="section"><h2>Syllabus - Third Year</h2><p>Content coming soon...</p></section>
      `;
    }

    // Question Paper Sections
    if (S.questionPaper) {
      html += `
        <section id="qp-fy" class="section"><h2>Question Paper Profile - First Year</h2><p>Content coming soon...</p></section>
        <section id="qp-sy" class="section"><h2>Question Paper Profile - Second Year / Direct Second Year</h2><p>Content coming soon...</p></section>
        <section id="qp-ty" class="section"><h2>Question Paper Profile - Third Year</h2><p>Content coming soon...</p></section>
      `;
    }

    // Notice Board Section
    html += `
      <section id="notices" class="section">
        <h2>Notice Board</h2>
        <div class="notice-section-wrapper" id="noticeSection">
            <div class="table-wrapper" style="max-height: none; overflow-y: visible;">
                <table class="notice-table">
                    <thead>
                        <tr>
                            <th style="width: 15%;">Date</th>
                            <th style="width: 70%;">Description</th>
                            <th style="width: 15%;">Download</th>
                        </tr>
                    </thead>
                    <tbody id="deptNoticeBody">
                        <tr><td colspan="3" style="text-align:center;">Loading notices...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
      </section>
    `;

    content.innerHTML = html;
  }

  function initViewToggle() {
    document.querySelectorAll('.table-scroll').forEach(el => {
      const rows = parseInt(el.getAttribute('data-rows'));
      const limit = parseInt(el.getAttribute('data-limit'));
      if (rows <= limit) {
        el.style.maxHeight = 'none';
      }
    });
  }

  async function renderDeptNotices() {
    const noticeBody = document.getElementById("deptNoticeBody");
    if (!noticeBody) return;

    // ── Map each department to its specific category ──────────────────────────
    const deptCategoryMap = {
      'aiml': 'notice_dept_aiml',
      'auto': 'notice_dept_auto',
      'civil': 'notice_dept_civil',
      'computer': 'notice_dept_computer',
      'ddgm': 'notice_dept_ddgm',
      'electrical': 'notice_dept_electrical',
      'entc': 'notice_dept_entc',
      'it': 'notice_dept_it',
      'mechanical': 'notice_dept_mechanical',
      'science-humanities': 'notice_dept_science_humanities',
      'applied-mechanics': 'notice_dept_applied_mechanics',
      'workshop': 'notice_dept_workshop',
      'mercedes-benz': 'notice_dept_mercedes_benz',
    };
    const deptCategory = deptCategoryMap[deptId] || 'notice_department';

    try {
      const response = await fetch(`/api/announcements?category=${deptCategory}`);
      const result = await response.json();
      const notices = result.data || [];

      noticeBody.innerHTML = "";
      if (notices.length === 0) {
        noticeBody.innerHTML = "<tr><td colspan='3' style='text-align:center;'>No notices found.</td></tr>";
        return;
      }

      const today = new Date();
      notices.forEach(notice => {
        const dateStr = notice.published_at || notice.date;
        const publishDate = new Date(dateStr);
        const diffDays = Math.floor((today - publishDate) / (1000 * 60 * 60 * 24));
        const row = document.createElement("tr");

        const dateTd = document.createElement("td");
        dateTd.textContent = publishDate.toLocaleDateString("en-GB");

        const descTd = document.createElement("td");
        descTd.className = "description";
        descTd.textContent = notice.title || notice.description;

        if (diffDays >= 0 && diffDays <= 10) {
          const newBadge = document.createElement("span");
          newBadge.className = "new-tag";
          newBadge.innerHTML = '<i class="fas fa-bolt"></i> NEW';
          descTd.appendChild(newBadge);
        }

        const downloadTd = document.createElement("td");
        const pdfUrl = notice.file_url || notice.pdf;
        if (pdfUrl) {
          downloadTd.innerHTML = `<a href="${pdfUrl}" download class="download-btn"><i class="fa-solid fa-file-pdf"></i> PDF</a>`;
        } else {
          downloadTd.innerHTML = "-";
        }

        row.appendChild(dateTd);
        row.appendChild(descTd);
        row.appendChild(downloadTd);
        noticeBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching notices:", error);
      noticeBody.innerHTML = "<tr><td colspan='3' style='text-align:center; color:red;'>Failed to load notices.</td></tr>";
    }
  }

  // Handle URL parameters on load
  const params = new URLSearchParams(window.location.search);
  const section = params.get("section");
  if (section === "notices") {
    setTimeout(() => {
      showSection('notices', document.getElementById('noticeBtn'));
    }, 200);
  }

  // Expose it so showSection can call it
  window.renderDeptNotices = renderDeptNotices;

})();

// ─── GLOBAL FUNCTIONS ───
function toggleMenu(menuId, element) {
  const allMenus = document.querySelectorAll(".submenu");
  const allBtns = document.querySelectorAll(".main-btn");
  const menu = document.getElementById(menuId);
  const isOpen = menu.style.display === "block";

  allMenus.forEach(m => m.style.display = "none");
  allBtns.forEach(b => { b.classList.remove("active"); const a = b.querySelector(".arrow"); if (a) a.innerHTML = "▶"; });

  if (!isOpen) {
    menu.style.display = "block";
    element.classList.add("active");
    const arrow = element.querySelector(".arrow");
    if (arrow) arrow.innerHTML = "▼";
  }
}

function showSection(id, element) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".sub-btn").forEach(b => { b.classList.remove("active"); const a = b.querySelector(".arrow"); if (a) a.innerHTML = "▶"; });
  document.querySelectorAll(".main-btn").forEach(b => {
    if (b === element) {
      b.classList.add("active");
      const a = b.querySelector(".arrow");
      if (a) a.innerHTML = "▼";
    }
  });

  const section = document.getElementById(id);
  if (section) section.classList.add("active");

  if (id === 'notices' && window.renderDeptNotices) {
    window.renderDeptNotices();
  }

  if (element && element.classList.contains("sub-btn")) {
    element.classList.add("active");
    const arrow = element.querySelector(".arrow");
    if (arrow) arrow.innerHTML = "▼";
  }
}

function toggleTableView(btn) {
  const scroll = btn.previousElementSibling || btn.parentElement.querySelector('.table-scroll');
  if (scroll.classList.contains('expanded')) {
    scroll.classList.remove('expanded');
    btn.textContent = 'View More';
    scroll.scrollTop = 0;
  } else {
    scroll.classList.add('expanded');
    btn.textContent = 'View Less';
  }
}