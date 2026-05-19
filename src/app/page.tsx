import Link from 'next/link';
import HeroContent from '@/components/HeroContent';
import Ribbon from '@/components/home/Ribbon';
import StudyPathCard from '@/components/home/StudyPathCard';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.heroWrap}>
        <HeroContent />
        <div className={styles.ribbonWrap}>
          <Ribbon />
        </div>
      </div>

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
        <span>frontprep · open source</span>
        <div className={styles.footRight}>
          <a href="https://github.com/aditya3198/React-Interview-Cheetsheet" target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link href="/hub">Roadmap</Link>
        </div>
      </footer>
    </main>
  );
}
