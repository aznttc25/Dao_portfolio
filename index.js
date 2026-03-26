/* =========================
   Footer year
========================= */
(function setYear(){
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* =========================
   Smooth scroll
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
   Active nav link on scroll
========================= */
(function navScrollSpy(){
  const links = Array.from(document.querySelectorAll(".side-nav .nav-link"));
  if (!links.length) return;

  const sections = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => {
      const match = a.getAttribute("href") === `#${id}`;
      if (match) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  }, { rootMargin: "-20% 0px -45% 0px", threshold: [0.2, 0.35, 0.5, 0.7] });

  sections.forEach(s => io.observe(s));
  setActive(sections[0]?.id || "home");
})();

/* =========================
   Projects Modal
========================= */
(function projectsCaseStudy(){
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const caseTitle = document.getElementById("caseTitle");
  const caseIntro = document.getElementById("caseIntro");
  const caseChallenge = document.getElementById("caseChallenge");
  const caseSolution = document.getElementById("caseSolution");
  const caseOutcome = document.getElementById("caseOutcome");

  const sideTitle = document.getElementById("caseSideTitle");
  const sideBlurb = document.getElementById("caseSideBlurb");
  const roleEl = document.getElementById("caseRole");
  const clientEl = document.getElementById("caseClient");
  const stackEl = document.getElementById("caseStack");
  const scopeEl = document.getElementById("caseScope");
  const linksEl = document.getElementById("modalLinks");
  const heroEl = document.getElementById("caseHeroMedia");

  const open = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) close();
  });

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const title = card.dataset.title || "Project";
      const subtitle = card.dataset.subtitle || "";

      caseTitle.textContent = title;
      caseIntro.textContent = subtitle;
      caseChallenge.textContent = card.dataset.problem || "";
      caseSolution.textContent = card.dataset.solution || "";
      caseOutcome.textContent = card.dataset.impact || "";

      sideTitle.textContent = title;
      sideBlurb.textContent = card.dataset.impact || "";
      roleEl.textContent = (card.dataset.role || "").replace("Role:", "").trim();
      stackEl.textContent = (card.dataset.stack || "").replace("Stack:", "").trim();
      clientEl.textContent = card.dataset.client || "—";
      scopeEl.textContent = card.dataset.scope || "End-to-end feature design";

      heroEl.innerHTML = `<div class="case-hero-placeholder">${title}</div>`;

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

      open();
    });
  });
})();