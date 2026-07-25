/**
 * Loads shared navbar and footer content into the page placeholders.
 * Also wires up the mobile navigation behavior once the components are in place.
 */

function resolveComponentUrl(filename) {
  const currentScript =
    document.currentScript ||
    document.querySelector('script[src$="components.js"]');

  const baseUrl = currentScript ? currentScript.src : window.location.href;

  return new URL(filename, baseUrl);
}

async function loadComponent(targetId, filename) {
  const container = document.getElementById(targetId);

  if (!container) return;

  try {
    const response = await fetch(resolveComponentUrl(filename));

    if (!response.ok) {
      throw new Error(`Failed to load ${filename}: ${response.status}`);
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    container.innerHTML = "";
  }
}

async function initializeComponents() {
  await Promise.all([
    loadComponent("navbar", "navbar.html"),
    loadComponent("footer", "footer.html")
  ]);

  /* =========================================
      BASE PATH (Live Server + GitHub Pages)
  ========================================= */

  const base =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
      ? ""
      : "/Zwelibanzi-portfolio";

  document.querySelectorAll("[data-link]").forEach((link) => {
    link.href = base + link.dataset.link;
  });

  document.dispatchEvent(new Event("componentsLoaded"));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeComponents);
} else {
  initializeComponents();
}