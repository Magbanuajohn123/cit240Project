/* ==========================================================
   Portfolio interactivity — vanilla JavaScript, no dependencies
   1. Theme toggle (persisted)
   2. Responsive mobile menu
   3. Smooth scrolling with sticky-header offset
   4. Project filter
   5. Active nav link on scroll
   6. Scroll reveal + footer year
   ========================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.querySelector(".site-header");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Theme toggle ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  var THEME_KEY = "portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#ffffff");
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  applyTheme(root.getAttribute("data-theme") || "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- 2. Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenu(false);
      }
    });

    // Reset when resizing up to desktop
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- 3. Smooth scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      var target = hash === "#top" ? document.body : document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      setMenu(false);

      var offset = header ? header.offsetHeight : 0;
      var y = hash === "#top" ? 0 : target.getBoundingClientRect().top + window.pageYOffset - offset + 1;

      window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });

      // Keep URL in sync and move focus for keyboard / screen reader users
      if (history.pushState) history.pushState(null, "", hash);
      if (hash !== "#top") {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ---------- 4. Project filter ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".project-card");
  var statusEl = document.getElementById("filter-status");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");

      filterBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      var shown = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-category") || "").split(" ");
        var match = filter === "all" || cats.indexOf(filter) !== -1;
        card.hidden = !match;
        if (match) shown++;
      });

      if (statusEl) {
        statusEl.textContent = "Showing " + shown + (shown === 1 ? " project" : " projects") +
          (filter === "all" ? "" : " in " + filter);
      }
    });
  });

  /* ---------- 5. Active nav link on scroll ---------- */
  var navLinks = document.querySelectorAll(".nav-link");
  var sections = Array.prototype.map.call(navLinks, function (l) {
    return document.querySelector(l.getAttribute("href"));
  });

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) {
          var on = l.getAttribute("href") === "#" + entry.target.id;
          l.classList.toggle("is-active", on);
          if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (s) { if (s) navObserver.observe(s); });

    /* ---------- 6a. Scroll reveal ---------- */
    var revealEls = document.querySelectorAll(
      ".section-head, .skill-card, .project-card, .timeline-item, .stats, .contact-inner"
    );
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  /* ---------- 6b. Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();