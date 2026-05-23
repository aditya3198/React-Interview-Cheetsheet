/**
 * Lantern — drill deck builder.
 * Pure function — no side effects, easy to unit-test.
 */
import type { Lang, Level, CardProgress } from '@/types/lantern';

export type DrillSource = 'theory' | 'syntax' | 'qa' | 'qa-adv' | 'versions';

export interface DrillConfig {
  langs: Lang[];
  level: Level;
  sources: DrillSource[];
  size: number | 'all-weak';
  weakBias?: boolean;
}

export interface DeckEntry {
  id: string;
  kind: string;
  lang: Lang;
  depth?: 'core' | 'advanced';
  level?: Level;
}

export function buildDeck(
  cfg: DrillConfig,
  entries: DeckEntry[],
  progress: Record<string, CardProgress>
): string[] {
  if (cfg.langs.length === 0 || cfg.sources.length === 0) return [];

  const eligible = entries.filter((c) => {
    if (!cfg.langs.includes(c.lang)) return false;
    if (c.kind === 'qa' && c.level !== cfg.level) return false;
    return cfg.sources.some((s) => sourceMatches(s, c));
  });

  const now = Date.now();
  const weakBias = cfg.weakBias ?? true;

  const scored = eligible.map((c) => {
    const p = progress[c.id];
    let score = Math.random();
    if (weakBias && p?.flaggedWeak)           score += 3.0;
    if (p && Date.parse(p.due) <= now)        score += 1.5;
    if (!p)                                    score += 0.8;
    if (p?.lastGrade === 'got')               score -= 1.0;
    return { id: c.id, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const limit =
    cfg.size === 'all-weak'
      ? scored.filter(({ id }) => progress[id]?.flaggedWeak).length
      : cfg.size;

  return scored.slice(0, limit).map((s) => s.id);
}

function sourceMatches(src: DrillSource, c: DeckEntry): boolean {
  switch (src) {
    case 'theory':   return c.kind === 'theory';
    case 'syntax':   return c.kind === 'syntax';
    case 'qa':       return c.kind === 'qa' && c.depth === 'core';
    case 'qa-adv':   return c.kind === 'qa' && c.depth === 'advanced';
    case 'versions': return c.kind === 'version';
  }
}

const LANG_LABEL: Record<Lang, string> = {
  js: 'JavaScript', html: 'HTML', css: 'CSS', react: 'React',
};
const SRC_LABEL: Record<DrillSource, string> = {
  theory: 'Theory', syntax: 'Syntax', qa: 'Core Q&A',
  'qa-adv': 'Advanced Q&A', versions: 'Version diffs',
};

export function summarizeDeck(cfg: DrillConfig, deckSize: number): string {
  if (cfg.langs.length === 0) return 'Pick at least one stack to begin.';
  const langs = cfg.langs.map((l) => LANG_LABEL[l]).join(' & ');
  const srcs  = cfg.sources.map((s) => SRC_LABEL[s]).join(' + ');
  const weak  = cfg.weakBias !== false ? ', weighted toward your weak set' : '';
  return `${deckSize} cards · drawn from ${langs}, ${cfg.level} level — ${srcs}${weak}.`;
}
