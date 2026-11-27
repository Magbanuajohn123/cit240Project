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

  /* ---------- 6c. Black & white dither effect (opt-in) ---------- */
  // Add the data-dither attribute to the profile <img> to turn a normal photo
  // into a 1-bit dithered portrait. Leave it off if the image is already dithered.
  var DOT = 2;          // size of each dither dot in CSS px (bigger = chunkier)
  var CONTRAST = 1.3;   // 1 = original, higher = punchier
  var BRIGHTNESS = 0;   // -50 to 50
  var BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
  var ditherImg = document.querySelector(".hero-figure img[data-dither]");

  if (ditherImg) {
    var ditherCanvas = document.createElement("canvas");
    ditherCanvas.className = "pixel-canvas";
    ditherCanvas.setAttribute("aria-hidden", "true");
    var dctx = ditherCanvas.getContext("2d", { willReadFrequently: true });

    var drawDither = function () {
      var box = ditherImg.parentElement.getBoundingClientRect();
      if (!dctx || !box.width || !box.height || !ditherImg.naturalWidth) return;

      var cols = Math.max(24, Math.round(box.width / DOT));
      var rows = Math.max(24, Math.round(box.height / DOT));
      ditherCanvas.width = cols;
      ditherCanvas.height = rows;

      // "cover" crop so the photo fills the frame without stretching
      var iw = ditherImg.naturalWidth, ih = ditherImg.naturalHeight;
      var scale = Math.max(cols / iw, rows / ih);
      var sw = cols / scale, sh = rows / scale;
      dctx.drawImage(ditherImg, (iw - sw) / 2, (ih - sh) / 2, sw, sh, 0, 0, cols, rows);

      try {
        var frame = dctx.getImageData(0, 0, cols, rows);
        var d = frame.data;
        for (var y = 0; y < rows; y++) {
          for (var x = 0; x < cols; x++) {
            var i = (y * cols + x) * 4;
            var gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
            gray = (gray - 128) * CONTRAST + 128 + BRIGHTNESS;
            var threshold = (BAYER[y % 4][x % 4] + 0.5) / 16 * 255;
            var v = gray > threshold ? 255 : 10; // white or #0a0a0a
            d[i] = d[i + 1] = d[i + 2] = v;
            d[i + 3] = 255;
          }
        }
        dctx.putImageData(frame, 0, 0);
        ditherImg.parentElement.classList.add("is-pixelated");
      } catch (e) {
        /* canvas blocked (e.g. opened from file://): keep the original image */
      }
    };

    ditherImg.insertAdjacentElement("afterend", ditherCanvas);

    var startDither = function () {
      drawDither();
      if ("ResizeObserver" in window) {
        new ResizeObserver(drawDither).observe(ditherImg.parentElement);
      } else {
        window.addEventListener("resize", drawDither);
      }
    };

    if (ditherImg.complete && ditherImg.naturalWidth) startDither();
    else ditherImg.addEventListener("load", startDither);
  }

  /* ---------- 6b. Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();