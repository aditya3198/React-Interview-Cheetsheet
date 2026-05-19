import styles from './GradeRow.module.scss';

type GradeValue = 'again' | 'almost' | 'got';

interface Props {
  revealed: boolean;
  onGrade: (grade: GradeValue) => void;
}

export default function GradeRow({ revealed, onGrade }: Props) {
  if (!revealed) {
    return (
      <div className={styles.hint}>
        Press <kbd className={styles.kbd}>Space</kbd> to reveal the answer
      </div>
    );
  }

  return (
    <div className={styles.row}>
      <span className={styles.label}>How did you do?</span>
      <div className={styles.btns}>
        <button
          className={`${styles.btn} ${styles.again}`}
          onClick={() => onGrade('again')}
          type="button"
        >
          <span className={styles.key}>1</span>
          <span className={styles.btnLabel}>Again</span>
          <span className={styles.interval}>10 min</span>
        </button>

        <button
          className={`${styles.btn} ${styles.almost}`}
          onClick={() => onGrade('almost')}
          type="button"
        >
          <span className={styles.key}>2</span>
          <span className={styles.btnLabel}>Almost</span>
          <span className={styles.interval}>2 days</span>
        </button>

        <button
          className={`${styles.btn} ${styles.got}`}
          onClick={() => onGrade('got')}
          type="button"
        >
          <span className={styles.key}>3</span>
          <span className={styles.btnLabel}>Got it</span>
          <span className={styles.interval}>7 days</span>
        </button>
      </div>
    </div>
  );
}
