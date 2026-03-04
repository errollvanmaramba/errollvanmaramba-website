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