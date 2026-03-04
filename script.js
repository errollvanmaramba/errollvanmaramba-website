/*
 * Simple JavaScript for the personal portfolio site.
 *
 * Handles the mobile navigation toggle and provides basic contact form
 * interactivity. It validates the contact form fields before allowing
 * submission to FormSubmit, which will forward the message to the
 * configured email address.
 */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navigation = document.getElementById('navigation');
  const themeToggle = document.getElementById('theme-toggle');

  // Toggle the navigation menu on small screens
  navToggle.addEventListener('click', () => {
    navigation.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close the navigation when a link is clicked (mobile UX)
  document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
      if (navigation.classList.contains('open')) {
        navigation.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  });

  // Theme switching between light and dark modes
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const iconSpan = document.getElementById('theme-icon');
    // Switch between moon and sun emojis
    if (document.body.classList.contains('dark-mode')) {
      iconSpan.textContent = '☀️';
    } else {
      iconSpan.textContent = '🌙';
    }
  });

  // Scroll-based reveal animations using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1
  };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  revealElements.forEach(el => revealObserver.observe(el));

  // Highlight navigation links based on scroll position
  const sectionElements = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.navigation a');
  const setActiveNav = () => {
    let index = sectionElements.length;
    while (index-- > 0) {
      const section = sectionElements[index];
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.25) {
        navLinks.forEach(link => link.classList.remove('active'));
        const id = section.getAttribute('id');
        const activeLink = document.querySelector(`.navigation a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
        break;
      }
    }
  };
  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // Contact form handling: validate required fields and allow normal submission to FormSubmit
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    // If any field is empty, prevent submission and notify the user
    if (!name || !email || !message) {
      e.preventDefault();
      alert('Please complete all fields before sending your message.');
      return;
    }
    // If all fields are filled, the form will submit to the configured action (FormSubmit)
  });
});