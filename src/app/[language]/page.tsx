'use client';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${language}/syntax`);
  }, [language, router]);

  return null;
}
