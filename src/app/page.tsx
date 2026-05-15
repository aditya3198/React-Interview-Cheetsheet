'use client';
import dynamic from 'next/dynamic';
import HeroContent from '@/components/HeroContent';
import styles from './page.module.scss';

// R3F Canvas must be loaded client-side only — no SSR
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false });

export default function HomePage() {
  return (
    <main className={styles.hero}>
      <HeroCanvas />
      <HeroContent />
    </main>
  );
}
