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
