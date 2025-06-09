const toggleBtn = document.getElementById("theme-toggle");

toggleBtn && toggleBtn.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("theme-dark");
  body.classList.toggle("theme-icy");
});

// Sparkle cursor trail
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("img");
  trail.src = "assets/other effects/sparkle.png";
  trail.className = "cursor-trail";
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 4000);
});
