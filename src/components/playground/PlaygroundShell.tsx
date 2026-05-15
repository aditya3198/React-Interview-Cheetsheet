'use client';
import { usePlayground } from '@/hooks/usePlayground';
import type { PlaygroundConfig } from '@/types/playground';
import ControlPanel from './ControlPanel';
import PreviewPanel from './PreviewPanel';
import styles from './PlaygroundShell.module.scss';

interface Props {
  configs: PlaygroundConfig[];
}

export default function PlaygroundShell({ configs }: Props) {
  const { configs: loadedConfigs, activeConfig, activeId, values, setActiveId, setValue, reset } =
    usePlayground(configs);

  if (!activeConfig) return null;

  return (
    <section className={styles.shell}>
      {loadedConfigs.length > 1 && (
        <nav className={styles.tabs} aria-label="Playground examples">
          {loadedConfigs.map((c) => (
            <button
              key={c.id}
              className={`${styles.tab} ${c.id === activeId ? styles.tabActive : ''}`}
              onClick={() => setActiveId(c.id)}
              aria-current={c.id === activeId ? 'page' : undefined}
            >
              {c.title}
            </button>
          ))}
        </nav>
      )}

      <div className={styles.layout}>
        <ControlPanel
          config={activeConfig}
          values={values}
          onChange={setValue}
          onReset={reset}
        />
        <PreviewPanel config={activeConfig} values={values} />
      </div>
    </section>
  );
}
