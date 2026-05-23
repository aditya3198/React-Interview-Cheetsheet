import { LANGUAGE_SLUGS } from '@/data/navigation';
import jsQna from '@/data/javascript/qna';
import htmlQna from '@/data/html/qna';
import cssQna from '@/data/css/qna';
import reactQna from '@/data/react/qna';
import tsQna from '@/data/typescript/qna';
import type { LanguageSlug } from '@/types/navigation';
import type { QnaItem } from '@/types/content';
import QnaSection from '@/components/sections/QnaSection';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const dataMap: Record<LanguageSlug, QnaItem[]> = {
  javascript: jsQna,
  html: htmlQna,
  css: cssQna,
  react: reactQna,
  typescript: tsQna,
};

export function generateStaticParams() {
  return LANGUAGE_SLUGS.map((language) => ({ language }));
}

export default async function QnaPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const items = dataMap[language as LanguageSlug] ?? [];

  return (
    <>
      <Breadcrumbs />
      <QnaSection items={items} />
    </>
  );
}
