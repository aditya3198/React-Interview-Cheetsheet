'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SECTIONS, LANGUAGES, getLanguageMeta } from '@/data/navigation';
import type { LanguageSlug } from '@/types/navigation';
import useLoadingStore from '@/store/useLoadingStore';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  language: LanguageSlug;
}

export default function Sidebar({ language }: SidebarProps) {
  const pathname = usePathname();
  const langMeta = getLanguageMeta(language);
  const setLoading = useLoadingStore((s) => s.setLoading);

  // Current section slug from path — used for "other stacks" links
  const currentSection = pathname.split('/')[2] ?? 'syntax';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.langHeader}>
        <span className={styles.langDot} style={{ background: langMeta?.color }} />
        <span className={styles.langLabel}>{langMeta?.label}</span>
      </div>

      <nav className={styles.nav}>
        {SECTIONS.map((section) => {
          const href = `/${language}/${section.slug}`;
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={section.slug}
              href={href}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              onClick={() => { if (href !== pathname) setLoading(true); }}
            >
              <span className={styles.icon}>{section.icon}</span>
              <span>{section.label}</span>
            </Link>
          );
        })}
      </nav>

      <h4 className={styles.otherLabel}>Other stacks</h4>
      <nav className={styles.nav}>
        {LANGUAGES.filter((l) => l.slug !== language).map((lang) => {
          const href = `/${lang.slug}/${currentSection}`;
          return (
            <Link
              key={lang.slug}
              href={href}
              className={styles.link}
              onClick={() => setLoading(true)}
            >
              <span className={styles.dot} style={{ background: lang.color }} />
              <span>{lang.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.tip}>
        Press <kbd className={styles.kbd}>/</kbd> to search.{' '}
        <kbd className={styles.kbd}>P</kbd> pins a card.
      </div>
    </aside>
  );
}
