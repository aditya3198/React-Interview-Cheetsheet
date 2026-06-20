import type { SyntaxEntry } from '@/types/content';

const cssSyntax: SyntaxEntry[] = [
  {
    id: 'flexbox',
    title: 'Flexbox',
    description: 'A layout system that arranges items in a single direction — either a row or a column — and controls how space is distributed between them.',
    language: 'css',
    tags: ['flexbox', 'layout', 'alignment'],
    tier: 'core',
    level: 'fresher',
    code: `.container {
  display: flex;
  flex-direction: row;          /* row | column | row-reverse | column-reverse */
  justify-content: space-between; /* main axis: flex-start | center | space-between | space-around | space-evenly */
  align-items: center;          /* cross axis: flex-start | center | flex-end | stretch | baseline */
  flex-wrap: wrap;              /* nowrap | wrap | wrap-reverse */
  gap: 1rem;                    /* row-gap + column-gap shorthand */
}

.item {
  flex: 1 1 200px; /* grow shrink basis */
  /* or shorthand: flex: 1 (grow), flex: auto, flex: none */
  align-self: flex-start;       /* override align-items for this item */
  order: 2;                     /* reorder without changing HTML */
}

/* Center anything */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
  },
  {
    id: 'css-transitions',
    title: 'CSS Transitions',
    description: 'Animate a CSS property change smoothly whenever an element switches from one state to another, like on hover or focus.',
    language: 'css',
    tags: ['transitions', 'hover', 'motion'],
    tier: 'core',
    level: 'fresher',
    code: `.button {
  background: #6366f1;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  /* Transition specific properties */
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  /* Or all properties */
  transition: all 0.2s ease;
}

.button:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

/* transition shorthand: property | duration | easing | delay */
transition: opacity 0.3s ease-in-out 0s;

/* Common easing functions */
/* ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier() */`,
  },
  {
    id: 'media-queries',
    title: 'Media Queries',
    description: 'Apply different CSS rules depending on the screen size, orientation, or user preferences like dark mode.',
    language: 'css',
    tags: ['responsive', 'media-queries', 'breakpoints'],
    tier: 'core',
    level: 'fresher',
    code: `/* Width-based (mobile-first recommended) */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }

/* Range syntax (modern, requires CSS Media Queries Level 4) */
@media (width >= 768px) { }
@media (768px <= width < 1024px) { }

/* Orientation */
@media (orientation: landscape) { }

/* User preferences */
@media (prefers-color-scheme: dark) {
  :root { --bg: #0f172a; --text: #f8fafc; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; }
}

/* Print */
@media print {
  .no-print { display: none; }
}`,
  },
  {
    id: 'css-custom-properties',
    title: 'CSS Custom Properties (Variables)',
    description: 'Store a value once using --name and reuse it anywhere with var(). Unlike Sass variables, these work in the browser at runtime and can be changed with JavaScript.',
    language: 'css',
    tags: ['custom-properties', 'variables', 'cascade'],
    tier: 'core',
    level: 'experienced',
    since: 'CSS3',
    code: `:root {
  --color-primary: #6366f1;
  --color-text: #1f2937;
  --spacing-base: 1rem;
  --radius-md: 0.5rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-base);
  border-radius: var(--radius-md);
  /* Fallback value */
  color: var(--color-button-text, white);
}

/* Override in a theme */
[data-theme="dark"] {
  --color-primary: #818cf8;
  --color-text: #f9fafb;
}

/* JS access */
/* getComputedStyle(el).getPropertyValue('--color-primary') */
/* el.style.setProperty('--color-primary', '#f00') */`,
  },
  {
    id: 'css-grid',
    title: 'CSS Grid',
    description: 'A layout system that lets you define rows and columns at the same time, giving you precise control over both axes of your layout.',
    language: 'css',
    tags: ['grid', 'layout', '2d'],
    tier: 'core',
    level: 'experienced',
    code: `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
  grid-template-rows: auto 1fr auto;       /* header / content / footer */
  gap: 1rem 2rem;                          /* row-gap column-gap */

  /* Named lines */
  grid-template-columns: [sidebar-start] 250px [sidebar-end content-start] 1fr [content-end];
}

.item {
  grid-column: 1 / 3;       /* span columns 1-2 */
  grid-row: 2 / span 2;    /* start at row 2, span 2 rows */
}

/* Named template areas */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }`,
  },
  {
    id: 'css-transforms',
    title: 'CSS Transforms',
    description: 'Move, rotate, scale, or skew an element visually without disturbing the layout around it — other elements stay in place.',
    language: 'css',
    tags: ['transforms', '2d', '3d', 'animation'],
    tier: 'core',
    level: 'experienced',
    code: `/* 2D transforms */
.el {
  transform: translateX(20px);
  transform: translateY(-50%);
  transform: translate(-50%, -50%); /* center trick */
  transform: rotate(45deg);
  transform: scale(1.2);
  transform: scaleX(0.5);
  transform: skewX(10deg);

  /* Chain multiple transforms */
  transform: translateY(-10px) rotate(5deg) scale(1.05);

  /* Origin of transformation */
  transform-origin: top left;
  transform-origin: 50% 100%;
}

/* 3D transforms */
.card {
  transform: perspective(1000px) rotateY(15deg);
  transform-style: preserve-3d; /* enable 3D for children */
  backface-visibility: hidden;  /* hide back face when rotated */
}

/* GPU-friendly properties (avoid layout/paint) */
/* Best: transform, opacity */
/* Avoid animating: width, height, top, left, box-shadow */`,
  },
  {
    id: 'css-animations',
    title: 'CSS Animations & Keyframes',
    description: 'Define animations that play through multiple steps using @keyframes, then attach them to elements with the animation property. No hover or trigger needed — they can loop on their own.',
    language: 'css',
    tags: ['animations', 'keyframes', 'motion'],
    tier: 'core',
    level: 'experienced',
    code: `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
}

.card {
  animation: fadeInUp 0.4s ease-out forwards;
  /* name | duration | easing | delay | iterations | direction | fill-mode */
  animation: fadeInUp 0.4s ease-out 0.1s 1 normal forwards;
}

.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Pause on hover */
.card:hover { animation-play-state: paused; }

/* Respect motion preference */
@media (prefers-reduced-motion: reduce) {
  .card { animation: none; }
}`,
  },
  {
    id: 'pseudo-elements',
    title: 'Pseudo-elements',
    description: '::before and ::after let you insert decorative content without adding HTML. Other pseudo-elements like ::placeholder and ::selection style specific parts of existing elements.',
    language: 'css',
    tags: ['pseudo-elements', 'before', 'after', 'content'],
    tier: 'core',
    level: 'experienced',
    code: `/* ::before and ::after require content property */
.badge::before {
  content: "★ ";
  color: gold;
}

/* Decorative line */
.heading::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  margin-top: 0.5rem;
}

/* ::placeholder */
input::placeholder { color: #9ca3af; font-style: italic; }

/* ::selection */
::selection { background: #6366f1; color: white; }

/* ::first-line, ::first-letter */
p::first-letter {
  font-size: 3em;
  float: left;
  line-height: 1;
  margin-right: 0.1em;
}

/* ::marker (list bullets) */
li::marker { color: var(--color-primary); }`,
  },
  {
    id: 'aspect-ratio',
    title: 'aspect-ratio',
    description: 'Keep an element at a fixed width-to-height ratio (like 16:9 for video) without the old percentage-padding workaround.',
    language: 'css',
    tags: ['aspect-ratio', 'responsive', 'layout', 'modern-css'],
    tier: 'core',
    level: 'experienced',
    code: `/* Maintain 16:9 ratio */
.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* Square thumbnail */
.thumbnail {
  aspect-ratio: 1;  /* shorthand for 1/1 */
  width: 80px;
  object-fit: cover; /* on img elements */
}

/* 4:3 card image */
.card-img {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
}

/* Old padding hack (no longer needed) */
.old-way {
  position: relative;
  padding-top: 56.25%; /* 9/16 = 56.25% */
}
.old-way > * {
  position: absolute;
  inset: 0;
}`,
  },
  {
    id: 'clamp-min-max',
    title: 'clamp(), min(), max()',
    description: 'Math functions that let values scale smoothly with the viewport, staying between a minimum and maximum — no media query breakpoints needed.',
    language: 'css',
    tags: ['clamp', 'fluid', 'responsive', 'modern-css'],
    tier: 'advanced',
    level: 'experienced',
    code: `/* clamp(MIN, PREFERRED, MAX) */
.heading {
  /* Fluid type: 1.5rem at small viewport, up to 3rem */
  font-size: clamp(1.5rem, 4vw, 3rem);
}

.container {
  /* Fluid width that won't exceed 1200px or go below 300px */
  width: clamp(300px, 90%, 1200px);

  /* Equivalent to: */
  width: min(max(300px, 90%), 1200px);
}

/* min() — pick the smallest */
.img {
  width: min(500px, 100%); /* responsive: max 500px, never overflow */
}

/* max() — pick the largest */
.sidebar {
  min-height: max(300px, 50vh); /* at least 300px, but 50vh if larger */
}

/* Fluid spacing */
.section {
  padding: clamp(2rem, 5vw, 6rem);
}`,
  },
  {
    id: 'modern-pseudo-classes',
    title: 'Modern Pseudo-classes',
    description: 'Modern selectors that let you match multiple targets at once (:is, :where), exclude elements (:not), or style a parent based on what it contains (:has).',
    language: 'css',
    tags: ['pseudo-classes', 'selectors', 'modern-css'],
    tier: 'advanced',
    level: 'experienced',
    code: `/* :is() — match any in the list (takes highest specificity of its args) */
:is(h1, h2, h3, h4) { line-height: 1.2; }
:is(article, section, aside) p { margin-bottom: 1rem; }

/* :where() — same as :is() but ZERO specificity (easy to override) */
:where(h1, h2, h3) { margin-top: 1.5em; }

/* :not() — exclude elements */
a:not(.button):not([aria-current]) { color: var(--link-color); }

/* :has() — parent selector ("style parent if it contains X") */
.card:has(img) { padding: 0; }          /* card with an image */
form:has(:invalid) .submit-btn {        /* form with invalid input */
  opacity: 0.5;
  pointer-events: none;
}
li:has(+ li) { margin-bottom: 0.5rem; } /* li followed by another li */

/* :focus-visible — only show focus ring for keyboard navigation */
button:focus-visible { outline: 2px solid var(--color-primary); }`,
  },
  {
    id: 'clip-path',
    title: 'clip-path',
    description: 'Crop an element to a custom shape — circle, triangle, hexagon, or any polygon — by hiding everything outside the clipping boundary.',
    language: 'css',
    tags: ['clip-path', 'shapes', 'masking'],
    tier: 'advanced',
    level: 'experienced',
    code: `.circle {
  clip-path: circle(50%);
  clip-path: circle(60px at center);
}

.polygon {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);  /* slanted bottom */
}

.hexagon {
  clip-path: polygon(
    50% 0%, 100% 25%, 100% 75%,
    50% 100%, 0% 75%, 0% 25%
  );
}

.ellipse {
  clip-path: ellipse(60% 40% at center);
}

/* Animate clip-path */
.reveal {
  clip-path: inset(0 100% 0 0); /* hidden */
  transition: clip-path 0.5s ease;
}
.reveal.visible {
  clip-path: inset(0 0% 0 0);  /* fully revealed */
}`,
  },
  {
    id: 'logical-properties',
    title: 'CSS Logical Properties',
    description: 'Spacing and sizing properties that are defined relative to text direction. They automatically flip for right-to-left languages without extra CSS.',
    language: 'css',
    tags: ['logical-properties', 'rtl', 'i18n', 'modern-css'],
    tier: 'advanced',
    level: 'experienced',
    code: `/* Physical vs Logical */
/* Physical: left/right/top/bottom — fixed direction */
/* Logical: inline/block, start/end — relative to text flow */

.el {
  /* Margin (LTR: inline = horizontal, block = vertical) */
  margin-inline: auto;           /* margin-left + margin-right */
  margin-inline-start: 1rem;    /* margin-left in LTR */
  margin-block: 2rem;            /* margin-top + margin-bottom */

  /* Padding */
  padding-inline: 1.5rem;
  padding-block: 1rem;

  /* Border */
  border-inline-start: 3px solid var(--color-primary);
  border-block-end: 1px solid #e5e7eb;

  /* Size */
  inline-size: 100%;            /* width */
  block-size: auto;             /* height */
  max-inline-size: 65ch;        /* max-width */

  /* Position */
  inset-inline-start: 0;        /* left in LTR, right in RTL */
  inset: 0 0 auto 0;            /* top right bottom left shorthand */
}`,
  },
  {
    id: 'container-queries',
    title: 'Container Queries',
    description: 'Apply styles based on how wide the parent container is, not the full viewport. This makes components adapt correctly when placed in different parts of the page.',
    language: 'css',
    tags: ['container-queries', 'responsive', 'modern-css'],
    tier: 'advanced',
    level: 'experienced',
    since: 'CSS Containment Level 3',
    code: `/* 1. Declare a containment context */
.card-wrapper {
  container-type: inline-size;
  container-name: card; /* optional name */
}

/* 2. Query the container, not the viewport */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
  }
}

@container (min-width: 600px) {
  .card-title {
    font-size: 1.5rem;
  }
}

/* Container query units */
.card-img {
  width: 50cqi; /* 50% of container inline size */
}`,
  },
  {
    id: 'cascade-layers',
    title: 'Cascade Layers (@layer)',
    description: 'Group styles into named priority layers so you can control which styles win without fighting over specificity scores.',
    language: 'css',
    tags: ['cascade-layers', 'layer', 'specificity', 'modern-css'],
    tier: 'advanced',
    level: 'expert',
    since: 'CSS Cascade 5',
    code: `/* Declare layer order — later layers win over earlier ones */
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
}

@layer base {
  body { font-family: system-ui; line-height: 1.5; }
  a { color: var(--link-color); }
}

@layer components {
  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}

@layer utilities {
  .mt-4 { margin-top: 1rem; }
  .hidden { display: none; }
}

/* Unlayered styles beat any layer */
.override { color: red; } /* always wins over all layers */

/* Import into a layer */
@import url("bootstrap.css") layer(third-party);`,
  },
  {
    id: 'subgrid',
    title: 'CSS Subgrid',
    description: 'Let a child grid item inherit its parent\'s row or column tracks so elements inside it can align to the outer grid — useful for lining up card sections across a row of cards.',
    language: 'css',
    tags: ['grid', 'subgrid', 'layout', 'modern-css'],
    tier: 'advanced',
    level: 'expert',
    since: 'CSS Grid Level 2',
    code: `/* Parent grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto; /* title / body / footer */
  gap: 1rem;
}

/* Each card spans all 3 row tracks */
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; /* inherit parent's row tracks */
}

/* Now title/body/footer align across ALL cards */
.card-title  { grid-row: 1; } /* always row 1 */
.card-body   { grid-row: 2; } /* always row 2 — fills available space */
.card-footer { grid-row: 3; } /* always row 3 — aligned at bottom */`,
  },
  {
    id: 'at-property',
    title: '@property (Houdini)',
    description: 'Declare a CSS custom property with a specific type (like a number or color). Once typed, the browser can animate it smoothly — something plain custom properties cannot do.',
    language: 'css',
    tags: ['at-property', 'houdini', 'custom-properties', 'modern-css'],
    tier: 'advanced',
    level: 'expert',
    since: 'CSS Houdini',
    code: `/* Register a typed custom property */
@property --hue {
  syntax: '<number>';
  initial-value: 200;
  inherits: false;
}

@property --progress {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

/* Now it can be transitioned/animated! */
.spinner {
  --hue: 200;
  color: hsl(var(--hue) 80% 60%);
  transition: --hue 0.5s;
}
.spinner:hover {
  --hue: 320;
}

/* Animate the custom property */
@keyframes rotate-hue {
  to { --hue: 360; }
}
.rainbow {
  animation: rotate-hue 3s linear infinite;
  color: hsl(var(--hue) 80% 60%);
}`,
  },
];

export default cssSyntax;
