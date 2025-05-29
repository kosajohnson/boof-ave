const toggleBtn = document.getElementById("theme-toggle");

toggleBtn && toggleBtn.addEventListener("click", () => {
  const body = document.body;
  body.classList.toggle("theme-dark");
  body.classList.toggle("theme-icy");
});
