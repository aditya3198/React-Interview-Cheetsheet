import { redirect } from 'next/navigation';
import { LANGUAGE_SLUGS } from '@/data/navigation';

export function generateStaticParams() {
  return LANGUAGE_SLUGS.map((language) => ({ language }));
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  redirect(`/${language}/syntax`);
}
