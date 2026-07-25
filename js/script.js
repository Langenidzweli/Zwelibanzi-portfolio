/**
 * Initializes the mobile navigation behavior once the shared navbar markup
 * has been injected into the page.
 */

(function () {
  "use strict";

  if (window.__portfolioNavInitialized) {
    return;
  }

  window.__portfolioNavInitialized = true;

  const initMobileNavigation = () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const navOverlay = document.getElementById("navOverlay");

    if (!hamburger || !navLinks || !navOverlay) {
      return;
    }

    const openMenu = () => {
      navLinks.classList.add("open");
      navOverlay.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    };

    const closeMenu = () => {
      navLinks.classList.remove("open");
      navOverlay.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    };

    const toggleMenu = () => {
      navLinks.classList.contains("open") ? closeMenu() : openMenu();
    };

    hamburger.addEventListener("click", toggleMenu);
    navOverlay.addEventListener("click", closeMenu);

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
        hamburger.focus();
      }
    });

    const mq = window.matchMedia("(min-width: 1025px)");
    const handleBreakpointChange = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleBreakpointChange);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(handleBreakpointChange);
    }
  };

  document.addEventListener("componentsLoaded", initMobileNavigation, {
    once: true
  });

  if (
    document.getElementById("hamburger") &&
    document.getElementById("nav-links") &&
    document.getElementById("navOverlay")
  ) {
    initMobileNavigation();
  }
})();