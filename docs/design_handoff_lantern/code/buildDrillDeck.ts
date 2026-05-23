/**
 * Lantern — drill deck builder.
 * Encodes the setup-screen rules from prototypes/drill.html.
 *
 *   const deck = buildDeck({
 *     langs: ["js", "react"],
 *     level: "fresher",
 *     sources: ["theory", "syntax", "qa"],   // omit "qa-adv" / "versions" to skip
 *     size: 25,                              // or "all-weak"
 *     weakBias: true,                        // weight toward flagged cards
 *   }, contentRepo, progress);
 *
 * The output is an ordered list of `cardId`s ready to feed the flashcard loop.
 */
import type { BaseContent, Lang, Level, QA, CardProgress } from "./types";

export type DrillSource =
  | "theory"
  | "syntax"
  | "qa"
  | "qa-adv"
  | "versions";

export interface DrillConfig {
  langs: Lang[];                 // must be non-empty
  level: Level;
  sources: DrillSource[];        // empty = no deck
  size: number | "all-weak";
  weakBias?: boolean;            // true = oversample flagged cards (default true)
}

export interface ContentRepo {
  all: BaseContent[];            // flat list of every entry across kinds
}

/** Map each DrillSource to the predicate that says "this content qualifies". */
function sourceMatches(src: DrillSource, c: BaseContent): boolean {
  switch (src) {
    case "theory":   return c.kind === "theory";
    case "syntax":   return c.kind === "syntax";
    case "qa":       return c.kind === "qa" && (c as QA).depth === "core";
    case "qa-adv":   return c.kind === "qa" && (c as QA).depth === "advanced";
    case "versions": return c.kind === "version";
  }
}

/** Build the deck. Pure function — no side effects, easy to test. */
export function buildDeck(
  cfg: DrillConfig,
  repo: ContentRepo,
  progress: Record<string, CardProgress>
): string[] {
  if (cfg.langs.length === 0 || cfg.sources.length === 0) return [];

  // 1) Filter: language + level (QA only) + at least one matching source.
  const eligible = repo.all.filter((c) => {
    if (!cfg.langs.includes(c.lang)) return false;
    if (c.kind === "qa" && (c as QA).level !== cfg.level) return false;
    return cfg.sources.some((s) => sourceMatches(s, c));
  });

  // 2) Score each card: weak cards weigh most, due cards next, fresh content last.
  const now = Date.now();
  const weakBias = cfg.weakBias ?? true;
  const scored = eligible.map((c) => {
    const p = progress[c.id];
    let score = Math.random();                                  // shuffle baseline
    if (weakBias && p?.flaggedWeak)              score += 3.0;  // strongly prefer weak
    if (p && Date.parse(p.due) <= now)           score += 1.5;  // due cards next
    if (!p)                                       score += 0.8;  // unseen cards still get airtime
    if (p?.lastGrade === "got")                  score -= 1.0;  // recently mastered → demote
    return { id: c.id, score };
  });

  // 3) Sort descending and slice to the requested size.
  scored.sort((a, b) => b.score - a.score);
  const limit = cfg.size === "all-weak"
    ? scored.filter(({ id }) => progress[id]?.flaggedWeak).length
    : cfg.size;

  return scored.slice(0, limit).map((s) => s.id);
}

/** Human summary line shown above the "Begin" button — matches drill.html. */
export function summarize(cfg: DrillConfig, deck: string[]): string {
  if (cfg.langs.length === 0) return "Pick at least one stack to begin.";
  const langPretty = cfg.langs.map(langName).join(" & ");
  const srcPretty  = cfg.sources.filter((s) => s !== "weak" as any).map(sourceName).join(" + ");
  const weak = cfg.weakBias ? ", weighted toward your weak set" : "";
  return `${deck.length} cards · drawn from ${langPretty}, ${cfg.level} level — ${srcPretty}${weak}.`;
}
function langName(k: Lang) {
  return ({ js: "JavaScript", html: "HTML", css: "CSS", react: "React" } as const)[k];
}
function sourceName(s: DrillSource) {
  return ({ theory: "Theory", syntax: "Syntax", qa: "Core Q&A", "qa-adv": "Advanced Q&A", versions: "Version diffs" } as const)[s];
}
