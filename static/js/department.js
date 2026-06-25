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
    
    // ─── BREADCRUMB ───
    const breadcrumbEl = document.getElementById("dept-breadcrumb");
    if (breadcrumbEl) breadcrumbEl.textContent = dept.name;

    // ─── TITLE ───
    const titleEl = document.getElementById("dept-title");
    if (titleEl) titleEl.textContent = dept.name.toUpperCase();

    // ─── HERO SLIDER ───
    async function loadHeroSlider() {
      try {
        const res = await fetch(`/api/images?slug=dept_${deptId}_slider&_t=${Date.now()}`);
        const json = await res.json();
        let sliderImages = dept.sliderImages || DATA.defaultSliderImages;
        if (json.data && json.data.length > 0) {
            sliderImages = json.data.map(img => img.url);
        }
        if (typeof initHeroSlider === "function") {
          initHeroSlider("dept-slider", sliderImages);
        }
      } catch(e) {
          if (typeof initHeroSlider === "function") {
             initHeroSlider("dept-slider", dept.sliderImages || DATA.defaultSliderImages);
          }
      }
    }
    loadHeroSlider();

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

      if (S.faculty) {
        html += `<section id="faculty" class="section"><h2>Faculty</h2><div id="faculty-dynamic-container">Loading faculty...</div></section>`;
        
        setTimeout(async () => {
          try {
            const res = await fetch(`/api/faculty?department=${deptId}`);
            const json = await res.json();
            const dbFaculty = json.data || [];
            
            // Fallback to static data if no dynamic data found
            const facultyList = dbFaculty.length > 0 ? dbFaculty : (dept.faculty || []);
            const isDynamic = dbFaculty.length > 0;
            
            if (facultyList.length > 0) {
              const cards = facultyList.map((f, i) => {
                const slug = `dept_${deptId}_faculty_${i + 1}`;
                const photoSrc = isDynamic ? (f.photo_url || '/static/images/director4.jpg') : f.image;
                const name = f.name;
                const role = isDynamic ? f.designation : f.role;
                const phone = isDynamic ? f.contact_no : f.phone;
                const email = f.email;
                
                return `
                <div class="faculty-card">
                  <div class="card-inner">
                    <img class="photo" src="${photoSrc}" data-slug="${isDynamic ? '' : slug}" data-fallback="${photoSrc}" alt="${name}" loading="lazy">
                    <div class="card-body">
                      <h3>${name}</h3><div class="role">${role}</div>
                      <div class="contact">📞 ${phone ? `<a href="tel:${phone}">${phone}</a>` : '-'}<br>✉️ ${email ? `<a href="mailto:${email}">${email}</a>` : '-'}</div>
                    </div>
                  </div>
                </div>`;
              }).join("");
              
              document.getElementById('faculty-dynamic-container').innerHTML = `
                <div class="slider-container">
                  <div class="slider-wrapper">
                    <div class="slider" id="facultySlider">${cards}</div>
                  </div>
                  <div class="arrows">
                    <button class="arrow-btn" id="prevBtn">←</button>
                    <button class="arrow-btn" id="nextBtn">→</button>
                  </div>
                </div>`;
                
              if (window.ImageLoader) window.ImageLoader.updateDOM();
            } else {
              document.getElementById('faculty-dynamic-container').innerHTML = `<p style="padding:20px; color:#666;">No faculty information available at the moment.</p>`;
            }
          } catch(e) {
            console.error('Failed to load faculty:', e);
            document.getElementById('faculty-dynamic-container').innerHTML = '<p>Error loading faculty information.</p>';
          }
        }, 100);
      }

      if (S.laboratory) {
        html += `
          <section id="lab-info" class="section">
            <h2>Lab Information</h2>
            <div id="labs-dynamic-container" class="table-container" style="padding:20px; color:#666;">
              Loading lab information...
            </div>
          </section>`;
          
        setTimeout(async () => {
          try {
            const res = await fetch(`/api/labs?department=${deptId}&_t=${Date.now()}`);
            const json = await res.json();
            const dbLabs = json.data || [];
            
            // Combine legacy data with new dynamically added data
            const legacyLabs = dept.labs || [];
            const combinedLabs = [...dbLabs, ...legacyLabs];
            
            if (combinedLabs.length > 0) {
              const rows = combinedLabs.map((l, i) => `<tr><td>${i+1}</td><td>${l.name}</td><td>${l.equipment}</td></tr>`).join("");
              
              document.getElementById('labs-dynamic-container').outerHTML = `
                <div class="table-container">
                  <div class="table-scroll" data-rows="${combinedLabs.length}" data-limit="5">
                    <table class="data-table">
                      <thead><tr><th>Sr.</th><th>Name of Lab</th><th>Major Equipment</th></tr></thead>
                      <tbody>${rows}</tbody>
                    </table>
                  </div>
                  ${combinedLabs.length > 5 ? '<button class="view-toggle-btn" onclick="toggleTableView(this)">View More</button>' : ''}
                </div>
              `;
              
              if(typeof initViewToggle === 'function') initViewToggle();
            } else {
              document.getElementById('labs-dynamic-container').outerHTML = `<div class="table-container"><p style="padding:20px; color:#666;">No lab information available at the moment.</p></div>`;
            }
          } catch(e) {
            console.error('Failed to load labs:', e);
            document.getElementById('labs-dynamic-container').innerHTML = 'Error loading lab information.';
          }
        }, 100);
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
        html += `<section id="magazines-sec" class="section"><h2>E-Magazines</h2><div id="magazines-dynamic-container" class="magazine-grid">Loading magazines...</div></section>`;
        
        setTimeout(async () => {
          const container = document.getElementById('magazines-dynamic-container');
          if (!container) return;
          try {
            const res = await fetch(`/api/magazines?dept_slug=${deptId}&_t=${Date.now()}`);
            const json = await res.json();
            const mags = json.data || [];
            
            if (mags.length > 0) {
              container.innerHTML = mags.map(m => `
                <div class="magazine-card">
                  <div class="magazine-thumb">
                    ${m.thumbnail_url ? `<img src="${m.thumbnail_url}" alt="${m.name}" loading="lazy">` : '📚'}
                  </div>
                  <div class="magazine-body">
                    <h3 class="magazine-title">${m.name}</h3>
                    <p class="magazine-meta">Department E-Magazine</p>
                    <div class="magazine-actions">
                      <a href="${m.file_url}" target="_blank" class="mag-btn view">View</a>
                      <a href="${m.file_url}" download="${m.name}.pdf" class="mag-btn download">Download</a>
                    </div>
                  </div>
                </div>
              `).join("");
            } else {
              // Fallback if no dynamic magazines are found
              const fallbackMags = (dept.magazines && dept.magazines.length > 0) ? dept.magazines : [
                { title: "Technical", subtitle: "BITS & Bytes – Issue 1", viewUrl: "#" }
              ];
              container.innerHTML = fallbackMags.map(m => `
                <div class="magazine-card">
                  <div class="magazine-thumb">
                    ${m.thumbnail_url ? `<img src="${m.thumbnail_url}" alt="${m.title || m.name}" loading="lazy">` : '📚'}
                  </div>
                  <div class="magazine-body">
                    <h3 class="magazine-title">${m.title || m.name}</h3>
                    <p class="magazine-meta">${m.subtitle || 'Department E-Magazine'}</p>
                    <div class="magazine-actions">
                      <a href="${m.viewUrl || m.file_url}" target="_blank" class="mag-btn view">View</a>
                      <a href="${m.viewUrl || m.file_url}" download class="mag-btn download">Download</a>
                    </div>
                  </div>
                </div>
              `).join("");
            }
          } catch(e) {
            console.error('Failed to load magazines:', e);
            container.innerHTML = '<p>Error loading e-magazines.</p>';
          }
        }, 100);
      }

      html += `<section id="notices" class="section"><h2>Notice Board</h2><div class="table-container"><table class="data-table"><thead><tr><th>Date</th><th>Description</th><th>Download</th></tr></thead><tbody id="deptNoticeBody"><tr><td colspan="3">Loading...</td></tr></tbody></table></div></section>`;
      
      content.innerHTML = html;
      if (window.ImageLoader) window.ImageLoader.updateDOM();
    }

    window.openLabGalleryFromData = function(images, title) {
      if (!window.GlobalLightbox) {
          console.error('GlobalLightbox not loaded');
          return;
      }
      // Map API objects to {url, label} format
      const formatted = images.map(img => ({ url: img.url, label: img.subcategory }));
      window.GlobalLightbox.open(formatted, title);
    };
 
    window.openLabGallery = async function(slug, title) {
      if (!window.GlobalLightbox) return;
      try {
        const res = await fetch(`/api/images?slug=${slug}`);
        const json = await res.json();
        const images = json.data || [];
        if (images.length === 0) {
          alert('No photos available for this card.');
        } else {
          const formatted = images.map(img => ({ url: img.url, label: img.subcategory }));
          window.GlobalLightbox.open(formatted, title);
        }
      } catch (e) { console.error(e); }
    };
 
    window.openFullImage = function(url) { 
        if (window.GlobalLightbox) window.GlobalLightbox.open([{url: url}], 'Full Image');
        else window.open(url, '_blank');
    };
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
      noticeBody.innerHTML = notices.length === 0 ? "<tr><td colspan='3'>No notices found.</td></tr>" : notices.map(n => `<tr><td>${new Date(n.published_at || n.date).toLocaleDateString("en-GB")}</td><td>${n.title}</td><td>${n.file_url ? `<a href="${n.file_url}" download class="dept-pdf-btn"><i class="fas fa-file-pdf"></i> PDF</a>` : '-'}</td></tr>`).join("");
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