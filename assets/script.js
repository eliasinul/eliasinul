const tabs = [...document.querySelectorAll(".tab")];
const navLinks = [...document.querySelectorAll("[data-tab-link]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const nav = document.querySelector(".site-header nav");
const navPill = nav?.querySelector(".nav-pill");

// Slide the single dark indicator under whichever nav link is active
function moveNavPill() {
  const active = nav?.querySelector("a.active");
  if (!navPill || !active) return;
  nav.classList.add("has-pill");
  navPill.style.width = `${active.offsetWidth}px`;
  navPill.style.transform = `translateX(${active.offsetLeft}px)`;
}

function updateTab(name) {
  const next = tabs.some((tab) => tab.id === name) ? name : "profile";

  tabs.forEach((tab) => {
    const selected = tab.id === next;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-hidden", selected ? "false" : "true");
  });

  navLinks.forEach((link) => {
    const selected = link.dataset.tabLink === next;
    link.classList.toggle("active", selected);
    if (selected) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  moveNavPill();
}

function showTab(name, instant = false) {
  const next = tabs.some((tab) => tab.id === name) ? name : "profile";
  const current = document.querySelector(".tab.active");

  if (current?.id === next) {
    updateTab(next);
    return;
  }

  const applyChange = () => {
    updateTab(next);
    window.scrollTo({ top: 0, behavior: instant || reducedMotion.matches ? "auto" : "smooth" });
  };

  if (!instant && !reducedMotion.matches && document.startViewTransition) {
    document.startViewTransition(applyChange);
  } else {
    applyChange();
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const name = link.dataset.tabLink;
    history.replaceState(null, "", `#${name}`);
    showTab(name);
  });
});

window.addEventListener("hashchange", () => showTab(location.hash.slice(1)));
showTab(location.hash.slice(1), true);

window.addEventListener("resize", moveNavPill);
document.fonts?.ready.then(moveNavPill);

// Soft light that follows the cursor across glass cards (pointer devices only)
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reducedMotion.matches) {
  const sheenTargets = ".projects>a, .now-model-grid>a, .badge-links>a, .education article, .now-paper, .now-card, .credentials, .stats, .cv-layout aside, .portrait-card>.current-role";
  document.querySelectorAll(sheenTargets).forEach((el) => {
    el.classList.add("sheen");
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });
}
