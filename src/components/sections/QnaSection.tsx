'use client';

import { useState, useMemo } from 'react';
import type { QnaItem, QnaDifficulty, Tier } from '@/types/content';
import type { Level } from '@/types/content';
import Accordion from '@/components/shared/Accordion';
import Badge from '@/components/shared/Badge';
import CodeBlock from '@/components/shared/CodeBlock';
import ClassificationFilter from '@/components/shared/ClassificationFilter';
import styles from './QnaSection.module.scss';

interface QnaSectionProps {
  items: QnaItem[];
}

const DIFFICULTY_COLORS: Record<QnaDifficulty, string> = {
  fresher: 'var(--color-fresher)',
  experienced: 'var(--color-experienced)',
  expert: 'var(--color-expert)',
};

export default function QnaSection({ items }: QnaSectionProps) {
  const [activeTier, setActiveTier] = useState<Tier | null>(null);
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (activeTier && item.tier && item.tier !== activeTier) return false;
      if (activeLevel && item.difficulty !== activeLevel) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, activeTier, activeLevel, search]);

  const accordionItems = filtered.map((item) => ({
    id: item.id,
    trigger: (
      <div className={styles.question}>
        <span className={styles.questionText}>{item.question}</span>
        <div className={styles.questionBadges}>
          {item.tier && (
            <Badge label={item.tier} variant="tier" tier={item.tier} />
          )}
          <span
            className={styles.diffBadge}
            style={{ color: DIFFICULTY_COLORS[item.difficulty] }}
          >
            {item.difficulty}
          </span>
        </div>
      </div>
    ),
    content: (
      <div className={styles.answer}>
        {item.answer.split('\n\n').map((para, i) => (
          <p key={i} className={styles.answerPara}>{para}</p>
        ))}
        {item.codeExample && (
          <div className={styles.codeWrapper}>
            <CodeBlock code={item.codeExample} language={item.codeLanguage ?? 'javascript'} />
          </div>
        )}
        <div className={styles.answerTags}>
          {item.tags.map((tag) => <Badge key={tag} label={tag} variant="tag" />)}
        </div>
      </div>
    ),
  }));

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
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>No questions match your filters.</p>
      ) : (
        <Accordion items={accordionItems} allowMultiple />
      )}
    </div>
  );
}
