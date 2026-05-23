/**
 * Lantern — content + progress type definitions.
 * All 8 surfaces read against this schema.
 */

export type Lang = 'js' | 'html' | 'css' | 'react';
export type Level = 'fresher' | 'experienced' | 'expert';
export type Difficulty = 'easy' | 'med' | 'hard';

export type ContentKind = 'theory' | 'syntax' | 'version' | 'playground' | 'qa';

export interface BaseContent {
  id: string;
  slug: string;
  lang: Lang;
  kind: ContentKind;
  title: string;
  dek?: string;
  tags: string[];
  since?: string;
  updatedAt: string;
}

export interface TheoryChapter extends BaseContent {
  kind: 'theory';
  body: string;
  figures?: Figure[];
  readingMinutes: number;
  related: { drill: string[]; playground: string[]; qa: string[] };
}

export interface SyntaxCard extends BaseContent {
  kind: 'syntax';
  description: string;
  /** Use `// ▸ output` annotations on result lines. */
  code: string;
  difficulty: Difficulty;
  section: string;
}

export interface VersionDiff extends BaseContent {
  kind: 'version';
  why: string;
  versionFrom: string;
  versionTo: string;
  before: { code: string; caption?: string };
  after?: { code: string; caption?: string };
  category: 'syntax' | 'stdlib' | 'runtime' | 'removed';
  highImpact?: boolean;
}

export interface PlaygroundTemplate extends BaseContent {
  kind: 'playground';
  files: Record<string, { content: string; lang: 'js' | 'jsx' | 'css' | 'html' | 'tsx' }>;
  entry: string;
  expectedConsole?: string[];
}

export interface QA extends BaseContent {
  kind: 'qa';
  question: string;
  tldr: string;
  answer: string;
  depth: 'core' | 'advanced';
  level: Level;
  askedAt?: string[];
}

export interface Figure {
  id: string;
  caption: string;
  svg: string;
}

/** Per-card progress — SM-2-lite. Stored in localStorage["lantern:progress"]. */
export interface CardProgress {
  cardId: string;
  ease: number;
  intervalDays: number;
  due: string;
  lastGrade: 'again' | 'ok' | 'got' | null;
  flaggedWeak: boolean;
  pinned: boolean;
  reviewedAt?: string;
}
