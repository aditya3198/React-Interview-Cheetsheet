'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { SyntaxEntry, Tier } from '@/types/content';
import type { LanguageSlug } from '@/types/navigation';
import CodeBlock from '@/components/shared/CodeBlock';
import Badge from '@/components/shared/Badge';
import styles from './SyntaxSection.module.scss';
import { useProgressStore } from '@/store/useProgressStore';

interface SyntaxSectionProps {
  entries: SyntaxEntry[];
  language: LanguageSlug;
  section?: string;
  onFilteredChange?: (filtered: SyntaxEntry[]) => void;
}

export default function SyntaxSection({ entries, language, section = 'syntax', onFilteredChange }: SyntaxSectionProps) {
  const [search, setSearch] = useState('');
  const [activeTier, setActiveTier] = useState<Tier | 'pinned' | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const pins = useProgressStore((s) => s.pins);
  const togglePin = useProgressStore((s) => s.togglePin);
  const recordVisit = useProgressStore((s) => s.recordVisit);

  const cardKey = useCallback((id: string) => `${language}/${section}/${id}`, [language, section]);

  // Search + filter
  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (activeTier === 'pinned') return pins.includes(cardKey(e.id));
      if (activeTier && e.tier && e.tier !== activeTier) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.code.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [entries, search, activeTier, pins, cardKey]);

  useEffect(() => { onFilteredChange?.(filtered); }, [filtered, onFilteredChange]);

  // Keyboard shortcut: P toggles pin on hovered card
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        if (!hoveredId) return;
        if (document.activeElement instanceof HTMLInputElement) return;
        e.preventDefault();
        togglePin(cardKey(hoveredId));
      }
      if (e.key === '/') {
        const input = document.getElementById('syntax-search') as HTMLInputElement | null;
        if (document.activeElement !== input) {
          e.preventDefault();
          input?.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hoveredId, togglePin, cardKey]);

  // IntersectionObserver: recordVisit once per card per page load
  const visitedRef = useRef<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (ioEntries) => {
        ioEntries.forEach((io) => {
          const id = (io.target as HTMLElement).dataset.cardId;
          if (id && io.isIntersecting && !visitedRef.current.has(id)) {
            visitedRef.current.add(id);
            recordVisit(cardKey(id), language);
          }
        });
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.1 }
    );

    // Observe all rendered cards
    document.querySelectorAll('[data-card-id]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [filtered, language, section, cardKey, recordVisit]);

  const pinnedCount = pins.filter((k) => k.startsWith(`${language}/${section}/`)).length;

  return (
    <div className={styles.section}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <label className={styles.searchLabel}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <input
            id="syntax-search"
            type="search"
            placeholder="Filter cards…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchKbd}>/</span>
        </label>
        <div className={styles.chips}>
          {([null, 'core', 'advanced', 'pinned'] as (Tier | 'pinned' | null)[]).map((t) => {
            const label = t === null ? 'All' : t === 'pinned' ? '★ Pinned' : t.charAt(0).toUpperCase() + t.slice(1);
            const count = t === null ? entries.length
              : t === 'pinned' ? pinnedCount
              : entries.filter((e) => e.tier === t).length;
            return (
              <button
                key={String(t)}
                className={`${styles.chip} ${activeTier === t ? styles.chipActive : ''}`}
                onClick={() => setActiveTier(activeTier === t && t !== null ? null : t)}
                type="button"
              >
                {label} <span className={styles.chipCount}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>No entries match your filters.</p>
      )}

      <div className={styles.grid}>
        {filtered.map((entry) => {
          const key = cardKey(entry.id);
          const isPinned = pins.includes(key);
          return (
            <article
              key={entry.id}
              id={entry.id}
              data-card-id={entry.id}
              className={`${styles.card} ${isPinned ? styles.pinned : ''}`}
              onMouseEnter={() => setHoveredId(entry.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => recordVisit(key, language)}
            >
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{entry.title}</h3>
                {entry.since && (
                  <span className={styles.since}>{entry.since}</span>
                )}
                <button
                  className={`${styles.pinBtn} ${isPinned ? styles.pinBtnActive : ''}`}
                  onClick={(e) => { e.stopPropagation(); togglePin(key); recordVisit(key, language); }}
                  aria-label={isPinned ? 'Unpin card' : 'Pin card'}
                  title={isPinned ? 'Unpin (P)' : 'Pin (P)'}
                  type="button"
                >
                  {isPinned ? '★' : '☆'}
                </button>
              </div>

              {entry.description && (
                <p className={styles.cardDesc}>{entry.description}</p>
              )}

              <CodeBlock code={entry.code} language={entry.language} bordered={false} />

              <div className={styles.footRow}>
                <div className={styles.tags}>
                  {entry.tier && <Badge label={entry.tier} variant="tier" tier={entry.tier} />}
                  {entry.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} label={tag} variant="tag" />
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
