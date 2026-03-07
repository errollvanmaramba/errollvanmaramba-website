// JavaScript functionality for the personal portfolio site.
//
// This script handles the responsive navigation toggle, scroll‑based
// reveal animations, active state highlighting for navigation links,
// and basic client‑side validation for the contact form. The code is
// wrapped in a DOMContentLoaded listener to ensure that the DOM
// elements are available before event listeners are attached.

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navigation = document.getElementById('navigation');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Toggle navigation on small screens. Update the aria-expanded
  // attribute to reflect the current state for screen readers.
  if (navToggle && navigation) {
    navToggle.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close the mobile navigation when a navigation link is clicked.
  document.querySelectorAll('.navigation a').forEach(link => {
    link.addEventListener('click', () => {
      if (navigation && navToggle && navigation.classList.contains('open')) {
        navigation.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Set up a reveal effect for elements with the `.reveal` class when
  // they enter the viewport. Once an element has become visible it is
  // unobserved so the callback isn’t triggered again for that element.
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // Highlight the navigation link corresponding to the section that is
  // currently near the top of the viewport. The active state is
  // recalculated on scroll and set initially when the page loads.
  const sectionElements = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.navigation a');

  const setActiveNav = () => {
    let index = sectionElements.length;
    while (index-- > 0) {
      const section = sectionElements[index];
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.25) {
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

  if (sectionElements.length && navLinks.length) {
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
  }

  // Validate the contact form on submit. If any required field is
  // missing, prevent form submission and display an inline status
  // message. Otherwise clear any previous error messages. Note: the
  // form’s action attribute points to FormSubmit which handles
  // delivering messages to the configured email address.
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      const name = document.getElementById('form-name')?.value.trim() || '';
      const email = document.getElementById('form-email')?.value.trim() || '';
      const message = document.getElementById('form-message')?.value.trim() || '';

      if (!name || !email || !message) {
        e.preventDefault();
        if (formStatus) {
          formStatus.textContent = 'Please complete all fields before sending your message.';
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