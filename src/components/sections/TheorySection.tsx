'use client';

import { useState, useMemo } from 'react';
import type { ConceptCard, Tier, Level } from '@/types/content';
import Badge from '@/components/shared/Badge';
import styles from './TheorySection.module.scss';

const TIERS: Tier[] = ['core', 'advanced'];
const LEVELS: Level[] = ['fresher', 'experienced', 'expert'];

interface TheorySectionProps {
  cards: ConceptCard[];
}

export default function TheorySection({ cards }: TheorySectionProps) {
  const [selectedId, setSelectedId] = useState<string>(cards[0]?.id ?? '');
  const [search, setSearch] = useState('');
  const [activeTier, setActiveTier] = useState<Tier | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return cards.filter((c) => {
      if (activeTier && c.tier !== activeTier) return false;
      if (activeLevel && c.level !== activeLevel) return false;
      if (q && !c.title.toLowerCase().includes(q) && !c.tags.some((t) => t.includes(q))) return false;
      return true;
    });
  }, [cards, activeTier, activeLevel, search]);

  // If selected topic is filtered out, fall back to first visible
  const selected = filtered.find((c) => c.id === selectedId) ?? filtered[0] ?? null;

  function selectTopic(id: string) {
    setSelectedId(id);
    setMobileShowDetail(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.search}
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <button
              className={`${styles.pill} ${activeTier === null ? styles.pillActive : ''}`}
              onClick={() => setActiveTier(null)}
            >All</button>
            {TIERS.map((t) => (
              <button
                key={t}
                className={`${styles.pill} ${styles[`pill_${t}`]} ${activeTier === t ? styles.pillActive : ''}`}
                onClick={() => setActiveTier(activeTier === t ? null : t)}
              >{t}</button>
            ))}
          </div>
          <div className={styles.filterGroup}>
            <button
              className={`${styles.pill} ${activeLevel === null ? styles.pillActive : ''}`}
              onClick={() => setActiveLevel(null)}
            >All</button>
            {LEVELS.map((l) => (
              <button
                key={l}
                className={`${styles.pill} ${styles[`pill_${l}`]} ${activeLevel === l ? styles.pillActive : ''}`}
                onClick={() => setActiveLevel(activeLevel === l ? null : l)}
              >{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.layout} ${mobileShowDetail ? styles.showDetail : ''}`}>
        <nav className={styles.topicList}>
          <span className={styles.topicCount}>{filtered.length} topics</span>
          {filtered.length === 0 ? (
            <p className={styles.empty}>No topics match.</p>
          ) : (
            filtered.map((card) => (
              <button
                key={card.id}
                className={`${styles.topicItem} ${selected?.id === card.id ? styles.topicActive : ''}`}
                onClick={() => selectTopic(card.id)}
              >
                <span className={styles.topicTitle}>{card.title}</span>
                <div className={styles.topicMeta}>
                  {card.tier && <span className={`${styles.dot} ${styles[`dot_${card.tier}`]}`} />}
                  {card.level && <span className={styles.topicLevel}>{card.level}</span>}
                </div>
              </button>
            ))
          )}
        </nav>

        <div className={styles.detail}>
          {mobileShowDetail && (
            <button className={styles.backBtn} onClick={() => setMobileShowDetail(false)}>
              ← Back to topics
            </button>
          )}
          {selected ? (
            <>
              <div className={styles.detailHeader}>
                <h2 className={styles.detailTitle}>{selected.title}</h2>
                <div className={styles.detailMeta}>
                  {selected.tier && <Badge label={selected.tier} variant="tier" tier={selected.tier} />}
                  {selected.level && <Badge label={selected.level} variant="level" level={selected.level} />}
                </div>
                <div className={styles.detailTags}>
                  {selected.tags.map((tag) => <Badge key={tag} label={tag} variant="tag" />)}
                </div>
              </div>
              {selected.diagram && (
                <pre className={styles.diagram}>{selected.diagram.content}</pre>
              )}
              <div className={styles.detailBody}>
                {selected.body.split('\n\n').map((para, i) => (
                  <p key={i} className={styles.para}>{para}</p>
                ))}
              </div>
            </>
          ) : (
            <p className={styles.empty}>Select a topic from the list.</p>
          )}
        </div>
      </div>
    </div>
  );
}
