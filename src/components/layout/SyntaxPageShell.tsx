'use client';

import { useState } from 'react';
import type { SyntaxEntry } from '@/types/content';
import SyntaxSection from '@/components/sections/SyntaxSection';
import RightPanel from './RightPanel';
import styles from './SyntaxPageShell.module.scss';

interface SyntaxPageShellProps {
  entries: SyntaxEntry[];
}

export default function SyntaxPageShell({ entries }: SyntaxPageShellProps) {
  const [filteredEntries, setFilteredEntries] = useState<SyntaxEntry[]>(entries);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <SyntaxSection entries={entries} onFilteredChange={setFilteredEntries} />
      </div>
      <aside className={styles.aside}>
        <RightPanel items={filteredEntries.map((e) => ({ id: e.id, title: e.title }))} />
      </aside>
    </div>
  );
}
