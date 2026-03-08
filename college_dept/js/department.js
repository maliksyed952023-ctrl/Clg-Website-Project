(function () {
  const DATA = DEPARTMENTS_DATA;
  const deptId = document.body.getAttribute("data-dept");
  const dept = DATA.departments[deptId];

  if (!dept) {
    document.getElementById("content").innerHTML = '<section class="section active"><h2>Department Not Found</h2><p>The requested department could not be loaded.</p></section>';
    return;
  }

  const S = dept.sections || {};

  // ─── HEADER ───
  document.getElementById("header").innerHTML = `
    ${DATA.college.name}
    <button class="mobile-menu-btn" onclick="document.getElementById('navbar').classList.toggle('open')" aria-label="Menu">☰</button>
  `;

  // ─── NAVBAR ───
  renderNavbar();

  // ─── BREADCRUMB ───
  document.getElementById("dept-breadcrumb").textContent = dept.name;

  // ─── TITLE ───
  document.getElementById("dept-title").textContent = dept.name.toUpperCase();

  // ─── HERO SLIDER ───
  const sliderImages = dept.sliderImages || DATA.defaultSliderImages;
  initHeroSlider("dept-slider", sliderImages);

  // ─── SIDEBAR ───
  renderSidebar();

  // ─── CONTENT ───
  renderContent();

  // ─── FOOTER ───
  renderFooter();

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

    // Build dept dropdown
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

    // About Department (always present if about=true)
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

    // Salient Features
    if (S.salientFeatures) {
      html += `<div class="main-btn" onclick="showSection('salient-features', this)">Salient Features <span class="arrow">▶</span></div>`;
    }

    // Faculty
    if (S.faculty) {
      html += `<div class="main-btn" onclick="showSection('faculty', this)">Faculty <span class="arrow">▶</span></div>`;
    }

    // Laboratories
    if (S.laboratory) {
      html += `<div class="main-btn" onclick="toggleMenu('menuLab', this)">Laboratories <span class="arrow">▶</span></div>`;
      html += `<div class="submenu" id="menuLab">`;
      html += `<div class="sub-btn" onclick="showSection('lab-info', this)">Lab Information <span class="arrow">▶</span></div>`;
      if (S.labPhotos) {
        html += `<div class="sub-btn" onclick="showSection('lab-photos', this)">Lab Photos <span class="arrow">▶</span></div>`;
      }
      html += `</div>`;
    }

    // Department Achievements (conditional)
    if (S.achievements) {
      html += `<div class="main-btn" onclick="toggleMenu('menuAchieve', this)">Department Achievements <span class="arrow">▶</span></div>`;
      html += `<div class="submenu" id="menuAchieve">`;
      if (S.magazine) {
        html += `<div class="sub-btn" onclick="showSection('magazines', this)">Technical Magazine <span class="arrow">▶</span></div>`;
      }
      html += `</div>`;
    }

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

    // Profile (Mercedes-Benz)
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
        <tr><td>${i+1}</td><td>${m.name}</td><td>${m.designation}</td><td>${m.experience}</td><td>${m.organization}</td></tr>`).join("");
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
        <tr><td>${i+1}</td><td>${l.name}</td><td>${l.equipment}</td><td>${l.area}</td><td>${l.cost}</td><td>${l.remarks || ''}</td></tr>`).join("");
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
      const imgs = dept.labPhotos.map((img, i) => `<img src="${img}" class="slide ${i===0?'active':''}" alt="Lab Photo ${i+1}" loading="lazy">`).join("");
      const dots = dept.labPhotos.map((_, i) => `<span class="slider-dot ${i===0?'active':''}"></span>`).join("");
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

    // Magazines
    if (S.magazine && dept.magazines) {
      const cards = dept.magazines.map(m => `
        <div class="card" onclick="window.open('${m.viewUrl}','_blank')">
          <div class="download-btn" onclick="event.stopPropagation();window.open('${m.downloadUrl}','_blank')">DOWNLOAD</div>
          <div class="card-title">${m.title}</div>
          <div class="card-subtitle">${m.subtitle}</div>
        </div>`).join("");
      html += `
        <section id="magazines" class="section">
          <h2>Technical Magazine</h2>
          <div class="cards-wrapper"><div class="cards-scroll">${cards}</div></div>
        </section>`;
    }

    content.innerHTML = html;
  }

  function renderFooter() {
    const C = DATA.college;
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
      <div class="footer-grid">
        <div class="footer-col">
          <h3>${C.name}</h3>
          <p>${C.address}</p>
          <p>📞 ${C.phone}</p>
          <p>✉️ ${C.email}</p>
          <p>🌐 ${C.website}</p>
        </div>
        <div class="footer-col">
          <h3>Quick Links</h3>
          <ul>${C.quickLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
        </div>
        <div class="footer-col">
          <h3>Departments</h3>
          <ul>
            ${Object.values(DATA.departmentCategories).flat().slice(0,8).map(d =>
              `<li><a href="/departments/${d.slug}.html">${d.name}</a></li>`
            ).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h3>Connect With Us</h3>
          <div class="footer-social">
            <a href="${C.socialLinks.facebook}" aria-label="Facebook">f</a>
            <a href="${C.socialLinks.twitter}" aria-label="Twitter">𝕏</a>
            <a href="${C.socialLinks.instagram}" aria-label="Instagram">📷</a>
            <a href="${C.socialLinks.youtube}" aria-label="YouTube">▶</a>
            <a href="${C.socialLinks.linkedin}" aria-label="LinkedIn">in</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        © ${new Date().getFullYear()} ${C.name}. All Rights Reserved.
      </div>
    `;
    document.body.appendChild(footer);
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
})();

// ─── GLOBAL FUNCTIONS ───
function toggleMenu(menuId, element) {
  const allMenus = document.querySelectorAll(".submenu");
  const allBtns = document.querySelectorAll(".main-btn");
  const menu = document.getElementById(menuId);
  const isOpen = menu.style.display === "block";

  allMenus.forEach(m => m.style.display = "none");
  allBtns.forEach(b => { b.classList.remove("active"); const a = b.querySelector(".arrow"); if(a) a.innerHTML = "▶"; });

  if (!isOpen) {
    menu.style.display = "block";
    element.classList.add("active");
    const arrow = element.querySelector(".arrow");
    if (arrow) arrow.innerHTML = "▼";
  }
}

function showSection(id, element) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".sub-btn").forEach(b => { b.classList.remove("active"); const a = b.querySelector(".arrow"); if(a) a.innerHTML = "▶"; });
  document.querySelectorAll(".main-btn").forEach(b => {
    // If it's a direct section button (no submenu), handle it
    if (b === element) {
      b.classList.add("active");
      const a = b.querySelector(".arrow");
      if (a) a.innerHTML = "▼";
    }
  });

  const section = document.getElementById(id);
  if (section) section.classList.add("active");
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
