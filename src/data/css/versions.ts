import type { VersionEntry } from '@/types/content';

const cssVersions: VersionEntry[] = [
  {
    version: 'Modern CSS (2024)',
    releaseYear: 2024,
    highlights: [
      {
        feature: '@starting-style',
        description: 'Define entry animations for elements being inserted into the DOM or transitioning from display: none.',
        codeExample: `.dialog {
  transition: opacity 0.3s;
  @starting-style { opacity: 0; }
}`,
      },
      {
        feature: 'CSS Nesting (native)',
        description: 'Nest selectors inside parent rules without a preprocessor.',
        codeExample: `.card {
  background: white;
  &:hover { background: #f5f5f5; }
  & .title { font-size: 1.25rem; }
}`,
      },
      {
        feature: 'light-dark() Function',
        description: 'Concise color selection based on the user\'s color scheme preference.',
        codeExample: `.el { color: light-dark(#1f2937, #f9fafb); }`,
      },
      {
        feature: 'CSS Anchor Positioning',
        description: 'Position elements relative to other arbitrary elements — native popovers and tooltips.',
        codeExample: `.tooltip { position: absolute; position-anchor: --trigger; }`,
      },
    ],
  },
  {
    version: ':has() Selector',
    releaseYear: 2023,
    highlights: [
      {
        feature: 'Relational / Parent Selector',
        description: ':has() selects elements based on their descendants — the long-awaited "parent selector".',
        codeExample: `/* Style a card that contains an image */
.card:has(img) { padding: 0; }

/* Disable submit when form has invalid input */
form:has(:invalid) .submit { opacity: 0.5; }

/* Style a label whose sibling input is focused */
.field:has(input:focus) label { color: var(--primary); }`,
      },
    ],
  },
  {
    version: 'Container Queries',
    releaseYear: 2023,
    highlights: [
      {
        feature: 'container-type & @container',
        description: 'Style elements based on their container\'s size — not the viewport. Game-changer for component design.',
        codeExample: `.wrapper { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 2fr; }
}`,
      },
      {
        feature: 'Container query units (cqi, cqb)',
        description: 'Size relative to the container, like vw/vh are to the viewport.',
        codeExample: `.card-img { width: 50cqi; }`,
      },
    ],
  },
  {
    version: 'Cascade Layers (@layer)',
    releaseYear: 2022,
    highlights: [
      {
        feature: '@layer declaration',
        description: 'Explicit ordering groups that override specificity for managing large codebases.',
        codeExample: `@layer reset, base, components, utilities;

@layer components {
  .button { color: white; } /* specific selector in low layer */
}
@layer utilities {
  .text-red { color: red; } /* wins — later layer */
}`,
      },
      {
        feature: 'Third-party containment',
        description: 'Import external CSS into a layer to contain its specificity.',
        codeExample: `@import url("bootstrap.css") layer(third-party);`,
      },
    ],
  },
  {
    version: 'CSS Grid',
    releaseYear: 2017,
    highlights: [
      {
        feature: 'Two-dimensional Layout',
        description: 'Control both rows and columns simultaneously — the first true CSS layout system.',
        codeExample: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}`,
      },
      {
        feature: 'Named Template Areas',
        description: 'Human-readable grid layouts using named areas.',
        codeExample: `grid-template-areas:
  "header header"
  "sidebar main"
  "footer footer";`,
      },
      {
        feature: 'The fr Unit',
        description: 'Fractional unit distributes available space proportionally.',
        codeExample: `grid-template-columns: 1fr 2fr 1fr; /* 25% 50% 25% */`,
      },
    ],
  },
  {
    version: 'CSS Custom Properties',
    releaseYear: 2015,
    highlights: [
      {
        feature: '--custom-property syntax',
        description: 'Define reusable, inheritable values in the cascade — not Sass preprocessing.',
        codeExample: `:root { --primary: #6366f1; }
.button { background: var(--primary); }`,
      },
      {
        feature: 'Runtime theming',
        description: 'Custom properties change at runtime via JavaScript — enabling live theme switching.',
        codeExample: `document.documentElement.style.setProperty('--primary', '#ef4444');`,
      },
    ],
  },
  {
    version: 'CSS Flexbox',
    releaseYear: 2012,
    highlights: [
      {
        feature: 'Flexible Box Layout',
        description: 'One-dimensional layout system replacing float-based and table-based layouts.',
        codeExample: `.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}`,
      },
      {
        feature: 'Alignment & Justification',
        description: 'justify-content, align-items, align-self gave unprecedented alignment control.',
        codeExample: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
      },
    ],
  },
  {
    version: 'CSS 3 (modules)',
    releaseYear: 2011,
    highlights: [
      {
        feature: 'Border Radius',
        description: 'Native rounded corners — no image hacks required.',
        codeExample: `.card { border-radius: 0.5rem; }`,
      },
      {
        feature: 'Box Shadow & Text Shadow',
        description: 'Drop shadows directly in CSS.',
        codeExample: `.card { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }`,
      },
      {
        feature: 'CSS Gradients',
        description: 'linear-gradient, radial-gradient as background images without image files.',
        codeExample: `background: linear-gradient(135deg, #6366f1, #8b5cf6);`,
      },
      {
        feature: 'Transitions & Animations',
        description: 'Smooth property interpolation and @keyframes multi-step animations.',
        codeExample: `transition: opacity 0.3s ease;
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
      },
      {
        feature: 'Transforms (2D)',
        description: 'translate, rotate, scale, skew without JavaScript.',
        codeExample: `.hover { transform: translateY(-4px) scale(1.02); }`,
      },
      {
        feature: 'Media Queries',
        description: 'Responsive design based on viewport width, orientation, and device features.',
        codeExample: `@media (max-width: 768px) { .sidebar { display: none; } }`,
      },
      {
        feature: 'Web Fonts (@font-face)',
        description: 'Embed custom fonts without relying on system fonts.',
        codeExample: `@font-face {
  font-family: 'Inter';
  src: url('inter.woff2') format('woff2');
}`,
      },
      {
        feature: 'Selectors Level 3',
        description: ':nth-child, :last-child, :not(), attribute selectors [attr^=], [attr$=].',
        codeExample: `li:nth-child(odd) { background: #f5f5f5; }`,
      },
      {
        feature: 'Opacity & RGBA/HSLA Colors',
        description: 'Transparent colors and element-level opacity.',
        codeExample: `color: rgba(99, 102, 241, 0.8);
background: hsla(240, 80%, 60%, 0.5);`,
      },
    ],
  },
  {
    version: 'CSS 2 / 2.1',
    releaseYear: 1998,
    highlights: [
      {
        feature: 'Positioning (absolute, relative, fixed)',
        description: 'Removed reliance on table layouts for positioning elements.',
        codeExample: `.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}`,
      },
      {
        feature: 'Pseudo-elements & Pseudo-classes',
        description: ':hover, :focus, :first-child, ::before, ::after, ::first-line, ::first-letter.',
        codeExample: `a:hover { text-decoration: underline; }
p::first-line { font-weight: bold; }`,
      },
      {
        feature: 'Media Types',
        description: '@media print, screen, etc. for targeting different output devices.',
        codeExample: `@media print { .sidebar { display: none; } }`,
      },
      {
        feature: 'Generated Content',
        description: 'content property on ::before/::after for inserting text or characters.',
        codeExample: `.external::after { content: " ↗"; }`,
      },
      {
        feature: 'z-index & Stacking Contexts',
        description: 'Specified z-index behavior and how stacking contexts are formed.',
      },
    ],
  },
  {
    version: 'CSS 1',
    releaseYear: 1996,
    highlights: [
      {
        feature: 'Basic Selectors & Properties',
        description: 'Type, class, and ID selectors. Font, color, text, margin, padding, border properties.',
        codeExample: `p { color: black; font-size: 16px; }
.highlight { background: yellow; }`,
      },
      {
        feature: 'Cascade & Inheritance',
        description: 'The cascade algorithm and basic inheritance were defined from the start.',
      },
    ],
  },
];

export default cssVersions;
