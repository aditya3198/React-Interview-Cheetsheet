'use client';

import { useState, useMemo, useEffect } from 'react';
import type { SyntaxEntry, Tier, Level } from '@/types/content';
import CodeBlock from '@/components/shared/CodeBlock';
import Badge from '@/components/shared/Badge';
import ClassificationFilter from '@/components/shared/ClassificationFilter';
import ScrollReveal from '@/components/shared/ScrollReveal';
import styles from './SyntaxSection.module.scss';

interface SyntaxSectionProps {
  entries: SyntaxEntry[];
  onFilteredChange?: (filtered: SyntaxEntry[]) => void;
}

export default function SyntaxSection({ entries, onFilteredChange }: SyntaxSectionProps) {
  const [search, setSearch] = useState('');
  const [activeTier, setActiveTier] = useState<Tier | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (activeTier && e.tier && e.tier !== activeTier) return false;
      if (activeLevel && e.level && e.level !== activeLevel) return false;
      if (search) {
        const q = search.toLowerCase();
        return e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [entries, search, activeTier, activeLevel]);

  useEffect(() => {
    onFilteredChange?.(filtered);
  }, [filtered, onFilteredChange]);

  return (
    <div className={styles.section}>
      <div className={styles.filters}>
        <ClassificationFilter
          activeTier={activeTier}
          activeLevel={activeLevel}
          onTierChange={setActiveTier}
          onLevelChange={setActiveLevel}
        />
        <input
          type="search"
          placeholder="Search syntax..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>No entries match your filters.</p>
      )}

      <div className={styles.list}>
        {filtered.map((entry, i) => (
          <ScrollReveal key={entry.id} delay={i * 0.04}>
            <div id={entry.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{entry.title}</h3>
                <div className={styles.cardMeta}>
                  {entry.tier && (
                    <Badge label={entry.tier} variant="tier" tier={entry.tier} />
                  )}
                  {entry.level && (
                    <Badge label={entry.level} variant="level" level={entry.level} />
                  )}
                  {entry.since && <Badge label={entry.since} variant="version" />}
                  {entry.tags.map((tag) => (
                    <Badge key={tag} label={tag} variant="tag" />
                  ))}
                </div>
              </div>
              {entry.description && (
                <p className={styles.cardDesc}>{entry.description}</p>
              )}
              <CodeBlock code={entry.code} language={entry.language} bordered={false} />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
