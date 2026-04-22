const docEl = document.documentElement;
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');
const themeBtns = document.querySelectorAll('.btn-theme');
const themeIcons = document.querySelectorAll('.theme-icon');
const mobileLinks = document.querySelectorAll('.nav-mobile a');
const allNavLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
const revealElements = document.querySelectorAll('.reveal');
const skillBars = document.querySelectorAll('.skill-fill');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const cursor = document.querySelector('.cursor');
const contactForm = document.getElementById('contact-form');
const formMsgEl = document.getElementById('form-message');

// Configuration & State
const savedTheme = localStorage.getItem('theme') || 'dark';
const currentPath = window.location.pathname.split('/').pop() || 'index.html';


/* THEME */
function initTheme() {
  docEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = docEl.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  docEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  themeIcons.forEach(icon => {
    icon.className = theme === 'dark'
      ? 'fa-solid fa-sun theme-icon'
      : 'fa-solid fa-moon theme-icon';
  });
}

/* NAVIGATION */
function markActiveLink() {
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop() || 'index.html';
    if (linkPage === currentPath || (currentPath === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function closeMobileMenu() {
  if (navMobile) {
    navMobile.classList.remove('open');
    const icon = hamburger.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-bars';
  }
}


/*  ANIMATIONS */
function initReveal() {
  if (!revealElements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

function initSkillBars() {
  if (!skillBars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* FORMS */
async function handleFormSubmit(e) {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit');
  const originalText = btn.innerHTML;

  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      contactForm.reset();
      formMsgEl.className = 'form-message success';
      formMsgEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent!';
    } else {
      throw new Error();
    }
  } catch (_) {
    formMsgEl.className = 'form-message error';
    formMsgEl.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Error. Email me directly.';
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
    formMsgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { formMsgEl.className = 'form-message'; }, 6000);
  }
}

// Theme & Links
initTheme();
markActiveLink();
initReveal();
initSkillBars();

// Theme Listeners
themeBtns.forEach(btn => btn.addEventListener('click', toggleTheme));

// Scroll Listener
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile Nav Listeners
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('open');
    navMobile.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    if (icon) icon.className = isOpen ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('click', e => {
    if (!navMobile.contains(e.target) && !hamburger.contains(e.target)) closeMobileMenu();
  });
}

// Project Filter Listeners
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      const matches = filter === 'all' || tags.toLowerCase().includes(filter.toLowerCase());
      card.setAttribute('data-hidden', matches ? 'false' : 'true');
      card.style.display = matches ? '' : 'none';
    });
  });
});

// Form Listener
if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);