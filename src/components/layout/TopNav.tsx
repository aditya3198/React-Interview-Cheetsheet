'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LANGUAGES } from '@/data/navigation';
import useLoadingStore from '@/store/useLoadingStore';
import styles from './TopNav.module.scss';

export default function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const setLoading = useLoadingStore((s) => s.setLoading);

  const handleNavClick = (href: string) => {
    if (href !== pathname) setLoading(true);
  };

  const isHomePage = pathname === '/';

  return (
    <nav className={`${styles.nav} ${isHomePage ? styles.transparent : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => handleNavClick('/')}>
          <span className={styles.logoIcon}>⟨/⟩</span>
          <span className={styles.logoText}>Interview Prep</span>
        </Link>

        <ul className={styles.links}>
          <li>
            <Link
              href="/hub"
              className={`${styles.link} ${pathname === '/hub' ? styles.active : ''}`}
              onClick={() => handleNavClick('/hub')}
            >
              Hub
            </Link>
          </li>
          {LANGUAGES.map((lang) => {
            const isActive = pathname.startsWith(`/${lang.slug}`);
            return (
              <li key={lang.slug}>
                <Link
                  href={`/${lang.slug}/syntax`}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  style={isActive ? { color: lang.color } : undefined}
                  onClick={() => handleNavClick(`/${lang.slug}/syntax`)}
                >
                  {lang.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/hub" onClick={() => { setMobileOpen(false); handleNavClick('/hub'); }} className={styles.mobileLink}>Hub</Link>
          {LANGUAGES.map((lang) => (
            <Link
              key={lang.slug}
              href={`/${lang.slug}/syntax`}
              onClick={() => { setMobileOpen(false); handleNavClick(`/${lang.slug}/syntax`); }}
              className={styles.mobileLink}
              style={{ borderLeft: `3px solid ${lang.color}` }}
            >
              {lang.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
