import assert from 'node:assert/strict';
import test from 'node:test';
import { matchRole } from '../assets/role-match.mjs';

const topicsFor = (description) => matchRole(description).map(({ id }) => id);

test('finds the experience behind multiple skills in a job description', () => {
  assert.deepEqual(
    topicsFor('We need a Marketing Designer with Shopify and on-page SEO experience.'),
    ['campaigns', 'commerce', 'content'],
  );
});

test('recognizes mixed case, punctuation and flexible phrase spacing', () => {
  const matches = matchRole('A UX/UI role with FIGMA and short‑form\nvideo editing.');
  assert.deepEqual(matches.map(({ id }) => id), ['ux', 'production']);
  assert.ok(matches[0].terms.includes('Figma'));
});

test('recognizes common plural names for project deliverables', () => {
  assert.deepEqual(
    topicsFor('We need a product designer to create landing pages, storefronts, and social ads.'),
    ['campaigns', 'commerce', 'ux'],
  );
});

test('recognizes video editing roles and plural deliverables', () => {
  assert.deepEqual(topicsFor('Video editor wanted for our content team.'), ['production']);
  assert.deepEqual(topicsFor('Produce short-form videos for launches.'), ['production']);
});

test('does not match fragments inside longer words', () => {
  assert.deepEqual(topicsFor('Repair paint sprayers and maintain a paid training program.'), []);
});

test('does not return evidence for empty or unrelated input', () => {
  assert.deepEqual(topicsFor('  \n  '), []);
  assert.deepEqual(topicsFor('Senior accountant responsible for payroll and tax filings.'), []);
});
