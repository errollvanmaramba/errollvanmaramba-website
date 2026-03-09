import type { APIRoute } from 'astro';
import { getCaseStudies } from '../lib/content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const baseUrl = 'https://errollvanmaramba.github.io/errollvanmaramba-website';
  const staticPages = ['/', '/about/', '/experience/', '/contact/', '/work/'];
  const caseStudyPages = getCaseStudies().map((item) => `/work/${item.slug}/`);
  const urls = [...staticPages, ...caseStudyPages];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((path) => `  <url><loc>${baseUrl}${path === '/' ? '/' : path}</loc></url>`)
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};
