'use client';

import type { Tier, Level } from '@/types/content';
import styles from './ClassificationFilter.module.scss';

interface ClassificationFilterProps {
  activeTier: Tier | null;
  activeLevel: Level | null;
  onTierChange: (tier: Tier | null) => void;
  onLevelChange: (level: Level | null) => void;
}

const TIER_META: { value: Tier; label: string; desc: string }[] = [
  { value: 'core', label: 'Core', desc: 'Service-based companies' },
  { value: 'advanced', label: 'Advanced', desc: 'Product-based companies' },
];

const LEVEL_META: { value: Level; label: string }[] = [
  { value: 'fresher', label: 'Fresher' },
  { value: 'experienced', label: 'Experienced' },
  { value: 'expert', label: 'Expert' },
];

export default function ClassificationFilter({
  activeTier,
  activeLevel,
  onTierChange,
  onLevelChange,
}: ClassificationFilterProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Type</span>
        <div className={styles.pills}>
          <button
            className={`${styles.pill} ${activeTier === null ? styles.pillActive : ''}`}
            onClick={() => onTierChange(null)}
          >
            All
          </button>
          {TIER_META.map(({ value, label, desc }) => (
            <button
              key={value}
              className={`${styles.pill} ${styles[`pill_${value}`]} ${activeTier === value ? styles.pillActive : ''}`}
              onClick={() => onTierChange(activeTier === value ? null : value)}
              title={desc}
            >
              <span className={styles.tierDot} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Level</span>
        <div className={styles.pills}>
          <button
            className={`${styles.pill} ${activeLevel === null ? styles.pillActive : ''}`}
            onClick={() => onLevelChange(null)}
          >
            All
          </button>
          {LEVEL_META.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.pill} ${styles[`pill_${value}`]} ${activeLevel === value ? styles.pillActive : ''}`}
              onClick={() => onLevelChange(activeLevel === value ? null : value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
