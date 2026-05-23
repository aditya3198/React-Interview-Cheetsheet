'use client';
import { use } from 'react';
import htmlPlaygroundConfigs from '@/data/html/playground';
import cssPlaygroundConfigs from '@/data/css/playground';
import reactPlaygroundConfigs from '@/data/react/playground';
import type { PlaygroundConfig } from '@/types/playground';
import PlaygroundShell from '@/components/playground/PlaygroundShell';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import styles from './page.module.scss';

const configMap: Record<string, PlaygroundConfig[]> = {
  html: htmlPlaygroundConfigs,
  css: cssPlaygroundConfigs,
  react: reactPlaygroundConfigs,
};

export default function PlaygroundPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = use(params);
  const configs = configMap[language] ?? [];

  if (!configs.length) {
    return (
      <>
        <Breadcrumbs />
        <div className={styles.empty}>
          <p className={styles.emptyText}>No playground available for {language} yet.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs />
      <div className={styles.page}>
        <div className={styles.head}>
          <span className={styles.glyph}>▷</span>
          <h1 className={styles.title}>Playground</h1>
        </div>
        <PlaygroundShell configs={configs} />
      </div>
    </>
  );
}
