/**
 * Lantern — progress store (Zustand + localStorage).
 * Tracks per-card review state across all four stacks, with SM-2-lite scheduling.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CardProgress } from "./types";

type Grade = "again" | "ok" | "got";

interface ProgressState {
  cards: Record<string, CardProgress>;
  lastSeen: Partial<Record<"js" | "html" | "css" | "react", string>>;

  grade: (cardId: string, grade: Grade) => void;
  flagWeak: (cardId: string, weak: boolean) => void;
  pin:      (cardId: string, pinned: boolean) => void;
  setLastSeen: (lang: keyof ProgressState["lastSeen"], cardId: string) => void;
  reset:    (cardId?: string) => void;
  weakCards:  () => string[];
  dueCards:   () => string[];
}

/** SM-2-lite intervals — kept deliberately tame for nightly studiers. */
const INTERVAL_MIN_BY_GRADE: Record<Grade, number> = {
  again: 10 / 60 / 24, // 10 minutes
  ok:    2,             // 2 days
  got:   7,             // 7 days (compounds with ease factor)
};

function nextDue(prev: CardProgress | undefined, grade: Grade): CardProgress {
  const ease = clamp((prev?.ease ?? 2.5) + (grade === "got" ? 0.1 : grade === "ok" ? 0 : -0.2), 1.3, 2.8);
  const base = INTERVAL_MIN_BY_GRADE[grade];
  const intervalDays = grade === "got" ? Math.max(base, (prev?.intervalDays ?? 0) * ease) : base;
  return {
    cardId: prev?.cardId ?? "",
    ease,
    intervalDays,
    due: new Date(Date.now() + intervalDays * 86_400_000).toISOString(),
    lastGrade: grade,
    flaggedWeak: grade === "again" ? true : (prev?.flaggedWeak ?? false) && grade !== "got",
    pinned: prev?.pinned ?? false,
    reviewedAt: new Date().toISOString(),
  };
}
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      cards: {},
      lastSeen: {},

      grade: (cardId, grade) =>
        set((s) => ({
          cards: {
            ...s.cards,
            [cardId]: { ...nextDue(s.cards[cardId], grade), cardId },
          },
        })),

      flagWeak: (cardId, weak) =>
        set((s) => ({
          cards: {
            ...s.cards,
            [cardId]: {
              ...(s.cards[cardId] ?? blank(cardId)),
              flaggedWeak: weak,
            },
          },
        })),

      pin: (cardId, pinned) =>
        set((s) => ({
          cards: {
            ...s.cards,
            [cardId]: {
              ...(s.cards[cardId] ?? blank(cardId)),
              pinned,
            },
          },
        })),

      setLastSeen: (lang, cardId) =>
        set((s) => ({ lastSeen: { ...s.lastSeen, [lang]: cardId } })),

      reset: (cardId) =>
        set((s) => {
          if (!cardId) return { cards: {} };
          const { [cardId]: _, ...rest } = s.cards;
          return { cards: rest };
        }),

      weakCards: () =>
        Object.values(get().cards)
          .filter((c) => c.flaggedWeak)
          .map((c) => c.cardId),

      dueCards: () => {
        const now = Date.now();
        return Object.values(get().cards)
          .filter((c) => Date.parse(c.due) <= now)
          .sort((a, b) => Date.parse(a.due) - Date.parse(b.due))
          .map((c) => c.cardId);
      },
    }),
    { name: "lantern:progress", version: 1 }
  )
);

function blank(cardId: string): CardProgress {
  return {
    cardId,
    ease: 2.5,
    intervalDays: 0,
    due: new Date().toISOString(),
    lastGrade: null,
    flaggedWeak: false,
    pinned: false,
  };
}
