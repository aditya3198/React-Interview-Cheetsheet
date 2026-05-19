'use client';

import Link from 'next/link';
import { useProgressStore } from '@/store/useProgressStore';
import { LANGUAGES, SECTIONS } from '@/data/navigation';
import type { LanguageSlug } from '@/types/navigation';
import useLoadingStore from '@/store/useLoadingStore';

// Section counts per language (static — from data files)
import jsSyntax from '@/data/javascript/syntax';
import jsTheory from '@/data/javascript/theory';
import jsVersions from '@/data/javascript/versions';
import jsQna from '@/data/javascript/qna';
import htmlSyntax from '@/data/html/syntax';
import htmlTheory from '@/data/html/theory';
import htmlVersions from '@/data/html/versions';
import htmlQna from '@/data/html/qna';
import htmlPlayground from '@/data/html/playground';
import cssSyntax from '@/data/css/syntax';
import cssTheory from '@/data/css/theory';
import cssVersions from '@/data/css/versions';
import cssQna from '@/data/css/qna';
import cssPlayground from '@/data/css/playground';
import reactSyntax from '@/data/react/syntax';
import reactTheory from '@/data/react/theory';
import reactVersions from '@/data/react/versions';
import reactQna from '@/data/react/qna';

import styles from './page.module.scss';

type LangCounts = { syntax: number; theory: number; versions: number; playground: number; qna: number; total: number };

const LANG_COUNTS: Record<LanguageSlug, LangCounts> = {
  javascript: { syntax: jsSyntax.length, theory: jsTheory.length, versions: jsVersions.length, playground: 0, qna: jsQna.length, total: jsSyntax.length + jsTheory.length + jsVersions.length + jsQna.length },
  html:       { syntax: htmlSyntax.length, theory: htmlTheory.length, versions: htmlVersions.length, playground: htmlPlayground.length, qna: htmlQna.length, total: htmlSyntax.length + htmlTheory.length + htmlVersions.length + htmlPlayground.length + htmlQna.length },
  css:        { syntax: cssSyntax.length, theory: cssTheory.length, versions: cssVersions.length, playground: cssPlayground.length, qna: cssQna.length, total: cssSyntax.length + cssTheory.length + cssVersions.length + cssPlayground.length + cssQna.length },
  react:      { syntax: reactSyntax.length, theory: reactTheory.length, versions: reactVersions.length, playground: 0, qna: reactQna.length, total: reactSyntax.length + reactTheory.length + reactVersions.length + reactQna.length },
};

// All data for resolving card keys → titles
const ALL_DATA: Record<string, { id: string; title?: string; question?: string }[]> = {
  'javascript/syntax': jsSyntax,
  'javascript/theory': jsTheory,
  'javascript/qna': jsQna,
  'html/syntax': htmlSyntax,
  'html/theory': htmlTheory,
  'html/qna': htmlQna,
  'css/syntax': cssSyntax,
  'css/theory': cssTheory,
  'css/qna': cssQna,
  'react/syntax': reactSyntax,
  'react/theory': reactTheory,
  'react/qna': reactQna,
};

function resolveTitle(key: string): string {
  const parts = key.split('/'); // [lang, section, id]
  if (parts.length < 3) return key;
  const [lang, section, id] = parts;
  const arr = ALL_DATA[`${lang}/${section}`] ?? [];
  const entry = arr.find((e) => e.id === id) as { id: string; title?: string; question?: string } | undefined;
  if (!entry) return id;
  return entry.title ?? entry.question ?? id;
}

const GRAND_TOTAL = Object.values(LANG_COUNTS).reduce((s, c) => s + c.total, 0);

export default function HubPage() {
  const setLoading = useLoadingStore((s) => s.setLoading);
  const cards = useProgressStore((s) => s.cards);
  const reviewCards = useProgressStore((s) => s.reviewCards);
  const lastSeenByLang = useProgressStore((s) => s.lastSeenByLang);

  // Overall progress
  const totalSeen = Object.values(cards).filter((c) => c.status !== 'unseen').length;
  const overallPct = GRAND_TOTAL > 0 ? Math.round((totalSeen / GRAND_TOTAL) * 100) : 0;
  const circumference = 2 * Math.PI * 48; // r=48 → 301.6
  const dashOffset = circumference * (1 - overallPct / 100);

  // Per-language progress
  function langProgress(lang: LanguageSlug) {
    const total = LANG_COUNTS[lang].total;
    const seen = Object.keys(cards).filter(
      (k) => k.startsWith(`${lang}/`) && cards[k].status !== 'unseen'
    ).length;
    const pct = total > 0 ? Math.round((seen / total) * 100) : 0;
    return { seen, total, pct };
  }

  const reviewCount = reviewCards().length;

  return (
    <main className={styles.wrap}>
      <div className={styles.crumbs}>
        <Link href="/" className={styles.crumbLink}>frontprep</Link>
        <span className={styles.crumbSep}>/</span>
        <span>hub</span>
      </div>

      <h1 className={styles.h1}>Choose where to revise.</h1>
      <p className={styles.lede}>
        Your progress is saved locally. Click any section to jump straight in, or run a quick
        drill from the cards you&apos;ve marked weak.
      </p>

      {/* Progress overview */}
      <div className={styles.progress}>
        <div>
          <div className={styles.overviewLabel}>Overall progress</div>
          <div className={styles.donut}>
            <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(236,231,221,0.08)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="48" fill="none"
                stroke="var(--color-primary)" strokeWidth="10"
                strokeDasharray={circumference.toFixed(1)}
                strokeDashoffset={dashOffset.toFixed(1)}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className={styles.donutLabel}>
              <div className={styles.pct}>{overallPct}<small>%</small></div>
              <div className={styles.cap}>{totalSeen} of {GRAND_TOTAL} cards reviewed across all four stacks.</div>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.overviewLabel}>By language</div>
          <div className={styles.breakdown}>
            {LANGUAGES.map((lang) => {
              const { seen, total, pct } = langProgress(lang.slug as LanguageSlug);
              return (
                <div key={lang.slug} className={styles.row}>
                  <span className={styles.rowDot} style={{ background: lang.color }} />
                  <span className={styles.rowName}>{lang.label}</span>
                  <span className={styles.rowTrack}>
                    <span className={styles.rowFill} style={{ width: `${pct}%`, background: lang.color }} />
                  </span>
                  <span className={styles.rowNum}>{seen} / {total}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Language cards */}
      <div className={styles.cards}>
        {LANGUAGES.map((lang) => {
          const slug = lang.slug as LanguageSlug;
          const { seen, total, pct } = langProgress(slug);
          const counts = LANG_COUNTS[slug];
          const lastKey = lastSeenByLang[slug];
          const lastTitle = lastKey ? resolveTitle(lastKey) : null;
          const hasProgress = seen > 0;

          return (
            <div key={slug} className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardLang}>
                  <span className={styles.cardDot} style={{ background: lang.color }} />
                  <span className={styles.cardName}>{lang.label}</span>
                </div>
                <span className={styles.pctBadge}>
                  <b>{pct}%</b> · {seen}/{total}
                </span>
              </div>

              <p className={styles.cardDesc}>{lang.description}</p>

              <div className={styles.secs}>
                {SECTIONS.map((sec) => {
                  const cnt = counts[sec.slug as keyof LangCounts] as number;
                  return (
                    <Link
                      key={sec.slug}
                      href={`/${slug}/${sec.slug}`}
                      className={styles.sect}
                      onClick={() => setLoading(true)}
                    >
                      <div className={styles.sectTitle}>{sec.label}</div>
                      <div className={styles.sectCount}>{cnt}</div>
                      <div className={styles.micro}><span /></div>
                    </Link>
                  );
                })}
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.resume}>
                  {lastTitle
                    ? <>Last seen <b>{lastTitle}</b></>
                    : 'Not started — explore a section'}
                </span>
                <Link
                  href={`/${slug}/syntax`}
                  className={styles.cta}
                  onClick={() => setLoading(true)}
                >
                  {hasProgress ? 'Resume →' : 'Start →'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick drill banner */}
      <Link href="/drill?source=review" className={styles.quick} onClick={() => setLoading(true)}>
        <div className={styles.quickIcon}>⟶</div>
        <div className={styles.quickText}>
          <h4 className={styles.quickH4}>
            {reviewCount > 0
              ? `${reviewCount} card${reviewCount !== 1 ? 's' : ''} marked "Review again"`
              : 'No cards marked for review yet'}
          </h4>
          <p className={styles.quickP}>
            Run a 10-minute drill on just the cards you&apos;ve flagged across all stacks.
          </p>
        </div>
        <span className={styles.quickGo}>Start drill</span>
      </Link>
    </main>
  );
}
