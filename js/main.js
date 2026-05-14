/* ============================================================
   PORTFOLIO — BRAHIM ZAKARIA BRAHIM
   main.js — Core Interactions & Animations
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. UTILITY HELPERS
  ---------------------------------------------------------- */

  /**
   * Shorthand querySelector
   * @param {string} selector
   * @param {Element} [context=document]
   */
  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  /**
   * Shorthand querySelectorAll → Array
   * @param {string} selector
   * @param {Element} [context=document]
   */
  function $$(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
  }

  /**
   * Run callback when DOM is fully parsed
   * @param {Function} fn
   */
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* ----------------------------------------------------------
     2. LOADER
     Hides the full-screen loader after assets are ready,
     then triggers hero entrance animations.
  ---------------------------------------------------------- */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;

    // Minimum display time so the animation completes visually
    const MIN_DURATION = 1800;
    const startTime    = Date.now();

    function hideLoader() {
      const elapsed   = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(function () {
        loader.classList.add('hidden');

        // Trigger hero animations after loader fades out
        setTimeout(function () {
          document.body.classList.add('animate-hero');
          initHeroReveal();
        }, 500);
      }, remaining);
    }

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }
  }

  /* ----------------------------------------------------------
     3. CUSTOM CURSOR
     Follows mouse with smooth ring delay effect.
     Disabled on touch devices (handled via CSS).
  ---------------------------------------------------------- */
  function initCursor() {
  const dot = $('#cursor-dot');
  if (!dot) return;

  // Désactivé sur écrans tactiles
  if (!window.matchMedia('(pointer: fine)').matches) return;

  // Le point suit la souris instantanément
  document.addEventListener('mousemove', function (e) {
    dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  });

  // Légèrement agrandi au survol des éléments interactifs
  const hoverTargets = 'a, button, input, textarea, .glass-card';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Disparaît quand la souris quitte la fenêtre
  document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { dot.style.opacity = '1'; });
}

  /* ----------------------------------------------------------
     4. TYPING EFFECT
     Cycles through role titles with a typewriter animation.
  ---------------------------------------------------------- */
  function initTypingEffect() {
    const target = $('#typing-target');
    if (!target) return;

    const phrases = [
      'Développeur Full-Stack',
      'Développeur Django',
      'Intégrateur IA',
      'Backend Developer',
      'Problem Solver',
    ];

    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;
    let timeoutId   = null;

    const TYPING_SPEED   = 80;
    const DELETING_SPEED = 45;
    const PAUSE_AFTER    = 2000;
    const PAUSE_BEFORE   = 400;

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        target.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting  = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeoutId   = setTimeout(type, PAUSE_BEFORE);
          return;
        }

        timeoutId = setTimeout(type, DELETING_SPEED);
      } else {
        charIndex++;
        target.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          isDeleting = true;
          timeoutId  = setTimeout(type, PAUSE_AFTER);
          return;
        }

        timeoutId = setTimeout(type, TYPING_SPEED);
      }
    }

    // Start after loader clears
    timeoutId = setTimeout(type, 2400);
  }

  /* ----------------------------------------------------------
     5. SCROLL REVEAL — IntersectionObserver
     Watches elements with reveal-* classes and adds .visible
     when they enter the viewport.
  ---------------------------------------------------------- */
  function initScrollReveal() {
    const elements = $$('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold:   0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /**
   * Trigger hero section reveal animations immediately
   * (called after loader hides, bypassing IntersectionObserver)
   */
  function initHeroReveal() {
    $$('#hero .reveal-up, #hero .reveal-scale').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------------------------
     6. SKILL BARS ANIMATION
     Triggers width transition when skills section scrolls
     into view.
  ---------------------------------------------------------- */
  function initSkillBars() {
    const bars = $$('.skill-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.classList.add('animated');
            }, 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    bars.forEach(function (bar) {
      observer.observe(bar);
    });
  }

  /* ----------------------------------------------------------
     7. STICKY NAVBAR
     Adds .scrolled class for enhanced shadow on scroll.
  ---------------------------------------------------------- */
  function initNavbar() {
    const navbar = $('#navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     8. MOBILE MENU
     Toggle mobile overlay menu; close on link click.
  ---------------------------------------------------------- */
  function initMobileMenu() {
    const toggle      = $('#menu-toggle');
    const menu        = $('#mobile-menu');
    const mobileLinks = $$('.mobile-link');
    if (!toggle || !menu) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      toggle.classList.add('active');
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      toggle.classList.remove('active');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      isOpen ? closeMenu() : openMenu();
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ----------------------------------------------------------
     9. SMOOTH SCROLL
     Intercepts anchor clicks with offset for fixed navbar.
  ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = $(targetId);
      if (!target) return;

      e.preventDefault();
      const offset    = 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     10. BACK TO TOP BUTTON
  ---------------------------------------------------------- */
  function initBackToTop() {
    const btn = $('#back-to-top');
    if (!btn) return;

    window.addEventListener(
      'scroll',
      function () {
        btn.classList.toggle('visible', window.scrollY > 400);
      },
      { passive: true }
    );

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     11. AVATAR IMAGE FALLBACK
     Shows initials if photo file is missing.
  ---------------------------------------------------------- */
  function initAvatarFallback() {
    const img      = $('#hero-photo');
    const fallback = $('#avatar-fallback');
    if (!img || !fallback) return;

    img.addEventListener('error', function () {
      img.style.display      = 'none';
      fallback.style.display = 'flex';
    });
  }

  /* ----------------------------------------------------------
     12. FOOTER YEAR
  ---------------------------------------------------------- */
  function initFooterYear() {
    const el = $('#footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------
     13. CONTACT FORM
     Client-side validation + mailto fallback.
     FormSubmit.co instructions included in comments.
  ---------------------------------------------------------- */
  function initContactForm() {
    const form      = $('#contact-form');
    const feedback  = $('#form-feedback');
    const submitBtn = $('#form-submit');
    if (!form) return;

    function showError(input, message) {
      input.classList.add('error');
      const errorEl = input.nextElementSibling;
      if (errorEl && errorEl.classList.contains('form-error')) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
    }

    function clearError(input) {
      input.classList.remove('error');
      const errorEl = input.nextElementSibling;
      if (errorEl && errorEl.classList.contains('form-error')) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm(data) {
      let valid = true;

      if (!data.name.trim()) {
        showError($('#form-name'), 'Veuillez entrer votre nom.');
        valid = false;
      }
      if (!validateEmail(data.email)) {
        showError($('#form-email'), 'Veuillez entrer une adresse email valide.');
        valid = false;
      }
      if (!data.message.trim() || data.message.trim().length < 15) {
        showError($('#form-message'), 'Votre message doit contenir au moins 15 caractères.');
        valid = false;
      }

      return valid;
    }

    // Clear errors on input
    $$('.form-input', form).forEach(function (input) {
      input.addEventListener('input', function () { clearError(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      feedback.className   = 'form-feedback';
      feedback.textContent = '';

      const data = {
        name:    $('#form-name').value,
        email:   $('#form-email').value,
        subject: $('#form-subject').value,
        message: $('#form-message').value,
      };

      $$('.form-input', form).forEach(clearError);
      if (!validateForm(data)) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      /*
        ── TO ACTIVATE REAL FORM SUBMISSION ──────────────────
        1. Go to https://formsubmit.co/
        2. Enter your email to activate the endpoint
        3. Replace the mailto block below with this fetch call:

        const formData = new FormData();
        formData.append('name',     data.name);
        formData.append('email',    data.email);
        formData.append('_subject', data.subject || 'Nouveau message — Portfolio');
        formData.append('message',  data.message);
        formData.append('_captcha', 'false');

        fetch('https://formsubmit.co/brahimzakariabrahimbzb@gmail.com', {
          method: 'POST',
          body:   formData,
        })
          .then(function (res) { res.ok ? showSuccess() : showFormError(); })
          .catch(showFormError)
          .finally(function () {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
          });
        ─────────────────────────────────────────────────────
      */

      // Current fallback: open email client
      setTimeout(function () {
        const subject = encodeURIComponent(data.subject || 'Message depuis mon portfolio');
        const body    = encodeURIComponent(
          'Nom : '   + data.name    + '\n' +
          'Email : ' + data.email   + '\n\n' +
          data.message
        );

        window.location.href =
          'mailto:brahimzakariabrahimbzb@gmail.com' +
          '?subject=' + subject +
          '&body='    + body;

        showSuccess();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }, 800);
    });

    function showSuccess() {
      feedback.classList.add('success');
      feedback.textContent = '✓ Message envoyé. Je vous répondrai dans les plus brefs délais.';
      form.reset();
    }

    function showFormError() {
      feedback.classList.add('error-msg');
      feedback.textContent = '✗ Une erreur est survenue. Écrivez-moi directement par email.';
    }
  }

  /* ----------------------------------------------------------
     14. SUBTLE PARALLAX ON ORBS
     Applies only on desktop for performance.
  ---------------------------------------------------------- */
  function initParallax() {
    const orb1 = $('.orb-1');
    const orb2 = $('.orb-2');
    if (!orb1 || !orb2 || window.innerWidth < 768) return;

    window.addEventListener(
      'scroll',
      function () {
        const y = window.scrollY;
        orb1.style.transform = `translate(${y * 0.04}px, ${-y * 0.06}px)`;
        orb2.style.transform = `translate(${-y * 0.03}px, ${y * 0.04}px)`;
      },
      { passive: true }
    );
  }

  /* ----------------------------------------------------------
     15. CARD TILT ON MOUSE MOVE (desktop only)
  ---------------------------------------------------------- */
  function initCardTilt() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cards = $$('.project-card, .service-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect    = card.getBoundingClientRect();
        const x       = e.clientX - rect.left;
        const y       = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
        const rotateY = ((x - rect.width  / 2) / (rect.width  / 2)) *  4;

        card.style.transform =
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------
     16. ACTIVE SECTION HIGHLIGHT (precise, IntersectionObserver)
  ---------------------------------------------------------- */
  function initActiveSectionObserver() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + id
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ----------------------------------------------------------
     17. STAGGER CHILDREN OBSERVER
  ---------------------------------------------------------- */
  function initStaggerObserver() {
    const containers = $$('.stagger-children');
    if (!containers.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    containers.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     18. INITIALISE ALL MODULES
  ---------------------------------------------------------- */
  onReady(function () {
    initLoader();
    initCursor();
    initTypingEffect();
    initScrollReveal();
    initSkillBars();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initBackToTop();
    initAvatarFallback();
    initFooterYear();
    initContactForm();
    initParallax();
    initCardTilt();
    initActiveSectionObserver();
    initStaggerObserver();
  });

})();