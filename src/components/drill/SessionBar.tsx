'use client';

import styles from './SessionBar.module.scss';

type GradeValue = 'again' | 'ok' | 'got';

interface Props {
  current: number;
  total: number;
  grades: GradeValue[];
}

export default function SessionBar({ current, total, grades }: Props) {
  const got   = grades.filter((g) => g === 'got').length;
  const ok    = grades.filter((g) => g === 'ok').length;
  const again = grades.filter((g) => g === 'again').length;

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <span className={styles.count}>
          {current + 1} <span className={styles.of}>/ {total}</span>
        </span>
        <div className={styles.tally}>
          {got   > 0 && <span className={styles.tallyChip} data-grade="got"  >{got} got</span>}
          {ok    > 0 && <span className={styles.tallyChip} data-grade="ok"   >{ok} ok</span>}
          {again > 0 && <span className={styles.tallyChip} data-grade="again">{again} again</span>}
        </div>
      </div>

      {/* Segmented progress track */}
      <div className={styles.track} aria-label={`Card ${current + 1} of ${total}`}>
        {Array.from({ length: total }).map((_, i) => {
          const grade = grades[i];
          return (
            <div
              key={i}
              className={styles.seg}
              data-state={i < grades.length ? grade : i === current ? 'active' : 'empty'}
            />
          );
        })}
      </div>
    </div>
  );
}
