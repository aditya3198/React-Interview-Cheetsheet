import type { LanguageMeta, SectionMeta, LanguageSlug } from '@/types/navigation';

export const LANGUAGES: LanguageMeta[] = [
  {
    slug: 'javascript',
    label: 'JavaScript',
    color: '#e8c547',
    description: 'The language of the web — closures, async, ES2024 and beyond.',
  },
  {
    slug: 'html',
    label: 'HTML',
    color: '#d97757',
    description: 'Structure, semantics, accessibility and modern HTML5.',
  },
  {
    slug: 'css',
    label: 'CSS',
    color: '#6f93d6',
    description: 'Flexbox, Grid, animations, custom properties and more.',
  },
  {
    slug: 'react',
    label: 'React',
    color: '#6fc3d6',
    description: 'Hooks, reconciliation, concurrent features and React 19.',
  },
  {
    slug: 'typescript',
    label: 'TypeScript',
    color: '#3178c6',
    description: 'Static typing, generics, utility types, and type-level programming.',
  },
];

export const SECTIONS: SectionMeta[] = [
  { slug: 'syntax',     label: 'Syntax',      icon: '{ }' },
  { slug: 'theory',     label: 'Theory',       icon: '§' },
  { slug: 'versions',   label: 'Versions',     icon: 'v.' },
  { slug: 'playground', label: 'Playground',   icon: '▷' },
  { slug: 'qna',        label: 'Q & A',        icon: '?' },
];

export const LANGUAGE_SLUGS: LanguageSlug[] = ['javascript', 'html', 'css', 'react', 'typescript'];

export function getLanguageMeta(slug: string): LanguageMeta | undefined {
  return LANGUAGES.find((l) => l.slug === slug);
}
