'use client';

import TableOfContents, { type TocItem } from './TableOfContents';
import styles from './RightPanel.module.scss';

interface RightPanelProps {
  items: TocItem[];
}

export default function RightPanel({ items }: RightPanelProps) {
  return (
    <div className={styles.panel}>
      <TableOfContents items={items} />
    </div>
  );
}
