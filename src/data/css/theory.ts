import type { ConceptCard } from '@/types/content';

const cssTheory: ConceptCard[] = [
  {
    id: 'box-model',
    title: 'Box Model',
    summary: 'Every HTML element is treated as a rectangular box made up of four layers: content, padding, border, and margin.',
    body: `The CSS box model is the system the browser uses to calculate how much space each element takes up. Working from the inside out, the layers are: the content area (where your text or image goes), padding (space between the content and the border), border (a visible line around the element), and margin (space outside the border that pushes other elements away).

box-sizing: content-box (default) — the width and height you set apply only to the content area. Padding and border are added on top of that. So a 200px element with 20px padding on each side is actually 240px wide on screen.

box-sizing: border-box — the width and height you set include the padding and border. A 200px element stays 200px no matter what padding you add. This is almost always what you want. Apply it everywhere with: *, *::before, *::after { box-sizing: border-box; }.

Margin collapsing: when two block elements are stacked vertically, their margins don't add together — the browser takes the larger of the two. This does not happen with children of a flex or grid container.`,
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
    summary: 'Some CSS properties pass their value down to child elements automatically. Others do not, and must be set on each element individually.',
    body: `CSS properties fall into two groups. Inherited properties get their value from the parent if you don't set them yourself. These are mostly text-related: color, font-family, font-size, line-height, letter-spacing, text-align, visibility. Non-inherited properties always start from a browser default. These are mostly box-related: margin, padding, border, background, width, height, display.

There are four keywords you can assign to any property to control inheritance:
- inherit — use whatever value the parent has.
- initial — use the browser's default for this property (not the element's default, but the property's spec default).
- unset — inherit if the property normally inherits, otherwise use initial.
- revert — go back to whatever the browser's built-in stylesheet sets for this element.

The all property is a shortcut that applies one of these keywords to every property at once. all: unset is useful for resetting a custom element to a clean slate.`,
    tags: ['inheritance', 'inherit', 'initial', 'unset', 'all'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'flexbox-deep-dive',
    title: 'Flexbox: Axes, Alignment, and Flexibility',
    summary: 'Flexbox lays items out along a main axis and a cross axis. Understanding how the browser sizes flex items prevents unexpected behavior.',
    body: `Flexbox has two axes. The main axis runs in the direction set by flex-direction (row by default). The cross axis runs perpendicular to it. justify-content controls spacing along the main axis. align-items controls alignment on the cross axis.

The browser sizes each flex item in steps: it starts with the item's flex-basis (the item's target size before growing or shrinking). If items overflow the container, they shrink based on flex-shrink. If there is leftover space, they grow based on flex-grow.

flex: 1 is shorthand for flex-grow: 1; flex-shrink: 1; flex-basis: 0% — all items share space equally regardless of their content. flex: auto means flex-basis: auto — items start at their natural content size and then grow or shrink.

Common pitfall: flex items have min-width: auto by default. This means they will not shrink below the width of their content. Set min-width: 0 on the item if you want text inside it to truncate or overflow: hidden to work.

gap is the clean way to add space between flex or grid items. You no longer need margin hacks.`,
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
    summary: 'CSS Grid lets you define rows and columns at the same time. Named areas and auto-placement make complex layouts easy to read and maintain.',
    body: `Grid works with tracks — the rows and columns you define. The fr unit (short for "fraction") divides the remaining space proportionally after any fixed-size or auto-size tracks have been placed.

Explicit vs implicit grid: tracks you define yourself are the explicit grid. If you place an item in a position that doesn't have a defined track, the browser creates an implicit track automatically. You control those with grid-auto-rows and grid-auto-columns.

Named template areas: grid-template-areas lets you sketch the layout using string names. Each string name maps to a grid item using grid-area. A dot (.) marks an empty cell.

Auto-placement: by default, items flow into the next available cell. Setting grid-auto-flow: dense tells the browser to fill gaps eagerly, which is handy for photo-mosaic layouts.

repeat(auto-fill, minmax(200px, 1fr)) creates as many columns as will fit, each at least 200px wide. This gives you a responsive grid with no media queries. auto-fill keeps empty tracks; auto-fit collapses them to zero width.`,
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
    summary: 'When two CSS rules try to set the same property on the same element, the cascade decides which one wins.',
    body: `The cascade is the set of rules CSS uses to resolve conflicts. When multiple rules target the same element and property, the browser picks a winner using this priority order (highest first):

1. !important declarations — use sparingly, as they are hard to override.
2. Inline styles (the style attribute on the element itself).
3. ID selectors (#id) — worth 100 specificity points.
4. Class selectors (.class), attribute selectors ([type="text"]), and pseudo-classes (:hover) — worth 10 points each.
5. Type selectors (div, p) and pseudo-elements (::before) — worth 1 point each.
6. The universal selector (*), combinators (+, >, ~), and :where() — worth 0 points.

Specificity (how "targeted" a selector is) is compared column by column: IDs first, then classes, then types. One ID selector always beats any number of class selectors. If two rules have equal specificity, the one that appears later in the file wins.

Cascade Layers (@layer) are a newer way to control priority. Instead of fighting over specificity, you put styles in named layers and declare which layer wins overall. This is very useful when combining your own CSS with third-party libraries.`,
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
    summary: 'A stacking context is a self-contained layer in the z-axis. z-index values only compete with other elements inside the same stacking context.',
    body: `A stacking context is like a sealed container for z-ordering. Elements inside it are painted as a group. Their z-index values only matter relative to each other — they cannot affect elements that are outside the context.

A new stacking context is created by any of these: a positioned element (relative, absolute, fixed, sticky) that has a z-index other than auto; an element with opacity less than 1; an element with transform, filter, perspective, clip-path, or mask; will-change; or isolation: isolate.

The classic z-index bug: you set z-index: 9999 on a modal and it's still hidden behind another element. The usual cause is that an ancestor of the modal creates its own stacking context with a low z-index. No matter how high you set z-index on the modal, it can't escape its ancestor's context. Fix it by moving the modal to a portal at the body level, or use isolation: isolate on the ancestor to contain the problem.`,
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
    summary: 'A Block Formatting Context (BFC) is an isolated layout region. Inside it, floats, margins, and overflow behave differently from the rest of the page.',
    body: `A Block Formatting Context (BFC) is a region of the page where block-level boxes are laid out in isolation from the rest of the document. When you create a BFC on a container, three things change:

1. Contains floats — the container's height grows to include any floated children. This solves the classic "clearfix" problem where a container collapses to zero height because it only has floated children.
2. Prevents margin collapse — top and bottom margins do not merge between a BFC and its children.
3. Does not overlap adjacent floats — a BFC next to a floated element will not slide underneath it. This is handy for simple two-column layouts.

You can create a BFC with: display: flow-root (the cleanest option), overflow set to anything other than visible, float set to any value, position: absolute or fixed, display: flex or grid on a container, or contain: layout.

Use display: flow-root instead of overflow: hidden when you just want to contain floats. overflow: hidden clips content that goes outside the box, which is often an unwanted side effect.`,
    tags: ['bfc', 'float', 'clearfix', 'overflow', 'margin-collapse'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'reflow-repaint',
    title: 'Reflow vs Repaint',
    summary: 'Reflow recalculates element positions and sizes. Repaint redraws pixels. Both are costly — knowing what triggers each helps you write faster CSS.',
    body: `The browser follows a pipeline to render every frame: Style → Layout (reflow) → Paint (repaint) → Composite. Each step has a performance cost.

Reflow (layout) recalculates the position and size of affected elements. It is triggered by: changing width, height, margin, padding, font-size, adding or removing DOM elements, or reading layout measurements (like offsetWidth) immediately after writing to the DOM. Reflow can cascade — changing one element may force the browser to recalculate its siblings and ancestors too.

Repaint redraws the pixels for an element whose appearance changed but whose geometry did not. It is triggered by: changes to color, background, box-shadow, or outline. Repaint is less expensive than reflow but it still blocks the main thread (the thread responsible for JavaScript and UI updates).

Compositing-only changes (transform and opacity on promoted elements) skip both reflow and repaint entirely. The GPU handles them, making them the cheapest and smoothest type of animation. Use will-change: transform to promote an element to its own GPU layer before animation starts, but apply it selectively — each promoted layer uses graphics memory (VRAM).

To avoid layout thrashing (triggering multiple reflows in a loop): batch all your DOM reads first, then batch all your writes. Use requestAnimationFrame to schedule visual updates.`,
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
    summary: 'The browser renders every frame in four stages: Style, Layout, Paint, and Composite. Knowing which CSS properties trigger which stages helps you hit 60fps.',
    body: `The browser renders a frame in stages: (1) Style — figure out which CSS rules apply to each element. (2) Layout (reflow) — calculate the exact position and size of every element in the page flow. (3) Paint — fill in pixels for each layer: backgrounds, text, borders, shadows. (4) Composite — hand the painted layers to the GPU, which combines them in the correct order and puts the result on screen.

Each stage costs more than the next one. Layout is the most expensive because a change in one element can cascade through its ancestors and siblings. Paint is moderate. Compositing is cheap because it runs on the GPU, away from the main thread.

The best optimization is to use CSS properties that skip the expensive stages. transform and opacity only trigger compositing — no layout, no paint. This is why animating those two properties stays smooth even when JavaScript is doing other work. Use will-change: transform to tell the browser to promote an element to its own GPU layer before the animation starts.

Layout thrashing happens when you read layout measurements (like offsetWidth or getBoundingClientRect) right after writing to the DOM. Each read forces the browser to redo layout immediately so it can give you an accurate number. To avoid this, batch all reads together first, then do all writes. Use requestAnimationFrame to separate measurement from mutation.`,
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
    summary: 'Modern responsive CSS uses three tools together: fluid sizing for smooth scaling, media queries for page-level layout shifts, and container queries for component-level adaptation.',
    body: `Fluid sizing with clamp(): font-size: clamp(1rem, 2.5vw, 2rem) gives a value that scales continuously between 1rem and 2rem as the viewport grows. No breakpoints are needed for the in-between sizes.

Media queries (@media): respond to the viewport width. Best for changing the overall page structure, like switching from a single column to two columns. Use min-width and start from the mobile layout — this is the "mobile-first" approach.

Container queries (@container): respond to the width of the parent element (the container). This is important for reusable components. A card component can be placed in a wide main section or a narrow sidebar, and it adapts to each one independently. Set container-type: inline-size on the wrapper element to enable this.

A practical order: start with a fluid, wrapping layout using flexbox with flex-wrap or grid with auto-fill. Add media queries only when the layout needs a bigger structural change. Add container queries when a component needs to look different depending on where it is placed.`,
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
    summary: 'The browser paints elements in a specific order. Stacking contexts are self-contained layers within that order, which explains why z-index sometimes behaves unexpectedly.',
    body: `The browser paints elements in a defined sequence sometimes called the "painter's model":

1. Background and borders of the root element.
2. Non-positioned block elements (normal document flow).
3. Floating elements.
4. Inline elements (text, inline images).
5. Positioned elements with z-index: auto or 0, in source order.
6. Positioned elements with a positive z-index, lowest values first.

A stacking context is a self-contained painting layer. z-index values only compete with other elements inside the same stacking context. Elements in different stacking contexts are completely isolated from each other — the whole context is painted as a single unit.

What creates a stacking context: a positioned element (relative/absolute/fixed/sticky) with a z-index that is not auto; opacity less than 1; transform; filter; will-change; isolation: isolate; mix-blend-mode; contain: layout, paint, or strict.

isolation: isolate is particularly useful because it creates a stacking context without any visible change to the element. Use it to stop high z-index children from accidentally overlapping elements outside their parent.`,
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
    summary: 'Browsers read CSS selectors from right to left. Deeply nested or overly broad selectors make that matching process slower.',
    body: `When the browser applies styles, it reads selectors from right to left. The rightmost part of the selector is called the "key selector" — the browser finds all matching elements for that first, then works leftward to check the remaining conditions. For div.container > ul > li.active > a, the browser starts by collecting all a elements, then filters by those with an .active parent li, and so on.

Performance guidelines:
- Keep selectors short. Fewer conditions to check means faster matching.
- Avoid the universal selector (*) as the rightmost part. It matches every element, producing a huge initial set to filter.
- Avoid deeply nested selectors — they make every matched element work harder to verify ancestry.
- ID selectors are fastest because each ID is unique per page. Class selectors are fast too.
- Attribute selectors (like [class*="-"]) and pseudo-classes are slower because they require extra evaluation.
- Child combinators (>) are faster than descendant combinators (a space), because they only look at direct children.

In practice, selector performance rarely causes noticeable slowdowns on modern sites. Layout and paint are far more expensive. The one exception: avoid slow key selectors in rules triggered on scroll or :hover on animated elements.

Naming approaches like BEM (Block Element Modifier) and utility-first CSS (Tailwind) naturally produce short, flat selectors as a side effect.`,
    tags: ['selectors', 'performance', 'specificity', 'bem'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'cascade-layers-theory',
    title: 'Cascade Layers — Theory',
    summary: 'Cascade Layers let you group CSS into named priority buckets, so later layers always win over earlier ones — regardless of selector specificity.',
    body: `Before @layer, combining CSS from multiple sources (resets, design systems, utility classes, your own code) was a specificity juggling act. A utility class with a high-specificity selector could beat your component styles, and the only way out was !important.

Cascade layers solve this by adding a new priority level on top of specificity. A rule in a later layer always beats a rule in an earlier layer, no matter how specific the selector is.

You declare the layer order once: @layer reset, base, components, utilities; — in this setup, a rule in utilities beats one in components even if the components rule uses an ID selector.

Styles not placed in any layer beat all layered styles. This gives you an easy override mechanism.

A practical benefit: you can import third-party CSS (like Bootstrap) into a layer — @import url("bootstrap.css") layer(third-party) — and then override it with simple class selectors from your own layer. No specificity fighting needed.`,
    tags: ['cascade-layers', 'layer', 'specificity', 'architecture'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'css-containment',
    title: 'CSS Containment',
    summary: 'The contain property tells the browser that an element is independent from the rest of the page, allowing it to skip rendering work outside that boundary.',
    body: `CSS containment (the contain property) is a hint to the browser that a subtree is isolated — changes inside it do not affect the layout, paint, or style of anything outside it. The browser can then skip recalculating those things for the rest of the page. There are four containment types:

contain: size — the element's size is not determined by its children. Useful for virtual scroll containers.
contain: layout — internal layout changes do not cause reflow outside the element.
contain: style — CSS counters and quotes are scoped to this subtree and do not affect the rest.
contain: paint — the element's content is clipped to its border box (similar to overflow: hidden), and the browser can skip painting the element when it is off-screen.

contain: strict applies all four at once. contain: content applies layout + style + paint, which is the most practical combination.

content-visibility: auto is a simpler, higher-level version of this. The browser skips rendering off-screen elements entirely — both layout and paint. This can dramatically speed up the initial render of long pages. Pair it with contain-intrinsic-size to give the browser an estimated height so the scrollbar does not jump around as elements render.`,
    tags: ['containment', 'contain', 'performance', 'content-visibility'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'css-architecture',
    title: 'CSS Architecture at Scale',
    summary: 'CSS is global by default. BEM, utility-first, CSS Modules, and CSS-in-JS are four different approaches to keeping styles scoped and manageable at scale.',
    body: `Every CSS rule is global. In a large codebase this causes problems: class names clash, specificity fights break things, unused styles build up, and a change in one component unexpectedly breaks another. Different approaches tackle this differently.

BEM (Block Element Modifier): a naming convention where class names encode their role — .card__title--large means the "title" element inside a "card" block with a "large" modifier. No build tooling needed. Works well with discipline, especially in teams.

Utility-first (Tailwind): tiny, single-purpose classes (.text-lg, .bg-blue-500) composed directly in your HTML. No custom class names to invent, no unused CSS (unused classes are removed at build time), but the HTML can become verbose.

CSS Modules: a build step (Webpack, Vite, etc.) renames your classes to .ComponentName__title__hash so they are unique globally. You write normal CSS, but it is scoped to that component file by default. No runtime cost.

CSS-in-JS (styled-components, Emotion): styles written inside JavaScript or TypeScript files, scoped automatically to the component, and able to use props and JS variables directly. Some libraries inject styles at runtime, which adds cost on the server and during hydration (the process of making a server-rendered page interactive). Zero-runtime alternatives like vanilla-extract and Linaria compile styles at build time instead.

Cascade Layers (@layer): a native CSS feature that gives you explicit control over which styles take priority — useful for managing third-party CSS without fighting specificity.`,
    tags: ['css-architecture', 'bem', 'css-modules', 'tailwind', 'css-in-js', 'cascade-layers'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'browser-rendering-pipeline',
    title: 'Browser Rendering Pipeline',
    summary: 'The browser converts HTML and CSS into visible pixels by following six sequential stages. Each stage must finish before the next one can begin.',
    body: `The browser follows this pipeline to turn markup and styles into visible pixels:

1. Parse HTML → DOM tree. The browser reads the HTML and builds a tree of nodes called the DOM (Document Object Model). External scripts pause (block) this parsing unless they have the async or defer attribute.

2. Parse CSS → CSSOM tree. The browser reads all CSS and builds a separate tree called the CSSOM (CSS Object Model). CSS is render-blocking — the browser will not paint anything until this tree is complete.

3. DOM + CSSOM → Render Tree. The browser merges both trees, keeping only elements that are actually visible. Elements with display: none are excluded here.

4. Layout (Reflow). The browser calculates the exact position and size of every element in the render tree. This step starts from the root and works down.

5. Paint. The browser draws the pixels: colors, text, shadows, borders. Elements may be painted onto separate layers.

6. Composite. The GPU takes all the painted layers, stacks them in the right order, and sends the final frame to the screen.

Critical Rendering Path: this is the term for the minimum set of steps the browser must complete before the user sees anything. Optimizing it means: cut render-blocking CSS and JavaScript, reduce the size of the DOM, inline the CSS needed for the first visible screen (called above-the-fold content), and preload important resources.`,
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
    summary: 'Every visual change triggers one of three levels of browser work. Knowing which level a CSS property triggers is the foundation of CSS performance optimization.',
    body: `Every visual change makes the browser do one of three levels of work, from most to least expensive:

Reflow (Layout): recalculates the size and position of the changed element and everything affected by it. Triggered by: adding or removing DOM elements, changing width, height, margin, padding, font-size, or reading layout measurements (offsetWidth, getBoundingClientRect). Reflow is expensive because one change can ripple through many other elements.

Repaint: redraws the pixels for an element without recalculating geometry. Triggered by: changes to color, background, visibility, box-shadow, border-radius. Still uses the CPU, but cheaper than reflow because positions are not recalculated.

Compositing only: the GPU shifts or fades an already-painted layer without involving the CPU for layout or paint. Only transform and opacity on elements that have been promoted to their own layer qualify. This is the cheapest path — often under one millisecond.

Layout thrashing: when you alternate DOM reads and writes inside a loop, the browser is forced to redo layout on every iteration instead of batching it. The fix is simple: do all reads first, then all writes.

Tip: csstriggers.com lists every CSS property and shows which pipeline stages it triggers.`,
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
    summary: 'Moving elements to their own GPU layer means the GPU handles animations directly, skipping layout and paint entirely.',
    body: `The browser paints elements onto one or more layers. Most elements share a single layer. When you animate a property that only affects compositing — meaning only transform or opacity — the GPU can shift or fade that layer without the CPU redoing layout or paint. This is how smooth 60fps animations are achieved.

Layer promotion happens when the browser decides an element should have its own layer. Automatic triggers include: 3D transforms, video and canvas elements, position: fixed or sticky, and opacity animations. Layers are textures stored in GPU memory (VRAM).

will-change is a hint you add to tell the browser to promote an element before the animation starts. Without it, promotion happens at the first animation frame, which can cause a visible stutter. Two common values:
- will-change: transform — promotes immediately, GPU-ready.
- will-change: auto — no hint (the default).

Pitfalls: each promoted layer occupies VRAM. On mobile devices or low-memory machines, too many layers slow things down rather than speeding them up. Apply will-change only to elements that genuinely animate, and remove it after the animation ends (el.style.willChange = 'auto') to free the memory.

Prefer animating transform over animating top, left, or width. Animating top/left triggers layout recalculation every frame. Animating transform: translateX() only touches the compositor stage.`,
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
    summary: "Google's three standardized metrics for measuring real user experience: how fast the page loads, how quickly it responds to input, and how stable the layout is.",
    body: `Core Web Vitals are three measurable metrics that reflect how users actually experience a page. They influence Google's search ranking. You can measure them with Lighthouse, Chrome DevTools, PageSpeed Insights, or the web-vitals JavaScript library.

LCP — Largest Contentful Paint (target: 2.5 seconds or less): the time until the largest image or text block visible in the viewport is fully rendered. This is usually a hero image or main heading. Improve it by: preloading the LCP resource with <link rel="preload">, reducing server response time, using modern image formats (WebP or AVIF), and never lazy-loading images that are above the fold (already visible on load).

INP — Interaction to Next Paint (target: 200 milliseconds or less, replaced FID in 2024): measures how long it takes from a user interaction (click, key press, tap) to the next visible frame update. Improve it by: splitting long JavaScript tasks into smaller chunks using scheduler.yield() or setTimeout, moving heavy work off the main thread into Web Workers, and delaying non-critical scripts.

CLS — Cumulative Layout Shift (target: 0.1 or less): a score that adds up all unexpected layout shifts during the life of the page. A shift is unexpected if it happens without any user action. Improve it by: always setting width and height attributes on images and videos, not injecting content above existing content after load, using the CSS aspect-ratio property to reserve space, and avoiding late-loading ads that push content down.

Measuring in code: use the web-vitals library — import { onLCP, onINP, onCLS } from 'web-vitals' — or the PerformanceObserver API directly.`,
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
    summary: 'Telling the browser that an element is self-contained lets it skip layout and paint work that does not affect anything outside that element.',
    body: `The contain property is a performance hint. It tells the browser that a subtree is isolated — changes inside do not affect layout, paint, or style outside. The browser can then skip recalculating those things for the rest of the page when the contained element changes.

contain: layout — internal layout changes do not cause reflow outside. The element behaves like its own formatting context.
contain: paint — the element's children do not render outside its border box. The browser can also skip painting it entirely when it is off-screen.
contain: style — (limited use) CSS counters and quotes are scoped to the subtree.
contain: strict — all of the above at the same time.
contain: content — layout + paint combined. This is the safest and most commonly useful combination.

content-visibility: auto — a higher-level property that tells the browser to skip rendering off-screen elements entirely (both layout and paint). The browser only does that work when the element scrolls into view. This can dramatically reduce the time to first render on long pages with many sections. Pair it with contain-intrinsic-size to give the browser an estimated height so the scrollbar position does not jump unexpectedly as sections render.

Good use cases: frequently updating widget containers, items in a virtualized list, off-screen modals, and dashboard cards.`,
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
