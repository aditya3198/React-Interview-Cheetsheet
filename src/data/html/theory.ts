import type { ConceptCard } from '@/types/content';

const htmlTheory: ConceptCard[] = [
  {
    id: 'dom-tree',
    title: 'The DOM Tree',
    summary: 'The DOM (Document Object Model) is a tree structure the browser builds from your HTML. JavaScript uses this tree to read and change the page.',
    body: `When the browser reads your HTML file, it builds an internal tree of objects called the DOM (Document Object Model). Every HTML tag becomes a node in that tree. The root of the tree is the document node, which contains the html element, which branches into head and body, and so on.

There are several types of nodes. Element nodes represent HTML tags. Text nodes hold the text content inside elements. Attribute nodes represent things like class or id. The Document node is the top-level container. JavaScript uses the document API to work with these nodes — methods like querySelector, createElement, appendChild, and removeEventListener.

The DOM is live — any change you make through JavaScript appears on the page instantly. This is different from the virtual DOM that React uses. React keeps a lightweight copy of the tree in memory, figures out the smallest set of changes needed, and then applies them to the real DOM all at once for better performance.`,
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
    id: 'block-vs-inline',
    title: 'Block vs Inline Elements',
    summary: 'Block elements start on a new line and stretch to full width. Inline elements sit inside text and only take up as much space as their content.',
    body: `Block-level elements — like div, p, h1–h6, ul, ol, section, and article — always start on a new line. By default they stretch to fill the full width of their parent container. They can hold other block elements and inline elements inside them.

Inline elements — like span, a, strong, em, code, img, and button — flow inside surrounding text. They do not start a new line. They only take up as much width as their content needs. You cannot set an explicit width or height on a purely inline element. If you need both, use display: inline-block, or switch to flexbox or grid.

The CSS display property lets you override the default behaviour of any element: display: block, inline, inline-block, flex, grid, or none. HTML5 introduced a more detailed way to classify elements (called the content model), but the block vs. inline distinction is still the most practical mental model when thinking about layout.`,
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
    id: 'semantic-html',
    title: 'Semantic HTML & Accessibility',
    summary: 'Semantic elements tell the browser and other tools what your content is for — which improves search rankings, makes code easier to read, and helps screen readers work properly.',
    body: `Semantic HTML means choosing elements based on what the content represents, not just how it looks. Use <article> for a piece of content that stands on its own (like a blog post), <nav> for navigation links, <header> and <footer> for the top and bottom of the page or a section, <main> for the primary content area, and <aside> for related but supplementary content. Compare those to <div> and <span>, which carry no meaning at all — they are just containers.

The benefits are practical. Screen readers (software that reads the page aloud for blind users) use the meaning of these elements to give users shortcuts — for example, jumping straight to navigation or the main content. Search engines treat <article> content as more important than random div content, and can correctly interpret dates inside a <time> element. Your code also becomes easier to understand at a glance.

ARIA (Accessible Rich Internet Applications) is a set of extra attributes you add when HTML alone cannot describe something — for example, a custom dropdown menu built from divs. The rule is: always prefer a native HTML element over an ARIA workaround. Native elements have built-in keyboard support and browser behaviour that ARIA attributes alone cannot fully replicate.`,
    tags: ['semantic', 'accessibility', 'aria', 'seo'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'head-vs-body',
    title: 'Head vs Body Placement',
    summary: 'Where you put resources in HTML determines what the browser loads first — and in what order — which directly affects how fast the page appears.',
    body: `The <head> element holds metadata — information about the page that is not shown directly to the user. This includes <title>, <meta> tags, <link> tags for stylesheets and preloads, and sometimes <script> tags. The <body> holds all visible content and most scripts.

A plain <script> tag in <head> blocks the browser from continuing to parse HTML until that script has been downloaded and run. This makes the page appear slower. To avoid this, add the defer attribute (the script downloads in parallel and runs after parsing finishes, in document order) or the async attribute (the script downloads in parallel and runs as soon as it is ready, in no guaranteed order). Modern best practice is to put scripts in <head> with defer or async rather than pasting them just before </body>.

Styles that apply to content visible on first load (called above-the-fold styles) can be written directly in a <style> tag inside <head>. This avoids a network request and prevents a brief flash of unstyled content. Styles that are less critical can be loaded later using a JavaScript-based preload technique.`,
    tags: ['head', 'body', 'scripts', 'performance', 'rendering'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'html-form-validation',
    title: 'HTML Form Validation',
    summary: 'HTML attributes let the browser check form inputs automatically — no JavaScript required for basic validation.',
    body: `HTML has built-in validation rules you apply as attributes. required means the field cannot be empty. type="email" or type="url" checks the format automatically. min and max set numeric limits. minlength and maxlength limit string length. pattern accepts a regular expression (a pattern that the value must match). step controls what numeric values are valid. When the user submits the form, the browser checks all these rules and shows its own error messages — without any JavaScript.

The Constraint Validation API gives you programmatic access to the same checks. element.validity returns an object with boolean properties that describe exactly what is wrong — for example, valueMissing is true if the field is empty and required, and typeMismatch is true if the value does not match the expected format. You can also call element.setCustomValidity('Your message here') to set your own error text, or pass an empty string to clear it.

Adding novalidate to the <form> tag turns off the browser's built-in error pop-ups while keeping the API working. You can then run the same checks in JavaScript and display your own error messages in a more accessible way — using aria-invalid to mark the failing field, aria-describedby to link it to an error message element, and role="alert" so screen readers announce the error.`,
    tags: ['forms', 'validation', 'constraint-validation', 'accessibility'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'browser-storage-options',
    title: 'Browser Storage: Cookies, localStorage, sessionStorage, IndexedDB',
    summary: 'Browsers offer four main ways to store data locally, each with different size limits, lifetimes, and rules about who can access them.',
    body: `Cookies are automatically included in every HTTP request sent to the server — so the server can read them. They have a 4KB size limit. You can set an expiry date, restrict them to HTTPS only with the Secure flag, and block JavaScript from reading them with HttpOnly (which protects against XSS — a type of attack where malicious scripts run on your page). SameSite controls whether cookies are sent on cross-site requests, which prevents CSRF attacks (where another site tricks the browser into making requests on the user's behalf). Use cookies for session tokens and data the server needs to see.

localStorage stores data that survives closing the browser. It holds about 5MB and is tied to the page's origin (the combination of protocol, domain, and port). Its API is synchronous — meaning it blocks the browser's main thread briefly during large reads. Use it for user preferences and UI state that should persist across visits.

sessionStorage works exactly like localStorage but is wiped when the tab is closed. It is not shared between tabs. Use it for temporary data like a multi-step form in progress.

IndexedDB is a fully asynchronous database built into the browser. It can store 100MB or more and supports complex queries and indexes. It is the right choice for offline-capable apps or large local datasets. Libraries like Dexie.js make it easier to use.

The Cache API (used inside Service Workers) stores entire network request-and-response pairs. Use it for caching page assets so the app works offline.`,
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
  {
    id: 'seo-fundamentals',
    title: 'SEO Fundamentals in HTML',
    summary: 'Specific HTML elements and attributes that affect how search engines find, index, and rank your pages.',
    body: `Search engines read your HTML to decide what the page is about and how to display it in search results. A few elements have an outsized effect on this.

Title tag: The single most important on-page SEO element. It appears as the clickable headline in search results (called SERP snippets — Search Engine Results Page). Keep it under 60 characters and put the main keyword near the front.

Meta description: This does not directly affect ranking, but it appears as the short summary under the title in search results. A well-written description improves how many people click through to your page. Aim for 150–160 characters.

Heading hierarchy: Use one h1 per page for the main topic. Use h2 for major sections, h3 for subsections, and so on. Search engines use headings to understand the structure and topics on the page.

Semantic markup: Elements like <article> and <main> signal to crawlers which content is primary. Structured data (written in JSON-LD format using schema.org vocabulary) can unlock rich results — like star ratings or FAQ dropdowns — in search listings.

Canonical tag: If the same content exists at multiple URLs, <link rel="canonical"> tells search engines which one is the official version and prevents duplicate content from hurting your ranking.

Core Web Vitals: Google uses three user-experience scores — LCP (how fast the main content loads), CLS (how much the layout shifts unexpectedly), and INP (how quickly the page responds to clicks) — as ranking signals. Your HTML structure directly affects all three.`,
    tags: ['seo', 'meta', 'headings', 'canonical', 'core-web-vitals'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'web-accessibility-wcag',
    title: 'Web Accessibility (WCAG)',
    summary: 'WCAG is the international standard for web accessibility, built around four principles: Perceivable, Operable, Understandable, and Robust.',
    body: `The Web Content Accessibility Guidelines (WCAG) are a set of rules published by the W3C that define what makes a website accessible to all users, including those with disabilities. They are organised around four principles, often shortened to POUR.

Perceivable: Every user must be able to perceive all content. Images need alt text so screen readers can describe them. Videos need captions. Text must have enough contrast against the background — at least a 4.5:1 ratio for normal-sized text at the AA level (the most common compliance target).

Operable: Every feature must be usable with a keyboard alone. Nothing should flash more than three times per second (this can trigger seizures). Time-sensitive tasks must give users enough time to complete them.

Understandable: Text must be readable and written in plain language. Forms must have clear labels and helpful error messages. The page language must be declared in the html tag (lang="en") so screen readers use the correct pronunciation.

Robust: Content must work correctly with current assistive technologies (like screen readers) and remain compatible as those tools are updated. This means writing valid HTML, using ARIA attributes correctly, and not relying on mouse-only interactions.

WCAG 2.1 AA is the level required by most accessibility laws around the world, including the ADA (USA), Section 508 (US federal agencies), and EN 301 549 (Europe).`,
    tags: ['wcag', 'accessibility', 'a11y', 'aria', 'keyboard'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'progressive-enhancement',
    title: 'Progressive Enhancement vs Graceful Degradation',
    summary: 'Two strategies for handling browser differences — progressive enhancement builds up from a working baseline; graceful degradation starts with the full experience and adds fallbacks.',
    body: `Progressive enhancement means starting with the simplest version of your feature that works in every browser, then adding improvements on top for browsers that support them. The baseline is semantic HTML — it works everywhere, even with JavaScript disabled. CSS layout and animations are added on top. JavaScript behaviour is added last, as an optional layer.

The benefit is that your core content and actions always work. Users on slow networks, browsers with JavaScript errors, or older devices still get something useful. It is also easier to make accessible and more resilient overall.

Graceful degradation is the opposite approach: build the full experience first, then add fallbacks for environments that cannot support it. This was common when new browser APIs were first being adopted. It tends to produce more fragile results because the fallbacks are often incomplete.

In practice, the right approach is to use feature detection rather than guessing which browser the user has. CSS @supports lets you check if a CSS feature is available. JavaScript has its own checks — for example, testing whether a specific API exists in window before using it. Both are more reliable than detecting the browser name.

A practical example: an HTML form with action and method set will submit correctly even if JavaScript fails. JavaScript then enhances that form with a faster async submission and a better error display — but users who cannot run JavaScript still get a working form.`,
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
    id: 'critical-rendering-path',
    title: 'Critical Rendering Path',
    summary: 'The sequence of steps the browser takes to turn your HTML and CSS into pixels on the screen — knowing this helps you make pages load faster.',
    body: `The critical rendering path is the ordered sequence of work the browser does before the user sees anything on the page.

1. Parse HTML → DOM tree. The browser reads the HTML file and builds a tree of nodes representing each element.
2. Parse CSS → CSSOM tree (CSS Object Model — the CSS equivalent of the DOM). This step blocks rendering. The browser will not show anything until it has processed all the CSS it knows about.
3. Combine DOM + CSSOM → Render tree. Only visible elements are included. Hidden elements (like display: none) are excluded.
4. Layout (also called reflow): the browser calculates the exact position and size of every element on the page.
5. Paint: the browser fills in pixels — text, colours, images, borders, shadows.
6. Composite: if elements are on separate layers (like a fixed header or an animated element), the browser assembles those layers in the correct order.

What blocks rendering: CSS in <head> blocks rendering until it is fully downloaded and parsed. A plain <script> tag blocks both HTML parsing and rendering until it finishes. Inline styles and scripts skip the network round-trip but still pause the process.

How to optimise: inline the CSS needed for content visible on first load to remove a network request. Minify and compress files to reduce download size. Add the defer attribute to scripts so they do not block parsing. Use preload for resources the page needs early.`,
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
];

export default htmlTheory;
