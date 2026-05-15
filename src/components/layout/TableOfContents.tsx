'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './TableOfContents.module.scss';

export interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const visibilityMap = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    const map = visibilityMap.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => map.set(e.target.id, e.isIntersecting));
        const first = items.find(({ id }) => map.get(id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={styles.nav}>
      <p className={styles.heading}>On this page</p>
      <ul className={styles.list}>
        {items.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${activeId === id ? styles.active : ''}`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
