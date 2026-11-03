const langSwitch = document.getElementById("langSwitch");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const revealEls = document.querySelectorAll(".reveal");
const cursorGlow = document.querySelector(".cursor-glow");

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  if (langSwitch) {
    langSwitch.dataset.lang = lang;
    langSwitch.classList.toggle("eng", lang === "en");

    langSwitch.setAttribute(
      "aria-label",
      lang === "vi" ? "Chuyển sang tiếng Anh" : "Switch to Vietnamese",
    );

    langSwitch.querySelectorAll(".lang-label").forEach((label, index) => {
      label.classList.toggle(
        "active",
        (lang === "vi" && index === 0) || (lang === "en" && index === 1),
      );
    });
  }

  document.querySelectorAll("[data-vi][data-en]").forEach((el) => {
    el.innerHTML = lang === "vi" ? el.dataset.vi : el.dataset.en;
  });

  document
    .querySelectorAll("[data-placeholder-vi][data-placeholder-en]")
    .forEach((el) => {
      el.placeholder =
        lang === "vi" ? el.dataset.placeholderVi : el.dataset.placeholderEn;
    });

  localStorage.setItem("cybersafe_lang", lang);

  const event = new CustomEvent("languageChanged", {
    detail: { lang },
  });

  window.dispatchEvent(event);
}

function toggleLanguage() {
  const current = localStorage.getItem("cybersafe_lang") || "vi";
  applyLanguage(current === "vi" ? "en" : "vi");
}

if (langSwitch) {
  langSwitch.addEventListener("click", toggleLanguage);
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (siteNav) {
      siteNav.classList.remove("open");
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.14 },
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("show"));
}

if (cursorGlow) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const savedLang = localStorage.getItem("cybersafe_lang") || "vi";
applyLanguage(savedLang);
