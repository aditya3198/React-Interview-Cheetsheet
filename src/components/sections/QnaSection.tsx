'use client';

import { useState, useMemo } from 'react';
import type { QnaItem, Tier, QnaDifficulty } from '@/types/content';
import CodeBlock from '@/components/shared/CodeBlock';
import styles from './QnaSection.module.scss';

interface QnaSectionProps {
  items: QnaItem[];
}

const LEVEL_META: Record<QnaDifficulty, { label: string; color: string; desc: string }> = {
  fresher:    { label: 'Fresher',    color: 'var(--level-easy)', desc: 'Entry-level — roles up to 1 year experience' },
  experienced:{ label: 'Experienced',color: 'var(--level-med)',  desc: 'Mid-level — 2–5 years, system awareness expected' },
  expert:     { label: 'Expert',     color: 'var(--level-hard)', desc: 'Senior / architect level — deep internals and design' },
};

const LEVELS: QnaDifficulty[] = ['fresher', 'experienced', 'expert'];

export default function QnaSection({ items }: QnaSectionProps) {
  const [activeTab, setActiveTab] = useState<Tier | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => {
      if (activeTab && item.tier !== activeTab) return false;
      if (q && !item.question.toLowerCase().includes(q) && !item.answer.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [items, activeTab, search]);

  const byLevel = useMemo(() => {
    const map: Record<QnaDifficulty, QnaItem[]> = { fresher: [], experienced: [], expert: [] };
    filtered.forEach((item) => {
      (map[item.difficulty] ??= []).push(item);
    });
    return map;
  }, [filtered]);

  const coreCount = items.filter((i) => i.tier === 'core').length;
  const advCount  = items.filter((i) => i.tier === 'advanced').length;

  return (
    <div className={styles.section}>
      {/* Controls */}
      <div className={styles.controls}>
        {/* Section tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === null ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(null)}
            type="button"
          >
            All <span className={styles.tabCount}>{items.length}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'core' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(activeTab === 'core' ? null : 'core')}
            type="button"
          >
            Core <span className={styles.tabCount}>{coreCount}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'advanced' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(activeTab === 'advanced' ? null : 'advanced')}
            type="button"
          >
            Advanced <span className={styles.tabCount}>{advCount}</span>
          </button>
        </div>

        {/* Search */}
        <label className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Search questions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </label>
      </div>

      {filtered.length === 0 && (
        <p className={styles.empty}>No questions match your filters.</p>
      )}

      {/* Level blocks */}
      <div className={styles.levels}>
        {LEVELS.map((level) => {
          const qs = byLevel[level];
          if (qs.length === 0) return null;
          const meta = LEVEL_META[level];
          return (
            <section key={level} className={styles.levelBlock}>
              <div className={`${styles.levelHead} ${styles[`level_${level}`]}`}>
                <span className={styles.levelDot} style={{ background: meta.color }} />
                <span className={styles.levelLabel}>{meta.label}</span>
                <span className={styles.levelDesc}>{meta.desc}</span>
                <div className={styles.levelRight}>
                  <span><b>{qs.length}</b> questions</span>
                </div>
              </div>

              <div className={styles.qList}>
                {qs.map((item, qi) => (
                  <details key={item.id} className={styles.q}>
                    <summary className={styles.summary}>
                      <span className={styles.twist} aria-hidden="true">▶</span>
                      <span className={styles.qNum}>Q{qi + 1}</span>
                      <span className={styles.qText}>{item.question}</span>
                      <span className={styles.qMeta}>
                        {item.tier && (
                          <span className={styles.qPill}>{item.tier}</span>
                        )}
                      </span>
                    </summary>

                    <div className={styles.ans}>
                      {item.answer.split('\n\n').map((para, pi) => (
                        <p key={pi} className={styles.ansPara}>{para}</p>
                      ))}
                      {item.codeExample && (
                        <div className={styles.codeWrap}>
                          <CodeBlock
                            code={item.codeExample}
                            language={item.codeLanguage ?? 'javascript'}
                          />
                        </div>
                      )}
                      {item.tags.length > 0 && (
                        <div className={styles.ansTags}>
                          {item.tags.map((tag) => (
                            <span key={tag} className={styles.ansTag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
