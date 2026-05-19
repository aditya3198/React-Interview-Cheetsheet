'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import useLoadingStore from '@/store/useLoadingStore';
import styles from './HeroContent.module.scss';

const EASE = 'easeOut' as const;

export default function HeroContent() {
  const setLoading = useLoadingStore((s) => s.setLoading);
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  // Only animate on first paint; skip entirely if user prefers reduced motion
  const shouldAnimate = mounted && !prefersReduced;

  return (
    <div className={styles.hero}>
      <motion.div
        className={styles.eyebrow}
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0, ease: EASE }}
      >
        A focused frontend interview library
      </motion.div>

      <motion.h1
        className={styles.title}
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        One place to revise<br />
        everything before the<br />
        <em>next interview.</em>
      </motion.h1>

      <motion.p
        className={styles.lede}
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
      >
        JavaScript, HTML, CSS and React — distilled into syntax cards, theory, version
        diffs, runnable playgrounds and 600+ interviewer-style Q&amp;A. Track what you
        know, drill what you don&apos;t.
      </motion.p>

      <motion.div
        className={styles.ctaRow}
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
      >
        <Link href="/hub" className={styles.btnPrimary} onClick={() => setLoading(true)}>
          Start a study session <span className={styles.arr}>→</span>
        </Link>
        <Link href="/drill" className={styles.btnGhost} onClick={() => setLoading(true)}>
          Quick drill (10 min)
        </Link>
      </motion.div>
    </div>
  );
}
