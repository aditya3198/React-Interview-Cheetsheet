import type { QnaItem } from '@/types/content';

const jsQna: QnaItem[] = [
  {
    id: 'var-let-const-diff',
    question: 'What are the differences between var, let, and const?',
    answer: `var is scoped to the nearest function and is hoisted (moved to the top of its scope with a value of undefined before the code runs). let and const are scoped to the nearest block — like an if statement or a for loop — and they enter a Temporal Dead Zone (TDZ, a period where the variable exists but cannot be accessed) until their declaration line. Accessing them before that line throws a ReferenceError. const requires a value when declared and prevents you from pointing it at a new value, but if it holds an object or array, you can still change the contents of that object or array.`,
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
    answer: `=== (strict equality) checks both the value and the type with no conversion. == (loose equality) converts (coerces) both sides to a common type before comparing, which follows rules that often produce surprising results. Always prefer === — it is predictable. One notable case: null == undefined is true with ==, but null === undefined is false with ===.`,
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
    answer: `A closure is a function that remembers the variables from the scope where it was created, even after that outer function has finished running. The inner function does not copy those variables — it holds a live reference to them, so changes are visible. Closures let you keep private state, build factory functions (functions that create other functions), cache results, and manage state in callbacks — all without needing a class.`,
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
    answer: `JavaScript is single-threaded — it has one call stack (the list of functions currently running) and can only do one thing at a time. When async operations like setTimeout or fetch finish, their callbacks are placed into a queue. The event loop watches the call stack — when it is empty, it pulls from the queue. There are two queues with different priorities: the microtask queue (Promise .then callbacks) drains completely after every task before the next task starts; the macrotask queue (setTimeout, events) runs one item per loop. This is why a Promise .then always runs before a setTimeout, even if the timeout has a delay of 0.`,
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
    answer: `Regular functions get their own this, and its value is determined by how the function is called — as a method, with new, with .call()/.bind(), or as a plain call. Arrow functions do not have their own this at all. They capture this from the surrounding code where they were written, and that value cannot be changed. This makes arrow functions ideal for callbacks inside class methods (where you want this to stay pointing at the instance), but they should not be used as object methods or constructors.`,
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
    answer: `Promise.all runs all the promises at the same time (concurrently) and resolves with an array of their values when every single one succeeds. If even one rejects, Promise.all immediately rejects too — you lose the results of any promises that had already resolved. Promise.allSettled also runs all promises concurrently but always resolves, never rejects. It gives you an array of result objects where each one has a status of 'fulfilled' or 'rejected' plus the value or reason. Use allSettled when you need to know what happened to each request even if some of them failed.`,
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
    answer: `Wrap your await calls in a try/catch/finally block. This catches both rejected Promises and any regular synchronous errors thrown inside the block. The finally block runs no matter what — use it for cleanup like hiding a loading spinner. For more targeted handling, you can chain .catch() directly on a single awaited Promise instead of catching everything. Do not let errors silently disappear — always handle them or rethrow them. For parallel operations, use Promise.allSettled to inspect each result individually, or attach a .catch() to each Promise before passing them to Promise.all.`,
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
    answer: `Every JavaScript object has an internal link (called [[Prototype]]) to another object. When you access a property, JavaScript looks on the object itself first. If it is not there, it follows the [[Prototype]] link to the next object, and keeps going until it finds the property or reaches the end of the chain (null). This is called the prototype chain. The class keyword is a cleaner way to write this — extends sets up the chain between a child and parent, and super calls the parent's constructor or method. You can also use Object.create(proto) to manually set the prototype of a new object.`,
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
    answer: `A shallow copy creates a new object at the top level, but any nested objects inside it are still shared — they point to the same memory as the original. If you change a nested object in the copy, you change the original too. A deep copy duplicates every level so the two objects are completely independent. For a deep copy, use structuredClone() which is built into modern browsers and Node. For a shallow copy, use spread syntax ({ ...obj }) or Object.assign({}, obj).`,
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
    answer: `Use WeakMap when you want to attach extra data to an object without preventing the garbage collector (the system that frees unused memory) from cleaning it up. In a regular Map, keeping an object as a key prevents it from being freed. In a WeakMap, keys are held weakly — if nothing else in your code references the key object, the garbage collector can remove it and the WeakMap entry disappears automatically. Common uses are storing private data per DOM node, caching results keyed by object identity, and tracking listener state. WeakMap cannot be iterated (no forEach, no size) because the entries can disappear at any time.`,
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
    answer: `Common sources of memory leaks:
1. Forgotten event listeners — adding a listener to an element but never removing it when the element or component is destroyed. The listener keeps the element and its callback in memory.
2. Closures holding large data — any inner function that is referenced somewhere keeps its entire outer scope alive, including large data structures in that scope.
3. Detached DOM nodes — removing an element from the page but still holding a JavaScript reference to it. The browser cannot free it.
4. Accidental globals — writing to a variable without let, const, or var creates a property on the global window object that never gets cleaned up.
5. Unbounded caches — a Map or array that you only ever add to and never trim.

To diagnose leaks, use the Chrome DevTools Memory panel. Take a heap snapshot (a full picture of every object in memory) before and after an action, then compare them. You can also search for "Detached" DOM nodes directly in the snapshot.`,
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
    answer: `Debounce waits until the user has stopped triggering the function for a set amount of time, then fires it once. If the function is triggered again before the delay expires, the timer resets. This is ideal for search inputs — you only want to fire the search after the user stops typing, not on every keystroke. Throttle lets the function run at most once per time window, no matter how many times it is triggered. This is ideal for scroll or resize events where you want regular updates but do not need to react to every single pixel of movement.`,
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
    answer: `JavaScript quietly converts types in many situations, which leads to results that look wrong until you understand the rules. The + operator adds numbers but switches to string concatenation the moment either side is a string. Using == triggers type conversion before comparing. In boolean contexts (if statements, &&, ||), the values 0, '', null, undefined, NaN, and false are all treated as false — everything else is treated as true. typeof null returns 'object' instead of 'null' — this is a long-standing bug in the language. Adding an array to an array or an object to an array produces strange string output because of how the conversion rules chain together.`,
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
    answer: `const stops you from reassigning a variable to a new value, but it does not stop you from mutating what the variable points to. To do truly immutable updates, use copy-on-write — create a new value with the change applied instead of editing the original. For objects, use spread ({ ...state, key: newValue }) or Object.assign. For arrays, use spread, map, filter, slice, or concat — never mutate the original with push, pop, or splice. For deeply nested structures, use structuredClone for a one-off full copy, or a library like Immer which lets you write mutation-style code but produces a new immutable value. React depends on this — it detects state changes by checking if the reference is new, so mutating in place means React will not re-render.`,
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
    answer: `Generators are useful for:
1. Infinite sequences — produce values one at a time without pre-computing the whole list.
2. Lazy evaluation — delay work until the caller actually asks for the next value. This saves memory when working with large datasets.
3. Custom iterables — make any data structure work with for...of loops and spread syntax by implementing the iterator protocol (the interface JavaScript uses to loop over things).
4. Historical note: the async/await syntax was originally built on top of generators, so understanding generators helps you understand how async/await works internally.
5. Paginated API fetching — use async generators to yield one page of results at a time, stopping when the API returns an empty page.`,
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
    answer: `Event delegation is a technique where you attach a single event listener to a parent element instead of attaching a separate listener to every child. When a child is clicked, the event bubbles up (travels up through parent elements) to the parent listener. You then check event.target to see which specific child was clicked. The benefits are: (1) memory efficiency — one listener instead of one per child, (2) it automatically works for children added to the DOM after the listener was attached, and (3) less setup and cleanup as the list of children changes. The tradeoff is that the handler logic is slightly more complex, and calling stopPropagation inside a child will prevent the event from reaching the parent listener, breaking delegation for that element.`,
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
    answer: `Symbols are unique values — every call to Symbol() creates a value that is not equal to any other Symbol, even if you use the same description string. Use cases:
1. Collision-free object keys — two different libraries can add their own Symbol properties to a shared object without overwriting each other.
2. Enum-like constants — because each Symbol is unique, they work well as named constants where the actual value does not matter, only the identity.
3. Well-known Symbols — JavaScript uses specific Symbol values internally to let you customize behavior. Symbol.iterator lets you make an object work with for...of. Symbol.toPrimitive controls how an object is converted to a number or string.
4. Hidden properties — Symbol keys do not show up in for...in loops or Object.keys(), so they work as semi-private properties. You can still find them with Object.getOwnPropertySymbols() if needed.`,
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
    answer: `The classic bug: when you use var in a for loop, there is only one variable shared across all iterations. Any callbacks you create inside the loop all close over (remember) that same variable. By the time the callbacks run, the loop has finished and the variable holds its final value. Fix options: (1) Use let — it creates a fresh variable for each iteration of the loop. (2) Use an IIFE (an immediately invoked function expression — a function you call right away) to capture the current value in a new scope. (3) Use forEach or map — each call gets its own function scope, so there is no sharing problem. Using let is the standard fix in modern code.`,
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
    answer: `Proxy wraps an object so you can intercept basic operations on it — reading a property, writing a value, checking if a key exists, deleting a property, calling a function. You define handler functions (called traps) for each operation you want to intercept. Reflect provides the default behavior for each operation, so you can run the normal action and add your own logic around it. Common uses are: validating values before they are assigned, creating reactive objects (Vue 3's whole reactivity system is built on Proxy), logging property accesses for debugging, providing default values for missing properties, and mocking APIs in tests. Proxy has a measurable performance cost, so avoid it in code that runs thousands of times per second.`,
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
    answer: `Async iteration lets you loop over values that arrive asynchronously, one at a time, using the for await...of syntax. It works with any object that implements Symbol.asyncIterator — the async version of the iterator protocol (the interface JavaScript uses to loop over things). It awaits each value before moving to the next one. Useful for: reading from Node.js streams, fetching paginated API results where you do not want all pages in memory at once, processing large files line by line, or consuming async generators. Unlike Promise.all, which kicks off everything at once and waits for all of it, async iteration processes items one at a time in order. Use it when order matters or when running everything in parallel would overwhelm the server or client.`,
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
    answer: `V8 compiles JavaScript to native machine code using JIT (Just-In-Time) compilation — meaning the compilation happens right before the code runs, not ahead of time. V8 watches which parts of your code run frequently, assumes patterns will continue (for example, "this function always gets a number"), and compiles heavily optimized code for those assumptions. If an assumption later turns out to be wrong, V8 throws away the optimized code and falls back to a slower version — this is called deoptimization.

Hidden classes: V8 tracks the shape of your objects. When multiple objects are created with the same properties in the same order, they share a hidden class, and V8 can access their properties using a fast fixed offset instead of a hash-table lookup.

Things that cause deoptimization:
1. Calling the same function with different argument types (numbers one time, strings another) — called a polymorphic call site.
2. Deleting properties with delete — it leaves gaps in the hidden class layout.
3. Adding new properties to an object after construction — each addition creates a new hidden class transition.
4. Arrays with mixed types (numbers and strings together) — V8 cannot use its fast typed array path.

Practical rules to keep hot code fast: define all object properties in the constructor, use consistent types for the same variable or parameter, and avoid delete (set to undefined instead).`,
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
    answer: `Key design patterns (reusable solutions to common programming problems) with real examples:

Module pattern: Use ES modules (import/export) to organize code and keep internals private. In older non-module code, an IIFE (an immediately invoked function expression — a function you call right away) was used to create private scope.

Singleton: Ensure only one instance of something exists. In Node.js, module caching means any object you export is effectively a singleton. A Zustand store at module level in React works the same way.

Observer/Pub-Sub: Let multiple parts of your code react to events without being directly connected. DOM events, Node.js EventEmitter, RxJS Observables, and Redux's store.subscribe are all built on this pattern.

Factory: A function that creates and returns objects, hiding the details of how they are created. React.createElement and document.createElement are both factories.

Strategy: Pick an algorithm or behavior at runtime by passing it as a function. Sort comparison functions, arrays of validation rules, and middleware chains are all examples.

Proxy: Wrap an object to intercept operations on it. Vue 3's reactivity system and runtime input validation are built this way.

Decorator: Add behavior to a function or class without changing its source code. React higher-order components (like a withAuth wrapper) and TypeScript class decorators follow this pattern.`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['design-patterns', 'module', 'observer', 'singleton', 'factory', 'strategy'],
    tier: 'advanced',
  },
  // ─── Fresher additions ───────────────────────────────────────────────────
  {
    id: 'array-higher-order-methods',
    question: 'What do map, filter, and reduce do, and how do they differ?',
    answer: `All three are Array methods that leave the original array unchanged and return a new value.

map transforms every element and returns a new array of exactly the same length. Use it when you want to convert each item into something else.

filter tests each element against a condition and returns a new array with only the elements that passed. The result can be shorter than the original — it depends on how many items match.

reduce walks through the array and builds up a single result — it could be a number, a string, an object, or even another array. It is the most flexible of the three, but also the most complex to read.

Because none of these mutate the original array and each returns a new value, you can chain them together, which makes data transformations easy to read as a sequence of steps.`,
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
    answer: `Destructuring is a shorthand that lets you pull values out of an array or an object into named variables in a single line, rather than accessing them one by one.

Array destructuring assigns values by position. You can skip positions using commas and collect the remaining elements into a new array using rest (...).

Object destructuring assigns values by property name. You can rename a property while destructuring using a colon, set a default value using =, and collect the remaining properties into a new object using rest (...).

You can nest destructuring to reach values inside nested objects or arrays. Function parameters can also be destructured directly — this is very common with React component props.`,
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
    answer: `The ... syntax does two opposite things depending on where it appears.

Spread expands an iterable (like an array, string, or Set) or an object into individual items. Use it to clone arrays and objects, merge multiple arrays or objects together, or pass the contents of an array as separate arguments to a function.

Rest collects multiple separate values into a single array. It appears in function parameter lists (to accept any number of arguments) and in destructuring (to collect whatever is left after the other variables take their values).

One important thing to remember: spread creates a shallow copy. Nested objects inside the spread result still point to the same memory as the original — changing them changes both copies.`,
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
    answer: `Template literals use backtick characters (\`) instead of quotes. They let you embed any JavaScript expression directly inside the string using \${expr}, write multi-line strings without needing \\n, and nest template literals inside each other.

Tagged templates are an advanced use where you put a function name right before the backtick. Instead of producing a string directly, JavaScript calls your function and passes it two things: an array of the literal string parts, and the interpolated values as separate arguments. Your function decides what to do with them. This is how styled-components builds CSS strings, how sql libraries build safe parameterized queries (preventing SQL injection by never interpolating values directly), and how gql parses GraphQL query strings.`,
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
    answer: `typeof is an operator that returns a string describing the type of a value: 'number', 'string', 'boolean', 'bigint', 'symbol', 'undefined', 'function', or 'object'. Two things catch developers off guard: typeof null returns 'object' instead of 'null' (a bug in the original language spec that was never fixed), and typeof a function returns 'function' even though functions are objects.

instanceof checks whether an object was created by a particular constructor by walking the prototype chain (the linked chain of objects that JavaScript uses for inheritance). It works well for objects and class instances, but it can fail across different JavaScript realms — for example, an array created inside an iframe has a different Array constructor than the one in the parent page, so instanceof Array returns false.

For reliable type checks, prefer the purpose-built methods: Array.isArray() for arrays, Number.isNaN() for NaN (unlike the global isNaN which coerces first), and Object.prototype.toString.call(value) for specific object types like Date or RegExp.`,
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
    answer: `Optional chaining (?.) stops evaluation early and returns undefined if the value on the left is null or undefined, instead of throwing a TypeError. Without it, accessing a property on null crashes your code. With it, the expression just evaluates to undefined. It works on property access (obj?.prop), method calls (obj?.method()), and array indexing (arr?.[0]).

Nullish coalescing (??) provides a fallback value, but only when the left side is null or undefined — not for any falsy value. The || operator also provides a fallback, but it triggers for 0, empty string, and false too, which causes bugs when those are valid values you want to keep.

The two operators work well together: a?.b?.c ?? 'default' safely navigates a nested object path and falls back to 'default' only if the result was null or undefined.`,
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
    answer: `ES modules (ESM) use import and export syntax. The module graph (which file imports what) is resolved before any code runs, which lets bundlers do tree shaking — removing exports that nothing imports.

Named exports: a module can export multiple values by name. You import them using their exact exported name, or alias them with as. Default exports: one per module, imported with any name you choose. You can use both in the same file.

Dynamic import() loads a module on demand, returns a Promise, and is the basis of code splitting (loading parts of your app only when needed rather than all at once on startup).

Key differences from CommonJS (the older Node.js require system): ESM is always in strict mode. ESM imports are live bindings — if the exporting module reassigns a value, importers see the new value. ESM files cannot use require() or __dirname — use import.meta.url instead.`,
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
    answer: `Set stores only unique values. Checking if a value exists (has()), adding, and deleting are all O(1) operations — meaning they take the same amount of time regardless of how many items are in the Set. Array.includes() is O(n), meaning it gets slower as the array gets larger. Use Set for deduplicating arrays, tracking IDs you have already processed, or doing fast membership checks.

Map stores key-value pairs like a plain object, but with two important differences: keys can be any type — objects, functions, arrays, anything — and the order of insertion is preserved. Plain objects convert all keys to strings, which means using an object as a key just gives you '[object Object]'. Map also has a .size property and iterates cleanly with for...of. Use Map when you need non-string keys, when you are building a counter or grouping data, or when insertion order matters.

Both Set and Map avoid the prototype pollution risk that plain objects have (where a key like 'constructor' or 'toString' can collide with inherited properties).`,
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
    answer: `JavaScript has several built-in error types. Error is the base class. TypeError is thrown when a value is the wrong type (like calling a non-function). ReferenceError happens when you access a variable that does not exist. SyntaxError means the code could not be parsed. RangeError means a value is outside the allowed range. All of these have a message and a stack property (a string showing the call stack at the point the error was thrown).

To create a custom error, extend the Error class. Set this.name in the constructor so the error type shows correctly in logs. You can then use instanceof in a catch block to handle specific error types differently — which is much more reliable than checking error message strings.

Always throw an instance of Error (or a subclass), never a plain string. Thrown strings do not have a stack trace, and you cannot use instanceof to identify them.`,
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
    answer: `Web Workers run JavaScript in a separate background thread, away from the main UI thread. The main thread and a worker communicate by sending messages to each other using postMessage and onmessage. Workers do not have access to the DOM, window, or document — they can only do computation and make network requests.

Use them for any work that is heavy enough to freeze the page if it ran on the main thread: processing images or video, transforming large datasets, running cryptography, compressing files, sorting and filtering very large lists, or executing WebAssembly (compiled code that runs at near-native speed).

SharedArrayBuffer lets the main thread and workers share memory directly without copying data back and forth. This requires cross-origin isolation security headers on the page (COOP and COEP). The Atomics object provides thread-safe operations (like incrementing a counter) on shared memory so two threads do not corrupt data by writing at the same time.`,
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
    answer: `A bundler (Webpack, Vite, Rollup, esbuild) starts from your entry file, follows every import, and combines all the code into one or more output files (bundles) that the browser can load. Along the way it also transforms code (TypeScript to JavaScript, JSX to JavaScript), minifies it (shortening variable names and removing whitespace to reduce file size), and can split the output into multiple chunks loaded on demand.

Tree shaking is the bundler's ability to remove exports that nothing imports. It works by reading the import/export statements before running any code — this is only possible with ESM (ES modules), not CommonJS, because CommonJS imports can be computed at runtime. The bundler marks each export as used or unused, then drops the unused ones from the output. This is why importing a single function from a large utility library is cheaper than importing the whole thing.

For tree shaking to work well: use ESM imports, avoid patterns where importing a file runs side effects (code that changes global state on import), and add "sideEffects": false to package.json so the bundler knows it is safe to remove unused imports from your package. Dynamic import() calls produce separate code chunks — this is called code splitting.`,
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
    answer: `XSS (Cross-Site Scripting): an attacker injects a malicious script into your page, usually through user-generated content. When other users load the page, the script runs in their browser and can steal session tokens or act on their behalf. Prevention: never put user input into innerHTML or eval(). Use textContent for plain text. If you must render HTML, sanitize it first with a library like DOMPurify. Set a Content-Security-Policy (CSP) HTTP header to restrict which scripts the browser will run.

Prototype Pollution: an attacker sends JSON like {"__proto__": {"isAdmin": true}} which, if merged naively into an object, sets a property on Object.prototype — making every object in your app appear to have isAdmin set to true. Prevention: validate incoming JSON with a schema, use Object.create(null) for data dictionaries (creates an object with no prototype), or use a safe merge library that ignores __proto__ keys.

eval() and the Function() constructor execute arbitrary strings as JavaScript code. If any user input reaches them, an attacker can run anything. Prevention: never use eval(). Use JSON.parse to parse JSON, and a lookup table (an object mapping strings to functions) instead of eval for dynamic dispatch.

CSRF (Cross-Site Request Forgery): an attacker tricks a logged-in user's browser into making a request to your server — for example by embedding a hidden form on another site. Prevention: use SameSite=Strict or SameSite=Lax cookies (the browser will not send them on cross-site requests), add CSRF tokens to forms, and verify the Origin or Referer header on state-changing requests.`,
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
    answer: `The browser follows a fixed series of steps every time it renders a page:
1. Parse HTML — read the HTML file and build the DOM tree (a tree of all the elements on the page).
2. Parse CSS — read all the CSS and build the CSSOM tree (a tree of all the style rules). CSS is render-blocking, meaning the browser will not paint anything until it has finished reading all the CSS.
3. Build the Render Tree — combine the DOM and CSSOM to produce a tree of only the visible elements, each with its computed styles attached.
4. Layout (also called Reflow) — calculate the exact position and size of every element on the page.
5. Paint — fill in the actual pixels: colors, text, borders, shadows, backgrounds, onto one or more layers.
6. Composite — the GPU takes all the layers and combines them in the correct order to produce the final frame shown on screen.

The Critical Rendering Path (CRP) is the minimum set of steps needed before the user sees the first pixel. Reducing render-blocking CSS and JavaScript, and keeping the DOM small, shortens this path and speeds up the first paint.`,
    difficulty: 'experienced',
    tags: ['rendering', 'critical-rendering-path', 'dom', 'cssom', 'layout', 'paint', 'composite'],
    tier: 'core',
  },
  {
    id: 'async-vs-defer',
    question: 'What is the difference between async and defer on a script tag?',
    answer: `A plain script tag blocks the browser from parsing the rest of the HTML until the script downloads and runs. Both async and defer fix this by downloading the script in the background while HTML parsing continues — but they differ in when they run.

async runs the script as soon as it finishes downloading, even if the HTML is not fully parsed yet. Multiple async scripts can run in any order. Use this for scripts that are completely independent, like analytics or chat widgets.

defer runs the script only after the full HTML has been parsed, and multiple deferred scripts always run in the order they appear in the document. Use this for scripts that read the DOM or depend on each other.

Scripts with type="module" behave like defer by default — they always run after parsing and in document order.`,
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
    answer: `Core Web Vitals are three specific measurements Google uses to score how well a real user experiences a page. They are used in search ranking.

LCP (Largest Contentful Paint, target under 2.5 seconds): measures how long until the largest visible element — usually a hero image or heading — is fully rendered. Improve it by preloading the hero image, optimizing server response time, using modern image formats like WebP or AVIF, and never lazy-loading images that are above the fold (visible without scrolling).

INP (Interaction to Next Paint, target under 200ms): measures the delay between a user action (click, tap, key press) and the next frame being painted — specifically the worst interaction across the entire session. Improve it by breaking long JavaScript tasks into smaller chunks using scheduler.yield(), moving heavy computation to Web Workers, and deferring JavaScript that is not needed immediately.

CLS (Cumulative Layout Shift, target under 0.1): measures how much the page layout shifts unexpectedly after it loads — like an image loading and pushing text down. Improve it by always setting explicit width and height on images and videos (or using aspect-ratio in CSS to reserve space), and avoiding inserting content above content the user is already reading.`,
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
    answer: `Start in the Performance tab. Click Record, reproduce the slowness, then stop. Read the flame chart — each bar is a function call, its width shows how long it took. Look for tasks with a red triangle (long tasks over 50ms that block input), wide yellow bars (JavaScript), purple bars (layout/reflow), and green bars (paint). The Bottom-Up tab lists functions ranked by how much time they consumed.

For memory leaks, go to the Memory tab. Take a heap snapshot (a full picture of every object in memory) before the suspected leak, interact with the page, then take another snapshot. Compare the two and look for objects that grew. Search snapshots for "Detached" — DOM elements that were removed from the page but are still referenced in JavaScript.

The Coverage tab (open from the command palette with Ctrl+Shift+P and search "Coverage") shows which JavaScript and CSS bytes were not used on the initial load, helping you decide what to code-split or lazy-load.

The Rendering panel (under More Tools) lets you enable Paint Flashing — which highlights areas being repainted each frame — and Layout Shift Regions, which shows where CLS (unexpected layout movement) is coming from.

For mobile performance, connect a real Android device via USB and open chrome://inspect. Desktop CPUs are roughly 5–8x faster than typical mobile chips, so what feels instant on your laptop may be slow on a real phone.`,
    difficulty: 'experienced',
    tags: ['profiling', 'devtools', 'performance', 'flame-chart', 'memory-leak', 'heap-snapshot'],
    tier: 'advanced',
  },
  {
    id: 'performance-now-vs-date-now',
    question: 'Why use performance.now() instead of Date.now() for benchmarking?',
    answer: `performance.now() returns a high-resolution timestamp (measured from when the page started loading) with sub-millisecond precision. It is monotonic, meaning it only ever increases — it never jumps or goes backwards. Date.now() only gives millisecond precision and can jump forward or backward if the system clock is adjusted by NTP sync, daylight saving time changes, or manual changes. For measuring how long code takes to run — whether you are benchmarking a function, measuring animation frame budgets, or profiling a slow operation — always use performance.now(). It gives you meaningful results even for operations that complete in under a millisecond.`,
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
    answer: `Babel is a transpiler — a tool that converts modern JavaScript (ES6+, JSX, TypeScript) into an older form that runs in environments which do not support the newer syntax. It remains relevant even with modern browsers because: (1) you may still need to support older browsers or older Node.js versions that lack some features, (2) it handles JSX transformation for React — turning <div /> into React.createElement calls, (3) it supports experimental language proposals via plugins before those features are officially available in browsers, and (4) it is built into most bundler pipelines (Webpack, Vite, Create React App) so it runs as part of your build even when you do not think about it directly.`,
    difficulty: 'experienced',
    tags: ['babel', 'transpiler', 'build-tools', 'es6'],
    tier: 'advanced',
  },
  {
    id: 'babel-preset-vs-plugin',
    question: 'What is the difference between a Babel preset and a plugin?',
    answer: `A Babel plugin performs a single transformation — for example, @babel/plugin-transform-arrow-functions rewrites arrow functions into regular functions. A preset is a pre-packaged collection of plugins that work together. Instead of listing dozens of individual plugins, you use a preset and Babel applies all of them.

@babel/preset-env is the most important preset. You tell it which browsers or Node versions you need to support (using a browserslist config), and it looks up which JavaScript features those environments already support. It then includes only the transforms that are actually needed — skipping transformations your targets handle natively. This keeps your output smaller.`,
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
    answer: `Transpiling rewrites syntax — it converts newer JavaScript syntax into older equivalent code. Arrow functions become regular functions, class becomes constructor functions with prototype assignments. This is a source-code transformation done at build time.

Polyfilling adds missing built-in APIs that older environments do not have at all — things like Promise, Array.prototype.flatMap, or fetch. A polyfill is JavaScript code that implements the API so the environment behaves as if it natively supported it. Polyfills run at runtime.

Babel handles transpiling. core-js is the most common polyfill library for JavaScript built-ins. You need both for full compatibility. Using @babel/preset-env with useBuiltIns: 'usage' automates this — it scans your code and injects only the specific polyfills your code actually uses, rather than including everything.`,
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
    answer: `Source maps are files (ending in .map) that map your compiled, minified output back to your original source code. When enabled, they let you see readable TypeScript with real variable names in the browser DevTools even though the browser is actually running minified JavaScript. This is very useful for debugging in development.

The security problem: if those .map files are deployed to your production server and served publicly, anyone can open the DevTools Sources tab and read your original TypeScript — the complete, readable source, with file paths, logic, and variable names. Minification provides no protection when source maps are exposed.

The fix is to disable source maps in production builds. If you still want readable stack traces in an error monitoring tool like Sentry, you can generate the .map files during the build, upload them to Sentry using their CLI, and then delete them before deploying. Your users never see the map files, but Sentry can use them to decode stack traces from production errors.`,
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
    answer: `dependencies are packages your application needs while it is running — for example React, axios, or a date library. These get installed when someone runs npm install in production.

devDependencies are packages only needed during development or the build process — TypeScript, ESLint, Vite, test runners. They are not installed in production environments (when you run npm install --production or deploy to a server).

peerDependencies are used by library authors to declare a requirement on the host application. Instead of bundling the dependency themselves, the library says "you must provide this." For example, a React component library lists React as a peer dependency because it expects the app to already have React installed. This prevents having two separate copies of React in the same app, which would break React's context and hooks system.`,
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
    answer: `package-lock.json records the exact version of every package installed — not just your direct dependencies, but every package those packages depend on too. This means every developer on the team and every CI (continuous integration — automated build and test) environment installs the exact same versions, no matter when they run npm install.

Without a lockfile, npm resolves dependencies freshly each time. As new patch or minor versions are published, installs on different machines can end up with slightly different versions, leading to bugs that only reproduce on some machines. yarn.lock and pnpm-lock.yaml serve the same purpose for their respective package managers.

Always commit the lockfile to version control. Never add it to .gitignore.`,
    difficulty: 'experienced',
    tags: ['npm', 'package-lock', 'lockfile', 'reproducible-builds'],
    tier: 'core',
  },
  {
    id: 'npm-vs-yarn-vs-pnpm',
    question: 'What are the differences between npm, yarn, and pnpm?',
    answer: `npm is the package manager that ships with Node.js. It has improved a lot in recent versions — v7 added workspaces (managing multiple packages in one repository) and automatic peer dependency installation. It is the default choice for most projects.

Yarn was created to fix early npm problems: slow installs, inconsistent results, no lockfile. Yarn added parallel downloads, offline caching, and workspaces. Yarn Berry (v2 and later) introduced Plug'n'Play — a mode that removes node_modules entirely and stores packages in a single compressed archive, making installs much faster. Plug'n'Play requires editors and tools to support it.

pnpm uses a global content-addressable store (a central place where each version of a package is stored once on disk). Each project gets hard links (file system shortcuts) into that store instead of a full copy. This makes installs fast and saves significant disk space when many projects use the same packages. pnpm is also strict about what your code can import — you can only use packages you have explicitly listed in your own package.json, which prevents phantom dependencies.`,
    difficulty: 'experienced',
    tags: ['npm', 'yarn', 'pnpm', 'package-management', 'build-tools'],
    tier: 'advanced',
  },
  {
    id: 'phantom-dependency',
    question: 'What is a phantom dependency?',
    answer: `A phantom dependency is a package you import in your code that is not listed in your own package.json — it is only there because one of your real dependencies happened to install it. npm and yarn hoist packages (move them up to the root node_modules folder), which accidentally makes all transitive dependencies importable as if they were your own.

This is fragile. If the package that originally brought in the phantom dependency updates or stops depending on it, your import silently breaks — even though you changed nothing. It is a hidden coupling to another package's internal implementation.

pnpm prevents this. It uses strict linking so that only packages explicitly declared in your package.json are importable. Trying to import a phantom dependency throws a module-not-found error immediately, making the problem visible at development time rather than in production.`,
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
    answer: `Grunt is a task runner — a tool for automating repetitive development tasks like compiling, linting, and minifying. Each task was configured as a JavaScript object and ran in sequence. The problem is that every task read files from disk and wrote results back to disk before the next task could start. For a large project with many tasks, this is slow.

Gulp was a step forward — it used Node.js streams (a way to pipe data through a chain of steps in memory) instead of reading and writing disk between every step. This made it significantly faster than Grunt.

Webpack, Rollup, and Vite replaced both for bundling. They work with an in-memory module graph (they understand the import/export relationships between your files) rather than just moving files around. For simple scripting tasks that do not involve bundling, npm scripts in package.json are enough — no extra tool needed.

Today, a bundler like Vite plus npm scripts covers everything Grunt once did, with better performance and much less configuration.`,
    difficulty: 'experienced',
    tags: ['grunt', 'gulp', 'build-tools', 'task-runner', 'history'],
    tier: 'advanced',
  },
  {
    id: 'fetch-gotchas',
    question: 'What are the most common Fetch API gotchas and how do you avoid them?',
    answer: `Three problems catch almost everyone when they first use Fetch:

1. Fetch does not reject on HTTP errors. A 404 or 500 response still resolves the Promise — res.ok is just set to false. You must check res.ok yourself and throw an error manually, or write a wrapper function that does it for you. Axios handles this automatically, which is one reason teams prefer it.

2. The response body can only be read once. Calling res.json() reads the underlying stream and closes it. Calling res.text() afterward throws an error. If you need to read the body twice — for example to log the raw text and also parse it as JSON — call res.clone() to make a copy first.

3. There is no built-in timeout. If the server stops responding, the fetch will hang forever. Use AbortController with a setTimeout to cancel it after a limit, and always clear the timeout in a finally block so the timer does not stay alive after the request finishes.

Two more common surprises: CORS errors (when your page tries to fetch from a different domain) show up as a generic network error in the console rather than telling you the actual reason. The server must send an Access-Control-Allow-Origin header to allow cross-origin requests. And for APIs that use cookies for authentication, you must pass credentials: 'include' in the fetch options — without it, the browser will never send cookies on cross-origin requests, even if the server says it allows them.`,
    codeExample: `// The right fetch wrapper — handles all three gotchas
async function apiFetch(url, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) {
      const body = await res.text(); // read error body before throwing
      throw Object.assign(new Error(\`HTTP \${res.status}\`), { status: res.status, body });
    }
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('Request timed out');
    throw err;
  } finally {
    clearTimeout(id); // always clear — avoids memory leaks
  }
}`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['fetch', 'http', 'error-handling', 'AbortController', 'CORS', 'network'],
    tier: 'core',
  },
  {
    id: 'fetch-advanced-patterns',
    question: 'How do you implement timeout, retry with back-off, and request deduplication using the Fetch API?',
    answer: `These three patterns solve the most common production needs beyond a basic fetch call.

Timeout: create an AbortController, call abort() after a delay using setTimeout, and pass the signal to fetch. Always clear the timer in a finally block — if you skip this, the timer fires after a successful response and the reference keeps memory alive until it does.

Retry with exponential back-off: when a request fails, wait before trying again — and wait longer each time. The delay grows as 2^attempt × baseDelay (200ms, 400ms, 800ms). Always stop retrying on AbortError, because that means the user or the code intentionally cancelled the request. Only automatically retry requests that are idempotent (safe to repeat without side effects) — GET, PUT, DELETE. Retrying a POST risks creating duplicate records on the server.

Request deduplication: if several parts of your app request the same URL at the same time (for example, multiple components mounting and each calling the same API), you end up with duplicate network requests. Store the in-flight Promise in a Map keyed by the URL. When a second request comes in for the same URL, return the existing Promise instead of starting a new fetch. Clear the Map entry in a finally block so the next request after the current one finishes starts a fresh fetch.`,
    codeExample: `// Timeout
async function fetchTimeout(url, ms = 5000, options = {}) {
  const ac = new AbortController();
  const id = setTimeout(() => ac.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: ac.signal });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } finally { clearTimeout(id); }
}

// Retry with exponential back-off
async function fetchRetry(url, options = {}, { retries = 3, base = 200 } = {}) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchTimeout(url, 5000, options);
    } catch (err) {
      if (err.name === 'AbortError' || i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, base * 2 ** i)); // 200, 400, 800ms
    }
  }
}

// Request deduplication
const inflight = new Map();
function deduplicatedFetch(url) {
  if (inflight.has(url)) return inflight.get(url);
  const promise = fetch(url)
    .then(r => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json(); })
    .finally(() => inflight.delete(url));
  inflight.set(url, promise);
  return promise;
}`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['fetch', 'AbortController', 'retry', 'timeout', 'deduplication', 'network', 'patterns'],
    tier: 'advanced',
  },
  {
    id: 'axios-interceptors-refresh',
    question: 'How do Axios interceptors work, and how do you implement a token refresh flow?',
    answer: `Interceptors are functions that run automatically before every request is sent, or after every response arrives — similar to middleware in a server framework. You add them with interceptors.request.use() and interceptors.response.use(), and remove them with eject(). Request interceptors run in the reverse order they were added (last in, first out). Response interceptors run in the order they were added (first in, first out).

A token refresh flow is the most common interceptor use case. When the server returns a 401 (Unauthorized — usually meaning the access token has expired), the response interceptor catches it, fetches a new token silently in the background, updates the Authorization header, and replays the original request — all without the part of your code that made the original call knowing anything happened.

The tricky edge case is concurrent 401s: if five requests all fire with an expired token at the same time, you do not want five separate token refresh calls running in parallel. The solution is a flag (isRefreshing) and a queue. The first 401 starts the refresh. The other four 401s queue their original requests. When the refresh finishes, the queue is drained and all five requests are retried with the new token.

The _retry flag on the request config prevents an infinite loop: if the refreshed request also returns 401, the interceptor sees _retry is already true and rejects instead of trying to refresh again — which would mean the session is truly invalid.

Use axios.isAxiosError(err) to check if an error came from Axios rather than err instanceof AxiosError — it is more reliable across different module systems and bundled library scenarios.`,
    codeExample: `import axios from 'axios';

const api = axios.create({ baseURL: '/api', timeout: 10_000 });

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Token refresh with queue to prevent concurrent refresh storms
let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

function processQueue(newToken: string) {
  queue.forEach(resolve => resolve(newToken));
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until refresh completes
      return new Promise((resolve) => {
        queue.push((token) => {
          original.headers.Authorization = \`Bearer \${token}\`;
          resolve(api(original));
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post('/auth/refresh');
      localStorage.setItem('token', data.token);
      api.defaults.headers.Authorization = \`Bearer \${data.token}\`;
      processQueue(data.token);
      return api(original); // retry the original request
    } catch (refreshError) {
      localStorage.removeItem('token');
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);`,
    codeLanguage: 'typescript',
    difficulty: 'expert',
    tags: ['axios', 'interceptors', 'token-refresh', 'auth', 'http', 'network'],
    tier: 'advanced',
  },
  {
    id: 'axios-vs-fetch-decision',
    question: 'When would you choose Axios over the native Fetch API?',
    answer: `The decision comes down to what you need built in versus what you are willing to build yourself.

Choose Fetch when: the project is simple, you want zero extra dependencies, you are using Node 18+ where fetch is available natively, and you do not need interceptors or upload progress.

Choose Axios when: (1) you need interceptors — attaching auth tokens, refreshing expired tokens, or normalizing error shapes are much cleaner with Axios's built-in interceptor pipeline than wrapping fetch manually. (2) You need upload progress reporting — Axios exposes onUploadProgress out of the box; Fetch cannot do this natively. (3) The team already uses Axios — consistency across a codebase is usually worth more than the bundle size savings. (4) You are targeting Node versions below 18 where fetch is not available.

The bundle cost argument against Axios (it is about 13 kB gzipped) is often overstated. In a typical React app, that is a small fraction of the total JavaScript. If bundle size is genuinely critical, you can build a thin fetch wrapper — but you are then rebuilding error handling, JSON parsing, and interceptors yourself.

One important thing to know when switching between the two: Axios rejects the Promise for any 4xx or 5xx response by default, but you can change this with validateStatus. Fetch never rejects on HTTP status codes — you must check res.ok yourself. Teams that switch between the two often introduce bugs at this seam.`,
    codeExample: `// Minimal fetch wrapper that matches Axios behaviour
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const err = new Error(\`HTTP \${res.status}\`);
    err.response = { status: res.status, data: await res.json().catch(() => null) };
    throw err;
  }
  return res.json();
}

// vs Axios — the same in three lines:
const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use(cfg => {
  cfg.headers.Authorization = \`Bearer \${localStorage.getItem('token')}\`;
  return cfg;
});`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['axios', 'fetch', 'http', 'comparison', 'network', 'decision'],
    tier: 'advanced',
  },
];

export default jsQna;
