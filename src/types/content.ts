export type Language = 'javascript' | 'typescript' | 'html' | 'css' | 'jsx' | 'bash' | 'json';

export type Tier = 'core' | 'advanced';
export type Level = 'fresher' | 'experienced' | 'expert';

export interface SyntaxEntry {
  id: string;
  title: string;
  description: string;
  language: Language;
  code: string;
  tags: string[];
  since?: string;
  tier?: Tier;
  level?: Level;
}

export interface ConceptCard {
  id: string;
  title: string;
  summary: string;
  body: string;
  diagram?: { type: 'ascii'; content: string };
  tags: string[];
  tier?: Tier;
  level?: Level;
}

export interface VersionHighlight {
  feature: string;
  description: string;
  codeExample?: string;
  breakingChange?: boolean;
}

export interface VersionEntry {
  version: string;
  releaseYear: number;
  highlights: VersionHighlight[];
}

// QnaDifficulty now uses Level values (fresher/experienced/expert)
export type QnaDifficulty = Level;

export interface QnaItem {
  id: string;
  question: string;
  answer: string;
  codeExample?: string;
  codeLanguage?: Language;
  difficulty: QnaDifficulty;
  tags: string[];
  tier?: Tier;
}
