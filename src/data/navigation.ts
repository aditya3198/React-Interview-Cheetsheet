import type { LanguageMeta, SectionMeta, LanguageSlug } from '@/types/navigation';

export const LANGUAGES: LanguageMeta[] = [
  {
    slug: 'javascript',
    label: 'JavaScript',
    color: '#f7df1e',
    description: 'The language of the web — closures, async, ES2024 and beyond.',
  },
  {
    slug: 'html',
    label: 'HTML',
    color: '#e34c26',
    description: 'Structure, semantics, accessibility and modern HTML5.',
  },
  {
    slug: 'css',
    label: 'CSS',
    color: '#264de4',
    description: 'Flexbox, Grid, animations, custom properties and more.',
  },
  {
    slug: 'react',
    label: 'React',
    color: '#61dafb',
    description: 'Hooks, reconciliation, concurrent features and React 19.',
  },
];

export const SECTIONS: SectionMeta[] = [
  { slug: 'syntax',     label: 'Syntax',      icon: '{ }' },
  { slug: 'theory',     label: 'Theory',       icon: '📖' },
  { slug: 'versions',   label: 'Versions',     icon: '🕐' },
  { slug: 'playground', label: 'Playground',   icon: '⚡' },
  { slug: 'qna',        label: 'Q & A',        icon: '💬' },
];

export const LANGUAGE_SLUGS: LanguageSlug[] = ['javascript', 'html', 'css', 'react'];

export function getLanguageMeta(slug: string): LanguageMeta | undefined {
  return LANGUAGES.find((l) => l.slug === slug);
}
