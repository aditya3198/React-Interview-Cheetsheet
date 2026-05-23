'use client';

import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useProgressStore } from '@/store/useProgressStore';
import { LANGUAGES } from '@/data/navigation';
import type { LanguageSlug } from '@/types/navigation';
import type { QnaItem, QnaDifficulty } from '@/types/content';
import type { CardProgress } from '@/types/lantern';
import FlashCard from '@/components/drill/FlashCard';
import GradeRow from '@/components/drill/GradeRow';
import SessionBar from '@/components/drill/SessionBar';
import styles from './page.module.scss';

import jsQna from '@/data/javascript/qna';
import htmlQna from '@/data/html/qna';
import cssQna from '@/data/css/qna';
import reactQna from '@/data/react/qna';

// ── Data ──────────────────────────────────────────────────

const QNA_BY_LANG: Record<LanguageSlug, QnaItem[]> = {
  javascript: jsQna,
  html: htmlQna,
  css: cssQna,
  react: reactQna,
};

const ALL_LANGS: LanguageSlug[] = ['javascript', 'html', 'css', 'react'];

const LANG_DISPLAY: Record<LanguageSlug, string> = {
  javascript: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  react: 'React',
};

// ── Types ─────────────────────────────────────────────────

type DrillCard = QnaItem & { lang: LanguageSlug; key: string };
type GradeValue = 'again' | 'ok' | 'got';
type Phase = 'setup' | 'session' | 'done';

interface SetupConfig {
  langs: LanguageSlug[];
  level: QnaDifficulty;
  sources: ('core' | 'advanced')[];
  size: 10 | 20 | 50 | 'all-weak';
}

// ── Queue builders ────────────────────────────────────────

function buildQueueFromSetup(
  cfg: SetupConfig,
  cards: Record<string, CardProgress>,
): DrillCard[] {
  const all: DrillCard[] = [];
  for (const l of cfg.langs) {
    for (const item of QNA_BY_LANG[l]) {
      if (item.difficulty !== cfg.level) continue;
      const tier = (item.tier ?? 'core') as 'core' | 'advanced';
      if (!cfg.sources.includes(tier)) continue;
      all.push({ ...item, lang: l, key: `${l}/qna/${item.id}` });
    }
  }

  if (cfg.size === 'all-weak') {
    return all.filter((c) => cards[c.key]?.flaggedWeak).sort(() => Math.random() - 0.5);
  }

  const now = Date.now();
  const due    = all.filter((c) => cards[c.key] && Date.parse(cards[c.key].due) <= now);
  const dueSet = new Set(due.map((c) => c.key));
  const weak   = all.filter((c) => cards[c.key]?.flaggedWeak && !dueSet.has(c.key));
  const weakSet = new Set(weak.map((c) => c.key));
  const unseen = all.filter((c) => !cards[c.key]);
  const rest   = all.filter((c) => cards[c.key] && !dueSet.has(c.key) && !weakSet.has(c.key));

  return [
    ...due.sort(() => Math.random() - 0.5),
    ...weak.sort(() => Math.random() - 0.5),
    ...unseen.sort(() => Math.random() - 0.5),
    ...rest.sort(() => Math.random() - 0.5),
  ].slice(0, cfg.size);
}

// Used for URL-param driven sessions (from Hub CTAs)
function buildQueueFromParams(
  lang: LanguageSlug | null,
  source: string | null,
  cards: Record<string, CardProgress>,
): DrillCard[] {
  const langs = lang ? [lang] : ALL_LANGS;
  const all: DrillCard[] = [];

  for (const l of langs) {
    for (const item of QNA_BY_LANG[l]) {
      all.push({ ...item, lang: l, key: `${l}/qna/${item.id}` });
    }
  }

  if (source === 'review') {
    return all.filter((c) => cards[c.key]?.flaggedWeak).sort(() => Math.random() - 0.5);
  }

  const now = Date.now();
  const due    = all.filter((c) => cards[c.key]?.due != null && Date.parse(cards[c.key].due) <= now);
  const unseen = all.filter((c) => !cards[c.key]);
  const rest   = all.filter((c) => cards[c.key] && Date.parse(cards[c.key].due) > now);

  return [
    ...due.sort(() => Math.random() - 0.5),
    ...unseen.sort(() => Math.random() - 0.5),
    ...rest.sort(() => Math.random() - 0.5),
  ].slice(0, 20);
}

// ── Setup screen ──────────────────────────────────────────

interface SetupScreenProps {
  initialLang: LanguageSlug | null;
  cards: Record<string, CardProgress>;
  onStart: (queue: DrillCard[]) => void;
}

function SetupScreen({ initialLang, cards, onStart }: SetupScreenProps) {
  const [langs, setLangs]     = useState<LanguageSlug[]>(initialLang ? [initialLang] : ['javascript']);
  const [level, setLevel]     = useState<QnaDifficulty>('fresher');
  const [sources, setSources] = useState<('core' | 'advanced')[]>(['core']);
  const [size, setSize]       = useState<10 | 20 | 50 | 'all-weak'>(20);

  function toggleLang(l: LanguageSlug) {
    setLangs((prev) =>
      prev.includes(l) ? (prev.length > 1 ? prev.filter((x) => x !== l) : prev) : [...prev, l],
    );
  }

  function toggleSource(s: 'core' | 'advanced') {
    setSources((prev) =>
      prev.includes(s) ? (prev.length > 1 ? prev.filter((x) => x !== s) : prev) : [...prev, s],
    );
  }

  const previewQueue = useMemo(
    () => buildQueueFromSetup({ langs, level, sources, size }, cards),
    [langs, level, sources, size, cards],
  );

  const summaryLine = useMemo(() => {
    if (previewQueue.length === 0) return 'No cards match this combination.';
    const langStr = langs.map((l) => LANG_DISPLAY[l]).join(' & ');
    const srcStr  = sources.map((s) => (s === 'core' ? 'Core Q&A' : 'Adv Q&A')).join(' + ');
    return `${previewQueue.length} cards · ${langStr}, ${level} — ${srcStr}.`;
  }, [previewQueue.length, langs, level, sources]);

  const LEVELS: QnaDifficulty[] = ['fresher', 'experienced', 'expert'];
  const SIZES = [10, 20, 50, 'all-weak'] as const;

  return (
    <main className={styles.page}>
      <div className={styles.setupWrap}>
        <div className={styles.setupHead}>
          <span className={styles.setupGlyph}>↻</span>
          <h1 className={styles.setupTitle}>Drill</h1>
        </div>

        {/* ── Stack ── */}
        <div className={styles.setupSection}>
          <span className={styles.setupLabel}>Stack</span>
          <div className={styles.chipGroup}>
            {LANGUAGES.map((l) => (
              <button
                key={l.slug}
                className={`${styles.chip} ${langs.includes(l.slug) ? styles.chipActive : ''}`}
                onClick={() => toggleLang(l.slug)}
                style={langs.includes(l.slug) ? { borderColor: l.color, color: l.color } : undefined}
                type="button"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Level ── */}
        <div className={styles.setupSection}>
          <span className={styles.setupLabel}>Level</span>
          <div className={styles.levelGroup}>
            {LEVELS.map((lv) => (
              <button
                key={lv}
                className={`${styles.levelBtn} ${level === lv ? styles.levelActive : ''}`}
                onClick={() => setLevel(lv)}
                type="button"
              >
                {lv.charAt(0).toUpperCase() + lv.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ── Sources ── */}
        <div className={styles.setupSection}>
          <span className={styles.setupLabel}>From</span>
          <div className={styles.chipGroup}>
            {(['core', 'advanced'] as const).map((s) => (
              <button
                key={s}
                className={`${styles.chip} ${sources.includes(s) ? styles.chipActive : ''}`}
                onClick={() => toggleSource(s)}
                type="button"
              >
                {s === 'core' ? 'Core Q&A' : 'Advanced Q&A'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Size ── */}
        <div className={styles.setupSection}>
          <span className={styles.setupLabel}>Size</span>
          <div className={styles.sizeGroup}>
            {SIZES.map((s) => (
              <button
                key={String(s)}
                className={`${styles.sizePill} ${size === s ? styles.sizePillActive : ''}`}
                onClick={() => setSize(s)}
                type="button"
              >
                {s === 'all-weak' ? 'All weak' : s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={styles.setupFooter}>
          <p className={styles.setupSummary}>{summaryLine}</p>
          <button
            className={styles.startBtn}
            onClick={() => previewQueue.length > 0 && onStart(previewQueue)}
            disabled={previewQueue.length === 0}
            type="button"
          >
            Start drill →
          </button>
        </div>
      </div>
    </main>
  );
}

// ── Main drill inner ──────────────────────────────────────

function DrillInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const grade        = useProgressStore((s) => s.grade);
  const tickStreak   = useProgressStore((s) => s.tickStreak);
  const cards        = useProgressStore((s) => s.cards);

  const langParam = searchParams.get('lang') as LanguageSlug | null;
  const source    = searchParams.get('source');
  const hasParams = langParam !== null || source !== null;

  const [phase, setPhase]               = useState<Phase>(hasParams ? 'session' : 'setup');
  const [queue, setQueue]               = useState<DrillCard[]>(() =>
    hasParams ? buildQueueFromParams(langParam, source, cards) : [],
  );
  const [idx, setIdx]                   = useState(0);
  const [revealed, setRevealed]         = useState(false);
  const [sessionGrades, setSessionGrades] = useState<GradeValue[]>([]);

  const langMeta = langParam ? LANGUAGES.find((l) => l.slug === langParam) : null;

  function startSession(q: DrillCard[]) {
    setQueue(q);
    setIdx(0);
    setRevealed(false);
    setSessionGrades([]);
    setPhase('session');
  }

  const reveal = useCallback(() => setRevealed(true), []);

  const handleGrade = useCallback(
    (g: GradeValue) => {
      const card = queue[idx];
      grade(card.key, g);
      setSessionGrades((prev) => [...prev, g]);
      if (idx + 1 >= queue.length) {
        tickStreak();
        setPhase('done');
      } else {
        setIdx((i) => i + 1);
        setRevealed(false);
      }
    },
    [idx, queue, grade, tickStreak],
  );

  const endSession = useCallback(() => {
    tickStreak();
    router.push('/hub');
  }, [tickStreak, router]);

  useEffect(() => {
    if (phase !== 'session') return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'Escape') { endSession(); return; }
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (!revealed) reveal();
        return;
      }
      if (revealed) {
        if (e.key === '1') handleGrade('again');
        if (e.key === '2') handleGrade('ok');
        if (e.key === '3') handleGrade('got');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, revealed, reveal, handleGrade, endSession]);

  // ── Setup ──────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <SetupScreen
        initialLang={langParam}
        cards={cards}
        onStart={startSession}
      />
    );
  }

  // ── Empty queue (param-driven only) ───────────────────
  if (phase === 'session' && queue.length === 0) {
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
  if (phase === 'done') {
    const got   = sessionGrades.filter((g) => g === 'got').length;
    const ok    = sessionGrades.filter((g) => g === 'ok').length;
    const again = sessionGrades.filter((g) => g === 'again').length;

    return (
      <main className={styles.page}>
        <div className={styles.wrap}>
          <div className={styles.summary}>
            <div className={styles.summaryIcon}>✓</div>
            <h1 className={styles.summaryTitle}>Session complete</h1>
            <p className={styles.summaryDesc}>
              {sessionGrades.length} card{sessionGrades.length !== 1 ? 's' : ''} reviewed
            </p>

            <div className={styles.summaryStats}>
              <div className={styles.statChip} data-grade="got">
                <span className={styles.statNum}>{got}</span>
                <span className={styles.statLabel}>Got it</span>
              </div>
              <div className={styles.statChip} data-grade="ok">
                <span className={styles.statNum}>{ok}</span>
                <span className={styles.statLabel}>Ok</span>
              </div>
              <div className={styles.statChip} data-grade="again">
                <span className={styles.statNum}>{again}</span>
                <span className={styles.statLabel}>Again</span>
              </div>
            </div>

            <div className={styles.summaryActions}>
              <Link href="/hub" className={styles.btnPrimary}>Back to Hub</Link>
              <button
                className={styles.btnGhost}
                onClick={() => setPhase('setup')}
                type="button"
              >
                Drill again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Active session ─────────────────────────────────────
  const current   = queue[idx];
  const langColor = LANGUAGES.find((l) => l.slug === current.lang)?.color ?? 'var(--accent)';

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
        <SessionBar current={idx} total={queue.length} grades={sessionGrades} />

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
    <Suspense fallback={<main style={{ minHeight: '100vh', background: 'var(--bg)' }} />}>
      <DrillInner />
    </Suspense>
  );
}
