import type { QnaItem } from '@/types/content';

const cssQna: QnaItem[] = [
  {
    id: 'specificity-calculation',
    question: 'How is CSS specificity calculated?',
    answer: `Specificity is a weight applied to a CSS declaration, determined by the count of selector components in three categories: (A) IDs, (B) classes/attributes/pseudo-classes, (C) type selectors/pseudo-elements. Written as (A, B, C). Inline styles beat all selectors. !important overrides the entire cascade. When specificity is equal, source order (last rule) wins. The universal selector (*) and :where() contribute zero specificity.`,
    codeExample: `/* Specificity scores */
#nav .link:hover   → (1, 1, 0) = 110
.nav a.active      → (0, 2, 1) = 021
nav ul li a        → (0, 0, 4) = 004

/* ID always beats classes */
#id    → (1,0,0) beats .a.b.c.d.e.f.g.h.i.j (0,10,0)

/* :where() contributes 0 specificity */
:where(h1, h2, h3) { font-size: 1rem; } /* (0,0,0) */

/* :is() takes the specificity of its highest-specificity argument */
:is(#id, .class) a { }  /* → (1,0,1) */`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['specificity', 'selectors', 'cascade'],
    tier: 'core',
  },
  {
    id: 'bfc-triggers',
    question: 'What triggers a Block Formatting Context (BFC) and why does it matter?',
    answer: `A BFC is an independent layout region. It's created by: display: flow-root, overflow other than visible (hidden, auto, scroll), float (any value), position: absolute or fixed, display: flex/grid on the container, contain: layout or strict. A BFC (1) contains its floated children so the container's height includes them, (2) prevents margin collapse between itself and children, and (3) doesn't overlap adjacent floats. display: flow-root is the cleanest way to create a BFC without side effects.`,
    codeExample: `/* Problem: float not contained */
.container { background: lightblue; }
.floated { float: left; height: 100px; }
/* container height = 0, blue not visible */

/* Fix: BFC contains the float */
.container {
  background: lightblue;
  display: flow-root; /* or overflow: hidden */
}`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['bfc', 'float', 'layout', 'containment'],
    tier: 'advanced',
  },
  {
    id: 'flexbox-vs-grid',
    question: 'When should you use Flexbox vs CSS Grid?',
    answer: `Flexbox is one-dimensional — it controls layout along a single axis (row or column). Use it for: navigation bars, button groups, centering single items, distributing items along one axis. Grid is two-dimensional — it controls rows AND columns simultaneously. Use it for: page-level layouts, card grids, any design that requires both horizontal and vertical alignment. They complement each other: a grid layout with flexbox inside individual cells is very common. The key question: do you need to control both axes simultaneously? If yes, Grid.`,
    codeExample: `/* Flexbox — one axis (row of buttons) */
.toolbar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

/* Grid — two axes (card gallery) */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['flexbox', 'grid', 'layout', 'comparison'],
    tier: 'core',
  },
  {
    id: 'z-index-not-working',
    question: 'Why is z-index not working on my element?',
    answer: `There are two common reasons: (1) z-index only works on positioned elements (position: relative, absolute, fixed, or sticky). On a statically positioned element, z-index has no effect. (2) Stacking contexts — z-index values only compete within the same stacking context. If a parent element creates a new stacking context (via transform, opacity < 1, filter, etc.) with a lower z-index, its children can never appear above elements outside that parent, no matter how high their z-index is.`,
    codeExample: `/* Bug: parent is a stacking context with z-index: 1 */
.parent {
  position: relative;
  z-index: 1;       /* creates stacking context */
  transform: translateZ(0); /* also creates stacking context! */
}
.child {
  position: absolute;
  z-index: 9999;   /* only competes within .parent — can't beat .other */
}

/* Fix option 1: remove the stacking context from parent */
/* Fix option 2: use isolation: isolate to be explicit */
/* Fix option 3: move element to body level (portal pattern) */`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['z-index', 'stacking-context', 'positioning', 'debugging'],
    tier: 'core',
  },
  {
    id: 'centering-methods',
    question: 'What are the modern ways to center an element in CSS?',
    answer: `The cleanest modern methods: (1) Flexbox on the parent: display: flex; justify-content: center; align-items: center. (2) Grid on the parent: display: grid; place-items: center. (3) Absolute + transform for overlay elements: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%). (4) margin: auto in a flex/grid container. Avoid old methods like negative margins or table-cell unless supporting very old browsers.`,
    codeExample: `/* Method 1: Flexbox (most common) */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Method 2: Grid (simplest) */
.parent {
  display: grid;
  place-items: center;
}

/* Method 3: Absolute + transform (overlays) */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['centering', 'flexbox', 'grid', 'layout'],
    tier: 'core',
  },
  {
    id: 'custom-props-vs-sass-vars',
    question: 'How do CSS custom properties differ from Sass variables?',
    answer: `Sass variables are preprocessor features — they're resolved at compile time and compiled away. They cannot change at runtime, respond to media queries, or be accessed from JavaScript. CSS custom properties (--var) live in the browser — they're part of the cascade, inherit through the DOM, can be changed at runtime with JavaScript, respond to media queries and container queries, and can be animated (with @property). Use Sass variables for build-time config; use CSS custom properties for design tokens that need runtime flexibility.`,
    codeExample: `/* Sass variable — compile-time, static */
$primary: #6366f1;
.button { background: $primary; } /* compiled to: background: #6366f1 */

/* CSS custom property — runtime, dynamic */
:root { --primary: #6366f1; }
.button { background: var(--primary); }

/* Runtime theme switch — impossible with Sass vars */
document.documentElement.style.setProperty('--primary', '#ef4444');

/* Responds to media query — impossible with Sass vars */
@media (prefers-color-scheme: dark) {
  :root { --primary: #818cf8; }
}`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['custom-properties', 'variables', 'sass', 'comparison'],
    tier: 'core',
  },
  {
    id: 'will-change-usage',
    question: 'When and how should you use will-change?',
    answer: `will-change hints to the browser that an element will animate soon, promoting it to its own compositor layer. This can eliminate jank during animations but has costs: GPU memory for each layer, layer creation overhead, and it creates a stacking context. Best practices: (1) Only use it for properties that will actually animate (transform, opacity). (2) Add it just before the animation, remove it after. (3) Don't apply globally or to too many elements. (4) If you're already using transform: translateZ(0) as a GPU hack, will-change: transform is cleaner.`,
    codeExample: `/* Bad: applied globally and unnecessarily */
* { will-change: transform; }

/* Good: added on hover (before animation) */
.card:hover { will-change: transform; }
.card { transition: transform 0.3s; }

/* Good: added and removed via JS */
function prepareAnimation(el) {
  el.style.willChange = 'transform, opacity';
  el.addEventListener('animationend', () => {
    el.style.willChange = 'auto';
  }, { once: true });
}`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['will-change', 'performance', 'gpu', 'animations'],
    tier: 'advanced',
  },
  {
    id: 'pseudo-element-vs-pseudo-class',
    question: 'What is the difference between pseudo-elements and pseudo-classes?',
    answer: `Pseudo-classes select existing elements based on a state or position: :hover, :focus, :first-child, :nth-child(), :not(), :is(), :has(). They style things that are already there. Pseudo-elements create virtual elements that don't exist in the DOM: ::before and ::after insert generated content; ::placeholder styles placeholder text; ::selection styles selected text; ::first-line, ::first-letter, ::marker. Modern CSS uses :: (double colon) for pseudo-elements and : (single colon) for pseudo-classes, though browsers accept single colon for legacy pseudo-elements.`,
    codeExample: `/* Pseudo-class: select by state/position */
a:hover { color: rebeccapurple; }
li:first-child { font-weight: bold; }
input:focus-visible { outline: 2px solid blue; }

/* Pseudo-element: create virtual content */
.quote::before { content: '"'; color: gold; }
.quote::after  { content: '"'; color: gold; }
::selection { background: #6366f1; color: white; }
li::marker { color: var(--color-primary); }`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['pseudo-elements', 'pseudo-classes', 'selectors'],
    tier: 'core',
  },
  {
    id: 'responsive-without-media-queries',
    question: 'How can you write responsive CSS without media queries?',
    answer: `Modern CSS provides responsive tools that don't need @media breakpoints: clamp() for fluid sizing (font-size, padding, width), min()/max() for bounds, auto-fill/auto-fit with minmax() in Grid, flex-wrap, container queries for component-level responsiveness, and the aspect-ratio property. These approaches respond continuously to the available space rather than jumping at fixed breakpoints.`,
    codeExample: `/* Fluid type — no breakpoints needed */
h1 { font-size: clamp(1.5rem, 4vw, 3rem); }

/* Responsive grid — wraps when items don't fit */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

/* Fluid spacing */
.section { padding: clamp(2rem, 5vw, 6rem); }

/* Responsive container width */
.container { width: min(90%, 1200px); margin-inline: auto; }`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['responsive', 'clamp', 'grid', 'fluid'],
    tier: 'advanced',
  },
  {
    id: 'margin-collapse-explanation',
    question: 'When do margins collapse and how do you prevent it?',
    answer: `Vertical margins (top and bottom) collapse between adjacent block-level elements and between a parent and its first/last child — the resulting margin is the larger of the two, not the sum. Horizontal margins never collapse. Conditions preventing collapse: elements in a BFC (flex/grid children, overflow !== visible, float), elements with border or padding between them, inline-block elements, positioned elements. To prevent parent-child collapse: add padding or border to the parent, or create a BFC with display: flow-root.`,
    codeExample: `/* Sibling collapse: result is 2rem, not 3rem */
.a { margin-bottom: 2rem; }
.b { margin-top: 1rem; }

/* Parent-child collapse: margin "leaks" out */
.parent { /* no border/padding */ }
.child { margin-top: 2rem; } /* parent's top shifts instead! */

/* Fix: BFC or add padding */
.parent {
  display: flow-root; /* or: overflow: hidden; padding-top: 1px; */
}

/* No collapse in flex/grid */
.flex-parent { display: flex; flex-direction: column; }`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['margin-collapse', 'bfc', 'layout', 'box-model'],
    tier: 'core',
  },
  {
    id: 'position-values',
    question: 'What are the differences between position values in CSS?',
    answer: `static (default): normal document flow, no positioning properties. relative: normal flow but offset from its natural position; creates a positioning context for absolute children. absolute: removed from flow, positioned relative to nearest positioned ancestor. fixed: removed from flow, positioned relative to the viewport — stays in place when scrolling. sticky: hybrid — in flow until it hits its scroll threshold, then acts like fixed within its scroll container. Only non-static elements can use z-index.`,
    codeExample: `/* relative: stays in flow, offset from natural position */
.el { position: relative; top: 10px; } /* pushes down, gap remains */

/* absolute: nearest positioned ancestor is the reference */
.parent { position: relative; }
.child  { position: absolute; bottom: 0; right: 0; }

/* fixed: always relative to viewport */
.topnav { position: fixed; top: 0; width: 100%; z-index: 100; }

/* sticky: normal flow until threshold, then sticks */
.tableheader { position: sticky; top: 0; background: white; }`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['position', 'absolute', 'fixed', 'sticky', 'layout'],
    tier: 'core',
  },
  {
    id: 'css-has-use-cases',
    question: 'What are practical use cases for the CSS :has() selector?',
    answer: `:has() is the "parent selector" CSS lacked for decades. Practical uses: (1) Style a form when it has invalid inputs. (2) Style a card differently when it contains an image. (3) Style a label when its sibling input is focused (without JS). (4) Style a list item when it's the last one with a sibling. (5) Conditionally show/hide decorators based on child presence. Browser support reached baseline in 2023.`,
    codeExample: `/* Disable submit when form has invalid field */
form:has(:invalid) button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
}

/* Card without image: show text header */
.card:not(:has(img)) .card-header { display: block; }

/* Highlight label when input is focused */
.field:has(input:focus) label {
  color: var(--color-primary);
}

/* Count-based styling */
ul:has(li:nth-child(5)) li { font-size: 0.9rem; }`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['has', 'pseudo-classes', 'selectors', 'modern-css'],
    tier: 'advanced',
  },
  {
    id: 'cascade-layers-practice',
    question: 'How do cascade layers improve CSS architecture?',
    answer: `Without @layer, adding third-party CSS (Bootstrap, design systems) requires fighting their specificity with !important or overly specific selectors. With @layer, import third-party CSS into a named layer — then your custom styles in a later layer always win, even with low-specificity selectors. Layers also let teams create explicit style hierarchies: reset → base → components → utilities, where each layer always wins over the previous regardless of selector weight.`,
    codeExample: `/* Declare priority (right-to-left: utilities wins) */
@layer reset, base, components, utilities;

/* Third-party contained in its layer */
@import url("bootstrap.min.css") layer(third-party);

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
}

@layer components {
  /* Even an ID selector here... */
  #submit-btn { color: white; background: blue; }
}

@layer utilities {
  /* ...is beaten by this class in a later layer */
  .text-red { color: red; } /* wins! */
}`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['cascade-layers', 'architecture', 'specificity'],
    tier: 'advanced',
  },
  {
    id: 'paint-layout-composite',
    question: 'What CSS properties cause layout, paint, or composite changes?',
    answer: `Rendering has three phases with different costs. Layout (most expensive) recalculates geometry — triggered by width, height, margin, padding, top/left, font-size, display, float. Paint (medium) redraws pixels — triggered by color, background, box-shadow, border-color. Composite (cheapest) only moves existing layers — triggered by transform and opacity. For smooth 60fps animations, animate only transform and opacity. If you must animate other properties, use will-change to promote elements and batch DOM reads/writes to avoid layout thrashing.`,
    codeExample: `/* ✗ Expensive — triggers layout on each frame */
@keyframes bad {
  from { width: 100px; }
  to   { width: 200px; }
}

/* ✓ GPU-accelerated — composite only */
@keyframes good {
  from { transform: scaleX(0.5); }
  to   { transform: scaleX(1); }
}

/* Layout thrashing — DON'T DO THIS */
elements.forEach(el => {
  el.style.width = el.offsetWidth + 10 + 'px'; // read then write in loop
});

/* Fix: batch reads, then batch writes */
const widths = elements.map(el => el.offsetWidth);
elements.forEach((el, i) => el.style.width = widths[i] + 10 + 'px');`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['performance', 'layout', 'paint', 'composite', 'animation'],
    tier: 'advanced',
  },
  {
    id: 'container-queries-vs-media',
    question: 'What problem do container queries solve that media queries cannot?',
    answer: `Media queries respond to the viewport — a component styled to change at 768px works fine on a full-width page but breaks when placed in a narrow sidebar (still 768px+ viewport). Container queries respond to the element's container width, making components truly portable. A card component that switches between stacked and side-by-side layouts based on its container works correctly wherever you place it — whether that's a full-width section, a two-column grid, or a narrow sidebar.`,
    codeExample: `/* Media query: viewport-dependent, not component-portable */
@media (min-width: 600px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}
/* Problem: viewport is 1200px but the card is in a 280px sidebar */

/* Container query: responds to actual available space */
.card-wrapper { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}
/* Works correctly in any context */`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['container-queries', 'responsive', 'media-queries', 'components'],
    tier: 'advanced',
  },
  {
    id: 'box-sizing-border-box',
    question: 'Why is box-sizing: border-box recommended?',
    answer: `The default box-sizing: content-box adds padding and border on top of the declared width/height, making sizing calculations non-intuitive. A 200px element with 20px padding is actually 240px wide. With border-box, padding and border are included within the declared width — a 200px element stays 200px. This makes CSS math straightforward and is the universal recommendation. Apply it globally with the reset shown.`,
    codeExample: `/* Universal reset — apply first in your CSS */
*, *::before, *::after {
  box-sizing: border-box;
}

/* content-box (default — confusing) */
.el { width: 200px; padding: 20px; }
/* actual rendered width: 200 + 20 + 20 = 240px */

/* border-box (intuitive) */
.el { box-sizing: border-box; width: 200px; padding: 20px; }
/* actual rendered width: 200px — padding is inside */`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['box-model', 'border-box', 'box-sizing'],
    tier: 'core',
  },
  {
    id: 'logical-properties-why',
    question: 'What are CSS logical properties and why should you use them?',
    answer: `Physical properties (margin-left, padding-right, border-top) are hardcoded to physical directions. Logical properties use flow-relative terms: inline (horizontal in LTR, but horizontal-reversed in RTL), block (vertical). margin-inline-start maps to margin-left in LTR but margin-right in RTL — automatically. Using logical properties makes components RTL-compatible without duplicating CSS in dir="rtl" blocks. They're also more natural for vertical writing modes used in CJK typography.`,
    codeExample: `/* Physical — must override for RTL */
.el { padding-left: 1rem; margin-left: auto; border-left: 3px solid blue; }
[dir="rtl"] .el { padding-left: 0; padding-right: 1rem; ... }

/* Logical — works in both LTR and RTL automatically */
.el {
  padding-inline-start: 1rem;  /* left in LTR, right in RTL */
  margin-inline: auto;         /* centers horizontally in both */
  border-inline-start: 3px solid blue;
}`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['logical-properties', 'rtl', 'i18n', 'modern-css'],
    tier: 'advanced',
  },
  {
    id: 'css-nesting',
    question: 'How does native CSS nesting work and how does it differ from Sass?',
    answer: `Native CSS nesting (baseline 2024) lets you write nested rules inside a parent without a preprocessor. Rules must be preceded by & or a combinator — you can't start a nested rule with a bare type selector. Sass nesting has been around longer and compiles away; native CSS nesting runs in the browser and can respond to runtime changes. The main practical difference: nested selectors in CSS must use & before type selectors (& p instead of p), though this restriction was relaxed in the final spec.`,
    codeExample: `/* Native CSS nesting */
.card {
  background: white;
  border-radius: 0.5rem;

  /* State */
  &:hover { background: #f5f5f5; }

  /* Child elements */
  & .title { font-size: 1.25rem; font-weight: 600; }
  & .body  { color: #6b7280; }

  /* Modifier */
  &.featured { border: 2px solid var(--color-primary); }

  /* Media query inside rule */
  @media (max-width: 600px) {
    padding: 1rem;
  }
}`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['nesting', 'modern-css', 'sass', 'architecture'],
    tier: 'advanced',
  },
  {
    id: 'custom-props-animation',
    question: 'Can you animate CSS custom properties?',
    answer: `Plain custom properties (--var) can't be animated because the browser doesn't know their type. Registered properties created with @property can be animated because they have a declared syntax and initial-value. This enables previously impossible animations: transitioning between two colors stored in a custom property, animating a gradient, or smooth counter values. The @property syntax also lets the property be used in calc() for typed number values.`,
    codeExample: `/* Unregistered — can't animate */
:root { --progress: 0%; }
.bar { width: var(--progress); transition: --progress 0.3s; } /* won't work */

/* Registered with @property — animatable */
@property --progress {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.bar {
  width: var(--progress);
  transition: --progress 0.4s ease;
}
.bar.full { --progress: 100%; } /* smooth animation! */

/* Animatable gradient */
@property --hue { syntax: '<number>'; initial-value: 0; inherits: false; }
.el { background: hsl(var(--hue) 80% 60%); transition: --hue 0.5s; }`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['custom-properties', 'at-property', 'animation', 'houdini'],
    tier: 'advanced',
  },
  {
    id: 'critical-css-technique',
    question: 'What is critical CSS and how do you implement it?',
    answer: `Critical CSS is the minimal CSS required to render the above-the-fold content. Inlining it in a <style> tag in <head> eliminates the render-blocking external stylesheet request for initial paint. Non-critical CSS is then loaded asynchronously. The tradeoff: inlined CSS is not cached separately (but the benefit of faster paint usually outweighs this). Tools like critters, penthouse, or PurgeCSS can extract and inline critical CSS automatically.`,
    codeExample: `<head>
  <!-- Critical CSS inlined — no network round trip -->
  <style>
    /* above-the-fold styles only */
    body { margin: 0; font-family: system-ui; }
    header { position: fixed; top: 0; width: 100%; background: #fff; }
    .hero { height: 100vh; display: grid; place-items: center; }
  </style>

  <!-- Non-critical CSS loaded async -->
  <link
    rel="preload"
    href="/styles/main.css"
    as="style"
    onload="this.rel='stylesheet'"
  />
  <noscript><link rel="stylesheet" href="/styles/main.css" /></noscript>
</head>`,
    codeLanguage: 'html',
    difficulty: 'expert',
    tags: ['performance', 'critical-css', 'render-blocking', 'optimization'],
    tier: 'advanced',
  },
  // ─── Fresher additions ───────────────────────────────────────────────────
  {
    id: 'css-units-explained',
    question: 'What is the difference between px, em, rem, %, vw, and vh?',
    answer: `px: absolute pixels — fixed size, not responsive to user or browser font-size changes. Use for fine-grained control (border widths, box shadows).

em: relative to the element's own font-size. If the element has font-size: 20px, 1.5em = 30px. Compounds with nesting, which can cause unexpected sizes deep in the tree.

rem (root em): relative to the <html> element's font-size (usually 16px). Doesn't compound. Best for typography and spacing that should respect the user's font-size preference.

%: relative to the parent's same property (width, height, font-size). Great for fluid layouts.

vw/vh: 1vw = 1% of the viewport width/height. Use for full-screen sections, fluid typography with clamp().

Rule of thumb: rem for font-size and spacing, % or fr for layout widths, px for fine details.`,
    codeExample: `html { font-size: 16px; } /* default browser font size */

/* rem — consistent, user-respecting */
h1   { font-size: 2rem; }    /* 32px — but 2× user's preference */
body { font-size: 1rem; }    /* 16px */
.gap { padding: 1.5rem; }    /* 24px */

/* em — useful for component-internal spacing */
.badge {
  font-size: 0.875rem;       /* 14px */
  padding: 0.25em 0.75em;    /* 3.5px 10.5px — scales WITH badge's font-size */
}

/* vw — fluid hero text */
.hero-title {
  font-size: clamp(1.5rem, 5vw, 4rem); /* min, fluid, max */
}

/* % — fluid layout */
.sidebar { width: 25%; }
.content  { width: 75%; }`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['units', 'rem', 'em', 'px', 'vw', 'responsive'],
    tier: 'core',
  },
  {
    id: 'display-values-explained',
    question: 'What are the differences between block, inline, inline-block, flex, and grid?',
    answer: `block: full width by default, starts on a new line, accepts width/height/margin (all sides). Examples: div, p, h1.

inline: only as wide as content, does not start a new line, horizontal margin/padding works but vertical margin/padding doesn't affect surrounding layout. Examples: span, a, strong.

inline-block: like inline (sits in text flow) but accepts full box model (width/height/vertical margin). Good for buttons next to text.

flex (display: flex on container): one-dimensional layout. Children become flex items. Control main axis (justify-content) and cross axis (align-items). Essential for navigation bars, centering.

grid (display: grid on container): two-dimensional layout. Define rows AND columns simultaneously. Best for page-level layouts and card grids.

none: removes element from layout AND accessibility tree. Use visibility: hidden to hide visually while keeping it in the flow.`,
    codeExample: `/* Block — full width, new line */
div { display: block; width: 50%; } /* 50% of parent */

/* Inline — text flow */
span { display: inline; } /* width/height ignored */

/* Inline-block — in text flow + box model */
.badge {
  display: inline-block;
  padding: 0.25em 0.5em;
  vertical-align: middle;
}

/* Flex — one-axis layout */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

/* Grid — two-axis layout */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}`,
    codeLanguage: 'css',
    difficulty: 'fresher',
    tags: ['display', 'block', 'inline', 'flex', 'grid', 'layout'],
    tier: 'core',
  },
  {
    id: 'css-transitions-vs-animations',
    question: 'What is the difference between CSS transitions and animations?',
    answer: `Transitions animate between two states triggered by a state change (hover, class toggle, focus). They need a trigger, have a start state and end state, and can't loop on their own. Defined with: transition: property duration timing-function delay.

Animations (@keyframes) run independently of state changes — they can loop, play in reverse, alternate, and go through multiple steps. Defined with @keyframes to describe the steps, then applied with animation properties.

Performance rule: only animate transform and opacity — these use the GPU compositor and don't trigger layout or paint. Animating width, height, top, left, etc. causes layout recalculation every frame and will drop below 60fps on complex pages.`,
    codeExample: `/* Transition — state change triggered */
.button {
  background: blue;
  transform: scale(1);
  transition: background 0.2s ease, transform 0.2s ease;
}
.button:hover {
  background: darkblue;
  transform: scale(1.05);
}

/* Animation — runs automatically, can loop */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(0.95); }
}

.spinner { animation: spin 1s linear infinite; }
.loading { animation: pulse 1.5s ease-in-out infinite; }

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['transitions', 'animations', 'keyframes', 'performance'],
    tier: 'core',
  },
  {
    id: 'css-transform-deep',
    question: 'How does CSS transform work and what does it create?',
    answer: `transform applies geometric transformations to an element without affecting layout flow — other elements don't reflow. Functions: translate() (move), rotate(), scale(), skew(), matrix().

transform creates a new stacking context and positioning context. This is why transform: translateZ(0) or transform: translate3d(0,0,0) is used as a "GPU hack" — it promotes the element to its own compositor layer.

Transforms are applied right-to-left when chained: transform: rotate(45deg) translateX(100px) first translates in the rotated space, then... wait, no — they are applied right to left, so translateX happens first in the un-rotated coordinate system. Order matters — rotate then translate ≠ translate then rotate.

3D transforms (perspective, rotateX/Y/Z, translate3d) enable 3D space effects.`,
    codeExample: `/* Order matters! */
/* Right-to-left: first scale(2), then translateX(50px) */
.a { transform: translateX(50px) scale(2); } /* moves 100px (scaled) */
.b { transform: scale(2) translateX(50px); } /* moves 50px (unscaled) */

/* Common patterns */
.centered {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%); /* exact centering */
}

.flip-card:hover {
  transform: perspective(600px) rotateY(180deg);
  transition: transform 0.6s ease;
}

/* GPU layer promotion */
.will-animate {
  will-change: transform; /* promotes before animation */
  /* or */
  transform: translateZ(0); /* legacy GPU hack */
}`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['transform', 'translate', 'rotate', 'scale', 'gpu', '3d'],
    tier: 'advanced',
  },
  {
    id: 'bem-methodology',
    question: 'What is BEM and when should you use it?',
    answer: `BEM (Block Element Modifier) is a CSS naming convention: Block__Element--Modifier.

Block: standalone component (card, nav, button).
Element: part of a block, only meaningful inside it (card__title, nav__link).
Modifier: variant or state of a block or element (button--primary, card__title--highlighted).

Benefits: classes are descriptive and self-documenting, low specificity (all single-class), no nesting wars, easy to grep. Particularly valuable in large teams or when CSS Modules aren't available.

When not to use: in CSS Modules or scoped styles (the module system handles encapsulation, so BEM is redundant). Also overkill for small projects. CUBE CSS and utility-first (Tailwind) are alternative philosophies.`,
    codeExample: `/* Block */
.card { border-radius: 8px; padding: 1.5rem; background: white; }

/* Elements — part of the card block */
.card__image  { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.card__title  { font-size: 1.25rem; font-weight: 600; margin-top: 1rem; }
.card__body   { color: var(--color-text-muted); margin-top: 0.5rem; }
.card__footer { display: flex; gap: 0.5rem; margin-top: 1rem; }

/* Modifiers — variants */
.card--featured { border: 2px solid var(--color-primary); }
.card--skeleton { background: var(--color-skeleton); animation: shimmer 1s infinite; }
.card__title--truncated { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['bem', 'naming', 'methodology', 'architecture', 'conventions'],
    tier: 'advanced',
  },
  {
    id: 'css-subgrid',
    question: 'What problem does CSS Subgrid solve?',
    answer: `Subgrid solves the "nested grid alignment" problem. Without subgrid, a child element that is itself a grid starts a new independent grid — it can't align its own children to the outer grid's tracks.

With display: subgrid, a grid item inherits the parent grid's tracks. Its children align to the parent's columns or rows as if they were direct children of the outer grid. This enables perfectly aligned card layouts where card titles, images, and footers all line up across cards, regardless of content length.

Browser support: all major browsers since 2023 (Chrome 117, Firefox 71, Safari 16).`,
    codeExample: `/* Without subgrid — each card has independent rows */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.card {
  display: grid;
  /* Card rows are independent — titles don't align across cards! */
  grid-template-rows: auto 1fr auto;
}

/* With subgrid — card rows aligned to gallery's row tracks */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Define row tracks for 3-row cards */
  grid-template-rows: repeat(auto-fill, auto 1fr auto);
  gap: 1rem;
}

.card {
  grid-row: span 3;      /* take 3 rows */
  display: grid;
  grid-template-rows: subgrid; /* ← inherit parent's row tracks */
}

/* Now .card__image, .card__body, .card__footer align
   perfectly across ALL cards, regardless of content length */`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['subgrid', 'grid', 'alignment', 'modern-css', 'layout'],
    tier: 'advanced',
  },
  {
    id: 'css-containment',
    question: 'What is CSS containment and why is it important for performance?',
    answer: `CSS containment (contain property) tells the browser that an element's subtree is independent from the rest of the document, enabling performance optimizations.

contain: layout — the element's internal layout doesn't affect elements outside it (no layout escape). The browser can skip re-laying other elements when internal layout changes.

contain: paint — the element's content doesn't overflow visually (browser can skip painting offscreen contained elements).

contain: strict — both layout and paint plus size containment (element doesn't affect document size).

container-type: inline-size (for container queries) implicitly applies layout and style containment.

content-visibility: auto (CSS level) tells the browser to skip rendering offscreen elements entirely — massive performance win for long pages with many complex components.`,
    codeExample: `/* contain: strict — browser can isolate layout/paint for this widget */
.widget {
  contain: strict;    /* layout + paint + size containment */
  width: 300px;
  height: 200px;
}

/* content-visibility: auto — skip offscreen rendering */
.article-card {
  content-visibility: auto;
  /* Provide estimated size to prevent layout shift on scroll */
  contain-intrinsic-size: auto 300px;
}

/* Container query setup implicitly adds containment */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['containment', 'contain', 'content-visibility', 'performance'],
    tier: 'advanced',
  },
  {
    id: 'css-in-js-tradeoffs',
    question: 'What are the tradeoffs between CSS Modules, CSS-in-JS, and utility-first CSS?',
    answer: `CSS Modules: scoped class names at build time, zero runtime overhead, works with any CSS. Best for: projects that want scoped CSS without a framework. Tradeoff: no dynamic styling based on props without inline styles or CSS variables.

CSS-in-JS (styled-components, Emotion): styles defined in JS/TS, full prop-based dynamic styling, co-located with components. Tradeoff: runtime style injection (affects performance, especially on SSR), larger bundle, potential hydration issues. The community trend since 2022 is moving away from runtime CSS-in-JS toward build-time solutions.

Zero-runtime CSS-in-JS (vanilla-extract, Linaria, Panda CSS): TypeScript-defined styles compiled to static CSS at build time. Best of both worlds: type safety + no runtime cost.

Utility-first (Tailwind CSS): small utility classes composed in HTML. Fast to build, eliminates dead CSS, great for design-constrained teams. Tradeoff: verbose HTML, requires learning Tailwind's system.`,
    codeExample: `/* CSS Modules — scoped classes, zero runtime */
/* Card.module.css */
.card { background: white; border-radius: 8px; }
.title { font-size: 1.25rem; }

// Card.tsx
import styles from './Card.module.css';
<div className={styles.card}><h2 className={styles.title}>{title}</h2></div>

/* styled-components — runtime, prop-based */
const Button = styled.button<{ $variant: 'primary' | 'ghost' }>\`
  background: \${p => p.$variant === 'primary' ? 'blue' : 'transparent'};
  color: \${p => p.$variant === 'primary' ? 'white' : 'blue'};
\`;

/* vanilla-extract — zero runtime, TypeScript */
// button.css.ts
export const button = style({ background: 'blue', color: 'white' });

/* Tailwind — utility classes */
<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['css-modules', 'css-in-js', 'tailwind', 'styled-components', 'architecture'],
    tier: 'advanced',
  },
  {
    id: 'design-tokens-theming',
    question: 'How do you implement a design token system and multi-theme support in CSS?',
    answer: `Design tokens are the atomic decisions of a design system — colors, spacing, typography — expressed as named variables. In CSS, they live as custom properties on :root.

Theming: define token values per theme by scoping overrides to a class or data attribute on a parent element. JavaScript sets the attribute; CSS handles all the visual changes.

Dark mode: use @media (prefers-color-scheme: dark) for automatic system preference, or data-theme="dark" for user-controlled toggle (gives user agency over system preference).

Semantic tokens: define two layers — primitive tokens (--color-blue-600: #2563eb) and semantic tokens (--color-action-primary: var(--color-blue-600)). Components consume semantic tokens; themes swap the semantic layer without touching component code.`,
    codeExample: `/* Primitive tokens — raw values */
:root {
  --primitive-blue-500: #3b82f6;
  --primitive-blue-700: #1d4ed8;
  --primitive-gray-50:  #f9fafb;
  --primitive-gray-900: #111827;
}

/* Semantic tokens — light theme (default) */
:root {
  --color-bg:            var(--primitive-gray-50);
  --color-bg-card:       #ffffff;
  --color-text:          var(--primitive-gray-900);
  --color-primary:       var(--primitive-blue-500);
  --color-primary-hover: var(--primitive-blue-700);
}

/* Dark theme override */
[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:      var(--primitive-gray-900);
    --color-bg-card: #1f2937;
    --color-text:    var(--primitive-gray-50);
  }
}

/* Components consume semantic tokens — theme-agnostic */
.card {
  background: var(--color-bg-card);
  color:      var(--color-text);
}`,
    codeLanguage: 'css',
    difficulty: 'expert',
    tags: ['design-tokens', 'theming', 'dark-mode', 'custom-properties', 'design-system'],
    tier: 'advanced',
  },
  {
    id: 'accessibility-css',
    question: 'What CSS techniques are essential for accessibility?',
    answer: `focus-visible: style keyboard focus rings without showing them for mouse clicks. Use :focus-visible instead of removing outline entirely — removing all focus styles is a WCAG failure.

prefers-reduced-motion: some users (epilepsy, vestibular disorders) need reduced animation. Respect this media query by disabling or reducing all animations.

prefers-contrast: high contrast mode. Ensure your design works with forced-colors: active (Windows High Contrast mode) — use system color keywords as fallbacks.

visually hidden (sr-only): text visible to screen readers but not sighted users. DO NOT use display: none or visibility: hidden — those hide from AT too. Use the clip-path technique.

Minimum tap/click target size: 44×44px (WCAG 2.5.5) or 24×24px (WCAG 2.5.8 Level AA).`,
    codeExample: `/* Focus ring — keyboard only, not on click */
:focus { outline: none; }
:focus-visible { outline: 3px solid var(--color-primary); outline-offset: 2px; }

/* Visually hidden — visible to screen readers only */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:   0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Minimum tap target */
.icon-button {
  min-width: 44px;
  min-height: 44px;
  display: grid;
  place-items: center;
}`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['accessibility', 'a11y', 'focus-visible', 'reduced-motion', 'sr-only'],
    tier: 'core',
  },
  {
    id: 'reflow-vs-repaint',
    question: 'What is the difference between reflow and repaint? Which properties trigger which?',
    answer: `Reflow (layout) recalculates the geometry — position and size — of the affected element and everything downstream in the document. It is the most expensive render operation because it can cascade across the entire tree. Repaint re-draws pixels for an element whose appearance changed but whose geometry did not (color, background, shadow). Compositing-only changes (transform, opacity on a promoted layer) skip both and are handled entirely by the GPU. The rule: always prefer animating transform and opacity over properties like left, top, width, or background-color.`,
    codeExample: `/* Triggers reflow every frame — expensive */
.bad { transition: left 0.3s, width 0.3s; }

/* Triggers repaint every frame */
.ok  { transition: background-color 0.3s; }

/* Composite only — GPU, no CPU layout or paint */
.good { transition: transform 0.3s, opacity 0.3s; }

/* Properties that trigger reflow (partial list):
   width, height, padding, margin, border, top, left,
   font-size, font-family, display, position,
   offsetWidth, scrollTop (reading these forces sync layout) */`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['reflow', 'repaint', 'compositing', 'performance', 'rendering'],
    tier: 'advanced',
  },
  {
    id: 'layout-thrashing',
    question: 'What is layout thrashing and how do you fix it?',
    answer: `Layout thrashing happens when JavaScript alternates DOM reads and writes in rapid succession, forcing the browser to recalculate layout (reflow) on every iteration instead of batching it. Reading layout properties like offsetWidth, getBoundingClientRect, or scrollTop after writing to the DOM invalidates the browser's cached layout and forces a synchronous recalculation. The fix is to batch all reads first, then all writes — the browser only reflows once at the end of the write phase.`,
    codeExample: `// BAD — thrashing: read → write → reflow on every iteration
elements.forEach(el => {
  const width = el.offsetWidth; // forces reflow
  el.style.width = width + 10 + 'px'; // write
});

// GOOD — batch reads, then batch writes
const widths = elements.map(el => el.offsetWidth); // all reads (one reflow)
elements.forEach((el, i) => {
  el.style.width = widths[i] + 10 + 'px'; // all writes
});

// Also good: requestAnimationFrame to schedule writes
requestAnimationFrame(() => {
  elements.forEach((el, i) => {
    el.style.width = widths[i] + 10 + 'px';
  });
});`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['layout-thrashing', 'reflow', 'performance', 'dom', 'requestAnimationFrame'],
    tier: 'advanced',
  },
  {
    id: 'will-change-usage',
    question: 'When should you use will-change and what are its pitfalls?',
    answer: `will-change hints to the browser to promote an element to its own GPU compositor layer before an animation starts, preventing the jank of on-the-fly promotion at the first frame. Use it on elements that genuinely animate transform or opacity frequently. The main pitfall is overuse: each promoted layer is a texture stored in GPU memory (VRAM). Applying it broadly — especially to all elements or large sections — causes excessive VRAM consumption, slows compositing, and can hurt performance on mobile. Apply it surgically, and ideally remove it via JavaScript after the animation ends.`,
    codeExample: `/* Good: targeted use on animated element */
.drawer {
  will-change: transform;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}
.drawer.open {
  transform: translateX(0);
}

/* Remove after animation to free layer */
el.addEventListener('transitionend', () => {
  el.style.willChange = 'auto';
});

/* Bad: promoting everything */
* { will-change: transform; } /* destroys performance */

/* Bad: on elements that rarely animate */
.static-card { will-change: transform; } /* wasted VRAM */`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['will-change', 'gpu', 'compositing', 'animation', 'performance'],
    tier: 'advanced',
  },
  {
    id: 'font-display-fout-foit',
    question: 'What is FOIT and FOUT, and how does font-display fix them?',
    answer: `FOIT (Flash of Invisible Text) is when the browser hides text while a web font loads, showing a blank space until the font arrives. FOUT (Flash of Unstyled Text) is when the browser shows text in a fallback system font first, then swaps to the web font once loaded — causing a visible layout shift. font-display in @font-face controls this tradeoff. font-display: swap eliminates FOIT by showing fallback text immediately and swapping when ready — best for body text. font-display: optional skips the swap entirely if the font isn't already cached — eliminates both FOIT and FOUT at the cost of the font not loading on first visit. Pair with <link rel="preload"> to reduce the swap window.`,
    codeExample: `@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap; /* show fallback immediately, swap when loaded */
}

/* Preload critical fonts to shrink the swap window */
/* In <head>: */
/* <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin> */

/* font-display values:
   auto     — browser default (usually FOIT)
   block    — short FOIT (3s invisible, then swap)
   swap     — FOUT (show fallback immediately, swap anytime)
   fallback — short FOIT (100ms), then fallback, swap within 3s only
   optional — short FOIT (100ms), use cache only, no swap */`,
    codeLanguage: 'css',
    difficulty: 'experienced',
    tags: ['font-display', 'foit', 'fout', 'web-fonts', 'performance', 'cls'],
    tier: 'advanced',
  },
];

export default cssQna;
