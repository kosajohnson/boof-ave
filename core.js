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

  const scrollToNext = () => {
    const maxScroll = sliderTrack.scrollWidth - sliderTrack.clientWidth;
    if (sliderTrack.scrollLeft >= maxScroll - 5) {
      sliderTrack.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      sliderTrack.scrollBy({ left: sliderTrack.clientWidth, behavior: 'smooth' });
    }
  };

  let autoplay = setInterval(scrollToNext, 4500);

  const restartAutoplay = () => {
    clearInterval(autoplay);
    autoplay = setInterval(scrollToNext, 4500);
  };

  ['touchstart', 'mousedown', 'keydown'].forEach(evt => {
    sliderTrack.addEventListener(evt, restartAutoplay, { passive: true });
  });
});
