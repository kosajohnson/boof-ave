// core.js — Internal routing handler
(function () {
  const stealthLinks = document.querySelectorAll('.internal-link');

  stealthLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const refId = new URL(link.href).searchParams.get('id');
      const fallbackRoutes = ['/redirect?id=ref01', '/redirect?id=ref02', '/redirect?id=ref03'];
      const randomRef = fallbackRoutes[Math.floor(Math.random() * fallbackRoutes.length)];

      setTimeout(() => {
        window.location.href = refId ? `/redirect?id=${encodeURIComponent(refId)}` : randomRef;
      }, 400 + Math.random() * 1100); // simulate processing time
    });
  });
})();

// Global page transitions
window.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const overlay = document.querySelector('.page-transition');
  if (!body || !overlay) return;

  const transitionId = body.dataset.transition;
  const logo = overlay.querySelector('.page-transition__logo');

  const INTRO_TIMING = {
    stampDelay: 700,
    revealStart: 2500,
    done: 3600
  };

  const runIndexIntro = () => {
    body.classList.add('is-transitioning', 'is-intro');

    window.setTimeout(() => {
      if (logo) logo.classList.add('is-stamped');
    }, INTRO_TIMING.stampDelay);

    window.setTimeout(() => {
      body.classList.remove('is-intro');
      body.classList.add('is-ready');
      if (logo) logo.classList.remove('is-stamped');
    }, INTRO_TIMING.revealStart);

    window.setTimeout(() => {
      body.classList.remove('is-transitioning');
    }, INTRO_TIMING.done);
  };

  const runStandardReveal = () => {
    body.classList.add('is-transitioning', 'is-entering');

    window.setTimeout(() => {
      body.classList.remove('is-entering');
      body.classList.add('is-ready');
    }, 120);

    window.setTimeout(() => {
      body.classList.remove('is-transitioning');
    }, 900);
  };

  if (transitionId === 'index') {
    runIndexIntro();
  } else {
    runStandardReveal();
  }

  const pageLinks = document.querySelectorAll('a[href]');
  pageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (link.target === '_blank' || link.hasAttribute('download')) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const isHtmlPage = destination.pathname.endsWith('.html') || destination.pathname === '/' || destination.pathname.endsWith('/');
      if (!isHtmlPage) return;

      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

      event.preventDefault();
      body.classList.add('is-transitioning', 'is-leaving');

      window.setTimeout(() => {
        window.location.href = destination.href;
      }, 700);
    });
  });
});

// Portfolio slider auto-scroll loop
window.addEventListener('DOMContentLoaded', () => {
  const sliderTrack = document.querySelector('.portfolio__track');
  if (!sliderTrack) return;

  const sliderItems = Array.from(sliderTrack.querySelectorAll('.portfolio__item'));
  if (!sliderItems.length) return;

  const getStepSize = () => {
    const { gap, columnGap } = getComputedStyle(sliderTrack);
    const resolvedGap = parseFloat(columnGap || gap || '0') || 0;
    return sliderItems[0].getBoundingClientRect().width + resolvedGap;
  };

  let currentIndex = 0;

  const scrollToIndex = (index) => {
    const stepSize = getStepSize();
    if (!stepSize) return;
    sliderTrack.scrollTo({ left: stepSize * index, behavior: 'smooth' });
  };

  const scrollToNext = () => {
    currentIndex = (currentIndex + 1) % sliderItems.length;
    scrollToIndex(currentIndex);
  };

  let autoplay = setInterval(scrollToNext, 7000);

  const restartAutoplay = () => {
    const stepSize = getStepSize();
    if (stepSize) {
      currentIndex = Math.round(sliderTrack.scrollLeft / stepSize);
    }
    clearInterval(autoplay);
    autoplay = setInterval(scrollToNext, 7000);
  };

  ['touchstart', 'mousedown', 'keydown'].forEach(evt => {
    sliderTrack.addEventListener(evt, restartAutoplay, { passive: true });
  });

  window.addEventListener('resize', () => scrollToIndex(currentIndex));
});
