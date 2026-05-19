import styles from './Ribbon.module.scss';
import jsSyntax from '@/data/javascript/syntax';
import jsQna from '@/data/javascript/qna';
import jsTheory from '@/data/javascript/theory';
import jsVersions from '@/data/javascript/versions';
import htmlSyntax from '@/data/html/syntax';
import htmlQna from '@/data/html/qna';
import htmlTheory from '@/data/html/theory';
import htmlVersions from '@/data/html/versions';
import cssSyntax from '@/data/css/syntax';
import cssQna from '@/data/css/qna';
import cssTheory from '@/data/css/theory';
import cssVersions from '@/data/css/versions';
import reactSyntax from '@/data/react/syntax';
import reactQna from '@/data/react/qna';
import reactTheory from '@/data/react/theory';
import reactVersions from '@/data/react/versions';

const LANGS = [
  {
    slug: 'javascript',
    label: 'JavaScript',
    color: 'var(--color-js)',
    count: jsSyntax.length + jsQna.length + jsTheory.length + jsVersions.length,
  },
  {
    slug: 'html',
    label: 'HTML',
    color: 'var(--color-html)',
    count: htmlSyntax.length + htmlQna.length + htmlTheory.length + htmlVersions.length,
  },
  {
    slug: 'css',
    label: 'CSS',
    color: 'var(--color-css)',
    count: cssSyntax.length + cssQna.length + cssTheory.length + cssVersions.length,
  },
  {
    slug: 'react',
    label: 'React',
    color: 'var(--color-react)',
    count: reactSyntax.length + reactQna.length + reactTheory.length + reactVersions.length,
  },
];

export default function Ribbon() {
  return (
    <div className={styles.ribbon}>
      {LANGS.map((lang) => (
        <div key={lang.slug} className={styles.stat}>
          <div className={styles.lang}>
            <span className={styles.dot} style={{ background: lang.color }} />
            {lang.label}
          </div>
          <div className={styles.count}>{lang.count}</div>
          <div className={styles.sub}>cards · questions · diffs</div>
          <div className={styles.bar}>
            <span />
          </div>
        </div>
      ))}
    </div>
  );
}
