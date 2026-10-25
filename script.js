(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');

  // Keep the footer year current without requiring a server.
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  // Mobile navigation: the button reports its open state to assistive technology.
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('#site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      siteNav.classList.toggle('is-open', !isOpen);
    });
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        siteNav.classList.remove('is-open');
      });
    });
  }

  // Theme preference can be changed by the visitor. Storage is optional.
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');
  let savedTheme = '';
  try { savedTheme = localStorage.getItem('listen23-theme') || ''; } catch (error) { savedTheme = ''; }
  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.dataset.theme = savedTheme === 'light' ? 'light' : 'dark';
  }
  const refreshThemeButton = () => {
    const lightIsOn = document.documentElement.dataset.theme === 'light';
    themeButtons.forEach((button) => button.setAttribute('aria-pressed', String(lightIsOn)));
    if (themeLabel) themeLabel.textContent = lightIsOn ? 'Dark mode' : 'Light mode';
  };
  refreshThemeButton();
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const newTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      if (newTheme === 'dark') delete document.documentElement.dataset.theme;
      else document.documentElement.dataset.theme = 'light';
      try { localStorage.setItem('listen23-theme', newTheme); } catch (error) { /* Theme still works without storage. */ }
      refreshThemeButton();
    });
  });

  // Manual artwork carousel. It never advances automatically.
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-to]'));
    const status = carousel.querySelector('[data-carousel-status]');
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    const names = ['IG MODEL', 'Queen St', 'The Highest featuring Stopthis', 'Visual Archive'];
    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === activeIndex;
        slide.hidden = !active;
        slide.classList.toggle('is-active', active);
      });
      dots.forEach((dot, dotIndex) => dot.setAttribute('aria-pressed', String(dotIndex === activeIndex)));
      if (status) status.textContent = `Artwork ${activeIndex + 1} of ${slides.length}: ${names[activeIndex]}.`;
    };
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if (prev) prev.addEventListener('click', () => showSlide(activeIndex - 1));
    if (next) next.addEventListener('click', () => showSlide(activeIndex + 1));
    dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.carouselTo))));
    showSlide(activeIndex);
  });

  // Archive search and filter run together so users can quickly find a title.
  const archiveGrid = document.querySelector('[data-archive-grid]');
  if (archiveGrid) {
    const cards = Array.from(archiveGrid.querySelectorAll('[data-archive-card]'));
    const search = document.querySelector('#track-search');
    const clearButton = document.querySelector('[data-clear-search]');
    const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
    const resultsCount = document.querySelector('[data-results-count]');
    const emptyState = document.querySelector('[data-empty-state]');
    const resetButton = document.querySelector('[data-reset-archive]');
    let activeFilter = 'all';

    const applyFilters = () => {
      const query = (search ? search.value : '').trim().toLowerCase();
      let visibleCount = 0;
      cards.forEach((card) => {
        const kindMatches = activeFilter === 'all' || card.dataset.kind === activeFilter;
        const textMatches = !query || card.textContent.toLowerCase().includes(query) || (card.querySelector('img')?.alt || '').toLowerCase().includes(query);
        const visible = kindMatches && textMatches;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (resultsCount) resultsCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'item' : 'items'}`;
      if (emptyState) emptyState.hidden = visibleCount > 0;
      if (clearButton) clearButton.hidden = !query;
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach((item) => {
          const selected = item === button;
          item.classList.toggle('is-selected', selected);
          item.setAttribute('aria-pressed', String(selected));
        });
        applyFilters();
      });
    });
    if (search) search.addEventListener('input', applyFilters);
    if (clearButton) clearButton.addEventListener('click', () => { search.value = ''; search.focus(); applyFilters(); });
    const resetArchive = () => {
      activeFilter = 'all';
      if (search) search.value = '';
      filterButtons.forEach((button) => {
        const selected = button.dataset.filter === 'all';
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      applyFilters();
    };
    if (resetButton) resetButton.addEventListener('click', resetArchive);
    applyFilters();
  }
})();
