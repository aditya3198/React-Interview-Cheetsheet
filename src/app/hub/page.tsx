'use client';

import Link from 'next/link';
import { LANGUAGES } from '@/data/navigation';
import Card from '@/components/shared/Card';
import useLoadingStore from '@/store/useLoadingStore';
import styles from './page.module.scss';

export default function HubPage() {
  const setLoading = useLoadingStore((s) => s.setLoading);
  return (
    <main className={styles.hub}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose a Topic</h1>
        <p className={styles.subtitle}>
          Pick a language to explore syntax, theory, version history, interactive playground, and interview Q&amp;A.
        </p>
      </div>

      <div className={styles.grid}>
        {LANGUAGES.map((lang) => (
          <Link key={lang.slug} href={`/${lang.slug}/syntax`} className={styles.cardLink} onClick={() => setLoading(true)}>
            <Card tilt3d className={styles.card}>
              <div
                className={styles.colorBar}
                style={{ background: lang.color }}
                aria-hidden="true"
              />
              <div className={styles.cardBody}>
                <h2 className={styles.langLabel} style={{ color: lang.color }}>
                  {lang.label}
                </h2>
                <p className={styles.langDescription}>{lang.description}</p>
                <span className={styles.cta}>Explore →</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
