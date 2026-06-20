import type { QnaItem } from '@/types/content';

const htmlQna: QnaItem[] = [
  {
    id: 'semantic-vs-div',
    question: 'Why use semantic HTML elements instead of divs?',
    answer: `Semantic elements tell the browser, search engines, and assistive technologies (like screen readers) what a piece of content is for. A <nav> element tells a screen reader "this is a navigation region" — screen reader users can then jump directly to it with a keyboard shortcut. A <main> element tells search engines where the primary content lives on the page. Divs have no meaning at all. If you build a page entirely from divs, you have to manually add ARIA roles and labels to recreate the information that semantic elements give you for free. Semantic HTML also makes your code easier to read and understand at a glance.`,
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
    answer: `Both defer and async tell the browser to download the script in the background while it continues parsing HTML — so neither one blocks the page from loading. The difference is when the script actually runs. An async script runs as soon as it finishes downloading, which may interrupt HTML parsing and happen in any order relative to other scripts. A defer script waits until the browser has finished parsing the full HTML document, and then runs in the same order the scripts appear in the document. Use defer for scripts that need the DOM to exist or that depend on other scripts. Use async for completely independent scripts like analytics or ad trackers, where the order does not matter.`,
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
    answer: `The browser has built-in validation that runs automatically when a form is submitted. You control it with HTML attributes. required means the field cannot be empty. type="email" or type="url" checks the value format. min and max set numeric limits. minlength and maxlength set string length limits. pattern accepts a regular expression (a pattern the value must match). If any rule is broken, the browser blocks submission and shows an error message next to the failing field. You can inspect the result in JavaScript through element.validity — an object with boolean properties like valueMissing and typeMismatch that each tell you exactly what rule failed. Add novalidate to the <form> tag to turn off the browser's built-in error pop-ups while keeping this API, so you can show your own custom error messages instead.`,
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
    answer: `Data attributes let you attach custom information to any HTML element using attribute names that start with data-. In JavaScript, you read and write them through element.dataset. The dataset object automatically converts kebab-case attribute names (like data-user-id) into camelCase properties (like dataset.userId). You can also use getAttribute and setAttribute if you prefer. Common uses include passing data from the server into the HTML so JavaScript can pick it up, event delegation (attaching one listener to a parent element and reading data from whichever child was clicked), and using attribute selectors in CSS to apply styles based on data values.`,
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
    answer: `The sandbox attribute is the main way to restrict what an embedded iframe can do. Without it, the iframe can run JavaScript, access the parent page's cookies, and redirect the whole browser tab. Setting sandbox="" disables all of that. You then selectively re-enable only what you actually need — for example, allow-scripts lets the iframe run JavaScript, and allow-forms lets it submit forms. Be careful: never combine allow-scripts and allow-same-origin together. That combination lets the iframe's script remove its own sandbox restrictions, which defeats the entire purpose. On your own pages, also add the X-Frame-Options or Content-Security-Policy frame-ancestors HTTP header to prevent other sites from embedding your page in an iframe — this blocks clickjacking attacks (where an attacker overlays your page invisibly and tricks users into clicking things).`,
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
    answer: `Without the viewport meta tag, mobile browsers pretend the page is about 980px wide and then shrink everything to fit the screen. The result is tiny text and a layout that was never designed for mobile. The viewport tag fixes this by telling the browser to use the device's real screen width. width=device-width sets the layout width to match the physical screen. initial-scale=1.0 means no zoom is applied when the page first loads. Do not use user-scalable=no or maximum-scale=1.0 — this prevents users from zooming in, which is a real accessibility problem for people with low vision.`,
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
    answer: `The first rule of ARIA is: do not use ARIA if a native HTML element already does the job. A <button> is better than a <div role="button"> because the native button comes with built-in keyboard support, focusability, and click event handling — ARIA alone does not give you any of that. Use ARIA when you are building a custom widget that has no HTML equivalent, such as a tab panel, combobox, or custom slider. Use aria-live regions when content updates dynamically and you need screen readers to announce the change automatically. Use state attributes like aria-expanded, aria-checked, and aria-invalid to communicate the current state of interactive elements. Use aria-label or aria-labelledby to provide a text label for elements that have no visible text (like an icon-only button).`,
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
    answer: `Use a plain <img> for decorative images or images that are just part of the flow of text without needing a caption. Use <figure> when the image has a visible caption (added with <figcaption>), or when the image is a self-contained piece of content that the main text refers to — such as a chart, diagram, code listing, or photo with attribution. Wrapping the image in <figure> tells the browser and assistive technologies (like screen readers) that the caption belongs to that specific image, rather than just being an unrelated paragraph that happens to follow it. A good way to test this: if you could move the figure to a different part of the page and it would still make sense on its own, it belongs in a <figure>.`,
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
    answer: `An accessible form satisfies these requirements:

(1) Every input has an associated <label> — either linked with matching for and id attributes, or by wrapping the input inside the label element.

(2) Related inputs are grouped inside a <fieldset> with a <legend> that describes the group (for example, a set of radio buttons for selecting a size).

(3) Required fields are marked with the required attribute and have a visible indicator (like an asterisk) so sighted users also know.

(4) Error messages are linked to their input with aria-describedby, and the input's error state is marked with aria-invalid="true" so screen readers announce the problem.

(5) Error messages appear in an element with role="alert" so screen readers announce them immediately without the user having to navigate to them.

(6) All interactive elements have a visible focus style so keyboard users can see where they are.

(7) Tab order follows the visual order of the page — do not use tabindex with a value greater than 0, as this creates a confusing jump in tab order.

(8) Every button has an explicit type — type="submit" for the form submit button and type="button" for anything else, so buttons inside a form do not accidentally submit it.`,
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
    answer: `Good alt text conveys what the image means, not a literal description of what it shows. Think about what information would be lost if the image were removed, and communicate that.

For informational images: describe what the image communicates, not just what it looks like. For a chart showing revenue growth, "Revenue increased 40% from Q1 to Q4 2024" is better than "A bar chart with blue bars".

For functional images (icons inside buttons or links): describe the action, not the icon. An icon of a magnifying glass inside a button should have alt="Search", not alt="Magnifying glass icon".

For decorative images (dividers, backgrounds, purely visual flourishes): use an empty alt="" — two double quotes with nothing between them. This tells screen readers to skip the image entirely. Never leave out the alt attribute altogether — a missing alt is treated differently from an empty one.

For complex images (charts, maps, diagrams): provide a short alt that names the image, then include a full text description nearby in the HTML or link it with aria-describedby.`,
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
    answer: `Headings (h1 through h6) create an outline of the page. Screen reader users often navigate by jumping from heading to heading — it is their equivalent of scanning a page visually. If you skip levels (for example, going from h1 directly to h3), you break that outline and make the page confusing to navigate. Search engines also use heading text to understand what each section of the page is about. Use one h1 per page for the main title or topic. Use h2 for the major sections, h3 for subsections within those, and so on down the hierarchy. Never pick a heading level based on how large you want the text to look — use CSS for sizing. Choosing the wrong heading level to get the right font size is one of the most common accessibility mistakes.`,
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
    answer: `These three hints all help the browser get things ready earlier, but they work differently. preload tells the browser that the current page needs a specific resource soon — it starts downloading it immediately at high priority. You must include the as attribute (for example, as="font" or as="image") so the browser knows what kind of resource it is and can prioritise correctly. prefetch is a low-priority hint that a resource will be needed on the next page the user navigates to. The browser downloads it during idle time so it is already cached when the user arrives. preconnect tells the browser to establish the network connection (including DNS lookup, TCP handshake, and TLS negotiation) to a specific server early — without actually downloading anything yet. This saves roughly 300ms on the first request to that server. Use preload for fonts, hero images, or scripts the current page needs right away. Use prefetch for assets on pages the user is likely to visit next. Use preconnect for third-party APIs or CDNs your page will make requests to.`,
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
    answer: `The native <dialog> element handles several things that previously required JavaScript libraries. It traps focus inside the dialog — pressing Tab cycles through only the elements inside it, which is required for accessibility. When the dialog closes, it automatically returns focus to whatever element opened it. It provides a ::backdrop pseudo-element (a CSS-selectable overlay behind the dialog) so you can style the dimmed background without extra HTML. It fires a close event you can listen to for cleanup. And it automatically closes when the user presses Escape. If you place a form with method="dialog" inside the dialog, submitting it closes the dialog and sets dialog.returnValue to the value of the button that was clicked — useful for knowing whether the user confirmed or cancelled. Open a dialog as a true modal (blocks the rest of the page) with dialog.showModal(). Open it as a non-modal (the rest of the page stays interactive) with dialog.show().`,
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
    answer: `Use srcset (with the sizes attribute) when you want to serve the same image at different resolutions and let the browser decide which file to download based on the device screen density and viewport size. The browser picks the most appropriate file — you are not in control of which one it chooses, and that is fine for simple cases. Use <picture> when you need to serve genuinely different images at different screen sizes. This is called art direction — for example, a wide landscape crop on desktop and a tighter portrait crop on mobile. <picture> lets you specify exactly which image the browser should use at each breakpoint. <picture> with <source type="image/webp"> is also the right way to offer a modern image format (like WebP or AVIF) with a JPEG fallback for browsers that do not support it.`,
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
    answer: `Use <a href="..."> for navigation — any time clicking will change the URL, open a new page, or go to a resource. Use <button> for actions — submitting a form, opening a modal, toggling something, or running JavaScript. The difference matters for accessibility. Screen readers announce <a> as "link", which tells the user to expect navigation. They announce <button> as "button", which tells the user to expect an action. The keyboard behaviour also differs: links respond to Enter, while buttons respond to both Enter and Space. Never use <a> without an href attribute as a clickable trigger for an action — without href it is not a real link and does not behave like one. Never use a <div> or <span> as a clickable element — you would have to manually add focusability, keyboard support, and ARIA roles that a native button provides automatically.`,
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
    answer: `<!DOCTYPE html> tells the browser to use standards mode. Without it, browsers switch into "quirks mode" — a legacy compatibility mode that mimics old, broken browser behaviour from the 1990s.

<html lang="en"> declares the language of the document. Screen readers use this to apply the correct pronunciation, and browser translation tools use it to detect what to translate from.

<meta charset="UTF-8"> tells the browser to interpret the file using the UTF-8 character encoding, which supports every Unicode character including accented letters and emoji. It must appear as the very first tag inside <head>.

<meta name="viewport"> is essential for responsive design. Without it, mobile browsers assume the page is designed for a ~980px desktop screen and scale it down, making everything tiny.

<title> is the text shown in the browser tab and in bookmarks. Search engines also treat it as the primary label for the page in search results.

<link rel="stylesheet"> in <head> blocks the browser from rendering anything until the CSS file is downloaded. This is intentional — it prevents a brief moment where the page is visible without any styles, which is called a Flash of Unstyled Content (FOUC).`,
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
    answer: `Tables should only be used for data that genuinely belongs in rows and columns — never for laying out a page visually. Using tables for layout was a technique from the early web and causes serious accessibility problems. Use CSS grid or flexbox for layout instead.

<caption> is a title for the table and appears above it by default. It is the most important accessibility element in a table — it tells screen reader users what the table contains before they start reading the data.

<thead>, <tbody>, and <tfoot> group rows into the header, body, and footer of the table. Browsers and assistive technologies (AT) use this grouping to repeat column headers when printing long tables, and to help users understand the table structure.

<th scope="col"> marks a cell as a column header. <th scope="row"> marks it as a row header. The scope attribute tells screen readers which direction the header applies — across its column or across its row.

For complex tables that have merged cells (using colspan or rowspan), use the headers attribute on data cells and matching id attributes on header cells to explicitly link them together.

Do not use empty <th> elements as visual spacers — use CSS padding or gap instead.`,
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
    answer: `Open Graph (OG) tags are meta tags that control how your page looks when someone shares a link on social platforms like Facebook, LinkedIn, Slack, or in iMessage previews. Without them, the platform tries to guess a title, description, and image — and often gets it wrong, which results in a poor-looking share card.

The minimum tags for a good preview are og:title, og:description, og:image, and og:url. The og:image should be at least 1200×630 pixels to look sharp across all platforms.

Twitter (now X) uses its own set of tags: twitter:card, twitter:title, twitter:description, and twitter:image. Setting twitter:card="summary_large_image" shows a large image preview instead of a small thumbnail.

These tags do not directly affect your Google search ranking. However, a well-designed share card with a compelling image increases how many people click links when they see them shared — which sends positive engagement signals that indirectly benefit your ranking over time.`,
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
    answer: `Web Components are a group of browser-native APIs that let you create your own custom HTML elements. Unlike React or Vue components, they work in any framework — or with no framework at all.

Custom Elements let you register a new HTML tag by writing a JavaScript class that extends HTMLElement. You define lifecycle methods that the browser calls automatically: connectedCallback runs when the element is added to the page (like mounting in React), disconnectedCallback runs when it is removed, and attributeChangedCallback runs when one of its attributes changes.

Shadow DOM is an isolated DOM tree (a self-contained mini-document) attached to your custom element. Styles written inside the shadow DOM do not affect the rest of the page, and outside styles cannot accidentally break the component's internals. This is called style encapsulation. You can still pass styles in through CSS custom properties (CSS variables), the ::part pseudo-element, and the :slotted pseudo-class.

HTML Templates (<template>) are HTML blocks the browser parses but does not render. You clone the template in JavaScript and insert it into the page where needed. Combined with <slot> elements, templates allow the user of your component to inject their own HTML content into specific places inside it.

The trade-off: Web Components work best for small, reusable UI elements (like a custom button, date picker, or tooltip) that need to be shared across projects or frameworks. For complex application logic, React, Vue, or Angular are better tools.`,
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
    answer: `A Service Worker is a JavaScript file that runs in a separate background thread — completely independent from the page. It sits between the browser and the network and can intercept any outgoing network request, then decide what to return: a cached copy, a fresh response from the network, or something it generates itself. Think of it as a programmable middleman for network traffic.

The lifecycle has four stages. First the browser registers the Service Worker. Then it installs — during install you typically cache the files the app needs to work offline. Then it activates — during activation you usually delete any old caches from previous versions. After that it stays running in the background, intercepting fetch events.

There are a few common caching strategies. Cache-first returns a cached copy immediately without hitting the network — good for offline use. Network-first always tries the network and only falls back to the cache if that fails — good for content that changes frequently. Stale-while-revalidate returns the cache immediately (so the page loads fast) and simultaneously fetches a fresh copy in the background to update the cache for next time.

Service Workers require the page to be served over HTTPS (localhost is an exception for development). They have no access to the DOM. The page and the Service Worker communicate by passing messages with postMessage. Service Workers are the core technology behind Progressive Web Apps (PWAs — web apps that can be installed on a device and work offline).`,
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
    answer: `Content-Security-Policy (CSP): This header tells the browser which sources are allowed to load scripts, styles, images, and fonts on your page. It prevents XSS (Cross-Site Scripting — a type of attack where malicious JavaScript is injected into your page). By blocking inline scripts and restricting where scripts can load from, CSP is the strongest defence against XSS.

X-Frame-Options / frame-ancestors: These prevent your page from being loaded inside an iframe on another site. This blocks clickjacking attacks — where an attacker overlays your page invisibly inside their site and tricks users into clicking on things they cannot see.

X-Content-Type-Options: nosniff: This stops browsers from guessing (sniffing) what type of file a response is. Without it, a browser might treat a text file as JavaScript if the URL looks right. nosniff forces the browser to trust the Content-Type header instead.

Strict-Transport-Security (HSTS): This tells the browser that your site must always be accessed over HTTPS, for a set period of time. It prevents SSL stripping attacks, where an attacker downgrades a connection from HTTPS to plain HTTP.

Permissions-Policy: This controls which browser features your page and any embedded iframes are allowed to use — for example, blocking access to the camera, microphone, or geolocation unless you explicitly permit it.

Referrer-Policy: This controls how much of the current page's URL is sent to other sites when the user clicks a link or the browser loads a resource. A strict policy prevents sensitive data in your URLs (like user IDs or tokens in query parameters) from leaking to third-party servers.`,
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
    answer: `Core Web Vitals are three performance metrics that Google uses as search ranking signals. They measure real user experience, not just technical speed.

LCP (Largest Contentful Paint): this measures how long it takes for the largest visible element on the page to appear — usually a hero image or a large heading. To improve it: preload the LCP image with <link rel="preload">, add fetchpriority="high" on the image element, do not lazy-load it (lazy loading deliberately delays it), and use modern image formats like WebP or AVIF which are smaller files.

CLS (Cumulative Layout Shift): this measures how much the layout jumps around unexpectedly after the page first loads. A high score means buttons and text are moving as the user tries to click or read. To prevent it: always set explicit width and height on <img> and <video> elements so the browser reserves the correct space before the file loads, avoid inserting content above existing content after load, and use the CSS aspect-ratio property to hold space for dynamic content.

INP (Interaction to Next Paint): this measures how quickly the page responds visually after a user interaction like a click or key press. It replaced an older metric called FID. To improve it: reduce long-running JavaScript tasks that block the browser, defer non-critical scripts so they do not compete with user input, and move heavy computation to web workers (background threads that run off the main thread).`,
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
    answer: `Structured data is a standardised way of describing what your content is — not just how it looks — in a format that machines can read. You use a shared vocabulary from schema.org to label things like articles, products, reviews, events, and FAQs. Google reads this data and uses it to display rich results in search — for example, star ratings under a product listing, recipe steps with images, FAQ dropdowns, or breadcrumb navigation.

JSON-LD (JavaScript Object Notation for Linked Data) is Google's preferred format for structured data. You write it as a JSON object inside a <script type="application/ld+json"> tag, which can sit in <head> or <body>. Unlike older approaches (Microdata and RDFa), JSON-LD is completely separate from your HTML markup — you do not need to add attributes to every element. This makes it easy to generate and inject from a CMS or server without touching the page template.

Rich results do not directly guarantee a higher ranking. However, they make your listing more visually prominent in search results, which increases the percentage of users who click on it (the click-through rate). A higher click-through rate sends a positive signal to Google over time.`,
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
