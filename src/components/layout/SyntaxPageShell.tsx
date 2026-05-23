'use client';

import { useState, useMemo, useCallback } from 'react';
import type { SyntaxEntry } from '@/types/content';
import type { LanguageSlug } from '@/types/navigation';
import { getLanguageMeta } from '@/data/navigation';
import SyntaxSection from '@/components/sections/SyntaxSection';
import TableOfContents from './TableOfContents';
import { useProgressStore } from '@/store/useProgressStore';
import styles from './SyntaxPageShell.module.scss';

interface SyntaxPageShellProps {
  entries: SyntaxEntry[];
  language: LanguageSlug;
  section?: string;
}

const LANG_DESCS: Record<string, string> = {
  javascript: 'declarations, control flow, async, and modern operators',
  html:       'elements, attributes, semantics, and accessibility',
  css:        'selectors, layout, animations, and custom properties',
  react:      'hooks, components, state, and concurrent features',
};

export default function SyntaxPageShell({ entries, language, section = 'syntax' }: SyntaxPageShellProps) {
  const [filteredEntries, setFilteredEntries] = useState<SyntaxEntry[]>(entries);
  const pins = useProgressStore((s) => s.pins);
  const togglePin = useProgressStore((s) => s.togglePin);
  const langMeta = getLanguageMeta(language);

  const cardKey = useCallback((id: string) => `${language}/${section}/${id}`, [language, section]);

  const pinnedEntries = useMemo(
    () => entries.filter((e) => pins.includes(cardKey(e.id))),
    [entries, pins, cardKey]
  );

  const tocItems = useMemo(
    () => filteredEntries.map((e) => ({ id: e.id, title: e.title })),
    [filteredEntries]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.pageHead}>
          <h1 className={styles.pageTitle}>{langMeta?.label} syntax</h1>
          <p className={styles.pageSub}>
            {entries.length} cards covering {LANG_DESCS[language] ?? 'key concepts and patterns'}.
            Pin anything to keep it visible in the side panel.
          </p>
        </div>

        <SyntaxSection
          entries={entries}
          language={language}
          section={section}
          onFilteredChange={setFilteredEntries}
        />
      </div>

      <aside className={styles.aside}>
        <div className={styles.panel}>
          <h4 className={styles.panelLabel}>Pinned ({pinnedEntries.length})</h4>
          {pinnedEntries.length === 0 ? (
            <div className={styles.emptyPins}>
              Press <b>P</b> on any card to pin it here.
            </div>
          ) : (
            <div className={styles.pinList}>
              {pinnedEntries.map((e) => (
                <div key={e.id} className={styles.pinItem}>
                  <div className={styles.pinHead}>
                    <span className={styles.pinTitle}>{e.title}</span>
                    <button
                      className={styles.pinRemove}
                      onClick={() => togglePin(cardKey(e.id))}
                      aria-label={`Unpin ${e.title}`}
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                  <pre className={styles.pinCode}>
                    {e.code.slice(0, 120)}{e.code.length > 120 ? '…' : ''}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {tocItems.length > 0 && (
          <div className={styles.toc}>
            <TableOfContents items={tocItems} />
          </div>
        )}
      </aside>
    </div>
  );
}
