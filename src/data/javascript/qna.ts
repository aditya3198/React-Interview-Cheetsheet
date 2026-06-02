import type { QnaItem } from '@/types/content';

const jsQna: QnaItem[] = [
  {
    id: 'var-let-const-diff',
    question: 'What are the differences between var, let, and const?',
    answer: `var is function-scoped and hoisted (initialized to undefined). let and const are block-scoped and enter a Temporal Dead Zone (TDZ) until their declaration — accessing them before that line throws a ReferenceError. const requires initialization and prevents rebinding, but does not make objects or arrays deeply immutable.`,
    codeExample: `function test() {
  console.log(x); // undefined (hoisted)
  var x = 5;

  // console.log(y); // ReferenceError (TDZ)
  let y = 10;

  const arr = [1, 2];
  arr.push(3);    // OK — contents mutable
  // arr = [];    // TypeError — binding immutable
}`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['variables', 'scope', 'hoisting', 'tdz'],
    tier: 'core',
  },
  {
    id: 'double-vs-triple-equals',
    question: 'What is the difference between == and ===?',
    answer: `=== (strict equality) checks value AND type with no coercion. == (loose equality) performs type coercion before comparing, following complex rules that produce surprising results. Always prefer === unless you explicitly need loose comparison (rare). Notable gotchas: null == undefined is true, but null === undefined is false.`,
    codeExample: `0 == '0'   // true  (string coerced to number)
0 === '0'  // false (different types)

null == undefined  // true
null === undefined // false

false == ''  // true  (both coerce to 0)
false === '' // false`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['equality', 'coercion', 'operators'],
    tier: 'core',
  },
  {
    id: 'explain-closures',
    question: 'What is a closure and when would you use one?',
    answer: `A closure is a function that retains access to its outer (lexical) scope's variables even after the outer function has returned. The inner function doesn't copy those variables — it holds a live reference. Closures enable data encapsulation, factory functions, memoization, and stateful callbacks without classes.`,
    codeExample: `function makeCounter(initial = 0) {
  let count = initial; // private state
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const c = makeCounter(10);
c.increment(); // 11
c.increment(); // 12
c.value();     // 12 — count persists`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['closures', 'scope', 'encapsulation'],
    tier: 'core',
  },
  {
    id: 'event-loop-explanation',
    question: 'How does the JavaScript event loop work?',
    answer: `JavaScript is single-threaded with one call stack. Async operations (setTimeout, fetch, I/O) are handled by Web APIs that push callbacks to queues when done. The event loop checks: if the call stack is empty, pull from the microtask queue (Promise callbacks) first — draining it completely — then pull one macrotask (setTimeout callbacks, events). This is why Promise .then runs before setTimeout even with the same delay.`,
    codeExample: `console.log('1');

setTimeout(() => console.log('2'), 0); // macrotask

Promise.resolve().then(() => console.log('3')); // microtask

console.log('4');

// Output: 1, 4, 3, 2`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['event-loop', 'async', 'microtasks', 'macrotasks'],
    tier: 'advanced',
  },
  {
    id: 'this-arrow-vs-regular',
    question: 'How does `this` behave differently in arrow functions vs regular functions?',
    answer: `Regular functions have their own this, determined by how they're called (method call, explicit binding, new, or default). Arrow functions have no own this — they capture this lexically from the enclosing scope at definition time and cannot be rebound with call/apply/bind. This makes arrows ideal for callbacks inside methods but inappropriate for object methods or constructors.`,
    codeExample: `const obj = {
  name: 'Alice',
  greetRegular: function() { return this.name; },   // 'Alice'
  greetArrow: () => this?.name,                     // undefined (outer this)
};

class Timer {
  constructor() { this.ticks = 0; }
  start() {
    // Arrow captures Timer's 'this'
    setInterval(() => this.ticks++, 1000);
  }
}`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['this', 'arrow-functions', 'context'],
    tier: 'core',
  },
  {
    id: 'promise-all-vs-allsettled',
    question: 'What is the difference between Promise.all and Promise.allSettled?',
    answer: `Promise.all runs promises concurrently and resolves with an array of values when ALL resolve — but short-circuits and rejects immediately if ANY promise rejects. Promise.allSettled also runs concurrently and always resolves (never rejects) with an array of result objects, each with a status ('fulfilled' or 'rejected') and value/reason. Use allSettled when you need results from all attempts regardless of individual failures.`,
    codeExample: `// Promise.all — fails fast
try {
  const [a, b] = await Promise.all([p1, p2]);
} catch (err) { /* any rejection reaches here */ }

// Promise.allSettled — inspect each result
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error(r.reason);
});`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['promises', 'async', 'concurrency'],
    tier: 'core',
  },
  {
    id: 'async-await-error-handling',
    question: 'What are the correct ways to handle errors in async/await?',
    answer: `Use try/catch/finally around await expressions — this catches both rejected promises and synchronous errors inside the block. Alternatively, chain .catch() on the awaited promise for targeted catching. Avoid letting errors propagate silently. For parallel operations, handle errors inside Promise.allSettled or per-promise .catch before passing to Promise.all.`,
    codeExample: `async function loadUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    if (err instanceof NetworkError) retry();
    else throw err; // re-throw unknown errors
  } finally {
    setLoading(false); // always runs
  }
}

// Targeted .catch per promise
const user = await fetchUser(id).catch(() => null);`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['async', 'errors', 'try-catch'],
    tier: 'core',
  },
  {
    id: 'prototypal-inheritance',
    question: 'How does prototypal inheritance work in JavaScript?',
    answer: `Every object has an internal [[Prototype]] link. When you access a property, the engine searches the object itself, then follows the chain of [[Prototype]] links until the property is found or the chain ends at null. Classes are syntactic sugar: extends sets up the prototype chain, super calls the parent constructor or method. Object.create(proto) creates an object with the given prototype.`,
    codeExample: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a noise.\`; }
}

class Dog extends Animal {
  speak() { return \`\${this.name} barks.\`; }
}

const d = new Dog('Rex');
d.speak();            // "Rex barks."
d instanceof Animal;  // true
Object.getPrototypeOf(d) === Dog.prototype; // true`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['prototype', 'inheritance', 'classes'],
    tier: 'advanced',
  },
  {
    id: 'shallow-vs-deep-copy',
    question: 'What is the difference between shallow copy and deep copy?',
    answer: `A shallow copy creates a new top-level object but nested objects are still shared references. Mutating a nested object in the copy affects the original. A deep copy recursively clones all levels so the copy is fully independent. For simple cases, use structuredClone() (native, deep). For shallow copies, use spread ({ ...obj }) or Object.assign.`,
    codeExample: `const original = { a: 1, b: { c: 2 } };

// Shallow copy — nested object is shared
const shallow = { ...original };
shallow.b.c = 99;
original.b.c; // 99 — mutated!

// Deep copy (ES2022+)
const deep = structuredClone(original);
deep.b.c = 99;
original.b.c; // 2 — untouched`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['objects', 'copy', 'immutability'],
    tier: 'core',
  },
  {
    id: 'weakmap-use-case',
    question: 'When would you use WeakMap instead of Map?',
    answer: `Use WeakMap when you want to associate metadata with an object without preventing garbage collection. WeakMap keys must be objects (or registered Symbols in ES2024) and are held weakly — if no other reference to the key exists, the entry can be GC'd. Common use cases: storing private data per DOM node, caching computations keyed by object identity, tracking event listener state. Unlike Map, WeakMap is not iterable and has no size property.`,
    codeExample: `const cache = new WeakMap();

function process(element) {
  if (cache.has(element)) return cache.get(element);
  const result = expensiveCompute(element);
  cache.set(element, result);
  return result;
}
// When 'element' is removed from DOM and dereferenced,
// the WeakMap entry is automatically eligible for GC`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['weakmap', 'garbage-collection', 'memory'],
    tier: 'advanced',
  },
  {
    id: 'memory-leaks',
    question: 'What are common sources of memory leaks in JavaScript?',
    answer: `Common leak sources: (1) Forgotten event listeners — attaching listeners without removing them when the element or component is destroyed. (2) Closures holding large data — an inner function referenced long-term keeps its entire outer scope alive. (3) Detached DOM nodes — removing elements from the DOM but keeping JS references to them. (4) Global variables — accidentally creating globals (missing let/const) that persist forever. (5) Unbounded caches — Maps or arrays that grow indefinitely. Tools: Chrome DevTools Memory panel, heap snapshots, and detached DOM search.`,
    codeExample: `// Leak: listener never removed
function setup(el) {
  el.addEventListener('click', handler); // retained if el is removed from DOM
}

// Fix: cleanup
function setup(el) {
  el.addEventListener('click', handler);
  return () => el.removeEventListener('click', handler);
}

// Leak: closure retaining large buffer
function createLeak() {
  const bigData = new Uint8Array(10_000_000);
  return () => bigData[0]; // bigData never freed
}`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['memory-leaks', 'garbage-collection', 'performance'],
    tier: 'advanced',
  },
  {
    id: 'debounce-throttle',
    question: 'What is the difference between debounce and throttle?',
    answer: `Debounce delays execution until a specified idle time has passed after the last call — useful for search inputs where you want to wait until the user stops typing. Throttle ensures the function is called at most once in a given time window regardless of how many times it's triggered — useful for scroll/resize events where you need periodic updates but not every single event.`,
    codeExample: `// Debounce — fires AFTER user stops for 300ms
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle — fires at most once per 300ms
function throttle(fn, limit) {
  let lastRan = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRan >= limit) {
      lastRan = now;
      fn(...args);
    }
  };
}`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['debounce', 'throttle', 'performance', 'events'],
    tier: 'advanced',
  },
  {
    id: 'type-coercion-gotchas',
    question: 'What are common JavaScript type coercion gotchas?',
    answer: `JS will silently coerce types in many contexts. The + operator is addition for numbers but string concatenation if either operand is a string. Comparison with == triggers coercion. Boolean contexts coerce 0, '', null, undefined, NaN, and false to false (everything else truthy). The typeof null is 'object' (historical bug). Array + Array, {} + [] produce surprising results due to coercion rules.`,
    codeExample: `'5' + 3        // '53'  — string concat
'5' - 3        // 2     — numeric subtraction
+'5'           // 5     — unary + coerces to number

true + true    // 2
[] + []        // ''
[] + {}        // '[object Object]'
{} + []        // 0 (in REPL — {} parsed as block)

typeof null    // 'object' (not 'null'!)
null == undefined // true
NaN === NaN    // false (use Number.isNaN)`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['coercion', 'types', 'gotchas'],
    tier: 'core',
  },
  {
    id: 'immutability-patterns',
    question: 'How do you implement immutable data updates in JavaScript?',
    answer: `Since const only prevents rebinding (not mutation), you must use copy-on-write patterns. For objects: spread or Object.assign. For arrays: spread, map, filter, slice, concat — never push/pop/splice on the original. For deeply nested structures, use structuredClone for one-off copies or a library like Immer for ergonomic nested updates. React relies on immutable updates to detect state changes efficiently.`,
    codeExample: `// Object update
const next = { ...state, count: state.count + 1 };

// Array append
const next = [...items, newItem];

// Array update at index
const next = items.map((item, i) => i === idx ? updated : item);

// Array remove
const next = items.filter(item => item.id !== id);

// Nested update (without Immer)
const next = {
  ...state,
  user: { ...state.user, name: 'Bob' },
};`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['immutability', 'state', 'patterns'],
    tier: 'core',
  },
  {
    id: 'generator-use-cases',
    question: 'What are practical use cases for generator functions?',
    answer: `Generators are useful for: (1) Infinite sequences — produce values on demand without pre-computing everything. (2) Lazy evaluation — defer work until the consumer asks for the next value. (3) Custom iterables — make any data structure work with for...of and spread. (4) Cooperative multitasking — the async/await mechanism was originally built on generators. (5) Paginated data fetching — async generators that yield pages from an API until exhausted.`,
    codeExample: `// Infinite ID generator
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
const nextId = idGenerator();
nextId.next().value; // 1
nextId.next().value; // 2

// Lazy range
function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
const total = [...range(1, 100)].reduce((a, b) => a + b, 0);`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['generators', 'iterators', 'lazy-evaluation'],
    tier: 'advanced',
  },
  {
    id: 'event-delegation-benefits',
    question: 'What are the benefits of event delegation?',
    answer: `Event delegation attaches a single listener to a parent element and uses event.target to determine which child triggered the event. Benefits: (1) Memory efficiency — one listener instead of N listeners. (2) Dynamic elements — works for elements added after the listener was attached. (3) Less setup/teardown — no need to add/remove listeners as children change. The tradeoff is slightly more complex handler logic and that stopPropagation in a child will break delegation.`,
    codeExample: `// Without delegation — O(n) listeners
items.forEach(item => {
  item.addEventListener('click', handleClick);
});

// With delegation — 1 listener
list.addEventListener('click', (e) => {
  const item = e.target.closest('[data-id]');
  if (!item) return;
  handleClick(item.dataset.id);
});`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['events', 'delegation', 'performance', 'dom'],
    tier: 'core',
  },
  {
    id: 'symbol-use-cases',
    question: 'What are practical use cases for Symbol?',
    answer: `Symbols are unique, non-enumerable values. Use cases: (1) Collision-free object keys — multiple libraries can add their own Symbol properties to shared objects without colliding. (2) Constants — guaranteed unique values for enum-like patterns. (3) Well-known Symbols — customize JS behavior (Symbol.iterator, Symbol.toPrimitive, Symbol.hasInstance). (4) Private-ish properties — Symbol keys don't appear in for...in or Object.keys (use Object.getOwnPropertySymbols to find them).`,
    codeExample: `// Collision-free metadata
const LIB_META = Symbol('libMeta');
element[LIB_META] = { version: 2 }; // won't collide with other libs

// Enum-like constants
const Direction = {
  UP: Symbol('UP'),
  DOWN: Symbol('DOWN'),
};

// Custom iterator
class Range {
  [Symbol.iterator]() { /* ... */ }
}
[...new Range(1, 5)]; // [1, 2, 3, 4, 5]`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['symbol', 'meta-programming', 'iterators'],
    tier: 'advanced',
  },
  {
    id: 'scope-chain-closure-bug',
    question: 'How do you fix the classic "loop closure" bug?',
    answer: `The classic bug: using var in a for loop creates one shared variable across all iterations. All callbacks close over the same variable, which has the final value by the time they run. Fix options: (1) Use let — creates a new binding per iteration. (2) Use an IIFE to capture the current value. (3) Use array methods (forEach, map) which naturally create a new scope per call. let is the modern idiomatic fix.`,
    codeExample: `// Bug — all log '5'
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}

// Fix 1: let — new binding per iteration
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100); // 0,1,2,3,4
}

// Fix 2: IIFE captures value
for (var i = 0; i < 5; i++) {
  ((j) => setTimeout(() => console.log(j), 100))(i);
}`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['closures', 'scope', 'var', 'let', 'loops'],
    tier: 'core',
  },
  {
    id: 'proxy-reflect-use',
    question: 'What is Proxy and when would you use it?',
    answer: `Proxy wraps an object and intercepts fundamental operations (get, set, has, deleteProperty, apply, etc.) via handler traps. Reflect provides the default implementations for those operations. Use cases: runtime validation, observable objects (Vue 3's reactivity system), access logging/profiling, API mocking, default property values, and sandboxing. The overhead is measurable — avoid Proxy in hot paths.`,
    codeExample: `// Validation
const validated = new Proxy({}, {
  set(target, prop, value) {
    if (prop === 'age' && !Number.isInteger(value))
      throw new TypeError('age must be integer');
    return Reflect.set(target, prop, value);
  },
});

// Observable (simplified Vue 3 pattern)
function reactive(obj) {
  return new Proxy(obj, {
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      triggerUpdate(key);
      return result;
    },
  });
}`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['proxy', 'reflect', 'meta-programming'],
    tier: 'advanced',
  },
  {
    id: 'async-iteration',
    question: 'What is async iteration and when would you use it?',
    answer: `Async iteration (for await...of) works with objects that implement the async iterable protocol (Symbol.asyncIterator). It awaits each value before moving to the next. Use cases: reading from Node.js streams, paginating API results, processing files line-by-line, consuming async generators. Unlike Promise.all, async iteration processes items sequentially, which is useful when order matters or parallel processing would be too aggressive.`,
    codeExample: `async function* paginate(baseUrl) {
  let page = 1;
  while (true) {
    const res = await fetch(\`\${baseUrl}?page=\${page++}\`);
    const items = await res.json();
    if (!items.length) return;
    yield items;
  }
}

async function loadAll() {
  for await (const page of paginate('/api/posts')) {
    processPage(page);
  }
}`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['async', 'generators', 'iterators', 'streams'],
    tier: 'advanced',
  },
  {
    id: 'v8-optimization-qna',
    question: 'How does V8 optimize JavaScript, and what code patterns hurt performance?',
    answer: `V8 compiles JavaScript to native machine code via JIT (Just-In-Time) compilation. It profiles hot code paths and applies speculative optimizations based on observed types. If those assumptions break (deoptimization), V8 falls back to slower code.

Hidden classes: V8 treats objects like C++ structs when properties are consistently initialized in the same order. Same layout → same hidden class → fast pointer-based access instead of hash-table lookup.

Deoptimization triggers: (1) Polymorphic functions — calling fn with different argument types. (2) Deleting properties — leaves sparse shapes. (3) Adding properties outside the constructor — breaks expected hidden class. (4) Mixed types in arrays — V8 can't use a typed array optimization.

Practical rules: initialize all object properties in the constructor, maintain consistent argument types for hot functions, prefer dense arrays, avoid delete.`,
    codeExample: `// BAD: different insertion order = different hidden class
const a = { x: 1, y: 2 };
const b = { y: 2, x: 1 }; // separate hidden class

// GOOD: consistent property order
function Point(x, y) {
  this.x = x; // always x first
  this.y = y;
}

// BAD: polymorphic (deoptimizes add())
add(1, 2);     // int + int
add('a', 'b'); // string + string → V8 gives up specializing

// BAD: delete leaves holes
delete obj.prop; // use obj.prop = undefined instead`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['v8', 'jit', 'hidden-classes', 'performance', 'optimization'],
    tier: 'advanced',
  },
  {
    id: 'design-patterns-js',
    question: 'What JavaScript design patterns should every senior engineer know?',
    answer: `Key patterns with real-world applications:

Module pattern: Use ES modules (import/export). For encapsulation in non-module contexts, IIFEs create private scope.

Singleton: Ensure one instance. In Node.js, module caching makes any exported object a singleton. In React, a module-level Zustand store is a singleton.

Observer/Pub-Sub: Decouple producers and consumers. DOM events, EventEmitter, RxJS, Redux's store.subscribe are all observer implementations.

Factory: Create objects without specifying exact class. React.createElement, document.createElement.

Strategy: Swap algorithms at runtime. Sort comparison functions, validation rule arrays, middleware chains.

Proxy: Intercept operations on an object. Vue 3 reactivity, input validation, API mocking.

Decorator: Add behavior without modifying the original. Higher-order functions in React (withAuth HOC), class decorators in TypeScript frameworks.`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['design-patterns', 'module', 'observer', 'singleton', 'factory', 'strategy'],
    tier: 'advanced',
  },
  // ─── Fresher additions ───────────────────────────────────────────────────
  {
    id: 'array-higher-order-methods',
    question: 'What do map, filter, and reduce do, and how do they differ?',
    answer: `All three are non-mutating Array methods that return a new value.

map transforms every element and returns a new array of the same length. Use it to convert data.

filter tests each element against a predicate and returns a new array of only the matching elements (length ≤ original).

reduce accumulates all elements into a single value — an object, number, string, or even another array. It's the most general but also the most complex.

None of these mutate the original array. They're chainable, which enables a clean pipeline style.`,
    codeExample: `const products = [
  { name: 'Apple', price: 1.2, inStock: true },
  { name: 'Mango', price: 2.5, inStock: false },
  { name: 'Grape', price: 3.0, inStock: true },
];

// map — transform to display strings
const labels = products.map(p => \`\${p.name}: $\${p.price}\`);
// ['Apple: $1.2', 'Mango: $2.5', 'Grape: $3']

// filter — only in-stock
const available = products.filter(p => p.inStock);
// [{name:'Apple',...}, {name:'Grape',...}]

// reduce — sum of in-stock prices
const total = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0); // 4.2`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['array', 'map', 'filter', 'reduce', 'functional'],
    tier: 'core',
  },
  {
    id: 'destructuring-assignment',
    question: 'How does destructuring assignment work in JavaScript?',
    answer: `Destructuring extracts values from arrays or properties from objects into named variables in a single statement.

Array destructuring unpacks by position — use commas to skip elements.

Object destructuring unpacks by property name — you can rename with a colon, set defaults with =, and use rest (...) to collect remaining keys.

Destructuring can be nested for deep extraction. Function parameters can be destructured directly, which is common in React component props.`,
    codeExample: `// Object destructuring
const { name, age = 18, address: { city } } = user;

// Rename + default
const { firstName: first = 'Anonymous' } = user;

// Array destructuring
const [head, , third] = [1, 2, 3]; // skip second

// Rest
const { id, ...rest } = user; // rest has everything except id

// Function parameter destructuring
function greet({ name, role = 'user' }) {
  return \`Hello \${name} (\${role})\`;
}

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['destructuring', 'es6', 'objects', 'arrays'],
    tier: 'core',
  },
  {
    id: 'spread-rest-operators',
    question: 'What is the difference between spread (...) and rest parameters?',
    answer: `The ... syntax has two opposite uses depending on context.

Spread expands an iterable (array, string, Set) or object into individual elements. Use it to clone arrays/objects, merge them, or pass array items as individual function arguments.

Rest collects multiple values into a single array. It appears in function parameters (to accept any number of arguments) and in destructuring (to collect remaining elements).

A key immutability note: spreading an object or array creates a shallow copy — nested objects are still shared references.`,
    codeExample: `// Spread — expand
const a = [1, 2, 3];
const b = [...a, 4, 5];          // [1,2,3,4,5]
const merged = { ...defaults, ...overrides };
Math.max(...a);                   // 3

// Object clone (shallow)
const copy = { ...original };
copy.nested === original.nested;  // true — shared reference!

// Rest — collect
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Rest in destructuring
const [first, second, ...remaining] = [1, 2, 3, 4, 5];
// remaining = [3, 4, 5]`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['spread', 'rest', 'es6', 'arrays', 'objects'],
    tier: 'core',
  },
  {
    id: 'template-literals',
    question: 'What are template literals and what are tagged templates used for?',
    answer: `Template literals use backtick syntax and allow embedded expressions with \${expr}, multi-line strings without \\n, and nesting.

Tagged templates are an advanced feature where a function processes the template's parts. The tag function receives an array of string segments and the interpolated values separately — giving you full control over the output. This is how libraries like styled-components (CSS-in-JS), sql (safe query construction), and gql (GraphQL) work — the tag sanitizes or transforms values rather than just concatenating strings.`,
    codeExample: `// Basic interpolation
const name = 'Alice';
const msg = \`Hello, \${name}! You have \${1 + 1} messages.\`;

// Multi-line
const html = \`
  <div class="card">
    <h2>\${title}</h2>
  </div>
\`;

// Tagged template — SQL injection prevention
function sql(strings, ...values) {
  return {
    text: strings.reduce((acc, s, i) => acc + s + (i < values.length ? '$' + i : ''), ''),
    values: values, // parameterized — never interpolated directly
  };
}
const query = sql\`SELECT * FROM users WHERE id = \${userId}\`;
// { text: 'SELECT * FROM users WHERE id = $0', values: [userId] }`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['template-literals', 'tagged-templates', 'es6', 'strings'],
    tier: 'core',
  },
  {
    id: 'typeof-instanceof-checks',
    question: 'What is the difference between typeof and instanceof?',
    answer: `typeof is a unary operator that returns a string describing the primitive type: 'number', 'string', 'boolean', 'bigint', 'symbol', 'undefined', 'function', or 'object'. Notable gotchas: typeof null === 'object' (historical bug), typeof function returns 'function' not 'object'.

instanceof checks whether a value was created by a constructor — it traverses the prototype chain. It works for objects and class instances but fails across different JavaScript realms (e.g., iframes), where the constructors are different objects.

For robust type checking, prefer: Array.isArray(), Number.isNaN(), Object.prototype.toString.call() (returns '[object Date]' etc.).`,
    codeExample: `typeof 42          // 'number'
typeof 'hi'        // 'string'
typeof true        // 'boolean'
typeof undefined   // 'undefined'
typeof null        // 'object' ← bug!
typeof {}          // 'object'
typeof []          // 'object' ← use Array.isArray()
typeof function(){} // 'function'

[] instanceof Array    // true
[] instanceof Object   // true (Array inherits from Object)
'hi' instanceof String // false (primitive, not String object)

// Best checks
Array.isArray([])           // true
Number.isNaN(NaN)           // true (unlike global isNaN)
Object.prototype.toString.call(new Date()) // '[object Date]'`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['typeof', 'instanceof', 'type-checking', 'types'],
    tier: 'core',
  },
  // ─── Experienced additions ────────────────────────────────────────────────
  {
    id: 'optional-chaining-nullish',
    question: 'How do optional chaining (?.) and nullish coalescing (??) work?',
    answer: `Optional chaining (?.) short-circuits evaluation and returns undefined if the left-hand value is null or undefined, instead of throwing a TypeError. Works on property access, method calls, and array indexing.

Nullish coalescing (??) returns the right-hand value only if the left side is null or undefined — unlike || (which also fires for 0, '', false). Use ?? for default values where falsy-but-valid values (0, false, '') must be preserved.

They compose well: a?.b?.c ?? 'default' safely drills into a nested object and falls back gracefully.`,
    codeExample: `const user = null;

// Without ?. — TypeError: Cannot read properties of null
user.address.city; // 💥

// With ?.
user?.address?.city;         // undefined (safe)
user?.getName?.();           // undefined (method call)
users?.[0]?.name;            // undefined (array index)

// ?? vs ||
const count = 0;
count || 10;   // 10 — wrong! 0 is falsy
count ?? 10;   // 0  — correct! 0 is not null/undefined

// Combined
const city = response?.data?.user?.address?.city ?? 'Unknown';`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['optional-chaining', 'nullish-coalescing', 'es2020', 'null-safety'],
    tier: 'core',
  },
  {
    id: 'es-modules-system',
    question: 'How does the ES module system work, and what are named vs default exports?',
    answer: `ES modules (ESM) use import/export syntax. Modules are statically analyzable — imports and exports are resolved at compile time, enabling tree shaking.

Named exports: a module can have multiple, referenced by their exact name. Default export: one per module, imported with any name. You can mix both.

Dynamic import() is asynchronous, returns a Promise, and enables code splitting. The module is only fetched and evaluated when called.

Key differences from CommonJS: ESM is always strict mode; imports are live bindings (if the exporting module changes the value, importers see the update); ESM can't use __dirname or require() natively.`,
    codeExample: `// math.ts — named exports
export const PI = 3.14159;
export function add(a: number, b: number) { return a + b; }
export function subtract(a: number, b: number) { return a - b; }

// logger.ts — default export
export default function log(msg: string) { console.log(msg); }

// app.ts — importing
import log from './logger';             // default (any name)
import { add, PI } from './math';       // named (exact names)
import { add as sum } from './math';    // aliased named
import * as MathUtils from './math';    // namespace import

// Dynamic import — code splitting
const { add } = await import('./math'); // loaded on demand
const module = await import(\`./locales/\${lang}.js\`);`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['modules', 'esm', 'import', 'export', 'tree-shaking'],
    tier: 'core',
  },
  {
    id: 'set-map-data-structures',
    question: 'When should you use Set and Map instead of Array and Object?',
    answer: `Set stores unique values with O(1) lookup (has), add, and delete — unlike Array.includes which is O(n). Use Set for: deduplication, tracking visited IDs, fast membership checks.

Map stores key-value pairs where keys can be any type (objects, functions, primitives) — unlike Object which coerces keys to strings. Map also preserves insertion order, has a .size property, and iterates cleanly. Use Map for: non-string keys, counting/bucketing, when you need to iterate in insertion order.

Both iterate with for...of and support destructuring. Neither has prototype-key pollution risks that Object has.`,
    codeExample: `// Set — deduplication and fast lookup
const seen = new Set();
const unique = arr.filter(x => !seen.has(x) && seen.add(x));

// Or simply:
const deduplicated = [...new Set(arr)];

// Map — any-type keys, clean iteration
const cache = new Map();
cache.set(userObject, computedValue); // object as key!
cache.get(userObject);                // O(1)

// Word frequency count
const freq = new Map();
words.forEach(w => freq.set(w, (freq.get(w) ?? 0) + 1));
[...freq.entries()].sort((a, b) => b[1] - a[1]); // sorted`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['set', 'map', 'data-structures', 'collections'],
    tier: 'core',
  },
  {
    id: 'error-types-custom',
    question: 'What are the built-in Error types and how do you create custom errors?',
    answer: `Built-in error types: Error (base), TypeError (wrong type), ReferenceError (undefined variable), SyntaxError (parse failure), RangeError (value out of range), URIError, EvalError. Each has message and stack properties.

For custom errors, extend Error. Set this.name in the constructor. Use instanceof for type-safe catching. This enables catching specific error classes in catch blocks rather than checking error message strings — much more maintainable.

Best practice: throw Error instances, not strings. Strings thrown don't have a stack trace and can't be caught by class type.`,
    codeExample: `class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Type-safe catching
try {
  await submitForm(data);
} catch (err) {
  if (err instanceof ValidationError) {
    showFieldError(err.field, err.message);
  } else if (err instanceof NetworkError && err.statusCode === 429) {
    showRateLimitMessage();
  } else {
    throw err; // re-throw unknown errors
  }
}`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['errors', 'error-handling', 'custom-errors', 'exceptions'],
    tier: 'core',
  },
  // ─── Expert / Architect additions ─────────────────────────────────────────
  {
    id: 'web-workers-use-cases',
    question: 'What are Web Workers and when should you use them?',
    answer: `Web Workers run JavaScript in a background thread, separate from the main UI thread. The main thread and worker communicate via message passing (postMessage / onmessage). Workers cannot access the DOM, window, or document.

Use them for CPU-intensive work that would freeze the UI: image/video processing, large data transformations, cryptography, compression, complex sorting/filtering of large datasets, WASM execution.

SharedArrayBuffer enables zero-copy shared memory between the main thread and workers (requires cross-origin isolation headers: COOP + COEP). Atomics provides thread-safe operations on shared buffers.`,
    codeExample: `// worker.ts
self.onmessage = ({ data }: MessageEvent<number[]>) => {
  // Heavy computation in background thread
  const result = data.sort((a, b) => a - b).filter(n => isPrime(n));
  self.postMessage(result);
};

// main.ts
const worker = new Worker(new URL('./worker.ts', import.meta.url));

worker.postMessage(largeArray);
worker.onmessage = ({ data }) => {
  console.log('Sorted primes:', data); // UI never froze
};

// Terminate when done
worker.terminate();

// SharedArrayBuffer — zero-copy
const sab = new SharedArrayBuffer(4);
const view = new Int32Array(sab);
Atomics.store(view, 0, 42); // thread-safe write`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['web-workers', 'performance', 'concurrency', 'threading', 'sharedarraybuffer'],
    tier: 'advanced',
  },
  {
    id: 'bundling-tree-shaking',
    question: 'How does a bundler work, and what is tree shaking?',
    answer: `Bundlers (Webpack, Vite, Rollup, esbuild) resolve your module graph starting from entry points, traverse all imports, and emit one or more output bundles. They also transform (TypeScript → JS, JSX → JS), optimize (minify, mangle names), and split code.

Tree shaking removes unused exports by statically analyzing ES module import/export statements. It only works with ESM (not CommonJS). The bundler marks exports as "used" or "unused" — unused code ("dead code") is eliminated from the bundle.

For tree shaking to work: use ESM, avoid side-effectful module patterns, and set "sideEffects": false (or list exceptions) in package.json. Dynamic imports create separate chunks — code splitting.`,
    codeExample: `// math.ts
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b; // ← NOT imported anywhere

// app.ts
import { add } from './math'; // only 'add' imported

// After tree shaking, the bundle contains only:
// const add = (a, b) => a + b;
// multiply and subtract are eliminated

// package.json — enable tree shaking for your library
{
  "sideEffects": false,  // tell bundler: no side-effect imports
  "module": "dist/index.esm.js", // ESM entry for bundlers
  "main": "dist/index.cjs.js"    // CJS fallback for Node
}`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['bundler', 'tree-shaking', 'webpack', 'vite', 'code-splitting', 'esm'],
    tier: 'advanced',
  },
  {
    id: 'js-security-vulnerabilities',
    question: 'What are the key JavaScript security vulnerabilities and how do you prevent them?',
    answer: `XSS (Cross-Site Scripting): injecting malicious scripts into a page. Prevention: never use innerHTML/eval with user input; use textContent or sanitize with DOMPurify; set Content-Security-Policy headers to restrict script sources.

Prototype Pollution: overwriting Object.prototype properties by passing malicious JSON like {"__proto__": {"isAdmin": true}}. Prevention: freeze Object.prototype, use Object.create(null) for dictionaries, use JSON schema validation.

eval() and Function() constructor: executes arbitrary strings as code. Prevention: never use eval(). Replace with safer alternatives (JSON.parse, computed property lookup tables).

CSRF (Cross-Site Request Forgery): tricking a user's browser into making authenticated requests to another site. Prevention: use SameSite cookies, CSRF tokens, verify Origin/Referer headers.`,
    codeExample: `// XSS — NEVER do this
el.innerHTML = userInput;  // if userInput = '<script>...</script>' — RCE!

// Safe alternatives
el.textContent = userInput;               // plain text only
el.innerHTML = DOMPurify.sanitize(html);  // sanitized HTML

// Prototype pollution — NEVER trust JSON as keys
const config = JSON.parse(untrustedInput);
if (config.__proto__ || config.constructor) throw new Error('Invalid');

// Safe object dictionary (no prototype)
const safeMap = Object.create(null);

// CSP header (server-side, stops inline scripts)
// Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...'

// eval alternatives
const ops = { add: (a, b) => a + b };
const result = ops[opName]?.(x, y); // lookup table — no eval`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['security', 'xss', 'csrf', 'prototype-pollution', 'csp'],
    tier: 'advanced',
  },
  {
    id: 'browser-rendering-pipeline-qna',
    question: 'Walk me through what happens when a browser renders a page.',
    answer: `The browser follows a fixed pipeline: (1) Parse HTML into the DOM tree. (2) Parse CSS into the CSSOM tree — CSS is render-blocking; painting waits until CSSOM is complete. (3) Combine DOM and CSSOM into the Render Tree (visible nodes only, with computed styles). (4) Layout (Reflow) — calculate exact position and size of every node. (5) Paint — fill in pixels for colors, borders, text, shadows onto layers. (6) Composite — the GPU combines layers in the correct stacking order and displays the frame. The Critical Rendering Path is the minimum work needed before the first pixel: minimizing render-blocking resources and DOM size directly reduces time-to-first-paint.`,
    difficulty: 'experienced',
    tags: ['rendering', 'critical-rendering-path', 'dom', 'cssom', 'layout', 'paint', 'composite'],
    tier: 'core',
  },
  {
    id: 'async-vs-defer',
    question: 'What is the difference between async and defer on a script tag?',
    answer: `Both async and defer download the script without blocking HTML parsing. The difference is when they execute. async executes as soon as the script finishes downloading — it may interrupt HTML parsing, and execution order between multiple async scripts is not guaranteed. Use it for fully independent scripts like analytics. defer executes after HTML parsing is fully complete, in document order. Use it for scripts that depend on the DOM or on each other. Scripts with type="module" are deferred by default.`,
    codeExample: `<!-- Blocks HTML parsing — avoid for non-critical scripts -->
<script src="app.js"></script>

<!-- Downloads in parallel, executes when ready (may interrupt parsing) -->
<script async src="analytics.js"></script>

<!-- Downloads in parallel, executes after HTML parsed, in order -->
<script defer src="vendor.js"></script>
<script defer src="app.js"></script>
<!-- app.js always runs after vendor.js -->

<!-- Modules are deferred by default -->
<script type="module" src="main.js"></script>`,
    codeLanguage: 'html',
    difficulty: 'experienced',
    tags: ['async', 'defer', 'script', 'rendering', 'critical-rendering-path', 'performance'],
    tier: 'core',
  },
  {
    id: 'core-web-vitals-qna',
    question: 'What are Core Web Vitals and how do you improve each one?',
    answer: `Core Web Vitals are three metrics Google uses to quantify real user experience: LCP, INP, and CLS. LCP (Largest Contentful Paint, target ≤ 2.5s) measures when the biggest visible element is rendered — improve by preloading the hero image, optimizing server response time, using WebP/AVIF formats, and never lazy-loading above-fold images. INP (Interaction to Next Paint, target ≤ 200ms) measures the worst input-to-frame latency across the session — improve by breaking long tasks with scheduler.yield(), moving heavy work to Web Workers, deferring non-critical JS. CLS (Cumulative Layout Shift, target ≤ 0.1) measures unexpected layout shifts — improve by always setting width and height on images/videos, not injecting content above existing content, and using CSS aspect-ratio to reserve space.`,
    codeExample: `// LCP — preload hero image
// <link rel="preload" href="/hero.webp" as="image">

// INP — break up long task
async function processLargeData(items) {
  for (let i = 0; i < items.length; i++) {
    process(items[i]);
    if (i % 100 === 0) await scheduler.yield(); // release main thread
  }
}

// CLS — always reserve space for images
img { width: 800px; height: 450px; } /* or aspect-ratio: 16/9 */

// Measure with web-vitals library
import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(console.log);
onINP(console.log);
onCLS(console.log);`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['core-web-vitals', 'lcp', 'inp', 'cls', 'performance', 'lighthouse'],
    tier: 'advanced',
  },
  {
    id: 'profiling-workflow',
    question: 'How do you profile and diagnose a slow page using Chrome DevTools?',
    answer: `Start with the Performance tab — record while reproducing the slowness, then read the flame chart for long tasks (red triangle = >50ms, blocks input and frames). Look for wide JS bars (yellow), layout/reflow bars (purple), and paint bars (green). The Bottom-Up tab ranks the costliest functions. For memory leaks, use the Memory tab: take a heap snapshot, interact with the page, force GC, take another snapshot and compare — objects that grew are suspects. Search for "Detached" DOM nodes. The Coverage tab shows unused JS/CSS bytes, driving code-splitting decisions. For CSS rendering issues, open the Rendering panel and enable Paint Flashing (highlights repaints per frame) and Layout Shift Regions (visualizes CLS). For mobile profiling, use chrome://inspect with a USB-connected Android device — desktop CPUs are 5-8x faster and mask real user experience.`,
    difficulty: 'experienced',
    tags: ['profiling', 'devtools', 'performance', 'flame-chart', 'memory-leak', 'heap-snapshot'],
    tier: 'advanced',
  },
  {
    id: 'performance-now-vs-date-now',
    question: 'Why use performance.now() instead of Date.now() for benchmarking?',
    answer: `performance.now() returns a high-resolution, monotonic timestamp with sub-millisecond (microsecond) precision, measured from the page's navigationStart. It never goes backwards and is unaffected by system clock adjustments (NTP sync, DST changes, manual clock changes). Date.now() is millisecond precision only and can jump or go backwards if the system clock is adjusted. For any performance measurement — timing function calls, measuring animation frame budgets, benchmarking — always use performance.now().`,
    codeExample: `// Correct: high-res, monotonic
const t0 = performance.now();
doWork();
const elapsed = performance.now() - t0;
console.log(\`\${elapsed.toFixed(3)}ms\`); // e.g. 1.247ms

// Wrong for benchmarks: low-res, not monotonic
const t0 = Date.now(); // milliseconds only, can jump
doWork();
const elapsed = Date.now() - t0; // may be 0ms for fast ops

// Named marks and measures (DevTools timeline)
performance.mark('parse-start');
parseData();
performance.mark('parse-end');
performance.measure('parse', 'parse-start', 'parse-end');`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['performance', 'performance-now', 'benchmarking', 'profiling'],
    tier: 'advanced',
  },
  {
    id: 'babel-what-it-does',
    question: 'What does Babel do, and why is it still relevant with modern browsers?',
    answer: `Babel is a transpiler — it converts modern JavaScript (ES6+, JSX, TypeScript) into backwards-compatible code for older environments. It remains relevant because: (1) you may need to support older browsers or Node versions, (2) it handles JSX transformation for React, (3) it supports experimental proposals via plugins before they land in engines, and (4) it is deeply integrated into most bundler pipelines even when modern targets don't strictly require transpilation.`,
    difficulty: 'experienced',
    tags: ['babel', 'transpiler', 'build-tools', 'es6'],
    tier: 'advanced',
  },
  {
    id: 'babel-preset-vs-plugin',
    question: 'What is the difference between a Babel preset and a plugin?',
    answer: `A plugin is a single transformation (e.g. @babel/plugin-transform-arrow-functions). A preset is a curated collection of plugins. @babel/preset-env is the most important — it uses browserslist combined with a compatibility database to include only the transforms your target environments actually need, avoiding unnecessary bundle bloat.`,
    codeExample: `// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: '> 0.5%, last 2 versions, not dead',
      useBuiltIns: 'usage', // auto-inject only needed polyfills
      corejs: 3,
    }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-decorators', // single transform
  ],
};`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['babel', 'preset-env', 'plugins', 'build-tools'],
    tier: 'advanced',
  },
  {
    id: 'transpiling-vs-polyfilling',
    question: 'What is the difference between transpiling and polyfilling?',
    answer: `Transpiling rewrites syntax — arrow functions become regular functions, class becomes prototype chains. Polyfilling adds missing runtime APIs that older environments lack (Promise, Array.prototype.flatMap, fetch). Babel handles transpiling; core-js or whatwg-fetch handle polyfills. Both are needed for full compatibility. Using @babel/preset-env with useBuiltIns: 'usage' automates injecting only the polyfills your code actually uses.`,
    codeExample: `// Transpiling (syntax rewrite)
// Before (ES6)
const add = (a, b) => a + b;
// After (ES5 output)
var add = function(a, b) { return a + b; };

// Polyfilling (runtime API addition)
// core-js adds this if browser lacks it:
Array.prototype.flatMap = function(...) { ... };

// babel.config.js — auto polyfills
['@babel/preset-env', {
  useBuiltIns: 'usage', // only polyfills you use
  corejs: 3,
}]`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['babel', 'polyfill', 'transpile', 'core-js', 'es6'],
    tier: 'advanced',
  },
  {
    id: 'source-maps-security',
    question: 'How can source maps expose your original code, and how do you prevent it?',
    answer: `When sourceMap is enabled in tsconfig.json or your bundler config, .map files are generated alongside your compiled output. These files contain the full mapping back to your original source — variable names, file paths, and readable code. If these are served publicly, anyone can open DevTools Sources tab and read your original TypeScript, completely defeating minification. The fix is to disable source maps in production builds. If you still need them for error monitoring (e.g. Sentry), generate the .map files, upload them to your error tracker via CLI, then delete them before deploying — users never see them but your stack traces remain readable.`,
    codeExample: `// tsconfig.json — disable in production
{
  "compilerOptions": {
    "sourceMap": false
  }
}

// vite.config.ts
build: {
  sourcemap: false
}

// webpack.config.js
devtool: false // production
devtool: 'eval-source-map' // dev only

// Best practice: generate but don't serve
// Upload to Sentry, then delete before deploy
sentry-cli sourcemaps upload ./dist
rm dist/**/*.map`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['source-maps', 'security', 'tsconfig', 'build-tools', 'sentry'],
    tier: 'advanced',
  },
  {
    id: 'npm-dependency-types',
    question: 'What is the difference between dependencies, devDependencies, and peerDependencies?',
    answer: `dependencies are needed at runtime (React, axios). devDependencies are only needed during development or build time (ESLint, Webpack, TypeScript) and are not included in production installs. peerDependencies declare compatibility requirements — "if you use this package, you must have React 18 installed yourself." The consuming app provides the peer package, avoiding duplicate instances of the same library (especially important for React and context/hooks).`,
    codeExample: `// package.json
{
  "dependencies": {
    "react": "^18.0.0",   // needed at runtime
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",  // build time only
    "eslint": "^8.0.0",
    "vite": "^5.0.0"
  },
  "peerDependencies": {
    // for a component library:
    "react": ">=17.0.0"      // host app must provide this
  }
}`,
    codeLanguage: 'json',
    difficulty: 'experienced',
    tags: ['npm', 'package-management', 'dependencies', 'peerDependencies'],
    tier: 'core',
  },
  {
    id: 'package-lock-purpose',
    question: 'What does package-lock.json do and why should it be committed?',
    answer: `package-lock.json locks the exact resolved versions of every package in the entire dependency tree, ensuring reproducible installs across machines and CI environments. Without it, npm install might resolve to different patch or minor versions over time as new releases are published, causing "works on my machine" bugs. yarn.lock and pnpm-lock.yaml serve the same purpose for their respective tools. Always commit the lockfile — never add it to .gitignore.`,
    difficulty: 'experienced',
    tags: ['npm', 'package-lock', 'lockfile', 'reproducible-builds'],
    tier: 'core',
  },
  {
    id: 'npm-vs-yarn-vs-pnpm',
    question: 'What are the differences between npm, yarn, and pnpm?',
    answer: `npm is the default Node package manager, much improved in v7+ with workspaces and automatic peer dependency installs. Yarn introduced parallel installs, offline caching, and workspaces; Yarn Berry (v2+) uses Plug'n'Play which eliminates node_modules entirely. pnpm uses a content-addressable global store with hard links — each version of a package is stored once on disk and linked into projects, making it significantly faster and more disk-efficient. pnpm is also strict by default, preventing phantom dependencies.`,
    difficulty: 'experienced',
    tags: ['npm', 'yarn', 'pnpm', 'package-management', 'build-tools'],
    tier: 'advanced',
  },
  {
    id: 'phantom-dependency',
    question: 'What is a phantom dependency?',
    answer: `A phantom dependency is a package your code imports that is not listed in your package.json but happens to be installed because another dependency brought it in. npm and yarn hoist packages to the root node_modules, accidentally making them importable. This is fragile — if the package that pulled it in is updated or removed, your code silently breaks. pnpm's strict linking prevents this: your code can only import packages explicitly declared in your own package.json.`,
    codeExample: `// package.json only lists "react-router"
// but react-router depends on "history"
// With npm/yarn hoisting, this works (phantom dep):
import { createBrowserHistory } from 'history'; // dangerous!

// With pnpm strict mode, this throws:
// Cannot find module 'history'
// Fix: explicitly add it to your dependencies`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['npm', 'pnpm', 'phantom-dependency', 'package-management'],
    tier: 'advanced',
  },
  {
    id: 'grunt-obsolescence',
    question: 'Why did Grunt become obsolete?',
    answer: `Grunt is a task runner that executes sequential, file-based tasks defined in config objects. It is slow because every task reads from disk and writes back to disk between steps. Webpack, Rollup, and Vite replaced it for bundling because they work with in-memory module graphs — far faster. For simple scripting tasks, npm scripts in package.json replaced Grunt for most projects. Gulp was a transitional step between Grunt and modern bundlers, using Node streams instead of disk I/O. Today, the combination of a bundler (Vite/Webpack) and npm scripts handles everything Grunt once did, with better performance and less configuration overhead.`,
    difficulty: 'experienced',
    tags: ['grunt', 'gulp', 'build-tools', 'task-runner', 'history'],
    tier: 'advanced',
  },
];

export default jsQna;
