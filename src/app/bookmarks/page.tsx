'use client';

import Link from 'next/link';
import { useProgressStore } from '@/store/useProgressStore';
import { LANGUAGES } from '@/data/navigation';
import type { SyntaxEntry } from '@/types/content';

// All syntax data for resolving pinned card keys
import jsSyntax from '@/data/javascript/syntax';
import htmlSyntax from '@/data/html/syntax';
import cssSyntax from '@/data/css/syntax';
import reactSyntax from '@/data/react/syntax';
import jsQna from '@/data/javascript/qna';
import htmlQna from '@/data/html/qna';
import cssQna from '@/data/css/qna';
import reactQna from '@/data/react/qna';
import jsTheory from '@/data/javascript/theory';
import htmlTheory from '@/data/html/theory';
import cssTheory from '@/data/css/theory';
import reactTheory from '@/data/react/theory';

import styles from './page.module.scss';

const DATA_MAP: Record<string, { id: string; title?: string; question?: string; description?: string; summary?: string; code?: string }[]> = {
  'javascript/syntax': jsSyntax,
  'javascript/qna': jsQna,
  'javascript/theory': jsTheory,
  'html/syntax': htmlSyntax,
  'html/qna': htmlQna,
  'html/theory': htmlTheory,
  'css/syntax': cssSyntax,
  'css/qna': cssQna,
  'css/theory': cssTheory,
  'react/syntax': reactSyntax,
  'react/qna': reactQna,
  'react/theory': reactTheory,
};

function resolveEntry(key: string) {
  const [lang, section, id] = key.split('/');
  const arr = DATA_MAP[`${lang}/${section}`] ?? [];
  return arr.find((e) => e.id === id) as SyntaxEntry | undefined;
}

export default function BookmarksPage() {
  const pins = useProgressStore((s) => s.pins);
  const togglePin = useProgressStore((s) => s.togglePin);

  const grouped = LANGUAGES.map((lang) => {
    const langPins = pins.filter((k) => k.startsWith(`${lang.slug}/`));
    const entries = langPins.map((key) => ({ key, entry: resolveEntry(key), section: key.split('/')[1] }))
      .filter((x): x is { key: string; entry: SyntaxEntry; section: string } => x.entry !== undefined);
    return { lang, entries };
  }).filter((g) => g.entries.length > 0);

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.crumbs}>
          <Link href="/" className={styles.crumbLink}>frontprep</Link>
          <span className={styles.sep}>/</span>
          <span>bookmarks</span>
        </div>

        <h1 className={styles.h1}>Bookmarks</h1>
        <p className={styles.lede}>Cards you&apos;ve pinned across all stacks. Press <kbd className={styles.kbd}>P</kbd> on any card to pin it.</p>

        {pins.length === 0 ? (
          <div className={styles.empty}>
            <p>No bookmarks yet.</p>
            <p>Press <kbd className={styles.kbd}>P</kbd> on any card to pin it.</p>
            <Link href="/javascript/syntax" className={styles.startLink}>Browse JavaScript syntax →</Link>
          </div>
        ) : (
          <div className={styles.groups}>
            {grouped.map(({ lang, entries }) => (
              <div key={lang.slug} className={styles.group}>
                <div className={styles.groupHead}>
                  <span className={styles.groupDot} style={{ background: lang.color }} />
                  <h2 className={styles.groupTitle}>{lang.label}</h2>
                  <span className={styles.groupCount}>{entries.length}</span>
                </div>

                <div className={styles.grid}>
                  {entries.map(({ key, entry, section }) => (
                    <div key={key} className={styles.card}>
                      <div className={styles.cardHead}>
                        <Link
                          href={`/${lang.slug}/${section}#${entry.id}`}
                          className={styles.cardTitle}
                        >
                          {entry.title}
                        </Link>
                        <span className={styles.sectionTag}>{section}</span>
                        <button
                          className={styles.removeBtn}
                          onClick={() => togglePin(key)}
                          aria-label={`Unpin ${entry.title}`}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                      {entry.description && (
                        <p className={styles.cardDesc}>{entry.description}</p>
                      )}
                      {entry.code && (
                        <pre className={styles.cardCode}>{entry.code.slice(0, 140)}{entry.code.length > 140 ? '…' : ''}</pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
