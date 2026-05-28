import Link from 'next/link';
import HeroContent from '@/components/HeroContent';
import Ribbon from '@/components/home/Ribbon';
import StudyPathCard from '@/components/home/StudyPathCard';
import styles from './page.module.scss';

// Section data counts (all four stacks combined)
import jsSyntax from '@/data/javascript/syntax';
import jsTheory from '@/data/javascript/theory';
import jsVersions from '@/data/javascript/versions';
import jsQna from '@/data/javascript/qna';
import htmlSyntax from '@/data/html/syntax';
import htmlTheory from '@/data/html/theory';
import htmlVersions from '@/data/html/versions';
import htmlPlayground from '@/data/html/playground';
import htmlQna from '@/data/html/qna';
import cssSyntax from '@/data/css/syntax';
import cssTheory from '@/data/css/theory';
import cssVersions from '@/data/css/versions';
import cssPlayground from '@/data/css/playground';
import cssQna from '@/data/css/qna';
import reactSyntax from '@/data/react/syntax';
import reactTheory from '@/data/react/theory';
import reactVersions from '@/data/react/versions';
import reactQna from '@/data/react/qna';

const SURFACES = [
  {
    glyph: '§',
    href: '/javascript/theory',
    title: 'Theory',
    count: jsTheory.length + htmlTheory.length + cssTheory.length + reactTheory.length,
    desc: 'Chapter-length articles with diagrams, drop-caps, and code examples — the conceptual backbone.',
    link: 'Browse chapters',
  },
  {
    glyph: '{ }',
    href: '/javascript/syntax',
    title: 'Syntax',
    count: jsSyntax.length + htmlSyntax.length + cssSyntax.length + reactSyntax.length,
    desc: 'One-concept cards: snippet, explanation, and annotated output. Pin the tricky ones.',
    link: 'Open card grid',
  },
  {
    glyph: 'v.',
    href: '/javascript/versions',
    title: 'Versions',
    count: jsVersions.length + htmlVersions.length + cssVersions.length + reactVersions.length,
    desc: 'Before/after diffs across every ES/CSS/React release — what changed and why it shipped.',
    link: 'View diffs',
  },
  {
    glyph: '▷',
    href: '/javascript/playground',
    title: 'Playground',
    count: htmlPlayground.length + cssPlayground.length,
    desc: 'Live runnable sandboxes: toggle controls and watch the output update in real time.',
    link: 'Open sandbox',
  },
  {
    glyph: '?',
    href: '/qa',
    title: 'Q&A',
    count: jsQna.length + htmlQna.length + cssQna.length + reactQna.length,
    desc: 'Core and advanced questions, segmented by level (Fresher / Experienced / Expert).',
    link: 'Read Q&A',
  },
  {
    glyph: '↻',
    href: '/drill',
    title: 'Drill',
    count: null,
    desc: 'SM-2 flashcard loop. Pick your stacks, level, and sources — the scheduler finds your weak spots.',
    link: 'Start a session',
  },
] as const;

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.heroWrap}>
        <HeroContent />
        <div className={styles.ribbonWrap}>
          <Ribbon />
        </div>
      </div>

      {/* Six surfaces */}
      <section className={styles.surfaces}>
        <div className={styles.surfacesHead}>
          <p className={styles.surfacesEyebrow}>six surfaces</p>
          <h2 className={styles.surfacesTitle}>Everything you need to revise, in one place.</h2>
        </div>
        <div className={styles.surfacesGrid}>
          {SURFACES.map((s) => (
            <Link key={s.title} href={s.href} className={styles.surfaceCard}>
              <div className={styles.surfaceTop}>
                <span className={styles.surfaceGlyph}>{s.glyph}</span>
                {s.count !== null && (
                  <span className={styles.surfaceCount}>{s.count}</span>
                )}
              </div>
              <h3 className={styles.surfaceTitle}>{s.title}</h3>
              <p className={styles.surfaceDesc}>{s.desc}</p>
              <span className={styles.surfaceLink}>{s.link} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Study paths */}
      <section className={styles.paths}>
        <div className={styles.pathsHead}>
          <h2 className={styles.pathsTitle}>How people use it</h2>
          <p className={styles.pathsSub}>Pick the mode that matches the hours you have left.</p>
        </div>
        <div className={styles.pathsGrid}>
          <StudyPathCard
            tag="Path · 2 weeks"
            name="Full revision"
            description="Walk every topic across JS/HTML/CSS/React. Marks each card 'I know this' or 'Review again' so you can return to weak spots."
            time="~14 days"
            href="/hub"
          />
          <StudyPathCard
            tag="Path · 10 min"
            name="Daily drill"
            description="Flashcard-style. 10 questions, pulled from topics you've marked weak. Builds a streak so revising sticks."
            time="~10 min/day"
            href="/drill"
          />
          <StudyPathCard
            tag="Path · interview-eve"
            name="Tomorrow I have an interview"
            description="A curated 90-minute sprint of the questions most asked across the stack you select. No theory rabbit holes."
            time="~90 min"
            href="/hub"
          />
        </div>
      </section>

      <footer className={styles.foot}>
        <span>Statecraft · open source</span>
        <div className={styles.footRight}>
          <a href="https://github.com/aditya3198/React-Interview-Cheetsheet" target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link href="/hub">Hub</Link>
        </div>
      </footer>
    </main>
  );
}
