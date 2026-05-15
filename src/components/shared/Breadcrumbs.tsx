'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGUAGES, SECTIONS } from '@/data/navigation';
import styles from './Breadcrumbs.module.scss';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const getLabel = (segment: string, index: number): string => {
    if (index === 0) return LANGUAGES.find((l) => l.slug === segment)?.label ?? segment;
    if (index === 1) return SECTIONS.find((s) => s.slug === segment)?.label ?? segment;
    return segment;
  };

  const buildHref = (index: number): string => '/' + segments.slice(0, index + 1).join('/');

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link href="/" className={styles.crumb}>Home</Link>
      {segments.map((seg, i) => (
        <span key={i} className={styles.crumbGroup}>
          <span className={styles.separator}>/</span>
          {i < segments.length - 1 ? (
            <Link href={buildHref(i)} className={styles.crumb}>{getLabel(seg, i)}</Link>
          ) : (
            <span className={styles.current}>{getLabel(seg, i)}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
