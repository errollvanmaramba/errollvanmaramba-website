import { defineConfig } from 'astro/config';

const production = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://errollvanmaramba.github.io',
  base: production ? '/errollvanmaramba-website' : '/',
  output: 'static',
  build: {
    format: 'directory'
  }
});
