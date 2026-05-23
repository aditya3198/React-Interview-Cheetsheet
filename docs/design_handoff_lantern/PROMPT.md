# Claude Code — kick-off prompt

Copy the block below into a fresh Claude Code session inside your repo. Adjust the path on the first line if the bundle lives somewhere other than `./design_handoff_lantern/`.

---

```
I'm implementing a frontend interview prep site called **Lantern** (formerly "frontprep"). The complete design handoff is in `./design_handoff_lantern/` — please start by reading `design_handoff_lantern/README.md` end-to-end. It contains:

- the brand + visual identity (warm-dark + paper-cream, single amber accent)
- design tokens (`code/_tokens.scss`)
- screen-by-screen layout specs for 8 pages
- the content type definitions (`code/types.ts`)
- a Zustand progress store with SM-2-lite scheduling (`code/useProgressStore.ts`)
- a pure deck-builder for drill mode (`code/buildDrillDeck.ts`)
- a theme hook with pre-paint snippet (`code/useTheme.ts`)

The HTML files in `design_handoff_lantern/prototypes/` and `design_handoff_lantern/favicons/` are **design references**, not production code. Recreate them in this codebase's existing stack and patterns. The README is authoritative — if it contradicts a prototype, follow the README.

Before writing any code:

1. Inspect this repo (`package.json`, framework, existing components, routing, state library) and tell me what you found.
2. Confirm or propose where each of the 8 screens should live in the routing tree.
3. Propose the implementation order (the README suggests one — feel free to disagree).
4. Flag any conflicts between the design tokens and the existing design system you'll need me to resolve.

Then wait for my go before generating files. Build in the suggested order — tokens + theme + shared shell first, then Home + Hub, then the content surfaces.

Two non-negotiable conventions from the README:

- **All code blocks must end with `// ▸ output` annotations** on result lines (system-wide — Theory, Syntax, Versions, Q&A, Drill).
- **No emoji anywhere.** Section markers are mono typographic glyphs (`§`, `{ }`, `v.`, `▷`, `?`, `↻`).

The favicon (`favicons/favicon.svg`) ships as-is — it has `prefers-color-scheme` media queries inside it and flips with the OS automatically.
```
