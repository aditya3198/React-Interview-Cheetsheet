import type { VersionEntry } from '@/types/content';
import ScrollReveal from '@/components/shared/ScrollReveal';
import Badge from '@/components/shared/Badge';
import CodeBlock from '@/components/shared/CodeBlock';
import styles from './VersionsSection.module.scss';

interface VersionsSectionProps {
  versions: VersionEntry[];
}

export default function VersionsSection({ versions }: VersionsSectionProps) {
  return (
    <div className={styles.timeline}>
      {versions.map((v, i) => (
        <ScrollReveal key={v.version} delay={i * 0.06}>
          <div className={styles.block}>
            <div className={styles.leftCol}>
              <div className={styles.versionBadge}>
                <span className={styles.versionName}>{v.version}</span>
                <span className={styles.year}>{v.releaseYear}</span>
              </div>
              <div className={styles.line} />
            </div>
            <div className={styles.rightCol}>
              <ul className={styles.highlights}>
                {v.highlights.map((h, j) => (
                  <li key={j} className={styles.highlight}>
                    <div className={styles.highlightHeader}>
                      <span className={styles.feature}>{h.feature}</span>
                      {h.breakingChange && (
                        <Badge label="Breaking" variant="breaking" />
                      )}
                    </div>
                    <p className={styles.desc}>{h.description}</p>
                    {h.codeExample && (
                      <CodeBlock code={h.codeExample} language="javascript" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
