/**
 * Lantern — progress store (Zustand + localStorage).
 * SM-2-lite scheduling per card. Migrates from legacy "frontprep:progress:v1" shape.
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CardProgress } from '@/types/lantern';
import type { LanguageSlug } from '@/types/navigation';

type Grade = 'again' | 'ok' | 'got';

interface ProgressState {
  cards: Record<string, CardProgress>;
  lastSeen: Partial<Record<LanguageSlug, string>>;
  streak: { count: number; lastDay: string };

  grade:      (cardId: string, grade: Grade) => void;
  flagWeak:   (cardId: string, weak: boolean) => void;
  pin:        (cardId: string, pinned: boolean) => void;
  setLastSeen:(lang: LanguageSlug, cardId: string) => void;
  tickStreak: () => void;
  reset:      (cardId?: string) => void;

  weakCards: () => string[];
  dueCards:  () => string[];
  reviewCards: () => string[];
  progressByLanguage: (lang: LanguageSlug) => { seen: number; total: number; pct: number };
  pins: string[];
  togglePin: (cardId: string) => void;
}

const INTERVALS: Record<Grade, number> = {
  again: 10 / 60 / 24,
  ok:    2,
  got:   7,
};

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const today = () => new Date().toISOString().slice(0, 10);

function nextDue(prev: CardProgress | undefined, grade: Grade): CardProgress {
  const ease = clamp((prev?.ease ?? 2.5) + (grade === 'got' ? 0.1 : grade === 'ok' ? 0 : -0.2), 1.3, 2.8);
  const base = INTERVALS[grade];
  const intervalDays = grade === 'got' ? Math.max(base, (prev?.intervalDays ?? 0) * ease) : base;
  return {
    cardId: prev?.cardId ?? '',
    ease,
    intervalDays,
    due: new Date(Date.now() + intervalDays * 86_400_000).toISOString(),
    lastGrade: grade,
    flaggedWeak: grade === 'again' ? true : (prev?.flaggedWeak ?? false) && grade !== 'got',
    pinned: prev?.pinned ?? false,
    reviewedAt: new Date().toISOString(),
  };
}

function blank(cardId: string): CardProgress {
  return { cardId, ease: 2.5, intervalDays: 0, due: new Date().toISOString(), lastGrade: null, flaggedWeak: false, pinned: false };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      cards: {},
      lastSeen: {},
      streak: { count: 0, lastDay: '' },
      pins: [],

      grade: (cardId, grade) =>
        set((s) => ({
          cards: { ...s.cards, [cardId]: { ...nextDue(s.cards[cardId], grade), cardId } },
        })),

      flagWeak: (cardId, weak) =>
        set((s) => ({
          cards: { ...s.cards, [cardId]: { ...(s.cards[cardId] ?? blank(cardId)), flaggedWeak: weak } },
        })),

      pin: (cardId, pinned) =>
        set((s) => ({
          cards: { ...s.cards, [cardId]: { ...(s.cards[cardId] ?? blank(cardId)), pinned } },
        })),

      togglePin: (cardId) =>
        set((s) => ({
          pins: s.pins.includes(cardId)
            ? s.pins.filter((p) => p !== cardId)
            : [...s.pins, cardId],
          cards: { ...s.cards, [cardId]: { ...(s.cards[cardId] ?? blank(cardId)), pinned: !s.cards[cardId]?.pinned } },
        })),

      setLastSeen: (lang, cardId) =>
        set((s) => ({ lastSeen: { ...s.lastSeen, [lang]: cardId } })),

      tickStreak: () =>
        set((s) => {
          const t = today();
          if (s.streak.lastDay === t) return {};
          const wasYesterday = (() => {
            if (!s.streak.lastDay) return false;
            const d = new Date(s.streak.lastDay);
            d.setDate(d.getDate() + 1);
            return d.toISOString().slice(0, 10) === t;
          })();
          return { streak: { count: wasYesterday ? s.streak.count + 1 : 1, lastDay: t } };
        }),

      reset: (cardId) =>
        set((s) => {
          if (!cardId) return { cards: {} };
          const { [cardId]: _, ...rest } = s.cards;
          return { cards: rest };
        }),

      weakCards:  () => Object.values(get().cards).filter((c) => c.flaggedWeak).map((c) => c.cardId),
      dueCards:   () => {
        const now = Date.now();
        return Object.values(get().cards)
          .filter((c) => Date.parse(c.due) <= now)
          .sort((a, b) => Date.parse(a.due) - Date.parse(b.due))
          .map((c) => c.cardId);
      },
      reviewCards: () => Object.values(get().cards).filter((c) => c.flaggedWeak).map((c) => c.cardId),

      progressByLanguage: (lang) => {
        const seen = Object.keys(get().cards).filter(
          (k) => k.startsWith(`${lang}/`) && get().cards[k].lastGrade !== null
        ).length;
        return { seen, total: 0, pct: 0 };
      },
    }),
    {
      name: 'lantern:progress',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted: unknown, version: number) => {
        if (version === 0) {
          // Migrate from legacy frontprep:progress:v1 shape
          const old = persisted as { cards?: Record<string, { status?: string; dueAt?: number; reps?: number }> };
          const cards: Record<string, CardProgress> = {};
          for (const [key, c] of Object.entries(old?.cards ?? {})) {
            cards[key] = {
              cardId: key,
              ease: 2.5,
              intervalDays: c.status === 'mastered' ? 7 : c.status === 'almost' ? 2 : 0,
              due: new Date(c.dueAt ?? Date.now()).toISOString(),
              lastGrade: c.status === 'mastered' ? 'got' : c.status === 'almost' ? 'ok' : c.status === 'review' ? 'again' : null,
              flaggedWeak: c.status === 'review',
              pinned: false,
            };
          }
          return { cards, lastSeen: {}, streak: { count: 0, lastDay: '' }, pins: [] };
        }
        return persisted;
      },
    }
  )
);
