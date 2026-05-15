export const runtime = 'edge';
import { redirect } from 'next/navigation';

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  redirect(`/${language}/syntax`);
}
