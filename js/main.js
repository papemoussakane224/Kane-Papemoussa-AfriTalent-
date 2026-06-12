/* ============================================
   ANNÉE DYNAMIQUE FOOTER
   ============================================ */
const currentYear = document.getElementById('currentYear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* ============================================
   NAVBAR DYNAMIQUE AU SCROLL
   ============================================ */
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNavbar');
  
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

/* ============================================
   BOUTON RETOUR EN HAUT
   ============================================ */
const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.innerHTML = '↑';
backToTop.title = 'Retour en haut';
document.body.appendChild(backToTop);

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ============================================
   DARK MODE / LIGHT MODE
   ============================================ */
const darkModeToggle = document.getElementById('darkModeToggle');

const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde === 'dark') {
  document.body.classList.add('dark-mode');
  if (darkModeToggle) {
    darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
    }
  });
}

/* ============================================
   FILTRAGE DES FREELANCES
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const freelanceCards = document.querySelectorAll('.freelance-card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'btn-success');
        b.classList.add('btn-outline-success');
      });
      btn.classList.add('active', 'btn-success');
      btn.classList.remove('btn-outline-success');

      const filtre = btn.getAttribute('data-filter');
      freelanceCards.forEach(card => {
        if (filtre === 'tous' || card.getAttribute('data-categorie') === filtre) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
/* ============================================
   COMPTEURS ANIMÉS AU SCROLL
   ============================================ */
const counters = document.querySelectorAll('.counter');

if (counters.length > 0) {
  const observerCounter = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(function() {
          current += step;
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }
        }, 16);

        // Ne plus observer après animation
        observerCounter.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    observerCounter.observe(counter);
  });
}

/* ============================================
   ANIMATIONS FADE-IN AU SCROLL
   ============================================ */
const sections = document.querySelectorAll('section');

if (sections.length > 0) {
  const observerFade = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerFade.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observerFade.observe(section);
  });
}