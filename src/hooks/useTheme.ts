'use client';

import { useEffect, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'lantern:theme';

function read(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function write(t: Theme) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(KEY, t);
  window.dispatchEvent(new Event('lantern:theme-change'));
}

export function useTheme(): [Theme, (t: Theme) => void] {
  const theme = useSyncExternalStore<Theme>(
    (cb) => {
      window.addEventListener('lantern:theme-change', cb);
      return () => window.removeEventListener('lantern:theme-change', cb);
    },
    () => ((document.documentElement.getAttribute('data-theme') ?? 'dark') as Theme),
    () => 'dark'
  );

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      write(read());
    }
  }, []);

  const toggle = (t: Theme) => write(t);
  return [theme, toggle];
}

export function toggleTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}

/** Inline script string — paste into <head> before React hydration to avoid FOUC. */
export const THEME_PREPAINT = `(()=>{const s=localStorage.getItem('lantern:theme');const m=matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';document.documentElement.setAttribute('data-theme',s||m);})();`;
