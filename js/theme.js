/* ============================================================
   PORTFOLIO — BRAHIM ZAKARIA BRAHIM
   theme.js — Dark / Light Mode Management
   Runs immediately (no defer) to prevent flash of wrong theme
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. CONSTANTS
  ---------------------------------------------------------- */
  const STORAGE_KEY = 'bzb-theme';
  const DARK        = 'dark';
  const LIGHT       = 'light';
  const ROOT        = document.documentElement;

  /* ----------------------------------------------------------
     2. DETECT INITIAL THEME
     Priority: localStorage → system preference → dark (default)
  ---------------------------------------------------------- */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === DARK || saved === LIGHT) return saved;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? DARK : LIGHT;
  }

  /* ----------------------------------------------------------
     3. APPLY THEME TO ROOT
     Sets data-theme attribute immediately to avoid FOUC
  ---------------------------------------------------------- */
  function applyTheme(theme) {
    ROOT.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update meta theme-color for mobile browsers
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === DARK ? '#050A14' : '#F5F7FF');
    }
  }

  /* ----------------------------------------------------------
     4. APPLY IMMEDIATELY — before any paint
  ---------------------------------------------------------- */
  applyTheme(getInitialTheme());

  /* ----------------------------------------------------------
     5. TOGGLE LOGIC — wired after DOM is ready
  ---------------------------------------------------------- */
  function initToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const current = ROOT.getAttribute('data-theme');
      const next    = current === DARK ? LIGHT : DARK;

      // Brief animation class for icon swap
      btn.classList.add('toggling');
      setTimeout(function () { btn.classList.remove('toggling'); }, 400);

      applyTheme(next);

      // Announce change to screen readers
      btn.setAttribute(
        'aria-label',
        next === DARK ? 'Passer en mode clair' : 'Passer en mode sombre'
      );
    });

    // Set initial aria-label
    const current = ROOT.getAttribute('data-theme');
    btn.setAttribute(
      'aria-label',
      current === DARK ? 'Passer en mode clair' : 'Passer en mode sombre'
    );
  }

  /* ----------------------------------------------------------
     6. SYSTEM PREFERENCE LISTENER
     Sync theme if user changes OS preference while on the page,
     but only if they haven't set a manual preference
  ---------------------------------------------------------- */
  function watchSystemPreference() {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    mq.addEventListener('change', function (e) {
      const manuallySet = localStorage.getItem(STORAGE_KEY);
      // Only follow system if no manual preference was saved in this session
      // (We keep respecting explicit user choices over system changes)
      if (!manuallySet) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
  }

  /* ----------------------------------------------------------
     7. INIT
  ---------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }

  watchSystemPreference();

})();