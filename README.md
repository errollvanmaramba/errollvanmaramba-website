# Erroll Van Maramba — Astro portfolio rebuild

This is a static Astro portfolio built for GitHub Pages.

## Stack
- Astro
- TypeScript
- Hand-authored CSS design system
- GitHub Actions deployment to GitHub Pages
- Pages CMS-ready content structure
- Formspree-ready contact form

## Edit before going live
1. Open `src/data/site.json`
2. Replace `formAction` with your real Formspree endpoint
3. If your repository name changes, update `base` in `astro.config.mjs`
4. If you later move to a custom domain, update `site` in `astro.config.mjs`, remove the `base` value, and add `public/CNAME`

## Local development
```bash
npm install
npm run dev
```

## Build locally
```bash
npm run build
npm run preview
```

## Content files
- `src/data/site.json`
- `src/data/case-studies/*.json`
- `src/data/experience/*.json`
- `src/data/services/*.json`
- `src/data/faqs/*.json`
- `src/data/testimonials/*.json`

## Deployment
Push the project to your GitHub repository and enable **GitHub Actions** as the Pages source in **Settings → Pages**.
