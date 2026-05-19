'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './TableOfContents.module.scss';

export interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

// Pixels below the navbar that count as "passed" — matches scroll-margin-top
const THRESHOLD = 72;

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  // When user clicks a link we lock the scroll listener briefly so the
  // anchor-scroll animation cannot override the explicit selection.
  const lockedRef  = useRef(false);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => {
      if (lockedRef.current) return;

      // Among elements that have already passed the threshold line,
      // pick the one whose top is closest to it (most recently scrolled past).
      // This correctly handles 2-column grids where two cards share the same
      // row: we pick by exact scroll position, not DOM order.
      let bestId  = '';
      let bestTop = -Infinity;

      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top - THRESHOLD;
        // top <= 0 → element has passed the threshold
        // We want the largest (least negative) value = closest to the line
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          bestId  = id;
        }
      });

      if (bestId) setActiveId(bestId);
    };

    // Seed on mount (handles direct URL hash navigation)
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [items]);

  const handleClick = useCallback((id: string) => {
    // Set immediately for instant visual feedback
    setActiveId(id);
    // Lock so the anchor-scroll animation cannot override this selection
    lockedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { lockedRef.current = false; }, 1200);
  }, []);

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
              onClick={() => handleClick(id)}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
