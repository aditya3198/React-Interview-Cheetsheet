'use client';
import { use } from 'react';
import htmlPlaygroundConfigs from '@/data/html/playground';
import cssPlaygroundConfigs from '@/data/css/playground';
import reactPlaygroundConfigs from '@/data/react/playground';
import type { PlaygroundConfig } from '@/types/playground';
import PlaygroundShell from '@/components/playground/PlaygroundShell';
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
      <div className={styles.empty}>
        <p>No playground available for {language} yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Interactive Playground</h1>
        <p className={styles.subtitle}>
          Adjust the controls to see live changes and generated code.
        </p>
      </header>
      <PlaygroundShell configs={configs} />
    </div>
  );
}
