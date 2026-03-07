diff --git a/script.js b/script.js
index b0b563a8c21fd948a2ef20370a962a9e27c32876..7dd35cc0f2232f3fb2010bcaf10c15deef296613 100644
--- a/script.js
+++ b/script.js
@@ -1,94 +1,82 @@
-/*
- * Simple JavaScript for the personal portfolio site.
- *
- * Handles the mobile navigation toggle and provides basic contact form
- * interactivity. It validates the contact form fields before allowing
- * submission to FormSubmit, which will forward the message to the
- * configured email address.
- */
-
 document.addEventListener('DOMContentLoaded', () => {
   const navToggle = document.getElementById('nav-toggle');
   const navigation = document.getElementById('navigation');
-  const themeToggle = document.getElementById('theme-toggle');
+  const contactForm = document.getElementById('contact-form');
+  const formStatus = document.getElementById('form-status');
 
-  // Toggle the navigation menu on small screens
-  navToggle.addEventListener('click', () => {
-    navigation.classList.toggle('open');
-    navToggle.classList.toggle('active');
-  });
+  if (navToggle && navigation) {
+    navToggle.addEventListener('click', () => {
+      const isOpen = navigation.classList.toggle('open');
+      navToggle.classList.toggle('active', isOpen);
+      navToggle.setAttribute('aria-expanded', String(isOpen));
+    });
+  }
 
-  // Close the navigation when a link is clicked (mobile UX)
   document.querySelectorAll('.navigation a').forEach(link => {
     link.addEventListener('click', () => {
-      if (navigation.classList.contains('open')) {
+      if (navigation && navToggle && navigation.classList.contains('open')) {
         navigation.classList.remove('open');
         navToggle.classList.remove('active');
+        navToggle.setAttribute('aria-expanded', 'false');
       }
     });
   });
 
-  // Theme switching between light and dark modes
-  themeToggle.addEventListener('click', () => {
-    document.body.classList.toggle('dark-mode');
-    const iconSpan = document.getElementById('theme-icon');
-    // Switch between moon and sun emojis
-    if (document.body.classList.contains('dark-mode')) {
-      iconSpan.textContent = '☀️';
-    } else {
-      iconSpan.textContent = '🌙';
-    }
-  });
-
-  // Scroll-based reveal animations using IntersectionObserver
   const revealElements = document.querySelectorAll('.reveal');
-  const observerOptions = {
-    threshold: 0.1
-  };
   const revealObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('visible');
         revealObserver.unobserve(entry.target);
       }
     });
-  }, observerOptions);
+  }, { threshold: 0.1 });
+
   revealElements.forEach(el => revealObserver.observe(el));
 
-  // Highlight navigation links based on scroll position
   const sectionElements = document.querySelectorAll('main section');
   const navLinks = document.querySelectorAll('.navigation a');
+
   const setActiveNav = () => {
     let index = sectionElements.length;
     while (index-- > 0) {
       const section = sectionElements[index];
-      const rect = section.getBoundingClientRect();
-      if (rect.top <= window.innerHeight * 0.25) {
+      if (section.getBoundingClientRect().top <= window.innerHeight * 0.25) {
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
-  window.addEventListener('scroll', setActiveNav);
-  setActiveNav();
 
-  // Contact form handling: validate required fields and allow normal submission to FormSubmit
-  const contactForm = document.getElementById('contact-form');
-  contactForm.addEventListener('submit', (e) => {
-    const name = document.getElementById('form-name').value.trim();
-    const email = document.getElementById('form-email').value.trim();
-    const message = document.getElementById('form-message').value.trim();
-    // If any field is empty, prevent submission and notify the user
-    if (!name || !email || !message) {
-      e.preventDefault();
-      alert('Please complete all fields before sending your message.');
-      return;
-    }
-    // If all fields are filled, the form will submit to the configured action (FormSubmit)
-  });
-});
\ No newline at end of file
+  if (sectionElements.length && navLinks.length) {
+    window.addEventListener('scroll', setActiveNav);
+    setActiveNav();
+  }
+
+  if (contactForm) {
+    contactForm.addEventListener('submit', (e) => {
+      const name = document.getElementById('form-name')?.value.trim() || '';
+      const email = document.getElementById('form-email')?.value.trim() || '';
+      const message = document.getElementById('form-message')?.value.trim() || '';
+
+      if (!name || !email || !message) {
+        e.preventDefault();
+        if (formStatus) {
+          formStatus.textContent = 'Please complete all fields before sending your message.';
+          formStatus.classList.add('error');
+        }
+        return;
+      }
+
+      if (formStatus) {
+        formStatus.textContent = '';
+        formStatus.classList.remove('error');
+      }
+    });
+  }
+});
