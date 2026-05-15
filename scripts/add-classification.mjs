import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '../src/data');

// tier + level for SyntaxEntry and ConceptCard entries
// tier only for QnaItem entries (difficulty IS the level)
const ENTRY_CLASSIFICATION = {
  // ─── JavaScript Syntax ───
  'hoisting':             { tier: 'core',     level: 'experienced' },
  'var-let-const':        { tier: 'core',     level: 'fresher' },
  'arrow-functions':      { tier: 'core',     level: 'fresher' },
  'destructuring':        { tier: 'core',     level: 'fresher' },
  'spread-rest':          { tier: 'core',     level: 'fresher' },
  'template-literals':    { tier: 'core',     level: 'fresher' },
  'optional-chaining':    { tier: 'core',     level: 'experienced' },
  'nullish-coalescing':   { tier: 'core',     level: 'experienced' },
  'async-await':          { tier: 'core',     level: 'experienced' },
  'promises':             { tier: 'core',     level: 'experienced' },
  'classes':              { tier: 'core',     level: 'experienced' },
  'es-modules':           { tier: 'core',     level: 'experienced' },
  'array-methods':        { tier: 'core',     level: 'fresher' },
  'object-methods':       { tier: 'core',     level: 'experienced' },
  'set-map':              { tier: 'core',     level: 'experienced' },
  'generators':           { tier: 'advanced', level: 'expert' },
  'proxy-reflect':        { tier: 'advanced', level: 'expert' },
  'fetch-abort':          { tier: 'core',     level: 'experienced' },
  'error-handling':       { tier: 'core',     level: 'experienced' },
  'logical-assignment':   { tier: 'core',     level: 'experienced' },
  'symbol':               { tier: 'advanced', level: 'expert' },

  // ─── JavaScript Theory ───
  'event-loop':           { tier: 'advanced', level: 'experienced' },
  'closures':             { tier: 'core',     level: 'experienced' },
  'prototype-chain':      { tier: 'advanced', level: 'experienced' },
  'this-keyword':         { tier: 'core',     level: 'experienced' },
  'lexical-scope':        { tier: 'core',     level: 'experienced' },
  'garbage-collection':   { tier: 'advanced', level: 'expert' },
  'event-bubbling':       { tier: 'core',     level: 'experienced' },
  'currying':             { tier: 'advanced', level: 'experienced' },
  'pure-functions':       { tier: 'advanced', level: 'experienced' },

  // ─── HTML Syntax ───
  'semantic-elements':    { tier: 'core',     level: 'fresher' },
  'input-types':          { tier: 'core',     level: 'fresher' },
  'form-structure':       { tier: 'core',     level: 'fresher' },
  'meta-tags':            { tier: 'core',     level: 'fresher' },
  'script-loading':       { tier: 'core',     level: 'experienced' },
  'picture-srcset':       { tier: 'core',     level: 'experienced' },
  'data-attributes':      { tier: 'core',     level: 'experienced' },
  'details-summary':      { tier: 'core',     level: 'fresher' },
  'table-structure':      { tier: 'core',     level: 'fresher' },
  'dialog-element':       { tier: 'advanced', level: 'experienced' },
  'aria-roles':           { tier: 'core',     level: 'experienced' },
  'figure-figcaption':    { tier: 'core',     level: 'fresher' },
  'link-preload-prefetch':{ tier: 'advanced', level: 'experienced' },
  'template-element':     { tier: 'advanced', level: 'expert' },
  'video-audio':          { tier: 'core',     level: 'fresher' },

  // ─── HTML Theory ───
  'dom-tree':             { tier: 'core',     level: 'fresher' },
  'semantic-html':        { tier: 'core',     level: 'fresher' },
  'critical-rendering-path': { tier: 'advanced', level: 'experienced' },
  'head-vs-body':         { tier: 'core',     level: 'fresher' },
  'html-form-validation': { tier: 'core',     level: 'fresher' },
  'block-vs-inline':      { tier: 'core',     level: 'fresher' },
  'seo-fundamentals':     { tier: 'core',     level: 'experienced' },
  'web-accessibility-wcag': { tier: 'core',   level: 'experienced' },

  // ─── CSS Syntax ───
  'css-custom-properties':{ tier: 'core',     level: 'experienced' },
  'flexbox':              { tier: 'core',     level: 'fresher' },
  'css-grid':             { tier: 'core',     level: 'experienced' },
  'media-queries':        { tier: 'core',     level: 'fresher' },
  'container-queries':    { tier: 'advanced', level: 'experienced' },
  'css-animations':       { tier: 'core',     level: 'experienced' },
  'css-transitions':      { tier: 'core',     level: 'fresher' },
  'pseudo-elements':      { tier: 'core',     level: 'experienced' },
  'modern-pseudo-classes':{ tier: 'advanced', level: 'experienced' },
  'css-transforms':       { tier: 'core',     level: 'experienced' },
  'clamp-min-max':        { tier: 'advanced', level: 'experienced' },
  'cascade-layers':       { tier: 'advanced', level: 'expert' },
  'logical-properties':   { tier: 'advanced', level: 'experienced' },
  'subgrid':              { tier: 'advanced', level: 'expert' },
  'at-property':          { tier: 'advanced', level: 'expert' },
  'clip-path':            { tier: 'advanced', level: 'experienced' },
  'aspect-ratio':         { tier: 'core',     level: 'experienced' },

  // ─── CSS Theory ───
  'box-model':            { tier: 'core',     level: 'fresher' },
  'specificity-cascade':  { tier: 'core',     level: 'experienced' },
  'stacking-context':     { tier: 'advanced', level: 'experienced' },
  'block-formatting-context': { tier: 'advanced', level: 'experienced' },
  'css-inheritance':      { tier: 'core',     level: 'fresher' },
  'reflow-repaint':       { tier: 'advanced', level: 'experienced' },
  'css-containment':      { tier: 'advanced', level: 'expert' },
  'selector-performance': { tier: 'advanced', level: 'expert' },
  'cascade-layers-theory':{ tier: 'advanced', level: 'expert' },

  // ─── React Syntax ───
  'jsx-basics':           { tier: 'core',     level: 'fresher' },
  'usestate':             { tier: 'core',     level: 'fresher' },
  'useeffect':            { tier: 'core',     level: 'fresher' },
  'useref':               { tier: 'core',     level: 'experienced' },
  'usememo':              { tier: 'core',     level: 'experienced' },
  'usecallback':          { tier: 'core',     level: 'experienced' },
  'usecontext':           { tier: 'core',     level: 'experienced' },
  'usereducer':           { tier: 'core',     level: 'experienced' },
  'custom-hooks':         { tier: 'core',     level: 'experienced' },
  'react-memo':           { tier: 'core',     level: 'experienced' },
  'forwardref':           { tier: 'advanced', level: 'experienced' },
  'lazy-suspense':        { tier: 'advanced', level: 'experienced' },
  'create-portal':        { tier: 'advanced', level: 'experienced' },
  'error-boundary':       { tier: 'advanced', level: 'experienced' },
  'uselayouteffect':      { tier: 'advanced', level: 'experienced' },
  'usetransition':        { tier: 'advanced', level: 'expert' },
  'use-hook-react19':     { tier: 'advanced', level: 'expert' },
  'server-components':    { tier: 'advanced', level: 'expert' },
  'react19-actions':      { tier: 'advanced', level: 'expert' },

  // ─── React Theory ───
  'virtual-dom':          { tier: 'core',     level: 'fresher' },
  'react-fiber':          { tier: 'advanced', level: 'expert' },
  'concurrent-rendering': { tier: 'advanced', level: 'expert' },
  'component-lifecycle':  { tier: 'core',     level: 'experienced' },
  'context-vs-prop-drilling': { tier: 'core', level: 'experienced' },
  'composition-vs-inheritance': { tier: 'advanced', level: 'experienced' },
  'controlled-vs-uncontrolled': { tier: 'core', level: 'experienced' },
  'keys-list-rendering':  { tier: 'core',     level: 'fresher' },
  'strict-mode':          { tier: 'advanced', level: 'experienced' },
  'react19-overview':     { tier: 'advanced', level: 'expert' },
};

// QnaItem tier — difficulty already encodes level, just need tier
const QNA_TIER = {
  // JS QnA
  'var-let-const-diff':        'core',
  'double-vs-triple-equals':   'core',
  'explain-closures':          'core',
  'event-loop-explanation':    'advanced',
  'this-arrow-vs-regular':     'core',
  'promise-all-vs-allsettled': 'core',
  'async-await-error-handling':'core',
  'prototypal-inheritance':    'advanced',
  'shallow-vs-deep-copy':      'core',
  'weakmap-use-case':          'advanced',
  'memory-leaks':              'advanced',
  'debounce-throttle':         'advanced',
  'type-coercion-gotchas':     'core',
  'immutability-patterns':     'core',
  'generator-use-cases':       'advanced',
  'event-delegation-benefits': 'core',
  'symbol-use-cases':          'advanced',
  'scope-chain-closure-bug':   'core',
  'proxy-reflect-use':         'advanced',
  'async-iteration':           'advanced',

  // HTML QnA
  'semantic-vs-div':           'core',
  'defer-vs-async':            'core',
  'html-form-validation':      'core',
  'data-attributes-js':        'core',
  'iframe-security':           'advanced',
  'meta-viewport':             'core',
  'aria-when-to-use':          'core',
  'figure-vs-img':             'core',
  'accessible-forms-checklist':'core',
  'alt-text-guidelines':       'core',
  'heading-hierarchy':         'core',
  'preload-prefetch-difference':'advanced',
  'html-dialog-native':        'advanced',
  'picture-art-direction':     'advanced',
  'link-vs-button':            'core',

  // CSS QnA
  'specificity-calculation':   'core',
  'bfc-triggers':              'advanced',
  'flexbox-vs-grid':           'core',
  'z-index-not-working':       'core',
  'centering-methods':         'core',
  'custom-props-vs-sass-vars': 'core',
  'will-change-usage':         'advanced',
  'pseudo-element-vs-pseudo-class': 'core',
  'responsive-without-media-queries': 'advanced',
  'margin-collapse-explanation':'core',
  'position-values':           'core',
  'css-has-use-cases':         'advanced',
  'cascade-layers-practice':   'advanced',
  'paint-layout-composite':    'advanced',
  'container-queries-vs-media':'advanced',
  'box-sizing-border-box':     'core',
  'logical-properties-why':    'advanced',
  'css-nesting':               'advanced',
  'custom-props-animation':    'advanced',
  'critical-css-technique':    'advanced',

  // React QnA
  'virtual-dom-purpose':       'core',
  'useeffect-cleanup':         'core',
  'usememo-vs-usecallback':    'core',
  'key-prop-importance':       'core',
  'lifting-state-up':          'core',
  'prop-drilling-solutions':   'core',
  'controlled-forms':          'core',
  'error-boundary-pattern':    'advanced',
  'hooks-not-conditional':     'core',
  'react18-batching':          'advanced',
  'suspense-use-cases':        'advanced',
  'forwardref-pattern':        'advanced',
  'memo-bailout':              'advanced',
  'uselayouteffect-vs-useeffect': 'advanced',
  'server-components-boundaries': 'advanced',
  'react-use-hook':            'advanced',
  'react-concurrent-priority': 'advanced',
  'strict-mode-double-effect': 'advanced',
  'useoptimistic-pattern':     'advanced',
};

// Rename difficulty values: junior→fresher, mid→experienced, senior→expert
function renameDifficulty(content) {
  return content
    .replace(/difficulty: 'junior'/g, "difficulty: 'fresher'")
    .replace(/difficulty: 'mid'/g,    "difficulty: 'experienced'")
    .replace(/difficulty: 'senior'/g, "difficulty: 'expert'");
}

// Add tier + level after the tags line of a SyntaxEntry/ConceptCard entry
function addTierLevel(content, id, tier, level) {
  const idStr = `id: '${id}'`;
  const idPos = content.indexOf(idStr);
  if (idPos === -1) {
    console.warn(`  WARN: id '${id}' not found`);
    return content;
  }

  // Find "tags: [" after the id
  const tagsStr = 'tags: [';
  const tagsPos = content.indexOf(tagsStr, idPos);
  if (tagsPos === -1) {
    console.warn(`  WARN: tags not found for '${id}'`);
    return content;
  }

  // Find end of the tags line
  const tagsLineEnd = content.indexOf('\n', tagsPos);
  if (tagsLineEnd === -1) return content;

  // Skip if already classified
  const snippet = content.substring(tagsLineEnd, tagsLineEnd + 80);
  if (snippet.includes('tier:')) return content;

  const insert = `\n    tier: '${tier}',\n    level: '${level}',`;
  return content.substring(0, tagsLineEnd) + insert + content.substring(tagsLineEnd);
}

// Add tier (only) after tags for QnaItem entries
function addTierOnly(content, id, tier) {
  const idStr = `id: '${id}'`;
  const idPos = content.indexOf(idStr);
  if (idPos === -1) {
    console.warn(`  WARN: id '${id}' not found`);
    return content;
  }

  const tagsStr = 'tags: [';
  const tagsPos = content.indexOf(tagsStr, idPos);
  if (tagsPos === -1) {
    console.warn(`  WARN: tags not found for '${id}'`);
    return content;
  }

  const tagsLineEnd = content.indexOf('\n', tagsPos);
  if (tagsLineEnd === -1) return content;

  const snippet = content.substring(tagsLineEnd, tagsLineEnd + 80);
  if (snippet.includes('tier:')) return content;

  const insert = `\n    tier: '${tier}',`;
  return content.substring(0, tagsLineEnd) + insert + content.substring(tagsLineEnd);
}

function processFile(filePath, type) {
  console.log(`Processing: ${filePath}`);
  let content = readFileSync(filePath, 'utf8');

  if (type === 'qna') {
    content = renameDifficulty(content);
    for (const [id, tier] of Object.entries(QNA_TIER)) {
      content = addTierOnly(content, id, tier);
    }
  } else {
    for (const [id, { tier, level }] of Object.entries(ENTRY_CLASSIFICATION)) {
      content = addTierLevel(content, id, tier, level);
    }
  }

  writeFileSync(filePath, content, 'utf8');
  console.log(`  Done.`);
}

const files = [
  { path: join(dataDir, 'javascript/syntax.ts'),  type: 'entry' },
  { path: join(dataDir, 'javascript/theory.ts'),  type: 'entry' },
  { path: join(dataDir, 'javascript/qna.ts'),     type: 'qna' },
  { path: join(dataDir, 'html/syntax.ts'),         type: 'entry' },
  { path: join(dataDir, 'html/theory.ts'),         type: 'entry' },
  { path: join(dataDir, 'html/qna.ts'),            type: 'qna' },
  { path: join(dataDir, 'css/syntax.ts'),          type: 'entry' },
  { path: join(dataDir, 'css/theory.ts'),          type: 'entry' },
  { path: join(dataDir, 'css/qna.ts'),             type: 'qna' },
  { path: join(dataDir, 'react/syntax.ts'),        type: 'entry' },
  { path: join(dataDir, 'react/theory.ts'),        type: 'entry' },
  { path: join(dataDir, 'react/qna.ts'),           type: 'qna' },
];

for (const { path, type } of files) {
  processFile(path, type);
}

console.log('\nClassification migration complete.');
