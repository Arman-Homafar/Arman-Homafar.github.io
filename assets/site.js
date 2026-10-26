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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const revealGroups = [
    ['.section-heading', ''],
    ['.research-topic', ''],
    ['.subsection-heading', ''],
    ['.project', ''],
    ['.publication-toolbar', ''],
    ['.publication', ''],
    ['.in-preparation', ''],
    ['.education-column', 'reveal-left'],
    ['.experience-column', 'reveal-right'],
    ['.toolkit-grid > div', ''],
    ['.contact-heading', 'reveal-left'],
    ['.contact-copy', 'reveal-right']
  ];
  const revealed = [];
  revealGroups.forEach(([selector, direction]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add('reveal');
      if (direction) element.classList.add(direction);
      element.style.setProperty('--delay', `${Math.min(index % 4, 3) * 90}ms`);
      revealed.push(element);
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealed.forEach((element) => revealObserver.observe(element));
}

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.project').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (!card.classList.contains('is-visible')) return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(900px) translateY(-7px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

const header = document.querySelector('.site-header');
if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}
