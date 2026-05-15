import type { SyntaxEntry } from '@/types/content';
import CodeBlock from '@/components/shared/CodeBlock';
import styles from './CardDetail.module.scss';

interface CardDetailProps {
  entry: SyntaxEntry | null;
  onClear: () => void;
}

export default function CardDetail({ entry, onClear }: CardDetailProps) {
  if (!entry) {
    return (
      <div className={styles.hint}>
        <span className={styles.hintIcon}>↑</span>
        <p>Click any card title to pin it here for reference</p>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <h4 className={styles.title}>{entry.title}</h4>
        <button className={styles.closeBtn} onClick={onClear} aria-label="Unpin card">
          ×
        </button>
      </div>
      {entry.description && (
        <p className={styles.description}>{entry.description}</p>
      )}
      <CodeBlock code={entry.code} language={entry.language} />
    </div>
  );
}
