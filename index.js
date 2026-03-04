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
      const match = a.getAttribute("href") === `#${id}`;
      a.toggleAttribute("aria-current", match);
    });
  };

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, { threshold: [0.45, 0.6] });

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

  const sideTitle = document.getElementById("caseSideTitle");
  const sideBlurb = document.getElementById("caseSideBlurb");
  const roleEl = document.getElementById("caseRole");
  const clientEl = document.getElementById("caseClient");
  const stackEl = document.getElementById("caseStack");
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

      // main content
      caseTitle.textContent = title;
      caseIntro.textContent = subtitle;

      // map your existing attributes
      caseChallenge.textContent = card.dataset.problem || "";
      caseSolution.textContent = card.dataset.solution || "";

      // side panel
      sideTitle.textContent = title;
      sideBlurb.textContent = card.dataset.impact || "";
      roleEl.textContent = (card.dataset.role || "").replace("Role:", "").trim();
      stackEl.textContent = (card.dataset.stack || "").replace("Stack:", "").trim();
      clientEl.textContent = card.dataset.client || "—";

      // hero placeholder (later you can inject an image)
      heroEl.textContent = "Project Hero Image";

      // links
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