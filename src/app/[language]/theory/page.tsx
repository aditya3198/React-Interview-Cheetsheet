import { LANGUAGE_SLUGS } from '@/data/navigation';
import jsTheory from '@/data/javascript/theory';
import htmlTheory from '@/data/html/theory';
import cssTheory from '@/data/css/theory';
import reactTheory from '@/data/react/theory';
import tsTheory from '@/data/typescript/theory';
import type { LanguageSlug } from '@/types/navigation';
import type { ConceptCard } from '@/types/content';
import TheorySection from '@/components/sections/TheorySection';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const dataMap: Record<LanguageSlug, ConceptCard[]> = {
  javascript: jsTheory,
  html: htmlTheory,
  css: cssTheory,
  react: reactTheory,
  typescript: tsTheory,
};

export function generateStaticParams() {
  return LANGUAGE_SLUGS.map((language) => ({ language }));
}

export default async function TheoryPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const cards = dataMap[language as LanguageSlug] ?? [];

  return (
    <>
      <Breadcrumbs />
      <TheorySection cards={cards} language={language as LanguageSlug} />
    </>
  );
}
