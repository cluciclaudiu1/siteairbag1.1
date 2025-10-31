// ===== Elemente =====
const header = document.querySelector("header");
const intro = document.querySelector(".intro");
const contact = document.getElementById("contact");

// ===== Funcții pentru blocarea / deblocarea scroll-ului =====
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

// ===== Forțăm scroll sus imediat =====
window.scrollTo(0, 0);
disableScroll(); // blocăm scroll la start

// ===== Load page =====
window.addEventListener("load", () => {
  if (!localStorage.getItem("introShown")) {
    intro.classList.remove("hidden"); // intro vizibil

    // Ascunde intro după 2 secunde cu fade
    setTimeout(() => {
      intro.classList.add("hidden");   // fade-out intro
      header.classList.add("visible"); // arată header-ul
      enableScroll();                  // deblocăm scroll
      localStorage.setItem("introShown", "true");
    }, 2000);

  } else {
    // Intro deja vizualizat → ascunde instant și activează scroll
    intro.classList.add("hidden");
    header.classList.add("visible");
    enableScroll();
  }
});

// ===== Header apare la scroll doar dacă nu e deja vizibil =====
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
});

// ===== Hover pe contact =====
if (contact) {
  contact.style.transition = 'background-color 0.7s ease';
  contact.addEventListener('mouseenter', () => contact.style.backgroundColor = '#A23B12');
  contact.addEventListener('mouseleave', () => contact.style.backgroundColor = '#6F1A07');
}

// Selectăm toate SVG-urile relevante
const svgs = document.querySelectorAll('.services svg, .dif svg, .despre svg, .func svg');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');  // fade-in
    } else {
      entry.target.classList.remove('visible'); // fade-out când iese din viewport
    }
  });
}, { threshold: 0.1 }); // 10% vizibil pentru a declanșa animația

// Aplicăm observerul fiecărui SVG
svgs.forEach(svg => observer.observe(svg));

const track = document.querySelector('.slider-track');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = Math.floor(slides.length / 2); // start cu imaginea din mijloc

function updateSlides() {
  const trackWidth = track.parentElement.offsetWidth;
  const slideStyle = getComputedStyle(slides[0]);
  const slideWidth = slides[0].offsetWidth + parseFloat(slideStyle.marginLeft) + parseFloat(slideStyle.marginRight);

  // centrăm imaginea activă
  const offset = -(currentIndex * slideWidth) + trackWidth / 2 - slideWidth / 2;
  track.style.transform = `translateX(${offset}px)`;

  slides.forEach((slide, i) => {
    slide.classList.remove('prev', 'active', 'next', 'hidden');

    if(i === currentIndex) slide.classList.add('active');
    else if(i === currentIndex - 1 || (currentIndex === 0 && i === slides.length - 1)) slide.classList.add('prev');
    else if(i === currentIndex + 1 || (currentIndex === slides.length - 1 && i === 0)) slide.classList.add('next');
    else slide.classList.add('hidden');
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlides();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// --- Touch swipe ---
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (e) => {
  if(!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  // optional: poți muta track-ul puțin în timp ce tragi
  // track.style.transform = `translateX(calc(${offset}px + ${diff}px))`;
});

track.addEventListener('touchend', (e) => {
  if(!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if(diff > 50) { // swipe la dreapta
    prevSlide();
  } else if(diff < -50) { // swipe la stânga
    nextSlide();
  }
  isDragging = false;
});

// inițializare
updateSlides();




