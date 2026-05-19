import type { QnaItem } from '@/types/content';
import type { LanguageSlug } from '@/types/navigation';
import styles from './FlashCard.module.scss';

interface Props {
  item: QnaItem;
  lang: LanguageSlug;
  langColor: string;
  revealed: boolean;
  onReveal: () => void;
}

export default function FlashCard({ item, lang, langColor, revealed, onReveal }: Props) {
  return (
    <div className={`${styles.card} ${revealed ? styles.revealed : ''}`}>
      {/* Card meta row */}
      <div className={styles.meta}>
        <span className={styles.dot} style={{ background: langColor }} />
        <span className={styles.langLabel}>{lang}</span>
        <span className={styles.metaSep}>·</span>
        <span className={styles.section}>qna</span>
        {item.tier && (
          <span className={styles.tier} data-tier={item.tier}>{item.tier}</span>
        )}
        {item.difficulty && (
          <span className={styles.diff} data-diff={item.difficulty}>{item.difficulty}</span>
        )}
      </div>

      {/* Question */}
      <h2 className={styles.question}>{item.question}</h2>

      {/* Answer side */}
      {!revealed ? (
        <button className={styles.revealBtn} onClick={onReveal} type="button">
          Reveal answer
          <kbd className={styles.kbd}>Space</kbd>
        </button>
      ) : (
        <div className={styles.answer}>
          <div className={styles.divider} />
          <p className={styles.answerText}>{item.answer}</p>
          {item.codeExample && (
            <pre className={styles.code}>{item.codeExample}</pre>
          )}
        </div>
      )}
    </div>
  );
}
