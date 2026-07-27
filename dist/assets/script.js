const tabs = [...document.querySelectorAll(".tab")];
const navLinks = [...document.querySelectorAll("[data-tab-link]")];

function showTab(name) {
  const next = tabs.some((tab) => tab.id === name) ? name : "profile";
  tabs.forEach((tab) => tab.classList.toggle("active", tab.id === next));
  navLinks.forEach((link) => link.classList.toggle("active", link.dataset.tabLink === next));
  window.scrollTo({ top: 0, behavior: "smooth" });
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
showTab(location.hash.slice(1));
