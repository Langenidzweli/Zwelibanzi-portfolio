/**
 * main.js
 * -------
 * Hamburger menu — opens/closes the mobile nav panel, closes on overlay
 * click, nav-link click, Escape, or resizing back to desktop; locks page
 * scroll while open.
 *
 * The header itself is just position: fixed in CSS and stays visible at
 * all times while scrolling — no show/hide logic needed here.
 *
 * No build step, no dependencies — plain DOM APIs only.
 */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- */
  /*  Hamburger / mobile nav panel                                    */
  /* ---------------------------------------------------------------- */

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

    // Close the panel whenever a nav link is followed (anchor jump).
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on Escape for keyboard users.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
        hamburger.focus();
      }
    });

    // If the viewport is resized past the mobile/tablet breakpoint while
    // the panel is open, close it so it doesn't linger as a hidden
    // fixed-position element with stale state.
    const mq = window.matchMedia("(min-width: 1025px)");
    const handleBreakpointChange = function (e) {
      if (e.matches) {
        closeMenu();
      }
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleBreakpointChange);
    } else if (typeof mq.addListener === "function") {
      // Safari < 14 fallback
      mq.addListener(handleBreakpointChange);
    }
  }
})();