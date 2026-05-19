'use client';

import { useState, useMemo, useCallback } from 'react';
import type { SyntaxEntry } from '@/types/content';
import type { LanguageSlug } from '@/types/navigation';
import SyntaxSection from '@/components/sections/SyntaxSection';
import TableOfContents from './TableOfContents';
import { useProgressStore } from '@/store/useProgressStore';
import styles from './SyntaxPageShell.module.scss';

interface SyntaxPageShellProps {
  entries: SyntaxEntry[];
  language: LanguageSlug;
  section?: string;
}

export default function SyntaxPageShell({ entries, language, section = 'syntax' }: SyntaxPageShellProps) {
  const [filteredEntries, setFilteredEntries] = useState<SyntaxEntry[]>(entries);
  const pins = useProgressStore((s) => s.pins);
  const togglePin = useProgressStore((s) => s.togglePin);

  const cardKey = useCallback((id: string) => `${language}/${section}/${id}`, [language, section]);

  // Pinned entries for this page
  const pinnedEntries = useMemo(() => {
    return entries.filter((e) => pins.includes(cardKey(e.id)));
  }, [entries, pins, cardKey]);

  // TOC items from filtered entries
  const tocItems = useMemo(
    () => filteredEntries.map((e) => ({ id: e.id, title: e.title })),
    [filteredEntries]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SyntaxSection
          entries={entries}
          language={language}
          section={section}
          onFilteredChange={setFilteredEntries}
        />
      </div>

      <aside className={styles.aside}>
        {/* Pinned list */}
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
                  <pre className={styles.pinCode}>{e.code.slice(0, 120)}{e.code.length > 120 ? '…' : ''}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TOC */}
        {tocItems.length > 0 && (
          <div className={styles.toc}>
            <TableOfContents items={tocItems} />
          </div>
        )}
      </aside>
    </div>
  );
}
