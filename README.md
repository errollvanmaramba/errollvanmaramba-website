# Erroll Van Maramba — Phase 1 Website Scaffold

Phase 1 includes:

- Astro + TypeScript setup
- GitHub Pages-ready static architecture
- design tokens and global styles
- base layout
- header and footer
- Home page skeleton
- placeholder inner pages
- content model starter
- generated project data starter
- GitHub Actions deployment workflow

## Local setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment variables

Copy `.env.example` to `.env` and update:

- `SITE_URL` — your production site URL
- `BASE_PATH` — `/` for a custom domain or `/<repo-name>/` for a project site
- `PUBLIC_FORMSPREE_ENDPOINT` — your Formspree endpoint

## GitHub Pages notes

Use one of these patterns:

- **Custom domain / user site**
  - `SITE_URL=https://your-domain.com`
  - `BASE_PATH=/`

- **Project site**
  - `SITE_URL=https://yourusername.github.io`
  - `BASE_PATH=/your-repo-name/`

## Content to edit first

- `src/content/site.ts`
- `src/content/services.ts`
- `src/content/experience.ts`
- `src/content/testimonials.ts`
- `scripts/generate-projects.ts`

## Phase 2

Next implementation phase should add:

- live Formspree success/error handling
- animated counters
- testimonial slider
- project filtering
- stronger project detail pages
- improved about/experience copy
- SEO schema refinements
