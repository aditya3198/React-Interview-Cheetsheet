'use client';

import { useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'lantern:theme';

function read(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function write(t: Theme) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(KEY, t);

  // Swap favicon between lit (light mode) and unlit (dark mode)
  const link =
    (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null) ??
    (() => {
      const el = document.createElement('link');
      el.rel = 'icon';
      document.head.appendChild(el);
      return el;
    })();
  link.href = t === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
  link.type = 'image/svg+xml';

  window.dispatchEvent(new Event('lantern:theme-change'));
}

export function useTheme(): [Theme, (t: Theme) => void] {
  const theme = useSyncExternalStore<Theme>(
    (cb) => {
      window.addEventListener('lantern:theme-change', cb);
      return () => window.removeEventListener('lantern:theme-change', cb);
    },
    () => ((document.documentElement.getAttribute('data-theme') ?? 'light') as Theme),
    () => 'light'
  );

  useEffect(() => {
    write(read());
  }, []);

  const toggle = (t: Theme) => write(t);
  return [theme, toggle];
}

export function toggleTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}

/** Inline script string — paste into <head> before React hydration to avoid FOUC. */
export const THEME_PREPAINT = `(()=>{const s=localStorage.getItem('lantern:theme');const m=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',s||m);})();`;
