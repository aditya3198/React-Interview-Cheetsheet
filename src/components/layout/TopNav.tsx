'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import useLoadingStore from '@/store/useLoadingStore';
import { useProgressStore } from '@/store/useProgressStore';
import { usePaletteStore } from '@/store/usePaletteStore';
import styles from './TopNav.module.scss';

export default function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const setLoading = useLoadingStore((s) => s.setLoading);
  const streakCount = useProgressStore((s) => s.streak.count);
  const openPalette = usePaletteStore((s) => s.setOpen);

  const handleNavClick = (href: string) => {
    if (href !== pathname) setLoading(true);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => handleNavClick('/')}>
          <span className={styles.logoDot} aria-hidden="true" />
          <span className={styles.logoMark}>frontprep</span>
        </Link>

        <div className={styles.links}>
          {/* ⌘K palette affordance — wired in CommandPalette */}
          <button className={styles.cmdk} aria-label="Open command palette (⌘K)" type="button" onClick={() => openPalette(true)}>
            <span className={styles.cmdkText}>Search topics, questions…</span>
            <span className={styles.kbd}>⌘K</span>
          </button>

          <Link
            href="/hub"
            className={`${styles.link} ${pathname === '/hub' ? styles.active : ''}`}
            onClick={() => handleNavClick('/hub')}
          >
            Hub
          </Link>
          <Link
            href="/drill"
            className={`${styles.link} ${pathname === '/drill' ? styles.active : ''}`}
            onClick={() => handleNavClick('/drill')}
          >
            Drill
          </Link>
          <Link
            href="/bookmarks"
            className={`${styles.link} ${pathname === '/bookmarks' ? styles.active : ''}`}
            onClick={() => handleNavClick('/bookmarks')}
          >
            Bookmarks
          </Link>
          <a
            href="https://github.com/aditya3198/React-Interview-Cheetsheet"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
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
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/hub" onClick={() => { setMobileOpen(false); handleNavClick('/hub'); }} className={styles.mobileLink}>Hub</Link>
          <Link href="/drill" onClick={() => { setMobileOpen(false); handleNavClick('/drill'); }} className={styles.mobileLink}>Drill</Link>
          <Link href="/bookmarks" onClick={() => { setMobileOpen(false); handleNavClick('/bookmarks'); }} className={styles.mobileLink}>Bookmarks</Link>
          <a
            href="https://github.com/aditya3198/React-Interview-Cheetsheet"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileLink}
            onClick={() => setMobileOpen(false)}
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
