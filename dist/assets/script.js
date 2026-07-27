const tabs = [...document.querySelectorAll(".tab")];
const navLinks = [...document.querySelectorAll("[data-tab-link]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
