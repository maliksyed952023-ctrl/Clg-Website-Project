(function () {
  const DATA = DEPARTMENTS_DATA;
  const deptId = document.body.getAttribute("data-dept");
  const dept = DATA.departments[deptId];

  if (!dept) {
    document.getElementById("content").innerHTML = '<section class="section active"><h2>Department Not Found</h2><p>The requested department could not be loaded.</p></section>';
    return;
  }

  function renderDepartment(dept, deptId) {
    const S = dept.sections || {};
    let html = "";
    
    // Inject Lightbox HTML & Gallery Styles if not exists
    if (!document.getElementById('labLightbox')) {
        const lbHtml = `
        <div id="labLightbox" class="lab-lightbox" style="display:none;">
          <div class="lb-content">
            <div class="lb-header">
              <h3 id="lbTitle">Laboratory Gallery</h3>
              <button class="lb-close" onclick="window.closeLabLightbox()">&times;</button>
            </div>
            <div id="lbGrid" class="lb-grid"></div>
          </div>
        </div>
        <style>
            .lab-lightbox { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; backdrop-filter: blur(5px); }
            .lab-lightbox.active { opacity: 1; }
            .lb-content { background: #fff; width: 95%; max-width: 1100px; max-height: 90vh; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; animation: lbScaleIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
            @keyframes lbScaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .lb-header { padding: 18px 25px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; background: #fff; position: sticky; top:0; z-index: 10; }
            .lb-header h3 { margin: 0; font-size: 1.3rem; color: #c1121f; font-weight: 700; }
            .lb-close { background: #f8f9fa; border: none; font-size: 24px; cursor: pointer; color: #666; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
            .lb-close:hover { background: #fee2e2; color: #c1121f; transform: rotate(90deg); }
            .lb-grid { padding: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); grid-auto-rows: 160px; gap: 16px; overflow-y: auto; flex: 1; min-height: 0; background: #f8f9fa; }
            .lb-item { border-radius: 10px; overflow: hidden; cursor: pointer; border: 2px solid #eee; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: all 0.3s ease; width: 100%; height: 100%; }
            .lb-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; display: block; }
            .lb-item:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); border-color: #c1121f; }
            .lb-item:hover img { transform: scale(1.05); }
            
            .gallery-style-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; padding: 20px 0; }
            .gallery-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: all 0.3s ease; border: 1px solid #eee; }
            .gallery-card:hover { transform: translateY(-8px); box-shadow: 0 12px 25px rgba(0,0,0,0.15); }
            .gallery-img-wrapper { height: 200px; position: relative; overflow: hidden; background: #f8f9fa; }
            .gallery-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
            .gallery-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(193, 18, 31, 0.7); display: flex; align-items: center; justify-content: center; opacity:0; transition: 0.3s; }
            .gallery-card:hover .gallery-overlay { opacity: 1; }
            .overlay-content { color: #fff; text-align: center; }
            .overlay-content i { font-size: 2rem; margin-bottom: 8px; display: block; }
            .gallery-info { padding: 15px; border-top: 1px solid #f0f0f0; }
            .gallery-card-title { margin: 0 0 5px; font-size: 1.1rem; color: #333; font-weight: 700; }
            .gallery-card-subtitle { margin: 0; font-size: 0.9rem; color: #888; }
            
            .table-container { margin-top: 20px; overflow: hidden; border-radius: 8px; border: 1px solid #eee; }
            .data-table { width: 100%; border-collapse: collapse; }
            .data-table th, .data-table td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #eee; }
            .data-table th { background: #f8f9fa; color: #c1121f; font-weight: 600; }
        </style>
        `;
        document.body.insertAdjacentHTML('beforeend', lbHtml);
        window.closeLabLightbox = function() {
            const lb = document.getElementById('labLightbox');
            if(!lb) return;
            lb.classList.remove('active');
            setTimeout(() => {
                lb.style.display = 'none';
                document.getElementById('lbGrid').innerHTML = ''; // Clear content to avoid flashing old images next time
            }, 300);
        };
    }

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
      initViewToggle();
    }, 100);

    // ═══ INNER FUNCTIONS ═══

    function renderSidebar() {
      const sidebar = document.getElementById("sidebar");
      let html = "";

      if (S.about) {
        html += `<div class="main-btn active" onclick="toggleMenu('menuAbout', this)">About Department <span class="arrow">▼</span></div>`;
        html += `<div class="submenu" id="menuAbout" style="display:block;">`;
        if (S.visionMission) html += `<div class="sub-btn active" onclick="showSection('vision-mission', this)">Vision And Mission <span class="arrow">▼</span></div>`;
        if (S.profile) html += `<div class="sub-btn active" onclick="showSection('profile', this)">Profile <span class="arrow">▼</span></div>`;
        if (S.peos) html += `<div class="sub-btn" onclick="showSection('peos', this)">Programme Educational Objectives (PEOs) <span class="arrow">▶</span></div>`;
        if (S.pos) html += `<div class="sub-btn" onclick="showSection('pos', this)">Programme Outcomes (POs) <span class="arrow">▶</span></div>`;
        if (S.psos) html += `<div class="sub-btn" onclick="showSection('psos', this)">Programme Specific Outcomes (PSOs) <span class="arrow">▶</span></div>`;
        if (S.committee) html += `<div class="sub-btn" onclick="showSection('committee', this)">Program Wise Committee (PBOs) <span class="arrow">▶</span></div>`;
        html += `</div>`;
      }

      if (S.salientFeatures) html += `<div class="main-btn" onclick="showSection('salient-features', this)">Salient Features <span class="arrow">▶</span></div>`;
      if (S.faculty) html += `<div class="main-btn" onclick="showSection('faculty', this)">Faculty <span class="arrow">▶</span></div>`;

      if (S.laboratory) {
        html += `<div class="main-btn" onclick="toggleMenu('menuLab', this)">Laboratories <span class="arrow">▶</span></div>`;
        html += `<div class="submenu" id="menuLab">`;
        html += `<div class="sub-btn" onclick="showSection('lab-info', this)">Lab Information <span class="arrow">▶</span></div>`;
        if (S.labPhotos) html += `<div class="sub-btn" onclick="showSection('lab-photos', this)">Lab Photos <span class="arrow">▶</span></div>`;
        html += `</div>`;
      }

      if (S.achievements) html += `<div class="main-btn" onclick="showSection('achievements-sec', this)">Achievements <span class="arrow">▶</span></div>`;
      if (S.magazine) html += `<div class="main-btn" onclick="showSection('magazines-sec', this)">E-Magazines <span class="arrow">▶</span></div>`;

      if (S.syllabus) {
        html += `<div class="main-btn" onclick="toggleMenu('menuSyllabus', this)">Syllabus <span class="arrow">▶</span></div>`;
        html += `<div class="submenu" id="menuSyllabus">`;
        html += `<div class="sub-btn" onclick="showSection('syllabus-fy', this)">First Year <span class="arrow">▶</span></div>`;
        html += `<div class="sub-btn" onclick="showSection('syllabus-sy', this)">Second Year <span class="arrow">▶</span></div>`;
        html += `<div class="sub-btn" onclick="showSection('syllabus-ty', this)">Third Year <span class="arrow">▶</span></div>`;
        html += `</div>`;
      }

      if (S.questionPaper) {
        html += `<div class="main-btn" onclick="toggleMenu('menuQP', this)">Question paper profile <span class="arrow">▶</span></div>`;
        html += `<div class="submenu" id="menuQP">`;
        html += `<div class="sub-btn" onclick="showSection('qp-fy', this)">First Year <span class="arrow">▶</span></div>`;
        html += `<div class="sub-btn" onclick="showSection('qp-sy', this)">Second Year <span class="arrow">▶</span></div>`;
        html += `<div class="sub-btn" onclick="showSection('qp-ty', this)">Third Year <span class="arrow">▶</span></div>`;
        html += `</div>`;
      }

      html += `<div class="main-btn" id="noticeBtn" onclick="showSection('notices', this)">Notice Board <span class="arrow">▶</span></div>`;
      sidebar.innerHTML = html;
    }

    function renderContent() {
      const content = document.getElementById("content");
      let html = "";

      if (S.visionMission && dept.vision) {
        html += `
          <section id="vision-mission" class="section active">
            <h2>About Department</h2>
            <h4>Vision</h4><p>${dept.vision}</p>
            <h4>Mission</h4><ul>${(dept.mission || []).map(m => `<li>${m}</li>`).join("")}</ul>
          </section>`;
      }

      if (S.profile && dept.profile) {
        html += `<section id="profile" class="section ${!S.visionMission ? 'active' : ''}"><h2>Department Profile</h2><div class="profile-text">${dept.profile}</div></section>`;
      }

      if (S.peos && dept.peos) {
        html += `<section id="peos" class="section"><h2>Programme Educational Objectives (PEOs)</h2><ol>${dept.peos.map(p => `<li>${p}</li>`).join("")}</ol></section>`;
      }

      if (S.pos && dept.pos) {
        html += `<section id="pos" class="section"><h2>Programme Outcomes (POs)</h2><ol>${dept.pos.map(p => `<li>${p}</li>`).join("")}</ol></section>`;
      }

      if (S.psos && dept.psos) {
        html += `<section id="psos" class="section"><h2>Programme Specific Outcomes (PSOs)</h2><ol>${dept.psos.map(p => `<li>${p}</li>`).join("")}</ol></section>`;
      }

      if (S.committee && dept.committee) {
        const rows = dept.committee.map((m, i) => `<tr><td>${i + 1}</td><td>${m.name}</td><td>${m.designation}</td><td>${m.experience}</td><td>${m.organization}</td></tr>`).join("");
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

      if (S.salientFeatures && dept.salientFeatures) {
        html += `<section id="salient-features" class="section"><h2>Salient Features</h2><ul class="features-list">${dept.salientFeatures.map(f => `<li>${f}</li>`).join("")}</ul></section>`;
      }

      if (S.faculty && dept.faculty) {
        const cards = dept.faculty.map((f, i) => {
          const slug = `dept_${deptId}_faculty_${i + 1}`;
          return `
          <div class="faculty-card">
            <div class="card-inner">
              <img class="photo" src="${f.image}" data-slug="${slug}" data-fallback="${f.image}" alt="${f.name}" loading="lazy">
              <div class="card-body">
                <h3>${f.name}</h3><div class="role">${f.role}</div>
                <div class="contact">📞 <a href="tel:${f.phone}">${f.phone}</a><br>✉️ <a href="mailto:${f.email}">${f.email}</a></div>
              </div>
            </div>
          </div>`;
        }).join("");
        html += `<section id="faculty" class="section"><h2>Faculty</h2><div class="slider-container"><div class="slider-wrapper"><div class="slider" id="facultySlider">${cards}</div></div><div class="arrows"><button class="arrow-btn" id="prevBtn">←</button><button class="arrow-btn" id="nextBtn">→</button></div></div></section>`;
      }

      if (S.laboratory && dept.labs) {
        const rows = dept.labs.map((l, i) => `<tr><td>${i+1}</td><td>${l.name}</td><td>${l.equipment}</td><td>${l.area}</td><td>${l.remarks || ''}</td></tr>`).join("");
        html += `
          <section id="lab-info" class="section">
            <h2>Lab Information</h2>
            <div class="table-container">
              <div class="table-scroll" data-rows="${dept.labs.length}" data-limit="5">
                <table class="data-table">
                  <thead><tr><th>Sr.</th><th>Name of Lab</th><th>Major Equipment</th><th>Area (m²)</th><th>Remarks</th></tr></thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
              ${dept.labs.length > 5 ? '<button class="view-toggle-btn" onclick="toggleTableView(this)">View More</button>' : ''}
            </div>
          </section>`;
      }

      if (S.labPhotos) {
        const maxLabSlots = 5;
        let cards = "";
        for (let i = 0; i < maxLabSlots; i++) {
          const slug = `dept_${deptId}_lab_${i + 1}`;
          const defaultName = (dept.labs && dept.labs[i]) ? dept.labs[i].name : `Lab ${i+1}`;
          cards += `
          <div class="gallery-card" id="card_${slug}" style="cursor:pointer">
            <div class="gallery-img-wrapper" style="display:none;">
               <img src="" alt="${defaultName}" data-slug="${slug}" data-fallback="" loading="lazy">
               <div class="gallery-overlay"><div class="overlay-content"><i class="fas fa-search-plus"></i><span>View Lab Photos</span></div></div>
            </div>
            <div class="gallery-info"><h3 class="gallery-card-title">${defaultName}</h3><p class="gallery-card-subtitle">Laboratory Gallery</p></div>
          </div>`;
        }
        html += `<section id="lab-photos" class="section"><h2>Laboratories Gallery</h2><div class="gallery-style-grid">${cards}</div></section>`;
        
        setTimeout(async () => {
          for (let i = 0; i < maxLabSlots; i++) {
            const slug = `dept_${deptId}_lab_${i + 1}`;
            const cardEl = document.getElementById(`card_${slug}`);
            if(!cardEl) continue;
            try {
              const res = await fetch(`/api/images?slug=${slug}`);
              const json = await res.json();
              if(json.data && json.data.length > 0) {
                const first = json.data[0];
                const img = cardEl.querySelector('img');
                const wrapper = cardEl.querySelector('.gallery-img-wrapper');
                img.src = first.url;
                if(wrapper) wrapper.style.display = 'block';
                
                // ✅ Use admin-entered title (subcategory field) if available, else fall back to lab name
                const defaultName = (dept.labs && dept.labs[i]) ? dept.labs[i].name : `Lab ${i+1}`;
                const adminTitle = first.subcategory && first.subcategory.trim() ? first.subcategory.trim() : defaultName;
                cardEl.querySelector('.gallery-card-title').textContent = adminTitle;
                
                cardEl.onclick = () => window.openLabGalleryFromData(json.data, adminTitle);
              } else {
                cardEl.onclick = () => window.openLabGallery(slug, cardEl.querySelector('.gallery-card-title').textContent);
              }
            } catch(e) {}
          }
        }, 500);
      }

      if (S.achievements) {
        let items = "";
        const maxAchSlots = 5;
        for (let i = 1; i <= maxAchSlots; i++) {
          const slug = `dept_${deptId}_achievement_${i}`;
          items += `
          <div class="gallery-card" id="card_${slug}" style="cursor:pointer">
            <div class="gallery-img-wrapper" style="display:none;">
               <img src="" alt="Achievement ${i}" data-slug="${slug}" data-fallback="" loading="lazy">
               <div class="gallery-overlay"><div class="overlay-content"><i class="fas fa-search-plus"></i><span>View Photos</span></div></div>
            </div>
            <div class="gallery-info"><h3 class="gallery-card-title">Achievement ${i}</h3><p class="gallery-card-subtitle">Department Achievement</p></div>
          </div>`;
        }
        html += `<section id="achievements-sec" class="section"><h2>Achievements</h2><div class="gallery-style-grid">${items}</div></section>`;

        // Fetch and populate achievement cards dynamically
        setTimeout(async () => {
          for (let i = 1; i <= maxAchSlots; i++) {
            const slug = `dept_${deptId}_achievement_${i}`;
            const cardEl = document.getElementById(`card_${slug}`);
            if (!cardEl) continue;
            try {
              const res = await fetch(`/api/images?slug=${slug}`);
              const json = await res.json();
              if (json.data && json.data.length > 0) {
                const first = json.data[0];
                const img = cardEl.querySelector('img');
                const wrapper = cardEl.querySelector('.gallery-img-wrapper');
                img.src = first.url;
                if (wrapper) wrapper.style.display = 'block';

                // Use admin-entered title (subcategory field) if available
                const adminTitle = first.subcategory && first.subcategory.trim() ? first.subcategory.trim() : `Achievement ${i}`;
                cardEl.querySelector('.gallery-card-title').textContent = adminTitle;

                // Open lightbox with all images for this slot
                cardEl.onclick = () => window.openLabGalleryFromData(json.data, adminTitle);
              } else {
                // No images — keep card visible but no image wrapper
                const title = cardEl.querySelector('.gallery-card-title').textContent;
                cardEl.onclick = () => window.openLabGallery(slug, title);
              }
            } catch(e) {}
          }
        }, 500);
      }

      if (S.magazine) {
        const mags = (dept.magazines && dept.magazines.length > 0) ? dept.magazines : [
          { title: "Technical", subtitle: "BITS & Bytes – Issue 1", viewUrl: "#" }
        ];
        const cards = mags.map(m => `<div class="gallery-card" onclick="window.open('${m.viewUrl}','_blank')"><div class="gallery-info"><h3 class="gallery-card-title">${m.title}</h3><p class="gallery-card-subtitle">${m.subtitle}</p></div></div>`).join("");
        html += `<section id="magazines-sec" class="section"><h2>E-Magazines</h2><div class="gallery-style-grid">${cards}</div></section>`;
      }

      html += `<section id="notices" class="section"><h2>Notice Board</h2><div class="table-container"><table class="data-table"><thead><tr><th>Date</th><th>Description</th><th>Download</th></tr></thead><tbody id="deptNoticeBody"><tr><td colspan="3">Loading...</td></tr></tbody></table></div></section>`;
      
      content.innerHTML = html;
      if (window.ImageLoader) window.ImageLoader.updateDOM();
    }

    window.openLabGalleryFromData = function(images, title) {
      const grid = document.getElementById('lbGrid');
      const lbTitle = document.getElementById('lbTitle');
      const lb = document.getElementById('labLightbox');
      lbTitle.textContent = title;
      lb.style.display = 'flex';
      setTimeout(() => lb.classList.add('active'), 10);
      grid.innerHTML = images.map(img => `<div class="lb-item"><img src="${img.url}" onclick="window.openFullImage('${img.url}')"></div>`).join('');
    };

    window.openLabGallery = async function(slug, title) {
      const grid = document.getElementById('lbGrid');
      const lbTitle = document.getElementById('lbTitle');
      const lb = document.getElementById('labLightbox');
      lbTitle.textContent = title;
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding:50px;">Loading...</p>';
      lb.style.display = 'flex';
      setTimeout(() => lb.classList.add('active'), 10);
      try {
        const res = await fetch(`/api/images?slug=${slug}`);
        const json = await res.json();
        const images = json.data || [];
        if (images.length === 0) {
          grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding:50px;">No photos available.</p>';
        } else {
          grid.innerHTML = images.map(img => `<div class="lb-item"><img src="${img.url}" onclick="window.openFullImage('${img.url}')"></div>`).join('');
        }
      } catch (e) { grid.innerHTML = '<p>Error.</p>'; }
    };

    window.openFullImage = function(url) { window.open(url, '_blank'); };
  }

  function initViewToggle() {
    document.querySelectorAll('.table-scroll').forEach(el => {
      const rows = parseInt(el.getAttribute('data-rows'));
      const limit = parseInt(el.getAttribute('data-limit'));
      if (rows <= limit) el.style.maxHeight = 'none';
    });
  }

  async function renderDeptNotices() {
    const noticeBody = document.getElementById("deptNoticeBody");
    if (!noticeBody) return;
    const deptCategoryMap = { 'aiml': 'notice_dept_aiml', 'entc': 'notice_dept_entc', 'computer': 'notice_dept_computer' };
    const deptCategory = deptCategoryMap[deptId] || 'notice_department';
    try {
      const response = await fetch(`/api/announcements?category=${deptCategory}`);
      const result = await response.json();
      const notices = result.data || [];
      noticeBody.innerHTML = notices.length === 0 ? "<tr><td colspan='3'>No notices found.</td></tr>" : notices.map(n => `<tr><td>${new Date(n.published_at || n.date).toLocaleDateString("en-GB")}</td><td>${n.title}</td><td>${n.file_url ? `<a href="${n.file_url}" download>PDF</a>` : '-'}</td></tr>`).join("");
    } catch (e) { noticeBody.innerHTML = "<tr><td colspan='3'>Error.</td></tr>"; }
  }

  window.renderDeptNotices = renderDeptNotices;
  renderDepartment(dept, deptId);
})();

function toggleMenu(menuId, element) {
  const menu = document.getElementById(menuId);
  if (!menu) return;
  const isOpen = menu.style.display === "block";
  document.querySelectorAll(".submenu").forEach(m => m.style.display = "none");
  document.querySelectorAll(".main-btn").forEach(b => { b.classList.remove("active"); const a = b.querySelector(".arrow"); if (a) a.innerHTML = "▶"; });
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
  document.querySelectorAll(".main-btn").forEach(b => { if (b === element) { b.classList.add("active"); const a = b.querySelector(".arrow"); if (a) a.innerHTML = "▼"; } });
  const section = document.getElementById(id);
  if (section) section.classList.add("active");
  if (id === 'notices' && window.renderDeptNotices) window.renderDeptNotices();
  if (element && element.classList.contains("sub-btn")) { element.classList.add("active"); const arrow = element.querySelector(".arrow"); if (arrow) arrow.innerHTML = "▼"; }
}

function toggleTableView(btn) {
  const scroll = btn.previousElementSibling || btn.parentElement.querySelector('.table-scroll');
  if (!scroll) return;
  if (scroll.classList.contains('expanded')) {
    scroll.classList.remove('expanded');
    btn.textContent = 'View More';
    scroll.scrollTop = 0;
  } else {
    scroll.classList.add('expanded');
    btn.textContent = 'View Less';
  }
}