'use client';

import { useState } from 'react';
import type { ConceptCard } from '@/types/content';
import type { LanguageSlug } from '@/types/navigation';
import { getLanguageMeta } from '@/data/navigation';
import styles from './TheorySection.module.scss';

interface TheorySectionProps {
  cards: ConceptCard[];
  language?: LanguageSlug;
}

export default function TheorySection({ cards, language = 'javascript' }: TheorySectionProps) {
  const [idx, setIdx] = useState(0);
  const card = cards[idx] ?? null;
  const prev = idx > 0 ? cards[idx - 1] : null;
  const next = idx < cards.length - 1 ? cards[idx + 1] : null;
  const pct = cards.length > 0 ? Math.round(((idx + 1) / cards.length) * 100) : 0;
  const langMeta = getLanguageMeta(language);

  if (!card) {
    return <p className={styles.empty}>No chapters available.</p>;
  }

  return (
    <div className={styles.shell}>
      {/* Article */}
      <article className={styles.article}>
        <p className={styles.eyebrow}>
          Chapter {idx + 1}
          <span className={styles.eyebrowStack}>{langMeta?.label ?? language} · Theory</span>
        </p>

        <h1 className={styles.h1}>{card.title}</h1>
        <p className={styles.dek}>{card.summary}</p>

        <div className={styles.byline}>
          <span>Chapter {idx + 1} of {cards.length}</span>
          {card.tier && <><span className={styles.bylineSep}>·</span><span>{card.tier}</span></>}
          {card.level && <><span className={styles.bylineSep}>·</span><span>{card.level}</span></>}
        </div>

        <div className={styles.body}>
          {card.body.split('\n\n').map((para, i) => (
            <p key={i} className={i === 0 ? styles.lead : undefined}>{para}</p>
          ))}

          {card.diagram && (
            <figure className={styles.figure}>
              <pre className={styles.diagram}>{card.diagram.content}</pre>
              <figcaption className={styles.figcaption}>
                <b>Diagram:</b> {card.title}
              </figcaption>
            </figure>
          )}
        </div>

        {/* Prev / Next pager */}
        <nav className={styles.pager}>
          {prev ? (
            <button className={styles.pagerCard} onClick={() => { setIdx(idx - 1); window.scrollTo(0, 0); }} type="button">
              <span className={styles.pagerDir}>← Previous</span>
              <span className={styles.pagerTitle}>{prev.title}</span>
            </button>
          ) : <div />}
          {next ? (
            <button className={`${styles.pagerCard} ${styles.pagerNext}`} onClick={() => { setIdx(idx + 1); window.scrollTo(0, 0); }} type="button">
              <span className={styles.pagerDir}>Next →</span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </button>
          ) : <div />}
        </nav>
      </article>

      {/* Right rail */}
      <aside className={styles.rail}>
        <div className={styles.railProgress}>
          <div className={styles.railProgressLabel}>{pct}% · Chapter {idx + 1} of {cards.length}</div>
          <div className={styles.railBar}>
            <span className={styles.railFill} style={{ width: `${pct}%` }} />
          </div>
        </div>

        <h4 className={styles.railHeading}>Chapters</h4>
        <nav className={styles.chapterList}>
          {cards.map((c, i) => (
            <button
              key={c.id}
              className={`${styles.chapterItem} ${i === idx ? styles.chapterActive : ''}`}
              onClick={() => { setIdx(i); window.scrollTo(0, 0); }}
              type="button"
            >
              <span className={styles.chapterNum}>{i + 1}</span>
              <span className={styles.chapterTitle}>{c.title}</span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}
