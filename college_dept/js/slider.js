
function initHeroSlider(containerId, images) {
  const slider = document.getElementById(containerId);
  if (!slider || !images || images.length === 0) return;

  let slidesHTML = '<div class="slides">';
  let dotsHTML = '<div class="dots">';
  images.forEach((img, i) => {
    slidesHTML += `<img src="${img}" class="slide ${i === 0 ? "active" : ""}" alt="Department Image ${i + 1}">`;
    dotsHTML += `<span class="dot ${i === 0 ? "active" : ""}"></span>`;
  });
  slidesHTML += '</div>';
  dotsHTML += '</div>';
  slider.innerHTML = `<button class="prev" aria-label="Previous">&#10094;</button>${slidesHTML}<button class="next" aria-label="Next">&#10095;</button>${dotsHTML}`;

  let slideIndex = 0;
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".dot");

  function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[n].classList.add("active");
    dots[n].classList.add("active");
  }

  slider.querySelector(".next").onclick = () => { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); };
  slider.querySelector(".prev").onclick = () => { slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); };
  dots.forEach((dot, i) => dot.onclick = () => { slideIndex = i; showSlide(i); });
  setInterval(() => { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); }, 4000);
}

function initLabPhotosSlider(trackId, dotsId, prevId, nextId) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const slides = track.querySelectorAll(".slide");
  const dots = document.querySelectorAll(`#${dotsId} .slider-dot`);
  let idx = 0;

  function go(n) {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  document.getElementById(prevId).addEventListener("click", () => go(idx - 1));
  document.getElementById(nextId).addEventListener("click", () => go(idx + 1));
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
  setInterval(() => go(idx + 1), 5000);
}

function initFacultySlider(sliderId, prevBtnId, nextBtnId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;
  const cards = slider.querySelectorAll(".faculty-card");
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  let idx = 0;

  function update() {
    if (cards.length === 0) return;
    const w = cards[0].offsetWidth + 24;
    slider.style.transform = `translateX(-${idx * w}px)`;
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx >= cards.length - 1;
  }

  prevBtn.addEventListener("click", () => { if (idx > 0) { idx--; update(); } });
  nextBtn.addEventListener("click", () => { if (idx < cards.length - 1) { idx++; update(); } });
  window.addEventListener("resize", update);
  update();
}
