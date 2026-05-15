import type { ConceptCard } from '@/types/content';

const jsTheory: ConceptCard[] = [
  {
    id: 'hoisting',
    title: 'Hoisting',
    summary: 'Variable and function declarations are moved to the top of their scope before code executes.',
    body: `Hoisting is JavaScript's behavior of moving declarations to the top of their containing scope during the compilation phase. Only declarations are hoisted — not initializations.

Function declarations are fully hoisted, meaning you can call them before their definition in the source code. var declarations are hoisted and initialized to undefined. let and const are hoisted but not initialized, creating a Temporal Dead Zone (TDZ) — accessing them before their declaration throws a ReferenceError.

Understanding hoisting explains why calling a var-declared variable before assignment gives undefined (not an error), and why function declarations can be invoked anywhere in their scope.`,
    diagram: {
      type: 'ascii',
      content: `Source code order:         After hoisting:
─────────────────          ─────────────────
console.log(x); // ?       var x;            ← declaration hoisted
var x = 5;                 console.log(x);   // undefined
foo();          // works   function foo() {} ← fully hoisted
function foo() {}          foo();
                           x = 5;`,
    },
    tags: ['hoisting', 'var', 'tdz', 'scope'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'event-loop',
    title: 'Event Loop & Call Stack',
    summary: 'JavaScript is single-threaded; the event loop coordinates the call stack, task queue, and microtask queue.',
    body: `JavaScript runs on a single thread with one call stack. When you call a function, it's pushed onto the stack; when it returns, it's popped. Asynchronous operations (setTimeout, fetch, DOM events) hand their callbacks to Web APIs, which push them to a queue when ready.

The event loop continuously checks: if the call stack is empty, it picks the next task from the queue. Microtasks (Promise .then callbacks, queueMicrotask) have their own higher-priority queue that drains completely before the next macrotask runs.

Understanding this explains: why setTimeout(fn, 0) still runs after synchronous code; why Promise callbacks run before setTimeout callbacks; and why long synchronous work blocks the UI.`,
    diagram: {
      type: 'ascii',
      content: `┌─────────────────────┐     ┌─────────────────┐
│     Call Stack      │     │   Web APIs      │
│  [main]             │────>│ setTimeout      │
│  [fetchData]        │     │ fetch           │
└─────────────────────┘     └────────┬────────┘
          ↑                          │
          │  Event Loop              ▼
          │  (if stack empty)  ┌─────────────────┐
          └────────────────────│  Macrotask Queue │
                               │  Microtask Queue │ ← drained first
                               └─────────────────┘`,
    },
    tags: ['event-loop', 'async', 'call-stack', 'microtasks'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'closures',
    title: 'Closures',
    summary: 'A function that retains access to its lexical scope even when executed outside that scope.',
    body: `A closure is formed when a function "closes over" variables from its outer scope. The inner function maintains a reference to those variables, not a copy — so mutations are visible.

Closures are the foundation of data encapsulation in JavaScript. They power module patterns, factory functions, memoization, and event handler state. Every function in JavaScript forms a closure over its surrounding scope.

A common pitfall is the classic loop-with-var bug: var is function-scoped, so all loop iterations close over the same variable. The fix is let (block-scoped) or an IIFE to capture each value.`,
    diagram: {
      type: 'ascii',
      content: `function makeCounter() {
  let count = 0;          ← captured variable
  return {
    inc: () => ++count,   ← closes over count
    get: () => count,     ← closes over count
  };
}
const c = makeCounter();
c.inc(); // count = 1
c.inc(); // count = 2
c.get(); // 2  ← shared count persists`,
    },
    tags: ['closures', 'scope', 'encapsulation', 'lexical-scope'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'prototype-chain',
    title: 'Prototype Chain',
    summary: 'JavaScript objects inherit from other objects through a linked chain of prototypes.',
    body: `Every JavaScript object has an internal [[Prototype]] link to another object (or null). When you access a property, the engine first looks on the object itself, then follows the prototype chain upward until it finds the property or reaches null.

Object.create(proto) sets the prototype explicitly. Constructor functions have a prototype property; instances created with new get their [[Prototype]] set to that object. Class syntax is syntactic sugar over this same mechanism.

The prototype chain enables method sharing without copying: all array instances share methods from Array.prototype, saving memory and enabling patch-once-use-everywhere behavior.`,
    diagram: {
      type: 'ascii',
      content: `dog.__proto__ ──────> Dog.prototype
                          .__proto__ ──> Animal.prototype
                                         .__proto__ ──> Object.prototype
                                                         .__proto__ ──> null`,
    },
    tags: ['prototype', 'inheritance', 'oop', 'proto'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'this-keyword',
    title: 'The `this` Keyword',
    summary: '`this` refers to the execution context — its value depends on how a function is called.',
    body: `Unlike lexical variables, this is determined at call time (not definition time) for regular functions. There are four binding rules, checked in priority order:

1. new binding: called with new → this is the new object.
2. Explicit binding: call/apply/bind → this is the specified object.
3. Implicit binding: called as a method (obj.fn()) → this is obj.
4. Default binding: plain function call → this is undefined (strict) or globalThis.

Arrow functions are the exception: they capture this lexically from their enclosing scope and cannot be rebound — making them ideal for callbacks inside methods.`,
    diagram: {
      type: 'ascii',
      content: `Call form              this value
─────────────────────  ──────────────────
fn()                   undefined (strict)
obj.fn()               obj
fn.call(ctx)           ctx
new Fn()               new object
() => ...              outer 'this' (lexical)`,
    },
    tags: ['this', 'context', 'binding', 'arrow-functions'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'lexical-scope',
    title: 'Lexical Scope & Scope Chain',
    summary: 'Scope is determined by where code is written, not where it runs.',
    body: `JavaScript uses lexical (static) scoping: the scope of a variable is determined by its position in the source code. Functions create new scopes; blocks (if/for/while) create scopes with let/const.

When the engine looks up a variable, it starts in the current scope and walks outward through the scope chain until it finds a binding or reaches the global scope. This chain is established at write time, not run time.

Scope chain explains why inner functions can access outer variables but not vice versa, and why closures work across function calls — the chain is preserved in the closure's environment record.`,
    tags: ['scope', 'lexical-scope', 'scope-chain', 'variables'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'garbage-collection',
    title: 'Garbage Collection',
    summary: 'JavaScript automatically reclaims memory using mark-and-sweep — collect what is unreachable.',
    body: `JavaScript engines use automatic memory management. The most common algorithm is mark-and-sweep: the GC starts from roots (global variables, current call stack), marks everything reachable, then sweeps away anything unmarked.

Memory leaks occur when references are unintentionally kept alive: forgotten event listeners, closures holding large data structures, detached DOM nodes still referenced in JS, and long-lived caches without eviction policies.

WeakMap and WeakSet help avoid leaks: their keys/values are held weakly, so objects can be garbage-collected even if they appear in a WeakMap. Useful for storing metadata keyed by DOM nodes or objects without preventing cleanup.`,
    tags: ['garbage-collection', 'memory', 'weakmap', 'performance'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'event-bubbling',
    title: 'Event Bubbling & Delegation',
    summary: 'DOM events bubble up from the target to the root; delegation leverages this to handle events on many elements with one listener.',
    body: `When a DOM event fires, it travels in three phases: capture (window down to target), target, and bubble (target back up to window). Most event listeners use the bubbling phase.

Event delegation takes advantage of bubbling: attach one listener to a parent element and inspect event.target to determine which child triggered the event. This is more efficient than attaching listeners to every child, and handles dynamically added elements automatically.

Use event.stopPropagation() to stop bubbling, and event.preventDefault() to prevent the browser's default behavior (like form submission or link navigation). These are independent — you often need only one.`,
    diagram: {
      type: 'ascii',
      content: `Click on <li>:
  window
    └─ document (capture ↓)
         └─ <ul>  (capture ↓)
              └─ <li> ← TARGET
              └─ <ul>  (bubble ↑)
         └─ document (bubble ↑)
    └─ window

// Delegation pattern
ul.addEventListener('click', (e) => {
  if (e.target.matches('li')) handle(e.target);
});`,
    },
    tags: ['events', 'bubbling', 'delegation', 'dom'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'currying',
    title: 'Currying & Partial Application',
    summary: 'Currying transforms a multi-argument function into a sequence of single-argument functions.',
    body: `A curried function takes one argument and returns a function waiting for the next. This enables partial application — fixing some arguments in advance and reusing the result with different final arguments.

Currying is common in functional programming pipelines, configuration factories, and middleware patterns. Libraries like Ramda and lodash/fp curry all their functions automatically.

Partial application is slightly different: you fix some (not necessarily one-at-a-time) arguments using Function.prototype.bind or a helper. Both techniques improve reusability and composability.`,
    diagram: {
      type: 'ascii',
      content: `// Curried add
const add = a => b => a + b;
const add5 = add(5);   // partial application
add5(3);               // 8
add5(10);              // 15

// Auto-curry utility
const multiply = curry((a, b, c) => a * b * c);
multiply(2)(3)(4);  // 24
multiply(2, 3)(4);  // 24
multiply(2)(3, 4);  // 24`,
    },
    tags: ['currying', 'partial-application', 'functional', 'higher-order'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'pure-functions',
    title: 'Pure Functions & Immutability',
    summary: 'Pure functions always return the same output for the same input and have no side effects.',
    body: `A pure function has two properties: determinism (same inputs always produce the same output) and no side effects (does not modify external state, make API calls, or read from global variables).

Pure functions are predictable, testable, and safe to memoize. Referential transparency — substituting a call with its return value without changing behavior — only holds for pure functions.

Immutability complements purity: instead of mutating data, produce new values. This makes state changes explicit and traceable, and is foundational to React's rendering model and Redux state management. Use spread syntax, Object.assign, or libraries like Immer for ergonomic immutable updates.`,
    tags: ['pure-functions', 'immutability', 'functional', 'side-effects'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'memory-management',
    title: 'Memory Management & Leaks',
    summary: 'V8 uses mark-and-sweep GC; leaks occur when references are unintentionally kept alive.',
    body: `JavaScript's V8 engine manages memory automatically. The heap stores objects; the stack stores primitives and references. The garbage collector (GC) uses mark-and-sweep: starting from GC roots (global variables, call stack), it marks everything reachable, then frees everything unmarked.

Common leak sources: (1) Forgotten event listeners — adding listeners without removing them when the element is destroyed keeps the element and its closure alive. (2) Closures over large data — an inner function referenced anywhere keeps its entire outer scope alive. (3) Detached DOM nodes — removed from the DOM tree but still referenced in JS. (4) Unbounded caches — Maps/arrays that grow forever. (5) Accidental globals — assignments without let/const create properties on window.

WeakMap and WeakRef allow objects to be GC'd even while referenced: WeakMap keys are held weakly, so when no other reference to the key exists, the entry is eligible for collection. Useful for DOM-keyed metadata and computed-value caches.`,
    diagram: {
      type: 'ascii',
      content: `Reachable (NOT collected):      Unreachable (collected):
────────────────────────        ────────────────────────
window.myData = bigArray  ←→    let temp = bigArray;
                                temp = null;  // GC can collect

Leak pattern:
  el.addEventListener('click', handler);
  el.remove(); // removed from DOM
  // handler closure keeps el alive if handler references el!`,
    },
    tags: ['memory', 'garbage-collection', 'leaks', 'weakmap', 'performance'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'v8-optimization',
    title: 'V8 Optimization: Hidden Classes & JIT',
    summary: 'V8 compiles JS to machine code via JIT; hidden classes make property access as fast as C++ structs.',
    body: `V8 doesn't interpret JavaScript — it compiles it to native machine code using Just-In-Time (JIT) compilation. The compiler optimizes "hot" code paths (frequently executed code) using speculative optimization: it assumes observed patterns hold (e.g., "this function always receives a number") and compiles fast code. If the assumption breaks (deoptimization), it falls back to slower unoptimized code.

Hidden classes (called "shapes" or "maps" internally) are V8's way of treating JS objects like typed C++ structs. When you create objects with the same property layout in the same order, they share a hidden class, enabling pointer-based property access rather than hash-table lookup.

Deoptimization triggers: adding properties after construction, mixing types for the same property, using delete (leaves holes), polymorphic functions called with many different object shapes.`,
    diagram: {
      type: 'ascii',
      content: `// Same hidden class (fast):
const a = { x: 1, y: 2 };
const b = { x: 3, y: 4 };

// Different hidden classes (slower):
const c = { x: 1 };
c.y = 2;         // transitions to new hidden class
const d = { y: 2, x: 1 }; // different insertion order = different class

// Monomorphic (fast) vs Polymorphic (slower):
function add(a, b) { return a + b; }
add(1, 2);         // number + number — monomorphic
add('a', 'b');     // string + string — now polymorphic`,
    },
    tags: ['v8', 'jit', 'hidden-classes', 'performance', 'optimization'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'observer-pattern',
    title: 'Observer / Pub-Sub Pattern',
    summary: 'Decouple producers from consumers using a subscription model — the foundation of event systems and reactivity.',
    body: `The Observer pattern defines a one-to-many dependency: when one object (the subject/publisher) changes state, all registered observers (subscribers) are notified automatically. This decouples producers from consumers — the publisher doesn't know who's listening.

JavaScript's DOM event system (addEventListener/removeEventListener) is a built-in implementation. Libraries implement variants: Node.js EventEmitter, RxJS Observables, Vue's reactivity system via Proxy, and Redux's store subscriptions.

The Pub/Sub variation adds an event bus between publisher and subscriber, so they don't even share a reference. This is used in micro-frontend architectures where modules must communicate without tight coupling.`,
    diagram: {
      type: 'ascii',
      content: `class EventEmitter {
  #listeners = new Map();

  on(event, fn)  { (this.#listeners.get(event) ?? this.#listeners
                   .set(event, []).get(event)).push(fn); }
  off(event, fn) { /* filter out fn */ }
  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(fn => fn(...args));
  }
}

const bus = new EventEmitter();
bus.on('data', (d) => console.log(d));
bus.emit('data', { id: 1 }); // → { id: 1 }`,
    },
    tags: ['observer', 'pub-sub', 'events', 'patterns', 'reactive'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'async-evolution',
    title: 'Async Patterns: Callbacks → Promises → Async/Await',
    summary: 'JavaScript asynchrony evolved from callback hell through Promises to async/await — each solving the previous pattern\'s problems.',
    body: `Callbacks were the original async pattern. A function accepts a callback to run when async work completes. Problem: deeply nested callbacks ("callback hell") make code hard to read and error paths hard to handle consistently.

Promises represent a future value. They're chainable (.then/.catch/.finally), eliminating nesting. Errors propagate down the chain automatically. Promise.all, Promise.race, and Promise.allSettled enable concurrent patterns.

Async/await is syntactic sugar over Promises — it lets you write async code that reads like synchronous code. Under the hood, an async function always returns a Promise, and await pauses execution until the Promise resolves. Error handling uses familiar try/catch.

Key insight: these are all still the same event loop / Promise machinery. Async/await just makes it more readable. Mixing them is fine — you can await a .then() chain or return a Promise from an async function.`,
    diagram: {
      type: 'ascii',
      content: `// Callback hell
getData(url, (err, data) => {
  if (err) handle(err);
  process(data, (err2, result) => {
    if (err2) handle(err2);
    save(result, (err3) => { ... });
  });
});

// Promise chain — flat
getData(url)
  .then(process)
  .then(save)
  .catch(handleError);

// Async/await — reads like sync
try {
  const data   = await getData(url);
  const result = await process(data);
  await save(result);
} catch (err) { handleError(err); }`,
    },
    tags: ['async', 'callbacks', 'promises', 'async-await', 'event-loop'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'type-coercion-system',
    title: 'Type Coercion & Type Conversion',
    summary: 'JavaScript silently converts types in many expressions — understanding the rules prevents subtle bugs.',
    body: `JavaScript has two kinds of type change: implicit coercion (automatic, by the engine) and explicit conversion (intentional, by the programmer).

Implicit coercion: happens in comparisons (==), arithmetic (+, -, *, /), boolean contexts (if, &&, ||), template literals. The + operator is especially tricky — if either operand is a string, it concatenates instead of adding.

Explicit conversion: Number(), String(), Boolean(), parseInt(), parseFloat(). These are predictable.

Boolean coercion: falsy values are 0, -0, 0n, '', null, undefined, NaN — everything else is truthy (including empty arrays [], empty objects {}, '0', and 'false').

Abstract Equality (==) algorithm: if types differ, coerce to numbers then compare. This is why 0 == false, '' == false, null == undefined (special case).`,
    diagram: {
      type: 'ascii',
      content: `Falsy values:          Truthy (everything else):
─────────────────      ──────────────────────────
0, -0, 0n              1, -1, 0.1
''                     'false', '0', ' '
null                   [], {}
undefined              new Date()
NaN                    Infinity, -Infinity
false

Coercion table (+):
1 + '2'  = '12'   (number + string = string)
'1' - 2  = -1     (subtraction always numeric)
+'5'     = 5      (unary + converts to number)
+true    = 1
+false   = 0
+null    = 0
+undefined = NaN`,
    },
    tags: ['coercion', 'types', 'equality', 'boolean', 'falsy'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'functional-programming-concepts',
    title: 'Functional Programming in JavaScript',
    summary: 'FP treats computation as evaluation of pure functions, avoiding shared state and mutable data.',
    body: `Key FP concepts in JavaScript:

Pure functions: same inputs → same output, no side effects. Easy to test, memoize, and parallelize.

Immutability: never mutate data in place. Always produce new values. JavaScript arrays and objects are mutable by default — use spread, map, filter, reduce to create new values.

Higher-order functions (HOF): functions that take or return other functions. map, filter, reduce are HOFs. This enables composition.

Function composition: combine small pure functions into larger ones. f(g(x)) — the output of g is the input of f. Libraries like Ramda provide compose/pipe utilities.

Currying and partial application: transform multi-arg functions into sequences of single-arg functions. Enables specialization (const double = multiply(2)) and point-free style.

JavaScript isn't purely functional — it has mutable data, loops, and side effects. But these FP principles applied selectively lead to more predictable, testable code.`,
    diagram: {
      type: 'ascii',
      content: `// Composition: f(g(x))
const trim     = s => s.trim();
const toLower  = s => s.toLowerCase();
const slugify  = s => s.replace(/\s+/g, '-');

// Imperative
function makeSlug(s) {
  return slugify(toLower(trim(s)));
}

// Composed (pipe = left-to-right compose)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const makeSlug = pipe(trim, toLower, slugify);

makeSlug('  Hello World  '); // 'hello-world'`,
    },
    tags: ['functional', 'pure-functions', 'immutability', 'composition', 'currying', 'hof'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'modules-commonjs-vs-esm',
    title: 'Module Systems: CommonJS vs ESM',
    summary: 'Two module systems co-exist in JavaScript — CommonJS (Node.js) and ESM (standard) — with important semantic differences.',
    body: `CommonJS (require/module.exports): synchronous, loads modules at runtime. Used in Node.js historically. module.exports is a plain object — you can add properties dynamically. require() can appear anywhere (inside if blocks, functions). Modules are cached after first load.

ESM (import/export): asynchronous, statically analyzed at parse time. The import graph is resolved before any code runs. This enables tree shaking. Imports are live bindings — if the exporting module updates a binding, the import sees the change. import() is the async dynamic form.

Key differences: ESM is always strict mode. ESM has no __dirname, __filename (use import.meta.url). ESM can't use require(). Dual packages expose both .cjs and .mjs entry points.

Node.js supports both: files ending in .mjs use ESM; .cjs use CommonJS. package.json "type": "module" makes .js files default to ESM.`,
    diagram: {
      type: 'ascii',
      content: `CommonJS:                     ESM:
─────────────────────         ─────────────────────
Synchronous require()         Asynchronous (parse-time)
Runtime resolution            Static analysis (tree-shakeable)
Cached exports object         Live bindings
require() anywhere            import only at top level*
module.exports = value        export / export default
No __dirname in ESM           import.meta.url, import.meta.dirname
Works in Node.js by default   "type":"module" or .mjs

* dynamic import() is async and can go anywhere`,
    },
    tags: ['modules', 'commonjs', 'esm', 'require', 'import', 'node'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'performance-measurement',
    title: 'JavaScript Performance Measurement & Optimization',
    summary: 'Measure before optimizing — the browser DevTools and Performance API expose exactly where time is spent.',
    body: `Never optimize without profiling first. Premature optimization wastes time and adds complexity.

Browser DevTools Performance panel: records a trace of everything — JS execution, layout, paint, composite. Look for long tasks (>50ms) on the main thread, which block user input.

Performance API: window.performance.mark/measure lets you create precise timestamps around your own code. performance.now() is a high-resolution timer.

Common JS bottlenecks: (1) Long synchronous tasks blocking the main thread — break them up with scheduler.yield() or setTimeout(0). (2) Forced reflows — reading layout properties (offsetWidth) after DOM writes forces synchronous layout calculation. (3) Memory leaks — growing heap indicates objects aren't being GC'd. (4) Too many re-allocations — creating many short-lived objects in hot paths pressures the GC.

Web Workers: move heavy computation off the main thread entirely. The main thread stays responsive.`,
    diagram: {
      type: 'ascii',
      content: `Performance API usage:
performance.mark('start');
doExpensiveWork();
performance.mark('end');
performance.measure('work', 'start', 'end');
const [entry] = performance.getEntriesByName('work');
console.log(entry.duration + 'ms');

Long task detection (PerformanceObserver):
new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    console.warn('Long task:', entry.duration.toFixed(1) + 'ms');
  });
}).observe({ type: 'longtask', buffered: true });`,
    },
    tags: ['performance', 'profiling', 'devtools', 'long-tasks', 'measurement'],
    tier: 'advanced',
    level: 'expert',
  },
];

export default jsTheory;
