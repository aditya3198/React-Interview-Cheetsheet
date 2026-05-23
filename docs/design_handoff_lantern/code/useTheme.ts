/**
 * Lantern — theme store.
 * Persists user choice in localStorage; first visit follows OS preference.
 *
 * Pre-paint by adding this to your <head> BEFORE the React tree:
 *
 *   <script>
 *     (() => {
 *       const saved = localStorage.getItem("lantern:theme");
 *       const sys = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
 *       document.documentElement.setAttribute("data-theme", saved || sys);
 *     })();
 *   </script>
 *
 * This avoids the "flash of wrong theme" on first paint.
 */
import { useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const KEY = "lantern:theme";

function read(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem(KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function write(t: Theme) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem(KEY, t);
  window.dispatchEvent(new Event("lantern:theme-change"));
}

export function useTheme(): [Theme, (t: Theme) => void] {
  const theme = useSyncExternalStore(
    (cb) => {
      window.addEventListener("lantern:theme-change", cb);
      return () => window.removeEventListener("lantern:theme-change", cb);
    },
    () => (document.documentElement.getAttribute("data-theme") as Theme) ?? "dark",
    () => "dark"
  );
  useEffect(() => {
    if (!document.documentElement.getAttribute("data-theme")) {
      write(read());
    }
  }, []);
  return [theme, write];
}
