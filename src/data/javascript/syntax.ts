import type { SyntaxEntry } from '@/types/content';

const jsSyntax: SyntaxEntry[] = [
  {
    id: 'hoisting',
    title: 'Hoisting',
    description: 'Declarations are moved to the top of their scope at compile time. var is hoisted and initialized to undefined; let/const are hoisted but stay in the Temporal Dead Zone until their declaration line.',
    language: 'javascript',
    tags: ['hoisting', 'scope', 'variables'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2015',
    code: `// --- var hoisting ---
console.log(x); // undefined (hoisted, initialized to undefined)
var x = 5;
console.log(x); // 5

// Equivalent to what the engine sees:
// var x;           ← hoisted to top
// console.log(x);  // undefined
// x = 5;

// --- let hoisting (Temporal Dead Zone) ---
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// let IS hoisted, but accessing it before the declaration
// throws because it sits in the Temporal Dead Zone (TDZ).

// --- function hoisting ---
greet(); // "Hello!" — entire function body is hoisted
function greet() { console.log("Hello!"); }

// Arrow / function expressions are NOT hoisted the same way
sayHi(); // TypeError: sayHi is not a function
var sayHi = () => console.log("Hi!");`,
  },
  {
    id: 'var-let-const',
    title: 'var, let, const',
    description: 'Variable declarations with different scoping and mutability rules.',
    language: 'javascript',
    tags: ['variables', 'scope'],
    tier: 'core',
    level: 'fresher',
    since: 'ES2015',
    code: `// var — function-scoped, hoisted, re-declarable
var x = 1;
var x = 2; // OK

// let — block-scoped, not hoisted (TDZ), not re-declarable
let y = 1;
// let y = 2; // SyntaxError

// const — block-scoped, must be initialized, binding is immutable
const z = [];
z.push(1); // OK — object contents can change
// z = [];  // TypeError — binding cannot change`,
  },
  {
    id: 'arrow-functions',
    title: 'Arrow Functions',
    description: 'Concise function syntax that lexically binds `this` from the enclosing scope.',
    language: 'javascript',
    tags: ['functions', 'this'],
    tier: 'core',
    level: 'fresher',
    since: 'ES2015',
    code: `// Traditional function — own 'this'
function add(a, b) { return a + b; }

// Arrow — concise body
const add = (a, b) => a + b;

// Arrow — block body
const greet = (name) => {
  const msg = \`Hello, \${name}!\`;
  return msg;
};

// Arrow — lexical this (useful in callbacks)
class Timer {
  start() {
    setTimeout(() => {
      this.tick(); // 'this' refers to Timer instance
    }, 1000);
  }
}`,
  },
  {
    id: 'destructuring',
    title: 'Destructuring',
    description: 'Unpack values from arrays or properties from objects into distinct variables.',
    language: 'javascript',
    tags: ['destructuring', 'arrays', 'objects'],
    tier: 'core',
    level: 'fresher',
    since: 'ES2015',
    code: `// Array destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];
// a=1, b=2, rest=[3,4,5]

// Object destructuring
const { name, age, city = 'Unknown' } = { name: 'Alice', age: 30 };
// city defaults to 'Unknown'

// Rename while destructuring
const { name: userName } = { name: 'Bob' };
// userName = 'Bob'

// Nested destructuring
const { address: { street } } = { address: { street: '123 Main St' } };

// In function parameters
function display({ title, author = 'Anonymous' }) {
  return \`\${title} by \${author}\`;
}`,
  },
  {
    id: 'spread-rest',
    title: 'Spread & Rest',
    description: 'Spread expands iterables; rest collects remaining arguments into an array.',
    language: 'javascript',
    tags: ['spread', 'rest', 'arrays', 'objects'],
    tier: 'core',
    level: 'fresher',
    since: 'ES2015',
    code: `// Spread — arrays
const a = [1, 2];
const b = [...a, 3, 4]; // [1, 2, 3, 4]

// Spread — objects (shallow clone / merge)
const defaults = { color: 'blue', size: 'md' };
const custom = { ...defaults, size: 'lg' }; // override size

// Spread — function call
Math.max(...[1, 5, 3]); // 5

// Rest — function parameters
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10

// Rest — destructuring
const [head, ...tail] = [1, 2, 3, 4];
// head=1, tail=[2,3,4]`,
  },
  {
    id: 'template-literals',
    title: 'Template Literals',
    description: 'String literals with embedded expressions and multi-line support.',
    language: 'javascript',
    tags: ['strings', 'template-literals'],
    tier: 'core',
    level: 'fresher',
    since: 'ES2015',
    code: `const name = 'World';
const greeting = \`Hello, \${name}!\`; // "Hello, World!"

// Multi-line strings
const html = \`
  <div>
    <p>No more \\n hacks</p>
  </div>
\`;

// Expressions
const price = 9.99;
const msg = \`Total: \$\${(price * 1.1).toFixed(2)}\`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] ? \`<b>\${values[i]}</b>\` : ''), '');
}
const result = highlight\`Price is \${price} USD\`;`,
  },
  {
    id: 'optional-chaining',
    title: 'Optional Chaining (?.)',
    description: 'Safely access deeply nested properties without explicit null checks.',
    language: 'javascript',
    tags: ['optional-chaining', 'null-safety'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2020',
    code: `const user = { address: { city: 'NYC' } };

// Without optional chaining
const city = user && user.address && user.address.city;

// With optional chaining
const city = user?.address?.city; // 'NYC' or undefined

// On method calls
const len = str?.length;
const upper = str?.toUpperCase();

// On array access
const first = arr?.[0];

// On function calls
const result = callback?.();

// Combined with nullish coalescing
const city = user?.address?.city ?? 'Unknown';`,
  },
  {
    id: 'nullish-coalescing',
    title: 'Nullish Coalescing (??)',
    description: 'Returns the right-hand value only when the left is null or undefined.',
    language: 'javascript',
    tags: ['nullish-coalescing', 'null-safety'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2020',
    code: `// || returns right side for ANY falsy value (0, '', false)
const count = 0 || 10;   // 10 — probably wrong!

// ?? returns right side ONLY for null/undefined
const count = 0 ?? 10;   // 0 — correct!
const name = '' ?? 'Anonymous'; // '' — empty string is valid

// Common patterns
function getConfig(userConfig) {
  return {
    timeout: userConfig.timeout ?? 3000,
    retries: userConfig.retries ?? 3,
    debug: userConfig.debug ?? false,
  };
}

// Logical assignment
let x = null;
x ??= 'default'; // assigns only if x is null/undefined`,
  },
  {
    id: 'async-await',
    title: 'async / await',
    description: 'Syntactic sugar over Promises for writing asynchronous code in a synchronous style.',
    language: 'javascript',
    tags: ['async', 'await', 'promises'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2017',
    code: `// Basic async function
async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  const data = await res.json();
  return data;
}

// Error handling
async function fetchSafe(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('Fetch failed:', err.message);
    return null;
  }
}

// Parallel execution (don't await in a loop)
async function loadAll(ids) {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises); // runs in parallel
}`,
  },
  {
    id: 'promises',
    title: 'Promises',
    description: 'Objects representing the eventual completion or failure of an asynchronous operation.',
    language: 'javascript',
    tags: ['promises', 'async'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2015',
    code: `// Creating a promise
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

// Chaining
fetch('/api/data')
  .then(res => res.json())
  .then(data => process(data))
  .catch(err => console.error(err))
  .finally(() => setLoading(false));

// Promise combinators
Promise.all([p1, p2, p3]);        // resolves when ALL resolve
Promise.allSettled([p1, p2, p3]); // waits for ALL, returns statuses
Promise.race([p1, p2]);           // first to settle wins
Promise.any([p1, p2, p3]);        // first to FULFILL wins (ES2021)

// Promise.allSettled — inspect results
const results = await Promise.allSettled([p1, p2]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error(r.reason);
});`,
  },
  {
    id: 'classes',
    title: 'Classes',
    description: 'Syntactic sugar over prototypal inheritance for defining object blueprints.',
    language: 'javascript',
    tags: ['classes', 'oop', 'inheritance'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2015',
    code: `class Animal {
  #name; // private field (ES2022)

  constructor(name) {
    this.#name = name;
  }

  speak() {
    return \`\${this.#name} makes a noise.\`;
  }

  get name() { return this.#name; }

  static create(name) { return new Animal(name); }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // must call before using 'this'
  }

  speak() {
    return \`\${this.name} barks.\`;
  }
}

const d = new Dog('Rex');
d.speak();            // "Rex barks."
d instanceof Animal;  // true`,
  },
  {
    id: 'es-modules',
    title: 'ES Modules',
    description: 'Native JavaScript module system with static import/export syntax.',
    language: 'javascript',
    tags: ['modules', 'import', 'export'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2015',
    code: `// Named exports
export const PI = 3.14;
export function add(a, b) { return a + b; }
export class Vector { ... }

// Default export (one per file)
export default function main() { ... }

// Named imports
import { PI, add } from './math.js';

// Default import
import main from './app.js';

// Rename on import
import { add as sum } from './math.js';

// Namespace import
import * as math from './math.js';
math.PI; math.add(1, 2);

// Re-export
export { add } from './math.js';
export * from './utils.js';

// Dynamic import (lazy loading)
const { add } = await import('./math.js');`,
  },
  {
    id: 'array-methods',
    title: 'Array Methods',
    description: 'Functional array transformations: map, filter, reduce, find, and more.',
    language: 'javascript',
    tags: ['arrays', 'functional', 'map', 'filter', 'reduce'],
    tier: 'core',
    level: 'fresher',
    code: `const nums = [1, 2, 3, 4, 5];

// map — transform each element
nums.map(n => n * 2);             // [2, 4, 6, 8, 10]

// filter — keep matching elements
nums.filter(n => n % 2 === 0);    // [2, 4]

// reduce — accumulate to single value
nums.reduce((sum, n) => sum + n, 0); // 15

// find / findIndex
nums.find(n => n > 3);            // 4
nums.findIndex(n => n > 3);       // 3

// some / every
nums.some(n => n > 4);            // true
nums.every(n => n > 0);           // true

// flat / flatMap
[[1, 2], [3, 4]].flat();          // [1, 2, 3, 4]
nums.flatMap(n => [n, n * 2]);    // [1,2, 2,4, 3,6, ...]

// Array.from
Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]`,
  },
  {
    id: 'object-methods',
    title: 'Object Methods',
    description: 'Static methods on Object for transforming and inspecting object data.',
    language: 'javascript',
    tags: ['objects', 'entries', 'keys', 'values'],
    tier: 'core',
    level: 'experienced',
    code: `const user = { name: 'Alice', age: 30, role: 'admin' };

// Enumerate
Object.keys(user);    // ['name', 'age', 'role']
Object.values(user);  // ['Alice', 30, 'admin']
Object.entries(user); // [['name','Alice'], ['age',30], ...]

// Transform — filter object properties
const filtered = Object.fromEntries(
  Object.entries(user).filter(([, v]) => typeof v === 'string')
);
// { name: 'Alice', role: 'admin' }

// Shallow copy / merge
const clone = Object.assign({}, user);
const merged = Object.assign({}, defaults, overrides);

// Freeze (shallow immutability)
Object.freeze(user); // throws in strict mode on write

// Property descriptors
Object.defineProperty(user, 'id', {
  value: 42,
  writable: false,
  enumerable: false,
});`,
  },
  {
    id: 'set-map',
    title: 'Set & Map',
    description: 'Built-in collection types for unique values (Set) and key-value pairs (Map).',
    language: 'javascript',
    tags: ['set', 'map', 'collections'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2015',
    code: `// Set — unique values
const s = new Set([1, 2, 2, 3]); // {1, 2, 3}
s.add(4);
s.has(2);    // true
s.delete(1);
s.size;      // 3
[...s];      // [2, 3, 4]

// Deduplicate array
const unique = [...new Set(arr)];

// Map — ordered key-value, any key type
const m = new Map();
m.set('a', 1);
m.set({ id: 1 }, 'object key');
m.get('a'); // 1
m.has('a'); // true
m.size;     // 2

// Iterating Map
for (const [key, value] of m) { ... }
m.forEach((value, key) => { ... });

// Convert to/from Object
Object.fromEntries(m);
new Map(Object.entries(obj));`,
  },
  {
    id: 'generators',
    title: 'Generators',
    description: 'Functions that can pause and resume execution, producing a sequence of values on demand.',
    language: 'javascript',
    tags: ['generators', 'iterators'],
    tier: 'advanced',
    level: 'expert',
    since: 'ES2015',
    code: `function* counter(start = 0) {
  while (true) {
    yield start++;
  }
}

const gen = counter(5);
gen.next(); // { value: 5, done: false }
gen.next(); // { value: 6, done: false }

// Finite generator
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
[...range(0, 6, 2)]; // [0, 2, 4]

// Generator for custom iterables
function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// Async generators (ES2018)
async function* paginate(url) {
  let page = 1;
  while (true) {
    const data = await fetch(\`\${url}?page=\${page++}\`).then(r => r.json());
    if (!data.length) return;
    yield data;
  }
}`,
  },
  {
    id: 'proxy-reflect',
    title: 'Proxy & Reflect',
    description: 'Intercept and redefine fundamental operations on objects.',
    language: 'javascript',
    tags: ['proxy', 'reflect', 'meta-programming'],
    tier: 'advanced',
    level: 'expert',
    since: 'ES2015',
    code: `// Validation proxy
const validator = {
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    return Reflect.set(target, prop, value);
  },
};

const person = new Proxy({}, validator);
person.age = 25;    // OK
person.age = '25';  // TypeError

// Logging proxy
function createLogged(target) {
  return new Proxy(target, {
    get(obj, prop) {
      console.log(\`Getting \${prop}\`);
      return Reflect.get(obj, prop);
    },
  });
}

// Default values proxy
const withDefaults = new Proxy({}, {
  get(obj, prop) {
    return prop in obj ? obj[prop] : \`<\${prop}>\`;
  },
});`,
  },
  {
    id: 'fetch-abort',
    title: 'fetch & AbortController',
    description: 'Native browser API for HTTP requests with cancellation support.',
    language: 'javascript',
    tags: ['fetch', 'http', 'abort'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2015',
    code: `// Basic GET
const res = await fetch('/api/users');
const users = await res.json();

// POST with JSON body
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' }),
});

// Error handling (fetch only rejects on network error)
if (!res.ok) throw new Error(\`HTTP \${res.status}\`);

// AbortController — cancel in-flight requests
const controller = new AbortController();
const { signal } = controller;

fetch('/api/data', { signal })
  .then(r => r.json())
  .catch(err => {
    if (err.name === 'AbortError') return; // expected
    throw err;
  });

controller.abort(); // cancel

// Timeout pattern
const timeout = setTimeout(() => controller.abort(), 5000);`,
  },
  {
    id: 'error-handling',
    title: 'Error Handling',
    description: 'try/catch/finally patterns and custom error types.',
    language: 'javascript',
    tags: ['errors', 'try-catch', 'exceptions'],
    tier: 'core',
    level: 'experienced',
    code: `// Basic try/catch/finally
try {
  const data = JSON.parse(rawInput);
  processData(data);
} catch (err) {
  console.error(err.message);
} finally {
  cleanup(); // always runs
}

// Custom error classes
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// Type-based error handling
try {
  validate(input);
} catch (err) {
  if (err instanceof ValidationError) {
    showFieldError(err.field, err.message);
  } else if (err instanceof NetworkError) {
    retry();
  } else {
    throw err; // re-throw unknown errors
  }
}

// Error cause (ES2022)
throw new Error('Failed to load', { cause: originalError });`,
  },
  {
    id: 'logical-assignment',
    title: 'Logical Assignment Operators',
    description: 'Combine logical operators with assignment for concise conditional mutation.',
    language: 'javascript',
    tags: ['operators', 'assignment'],
    tier: 'core',
    level: 'experienced',
    since: 'ES2021',
    code: `// ??= — assign if null or undefined
let config = null;
config ??= { theme: 'dark' }; // assigns

let active = false;
active ??= true; // does NOT assign — false is not null/undefined

// ||= — assign if falsy
let name = '';
name ||= 'Anonymous'; // assigns — '' is falsy

let count = 0;
count ||= 1; // assigns — 0 is falsy (often unintended!)

// &&= — assign if truthy
let user = { name: 'Alice' };
user &&= { ...user, loggedIn: true }; // assigns

let guest = null;
guest &&= { loggedIn: true }; // does NOT assign — null is falsy

// Common pattern: memoization
cache[key] ??= expensiveComputation(key);`,
  },
  {
    id: 'symbol',
    title: 'Symbol',
    description: 'Unique, immutable primitive values used as object property keys.',
    language: 'javascript',
    tags: ['symbol', 'unique-keys'],
    tier: 'advanced',
    level: 'expert',
    since: 'ES2015',
    code: `// Every Symbol is unique
const s1 = Symbol('id');
const s2 = Symbol('id');
s1 === s2; // false

// As non-colliding object keys
const ID = Symbol('id');
const obj = { [ID]: 42, name: 'Alice' };
obj[ID]; // 42
Object.keys(obj); // ['name'] — Symbol not enumerated

// Well-known symbols (hooks into JS internals)
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { done: true };
      },
    };
  }
}

[...new Range(1, 5)]; // [1, 2, 3, 4, 5]`,
  },
  {
    id: 'debounce-throttle-impl',
    title: 'Debounce & Throttle',
    description: 'Rate-limiting patterns: debounce delays until idle, throttle limits to one call per window.',
    language: 'javascript',
    tags: ['debounce', 'throttle', 'performance'],
    tier: 'advanced',
    level: 'experienced',
    code: `// ── Debounce ──────────────────────────────────────────
// Fires AFTER the user stops calling for the specified delay.
// Use case: search-as-you-type, resize handler.
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const onSearch = debounce((query) => fetchResults(query), 300);
input.addEventListener('input', (e) => onSearch(e.target.value));


// ── Throttle ───────────────────────────────────────────
// Fires at MOST once per the limit interval regardless of call frequency.
// Use case: scroll events, mouse-move, real-time games.
function throttle(fn, limit) {
  let lastRan = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRan >= limit) {
      lastRan = now;
      fn.apply(this, args);
    }
  };
}

window.addEventListener('scroll', throttle(updateProgressBar, 100));


// ── Leading-edge throttle (runs immediately, then locks) ──
function throttleLeading(fn, limit) {
  let locked = false;
  return function (...args) {
    if (!locked) {
      fn.apply(this, args);
      locked = true;
      setTimeout(() => (locked = false), limit);
    }
  };
}`,
  },
  {
    id: 'memoize-pattern',
    title: 'Memoization',
    description: 'Cache the result of a function call keyed by its arguments to avoid redundant computation.',
    language: 'javascript',
    tags: ['memoization', 'performance', 'caching'],
    tier: 'advanced',
    level: 'experienced',
    code: `// ── Simple memoize ────────────────────────────────────
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  // imagine a heavy computation
  return n * n;
});

expensiveCalc(42); // computed
expensiveCalc(42); // from cache


// ── WeakMap-keyed memoize (for object args, avoids leaks) ──
function memoizeByRef(fn) {
  const cache = new WeakMap();
  return function (obj) {
    if (cache.has(obj)) return cache.get(obj);
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}

// ── React useMemo equivalent ──────────────────────────
// Under the hood, useMemo is essentially:
let lastDeps, lastResult;
function useMemoShim(factory, deps) {
  if (!lastDeps || deps.some((d, i) => d !== lastDeps[i])) {
    lastResult = factory();
    lastDeps = deps;
  }
  return lastResult;
}`,
  },
  {
    id: 'execution-context',
    title: 'Execution Context & Call Stack',
    description: 'Every function call creates an Execution Context — the environment in which code runs.',
    language: 'javascript',
    tags: ['execution-context', 'call-stack', 'scope'],
    tier: 'advanced',
    level: 'experienced',
    code: `// There are 3 types of Execution Context:
// 1. Global EC — created once when the script loads
// 2. Function EC — created each time a function is called
// 3. Eval EC — created inside eval() (avoid)

// Each EC has two phases:
//   Creation  → hoisting happens, scope chain set up, 'this' bound
//   Execution → code runs line-by-line

function outer() {
  let x = 10; // part of outer's EC (Variable Environment)

  function inner() {
    let y = 20; // inner's EC
    console.log(x + y); // scope chain lookup: x found in outer's EC
  }

  inner(); // pushes inner's EC onto the Call Stack
}         // inner's EC is popped on return

outer();  // pushes outer's EC → inner's EC → pop inner → pop outer

// Call Stack trace (top = current):
// ┌──────────────┐
// │  inner()  EC │
// ├──────────────┤
// │  outer()  EC │
// ├──────────────┤
// │  Global   EC │
// └──────────────┘`,
  },
];

export default jsSyntax;
