import { LANGUAGE_SLUGS } from '@/data/navigation';
import jsSyntax from '@/data/javascript/syntax';
import htmlSyntax from '@/data/html/syntax';
import cssSyntax from '@/data/css/syntax';
import reactSyntax from '@/data/react/syntax';
import tsSyntax from '@/data/typescript/syntax';
import type { LanguageSlug } from '@/types/navigation';
import type { SyntaxEntry } from '@/types/content';
import SyntaxPageShell from '@/components/layout/SyntaxPageShell';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const dataMap: Record<LanguageSlug, SyntaxEntry[]> = {
  javascript: jsSyntax,
  html: htmlSyntax,
  css: cssSyntax,
  react: reactSyntax,
  typescript: tsSyntax,
};

export function generateStaticParams() {
  return LANGUAGE_SLUGS.map((language) => ({ language }));
}

export default async function SyntaxPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const lang = language as LanguageSlug;
  const entries = dataMap[lang] ?? [];

  return (
    <>
      <Breadcrumbs />
      <SyntaxPageShell entries={entries} language={lang} section="syntax" />
    </>
  );
}
