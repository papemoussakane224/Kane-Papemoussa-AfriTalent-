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
/* ============================================
   VALIDATION FORMULAIRE DE CONTACT
   ============================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    let valide = true;

    // Vérifier Nom
    if (nom.value.trim() === '') {
      nom.classList.add('is-invalid');
      nom.classList.remove('is-valid');
      valide = false;
    } else {
      nom.classList.add('is-valid');
      nom.classList.remove('is-invalid');
    }

    // Vérifier Prénom
    if (prenom.value.trim() === '') {
      prenom.classList.add('is-invalid');
      prenom.classList.remove('is-valid');
      valide = false;
    } else {
      prenom.classList.add('is-valid');
      prenom.classList.remove('is-invalid');
    }

    // Vérifier Email avec regex
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      email.classList.add('is-invalid');
      email.classList.remove('is-valid');
      valide = false;
    } else {
      email.classList.add('is-valid');
      email.classList.remove('is-invalid');
    }

    // Vérifier Sujet
    if (sujet.value === '') {
      sujet.classList.add('is-invalid');
      sujet.classList.remove('is-valid');
      valide = false;
    } else {
      sujet.classList.add('is-valid');
      sujet.classList.remove('is-invalid');
    }

    // Vérifier Message — minimum 20 caractères
    if (message.value.trim().length < 20) {
      message.classList.add('is-invalid');
      message.classList.remove('is-valid');
      valide = false;
    } else {
      message.classList.add('is-valid');
      message.classList.remove('is-invalid');
    }

    // Si tout est valide — afficher message de succès
    if (valide) {
      contactForm.reset();
      // Enlever les bordures vertes après reset
      [nom, prenom, email, sujet, message].forEach(field => {
        field.classList.remove('is-valid');
      });
      successMessage.style.display = 'block';

      // Cacher le message après 5 secondes
      setTimeout(function() {
        successMessage.style.display = 'none';
      }, 5000);
    }
  });
} 