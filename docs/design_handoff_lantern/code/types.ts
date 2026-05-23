/**
 * Lantern — content type definitions.
 * The schema every section (Theory, Syntax, Versions, Playground, Q&A, Drill) reads against.
 */

export type Lang = "js" | "html" | "css" | "react";
export type Level = "fresher" | "experienced" | "expert";
export type Difficulty = "easy" | "med" | "hard";

/** What kind of content this entry is — drives layout and where it shows up. */
export type ContentKind =
  | "theory"     // chapter, long-form
  | "syntax"     // one-concept card
  | "version"    // before/after diff
  | "playground" // runnable sandbox template
  | "qa";        // interview Q&A

/** Common metadata on every content entry. */
export interface BaseContent {
  id: string;
  slug: string;
  lang: Lang;
  kind: ContentKind;
  title: string;
  /** Short subtitle / dek shown under the title on its own page. */
  dek?: string;
  /** Comma-tag taxonomy: "scope", "async", "layout", "hooks", "perf", "a11y", … */
  tags: string[];
  /** ECMAScript / CSS / HTML / React version this was introduced in. */
  since?: string;
  updatedAt: string;
}

export interface TheoryChapter extends BaseContent {
  kind: "theory";
  /** Markdown body with ```js fences. Rendered with the editorial layout. */
  body: string;
  /** Optional inline diagrams — referenced by id from inside the body. */
  figures?: Figure[];
  readingMinutes: number;
  /** id's of related QA / Syntax cards, surfaced in the right rail. */
  related: { drill: string[]; playground: string[]; qa: string[] };
}

export interface SyntaxCard extends BaseContent {
  kind: "syntax";
  description: string;
  /** Code body. Use `// ▸ output` annotations on result lines (system-wide convention). */
  code: string;
  difficulty: Difficulty;
  /** Section grouping inside the syntax page sidebar (e.g. "Declarations"). */
  section: string;
}

export interface VersionDiff extends BaseContent {
  kind: "version";
  /** Why it shipped — one-line caption above the diff. */
  why: string;
  versionFrom: string;     // "ES2018"
  versionTo:   string;     // "ES2020"
  /** Before-pane code + caption. */
  before: { code: string; caption?: string };
  /** After-pane code + caption. Omit when feature was removed/deprecated. */
  after?: { code: string; caption?: string };
  category: "syntax" | "stdlib" | "runtime" | "removed";
  highImpact?: boolean;
}

export interface PlaygroundTemplate extends BaseContent {
  kind: "playground";
  /** Multi-file sandbox — keys are filenames, values are file contents. */
  files: Record<string, { content: string; lang: "js" | "jsx" | "css" | "html" | "tsx" }>;
  entry: string;            // filename to render
  expectedConsole?: string[];
}

export interface QA extends BaseContent {
  kind: "qa";
  question: string;
  tldr: string;             // one-line "the answer" — shown collapsed
  answer: string;           // full markdown answer
  /** Bucket: foundational ("core") or senior-only ("advanced"). */
  depth: "core" | "advanced";
  level: Level;             // fresher / experienced / expert
  /** Companies known to have asked this (display-only). */
  askedAt?: string[];
}

export interface Figure {
  id: string;
  caption: string;
  /** SVG markup or an asset path. */
  svg: string;
}

/** Per-card progress entry stored in localStorage. */
export interface CardProgress {
  cardId: string;
  /** SM-2 lite: ease factor and current interval (in days). */
  ease: number;
  intervalDays: number;
  /** Next due date as ISO string. */
  due: string;
  /** Last grade — drives the deck weighting. */
  lastGrade: "again" | "ok" | "got" | null;
  /** True when user has explicitly flagged "review again". */
  flaggedWeak: boolean;
  /** True when pinned to the right rail of a content page. */
  pinned: boolean;
  reviewedAt?: string;
}
