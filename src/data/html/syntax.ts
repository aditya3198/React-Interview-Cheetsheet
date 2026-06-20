import type { SyntaxEntry } from '@/types/content';

const htmlSyntax: SyntaxEntry[] = [
  {
    id: 'semantic-elements',
    title: 'Semantic Elements',
    description: 'HTML5 elements that describe what content is, not just how it looks — helping browsers, search engines, and screen readers understand the page structure.',
    language: 'html',
    tags: ['semantic', 'structure', 'html5', 'accessibility'],
    tier: 'core',
    level: 'fresher',
    code: `<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <section>
      <h2>Section Heading</h2>
      <p>Content goes here.</p>
    </section>
    <aside>Related links</aside>
  </article>
</main>

<footer>
  <p>&copy; 2024 My Site</p>
</footer>`,
  },
  {
    id: 'meta-tags',
    title: 'Meta Tags',
    description: 'Common tags that go inside <head> to set character encoding, control mobile layout, help search engines, and improve how the page looks when shared on social media.',
    language: 'html',
    tags: ['meta', 'seo', 'head', 'og', 'viewport'],
    tier: 'core',
    level: 'fresher',
    code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Page description for SEO (150–160 chars)" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Page description" />
  <meta property="og:image" content="https://example.com/og.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Page Title" />

  <title>Page Title | Site Name</title>
  <link rel="canonical" href="https://example.com/page" />
</head>`,
  },
  {
    id: 'input-types',
    title: 'Input Types',
    description: 'Setting the right input type does three things automatically: triggers browser validation, shows the correct keyboard on mobile, and displays the appropriate UI control (like a date picker or color wheel).',
    language: 'html',
    tags: ['forms', 'input', 'validation', 'html5'],
    tier: 'core',
    level: 'fresher',
    code: `<input type="text"     placeholder="Name" />
<input type="email"    placeholder="you@example.com" />
<input type="password" placeholder="Password" />
<input type="number"   min="0" max="100" step="5" />
<input type="range"    min="0" max="100" value="50" />
<input type="date"     min="2024-01-01" />
<input type="color"    value="#ff0000" />
<input type="checkbox" id="agree" />
<input type="radio"    name="size" value="sm" />
<input type="file"     accept=".jpg,.png" multiple />
<input type="search"   />
<input type="tel"      pattern="[0-9]{10}" />
<input type="url"      placeholder="https://" />
<input type="hidden"   name="csrf" value="token123" />`,
  },
  {
    id: 'form-structure',
    title: 'Form Structure',
    description: 'How to structure a form so it works correctly for keyboard users and screen readers — using fieldset, legend, label, and ARIA attributes to link inputs with their labels and error messages.',
    language: 'html',
    tags: ['forms', 'accessibility', 'fieldset', 'label'],
    tier: 'core',
    level: 'fresher',
    code: `<form action="/submit" method="POST" novalidate>
  <fieldset>
    <legend>Personal Information</legend>

    <div>
      <label for="name">Full Name *</label>
      <input
        id="name"
        type="text"
        name="name"
        required
        autocomplete="name"
        aria-describedby="name-hint"
      />
      <span id="name-hint">Enter your legal full name</span>
    </div>

    <div>
      <label for="email">Email *</label>
      <input
        id="email"
        type="email"
        name="email"
        required
        autocomplete="email"
        aria-invalid="true"
        aria-errormessage="email-error"
      />
      <span id="email-error" role="alert">Invalid email format</span>
    </div>
  </fieldset>

  <button type="submit">Submit</button>
  <button type="reset">Clear</button>
</form>`,
  },
  {
    id: 'details-summary',
    title: 'details & summary',
    description: 'A built-in browser element for collapsible sections — clicking the summary toggles content open or closed with no JavaScript needed.',
    language: 'html',
    tags: ['details', 'summary', 'disclosure', 'html5'],
    tier: 'core',
    level: 'fresher',
    code: `<!-- Native accordion — no JS required -->
<details>
  <summary>What is the return policy?</summary>
  <p>Items can be returned within 30 days with a receipt.</p>
</details>

<!-- Open by default -->
<details open>
  <summary>Currently expanded</summary>
  <p>This section is open on page load.</p>
</details>

<!-- Styled with CSS -->
<details class="faq-item">
  <summary class="faq-question">
    How do I reset my password?
  </summary>
  <div class="faq-answer">
    <p>Click "Forgot password" on the login page...</p>
  </div>
</details>`,
  },
  {
    id: 'table-structure',
    title: 'Accessible Tables',
    description: 'Table markup that screen readers can understand — using caption for the table title, thead/tbody/tfoot to group rows, and scope to tell assistive technology which header belongs to which column or row.',
    language: 'html',
    tags: ['tables', 'accessibility', 'scope', 'caption'],
    tier: 'core',
    level: 'fresher',
    code: `<table>
  <caption>Q4 Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Units</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Widget A</th>
      <td>1,200</td>
      <td>$24,000</td>
    </tr>
    <tr>
      <th scope="row">Widget B</th>
      <td>850</td>
      <td>$17,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>2,050</td>
      <td>$41,000</td>
    </tr>
  </tfoot>
</table>`,
  },
  {
    id: 'figure-figcaption',
    title: 'figure & figcaption',
    description: 'Wraps an image, diagram, or code block together with its caption so browsers and screen readers know the two are related.',
    language: 'html',
    tags: ['figure', 'figcaption', 'images', 'semantic'],
    tier: 'core',
    level: 'fresher',
    code: `<!-- Image with caption -->
<figure>
  <img
    src="diagram.svg"
    alt="System architecture diagram showing three tiers"
    width="640"
    height="480"
  />
  <figcaption>
    Figure 1: Three-tier architecture overview.
  </figcaption>
</figure>

<!-- Code listing with caption -->
<figure>
  <figcaption>Listing 3: Fibonacci sequence</figcaption>
  <pre><code>function fib(n) { ... }</code></pre>
</figure>`,
  },
  {
    id: 'video-audio',
    title: 'video & audio',
    description: 'Built-in browser elements for embedding video and audio — with multiple format fallbacks so different browsers can play what they support, and track files for captions.',
    language: 'html',
    tags: ['video', 'audio', 'media', 'html5', 'accessibility'],
    tier: 'core',
    level: 'fresher',
    code: `<video
  controls
  width="640"
  height="360"
  poster="thumbnail.jpg"
  preload="metadata"
  aria-label="Product demo video"
>
  <source src="demo.webm" type="video/webm" />
  <source src="demo.mp4"  type="video/mp4" />
  <track
    kind="captions"
    src="captions-en.vtt"
    srclang="en"
    label="English"
    default
  />
  <p>Your browser doesn't support HTML video. <a href="demo.mp4">Download</a></p>
</video>

<audio controls preload="none">
  <source src="podcast.opus" type="audio/ogg; codecs=opus" />
  <source src="podcast.mp3"  type="audio/mpeg" />
</audio>`,
  },
  {
    id: 'data-attributes',
    title: 'Data Attributes',
    description: 'A way to attach custom data to any HTML element using data-* attributes — that data can then be read or changed by JavaScript without affecting how the element looks.',
    language: 'html',
    tags: ['data-attributes', 'javascript', 'dom'],
    tier: 'core',
    level: 'experienced',
    code: `<!-- HTML — any attribute starting with data- -->
<button
  data-action="delete"
  data-id="42"
  data-confirm="true"
>
  Delete
</button>

<ul id="list">
  <li data-id="1" data-category="fruit">Apple</li>
  <li data-id="2" data-category="veggie">Broccoli</li>
</ul>`,
  },
  {
    id: 'aria-roles',
    title: 'ARIA Roles & Attributes',
    description: 'Extra attributes that add or clarify meaning for screen readers — especially useful when native HTML elements alone cannot describe the current state or role of a custom UI widget.',
    language: 'html',
    tags: ['aria', 'accessibility', 'screen-reader', 'a11y'],
    tier: 'core',
    level: 'experienced',
    code: `<!-- Landmark roles (prefer native elements) -->
<div role="banner">...</div>     <!-- use <header> -->
<div role="navigation">...</div> <!-- use <nav> -->
<div role="main">...</div>       <!-- use <main> -->

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">
  Status updates announced to screen readers
</div>

<!-- Expanded state (accordion) -->
<button aria-expanded="false" aria-controls="panel-1">
  Toggle
</button>
<div id="panel-1" hidden>Panel content</div>

<!-- Labeling non-text elements -->
<button aria-label="Close dialog">✕</button>
<img src="chart.png" alt="Bar chart showing Q4 revenue by region" />

<!-- Required + invalid state -->
<input
  aria-required="true"
  aria-invalid="true"
  aria-describedby="error-msg"
/>
<span id="error-msg" role="alert">Required field</span>`,
  },
  {
    id: 'script-loading',
    title: 'Script Loading Strategies',
    description: 'defer and async let the browser download a script in the background while still parsing HTML — the difference is when each script actually runs and whether order is guaranteed.',
    language: 'html',
    tags: ['script', 'defer', 'async', 'performance'],
    tier: 'core',
    level: 'experienced',
    code: `<!-- Blocking — fetch & execute immediately, parsing pauses -->
<script src="app.js"></script>

<!-- async — fetch in parallel, execute as soon as downloaded (order not guaranteed) -->
<script async src="analytics.js"></script>

<!-- defer — fetch in parallel, execute AFTER parsing, in document order -->
<script defer src="app.js"></script>

<!-- type="module" — always deferred, supports import/export -->
<script type="module" src="app.mjs"></script>

<!-- Inline module -->
<script type="module">
  import { init } from './app.mjs';
  init();
</script>

<!-- Preload critical resources -->
<link rel="preload" href="critical.js" as="script" />
<link rel="prefetch" href="lazy-page.js" as="script" />`,
  },
  {
    id: 'picture-srcset',
    title: 'Responsive Images',
    description: 'Tools for serving the right image at the right size — srcset lets the browser pick the best resolution, while picture lets you swap to a completely different image on different screen sizes.',
    language: 'html',
    tags: ['images', 'responsive', 'performance', 'picture'],
    tier: 'core',
    level: 'experienced',
    code: `<!-- srcset + sizes — resolution switching -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="A scenic mountain view"
  loading="lazy"
  decoding="async"
/>

<!-- picture — art direction (different crops per breakpoint) -->
<picture>
  <source
    media="(max-width: 600px)"
    srcset="photo-portrait.webp"
    type="image/webp"
  />
  <source
    media="(max-width: 600px)"
    srcset="photo-portrait.jpg"
  />
  <img src="photo-landscape.jpg" alt="Photo" width="800" height="450" />
</picture>`,
  },
  {
    id: 'link-preload-prefetch',
    title: 'Resource Hints',
    description: 'Link tags that tell the browser to start fetching or connecting early — before it would normally discover the resource — so pages load faster.',
    language: 'html',
    tags: ['performance', 'preload', 'prefetch', 'resource-hints'],
    tier: 'advanced',
    level: 'experienced',
    code: `<head>
  <!-- preload — critical resource for THIS page, needed soon -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/hero.jpg" as="image" />

  <!-- preconnect — early connection to CDN or API origin -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://api.example.com" crossorigin />

  <!-- dns-prefetch — DNS lookup only (lighter than preconnect) -->
  <link rel="dns-prefetch" href="https://cdn.example.com" />

  <!-- prefetch — resource needed on NEXT navigation (low priority) -->
  <link rel="prefetch" href="/next-page.js" as="script" />

  <!-- modulepreload — preload ES module + its dependencies -->
  <link rel="modulepreload" href="/src/app.mjs" />
</head>`,
  },
  {
    id: 'dialog-element',
    title: 'dialog Element',
    description: 'A built-in browser element for popup dialogs — handles focus trapping (keeps keyboard focus inside the dialog), the dark backdrop overlay, and the Escape key to close, without any JavaScript library.',
    language: 'html',
    tags: ['dialog', 'modal', 'accessibility', 'html5'],
    tier: 'advanced',
    level: 'experienced',
    code: `<dialog id="confirm-dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Delete</h2>
  <p>This action cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm" autofocus>Delete</button>
  </form>
</dialog>

<button id="open-btn">Open Dialog</button>`,
  },
  {
    id: 'template-element',
    title: 'template Element',
    description: 'An HTML block that the browser parses and validates but does not display or run — you clone it with JavaScript and insert copies into the page when needed.',
    language: 'html',
    tags: ['template', 'web-components', 'dom', 'html5'],
    tier: 'advanced',
    level: 'expert',
    code: `<!-- Template is inert — not rendered, scripts don't run -->
<template id="card-template">
  <div class="card">
    <h3 class="card-title"></h3>
    <p class="card-body"></p>
  </div>
</template>`,
  },
];

export default htmlSyntax;
