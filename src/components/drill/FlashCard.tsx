'use client';

import type { QnaItem } from '@/types/content';
import type { LanguageSlug } from '@/types/navigation';
import CodeBlock from '@/components/shared/CodeBlock';
import styles from './FlashCard.module.scss';

interface Props {
  item: QnaItem & { lang: LanguageSlug; key: string };
  lang: LanguageSlug;
  langColor: string;
  revealed: boolean;
  onReveal: () => void;
}

const LANG_LABEL: Record<LanguageSlug, string> = {
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  react: 'React',
  typescript: 'TypeScript',
};

export default function FlashCard({ item, lang, langColor, revealed, onReveal }: Props) {
  return (
    <div className={`${styles.card} ${revealed ? styles.revealed : ''}`}>
      {/* ── Meta row ── */}
      <div className={styles.meta}>
        <span className={styles.dot} style={{ background: langColor }} />
        <span className={styles.langLabel}>{LANG_LABEL[lang]}</span>
        <span className={styles.metaSep}>·</span>
        <span className={styles.section}>Q&A</span>
        {item.tier && (
          <span className={styles.tier} data-tier={item.tier}>{item.tier}</span>
        )}
        {item.difficulty && (
          <span className={styles.diff} data-diff={item.difficulty}>{item.difficulty}</span>
        )}
      </div>

      {/* ── Question ── */}
      <h2 className={styles.question}>{item.question}</h2>

      {/* ── Answer side ── */}
      {!revealed ? (
        <button className={styles.revealBtn} onClick={onReveal} type="button">
          Reveal answer
          <kbd className={styles.kbd}>Space</kbd>
        </button>
      ) : (
        <div className={styles.answer}>
          <div className={styles.divider} />
          {item.answer.split('\n\n').map((para, i) => (
            <p key={i} className={styles.answerText}>{para}</p>
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
            <div className={styles.tags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
