import type { QnaItem } from '@/types/content';

const cssQna: QnaItem[] = [
  {
    id: 'specificity-calculation',
    question: 'How is CSS specificity calculated?',
    answer: `Specificity is a score the browser assigns to each CSS rule. It decides which rule wins when two rules target the same property on the same element. The score is tracked in three categories: (A) number of ID selectors, (B) number of class selectors, attribute selectors, and pseudo-classes, (C) number of type selectors and pseudo-elements. Written as (A, B, C). Inline styles (the style attribute) beat all selectors. !important overrides the entire system. When two rules have equal specificity, the one that appears later in the file wins. The universal selector (*) and :where() contribute zero specificity — they do not affect the score at all.`,
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
    answer: `A Block Formatting Context (BFC) is an isolated layout region — changes inside it do not leak out, and changes outside do not affect it. It is created by: display: flow-root, overflow set to anything other than visible (hidden, auto, scroll), a float, position: absolute or fixed, display: flex or grid on the container, or contain: layout or strict. A BFC does three things: (1) contains its floated children so the container's height includes them — this solves the classic "collapsed container" problem, (2) prevents margin collapsing between the BFC and its children, and (3) does not slide underneath an adjacent float. display: flow-root is the cleanest way to create a BFC because it has no visual side effects.`,
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
    answer: `Flexbox works along a single axis — either a row or a column, but not both at once. Use it for: navigation bars, button groups, centering a single item, or distributing items along one direction. Grid works along two axes simultaneously — rows and columns at the same time. Use it for: page-level layouts, card grids, or any design where you need elements to line up both horizontally and vertically. The two systems complement each other and are commonly combined: a page-level grid for the overall layout with flexbox inside individual cells. The key question to ask yourself: do I need to control both rows and columns at the same time? If yes, reach for Grid.`,
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
    answer: `There are two common reasons. First, z-index only works on positioned elements — those with position: relative, absolute, fixed, or sticky. On an element with the default position: static, z-index has no effect at all. Second, stacking contexts (self-contained z-ordering layers) — z-index values only compete with other elements inside the same stacking context. If a parent element creates a stacking context (through transform, opacity less than 1, filter, or similar) and that parent has a low z-index, its children are stuck behind. No matter how high you set the child's z-index, it cannot appear above elements that are outside the parent's stacking context.`,
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
    answer: `The three cleanest modern approaches are: (1) Flexbox on the parent — display: flex; justify-content: center; align-items: center. Works for centering children in any direction. (2) Grid on the parent — display: grid; place-items: center. The shortest way to center an element. (3) Absolute positioning plus transform for overlays — position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%). Use this when the element must float on top of other content. A fourth option — margin: auto — centers an element horizontally inside a flex or grid container. Avoid old approaches like negative margins or display: table-cell unless you are targeting very old browsers.`,
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
    answer: `Sass variables are a preprocessor feature. They are resolved at compile time and replaced with their values in the output CSS. By the time the browser sees the CSS, the variable is gone. They cannot change at runtime, respond to media queries, or be read by JavaScript. CSS custom properties (--var) work inside the browser. They are part of the cascade (so they can be overridden), they inherit through the DOM tree, they can be updated at runtime with JavaScript, they respond to media queries and container queries, and they can be animated when registered with @property. A simple rule: use Sass variables for values that never need to change after build (like a spacing scale or a breakpoint value used in a mixin). Use CSS custom properties for design tokens — colors, font sizes, themes — that may need to change at runtime or vary by context.`,
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
    answer: `will-change tells the browser that an element is about to animate. The browser then promotes it to its own compositor (GPU) layer in advance, which avoids the visual stutter that can happen when promotion occurs at the first animation frame. This has real costs though: each promoted layer occupies GPU memory (VRAM), there is overhead in creating the layer, and the element automatically creates a new stacking context. Best practices: (1) Only use it on properties that will actually animate — mainly transform and opacity. (2) Add it just before the animation starts and remove it afterwards with el.style.willChange = 'auto'. (3) Never apply it globally or to large numbers of elements — too many layers hurt performance on low-memory devices. (4) If you have been using transform: translateZ(0) as an old GPU trick, will-change: transform is the modern replacement and is easier to read.`,
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
    answer: `Pseudo-classes select real elements based on their state or position in the document: :hover, :focus, :first-child, :nth-child(), :not(), :is(), :has(). They style elements that already exist in the HTML. Pseudo-elements create virtual sub-parts that do not exist in the HTML as actual nodes: ::before and ::after insert generated content before or after an element's content; ::placeholder styles the placeholder text inside an input; ::selection styles the text a user has highlighted; ::first-line, ::first-letter, and ::marker target specific parts of text and list items. Modern CSS syntax uses a double colon (::) for pseudo-elements and a single colon (:) for pseudo-classes. Browsers still accept single colon for older pseudo-elements like :before and :after, but the double colon is the correct and recommended form.`,
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
    answer: `Modern CSS has several tools that respond to the available space without requiring breakpoints. clamp() scales a value continuously between a minimum and maximum based on the viewport width — font-size: clamp(1rem, 4vw, 3rem) grows smoothly without ever needing a @media rule. min() and max() let you express constraints like "no wider than 500px, but also never wider than 100%." In CSS Grid, repeat(auto-fill, minmax(250px, 1fr)) creates as many columns as will fit, wrapping automatically. flex-wrap lets flex items spill to the next line when there is no room. container queries go one step further — they respond to the parent element's width instead of the viewport. These tools all work by reacting to actual available space continuously, rather than jumping at fixed breakpoints.`,
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
    answer: `Margin collapsing happens when two vertical margins (top or bottom) touch — instead of adding together, they merge into the larger of the two. This occurs between adjacent block-level siblings and between a parent and its first or last child when there is no border or padding separating them. Horizontal margins never collapse. Collapse does not happen when: elements are inside a flex or grid container, elements have overflow set to anything other than visible, elements have a border or padding between them, or elements are floated or absolutely positioned. To stop parent-child margin collapse specifically: add any amount of padding or border to the parent, or create a BFC on it with display: flow-root.`,
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
    answer: `static (default): the element sits in the normal document flow. You cannot use top, left, right, or bottom on it, and z-index has no effect. relative: the element stays in the normal flow but can be nudged from its natural position using top/left/right/bottom. It also creates a positioning anchor for any absolutely positioned children. absolute: the element is removed from the document flow — it does not take up space. It is positioned relative to the nearest ancestor that has a non-static position value. If no such ancestor exists, it is positioned relative to the initial viewport. fixed: also removed from flow, but positioned relative to the browser viewport and stays in the same spot when the user scrolls. sticky: a hybrid. The element sits in the normal flow until it reaches a scroll threshold (like top: 0), at which point it sticks in place like a fixed element — but only within the boundaries of its scroll container. Only non-static elements (relative, absolute, fixed, sticky) can use z-index.`,
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
    answer: `:has() is often called the "parent selector" — the ability to style an element based on what it contains, which CSS did not have for decades. Practical uses: (1) Disable or dim a submit button when the form contains an invalid input field. (2) Remove padding from a card when it contains an image. (3) Highlight a label when its sibling input is focused — no JavaScript needed. (4) Style a list item differently when it has a following sibling. (5) Show or hide decorative elements based on whether a certain child element is present. Browser support reached full baseline in 2023, so it is safe to use in production today.`,
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
    answer: `Without @layer, adding third-party CSS like Bootstrap means your own styles must compete with Bootstrap's selectors on specificity. If Bootstrap uses an ID selector and you use a class, Bootstrap wins — and the only way around it is !important or writing overly specific selectors yourself. With @layer, you import third-party CSS into a named layer — then your own styles in a later-declared layer always win, even if you use simple class selectors. Layers also let your team define a clear priority order: reset → base → components → utilities. Each layer always beats the one before it, regardless of how specific the selectors are inside each one.`,
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
    answer: `Browser rendering has three phases, each with a different performance cost. Layout (the most expensive): the browser recalculates the position and size of elements. It is triggered by changes to width, height, margin, padding, top, left, font-size, display, or float. Paint (medium cost): the browser redraws pixels for elements whose appearance changed but whose geometry did not. Triggered by changes to color, background, box-shadow, or border-color. Composite (cheapest): the GPU moves or fades an already-painted layer. Only transform and opacity on promoted elements trigger this stage alone. To keep animations smooth at 60 frames per second, animate only transform and opacity. If you must animate other properties, promote the element with will-change first, and batch your DOM reads and writes to prevent layout thrashing (repeatedly forcing the browser to recalculate layout in a loop).`,
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
    answer: `Media queries look at the viewport width — the full width of the browser window. This works for page-level layout changes, but it breaks down for reusable components. A card component styled to switch layouts at 768px will trigger that change based on the window size, not the space it actually has. If that card is placed in a narrow sidebar, the viewport might be 1200px wide — the media query fires and the card switches to its wide layout even though it only has 280px of actual space. Container queries fix this by responding to the parent element's width instead of the viewport. The card adapts to the space it actually has, so it works correctly in a sidebar, a two-column grid, or a full-width section — without any changes to the component's CSS.`,
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
    answer: `The default value, content-box, adds padding and border on top of the width you declare. If you set an element to 200px wide and add 20px of padding on each side, the element actually takes up 240px on screen. This makes sizing calculations harder than they need to be. With border-box, the width you declare includes the padding and border — a 200px element stays 200px no matter what padding you add. This makes layout math much more predictable. It is universally recommended to apply border-box to everything using the global reset shown in the code example.`,
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
    answer: `Physical properties like margin-left and padding-right are tied to absolute screen directions — left always means left. Logical properties use flow-relative terms instead. "Inline" refers to the direction text flows (horizontal in English), and "block" refers to the direction content stacks (vertical in English). margin-inline-start maps to margin-left in a left-to-right language like English, but automatically maps to margin-right in a right-to-left language like Arabic or Hebrew. Using logical properties means your component handles RTL layouts without you writing a separate block of overrides under [dir="rtl"]. They are also the natural fit for vertical writing modes used in CJK (Chinese, Japanese, Korean) typography.`,
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
    answer: `Native CSS nesting (available in all major browsers as of 2024) lets you write rules inside a parent rule without a build tool like Sass. This keeps related styles in one place and reduces repetition. Nested rules that target type selectors (like p or h2) need to start with & — you write & p instead of just p. Sass nesting has worked this way for years, but Sass compiles it away at build time. Native nesting runs directly in the browser. The main practical difference: native CSS nesting requires & before bare type selectors (though recent spec updates relaxed this in some cases), while Sass allows omitting it. For most everyday use like &:hover or & .child, the syntax is identical.`,
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
    answer: `Plain CSS custom properties cannot be animated. The browser treats their value as an opaque string — it does not know if the value is a color, a number, or a length, so it cannot interpolate (smoothly calculate in-between values) during an animation. Registered properties created with @property solve this by declaring a type. You tell the browser the syntax (like '<color>' or '<percentage>') and an initial value. With that information, the browser can animate the property smoothly — it knows how to blend between two colors or two percentages. This unlocks effects that were previously impossible in CSS alone, like animating a gradient or smoothly transitioning a color stored in a variable. Registered properties can also be used inside calc() because the browser knows their numeric type.`,
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
    answer: `Critical CSS is the smallest amount of CSS needed to render the part of the page visible on first load (called "above the fold"). By default, the browser blocks all rendering until it has downloaded and parsed every stylesheet. If you inline the critical CSS directly in a <style> tag in the <head>, the browser can paint the visible content immediately — no network round trip needed for that CSS. The rest of the CSS is then loaded asynchronously in the background. The tradeoff: inlined CSS cannot be cached separately by the browser, but the gain in first-paint speed usually outweighs this cost. Tools like Critters, Penthouse, or build-time Vite plugins can extract and inline critical CSS automatically.`,
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
    answer: `px: a fixed pixel size. It does not change if the user adjusts their browser font size. Use it for fine details like border widths and box shadows where you want exact control.

em: relative to the element's own font-size. If the element has font-size: 20px, then 1.5em equals 30px. The problem with em is that it compounds — if a parent is 1.2em and its child is also 1.2em, the child ends up at 1.2 × 1.2 = 1.44× the base size. This can produce unexpected results in deeply nested elements.

rem (root em): relative to the font-size on the <html> element, which is usually 16px in browsers. It does not compound. This is the best unit for font sizes and spacing because it respects the user's browser font-size preference.

%: relative to the parent element's value for the same property. 50% width means half the parent's width. Good for fluid layouts.

vw / vh: 1vw is 1% of the viewport width. 1vh is 1% of the viewport height. Use for full-screen sections or fluid font sizes with clamp().

General rule: use rem for font sizes and spacing, % or fr for layout widths, and px for fine decorative details.`,
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
    answer: `block: the element takes up the full available width and starts on a new line. You can set width, height, and margin on all four sides. Most structural HTML elements (div, p, h1) are block by default.

inline: the element is only as wide as its content. It sits in the text flow and does not start a new line. Horizontal margin and padding work, but top and bottom margin do not push surrounding elements away. Examples: span, a, strong.

inline-block: sits in the text flow like an inline element, but you can also set width, height, and vertical margin — the full box model works. Useful for badges or buttons that need to sit inline with text.

flex (set on the parent): creates a one-dimensional layout. Children become flex items you can align and distribute along one axis. Essential for navigation bars, button groups, and centering.

grid (set on the parent): creates a two-dimensional layout where you define rows and columns at the same time. Best for page-level structures and card grids.

none: removes the element completely from layout and from the accessibility tree (screen readers cannot find it). Use visibility: hidden instead if you want to hide it visually but keep it in the layout flow and accessible.`,
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
    answer: `Transitions animate a change between two states. They need a trigger — something like a :hover, a class being toggled, or a :focus. You define which property to animate, how long it takes, and the timing curve (ease, linear, etc.). They always go between exactly two states and cannot loop on their own.

CSS animations (@keyframes) run independently. You define steps in @keyframes and apply them to an element with the animation property. They can loop, reverse, alternate directions, and go through many intermediate steps without any user interaction.

Performance rule for both: only animate transform and opacity if you want smooth 60fps animations. These properties are handled by the GPU (graphics processor) and skip the expensive layout and paint steps. Animating width, height, top, or left forces the browser to recalculate layout on every single frame, which will cause dropped frames on complex pages.`,
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
    answer: `transform applies visual transformations — move, rotate, scale, skew — to an element without affecting the document layout. Other elements do not reflow when you apply a transform. The main functions are translate() (move), rotate(), scale(), skew(), and matrix().

Applying a transform also creates a new stacking context (z-ordering layer) and a new containing block for fixed-position children. This is why transform: translateZ(0) is sometimes used as a "GPU hack" — it forces the browser to promote the element to its own compositor layer.

When you chain multiple transforms, they are applied from right to left. So transform: rotate(45deg) translateX(100px) first moves the element 100px to the right in its original coordinate system, then rotates it. Compare that to transform: translateX(100px) rotate(45deg) — which first rotates and then moves 100px in the rotated direction. The order matters and the results are different.

3D transform functions — perspective(), rotateX(), rotateY(), rotateZ(), translate3d() — let you create depth effects in three-dimensional space.`,
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
    answer: `BEM (Block Element Modifier) is a naming convention for CSS classes. The format is Block__Element--Modifier.

Block: a standalone, self-contained component — like card, nav, or button.
Element: a part that only makes sense inside its block — like card__title or nav__link. The double underscore signals the relationship.
Modifier: a variant or state — like button--primary or card__title--highlighted. The double dash signals a variation.

The benefits: class names are self-documenting (you know where a class belongs just by reading it), all classes have low and equal specificity (a single class), and there are no specificity conflicts from nesting. Large teams find it especially useful because you can search for a class name and immediately understand its role.

When to skip it: if you are using CSS Modules or any scoped CSS system, the tooling already handles name isolation, so BEM is redundant. For small projects it can feel like extra ceremony. Tailwind (utility-first) and CUBE CSS are alternative approaches that solve the same naming problem differently.`,
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
    answer: `Without subgrid, a grid item that is itself a grid container creates its own independent grid. Its children align to its own tracks — not to the outer grid's tracks. This means card titles across a row of cards can never perfectly align because each card's grid is independent and sized to its own content. Subgrid fixes this. When you set grid-template-rows: subgrid or grid-template-columns: subgrid on a grid item, that item's children inherit and align to the parent grid's tracks instead of creating their own. The result: card images, titles, bodies, and footers all line up perfectly across a row of cards, regardless of how much content each card has. Browser support has been available in all major browsers since 2023.`,
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
    answer: `CSS containment (the contain property) is a hint that tells the browser an element's subtree is isolated from the rest of the document. The browser can then skip re-running layout, paint, or style calculations for the rest of the page when something inside the element changes.

contain: layout — layout changes inside the element do not cause reflow outside. The browser can skip recalculating positions of external elements.

contain: paint — the element's content does not visually overflow its border box. The browser can also skip painting the element entirely when it is off-screen.

contain: strict — applies layout, paint, and size containment all at once. The element's size is also independent of its children.

container-type: inline-size (used to set up container queries) automatically applies layout and style containment as a side effect.

content-visibility: auto is a higher-level shortcut. The browser skips rendering off-screen elements entirely — no layout, no paint. On long pages with many complex sections this can reduce initial render time dramatically. Pair it with contain-intrinsic-size to give the browser an estimated height for skipped sections so the scrollbar does not jump.`,
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
    answer: `CSS Modules: class names are made unique at build time (e.g. .title becomes .Card__title__3xQ2). Zero runtime cost. Works with any CSS feature. Best for teams that want scoped styles without adopting a framework. The main limitation: styling based on JavaScript props requires inline styles or CSS custom properties.

CSS-in-JS (styled-components, Emotion): styles are written in JavaScript or TypeScript files, co-located with the component. You can dynamically change styles based on props. The tradeoff: styles are injected at runtime, which adds cost — especially on server-rendered pages during hydration (the step where a server-rendered page becomes interactive in the browser). Since 2022 the community has been moving away from runtime CSS-in-JS.

Zero-runtime CSS-in-JS (vanilla-extract, Linaria, Panda CSS): a middle ground. You write styles in TypeScript and get type safety and prop-based APIs, but the output is compiled to static CSS at build time. No runtime cost.

Utility-first (Tailwind CSS): instead of writing CSS, you compose small pre-built utility classes directly in your HTML markup. No custom class names, no dead CSS (unused classes are removed at build time), and design decisions are constrained to a consistent scale. The tradeoff: HTML can become long, and you need to learn Tailwind's naming system.`,
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
    answer: `Design tokens are the named decisions of a design system — things like your brand colors, spacing scale, and font sizes. In CSS, they live as custom properties on :root (the html element). Instead of scattering raw values like #3b82f6 across your CSS, every component references a token like var(--color-primary).

Theming: to change the visual theme, you override the token values for a scoped context — a data attribute like [data-theme="dark"] or a class on the root. JavaScript sets the attribute and CSS does all the visual work.

Dark mode: you can use @media (prefers-color-scheme: dark) to automatically follow the user's system preference, or data-theme="dark" for a manual toggle button. The manual approach gives the user control over their system preference.

Semantic tokens: a useful pattern is to define two layers. Primitive tokens hold raw values — --color-blue-500: #3b82f6. Semantic tokens reference primitives and describe intent — --color-action-primary: var(--color-blue-500). Components consume semantic tokens. To change a theme, you only need to swap what the semantic tokens point to — no component code changes required.`,
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
    answer: `focus-visible: use :focus-visible instead of removing the focus ring with outline: none. The :focus-visible pseudo-class only shows the focus ring when the user is navigating with a keyboard — not when they click with a mouse. Removing all focus styles entirely is a WCAG (Web Content Accessibility Guidelines) failure because keyboard users lose the ability to see where they are on the page.

prefers-reduced-motion: some users have conditions like epilepsy or vestibular disorders that make motion harmful or disorienting. The @media (prefers-reduced-motion: reduce) query lets you detect this and disable or greatly reduce animations for those users.

prefers-contrast and forced colors: Windows has a High Contrast mode (forced-colors: active) that overrides your CSS colors with system colors. Test that your layout remains usable in this mode. Use system color keywords (ButtonText, LinkText, etc.) as fallbacks where needed.

Visually hidden (sr-only): sometimes you need text that only screen readers can access — like a label for an icon button. Do not use display: none or visibility: hidden — both hide the element from screen readers too. Instead use the clip-path technique shown in the code example.

Minimum touch target size: interactive elements should be at least 44×44px to be reliably tappable on mobile (WCAG 2.5.5), or 24×24px at a minimum (WCAG 2.5.8 Level AA).`,
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
    answer: `Reflow (also called layout) recalculates the position and size of the affected element and anything else in the page that depends on it. It is the most expensive operation because one change can cascade through the entire document tree. Repaint redraws the pixels of an element whose appearance changed without any geometry change — things like a new color, background, or shadow. It is less expensive than reflow because positions do not need to be recalculated. Compositing-only changes — transform and opacity on elements promoted to their own GPU layer — skip both reflow and repaint entirely. The GPU handles them directly. The practical rule: always prefer animating transform and opacity over properties like left, top, width, or background-color.`,
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
    answer: `Layout thrashing happens when JavaScript reads and writes to the DOM in an alternating loop. The browser caches its layout calculations, but any write (changing a style, adding an element) marks that cache as stale. If you then read a layout measurement like offsetWidth or getBoundingClientRect right after a write, the browser is forced to throw away the cache and recalculate layout immediately — so it can give you an accurate answer. Do this in a loop and the browser reflows on every single iteration. The fix is straightforward: collect all your DOM reads in one pass first, then do all your writes in a second pass. The browser reflows only once, after all the writes are done.`,
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
    answer: `will-change is a hint you add to an element to tell the browser it is about to animate. The browser responds by promoting it to its own GPU layer in advance. Without this hint, promotion happens at the first frame of the animation, which can cause a visible stutter or flash. The main pitfall is overuse. Each promoted layer is a texture stored in GPU memory (VRAM — the memory on the graphics card). Promoting too many elements wastes VRAM, slows down the compositing step, and can noticeably hurt performance on mobile devices with limited graphics memory. Use will-change on specific elements that genuinely animate frequently. Ideally, remove it via JavaScript after the animation finishes — el.style.willChange = 'auto' — so the layer is freed.`,
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
    answer: `FOIT (Flash of Invisible Text) is what happens when the browser hides text completely while waiting for a web font to download. The user sees a blank space where the text should be. FOUT (Flash of Unstyled Text) is the opposite approach: the browser shows the text immediately in a fallback system font, then swaps in the web font when it arrives. The swap causes a visible jump because the two fonts rarely have identical proportions. font-display inside @font-face controls which behavior you get. font-display: swap eliminates FOIT — text is always visible, with a fallback swap when the font loads. This is best for body text where readability matters more than a perfect first render. font-display: optional shows text for a short period in the fallback and only swaps if the web font is already cached — no swap on first visit. This eliminates both FOIT and FOUT at the cost of the font not appearing on the first page load. Pair any value with <link rel="preload"> to start downloading the font earlier, which shortens the swap window.`,
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
