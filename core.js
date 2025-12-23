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
        window.location.href = randomRef;
      }, 400 + Math.random() * 1100); // simulate processing time
    });
  });
})();

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
