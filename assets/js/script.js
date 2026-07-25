/**
 * Handles the mobile navigation menu and its related interactions.
 * Built with vanilla JavaScript and no external dependencies.
 */

(function () {
  "use strict";

  /* Mobile navigation */

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navOverlay = document.getElementById("navOverlay");

  if (hamburger && navLinks && navOverlay) {
    const openMenu = function () {
      navLinks.classList.add("open");
      navOverlay.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    };

    const closeMenu = function () {
      navLinks.classList.remove("open");
      navOverlay.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    };

    const toggleMenu = function () {
      const isOpen = navLinks.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    hamburger.addEventListener("click", toggleMenu);
    navOverlay.addEventListener("click", closeMenu);

    // Close the menu after anchor navigation so the overlay does not linger.
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Support keyboard users with Escape handling.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
        hamburger.focus();
      }
    });

    // Reset the menu when the layout moves back to desktop view.
    const mq = window.matchMedia("(min-width: 1025px)");
    const handleBreakpointChange = function (e) {
      if (e.matches) {
        closeMenu();
      }
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleBreakpointChange);
    } else if (typeof mq.addListener === "function") {
      // Support older Safari versions that still use addListener().
      mq.addListener(handleBreakpointChange);
    }
  }
})();