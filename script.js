document.documentElement.classList.add("js");

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  document.documentElement.style.setProperty("--scroll-progress", String(progress));
};

let scrollProgressFrame = 0;
window.addEventListener("scroll", () => {
  if (scrollProgressFrame) return;
  scrollProgressFrame = window.requestAnimationFrame(() => {
    updateScrollProgress();
    scrollProgressFrame = 0;
  });
}, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && !event.target.classList.contains("nav-cta")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      primaryNav.classList.remove("is-open");
    }
  });
}

const revealTargets = document.querySelectorAll(
  ".trust-item, .service-card, .price-card, .process-card, .area-card, .faq-list details"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
