import type { VersionEntry } from '@/types/content';

const htmlVersions: VersionEntry[] = [
  {
    version: 'Living Standard (WHATWG)',
    releaseYear: 2019,
    highlights: [
      {
        feature: 'Continuous updates',
        description: 'WHATWG publishes HTML as a living standard with no version numbers — changes ship continuously.',
      },
      {
        feature: 'loading="lazy"',
        description: 'Native lazy loading for images and iframes.',
        codeExample: `<img src="large.jpg" loading="lazy" alt="..." />`,
      },
      {
        feature: 'decoding="async"',
        description: 'Hints the browser to decode images off the main thread.',
        codeExample: `<img src="photo.jpg" decoding="async" alt="..." />`,
      },
      {
        feature: 'fetchpriority attribute',
        description: 'Hint the browser about the relative priority of a resource (high, low, auto).',
        codeExample: `<img src="hero.jpg" fetchpriority="high" alt="Hero image" />`,
      },
      {
        feature: 'Popover API',
        description: 'Declarative popover behavior without JavaScript — toggle, show, hide via HTML attributes.',
        codeExample: `<button popovertarget="menu">Open</button>
<div id="menu" popover>Popover content</div>`,
      },
    ],
  },
  {
    version: 'HTML 5.2',
    releaseYear: 2017,
    highlights: [
      {
        feature: 'dialog Element',
        description: 'Native modal and non-modal dialog with built-in focus management and ::backdrop.',
        codeExample: `<dialog id="modal">
  <p>Content</p>
  <form method="dialog"><button>Close</button></form>
</dialog>`,
      },
      {
        feature: 'Payment Request API',
        description: 'Browser-native checkout flow integrated with the HTML spec.',
      },
      {
        feature: 'Multiple main elements',
        description: 'Multiple <main> elements allowed if only one is visible at a time.',
      },
    ],
  },
  {
    version: 'HTML 5.1',
    releaseYear: 2016,
    highlights: [
      {
        feature: 'picture Element',
        description: 'Art direction for responsive images — different source files per media condition.',
        codeExample: `<picture>
  <source media="(max-width: 600px)" srcset="sm.jpg" />
  <img src="lg.jpg" alt="..." />
</picture>`,
      },
      {
        feature: 'Improved Forms',
        description: 'Hidden attribute promotion, additional input attributes, fieldset improvements.',
      },
      {
        feature: 'menu & menuitem',
        description: 'Context menu elements (later removed from spec).',
        breakingChange: false,
      },
    ],
  },
  {
    version: 'HTML5',
    releaseYear: 2014,
    highlights: [
      {
        feature: 'Simple DOCTYPE',
        description: 'The doctype triggers standards mode and is not versioned.',
        codeExample: `<!DOCTYPE html>`,
      },
      {
        feature: 'Semantic Elements',
        description: 'New structural elements: header, nav, main, article, section, aside, footer, figure, figcaption.',
        codeExample: `<main>
  <article>
    <header><h1>Title</h1></header>
    <section>Content</section>
    <footer>Byline</footer>
  </article>
</main>`,
      },
      {
        feature: 'Native Multimedia',
        description: 'video and audio elements with source fallbacks — no Flash plugin needed.',
        codeExample: `<video controls>
  <source src="clip.mp4" type="video/mp4" />
</video>`,
      },
      {
        feature: 'Canvas API',
        description: '2D drawing surface via JavaScript. Foundation for games, data visualizations, and image editing.',
        codeExample: `<canvas id="c" width="300" height="150"></canvas>`,
      },
      {
        feature: 'Input Types & Validation',
        description: 'email, number, date, range, color, search, url, tel with native validation.',
        codeExample: `<input type="email" required />
<input type="range" min="0" max="100" />`,
      },
      {
        feature: 'Web Storage (localStorage / sessionStorage)',
        description: 'Client-side key-value storage as a replacement for cookies.',
        codeExample: `localStorage.setItem('theme', 'dark');`,
      },
      {
        feature: 'WebWorkers',
        description: 'Run scripts on background threads to avoid blocking the main thread.',
        codeExample: `const worker = new Worker('worker.js');`,
      },
      {
        feature: 'Custom Data Attributes',
        description: 'data-* attributes store extra information on elements without custom attributes.',
        codeExample: `<li data-id="42" data-category="fruit">Apple</li>`,
      },
      {
        feature: 'details & summary',
        description: 'Native disclosure widget without JavaScript.',
        codeExample: `<details><summary>More info</summary><p>...</p></details>`,
      },
    ],
  },
  {
    version: 'XHTML 1.0',
    releaseYear: 2000,
    highlights: [
      {
        feature: 'XML syntax rules',
        description: 'All tags must be closed, attributes quoted, elements lowercase. Stricter authoring than HTML 4.',
        codeExample: `<!-- XHTML requires closing slash on void elements -->
<br />
<img src="photo.jpg" alt="Photo" />`,
      },
      {
        feature: 'Served as text/html',
        description: 'Most XHTML 1.0 pages were served with the HTML MIME type, processed by the HTML parser.',
      },
    ],
  },
  {
    version: 'HTML 4.01',
    releaseYear: 1999,
    highlights: [
      {
        feature: 'Strict, Transitional, Frameset doctypes',
        description: 'Three variants controlled which features were allowed.',
        codeExample: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd">`,
      },
      {
        feature: 'Tables for layout',
        description: 'The dominant layout technique before CSS — deeply nested tables for columns and spacing.',
      },
      {
        feature: 'Presentational attributes',
        description: 'font, bgcolor, align, border mixed structure with presentation.',
        codeExample: `<font face="Arial" color="red">Text</font>`,
        breakingChange: false,
      },
      {
        feature: 'Forms',
        description: 'Basic input types (text, checkbox, radio, select, textarea), form actions and methods.',
      },
    ],
  },
];

export default htmlVersions;
