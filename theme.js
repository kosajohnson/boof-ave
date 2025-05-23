const toggleBtn = document.getElementById("theme-toggle");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("theme-dark");
  body.classList.toggle("theme-icy");
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  document.body.classList.toggle("sidebar-collapsed");
});

document.addEventListener('mousemove', function(e) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = (e.clientX - 9) + 'px';
  sparkle.style.top = (e.clientY - 9) + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => {
    sparkle.remove();
  }, 800);
});
