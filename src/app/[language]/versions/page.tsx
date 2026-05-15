export const runtime = 'edge';
import { LANGUAGE_SLUGS } from '@/data/navigation';
import jsVersions from '@/data/javascript/versions';
import htmlVersions from '@/data/html/versions';
import cssVersions from '@/data/css/versions';
import reactVersions from '@/data/react/versions';
import type { LanguageSlug } from '@/types/navigation';
import type { VersionEntry } from '@/types/content';
import VersionsSection from '@/components/sections/VersionsSection';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const dataMap: Record<LanguageSlug, VersionEntry[]> = {
  javascript: jsVersions,
  html: htmlVersions,
  css: cssVersions,
  react: reactVersions,
};

export function generateStaticParams() {
  return LANGUAGE_SLUGS.map((language) => ({ language }));
}

export default async function VersionsPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const versions = dataMap[language as LanguageSlug] ?? [];

  return (
    <>
      <Breadcrumbs />
      <VersionsSection versions={versions} />
    </>
  );
}
