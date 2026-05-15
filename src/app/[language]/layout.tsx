import { notFound } from 'next/navigation';
import { LANGUAGE_SLUGS } from '@/data/navigation';
import type { LanguageSlug } from '@/types/navigation';
import Sidebar from '@/components/layout/Sidebar';
import styles from './layout.module.scss';

interface LanguageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ language: string }>;
}

export function generateStaticParams() {
  return LANGUAGE_SLUGS.map((language) => ({ language }));
}

export default async function LanguageLayout({ children, params }: LanguageLayoutProps) {
  const { language } = await params;

  if (!LANGUAGE_SLUGS.includes(language as LanguageSlug)) {
    notFound();
  }

  return (
    <div className={styles.layout}>
      <Sidebar language={language as LanguageSlug} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
