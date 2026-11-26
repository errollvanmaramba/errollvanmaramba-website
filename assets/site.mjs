import { matchRole } from './role-match.mjs';

const menuToggle = document.querySelector('#menu-toggle');
const siteNav = document.querySelector('#site-nav');

function setMenuOpen(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'Close' : 'Menu';
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') === 'false');
});
siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
menuToggle.hidden = false;

const roleControls = document.querySelector('#role-controls');
const focusButtons = [...roleControls.querySelectorAll('button[aria-pressed]')];
const searchForm = document.querySelector('#role-search-form');
const description = document.querySelector('#role-description');
const roleStatus = document.querySelector('#role-status');
const evidence = [...document.querySelectorAll('[data-topic]')];

function showEvidence(ids, matches = new Map()) {
  for (const card of evidence) {
    const id = card.dataset.topic;
    const matchNote = card.querySelector('.matched-terms');
    const terms = matches.get(id) ?? [];

    card.hidden = !ids.includes(id);
    matchNote.hidden = terms.length === 0;
    matchNote.textContent = terms.length ? `Matched terms · ${terms.join(', ')}` : '';
  }
}

function selectFocus(button) {
  for (const filter of focusButtons) {
    filter.setAttribute('aria-pressed', String(filter === button));
  }

  const all = button.value === 'all';
  showEvidence(all ? evidence.map((card) => card.dataset.topic) : [button.value]);
  roleStatus.textContent = all ? 'Showing all focus areas.' : `Showing ${button.textContent} experience.`;
}

for (const button of focusButtons) {
  button.addEventListener('click', () => selectFocus(button));
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = description.value.trim();

  if (!query) {
    description.setCustomValidity('Enter a job description or a skill.');
    description.reportValidity();
    return;
  }

  const matches = new Map(matchRole(query).map(({ id, terms }) => [id, terms]));
  for (const button of focusButtons) {
    button.setAttribute('aria-pressed', 'false');
  }
  showEvidence([...matches.keys()], matches);

  if (matches.size === 0) {
    roleStatus.textContent = 'No matching terms found. Try a skill such as Shopify or browse by focus.';
  } else {
    const areas = matches.size === 1 ? 'focus area' : 'focus areas';
    roleStatus.textContent = `${matches.size} related ${areas} found.`;
  }
});

description.addEventListener('input', () => description.setCustomValidity(''));
searchForm.addEventListener('reset', () => {
  description.setCustomValidity('');
  selectFocus(focusButtons[0]);
});
roleControls.hidden = false;
