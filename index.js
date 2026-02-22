// Set active nav link based on current filename
(function setActiveNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
})();

// Optional: set year in footer if you include <span id="year"></span>
(function setYear(){
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

(function setActiveNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".side-nav .nav-link").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
})();
