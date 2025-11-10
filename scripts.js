// ===== Selectori siguri (nu aruncă erori dacă lipsesc) =====
const headerEl = document.querySelector('.site-header') || document.querySelector('header');
const contactBtn = document.querySelector('.contact-btn') || document.getElementById('contact');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

// ===== Header: efect la scroll (fără variabile nedefinite) =====
window.addEventListener('scroll', () => {
  if (!headerEl) return;
  if (window.scrollY > 50) headerEl.classList.add('scrolled');
  else headerEl.classList.remove('scrolled');
});

// ===== Hover pe contact (protejăm dacă nu există) =====
if (contactBtn) {
  contactBtn.style.transition = 'background-color 0.7s ease';
  contactBtn.addEventListener('mouseenter', () => contactBtn.style.backgroundColor = '#A23B12');
  contactBtn.addEventListener('mouseleave', () => contactBtn.style.backgroundColor = '');
}

// ===== Burger menu (toggle + închidere la click pe link) =====
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.classList.remove('open');
    });
  });
}


// Hero fade-in la încărcare
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  heroContent.style.opacity = '1';
});

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollPos = window.scrollY;
  hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
});

// Fade-in la apariția în viewport
const fadeEls = document.querySelectorAll('.fade-in');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
fadeEls.forEach(el => obs.observe(el));

// ===== Animare apariție carduri proces =====
const flowCards = document.querySelectorAll('.flow-card');

const flowObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.2 });

flowCards.forEach(el => flowObserver.observe(el));

// ===== Animare apariție secțiune "Despre noi" =====
const aboutText = document.querySelector('.about-text');
const highlights = document.querySelectorAll('.highlight');
const stats = document.querySelectorAll('.stat');

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutText?.classList.add('visible');
      highlights.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
      });
      stats.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 200);
      });
    }
  });
}, { threshold: 0.2 });

if (aboutText) aboutObserver.observe(aboutText);

// ===== GALERIE SLIDER CURAT =====
const track = document.querySelector('.slider-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.querySelector('.arrow.prev');
const nextBtn = document.querySelector('.arrow.next');
const dotsContainer = document.querySelector('.dots');

let index = 0;
let slidesToShow = 3;

// ===== Actualizare dinamică pe device =====
function updateSlidesToShow() {
  if (window.innerWidth < 768) slidesToShow = 1;
  else if (window.innerWidth < 1024) slidesToShow = 2;
  else slidesToShow = 3;
}
updateSlidesToShow();
window.addEventListener('resize', updateSlidesToShow);

// ===== Creare puncte (dots) =====
const totalSlides = Math.ceil(slides.length / slidesToShow);
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('button');

// ===== Navigare =====
function goToSlide(i) {
  index = (i + totalSlides) % totalSlides;
  const offset = index * (100 / slidesToShow);
  track.style.transform = `translateX(-${offset}%)`;
  dots.forEach((d, j) => d.classList.toggle('active', j === index));
}

// ===== Săgeți =====
nextBtn.addEventListener('click', () => goToSlide(index + 1));
prevBtn.addEventListener('click', () => goToSlide(index - 1));

// ===== Swipe touch =====
let startX = 0;
let endX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchmove', e => endX = e.touches[0].clientX);
track.addEventListener('touchend', () => {
  if (startX - endX > 50) goToSlide(index + 1);
  if (endX - startX > 50) goToSlide(index - 1);
});

// ===== Auto-slide opțional =====
setInterval(() => goToSlide(index + 1), 9000);
