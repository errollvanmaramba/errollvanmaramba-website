const topics = {
  campaigns: [
    'marketing designer', 'marketing design', 'graphic designer', 'graphic design', 'campaign',
    'campaigns', 'brand design', 'social media', 'ad creative', 'ads', 'email design',
    'Klaviyo', 'Photoshop', 'Illustrator', 'Canva',
  ],
  commerce: [
    'Shopify', 'WooCommerce', 'e-commerce', 'ecommerce', 'storefront', 'product merchandising',
    'visual merchandising', 'product listing', 'product listings', 'product media',
    'product page', 'product pages', 'catalog', 'catalogue',
  ],
  ux: [
    'UX', 'UI', 'Figma', 'web design', 'website design', 'website redesign', 'interface design',
    'user experience', 'user flow', 'wireframes', 'wireframing', 'prototyping', 'landing page',
  ],
  content: [
    'SEO', 'SEM', 'search engine optimization', 'content writing', 'content marketing',
    'content refresh', 'blog', 'metadata', 'alt text',
  ],
  production: [
    'AI imagery', 'AI-assisted', 'generative AI', 'product imagery', 'lifestyle imagery',
    'compositing', 'retouching', 'short-form video', 'video editing', 'video production',
    'product video', 'product videos', 'CapCut', 'HeyGen', 'Midjourney',
  ],
};

function normalize(text) {
  return text.normalize('NFKC').toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, ' ').trim();
}

export function matchRole(description) {
  const words = ` ${normalize(description)} `;
  const matches = [];

  for (const [id, keywords] of Object.entries(topics)) {
    const terms = keywords.filter((keyword) => words.includes(` ${normalize(keyword)} `));
    if (terms.length) matches.push({ id, terms });
  }

  return matches;
}
