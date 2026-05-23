# Handoff: Lantern (formerly frontprep)

> **One-line:** Recreate this design — a frontend interview prep site, renamed from "frontprep" to "Lantern", with four new sections (Theory, Versions, Playground, Q&A by level), a fixed drill mode (language picker + output annotations), and a light/dark theme.

---

## About the design files

The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. Your task is to **recreate these HTML designs in the target codebase's existing environment** (Next.js + SCSS modules, the existing stack) using its established patterns and libraries. If you're starting fresh, Next.js 14 + TypeScript + Zustand for state + Tailwind or plain CSS-vars are all good choices — the design is framework-agnostic.

The CSS in the prototypes is illustrative; the proper data shapes are in `code/types.ts` and the proper state stores are in `code/useProgressStore.ts` + `code/useTheme.ts`.

## Fidelity

**High-fidelity.** Pixel-perfect mockups with final colors, typography, spacing, and copy. Use the exact hex values, font choices, and layout proportions from the prototypes. Hover, focus, and active states are illustrated in the prototypes — match them.

---

## Why this redesign exists

The previous site, frontprep:

1. **Shared its name** with another live interview-prep service — needed a unique brand.
2. **Promised six surfaces but shipped two.** Theory, Versions diffs, Playground, and a level-segmented Q&A were missing entirely. (Code-only Syntax cards existed, and a flat Q&A list.)
3. **Code snippets had no output annotations** — every example showed input only, which defeats interview prep ("what does this log?" is the test).
4. **Drill mode could not be scoped to chosen languages**, making it unusable for anyone who didn't already know all four stacks.
5. **Dark-mode only** with low-contrast muted text.

The redesign addresses all five.

---

## Brand

- **Name:** Lantern
- **Tagline (working):** "The light you keep on while you revise."
- **Logo / favicon:** italic Instrument Serif lowercase "l" on a 12-radius rounded square, with a 4.5-px amber dot at `cx=16, cy=20` representing the flame. Ships as **one SVG** with `prefers-color-scheme` media queries inside (`favicons/favicon.svg`) — auto-flips with the OS. The amber dot stays constant; only the paper/ink swap.
- **Brand mark in app:** italic serif wordmark "lantern" + the same amber dot. See `.lantern-mark` in `prototypes/_shared.css`.

---

## Design tokens

See `code/_tokens.scss` for the full token set. Quick summary:

### Colors

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#14110e` | `#f3ede0` | page ground |
| `--bg-1` | `#1a1612` | `#ebe5d6` | raised card |
| `--bg-2` | `#221c17` | `#e0d9c7` | inner chip |
| `--bg-3` | `#2b241d` | `#d6cebb` | hover/active |
| `--line` | `rgba(236,231,221,0.09)` | `rgba(28,26,22,0.10)` | hairlines |
| `--line-strong` | `rgba(236,231,221,0.16)` | `rgba(28,26,22,0.20)` | borders |
| `--fg` | `#ece7dd` | `#1c1a16` | primary text |
| `--fg-mute` | `#a39a8c` | `#5d5648` | secondary text |
| `--fg-dim` | `#6f6759` | `#8a8273` | tertiary / labels |
| `--accent` | `#d4a04a` | `#b87a26` | the flame; only highlight colour |
| `--accent-soft` | `rgba(212,160,74,0.14)` | `rgba(184,122,38,0.14)` | accent fills |
| `--accent-line` | `rgba(212,160,74,0.35)` | `rgba(184,122,38,0.40)` | accent borders |
| `--accent-ink` | `#1a1305` | `#fff7e6` | text colour ON accent |

**Language dot colours** (dark / light, used only as 6–10 px dots + 3 px progress bars — never as backgrounds):

| Lang | Dark | Light |
|---|---|---|
| JavaScript | `#e8c547` | `#c69a16` |
| HTML | `#d97757` | `#b8552f` |
| CSS | `#6f93d6` | `#3a64bd` |
| React | `#6fc3d6` | `#2d8aa5` |

**Level colours** (used in difficulty + level pills):

| Level | Dark | Light |
|---|---|---|
| Easy / Fresher | `#88b07a` | `#5a8049` |
| Med / Experienced | `#d4a04a` | `#b87a26` |
| Hard / Expert | `#cf6f5f` | `#a8462f` |

### Typography

- **Display** — Instrument Serif (Google Fonts). 400 weight, regular + italic. Used for h1–h3, page hero, drop-caps, pull-quotes. Letter-spacing `-0.02em` on hero, `-0.01em` on smaller headings.
- **Sans** — IBM Plex Sans (Google Fonts). 400/500/600. Used for body text, UI labels, buttons.
- **Mono** — JetBrains Mono (Google Fonts). 400/500/600. Used for code, eyebrows (uppercase tracked labels), file paths, kbd, counts.

Setup file (`code/fonts.ts`) shows the Next.js `next/font` configuration.

Display sizes (clamp on hero, fixed elsewhere):

- Hero h1 — `clamp(48px, 7.5vw, 96px)`, line-height `0.98`
- Page h1 — `56px`
- h2 — `36px`
- h3 — `22px`
- Body — `16px`, line-height `1.55`
- Small / meta — `13.5px`
- Mono labels (eyebrows) — `11px`, letter-spacing `0.12em`, UPPERCASE

### Spacing & radius

- Radii: `--r-sm: 4px`, `--r: 8px`, `--r-lg: 14px`, `--r-xl: 18px`
- Spacing scale: 4 → 8 → 12 → 16 → 24 → 32 → 48 → 64

### Motion

- Durations: `--dur-fast: 120ms`, `--dur-base: 200ms`, `--dur-slow: 280ms`
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- All transitions on hover (border, background, transform), card lift `translateY(-2px)`, page-theme switch `220ms`.
- **Honour `prefers-reduced-motion`** — gate entrance animations behind it.

---

## Site map / screens

| Path | File | Purpose |
|---|---|---|
| `/` | `prototypes/home.html` | Marketing-shaped landing with six-surface grid + 3 study paths |
| `/hub` | `prototypes/hub.html` | Authed-feeling overview — donut + per-language progress + weak-cards CTA |
| `/[lang]/theory/[slug]` | `prototypes/theory.html` | Long-form chapter — editorial layout, drop-cap, diagram, reading rail |
| `/[lang]/syntax` | `prototypes/syntax.html` | One-concept cards grid with pin/filter/search |
| `/[lang]/versions` | `prototypes/versions.html` | From/to picker + timeline + before/after diff cards |
| `/playground` | `prototypes/playground.html` | Tabbed editor + live preview + console |
| `/qa` | `prototypes/qa.html` | Core/Advanced × Fresher/Experienced/Expert quick-read |
| `/drill` | `prototypes/drill.html` | Setup screen → flashcard loop with SM-2-lite grading |
| `/brand` (internal) | `favicons/index.html` | Brand reference for the team |

---

## Per-screen specifications

### 1. Home (`home.html`)

**Layout:** Single column, max-width `1100px`, padded `96px 28px 60px`.

- **Top nav** (sticky, 60 px tall, 1 px bottom border): brand mark left → primary links → cmd-K search → theme toggle. Links: Hub, Theory, Syntax, Versions, Playground, Q&A, Drill.
- **Hero block**:
  - Eyebrow — mono 11.5 px, uppercase, accent, leading 1-px-tall 18-px-wide rule.
  - h1 — display, clamp-sized, with one italic accent phrase (`<em>` styled `color: var(--accent)`).
  - Lede — 18 px, mute, max-width 56 ch.
  - CTA row — accent solid button + ghost outline button.
- **Live-stats ribbon** — 4-column grid with full-width top + bottom rules; each cell has a language label (7-px dot + mono uppercase), large display number, sub-caption, and a 3-px progress bar.
- **"Six surfaces" grid** — 3-col × 2-row of card tiles. Each card: mono `gly` glyph + count, display h3, mute description, accent meta link.
- **"How people use it"** — 3-col path cards: Full revision (2 weeks), Daily drill (10 min), Tomorrow I have an interview (90 min).
- **Footer** — 1 px top border, mono small text.

### 2. Hub (`hub.html`)

**Layout:** Same top nav (with current page `class="on"`), max-width `1100px`, padded `56px 28px 80px`.

- **Crumbs** — mono small.
- **Page h1 + lede.**
- **Progress overview card** — 1 px border, `--r-lg` radius:
  - Left: 120 × 120 SVG donut, accent stroke (`stroke-dashoffset` driven by overall %), `52px` display number with `%` in mute.
  - Right: per-language bars, 4 rows: lang dot + name + 6-px track with coloured fill + mono "n / total".
- **Language cards grid** — 2-column, each card has:
  - Header row: lang dot + display name + mono % badge.
  - Description.
  - 6-column section grid (Theory / Syntax / Versions / Playground / Q&A / Drill) — each cell is a mini-card with mono section glyph+title, big display count, 3-px micro progress bar.
  - Footer: mono "Last seen <b>card title</b>" + accent "Resume →".
- **"27 cards marked Review again" CTA** — dashed border, accent-soft circle icon + heading + sub + accent pill button.

### 3. Theory (`theory.html`)

**Layout:** 3-column shell — `240px sidebar + 1fr main + 280px right rail`. Below 1100 px the right rail hides; below 700 px the sidebar collapses to a button.

- **Sidebar:** language indicator → nav list for the 6 sections (active section gets accent-soft background + 2-px accent left border) → "Chapters" list → "Other stacks" list with coloured dots.
- **Main (max 760 px wide):**
  - Eyebrow: "Chapter 5 · JavaScript · Theory"
  - h1 — 56 px display.
  - Dek — 22 px italic display, mute.
  - Byline — mono small with dots between items.
  - **Body** — 17 px, line-height 1.75. First paragraph has a serif drop-cap (`::first-letter` 72 px, accent, floated).
  - Inline `<figure>` with custom SVG diagram + mono figcaption.
  - Blockquote — 3-px accent left border, accent-soft background, italic serif.
  - Callouts — 2-col grid: 28-px serif italic accent glyph + heading + body.
  - Code blocks with `// ▸ output` annotations on result lines.
  - Pager — 2-col previous/next chapter cards at the bottom.
- **Right rail:** "32 % through chapter" + 3-px bar → in-chapter TOC (active item gets accent left border) → actions rail (drill this chapter, open in playground, related Q&A, pin chapter).

### 4. Syntax (`syntax.html`)

3-column shell — `220px sidebar + 1fr main + 320px right pinned-panel`. Toolbar with `/`-focused search input and "All / Core / Advanced / ★ Pinned" filter chips. Cards are 2-column, `--r-lg`, with pin star, since-version chip, code block (output annotated), tags, review state.

### 5. Versions (`versions.html`)

**Layout:** Single column, max-width `1240px`.

- **Language tabs** at top (active gets accent bottom-border).
- **Compare bar** — 4-column grid: from `<select>`, to `<select>`, circular swap button, meta count.
- **Timeline** — horizontal scroll of release pins (ES5, ES6, 17, 18, …). The selected "from" pin is highlighted hard-red, "to" easy-green, in-between pins get accent ring + delta count.
- **Filter row** — All / Syntax / Stdlib / Runtime / Removed-deprecated + sort options.
- **Diff cards** (1 column, stacked):
  - Header: number, title with inline mono code, why-it-shipped caption, version chip on right.
  - Body: 2-column. Left pane = before (`rgba(207,111,95,0.04)` tint), right pane = after (`rgba(136,176,122,0.05)` tint). Each pane has a small uppercase mono "version tag" with a dot.
  - Code blocks always end with `// ▸ output` annotations.
  - Removed-feature variant: single column, no after pane, header chip reads "deprecated".
  - Footer: mono coverage links + pin/drill.

### 6. Playground (`playground.html`)

**Layout:** Full-viewport grid — `220px rail + 1fr editor + 1fr (preview/console)`.

- **Rail:** "Sandboxes" header → 4 sections (JS / React / CSS / HTML) of sample templates → "Saved by me".
- **Editor pane:**
  - Tabbed file row (lang dot per tab, active gets accent bottom border).
  - Code area: line-numbered table layout with syntax highlighting (`.kw`, `.str`, `.com`, `.id`, `.num`); cursor line gets accent-soft background.
  - Footer status: lang/version, indent, encoding, autosave + cursor pos.
- **Right column:** preview pane (URL-bar mock + white "live" iframe area) → 1-px splitter → console panel (tabbed all/errors/warnings, log lines with mono colors, REPL input with `›` prompt).
- **Status bar:** filename, framework, build status (accent ok dot), shortcuts.

For a real implementation: wire to `<iframe>` + `srcdoc` or use Sandpack / WebContainers.

### 7. Q&A (`qa.html`)

**Layout:** Single column, max-width `1180px`. Sticky controls bar.

- **Top controls** (sticky under nav): language filter pills (`.lp` + `.lp.on`) on the left; mini search + "Start drill on filtered" accent button on the right.
- **Section tabs:** Core (412) / Advanced (198) — display font, 32 px right margin between tabs, active gets 2-px accent underline.
- **Sub-control row:** "Quick-read mode — click any question to read the answer" + Expand all / Collapse all links.
- **Three level blocks** (Fresher / Experienced / Expert):
  - Level header: coloured dot (easy/med/hard) + display label + describer + right-side count + "Drill these" accent pill.
  - Question list — `<details>` per question. Closed view is a 4-column grid: `twist arrow + qnum + question text + meta pills (lang dot + tag)`. Open view reveals: italic accent "tldr" line + answer body + code block with output annotations + "Asked at" + pin/drill/playground action buttons.
- **Floating drawer** bottom-right: "Reading is recognition. Want recall?" + accent "Start drill" pill.

### 8. Drill (`drill.html`)

**Two states in one route**, toggled by React state (`setup` ↔ `running`):

**Setup state:**

- Eyebrow + display h1 + lede.
- "Stacks" group — 4 multi-select language cards. Each card has language dot, display name, custom checkbox (top-right), and mono meta ("214 cards · 110 Q&A"). Active state: `--accent-line` border, `--accent-soft` background, checkbox filled with accent.
- 2-col filter row:
  - **Level** — segmented control (Fresher / Experienced / Expert).
  - **Length** — 4 mono pills (10 / 25 / 50 / All weak with count).
- **Sources** — multi-select chip row: Theory / Syntax / Core Q&A / Advanced Q&A / Version diffs / "Only weak cards".
- **Begin row** — 1 px border-strong, `--r-lg` radius, shadow-card. Lives summary line: `"25 cards · drawn from JavaScript & React, fresher level — Theory + Syntax + Core Q&A, weighted toward your weak set."` Right side: accent "Begin drill" button (disabled when no langs selected). Press Enter to begin.

**Running state:**

- Top bar with title + crumb (auto-builds: "drill · JavaScript + React · fresher · 25 cards") + "End session" link + Esc indicator.
- 2 px accent progress bar.
- Card stage (max 780 px), meta row with language pill, source pill, difficulty pill, "3 of 25" counter.
- Card: mono "Question" eyebrow → display question (italic accent for inline code) → hint paragraph → "Show answer" button (`Space` to reveal).
- Reveal section: mono "Answer" eyebrow → prose answer with inline code → code block with **every output line annotated `// ▸ value`** → source attribution row.
- Grading: 3 columns — Again (1, hard red) / Almost (2, med amber) / Got (3, easy green). Each shows label + interval ("show in 10 min" / "2 days" / "7 days").
- Bottom session bar: count chips per grade + streak + time-left estimate.

**Keyboard:**
- Setup: `Enter` begin (only when valid).
- Running: `Space` reveal, `1` / `2` / `3` grade.

**Deck building logic:** see `code/buildDrillDeck.ts`. SM-2-lite intervals: 10 min / 2 days / 7 days, ease factor clamped 1.3 – 2.8.

---

## Conventions used site-wide

### Code output annotation (CRITICAL — used in every code block)

Every result line in a code block is its own `//` comment starting with a `▸` glyph. **Do not** put output as a trailing comment on the source line. This is a system-wide convention that makes it easy to scan "what does this print?" — the exact thing interviewers ask.

```js
console.log('script');
setTimeout(() => console.log('macro'), 0);
Promise.resolve().then(() => console.log('micro'));

// ▸ "script"
// ▸ "micro"   ← drained from microtask queue first
// ▸ "macro"   ← next macrotask, after micro queue empty
```

In CSS, render the `▸` with a `::before` if you tokenise comment classes:

```css
pre .out::before { content: "▸ "; color: var(--accent); }
```

### Section glyphs (replacing emoji)

Use mono typographic glyphs, never emoji:

| Section | Glyph |
|---|---|
| Theory | `§` |
| Syntax | `{ }` |
| Versions | `v.` |
| Playground | `▷` |
| Q&A | `?` |
| Drill | `↻` |

### Language dots

Render as 6 – 10 px solid circles, never as backgrounds or hero gradients. Border on inactive, filled on active.

### kbd

`.kbd { font-family: var(--mono); font-size: 11px; padding: 1px 6px; border: 1px solid var(--line); border-radius: 4px; background: var(--bg-2); color: var(--fg); }`

---

## State management

### Theme

See `code/useTheme.ts`. Apply `data-theme="dark" | "light"` to `<html>`. Persist in `localStorage["lantern:theme"]`. **Pre-paint** the attribute in an inline `<script>` in `<head>` to avoid flash. Honour `prefers-color-scheme` on first visit.

### Progress

See `code/useProgressStore.ts` (Zustand + persist). The shape per card is `CardProgress` from `code/types.ts`. SM-2-lite scheduling, weak-flag, pin-flag, last-seen per language.

`localStorage["lantern:progress"]` — version 1. Bump version + write a migration when you change the shape.

### Drill deck builder

`code/buildDrillDeck.ts` — pure function, easy to unit-test. Takes `(config, repo, progressMap)` → ordered card IDs. Weak cards weigh 3 ×, due cards 1.5 ×, fresh content 0.8 ×, recently-mastered demoted by 1.

---

## Accessibility checklist

- All text passes WCAG AA at minimum; muted body text in dark mode targets 7:1 (AAA). The light theme's mute is calibrated to 6.4:1 on cream.
- Keyboard navigation everywhere: setup screens (Enter to begin), drill loop (Space + 1/2/3), Q&A details elements (Space/Enter), filters (focusable).
- Honour `prefers-reduced-motion` — gate entrance animations and the streak pulse.
- All interactive elements have a visible focus ring (`:focus-visible` outline using `--accent`).
- Form controls and details/summary remain native — restyle, don't replace.

---

## Files in this bundle

```
design_handoff_lantern/
├── README.md                       ← this file
├── Design Review.html              ← annotated review with 11 findings + embeds
├── favicons/
│   ├── favicon.svg                 ← single adaptive favicon (ship this)
│   └── index.html                  ← brand reference page (light + dark previews)
├── prototypes/
│   ├── _shared.css                 ← all design tokens & shared components
│   ├── _theme.js                   ← vanilla theme toggle reference
│   ├── home.html
│   ├── hub.html
│   ├── theory.html
│   ├── syntax.html
│   ├── versions.html
│   ├── playground.html
│   ├── qa.html
│   └── drill.html
└── code/
    ├── _tokens.scss                ← SCSS / CSS-variable tokens
    ├── fonts.ts                    ← next/font setup
    ├── types.ts                    ← content + progress type definitions
    ├── useProgressStore.ts         ← Zustand store with SM-2-lite scheduler
    ├── useTheme.ts                 ← React theme hook + pre-paint snippet
    └── buildDrillDeck.ts           ← pure deck-builder function
```

---

## Suggested implementation order

1. **Tokens + theme + fonts** — get the visual base right before you build any screen. The whole library hangs off this.
2. **Shared shell** — top nav + sidebar + theme toggle + brand mark. Make `.lantern-mark` and `.theme-toggle` reusable components.
3. **Home + Hub** — these establish navigation and the progress hook contract.
4. **Theory + Syntax** — the two content surfaces; same data model behind them.
5. **Q&A** — depends on `level` content metadata being authored. Quick-read collapsibles use native `<details>` for keyboard support out of the box.
6. **Versions** — the diff card template is straightforward; the timeline + from/to selector is the new pattern.
7. **Drill** — wire the setup state + deck builder first, then the running state + grading + scheduler.
8. **Playground** — last; consider Sandpack or CodeSandbox embeds before writing your own editor + iframe runner.

---

## Things deliberately not specified

- **Authentication / sync** — local-only by design. If you add accounts later, persist via the same `lantern:progress` key shape; the Zustand store accepts an external `merge` function.
- **Content authoring CMS** — out of scope. Markdown files in the repo + a small front-matter loader is what the prototypes assume.
- **Mobile-first responsive** — the prototypes target desktop; the layouts will need media-query work below 900 px (sidebars collapse, 2-col grids stack). The basic media queries are already sketched in `_shared.css` and per-page CSS.

---

If anything in the prototypes contradicts this README, **the README wins.** It was written after the prototypes shipped to bake in everything we learned.
