export type LanguageSlug = 'javascript' | 'html' | 'css' | 'react' | 'typescript';
export type SectionSlug = 'syntax' | 'theory' | 'versions' | 'playground' | 'qna';

export interface LanguageMeta {
  slug: LanguageSlug;
  label: string;
  color: string;
  description: string;
}

export interface SectionMeta {
  slug: SectionSlug;
  label: string;
  icon: string;
}
