/* Shared theme toggle for Lantern prototypes.
   - Persists choice to localStorage("lantern:theme")
   - Defaults to OS preference on first visit
   - Renders <div class="theme-toggle"> with sun/moon buttons
   - Cross-frame: when nested in an iframe (Design Review), also accepts
     `theme` postMessage so the host can drive both panes.
*/
(function () {
  const KEY = "lantern:theme";

  function getInitial() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)");
    return mq && mq.matches ? "light" : "dark";
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle button").forEach((b) => {
      b.classList.toggle("on", b.dataset.theme === theme);
    });
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  function mount() {
    document.querySelectorAll("[data-theme-toggle]").forEach((slot) => {
      if (slot.dataset.mounted) return;
      slot.dataset.mounted = "1";
      slot.classList.add("theme-toggle");
      slot.setAttribute("role", "tablist");
      slot.setAttribute("aria-label", "Theme");
      slot.innerHTML = `
        <button data-theme="light" aria-label="Light theme" title="Light">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/>
          </svg>
        </button>
        <button data-theme="dark" aria-label="Dark theme" title="Dark">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a1 1 0 0 1 1.1 1.3 6.5 6.5 0 0 0 8.1 8.1A1 1 0 0 1 20 14.5Z"/>
          </svg>
        </button>`;
      slot.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-theme]");
        if (!btn) return;
        apply(btn.dataset.theme);
      });
    });
    apply(document.documentElement.getAttribute("data-theme") || getInitial());
  }

  // Pre-paint to avoid theme flash
  apply(getInitial());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  window.addEventListener("message", (e) => {
    if (e.data && e.data.theme && (e.data.theme === "light" || e.data.theme === "dark")) {
      apply(e.data.theme);
    }
  });
})();
