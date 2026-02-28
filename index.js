/* =========================
   Footer year
========================= */
(function setYear(){
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* =========================
   Smooth scroll (optional enhancement)
   - prevents weird jump if you want
========================= */
(function smoothAnchorClicks(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });
})();

/* =========================
   Active nav link on scroll (Scroll Spy)
========================= */
(function navScrollSpy(){
  const links = Array.from(document.querySelectorAll(".side-nav .nav-link"));
  if (!links.length) return;

  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => {
      const isMatch = a.getAttribute("href") === `#${id}`;
      if (isMatch) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };

  // Click sets active immediately (nice on mobile)
  links.forEach(a => {
    a.addEventListener("click", () => {
      const targetId = a.getAttribute("href").slice(1);
      setActive(targetId);
    });
  });

  // Intersection observer for scroll-based highlighting
  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  }, { threshold: [0.35, 0.55, 0.75] });

  sections.forEach(sec => io.observe(sec));
  setActive(sections[0]?.id || "home");
})();

/* =========================
   Projects Modal
========================= */
(function projectsModal(){
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const titleEl = document.getElementById("modalTitle");
  const subEl = document.getElementById("modalSubtitle");
  const roleEl = document.getElementById("modalRole");
  const stackEl = document.getElementById("modalStack");
  const probEl = document.getElementById("modalProblem");
  const solEl = document.getElementById("modalSolution");
  const impactEl = document.getElementById("modalImpact");
  const linksEl = document.getElementById("modalLinks");

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Close on backdrop or close button
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeModal();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  // Fill modal from card dataset
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      titleEl.textContent = card.dataset.title || "Project";
      subEl.textContent = card.dataset.subtitle || "";

      roleEl.textContent = card.dataset.role || "";
      stackEl.textContent = card.dataset.stack || "";
      probEl.textContent = card.dataset.problem || "";
      solEl.textContent = card.dataset.solution || "";
      impactEl.textContent = card.dataset.impact || "";

      // Render links
      linksEl.innerHTML = "";
      let links = [];
      try { links = JSON.parse(card.dataset.links || "[]"); } catch { links = []; }

      links.forEach(l => {
        const a = document.createElement("a");
        a.href = l.href || "#";
        a.target = "_blank";
        a.rel = "noreferrer";
        a.textContent = l.label || "Link";
        linksEl.appendChild(a);
      });

      openModal();
    });
  });
})();