'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import useLoadingStore from '@/store/useLoadingStore';
import { useProgressStore } from '@/store/useProgressStore';
import { usePaletteStore } from '@/store/usePaletteStore';
import { useTheme, toggleTheme } from '@/hooks/useTheme';
import { LANGUAGES, LANGUAGE_SLUGS, SECTIONS } from '@/data/navigation';
import type { LanguageSlug } from '@/types/navigation';
import styles from './TopNav.module.scss';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const setLoading = useLoadingStore((s) => s.setLoading);
  const streakCount = useProgressStore((s) => s.streak.count);
  const openPalette = usePaletteStore((s) => s.setOpen);
  const [theme, setTheme] = useTheme();

  const segments = pathname.split('/');
  const currentLang: LanguageSlug = LANGUAGE_SLUGS.includes(segments[1] as LanguageSlug)
    ? (segments[1] as LanguageSlug)
    : 'javascript';
  const currentSection = SECTIONS.find((s) => s.slug === segments[2])?.slug ?? 'syntax';

  const handleNavClick = (href: string) => {
    if (href !== pathname) setLoading(true);
    setMobileOpen(false);
  };

  const sectionLinks = SECTIONS.map((s) => ({
    href: `/${currentLang}/${s.slug}`,
    label: s.label,
  }));

  const staticBefore = [{ href: '/hub', label: 'Hub' }];
  const staticAfter = [{ href: '/drill', label: 'Drill' }];
  const allNavLinks = [...staticBefore, ...sectionLinks, ...staticAfter];

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => handleNavClick('/')}>
          <span className={styles.logoDot} aria-hidden="true" />
          <span className={styles.logoMark}>statecraft</span>
        </Link>

        <div className={styles.links}>
          {allNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href || pathname.startsWith(href + '/') ? styles.active : ''}`}
              onClick={() => handleNavClick(href)}
            >
              {label}
            </Link>
          ))}

          <span className={styles.divider} aria-hidden="true" />

          <button
            className={styles.cmdk}
            aria-label="Open command palette (⌘K)"
            type="button"
            onClick={() => openPalette(true)}
          >
            <span className={styles.cmdkText}>Search topics…</span>
            <span className={styles.kbd}>⌘K</span>
          </button>

          <button
            className={styles.themeBtn}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            type="button"
            onClick={() => setTheme(toggleTheme(theme))}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href="https://github.com/aditya3198/React-Interview-Cheetsheet"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>

          {streakCount > 0 && (
            <div className={styles.streak} title={`${streakCount} day streak`}>
              <span className={styles.streakDot} aria-hidden="true" />
              {streakCount}d
            </div>
          )}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link
            href="/hub"
            onClick={() => handleNavClick('/hub')}
            className={`${styles.mobileLink} ${pathname === '/hub' ? styles.mobileLinkActive : ''}`}
          >
            Hub
          </Link>

          <div className={styles.mobileDivider}>
            <span className={styles.mobileDividerDot} style={{ background: LANGUAGES.find((l) => l.slug === currentLang)?.color }} />
            {LANGUAGES.find((l) => l.slug === currentLang)?.label}
          </div>

          {SECTIONS.map((s) => {
            const href = `/${currentLang}/${s.slug}`;
            return (
              <Link
                key={s.slug}
                href={href}
                onClick={() => handleNavClick(href)}
                className={`${styles.mobileLink} ${styles.mobileLinkIndented} ${pathname === href || pathname.startsWith(href + '/') ? styles.mobileLinkActive : ''}`}
              >
                <span className={styles.mobileLinkIcon}>{s.icon}</span>
                {s.label}
              </Link>
            );
          })}

          <div className={styles.mobileDivider}>Languages</div>

          <div className={styles.mobileLangRow}>
            {LANGUAGES.map((lang) => {
              const href = `/${lang.slug}/${currentSection}`;
              const isActive = lang.slug === currentLang;
              return (
                <Link
                  key={lang.slug}
                  href={href}
                  onClick={() => handleNavClick(href)}
                  className={`${styles.mobileLangChip} ${isActive ? styles.mobileLangChipActive : ''}`}
                  style={{ '--lang-color': lang.color } as React.CSSProperties}
                >
                  <span className={styles.mobileLangDot} style={{ background: lang.color }} />
                  {lang.label}
                </Link>
              );
            })}
          </div>

          <div className={styles.mobileDivider}>More</div>

          <Link
            href="/drill"
            onClick={() => handleNavClick('/drill')}
            className={`${styles.mobileLink} ${pathname === '/drill' ? styles.mobileLinkActive : ''}`}
          >
            Drill
          </Link>

          <button
            className={styles.mobileLink}
            style={{ textAlign: 'left', fontFamily: 'var(--sans)', fontSize: '14px', width: '100%', cursor: 'pointer' }}
            onClick={() => { setTheme(toggleTheme(theme)); setMobileOpen(false); }}
          >
            {theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          </button>
        </div>
      )}
    </nav>
  );
}
