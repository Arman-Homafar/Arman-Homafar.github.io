'use strict';

// All content and downloads remain available without JavaScript.
const filters = document.querySelector('.publication-filters');
const publications = [...document.querySelectorAll('.publication')];
const count = document.querySelector('.publication-count');

if (filters && count) {
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    const selected = button.dataset.filter;
    filters.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    let visible = 0;
    publications.forEach((paper) => {
      paper.hidden = selected !== 'all' && paper.dataset.category !== selected;
      if (!paper.hidden) visible += 1;
    });
    count.textContent = selected === 'all'
      ? `${visible} journal articles`
      : `${visible} of ${publications.length} journal articles`;
  });
}

if (navigator.clipboard && window.isSecureContext) {
  document.querySelectorAll('.copy-citation').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const citation = document.getElementById(button.dataset.copy);
      const status = document.getElementById('copy-status');
      try {
        await navigator.clipboard.writeText(citation.textContent);
        button.textContent = 'Copied';
        status.textContent = 'BibTeX citation copied to clipboard.';
        setTimeout(() => { button.textContent = 'Copy citation'; }, 2000);
      } catch {
        button.textContent = 'Select citation to copy';
        const range = document.createRange();
        range.selectNodeContents(citation);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Citation selected. Use your browser’s copy command.';
      }
    });
  });
}

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main > section').forEach((section) => observer.observe(section));
}
