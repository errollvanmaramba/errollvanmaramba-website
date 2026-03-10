# Erroll Van Maramba — Static HTML/CSS/JS Website

This package is a drag-and-drop static website for GitHub Pages.

## Included pages
- index.html
- about.html
- projects.html
- experience.html
- services.html
- contact.html
- 404.html

## Features
- Multi-page premium personal website
- Black/white retro-corporate visual direction with muted accent
- Dynamic project filtering
- Animated counters
- Expandable experience timeline
- Recommendation slider
- Contact form validation
- Mail app fallback if Formspree is not configured
- GitHub Pages-ready with `.nojekyll`

## How to publish on GitHub Pages without any build tools
1. Upload every file and folder in this package to the root of your GitHub repo.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
4. Save.
5. Wait for GitHub Pages to publish the site.
6. Open:
   - https://errollvanmaramba.github.io/errollvanmaramba-website/

## Make the contact form submit through the website
Open `contact.html`.

Find this line:
```html
<form id="contact-form" class="form-grid" data-endpoint="https://formspree.io/f/YOUR_FORM_ID" novalidate>
```

Replace `YOUR_FORM_ID` with your real Formspree ID.

Example:
```html
<form id="contact-form" class="form-grid" data-endpoint="https://formspree.io/f/abcxyzde" novalidate>
```

If you do not replace it, the form will still work by opening the visitor's email app with a pre-filled message.

## Fast content edits
- Main identity and text data: `assets/js/site-data.js`
- Site styles: `assets/css/styles.css`
- Interaction logic: `assets/js/main.js`

## Notes
- Project visuals are local presentation placeholders. The actual Behance links are already connected in the project data.
- You can replace project images later by editing the `image` paths in `assets/js/site-data.js`.
