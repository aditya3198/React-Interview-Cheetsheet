'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useLoadingStore from '@/store/useLoadingStore';
import styles from './NavigationLoader.module.scss';

export default function NavigationLoader() {
  const pathname = usePathname();
  const { isLoading, setLoading } = useLoadingStore();

  useEffect(() => {
    setLoading(false);
  }, [pathname, setLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay} aria-hidden="true">
      <span className={styles.spinner} />
    </div>
  );
}
