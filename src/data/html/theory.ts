import type { ConceptCard } from '@/types/content';

const htmlTheory: ConceptCard[] = [
  {
    id: 'dom-tree',
    title: 'The DOM Tree',
    summary: 'The Document Object Model is a tree of nodes representing the HTML document, manipulated via JavaScript.',
    body: `The DOM (Document Object Model) is a programming interface that represents an HTML or XML document as a tree of node objects. The root is the document node, which contains the html element, which branches into head and body, and so on.

Node types include: Element nodes (HTML tags), Text nodes (text content), Attribute nodes (element attributes), Comment nodes, and the Document node itself. JavaScript interacts with the DOM through the document API — querySelector, createElement, appendChild, removeEventListener, etc.

The DOM is live — modifying it through JavaScript immediately affects what the browser renders. This is in contrast to the virtual DOM used by frameworks like React, which batch updates and apply them efficiently.`,
    diagram: {
      type: 'ascii',
      content: `document
└── html
    ├── head
    │   ├── title
    │   │   └── "My Page" (Text)
    │   └── link
    └── body
        ├── header
        │   └── nav
        └── main
            ├── article
            └── aside`,
    },
    tags: ['dom', 'tree', 'nodes', 'javascript'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'semantic-html',
    title: 'Semantic HTML & Accessibility',
    summary: 'Semantic elements convey meaning — improving SEO, maintainability, and assistive technology support.',
    body: `Semantic HTML uses elements that describe their content's role: <article> for self-contained content, <nav> for navigation, <header>/<footer> for page regions, <main> for primary content, <aside> for tangentially related content. Compare with <div> and <span>, which have no semantic meaning.

Benefits are concrete. Screen readers use landmark roles (derived from semantic elements) to let users navigate by region. Search engines weight heading content, mark <article> as primary content, and understand <time> dates. Code becomes self-documenting.

ARIA (Accessible Rich Internet Applications) roles, states, and properties augment semantics when HTML alone is insufficient — for example, custom dropdown menus or tabs built from divs. Rule: always prefer native HTML elements over ARIA equivalents, since native elements have built-in keyboard behavior.`,
    tags: ['semantic', 'accessibility', 'aria', 'seo'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'critical-rendering-path',
    title: 'Critical Rendering Path',
    summary: 'The sequence of steps browsers take to convert HTML, CSS, and JS into pixels on screen.',
    body: `The critical rendering path has five steps: (1) Parse HTML → construct the DOM tree. (2) Parse CSS → construct the CSSOM tree. (3) Combine DOM + CSSOM → Render tree (only visible nodes). (4) Layout (Reflow) — calculate position and size of each node. (5) Paint — fill in pixels, then composite layers.

CSS blocks rendering — the browser won't paint until all stylesheets are downloaded and parsed (CSSOM must be complete). JavaScript blocks HTML parsing by default — the parser stops until the script finishes executing. This is why render-blocking resources appear above the fold issue.

Optimizations: defer/async for non-critical scripts, inline critical CSS, preload key fonts and images, reduce paint complexity, minimize layout thrashing (reading then writing layout properties in a loop forces multiple reflows).`,
    diagram: {
      type: 'ascii',
      content: `HTML bytes → Parse → DOM
CSS bytes  → Parse → CSSOM  ──> Render Tree → Layout → Paint
JS bytes   → Parse → Execute (may mutate DOM/CSSOM)`,
    },
    tags: ['rendering', 'performance', 'dom', 'cssom', 'layout'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'head-vs-body',
    title: 'Head vs Body Placement',
    summary: 'Where you put elements and resources in HTML affects parse order, rendering, and performance.',
    body: `The <head> element contains metadata not displayed directly: <title>, <meta>, <link> (stylesheets, preloads), and sometimes <script>. The <body> contains all visible content and most scripts.

Scripts in <head> without defer/async block HTML parsing — the browser downloads and executes the script before continuing. Historically, scripts were placed just before </body> to avoid this. Modern best practice: place scripts in <head> with defer (execute after parsing, in order) or async (execute as soon as downloaded, no order guarantee).

Critical CSS (above-the-fold styles) can be inlined in <head> in a <style> tag to avoid a render-blocking network request. Non-critical CSS can be loaded asynchronously using the media="print" trick or a JavaScript preload.`,
    tags: ['head', 'body', 'scripts', 'performance', 'rendering'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'html-form-validation',
    title: 'HTML Form Validation',
    summary: 'Built-in browser validation using HTML attributes — before any JavaScript is needed.',
    body: `HTML provides constraint validation via attributes: required (non-empty), type (email, url, number), min/max (range), minlength/maxlength (string length), pattern (regex), and step (numeric intervals). When a form is submitted without novalidate, the browser checks all constraints and shows native error messages.

The Constraint Validation API exposes these checks programmatically: element.validity returns a ValidityState object with boolean properties (valueMissing, typeMismatch, patternMismatch, etc.). element.setCustomValidity('message') sets a custom error; setCustomValidity('') clears it.

Use novalidate on the <form> to disable native UI while keeping the API, then build your own accessible error presentation using aria-invalid, aria-describedby, and role="alert".`,
    tags: ['forms', 'validation', 'constraint-validation', 'accessibility'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'block-vs-inline',
    title: 'Block vs Inline Elements',
    summary: 'Block elements start on a new line and take full width; inline elements flow within text.',
    body: `Block-level elements (div, p, h1-h6, ul, ol, section, article, etc.) start on a new line and, by default, stretch to fill their container's full width. They can contain block and inline elements.

Inline elements (span, a, strong, em, code, img, button, etc.) flow within surrounding text without breaking onto a new line. They only take up as much width as their content. You can't set explicit width/height on pure inline elements (use inline-block or flex/grid).

CSS display property overrides the default: display: block, inline, inline-block, flex, grid, none. HTML5 introduced a more nuanced "content model" (flow, phrasing, sectioning content) but the block/inline mental model remains useful for layout reasoning.`,
    diagram: {
      type: 'ascii',
      content: `Block elements:
┌─────────────────────────────────┐
│ <div>  full width               │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ <p>    full width               │
└─────────────────────────────────┘

Inline elements:
Text <strong>bold</strong> more <a>link</a> text`,
    },
    tags: ['block', 'inline', 'display', 'layout'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'seo-fundamentals',
    title: 'SEO Fundamentals in HTML',
    summary: 'Key HTML patterns that directly influence search engine indexing and ranking.',
    body: `Search engines parse HTML to understand content structure, relevance, and relationships. Key factors:

Title tag: The most important on-page SEO element — appears in SERP snippets. Keep under 60 characters, include the primary keyword.

Meta description: Not a ranking factor but affects click-through rate. 150-160 characters summarizing the page.

Heading hierarchy: One h1 per page (the main topic). Use h2-h6 for substructure. Headings signal content organization to crawlers.

Semantic markup: <article>, <main>, and structured data (JSON-LD schema.org) help crawlers understand content type.

Canonical tag: <link rel="canonical"> prevents duplicate content penalties by declaring the authoritative URL.

Core Web Vitals: Google uses LCP, FID/INP, and CLS as ranking signals — HTML structure directly affects all three.`,
    tags: ['seo', 'meta', 'headings', 'canonical', 'core-web-vitals'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'web-accessibility-wcag',
    title: 'Web Accessibility (WCAG)',
    summary: 'WCAG defines four principles (POUR) for accessible web content: Perceivable, Operable, Understandable, Robust.',
    body: `The Web Content Accessibility Guidelines (WCAG) are organized around four principles:

Perceivable: Information must be presentable in ways users can perceive. All non-text content needs text alternatives (alt text for images, captions for video). Sufficient color contrast (4.5:1 for normal text at AA level).

Operable: All functionality must be keyboard-accessible. No content should cause seizures (no flashing >3 times/second). Provide enough time to complete tasks.

Understandable: Text should be readable and predictable. Forms should have labels and clear error messages. Language of page must be declared.

Robust: Content must be compatible with current and future assistive technologies. Valid HTML, proper ARIA usage, and event-based (not mouse-only) interaction ensure robustness.

WCAG 2.1 AA is the most commonly required conformance level in accessibility laws (ADA, Section 508, EN 301 549).`,
    tags: ['wcag', 'accessibility', 'a11y', 'aria', 'keyboard'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'critical-rendering-path',
    title: 'Critical Rendering Path',
    summary: 'The browser\'s pipeline from bytes to pixels — understanding it is key to optimizing page load performance.',
    body: `The critical rendering path is the sequence of steps the browser takes to render a page for the first time.

1. Parse HTML → DOM tree (Document Object Model).
2. Parse CSS → CSSOM tree (CSS Object Model). This blocks rendering — the browser won't paint until it has a complete CSSOM.
3. Combine DOM + CSSOM → Render tree (only visible elements, with computed styles).
4. Layout (Reflow): calculate exact position and size of every render tree node.
5. Paint: fill in pixels for each node (text, colors, images, borders, shadows).
6. Composite: layer manager composites painted layers in correct order.

Blocking resources: CSS in <head> blocks rendering. Scripts block both HTML parsing AND rendering by default (unless async or defer). Inline CSS and JS have no network round-trip but still block.

Optimization targets: reduce critical resources (inline critical CSS), reduce critical bytes (minify, compress), shorten the critical path (preload key resources, eliminate render-blocking JS).`,
    diagram: {
      type: 'ascii',
      content: `HTML bytes
    ↓ parse
  DOM tree
    ↓         CSS bytes
    ↓              ↓ parse
    ↓          CSSOM tree ← blocks rendering until complete
    └──────────────┘
    Render tree (DOM + CSSOM, visible only)
    ↓
  Layout  ← calculate positions/sizes
    ↓
  Paint   ← draw pixels
    ↓
  Composite ← assemble layers`,
    },
    tags: ['critical-rendering-path', 'performance', 'dom', 'cssom', 'render-blocking'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'progressive-enhancement',
    title: 'Progressive Enhancement vs Graceful Degradation',
    summary: 'Two strategies for handling browser capability differences — one builds up from a baseline, the other builds down from a target.',
    body: `Progressive enhancement starts with the most basic, universally supported implementation and layers enhancements on top for more capable environments. The baseline (semantic HTML) works everywhere. JavaScript behavior is an enhancement. Advanced CSS is an enhancement.

Benefits: works without JS (SEO, slower networks, JS errors), inherently accessible, robust against browser inconsistencies.

Graceful degradation takes the opposite approach: build the full experience first, then add fallbacks for less capable environments. Historically used when new browser APIs were being adopted widely.

In practice: use semantic HTML as the foundation, ensure core content and actions work without CSS, use feature detection (CSS @supports, JavaScript feature checks) rather than browser detection, and add JavaScript as an enhancement.

Modern example: a form submits via HTML action/method by default (works without JS). JavaScript enhances it with async submission and better error UX.`,
    diagram: {
      type: 'ascii',
      content: `Progressive Enhancement:     Graceful Degradation:
────────────────────────     ───────────────────────
Start: semantic HTML         Start: full JS app
+ CSS layout & styling       + fallback for no CSS
+ CSS animations             + basic HTML fallback
+ JavaScript enhancements    + nothing for no JS

Feature detection (correct approach):
if ('IntersectionObserver' in window) {
  // use intersection observer
} else {
  // simpler scroll listener fallback
}`,
    },
    tags: ['progressive-enhancement', 'graceful-degradation', 'html', 'accessibility', 'seo'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'browser-storage-options',
    title: 'Browser Storage: Cookies, localStorage, sessionStorage, IndexedDB',
    summary: 'Four storage mechanisms with different capacities, lifetimes, scope, and server accessibility.',
    body: `Cookies: sent with every HTTP request (including to the server). 4KB limit. Configurable expiry, path, domain, Secure (HTTPS only), HttpOnly (JS can't read — prevents XSS theft), SameSite (prevents CSRF). Use for: session tokens (HttpOnly, Secure), user preferences shared with the server.

localStorage: persistent across sessions (survives browser close). ~5MB. Synchronous API — blocks the main thread for large reads. Origin-scoped (protocol + domain + port). Use for: user preferences, persisted UI state.

sessionStorage: same API as localStorage but cleared when the tab closes. Session-scoped — not shared between tabs. Use for: multi-step wizard state, temporary draft data.

IndexedDB: async, transactional, large storage (100MB+). Supports indexes, complex queries, structured data. Use for: offline data, large datasets, file storage. The foundation for libraries like Dexie.js and PouchDB.

Cache API (Service Worker): stores Request/Response pairs. Use for: offline assets, network responses.`,
    diagram: {
      type: 'ascii',
      content: `            Cookies     localStorage  sessionStorage  IndexedDB
────────────────────────────────────────────────────────────────
Capacity    ~4KB        ~5MB          ~5MB            100MB+
Lifetime    Expiry set  Permanent     Tab session     Permanent
Sent to srv Yes         No            No              No
JS access   (if !HttpOnly) Yes        Yes             Yes (async)
Scope       Domain      Origin        Tab+Origin      Origin
API         document.cookie  setItem  setItem         IDBTransaction`,
    },
    tags: ['storage', 'cookies', 'localstorage', 'sessionstorage', 'indexeddb', 'security'],
    tier: 'core',
    level: 'experienced',
  },
];

export default htmlTheory;
