'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SECTIONS, getLanguageMeta } from '@/data/navigation';
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
    </aside>
  );
}
