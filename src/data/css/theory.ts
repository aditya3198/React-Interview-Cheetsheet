import type { ConceptCard } from '@/types/content';

const cssTheory: ConceptCard[] = [
  {
    id: 'box-model',
    title: 'Box Model',
    summary: 'Every element is a rectangular box with content, padding, border, and margin areas.',
    body: `The CSS box model describes the rectangular boxes generated for each element. From inside out: content area (width/height), padding (space between content and border), border (visible edge), and margin (space outside the border that separates elements from each other).

box-sizing: content-box (default) — width/height apply only to the content box, so padding and border are added on top. A 200px element with 20px padding is actually 240px wide.

box-sizing: border-box — width/height include padding and border. A 200px element stays 200px regardless of padding. This is almost always what you want. Apply universally with: *, *::before, *::after { box-sizing: border-box; }.

Margin collapsing: adjacent vertical margins of block elements collapse to the larger value (not added together). This doesn't happen with flexbox/grid children.`,
    diagram: {
      type: 'ascii',
      content: `┌──────────────────────────────────┐
│           margin                 │
│  ┌────────────────────────────┐  │
│  │         border             │  │
│  │  ┌──────────────────────┐  │  │
│  │  │       padding        │  │  │
│  │  │  ┌────────────────┐  │  │  │
│  │  │  │    content     │  │  │  │
│  │  │  └────────────────┘  │  │  │
│  │  └──────────────────────┘  │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘`,
    },
    tags: ['box-model', 'border-box', 'padding', 'margin', 'layout'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'css-inheritance',
    title: 'CSS Inheritance',
    summary: 'Some properties inherit from parent to child by default; others do not. You can control inheritance explicitly.',
    body: `CSS properties are either inherited (default value from parent if not set) or non-inherited (initial value if not set). Text properties inherit: color, font-*, line-height, letter-spacing, text-align, visibility. Layout/box properties do not: margin, padding, border, background, width, height, display.

Keywords: inherit (take the parent's computed value), initial (the property's browser default), unset (inherit if the property is inherited, otherwise initial), revert (return to the browser's stylesheet value), revert-layer (return to the previous cascade layer's value).

The all property applies a keyword to all properties at once. all: unset is useful for resetting custom elements or isolated components.`,
    tags: ['inheritance', 'inherit', 'initial', 'unset', 'all'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'flexbox-deep-dive',
    title: 'Flexbox: Axes, Alignment, and Flexibility',
    summary: 'Flexbox controls one-dimensional layout via a main axis and cross axis — understanding the flex algorithm prevents sizing surprises.',
    body: `Flexbox has two axes: the main axis (set by flex-direction) and the cross axis (perpendicular). justify-content aligns items on the main axis; align-items aligns on the cross axis.

The flex item sizing algorithm: the browser first measures the item's flex-basis (its ideal size). If items overflow, they shrink proportionally based on flex-shrink. If there's space left, they grow based on flex-grow.

flex: 1 is shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0% — items grow equally, ignoring content size. flex: auto means flex-basis: auto — items start at their content size then grow/shrink.

Common pitfall: flex items have min-width: auto by default (they won't shrink below their content size). Set min-width: 0 to allow text truncation or overflow: hidden inside flex items.

gap replaces the margin-based spacing hack and works with flex and grid.`,
    diagram: {
      type: 'ascii',
      content: `flex-direction: row (default):
┌────────────────────────────────┐
│←──────── main axis ───────────→│
│  ┌────┐ ┌────┐ ┌────┐         │
│  │ A  │ │ B  │ │ C  │         │ ↕ cross axis
│  └────┘ └────┘ └────┘         │
└────────────────────────────────┘
justify-content → main axis
align-items     → cross axis

flex shorthand: flex: <grow> <shrink> <basis>
flex: 1       = 1 1 0%    (equal growth)
flex: auto    = 1 1 auto  (grow from content size)
flex: none    = 0 0 auto  (rigid, no flex)`,
    },
    tags: ['flexbox', 'flex-grow', 'flex-shrink', 'flex-basis', 'alignment', 'gap'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'css-grid-deep',
    title: 'CSS Grid: Tracks, Areas, and Placement',
    summary: 'Grid defines rows and columns simultaneously — named areas and auto-placement make complex layouts maintainable.',
    body: `Grid introduces row and column tracks. fr (fraction) units divide available space proportionally after fixed/auto tracks are placed.

Explicit vs implicit grid: tracks you define are explicit. If you place items outside, the browser creates implicit tracks (controlled by grid-auto-rows/columns).

Named template areas: grid-template-areas lets you define layout visually with string names. Each name becomes a named area assigned to items with grid-area. Dots (.) denote empty cells.

Auto-placement: items flow into the grid automatically. grid-auto-flow: dense fills gaps eagerly (good for photo mosaics).

repeat(auto-fill, minmax(200px, 1fr)) creates as many columns as fit, each at least 200px — truly responsive without media queries. auto-fill creates empty tracks; auto-fit collapses empty tracks to zero.`,
    diagram: {
      type: 'ascii',
      content: `grid-template-areas pattern:
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main   { grid-area: main; }
.footer { grid-area: footer; }

.layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}

Result:
┌──────────────────────┐
│       header         │
├─────────┬────────────┤
│ sidebar │    main    │
├─────────┴────────────┤
│       footer         │
└──────────────────────┘`,
    },
    tags: ['grid', 'template-areas', 'fr', 'auto-fill', 'auto-fit', 'placement'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'specificity-cascade',
    title: 'Specificity & Cascade',
    summary: 'When styles conflict, the cascade resolves them using origin, importance, specificity, and source order.',
    body: `The cascade is the algorithm CSS uses to determine which rule wins when multiple rules target the same property on the same element. Priority order (highest first):

1. !important declarations (avoid in product code)
2. Inline styles (style attribute)
3. ID selectors (#id) — 100 points
4. Class selectors (.class), attribute selectors ([attr]), pseudo-classes (:hover) — 10 points each
5. Type selectors (div, p) and pseudo-elements (::before) — 1 point each
6. Universal (*), combinators (+, >, ~), and :where() — 0 points

Specificity is compared column-by-column (IDs, then classes, then types). A single ID always beats any number of classes. When specificity is equal, source order (last rule) wins.

Cascade Layers (@layer) let you create explicit ordering groups where layer priority overrides specificity — the most important recent addition for managing large CSS codebases.`,
    diagram: {
      type: 'ascii',
      content: `Specificity: (inline, ID, class/attr/pseudo-class, type/pseudo-el)
#header .nav a:hover → (0, 1, 2, 1) — wins over
.nav a:hover         → (0, 0, 2, 1)
a                    → (0, 0, 0, 1)`,
    },
    tags: ['specificity', 'cascade', 'selectors', 'inheritance'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'stacking-context',
    title: 'Stacking Context & z-index',
    summary: 'Stacking contexts are independent z-axis layers. z-index only competes within the same context.',
    body: `A stacking context is an element that forms its own layer for z-ordering. Elements inside a stacking context are painted together and their z-index values only compete with siblings in the same context — not with elements outside.

A new stacking context is created by: position: relative/absolute/fixed/sticky with z-index not auto; elements with opacity < 1; transform, filter, perspective, clip-path, mask; will-change; isolation: isolate.

The classic z-index bug: you set z-index: 9999 on a modal, but it's still behind something. The cause is usually that the modal's ancestor forms a stacking context with a lower z-index than the element you're trying to go above. The fix is isolation: isolate on the container or move the modal to a portal at the body level.`,
    diagram: {
      type: 'ascii',
      content: `document
├── div (z-index: 1) ← stacking context A
│   ├── .child (z-index: 999) — only competes inside A
│   └── .child (z-index: 1)
└── div (z-index: 2) ← stacking context B
    └── .modal (z-index: 1) — paints above ALL of A`,
    },
    tags: ['z-index', 'stacking-context', 'positioning', 'layers'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'block-formatting-context',
    title: 'Block Formatting Context (BFC)',
    summary: 'A BFC is an isolated layout region where floats, margins, and overflow behave differently.',
    body: `A Block Formatting Context (BFC) is an area of the document where block boxes are laid out independently from the outside. Creating a BFC has several effects:

1. Contains floats — the BFC's height includes floated children (the classic "clearfix" problem is solved by creating a BFC on the container).
2. Prevents margin collapse — margins don't collapse between BFC and its children, or between two BFCs.
3. Doesn't overlap floats — a BFC positioned next to a float won't overlap it (useful for two-column layouts).

BFCs are created by: display: flow-root (cleanest), overflow other than visible, float, position: absolute/fixed, display: flex/grid (on the container), contain: layout.

Use display: flow-root instead of overflow: hidden for the clearfix — it creates a BFC without hiding overflow content.`,
    tags: ['bfc', 'float', 'clearfix', 'overflow', 'margin-collapse'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'reflow-repaint',
    title: 'Reflow vs Repaint',
    summary: 'Reflow (layout) recalculates geometry; repaint redraws pixels. Both are expensive — minimize triggers.',
    body: `The browser rendering pipeline: Style → Layout (reflow) → Paint (repaint) → Composite. Each step has a cost.

Reflow (layout) recalculates element positions and sizes. It's triggered by: changing width, height, margin, padding, font-size, adding/removing DOM elements, reading layout properties after writing (layout thrashing). Reflow cascades — changing one element may force recalculation of its parents and siblings.

Repaint redraws pixels without geometry changes. Triggered by: color, background, box-shadow, outline changes. Less expensive than reflow but still blocks the main thread.

Compositor-only changes (transform, opacity) skip both reflow and repaint — they're the fastest animations. Use will-change: transform on frequently animated elements to promote them to their own GPU layer, but use it sparingly as each layer consumes VRAM.

To avoid layout thrashing: batch reads together, then batch writes. Use requestAnimationFrame for visual updates.`,
    diagram: {
      type: 'ascii',
      content: `JavaScript → Style → Layout → Paint → Composite
                          (reflow)  (repaint)

transform/opacity changes: skip to Composite ← fastest
color/background changes: skip Layout, go to Paint
width/height changes: full pipeline ← slowest`,
    },
    tags: ['performance', 'reflow', 'repaint', 'layout-thrashing', 'gpu'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'rendering-pipeline',
    title: 'Browser Rendering Pipeline',
    summary: 'Style → Layout → Paint → Composite — understanding which CSS properties trigger which stages is key to 60fps UIs.',
    body: `The browser renders a frame in stages: (1) Style — compute which CSS rules apply to each element. (2) Layout (reflow) — calculate position and size of every element in the document flow. (3) Paint — fill in pixels for each layer (backgrounds, text, borders). (4) Composite — combine GPU layers in the correct order.

Each stage is progressively cheaper: Layout is the most expensive (it can cascade through the document tree), Paint is moderate, Composite is cheap (runs on the GPU, off the main thread).

Optimization strategy: use CSS properties that skip expensive stages. transform and opacity only trigger Composite — no Layout or Paint. This is why CSS animations on these properties stay smooth even during JavaScript work. Use will-change: transform to tell the browser to promote an element to its own GPU layer before an animation starts.

Layout thrashing: reading layout properties (offsetWidth, getBoundingClientRect) after writes forces a synchronous layout. Batch all reads before writes, or use requestAnimationFrame to separate measurement from mutation.`,
    diagram: {
      type: 'ascii',
      content: `CSS property cost:
──────────────────────────────────────
width / height / margin  → Layout + Paint + Composite  (expensive)
background / color       → Paint + Composite            (moderate)
transform / opacity      → Composite only               (cheap ✓)

will-change: transform;  → promotes to GPU layer early
                           avoids promoting mid-animation`,
    },
    tags: ['rendering', 'layout', 'paint', 'composite', 'performance', 'will-change'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'responsive-design-system',
    title: 'Responsive Design: Media Queries, Fluid Layouts, and Container Queries',
    summary: 'Modern responsive CSS uses three complementary tools: fluid sizing, media queries for global breakpoints, and container queries for component-level adaptation.',
    body: `Fluid sizing with clamp(): font-size: clamp(1rem, 2.5vw, 2rem) produces a value that scales between 1rem and 2rem based on viewport width — no breakpoints needed for intermediate sizes.

Media queries (@media): global breakpoints based on viewport size. Best for page-level structural changes (single column → two column). Use min-width (mobile-first) in most cases.

Container queries (@container): breakpoints based on the containing element's size. Essential for reusable components that may appear in different contexts (sidebar, main, modal). Set container-type: inline-size on the wrapper to enable them.

Logical approach: start with a fluid, wrapping layout (flexbox with flex-wrap, grid with auto-fill). Add media queries only when the automatic wrapping isn't enough. Add container queries for component-level adaptation.`,
    diagram: {
      type: 'ascii',
      content: `Three tools for responsive design:

1. Fluid (no breakpoints):
   font-size: clamp(1rem, 2.5vw, 2rem);
   width: min(90%, 1200px);
   padding: clamp(1rem, 5vw, 4rem);

2. Media query (viewport-based):
   @media (min-width: 768px) { /* layout shift */ }

3. Container query (component-based):
   .wrapper { container-type: inline-size; }
   @container (min-width: 400px) {
     .card { display: grid; }
   }

Mobile-first: start small → add complexity
Desktop-first: start full → reduce
(prefer mobile-first)`,
    },
    tags: ['responsive', 'media-queries', 'container-queries', 'clamp', 'fluid', 'mobile-first'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'stacking-context-deep',
    title: 'Stacking Contexts & the Painter\'s Model',
    summary: 'Elements are painted in a specific order determined by stacking contexts — understanding this resolves z-index mysteries.',
    body: `The browser paints elements in a defined order (the "painter's model"):

1. Background and borders of the root element.
2. Descendant non-positioned block elements.
3. Floating elements.
4. Inline elements.
5. Positioned elements (z-index: auto or 0), in source order.
6. Positioned elements with positive z-index, lowest first.

A stacking context is a self-contained layer. z-index only competes within the same stacking context — elements in different stacking contexts are isolated, and the entire context is painted as a unit.

What creates a stacking context: position + z-index (non-auto), opacity < 1, transform, filter, will-change, isolation: isolate, mix-blend-mode, contain: layout/paint/strict.

The isolation: isolate property explicitly creates a stacking context without any visual effect — useful to prevent z-index leakage from children into the parent context.`,
    diagram: {
      type: 'ascii',
      content: `Document root (stacking context)
├── .sidebar z-index:1 (stacking context)
│   └── .tooltip z-index:9999
│       ← TRAPPED inside .sidebar's context!
│       Can never appear above .modal
│
└── .modal z-index:2 (stacking context)
    └── .close-btn z-index:1

Even though .tooltip has z-index:9999,
it can't beat .modal (z-index:2) because
they're in different stacking contexts.

Fix: move .tooltip to root level (use a Portal).`,
    },
    tags: ['stacking-context', 'z-index', 'positioning', 'isolation', 'painter-model'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'selector-performance',
    title: 'Selector Performance',
    summary: 'CSS selectors are evaluated right-to-left; unnecessarily deep or universal selectors slow matching.',
    body: `Browsers evaluate CSS selectors from right to left (the rightmost part is the "key selector"). For div.container > ul > li.active > a, the browser first finds all <a> elements, then checks each for an .active parent, then ul, then the specific container.

Performance guidelines: Keep selectors short. Avoid universal selectors (*) as key selectors. Avoid deeply nested selectors. ID selectors are fastest (unique match). Class selectors are fast. Attribute selectors and pseudo-classes are slower. Descendant combinators (space) are slower than child combinators (>).

In practice, selector performance rarely bottlenecks modern sites — layout and paint are far larger concerns. The main rule: avoid *, [class*="-"], and :not(*) as key selectors in hot paths like :hover animations.

BEM (Block Element Modifier) and utility classes like Tailwind naturally produce flat, short selectors.`,
    tags: ['selectors', 'performance', 'specificity', 'bem'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'cascade-layers-theory',
    title: 'Cascade Layers — Theory',
    summary: 'Cascade Layers let you structure CSS with explicit priority groups, separating concerns without specificity wars.',
    body: `Before @layer, managing CSS from multiple sources (resets, design systems, utilities, custom styles) required careful specificity management. A utility class with high specificity could beat component styles; !important was the only escape hatch.

Cascade layers solve this by adding a new level to the cascade above specificity. Layers declared later win over earlier layers, regardless of specificity within those layers.

Declared order: @layer reset, base, components, utilities; — utilities wins over components even if components uses an ID selector.

Unlayered styles beat all layers, giving you an escape hatch. Third-party CSS can be imported into a layer, containing its specificity.

This enables: import Bootstrap into @layer(third-party) and override it with simple class selectors from @layer(custom) without fighting specificity.`,
    tags: ['cascade-layers', 'layer', 'specificity', 'architecture'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'css-containment',
    title: 'CSS Containment',
    summary: 'The contain property isolates subtrees from the rest of the document for rendering performance.',
    body: `CSS containment (contain) lets you tell the browser that a subtree is independent from the rest of the page, enabling rendering optimizations. Four containment types:

contain: size — the element's size doesn't depend on its children. Used for virtual scroll containers.
contain: layout — the element's internal layout doesn't affect external layout. Changes inside don't trigger external reflow.
contain: style — counter and quote scoping is limited to the subtree.
contain: paint — the element clips its content (like overflow: hidden) and the browser won't paint outside it.

contain: strict = all four. contain: content = layout + style + paint (most useful).

content-visibility: auto is the high-level API — off-screen elements are skipped entirely during rendering, dramatically improving initial paint on long pages. Combine with contain-intrinsic-size to reserve space and prevent layout shifts.`,
    tags: ['containment', 'contain', 'performance', 'content-visibility'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'css-architecture',
    title: 'CSS Architecture at Scale',
    summary: 'BEM, utility-first, CSS Modules, and CSS-in-JS each solve the global-scope problem differently.',
    body: `CSS has no native scope — every rule is global. At scale, this causes: naming conflicts, specificity wars, unused styles accumulating, and changes that break unrelated components. Different architectures solve this differently.

BEM (Block Element Modifier): Naming convention (.card__title--large) that encodes hierarchy in the class name. No tooling needed, scales with discipline.

Utility-first (Tailwind): Tiny single-purpose classes composed in HTML. No custom naming, no dead code (purged), tight coupling of styles and markup.

CSS Modules: Build-time scoping — .title becomes .ComponentName__title__hash. Local by default, opt-in globals. Works with any CSS feature.

CSS-in-JS (styled-components, Emotion): Styles written in JS, scoped to component, can use JS variables and logic. Runtime cost for some libraries; zero-runtime alternatives (vanilla-extract, linaria) address this.

Cascade Layers (@layer): The newest native tool — explicitly prioritize style origins without specificity games. Enables safely importing third-party CSS.`,
    tags: ['css-architecture', 'bem', 'css-modules', 'tailwind', 'css-in-js', 'cascade-layers'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'browser-rendering-pipeline',
    title: 'Browser Rendering Pipeline',
    summary: 'From HTML bytes to painted pixels — the six stages the browser executes to render every frame.',
    body: `The browser follows a strict pipeline to turn markup and styles into visible pixels:

1. Parse HTML → DOM tree. The parser builds the Document Object Model node by node. External scripts block parsing unless marked async or defer.

2. Parse CSS → CSSOM tree. The browser builds the CSS Object Model from all stylesheets. CSS is render-blocking — the browser won't paint until CSSOM is complete.

3. DOM + CSSOM → Render Tree. The browser combines both trees, keeping only visible nodes (display: none elements are excluded). Each node has its computed styles.

4. Layout (Reflow). The browser calculates the exact position and size of every render tree node, starting from the root. This outputs a box model for every element.

5. Paint. The browser fills in pixels for each layer: colors, text, shadows, borders. Elements are painted onto one or more layers.

6. Composite. The GPU combines all painted layers in the correct stacking order and displays the final frame.

Critical Rendering Path (CRP): the minimum work needed before the first pixel appears. Optimizing it means: minimize render-blocking CSS/JS, reduce DOM size, inline critical CSS, preload key resources.`,
    diagram: {
      type: 'ascii',
      content: `HTML bytes
    ↓  parse
  DOM Tree      CSS bytes
    │               ↓  parse
    │           CSSOM Tree
    └─────┬─────────┘
          ↓  combine (visible nodes only)
      Render Tree
          ↓  calculate geometry
        Layout
          ↓  fill pixels
        Paint
          ↓  GPU combines layers
       Composite
          ↓
    Screen (frame)`,
    },
    tags: ['rendering', 'critical-rendering-path', 'dom', 'cssom', 'layout', 'paint', 'composite'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'reflow-repaint-compositing',
    title: 'Reflow, Repaint & Compositing',
    summary: 'Three levels of render work — understanding which operations trigger which level is the foundation of CSS performance.',
    body: `Every visual change triggers one of three levels of browser work, from most to least expensive:

Reflow (Layout): recalculates the geometry of the entire affected subtree — positions, sizes, scroll. Triggered by: DOM insertions/removals, element resizing, font changes, reading layout properties (offsetWidth, getBoundingClientRect). Expensive because it can cascade — moving one element can shift everything else.

Repaint: re-draws pixels without geometry changes. Triggered by: color, background, visibility, shadow, border-radius changes. Less expensive than reflow but still forces the CPU to redraw the affected area.

Compositing only: changes handled entirely on the GPU, skipping layout and paint. Only transform and opacity on elements promoted to their own layer qualify. This is the cheapest path — typically sub-millisecond.

Layout thrashing: alternating DOM reads and writes in a loop, forcing the browser to recalculate layout on every iteration. Fix by batching all reads first, then all writes.

CSS triggers reference: csstriggers.com maps every property to which pipeline stages it triggers.`,
    diagram: {
      type: 'ascii',
      content: `Change type          Pipeline stages triggered
─────────────────    ──────────────────────────────
width / height       Layout → Paint → Composite  (most expensive)
color / background   Paint → Composite
transform / opacity  Composite only              (cheapest)

Layout thrashing (avoid):
for (el of els) {
  el.style.width = el.offsetWidth + 10 + 'px'; // read → write → reflow
}

Batched (correct):
const widths = els.map(el => el.offsetWidth);  // all reads
els.forEach((el, i) => el.style.width = widths[i] + 10 + 'px'); // all writes`,
    },
    tags: ['reflow', 'repaint', 'compositing', 'layout-thrashing', 'performance', 'rendering'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'gpu-compositing-layers',
    title: 'GPU Layers, will-change & Composite-Only Animations',
    summary: 'Promoting elements to their own compositor layer lets the GPU handle animations without touching layout or paint.',
    body: `The browser paints elements onto one or more layers. Most elements share a layer. When you animate a property that only affects compositing (transform, opacity), the GPU can shift or fade that layer without re-running layout or paint on the CPU — enabling silky 60fps animations.

Layer promotion: the browser creates a new compositor layer for elements with transform (3D), will-change, video, canvas, position: fixed/sticky, or opacity animations. Layers are textures uploaded to GPU memory.

will-change: hints to the browser to promote an element before animation starts, avoiding jank at the first frame:
will-change: transform — promotes immediately, GPU-ready.
will-change: auto — no hint (default).

Pitfalls: overusing will-change creates too many GPU textures, consuming large amounts of VRAM and potentially hurting performance on low-memory devices. Apply it only to elements that genuinely animate frequently, and remove it after animations end via JavaScript.

Animate transform not position: animating left/top triggers layout every frame. animating transform: translateX() stays in the composite stage only.`,
    diagram: {
      type: 'ascii',
      content: `/* Triggers layout every frame — avoid */
.box { transition: left 0.3s; }

/* GPU-only, no layout/paint — prefer this */
.box { transition: transform 0.3s; }
.box:hover { transform: translateX(20px); }

/* Promote before animation starts */
.modal-overlay {
  will-change: transform, opacity;
}

/* Layer budget — each layer = GPU memory */
❌ * { will-change: transform; }  /* promotes everything = VRAM bloat */
✅  Only elements that actually animate`,
    },
    tags: ['will-change', 'compositing', 'gpu', 'layers', 'animation', 'transform', 'performance'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'core-web-vitals',
    title: 'Core Web Vitals (LCP, INP, CLS)',
    summary: "Google's three user-experience metrics that measure loading, interactivity, and visual stability.",
    body: `Core Web Vitals are standardized metrics that quantify real user experience. They feed into Google's search ranking and are measurable via Lighthouse, Chrome DevTools, PageSpeed Insights, and the web-vitals JS library.

LCP — Largest Contentful Paint (target: ≤ 2.5s): time until the largest image or text block in the viewport is fully rendered. Usually a hero image, heading, or above-the-fold banner. Improve by: preloading the LCP resource (<link rel="preload">), optimizing server response time, using modern image formats (WebP/AVIF), not lazy-loading above-fold images.

INP — Interaction to Next Paint (target: ≤ 200ms, replaced FID in 2024): measures the worst latency across all user interactions (click, key, tap) during a page visit. Improve by: breaking up long tasks with scheduler.yield() or setTimeout chunking, moving heavy work to Web Workers, deferring non-critical JS.

CLS — Cumulative Layout Shift (target: ≤ 0.1): sum of all unexpected layout shifts during the page's life. A shift is unexpected if it happens without user input. Improve by: always setting width and height on images/videos, not inserting content above existing content, using CSS aspect-ratio to reserve space, avoiding late-loading ads that push content down.

Measuring: new PerformanceObserver({ type: 'largest-contentful-paint' }) in JS, or import { onLCP, onINP, onCLS } from 'web-vitals'.`,
    diagram: {
      type: 'ascii',
      content: `Metric   What it measures              Good     Needs work   Poor
──────   ──────────────────────────   ──────   ──────────   ──────
LCP      Largest element rendered     ≤ 2.5s   2.5–4s       > 4s
INP      Input → next frame latency   ≤ 200ms  200–500ms    > 500ms
CLS      Unexpected layout shifts     ≤ 0.1    0.1–0.25     > 0.25

Common LCP killers:          Common CLS killers:
• Unpreloaded hero image     • Images without width/height
• Render-blocking CSS/JS     • Late-injected banners/ads
• Slow server (TTFB)         • Web fonts causing FOIT/FOUT
• Lazy-loaded above fold     • Dynamic content above fold`,
    },
    tags: ['core-web-vitals', 'lcp', 'inp', 'cls', 'performance', 'lighthouse', 'seo'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'css-containment',
    title: 'CSS Containment & content-visibility',
    summary: 'Tell the browser an element is independent so it can skip layout and paint work outside its boundary.',
    body: `CSS containment (contain property) lets you declare that a subtree is isolated from the rest of the page for layout, paint, or style purposes. The browser can then skip recalculating those aspects for the rest of the document when the contained element changes.

contain: layout — changes inside the element don't affect layout outside. The element acts like a formatting context.
contain: paint — the element's descendants don't render outside its border box. The browser can skip painting it when off-screen.
contain: style — (limited) prevents counters and quotes from leaking out.
contain: strict — all of the above simultaneously.
contain: content — layout + paint (safe default, most commonly useful).

content-visibility: auto — the browser skips rendering off-screen elements entirely (layout + paint), only doing work when they scroll into view. Massive performance win for long pages with many sections. Pair with contain-intrinsic-size to give the browser a placeholder size so scrollbar doesn't jump.

Use cases: widget containers that update frequently, virtualized list items, off-screen modals, dashboard cards.`,
    diagram: {
      type: 'ascii',
      content: `/* Contain layout recalculation to this widget */
.widget {
  contain: content; /* layout + paint */
}

/* Skip rendering off-screen sections entirely */
.page-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* estimated height */
}

Without content-visibility: browser renders ALL sections on load
With content-visibility: auto: browser renders only visible sections
→ Can reduce initial render time by 5–7x on long pages`,
    },
    tags: ['containment', 'content-visibility', 'contain', 'performance', 'rendering'],
    tier: 'advanced',
    level: 'expert',
  },
];

export default cssTheory;
