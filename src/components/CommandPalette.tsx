'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { usePaletteStore } from '@/store/usePaletteStore';
import { useProgressStore } from '@/store/useProgressStore';
import { LANGUAGES, SECTIONS } from '@/data/navigation';
import type { LanguageSlug } from '@/types/navigation';
import styles from './CommandPalette.module.scss';

// ─── Static search index (built once at module load) ─────
import jsSyntax from '@/data/javascript/syntax';
import jsTheory from '@/data/javascript/theory';
import jsQna from '@/data/javascript/qna';
import htmlSyntax from '@/data/html/syntax';
import htmlTheory from '@/data/html/theory';
import htmlQna from '@/data/html/qna';
import cssSyntax from '@/data/css/syntax';
import cssTheory from '@/data/css/theory';
import cssQna from '@/data/css/qna';
import reactSyntax from '@/data/react/syntax';
import reactTheory from '@/data/react/theory';
import reactQna from '@/data/react/qna';
import tsSyntax from '@/data/typescript/syntax';
import tsTheory from '@/data/typescript/theory';
import tsQna from '@/data/typescript/qna';

type ContentItem = {
  id: string;
  label: string;
  description?: string;
  href: string;
  lang: string;
  section: string;
  keywords: string[];
};

const CONTENT_INDEX: ContentItem[] = [];

function indexSection(
  entries: { id: string; title?: string; question?: string; description?: string; summary?: string; answer?: string; tags?: string[] }[],
  lang: LanguageSlug,
  section: string,
) {
  entries.forEach((e) => {
    const label = e.title ?? e.question ?? e.id;
    const description = e.description ?? e.summary ?? (e.answer ? e.answer.slice(0, 80) : undefined);
    CONTENT_INDEX.push({
      id: `${lang}/${section}/${e.id}`,
      label,
      description,
      href: `/${lang}/${section}#${e.id}`,
      lang,
      section,
      keywords: [...(e.tags ?? []), label, lang, section],
    });
  });
}

indexSection(jsSyntax,    'javascript', 'syntax');
indexSection(jsTheory,    'javascript', 'theory');
indexSection(jsQna,       'javascript', 'qna');
indexSection(htmlSyntax,  'html',       'syntax');
indexSection(htmlTheory,  'html',       'theory');
indexSection(htmlQna,     'html',       'qna');
indexSection(cssSyntax,   'css',        'syntax');
indexSection(cssTheory,   'css',        'theory');
indexSection(cssQna,      'css',        'qna');
indexSection(reactSyntax, 'react',      'syntax');
indexSection(reactTheory, 'react',      'theory');
indexSection(reactQna,    'react',      'qna');
indexSection(tsSyntax,    'typescript', 'syntax');
indexSection(tsTheory,    'typescript', 'theory');
indexSection(tsQna,       'typescript', 'qna');

const LANG_COLOR: Record<LanguageSlug, string> = {
  javascript: 'var(--color-js)',
  html: 'var(--color-html)',
  css: 'var(--color-css)',
  react: 'var(--color-react)',
  typescript: '#3178c6',
};

export default function CommandPalette() {
  const open = usePaletteStore((s) => s.open);
  const setOpen = usePaletteStore((s) => s.setOpen);
  const pins = useProgressStore((s) => s.pins);
  const router = useRouter();

  // Global ⌘K / Ctrl+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setOpen]);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    router.push(href);
  }, [setOpen, router]);

  // Pinned items resolved from content index
  const pinnedItems = pins
    .map((key) => CONTENT_INDEX.find((c) => c.id === key))
    .filter((c): c is ContentItem => c !== undefined);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className={styles.dialog}
    >
      <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className={styles.panel}>
        <Command.Input
          placeholder="Search topics, questions, pages…"
          className={styles.input}
          autoFocus
        />
        <Command.List className={styles.list}>
          <Command.Empty className={styles.empty}>No results found.</Command.Empty>

          {/* Pinned cards */}
          {pinnedItems.length > 0 && (
            <Command.Group heading="Pinned" className={styles.group}>
              {pinnedItems.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.label + ' ' + item.keywords.join(' ')}
                  onSelect={() => navigate(item.href)}
                  className={styles.item}
                >
                  <span className={styles.itemDot} style={{ background: LANG_COLOR[item.lang as LanguageSlug] }} />
                  <span className={styles.itemLabel}>{item.label}</span>
                  <span className={styles.itemMeta}>★ {item.lang} · {item.section}</span>
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {/* Page shortcuts */}
          <Command.Group heading="Pages" className={styles.group}>
            <Command.Item value="hub overview" onSelect={() => navigate('/hub')} className={styles.item}>
              <span className={styles.itemIcon}>⌂</span>
              <span className={styles.itemLabel}>Hub</span>
              <span className={styles.itemMeta}>overview</span>
            </Command.Item>
            <Command.Item value="drill flashcards practice" onSelect={() => navigate('/drill')} className={styles.item}>
              <span className={styles.itemIcon}>▷</span>
              <span className={styles.itemLabel}>Drill</span>
              <span className={styles.itemMeta}>flashcards</span>
            </Command.Item>
            <Command.Item value="bookmarks pins" onSelect={() => navigate('/bookmarks')} className={styles.item}>
              <span className={styles.itemIcon}>★</span>
              <span className={styles.itemLabel}>Bookmarks</span>
              <span className={styles.itemMeta}>pinned cards</span>
            </Command.Item>
            {LANGUAGES.map((lang) =>
              SECTIONS.map((sec) => (
                <Command.Item
                  key={`${lang.slug}/${sec.slug}`}
                  value={`${lang.label} ${sec.label} ${lang.slug} ${sec.slug}`}
                  onSelect={() => navigate(`/${lang.slug}/${sec.slug}`)}
                  className={styles.item}
                >
                  <span className={styles.itemDot} style={{ background: lang.color }} />
                  <span className={styles.itemLabel}>{lang.label} <span className={styles.itemSec}>{sec.label}</span></span>
                  <span className={styles.itemMeta}>{sec.icon}</span>
                </Command.Item>
              ))
            )}
          </Command.Group>

          {/* Content */}
          <Command.Group heading="Content" className={styles.group}>
            {CONTENT_INDEX.map((item) => (
              <Command.Item
                key={item.id}
                value={item.label + ' ' + item.keywords.join(' ')}
                onSelect={() => navigate(item.href)}
                className={styles.item}
              >
                <span className={styles.itemDot} style={{ background: LANG_COLOR[item.lang as LanguageSlug] }} />
                <span className={styles.itemLabel}>
                  {item.label}
                  {item.description && (
                    <span className={styles.itemDesc}> — {item.description.slice(0, 60)}</span>
                  )}
                </span>
                <span className={styles.itemMeta}>{item.lang} · {item.section}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        <div className={styles.footer}>
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </Command.Dialog>
  );
}
