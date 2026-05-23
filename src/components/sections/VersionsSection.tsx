'use client';

import { useState, useMemo } from 'react';
import type { VersionEntry } from '@/types/content';
import CodeBlock from '@/components/shared/CodeBlock';
import styles from './VersionsSection.module.scss';

interface VersionsSectionProps {
  versions: VersionEntry[];
}

export default function VersionsSection({ versions }: VersionsSectionProps) {
  // versions prop is newest-first; oldest-first for timeline display
  const oldestFirst = useMemo(() => [...versions].reverse(), [versions]);
  const versionIds = useMemo(() => oldestFirst.map((v) => v.version), [oldestFirst]);

  const [fromVersion, setFromVersion] = useState<string>(versionIds[0] ?? '');
  const [toVersion, setToVersion]     = useState<string>(versionIds[versionIds.length - 1] ?? '');
  const [showBreaking, setShowBreaking] = useState(false);

  const fromIdx = versionIds.indexOf(fromVersion);
  const toIdx   = versionIds.indexOf(toVersion);

  const [lo, hi] = fromIdx <= toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx];

  const inRange = useMemo(
    () => oldestFirst.slice(lo, hi + 1),
    [oldestFirst, lo, hi],
  );

  const allHighlights = useMemo(
    () => inRange.flatMap((v) =>
      v.highlights
        .filter((h) => !showBreaking || h.breakingChange)
        .map((h) => ({ ...h, version: v.version, releaseYear: v.releaseYear })),
    ),
    [inRange, showBreaking],
  );

  const breakingCount = useMemo(
    () => inRange.flatMap((v) => v.highlights).filter((h) => h.breakingChange).length,
    [inRange],
  );

  function swap() {
    setFromVersion(toVersion);
    setToVersion(fromVersion);
  }

  return (
    <div className={styles.wrap}>
      {/* ── Compare bar ─────────────────────────────────── */}
      <div className={styles.bar}>
        <div className={styles.barLeft}>
          <label className={styles.pickLabel}>From</label>
          <select
            className={styles.pick}
            value={fromVersion}
            onChange={(e) => setFromVersion(e.target.value)}
          >
            {versionIds.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <button className={styles.swapBtn} onClick={swap} type="button" aria-label="Swap versions">
            ⇄
          </button>

          <label className={styles.pickLabel}>To</label>
          <select
            className={styles.pick}
            value={toVersion}
            onChange={(e) => setToVersion(e.target.value)}
          >
            {versionIds.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className={styles.barMeta}>
          <span className={styles.barCount}>
            <b>{allHighlights.length}</b> changes · <b>{breakingCount}</b> breaking
          </span>
        </div>
      </div>

      {/* ── Timeline pins ────────────────────────────────── */}
      <div className={styles.timelineWrap}>
        <div className={styles.timelineTrack} />
        <div className={styles.pins}>
          {oldestFirst.map((v, i) => {
            const isActive = i >= lo && i <= hi;
            return (
              <button
                key={v.version}
                className={`${styles.pin} ${isActive ? styles.pinActive : ''}`}
                onClick={() => {
                  if (i < lo) setFromVersion(v.version);
                  else if (i > hi) setToVersion(v.version);
                  else if (i === lo) setFromVersion(v.version);
                  else setToVersion(v.version);
                }}
                type="button"
                title={`${v.version} (${v.releaseYear})`}
              >
                <span className={styles.pinDot} />
                <span className={styles.pinLabel}>{v.version}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filter row ───────────────────────────────────── */}
      <div className={styles.filterRow}>
        <button
          className={`${styles.filterBtn} ${!showBreaking ? styles.filterActive : ''}`}
          onClick={() => setShowBreaking(false)}
          type="button"
        >
          All
        </button>
        <button
          className={`${styles.filterBtn} ${showBreaking ? styles.filterActive : ''}`}
          onClick={() => setShowBreaking(true)}
          type="button"
        >
          Breaking only
          {breakingCount > 0 && (
            <span className={styles.filterCount}>{breakingCount}</span>
          )}
        </button>
      </div>

      {/* ── Diff cards ───────────────────────────────────── */}
      {allHighlights.length === 0 ? (
        <p className={styles.empty}>No changes in this range.</p>
      ) : (
        <div className={styles.cards}>
          {allHighlights.map((h, i) => (
            <div key={i} className={`${styles.card} ${h.breakingChange ? styles.cardBreaking : ''}`}>
              <div className={styles.diffHead}>
                <span className={styles.diffNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.diffFeature}>{h.feature}</span>
                <span className={styles.diffVer}>{h.version}</span>
                {h.breakingChange && (
                  <span className={styles.breakingPill}>Breaking</span>
                )}
              </div>
              <p className={styles.diffDesc}>{h.description}</p>
              {h.codeExample && (
                <div className={styles.diffCode}>
                  <CodeBlock code={h.codeExample} language="javascript" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
