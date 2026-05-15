'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import useLoadingStore from '@/store/useLoadingStore';
import styles from './HeroContent.module.scss';

export default function HeroContent() {
  const setLoading = useLoadingStore((s) => s.setLoading);
  return (
    <div className={styles.content}>
      <motion.div
        className={styles.badge}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✦ Frontend Interview Prep
      </motion.div>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        Master the
        <span className={styles.gradient}> Frontend</span>
        <br />Interview
      </motion.h1>

      <motion.p
        className={styles.tagline}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        JavaScript · HTML · CSS · React — syntax, theory, versions,<br />
        interactive playgrounds, and interview Q&amp;A.
      </motion.p>

      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
      >
        <Link href="/hub" className={styles.ctaBtn} onClick={() => setLoading(true)}>
          Start Studying →
        </Link>
        <Link href="/javascript/syntax" className={styles.ghostBtn} onClick={() => setLoading(true)}>
          Jump to JavaScript
        </Link>
      </motion.div>

      <motion.div
        className={styles.languagePills}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.65 }}
      >
        {['JavaScript', 'HTML', 'CSS', 'React'].map((lang) => (
          <span key={lang} className={styles.pill}>{lang}</span>
        ))}
      </motion.div>
    </div>
  );
}
