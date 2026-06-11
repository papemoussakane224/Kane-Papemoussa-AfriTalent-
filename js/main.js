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