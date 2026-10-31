document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ===== Dark Mode ===== */
  const html = document.documentElement;
  const themeToggles = document.querySelectorAll(".theme-toggle");

  function applyTheme(theme) {
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
    } else {
      html.removeAttribute("data-theme");
    }
    updateToggleIcons(theme);
  }

  function updateToggleIcons(theme) {
    const isDark = theme === "dark";
    themeToggles.forEach((toggle) => {
      toggle.textContent = isDark ? "☀️" : "🌙";
      toggle.setAttribute("aria-checked", String(isDark));
    });
  }

  function getSavedTheme() {
    return localStorage.getItem("theme");
  }

  function setTheme(theme) {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }

  const savedTheme = getSavedTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    });
  });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = form.elements.name?.value.trim() || "";
      const email = form.elements.email?.value.trim() || "";
      const message = form.elements.message?.value.trim() || "";

      if (!name || !email || !message) {
        if (status) status.textContent = "يرجى تعبئة جميع حقول النموذج.";
        return;
      }

      if (status) status.textContent = "تم تجهيز الرسالة. سنعاود التواصل معك قريبًا.";
      const whatsappText = encodeURIComponent(
        `مرحباً، أنا ${name}. ${message}\nالبريد: ${email}`
      );
      window.open(`https://wa.me/966501431387?text=${whatsappText}`, "_blank");
      form.reset();
    });
  }

  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("target", "_blank");
  });
});
