import type { QnaItem } from '@/types/content';

const htmlQna: QnaItem[] = [
  {
    id: 'semantic-vs-div',
    question: 'Why use semantic HTML elements instead of divs?',
    answer: `Semantic elements communicate purpose to browsers, search engines, and assistive technologies. A <nav> tells a screen reader "this is navigation" — letting users jump to it directly. A <main> tells search engines where the primary content is. Divs are meaningless containers — they force developers to add ARIA roles and labels to recreate what semantic elements provide for free. Semantic markup also improves code readability and maintainability.`,
    codeExample: `<!-- Bad — no meaning -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Good — self-documenting, accessible, SEO-friendly -->
<header>
  <nav aria-label="Main navigation">...</nav>
</header>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['semantic', 'accessibility', 'seo', 'divs'],
    tier: 'core',
  },
  {
    id: 'defer-vs-async',
    question: 'What is the difference between defer and async script attributes?',
    answer: `Both defer and async download the script in parallel with HTML parsing (non-blocking download). The difference is execution: async scripts execute immediately when downloaded — pausing HTML parsing at that point, in no guaranteed order. defer scripts execute after HTML parsing is complete, in document order. Use defer for scripts that depend on the DOM or on other scripts. Use async for fully independent scripts (analytics, ads) where order doesn't matter.`,
    codeExample: `<!-- async: downloaded parallel, executed immediately on ready (any order) -->
<script async src="analytics.js"></script>

<!-- defer: downloaded parallel, executed AFTER parsing, IN ORDER -->
<script defer src="vendor.js"></script>
<script defer src="app.js"></script>  <!-- guaranteed to run after vendor.js -->

<!-- type="module" is always deferred -->
<script type="module" src="app.mjs"></script>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['scripts', 'defer', 'async', 'performance'],
    tier: 'core',
  },
  {
    id: 'html-form-validation',
    question: 'How does native HTML form validation work?',
    answer: `HTML's Constraint Validation API validates inputs before submission using attributes: required (non-empty), type (format check for email/url/number), min/max (range), minlength/maxlength (length), pattern (regex). The browser shows native error messages and prevents submission. The element.validity object exposes each constraint check (valueMissing, typeMismatch, etc.). Add novalidate to the form to disable native UI while keeping the API for custom validation logic.`,
    codeExample: `<form id="signup" novalidate>
  <input id="email" type="email" required />
  <button type="submit">Sign Up</button>
</form>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['forms', 'validation', 'constraint-validation'],
    tier: 'core',
  },
  {
    id: 'data-attributes-js',
    question: 'How do you read and write data attributes in JavaScript?',
    answer: `Data attributes (data-*) store custom data on HTML elements. Access them via element.dataset in JavaScript, which maps kebab-case names to camelCase properties. You can also use getAttribute/setAttribute. They're ideal for passing server-side data to JavaScript, event delegation patterns, and CSS state hooks via attribute selectors.`,
    codeExample: `<!-- HTML -->
<button data-user-id="42" data-action="delete">Delete</button>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['data-attributes', 'javascript', 'dataset'],
    tier: 'core',
  },
  {
    id: 'iframe-security',
    question: 'How do you securely embed third-party content with iframes?',
    answer: `The sandbox attribute is the primary security tool. Without it, an iframe can run scripts, access the parent's cookies, and navigate the top frame. sandbox="" disables everything; add back only what you need. allow-scripts enables JS, allow-same-origin lets the iframe treat itself as same-origin (never combine these two — it defeats sandboxing). Also use X-Frame-Options or Content-Security-Policy frame-ancestors on your own pages to prevent clickjacking.`,
    codeExample: `<!-- Safest: no sandbox flags -->
<iframe
  src="https://example.com/widget"
  sandbox=""
  title="External widget"
></iframe>

<!-- Allow JS and form submission but not same-origin access -->
<iframe
  src="https://player.example.com"
  sandbox="allow-scripts allow-forms"
  allow="autoplay; fullscreen"
  referrerpolicy="no-referrer"
></iframe>`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['iframe', 'security', 'sandbox', 'csp'],
    tier: 'advanced',
  },
  {
    id: 'meta-viewport',
    question: 'What does the viewport meta tag do and what are common values?',
    answer: `Without the viewport meta tag, mobile browsers render pages at a desktop-like width (~980px) then scale down, making text tiny. The viewport tag tells the browser to use the device's actual width. width=device-width matches the physical screen width. initial-scale=1.0 sets no zoom on load. Avoid user-scalable=no — it harms accessibility by preventing users from zooming.`,
    codeExample: `<!-- Standard responsive viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- With max-scale limit (avoid — harms accessibility) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

<!-- viewport-fit=cover — for notched devices (iPhone X+) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['viewport', 'responsive', 'mobile', 'meta'],
    tier: 'core',
  },
  {
    id: 'aria-when-to-use',
    question: 'When should you use ARIA roles and attributes?',
    answer: `Follow the "first rule of ARIA": don't use ARIA if a native HTML element with the right semantics exists. <button> is better than <div role="button"> because it has built-in keyboard handling, focus, and event behavior. Use ARIA when: building custom widgets (tabs, comboboxes, sliders) that have no native equivalent; dynamically updating content (aria-live regions); conveying state (aria-expanded, aria-checked, aria-invalid); labeling elements without visible text (aria-label, aria-labelledby).`,
    codeExample: `<!-- Bad: ARIA re-implementing what button gives for free -->
<div role="button" tabindex="0" onclick="..." onkeydown="...">Click</div>

<!-- Good: native button -->
<button onclick="...">Click</button>

<!-- Good ARIA use: custom tabs widget -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
</div>
<div id="panel-1" role="tabpanel" tabindex="0">Content</div>`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['aria', 'accessibility', 'a11y', 'semantic'],
    tier: 'core',
  },
  {
    id: 'figure-vs-img',
    question: 'When should you use figure vs a plain img element?',
    answer: `Use a plain <img> for decorative or simple inline images. Use <figure> when the image needs a visible caption (<figcaption>) or when it's a self-contained unit that could be referenced from the main content — charts, diagrams, code listings, photos with attribution. The <figure> element tells the browser (and assistive tech) that the caption is associated with the content, unlike a paragraph following an image. If removed from the document, a figure's meaning should remain complete.`,
    codeExample: `<!-- Plain img — decorative icon or inline image -->
<img src="arrow.svg" alt="Next" />

<!-- figure — image with meaningful caption -->
<figure>
  <img src="chart.png" alt="Bar chart showing revenue growth from 2020-2024" />
  <figcaption>Figure 2: Revenue growth over 4 years.</figcaption>
</figure>

<!-- figure for code listing -->
<figure>
  <figcaption>Example: sorted array</figcaption>
  <pre><code>[1, 2, 3, 4, 5]</code></pre>
</figure>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['figure', 'img', 'figcaption', 'semantic'],
    tier: 'core',
  },
  {
    id: 'accessible-forms-checklist',
    question: 'What makes an HTML form accessible?',
    answer: `Key requirements: (1) Every input has an associated <label> (via for/id or wrapping). (2) Related inputs are grouped in <fieldset> with <legend>. (3) Required fields marked with required attribute AND a visible indicator. (4) Error messages linked to their input via aria-describedby; error state via aria-invalid="true". (5) Error messages in a role="alert" region. (6) Focus visible on all interactive elements. (7) Logical tab order — don't use tabindex > 0. (8) Button types explicit (type="submit" or type="button").`,
    codeExample: `<fieldset>
  <legend>Contact Info</legend>

  <label for="email">Email <span aria-hidden="true">*</span></label>
  <input
    id="email"
    type="email"
    name="email"
    required
    aria-required="true"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <span id="email-error" role="alert">
    Enter a valid email address.
  </span>
</fieldset>`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['forms', 'accessibility', 'aria', 'labels'],
    tier: 'core',
  },
  {
    id: 'alt-text-guidelines',
    question: 'How do you write good alt text for images?',
    answer: `Alt text should convey the information or function of the image, not describe it literally. For informational images: describe what the image communicates, not just what it depicts. For functional images (icons, buttons): describe the action ("Search", "Close menu"). For decorative images: use an empty alt="" to tell screen readers to skip it entirely — never omit alt. For complex images (charts, graphs): provide a short alt and a longer description in text near the image or via aria-describedby.`,
    codeExample: `<!-- Informational — what it communicates -->
<img src="chart.png" alt="Revenue increased 40% from Q1 to Q4 2024" />

<!-- Functional — what it does -->
<button><img src="search.svg" alt="Search" /></button>

<!-- Decorative — skip it -->
<img src="divider.png" alt="" role="presentation" />

<!-- Complex — reference longer description -->
<img src="map.png" alt="Site map" aria-describedby="map-desc" />
<p id="map-desc">The map shows three sections: Login, Dashboard, and Settings...</p>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['alt-text', 'images', 'accessibility', 'screen-reader'],
    tier: 'core',
  },
  {
    id: 'heading-hierarchy',
    question: 'Why does heading hierarchy matter and how should it be structured?',
    answer: `Headings (h1-h6) create an outline of the page used by screen reader users to navigate and understand structure. Skipping heading levels (h1 → h3) breaks this outline and confuses AT users. Search engines also weight heading text for topic relevance. Best practice: one h1 per page (the main topic/title); use h2 for major sections, h3 for subsections of h2s, and so on. Never choose heading level based on visual size — use CSS for that.`,
    codeExample: `<!-- Good hierarchy -->
<h1>JavaScript Interview Guide</h1>
  <h2>Core Concepts</h2>
    <h3>Closures</h3>
    <h3>Prototypes</h3>
  <h2>Advanced Topics</h2>
    <h3>Generators</h3>

<!-- Bad — visual sizing shouldn't drive heading level -->
<h1>Main Title</h1>
<h3>Subtitle</h3>  <!-- skipped h2! -->`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['headings', 'seo', 'accessibility', 'outline'],
    tier: 'core',
  },
  {
    id: 'preload-prefetch-difference',
    question: 'What is the difference between preload, prefetch, and preconnect?',
    answer: `preload declares a resource the current page will need soon (high priority, must specify as). prefetch hints a resource that will be needed on the next navigation (low priority, fetched in browser idle time). preconnect establishes the TCP/TLS connection to an origin early, saving ~300ms on the first request, without fetching any resource. Use preload for critical fonts, hero images, or scripts needed immediately. Use prefetch for routes users are likely to navigate to. Use preconnect for APIs or CDNs your page will call.`,
    codeExample: `<!-- preload: this page needs these ASAP -->
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/hero-image.webp" as="image" />

<!-- preconnect: warm up connections for critical origins -->
<link rel="preconnect" href="https://api.example.com" />

<!-- prefetch: user might navigate here next -->
<link rel="prefetch" href="/about" as="document" />`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['performance', 'preload', 'prefetch', 'preconnect'],
    tier: 'advanced',
  },
  {
    id: 'html-dialog-native',
    question: 'What are the advantages of the native dialog element?',
    answer: `The native <dialog> provides: built-in focus trapping (Tab cycles within the dialog), focus restoration (returns focus to the trigger element on close), ::backdrop pseudo-element for overlay styling, the close event for cleanup, and the Escape key to close modals. method="dialog" on a form inside the dialog closes it and sets returnValue to the submit button's value. Previously, all of this required JavaScript libraries. Use dialog.showModal() for modal behavior and dialog.show() for non-modal.`,
    codeExample: `<dialog id="modal">
  <h2>Confirm Delete</h2>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['dialog', 'modal', 'accessibility', 'html5'],
    tier: 'advanced',
  },
  {
    id: 'picture-art-direction',
    question: 'When do you use picture vs srcset for responsive images?',
    answer: `Use srcset (alone or with sizes) for resolution switching — same image, different sizes, let the browser pick the best one based on device density and viewport size. Use <picture> for art direction — when you need genuinely different images at different breakpoints (different crop, different composition, or different format). The <picture> element gives you control; srcset+sizes lets the browser decide. For format switching (WebP with JPEG fallback), <picture> with <source type="..."> is the right tool.`,
    codeExample: `<!-- Resolution switching: browser chooses size -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Team photo"
/>

<!-- Art direction: developer controls which image -->
<picture>
  <source media="(max-width: 600px)" srcset="portrait.jpg" />
  <source media="(min-width: 601px)" srcset="landscape.jpg" />
  <img src="landscape.jpg" alt="Team photo" />
</picture>`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['images', 'responsive', 'picture', 'srcset', 'performance'],
    tier: 'advanced',
  },
  {
    id: 'link-vs-button',
    question: 'When should you use a link (a) vs a button element?',
    answer: `Use <a href="..."> for navigation — anything that changes the URL or opens another page/resource. Use <button type="button"> for actions — submitting forms, toggling UI, triggering JavaScript. The distinction matters for accessibility: screen readers announce links as "link" (expected to navigate) and buttons as "button" (expected to act). Keyboard behavior differs: links activate with Enter, buttons with Enter and Space. Never use <a> without href for a clickable action, and never use <div> for either.`,
    codeExample: `<!-- Link: navigates to a URL -->
<a href="/about">About Us</a>
<a href="https://docs.example.com">Documentation</a>

<!-- Button: performs an action -->
<button type="button" onclick="openModal()">Open Modal</button>
<button type="submit">Submit Form</button>

<!-- Bad: meaningless link for action -->
<a href="#" onclick="openModal()">Open Modal</a>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['link', 'button', 'accessibility', 'semantic'],
    tier: 'core',
  },
  // ─── Fresher additions ───────────────────────────────────────────────────
  {
    id: 'html5-document-structure',
    question: 'What is the purpose of each section in an HTML5 document boilerplate?',
    answer: `<!DOCTYPE html> tells the browser to use standards mode — without it, browsers enter "quirks mode" which emulates old broken behavior.

<html lang="en"> sets the document language — used by screen readers and translation tools.

<meta charset="UTF-8"> ensures the browser interprets the file as UTF-8 (supports all Unicode characters including emoji). Must be the first meta tag.

<meta name="viewport"> is critical for responsive design — without it, mobile browsers render at ~980px and scale down.

<title> is shown in browser tabs and bookmarks, and is the primary signal search engines use for the page title.

<link rel="stylesheet"> in <head> blocks rendering until the CSS is loaded — this is correct behavior, it prevents Flash of Unstyled Content (FOUC).`,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A concise page description (150-160 chars) for search engines." />
  <title>Page Title — Site Name</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/styles/main.css" />
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>...</header>
  <main id="main-content">...</main>
  <footer>...</footer>
</body>
</html>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['doctype', 'head', 'meta', 'document-structure', 'boilerplate'],
    tier: 'core',
  },
  {
    id: 'table-semantics-accessibility',
    question: 'How do you make HTML tables semantically correct and accessible?',
    answer: `Tables should only be used for tabular data, never for layout. Key semantic elements:

<caption> gives the table a title (appears above it by default). It's the first and most important accessibility element.

<thead>, <tbody>, <tfoot> group rows — browsers and AT use this to repeat headers when printing or in large tables.

<th scope="col|row"> identifies header cells. scope tells screen readers which direction this header applies.

For complex tables with merged cells, use headers + id to explicitly associate data cells with their headers.

Never use empty <th> elements as spacers — use CSS gap or padding instead.`,
    codeExample: `<table>
  <caption>Q3 2024 Sales by Region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>$1.2M</td>
      <td>+12%</td>
    </tr>
    <tr>
      <th scope="row">Europe</th>
      <td>$0.8M</td>
      <td>+7%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$2.0M</td>
      <td>+10%</td>
    </tr>
  </tfoot>
</table>`,
    codeLanguage: 'html',
    difficulty: 'fresher',
    tags: ['tables', 'semantic', 'accessibility', 'caption', 'thead'],
    tier: 'core',
  },
  // ─── Experienced additions ────────────────────────────────────────────────
  {
    id: 'og-meta-tags-seo',
    question: 'What are Open Graph and Twitter Card meta tags and why do they matter?',
    answer: `Open Graph (OG) tags control how your page appears when shared on social media — Facebook, LinkedIn, Slack, iMessage previews. Without them, platforms guess at a title, description, and image, often producing poor results.

og:title, og:description, og:image, og:url are the minimum for good previews. og:image should be at least 1200×630px for best quality across platforms.

Twitter/X Cards use twitter:card, twitter:title, twitter:description, twitter:image. twitter:card="summary_large_image" shows a large image preview.

These tags don't affect Google search ranking directly, but a compelling OG image significantly increases click-through rate from social shares, which indirectly improves engagement signals.`,
    codeExample: `<head>
  <!-- Primary meta -->
  <title>JavaScript Interview Guide 2024</title>
  <meta name="description" content="150+ questions covering fresher to senior engineer level." />

  <!-- Open Graph — social sharing -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="https://example.com/javascript" />
  <meta property="og:title"       content="JavaScript Interview Guide 2024" />
  <meta property="og:description" content="150+ questions covering fresher to senior engineer level." />
  <meta property="og:image"       content="https://example.com/og/javascript.png" />
  <meta property="og:image:width"  content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:site"        content="@yourhandle" />
  <meta name="twitter:title"       content="JavaScript Interview Guide 2024" />
  <meta name="twitter:description" content="150+ questions covering fresher to senior engineer level." />
  <meta name="twitter:image"       content="https://example.com/og/javascript.png" />
</head>`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['open-graph', 'twitter-cards', 'seo', 'social-sharing', 'meta'],
    tier: 'advanced',
  },
  {
    id: 'web-components-overview',
    question: 'What are Web Components and what are their three core technologies?',
    answer: `Web Components are a set of native browser APIs for creating reusable, encapsulated custom elements that work in any framework or no framework.

Custom Elements: register a new HTML tag backed by a class extending HTMLElement. Define lifecycle callbacks: connectedCallback (mounted), disconnectedCallback (unmounted), attributeChangedCallback (attribute updated).

Shadow DOM: an encapsulated DOM tree attached to a custom element. Styles inside don't leak out; outside styles don't leak in (unless using CSS custom properties, ::part, or :slotted). Use attachShadow({ mode: 'open' }).

HTML Templates (<template>): inert HTML that isn't rendered but can be cloned and inserted. Combined with <slot> elements for content projection.

Trade-off: excellent for leaf-level UI components (buttons, inputs, date pickers) shared across frameworks. Less suited for complex app-level logic where React/Vue/Angular shine.`,
    codeExample: `// Custom element definition
class UserCard extends HTMLElement {
  static observedAttributes = ['name', 'role'];

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback() { this.render(); }

  render() {
    this.shadowRoot!.innerHTML = \`
      <style>
        :host { display: block; border: 1px solid #ccc; border-radius: 8px; padding: 1rem; }
        .name { font-weight: bold; }
      </style>
      <div class="name">\${this.getAttribute('name')}</div>
      <div class="role">\${this.getAttribute('role') ?? 'Member'}</div>
      <slot></slot>
    \`;
  }
}

customElements.define('user-card', UserCard);`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['web-components', 'custom-elements', 'shadow-dom', 'templates'],
    tier: 'advanced',
  },
  // ─── Expert additions ─────────────────────────────────────────────────────
  {
    id: 'service-workers-basics',
    question: 'What are Service Workers and how do they enable offline experiences?',
    answer: `A Service Worker is a JavaScript file that runs in a background thread, separate from the page. It acts as a programmable network proxy — intercepting fetch requests and deciding whether to serve from cache, network, or generate a response.

Lifecycle: register → install (cache assets) → activate (clean old caches) → fetch (intercept requests).

Strategies: Cache-first (offline priority — return cache, update in background), Network-first (always try network, fall back to cache), Stale-While-Revalidate (return cache immediately, update cache from network).

Service Workers require HTTPS (except localhost), don't have DOM access, and don't block the page — all communication is via postMessage. They're the foundation of PWAs.`,
    codeExample: `// service-worker.ts
const CACHE_NAME = 'app-v1';
const PRECACHE_URLS = ['/', '/styles/main.css', '/scripts/app.js'];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Stale-while-revalidate strategy
self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fresh = fetch(event.request).then(res => {
        caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
        return res;
      });
      return cached ?? fresh; // return cache instantly, update in background
    })
  );
});`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['service-workers', 'pwa', 'offline', 'caching', 'fetch'],
    tier: 'advanced',
  },
  {
    id: 'html-security-headers',
    question: 'What are the key security headers for web applications and what do they prevent?',
    answer: `Content-Security-Policy (CSP): whitelist trusted sources for scripts, styles, images, fonts. Prevents XSS by blocking inline scripts and restricting script sources. The strongest protection against XSS.

X-Frame-Options / frame-ancestors: prevent your page from being embedded in an iframe on another site — blocks clickjacking attacks.

X-Content-Type-Options: nosniff — prevents browsers from MIME-sniffing a response away from the declared Content-Type, blocking content sniffing attacks.

Strict-Transport-Security (HSTS): forces all connections to use HTTPS for a specified duration. Prevents SSL stripping attacks.

Permissions-Policy: control which browser features (camera, geolocation, microphone) can be used on your page and in embedded iframes.

Referrer-Policy: control how much referrer information is sent with requests — prevents leaking sensitive URL parameters to third-party sites.`,
    codeExample: `# Nginx config — key security headers
add_header Content-Security-Policy
  "default-src 'self';
   script-src 'self' 'nonce-{NONCE}';
   style-src 'self' 'unsafe-inline';
   img-src 'self' data: https:;
   frame-ancestors 'none';"
  always;

add_header X-Content-Type-Options    "nosniff"          always;
add_header X-Frame-Options           "DENY"             always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
add_header Permissions-Policy        "camera=(), microphone=(), geolocation=()" always;`,
    codeLanguage: 'bash',
    difficulty: 'expert',
    tags: ['security', 'csp', 'hsts', 'x-frame-options', 'headers'],
    tier: 'advanced',
  },
  // ─── Architect additions ──────────────────────────────────────────────────
  {
    id: 'core-web-vitals-html',
    question: 'What are Core Web Vitals and how does HTML structure affect them?',
    answer: `Core Web Vitals are Google's user-experience metrics that directly affect search ranking.

LCP (Largest Contentful Paint): time to render the largest visible content element. Improve by: preloading the LCP image with <link rel="preload">, giving it fetchpriority="high", avoiding lazy loading on it, using next-gen formats (WebP/AVIF).

CLS (Cumulative Layout Shift): unexpected layout shifts. Prevent by: always setting width and height on <img> and <video> elements (browser reserves space), avoiding inserting content above existing content, using CSS aspect-ratio.

INP (Interaction to Next Paint, replaced FID): measures how quickly the page responds to user input. Improve by: reducing long tasks, deferring non-critical JS, using web workers.`,
    codeExample: `<!-- LCP: hero image — preload, high priority, exact dimensions -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />

<img
  src="/hero.webp"
  alt="Product hero"
  width="1200"
  height="630"
  fetchpriority="high"
  decoding="async"
/>

<!-- CLS prevention: always declare dimensions -->
<img src="/product.jpg" alt="Product" width="400" height="300" />
<!-- Or use CSS aspect-ratio -->
<style>
  .product-img { width: 100%; aspect-ratio: 4/3; }
</style>

<!-- INP: defer non-critical scripts -->
<script defer src="/analytics.js"></script>
<script type="module" src="/app.js"></script>`,
    codeLanguage: 'html',
    difficulty: 'expert',
    tags: ['core-web-vitals', 'lcp', 'cls', 'inp', 'performance', 'seo'],
    tier: 'advanced',
  },
  {
    id: 'structured-data-schema',
    question: 'What is structured data (JSON-LD) and why is it important for SEO?',
    answer: `Structured data uses schema.org vocabulary to describe your content in a machine-readable format. Google uses it to display rich results in search — product ratings, recipe steps, FAQ accordions, breadcrumbs, event details.

JSON-LD (JavaScript Object Notation for Linked Data) is Google's preferred format — it goes in a <script type="application/ld+json"> tag in <head> or <body>. Unlike Microdata or RDFa, JSON-LD doesn't require HTML modifications, making it easy to inject from a CMS or server.

Rich results don't guarantee better rankings directly, but they significantly increase CTR (click-through rate) by making your listing more prominent, which feeds positive engagement signals back to Google.`,
    codeExample: `<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "JavaScript Interview Guide 2024",
    "description": "150+ questions from fresher to senior engineer.",
    "author": {
      "@type": "Person",
      "name": "Your Name"
    },
    "datePublished": "2024-01-15",
    "dateModified": "2024-05-01",
    "image": "https://example.com/og/javascript.png"
  }
  </script>

  <!-- FAQ rich result -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What is a closure in JavaScript?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A closure is a function that retains access to its lexical scope..."
      }
    }]
  }
  </script>
</head>`,
    codeLanguage: 'html',
    difficulty: 'expert',
    tags: ['structured-data', 'json-ld', 'schema-org', 'seo', 'rich-results'],
    tier: 'advanced',
  },
];

export default htmlQna;
