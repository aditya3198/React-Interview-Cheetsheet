import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LanguageSlug } from '@/types/navigation';

export type CardStatus = 'unseen' | 'review' | 'almost' | 'mastered';
export type Section = 'syntax' | 'theory' | 'versions' | 'playground' | 'qna';

export interface CardState {
  status: CardStatus;
  lastSeen: number;       // ms since epoch
  dueAt: number;          // ms since epoch — next time to surface in drill
  reps: number;           // total grading actions on this card
}

interface ProgressState {
  cards: Record<string, CardState>;        // key = `${lang}/${section}/${id}`
  pins:  string[];                         // pinned card keys
  streak: { count: number; lastDay: string };  // YYYY-MM-DD
  lastSeenByLang: Partial<Record<LanguageSlug, string>>; // last card key per language

  // Actions
  grade: (key: string, grade: 'again' | 'almost' | 'got') => void;
  togglePin: (key: string) => void;
  recordVisit: (key: string, lang: LanguageSlug) => void;
  tickStreak: () => void;

  // Selectors (called by components)
  dueCards: () => string[];                // cards with dueAt <= now
  reviewCards: () => string[];             // cards explicitly marked "review again"
  progressByLanguage: (lang: LanguageSlug) => { seen: number; total: number; pct: number };
}

// SM-2-lite intervals
const INTERVALS = {
  again:  10 * 60 * 1000,            // 10 minutes
  almost: 2  * 24 * 60 * 60 * 1000,  // 2 days
  got:    7  * 24 * 60 * 60 * 1000,  // 7 days
};

const today = () => new Date().toISOString().slice(0, 10);

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      cards: {},
      pins: [],
      streak: { count: 0, lastDay: '' },
      lastSeenByLang: {},

      grade: (key, grade) => set((s) => {
        const now = Date.now();
        const prev = s.cards[key];
        const status: CardStatus =
          grade === 'again' ? 'review' :
          grade === 'almost' ? 'almost' : 'mastered';
        return {
          cards: {
            ...s.cards,
            [key]: {
              status,
              lastSeen: now,
              dueAt: now + INTERVALS[grade],
              reps: (prev?.reps ?? 0) + 1,
            },
          },
        };
      }),

      togglePin: (key) => set((s) => ({
        pins: s.pins.includes(key) ? s.pins.filter(p => p !== key) : [...s.pins, key],
      })),

      recordVisit: (key, lang) => set((s) => ({
        lastSeenByLang: { ...s.lastSeenByLang, [lang]: key },
      })),

      tickStreak: () => set((s) => {
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

      dueCards: () => {
        const now = Date.now();
        return Object.entries(get().cards)
          .filter(([, c]) => c.dueAt <= now && c.status !== 'mastered')
          .map(([k]) => k);
      },

      reviewCards: () =>
        Object.entries(get().cards)
          .filter(([, c]) => c.status === 'review')
          .map(([k]) => k),

      progressByLanguage: (lang) => {
        const seen = Object.keys(get().cards).filter(k =>
          k.startsWith(`${lang}/`) && get().cards[k].status !== 'unseen'
        ).length;
        return { seen, total: 0, pct: 0 }; // hydrate `total` at the call site
      },
    }),
    { name: 'frontprep:progress:v1' }
  )
);
