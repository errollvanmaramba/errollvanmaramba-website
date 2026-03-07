document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navigation = document.getElementById('navigation');
  const navLinks = document.querySelectorAll('.navigation a');
  const sections = document.querySelectorAll('main section[id]');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (navToggle && navigation) {
    navToggle.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navigation && navToggle && navigation.classList.contains('open')) {
        navigation.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const setActiveNav = () => {
    let currentId = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  if (sections.length && navLinks.length) {
    setActiveNav();
    window.addEventListener('scroll', setActiveNav, { passive: true });
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      const name = document.getElementById('form-name')?.value.trim() || '';
      const email = document.getElementById('form-email')?.value.trim() || '';
      const message = document.getElementById('form-message')?.value.trim() || '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        event.preventDefault();
        if (formStatus) {
          formStatus.textContent = 'Please complete all fields before sending your message.';
          formStatus.classList.add('error');
        }
        return;
      }

      if (!emailPattern.test(email)) {
        event.preventDefault();
        if (formStatus) {
          formStatus.textContent = 'Please enter a valid email address.';
          formStatus.classList.add('error');
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = '';
        formStatus.classList.remove('error');
      }
    });
  }
});
