'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProgressStore } from '@/store/useProgressStore';
import { LANGUAGES } from '@/data/navigation';
import type { LanguageSlug } from '@/types/navigation';
import type { QnaItem } from '@/types/content';
import type { CardState } from '@/store/useProgressStore';
import FlashCard from '@/components/drill/FlashCard';
import GradeRow from '@/components/drill/GradeRow';
import SessionBar from '@/components/drill/SessionBar';
import styles from './page.module.scss';

import jsQna from '@/data/javascript/qna';
import htmlQna from '@/data/html/qna';
import cssQna from '@/data/css/qna';
import reactQna from '@/data/react/qna';

const QNA_BY_LANG: Record<LanguageSlug, QnaItem[]> = {
  javascript: jsQna,
  html: htmlQna,
  css: cssQna,
  react: reactQna,
};

const ALL_LANGS: LanguageSlug[] = ['javascript', 'html', 'css', 'react'];

type DrillCard = QnaItem & { lang: LanguageSlug; key: string };
type GradeValue = 'again' | 'almost' | 'got';

function buildQueue(
  lang: LanguageSlug | null,
  source: string | null,
  cards: Record<string, CardState>
): DrillCard[] {
  const langs = lang ? [lang] : ALL_LANGS;
  const all: DrillCard[] = [];

  for (const l of langs) {
    for (const item of QNA_BY_LANG[l]) {
      all.push({ ...item, lang: l, key: `${l}/qna/${item.id}` });
    }
  }

  if (source === 'review') {
    return all.filter((c) => cards[c.key]?.status === 'review');
  }

  // Default: random 10-card session weighted toward unseen/due cards
  const now = Date.now();
  const due = all.filter((c) => cards[c.key]?.dueAt != null && cards[c.key].dueAt <= now);
  const unseen = all.filter((c) => !cards[c.key]);
  const rest = all.filter((c) => cards[c.key] && (cards[c.key].dueAt == null || cards[c.key].dueAt > now));

  const shuffled = [
    ...due.sort(() => Math.random() - 0.5),
    ...unseen.sort(() => Math.random() - 0.5),
    ...rest.sort(() => Math.random() - 0.5),
  ];

  return shuffled.slice(0, 10);
}

function DrillInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grade = useProgressStore((s) => s.grade);
  const tickStreak = useProgressStore((s) => s.tickStreak);
  const cards = useProgressStore((s) => s.cards);

  const langParam = searchParams.get('lang') as LanguageSlug | null;
  const source = searchParams.get('source');

  const [queue] = useState<DrillCard[]>(() => buildQueue(langParam, source, cards));
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [sessionGrades, setSessionGrades] = useState<GradeValue[]>([]);

  const langMeta = langParam ? LANGUAGES.find((l) => l.slug === langParam) : null;

  const reveal = useCallback(() => setRevealed(true), []);

  const handleGrade = useCallback((g: GradeValue) => {
    const card = queue[idx];
    grade(card.key, g);
    setSessionGrades((prev) => [...prev, g]);
    if (idx + 1 >= queue.length) {
      tickStreak();
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setRevealed(false);
    }
  }, [idx, queue, grade, tickStreak]);

  const endSession = useCallback(() => {
    tickStreak();
    router.push('/hub');
  }, [tickStreak, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (done) return;

      if (e.key === 'Escape') { endSession(); return; }
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (!revealed) reveal();
        return;
      }
      if (revealed) {
        if (e.key === '1') handleGrade('again');
        if (e.key === '2') handleGrade('almost');
        if (e.key === '3') handleGrade('got');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [done, revealed, reveal, handleGrade, endSession]);

  // ── Empty queue ────────────────────────────────────────
  if (queue.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.wrap}>
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>○</div>
            <p className={styles.emptyTitle}>No cards to drill.</p>
            <p className={styles.emptyDesc}>
              {source === 'review'
                ? 'You have no cards marked for review — keep studying!'
                : 'Something went wrong building the card queue.'}
            </p>
            <Link href="/hub" className={styles.backLink}>← Back to Hub</Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Session summary ────────────────────────────────────
  if (done) {
    const got    = sessionGrades.filter((g) => g === 'got').length;
    const almost = sessionGrades.filter((g) => g === 'almost').length;
    const again  = sessionGrades.filter((g) => g === 'again').length;

    return (
      <main className={styles.page}>
        <div className={styles.wrap}>
          <div className={styles.summary}>
            <div className={styles.summaryIcon}>✓</div>
            <h1 className={styles.summaryTitle}>Session complete</h1>
            <p className={styles.summaryDesc}>{sessionGrades.length} card{sessionGrades.length !== 1 ? 's' : ''} reviewed</p>

            <div className={styles.summaryStats}>
              <div className={styles.statChip} data-grade="got">
                <span className={styles.statNum}>{got}</span>
                <span className={styles.statLabel}>Got it</span>
              </div>
              <div className={styles.statChip} data-grade="almost">
                <span className={styles.statNum}>{almost}</span>
                <span className={styles.statLabel}>Almost</span>
              </div>
              <div className={styles.statChip} data-grade="again">
                <span className={styles.statNum}>{again}</span>
                <span className={styles.statLabel}>Again</span>
              </div>
            </div>

            <div className={styles.summaryActions}>
              <Link href="/hub" className={styles.btnPrimary}>Back to Hub</Link>
              <Link href="/drill" className={styles.btnGhost}>Drill again</Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Active drill ───────────────────────────────────────
  const current = queue[idx];
  const langColor = LANGUAGES.find((l) => l.slug === current.lang)?.color ?? 'var(--color-primary)';

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.crumbs}>
            <Link href="/hub" className={styles.crumbLink}>Hub</Link>
            <span className={styles.sep}>/</span>
            <span>Drill</span>
            {langMeta && (
              <>
                <span className={styles.sep}>/</span>
                <span>{langMeta.label}</span>
              </>
            )}
          </div>
          <button className={styles.endBtn} onClick={endSession} type="button">
            End session <kbd className={styles.kbd}>Esc</kbd>
          </button>
        </div>

        {/* Progress */}
        <SessionBar
          current={idx}
          total={queue.length}
          grades={sessionGrades}
        />

        {/* Flashcard */}
        <FlashCard
          item={current}
          lang={current.lang}
          langColor={langColor}
          revealed={revealed}
          onReveal={reveal}
        />

        {/* Grade row */}
        <GradeRow revealed={revealed} onGrade={handleGrade} />
      </div>
    </main>
  );
}

export default function DrillPage() {
  return (
    <Suspense fallback={<main style={{ minHeight: '100vh', background: 'var(--color-bg-deep)' }} />}>
      <DrillInner />
    </Suspense>
  );
}
