import type { ConceptCard } from '@/types/content';

const jsTheory: ConceptCard[] = [
  {
    id: 'lexical-scope',
    title: 'Lexical Scope & Scope Chain',
    summary: 'A variable\'s scope is set by where it is written in the code, not by where the code is eventually called from.',
    body: `JavaScript uses lexical scoping (also called static scoping): when you write a variable inside a function or block, that location in the source code determines where the variable is visible. Functions create their own scope. Blocks (if/for/while) create scope for let and const.

When JavaScript looks up a variable, it starts in the current function's scope, then moves outward to the surrounding scope, then outward again — all the way to the global scope if needed. This chain of scopes is called the scope chain. It is built when the code is written, not when it runs.

The scope chain explains two things that confuse beginners: inner functions can read variables from outer functions, but outer functions cannot reach into inner ones. It also explains why closures work — when an inner function is kept alive after its outer function returns, it still holds a reference to the outer scope through the chain.`,
    tags: ['scope', 'lexical-scope', 'scope-chain', 'variables'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'hoisting',
    title: 'Hoisting',
    summary: 'JavaScript reads your declarations before running your code, which is why some variables and functions can be used before the line where they appear.',
    body: `Hoisting is what happens during JavaScript's setup phase before your code runs. The engine scans your code and registers declarations first. Only declarations are hoisted — the values assigned to them are not.

Function declarations are fully hoisted. You can call a function before the line where it is defined and it works fine. var declarations are hoisted and given the value undefined until your code actually assigns a value. let and const are also hoisted, but they are placed in a Temporal Dead Zone (TDZ) — a period where the variable exists but cannot be read. Accessing a let or const before its declaration line throws a ReferenceError.

This explains a common surprise: reading a var before it is assigned gives you undefined instead of an error. It also explains why you can call a function declaration anywhere in its scope.`,
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
    id: 'type-coercion-system',
    title: 'Type Coercion & Type Conversion',
    summary: 'JavaScript quietly converts values from one type to another in many situations — knowing the rules helps you avoid confusing bugs.',
    body: `JavaScript has two kinds of type change. Implicit coercion is automatic — the engine does it for you. Explicit conversion is intentional — you do it yourself with functions like Number() or String().

Implicit coercion happens in comparisons with ==, arithmetic operations, boolean contexts (if statements, &&, ||), and template literals. The + operator is the trickiest one: if either side is a string, it concatenates instead of adding numbers.

Explicit conversion uses Number(), String(), Boolean(), parseInt(), and parseFloat(). These are predictable and safe to use.

Boolean coercion (deciding if something is "truthy" or "falsy") follows a simple rule: a small set of values are falsy — 0, -0, 0n, empty string '', null, undefined, and NaN. Everything else is truthy, including empty arrays [], empty objects {}, the string '0', and the string 'false'.

The == operator (loose equality) tries to convert both sides to the same type before comparing. This is why 0 == false is true, and why null == undefined is true — both are special cases in the conversion rules.`,
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
    id: 'closures',
    title: 'Closures',
    summary: 'A function that remembers the variables from where it was created, even after that outer function has finished running.',
    body: `A closure forms when an inner function references variables from its outer function. The inner function does not copy those variables — it holds a live reference to them. So if the outer function changes a variable, the inner function sees the updated value.

Closures are one of the most useful features in JavaScript. They let you keep private state inside a function, create factory functions (functions that build other functions), implement caching, and manage state in event handlers — all without needing a class.

A common mistake involves var in loops. Because var is function-scoped rather than block-scoped, every loop iteration shares the same variable. When the callback runs later, it reads the final value of that variable, not the value it had at the time the loop ran. The fix is to use let, which creates a new variable for each iteration.`,
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
    id: 'this-keyword',
    title: 'The `this` Keyword',
    summary: '`this` is a special variable whose value changes depending on how and where a function is called.',
    body: `In regular functions, this is not set when the function is written — it is set when the function is called. There are four rules that determine its value, checked in this priority order:

1. new binding: if you call a function with new, this is the freshly created object.
2. Explicit binding: if you use .call(), .apply(), or .bind(), this is whatever object you pass in.
3. Implicit binding: if you call a function as a method — like obj.fn() — this is obj.
4. Default binding: if none of the above apply, this is undefined in strict mode, or the global object (window in browsers) otherwise.

Arrow functions do not have their own this. Instead, they capture this from the surrounding code where they were written. This makes them a good choice for callbacks inside class methods, where you want this to keep pointing to the class instance.`,
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
    id: 'prototype-chain',
    title: 'Prototype Chain',
    summary: 'Every JavaScript object has a hidden link to another object called its prototype — property lookups walk this chain until the property is found or the chain ends.',
    body: `Every JavaScript object has an internal link called [[Prototype]] that points to another object (or null). When you try to access a property, JavaScript first checks the object itself. If the property is not there, it follows the [[Prototype]] link to the next object, and keeps going until it finds the property or reaches null. This chain is called the prototype chain.

You can set the prototype explicitly with Object.create(proto). When you use a constructor function with new, the new object's prototype is automatically set to that constructor's .prototype property. The class keyword is just a cleaner way to write this same thing — under the hood it still uses prototypes.

This system means methods are shared, not copied. Every array you create shares the same methods from Array.prototype. No matter how many arrays exist, there is only one copy of each method in memory.`,
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
    id: 'event-loop',
    title: 'Event Loop & Call Stack',
    summary: 'JavaScript can only do one thing at a time. The event loop is the system that decides what runs next — managing the call stack, async callbacks, and Promise handlers.',
    body: `JavaScript runs on a single thread, meaning it can only execute one piece of code at a time. It has one call stack (the list of functions currently running). When you call a function it is pushed onto the stack; when it returns it is removed.

Async operations like setTimeout and fetch do not block the stack. They are handed off to browser APIs, which handle them in the background and push their callbacks into a queue when they are ready. The event loop watches the call stack — when it is empty, it picks the next item from the queue and runs it.

There are two queues with different priorities. The microtask queue holds Promise .then callbacks and runs completely after every task before the next task starts. The macrotask queue holds setTimeout and setInterval callbacks and runs one item at a time.

This explains three things that often surprise developers: setTimeout(fn, 0) still runs after all your synchronous code, Promise callbacks always run before setTimeout callbacks, and a large synchronous task will freeze the browser because nothing else can run until the stack clears.`,
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
    id: 'async-evolution',
    title: 'Async Patterns: Callbacks → Promises → Async/Await',
    summary: 'JavaScript async code started with callbacks, improved with Promises, and became much more readable with async/await — each step solved the problems of the one before it.',
    body: `Callbacks were the original approach. You pass a function to be called when the async work finishes. The problem is that nesting callbacks inside other callbacks quickly becomes hard to read and hard to track errors through. This is often called "callback hell."

Promises represent a future value. They let you chain .then(), .catch(), and .finally() calls in a flat, readable sequence instead of nested functions. Errors automatically travel down the chain to the nearest .catch(). Promise.all, Promise.race, and Promise.allSettled give you tools for running multiple async operations together.

Async/await is a cleaner way to write Promise-based code. It makes async logic look like regular step-by-step code. An async function always returns a Promise. The await keyword pauses that function until the Promise settles, then continues. Error handling works with familiar try/catch blocks.

Important to know: async/await is not a different system — it is built on top of Promises and the same event loop. You can mix them freely. You can await a .then() chain, and you can return a Promise from an async function.`,
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
    id: 'event-bubbling',
    title: 'Event Bubbling & Delegation',
    summary: 'When a DOM event fires on an element, it travels up through all the parent elements too — this is called bubbling, and you can use it to handle many elements with a single listener.',
    body: `When a DOM event fires, it passes through three phases. First it travels down from the window to the target element (capture phase). Then it fires on the target itself (target phase). Then it travels back up through every parent element all the way to the window (bubble phase). Most event listeners only use the bubble phase.

Event delegation is a technique that takes advantage of bubbling. Instead of attaching a click listener to every list item, you attach one listener to the parent list. When a click happens on any child, it bubbles up to the parent listener. You then check event.target to see which specific child was clicked. This is more efficient and it automatically works for elements added to the list later.

Two methods let you control event behavior. event.stopPropagation() stops the event from traveling further up the tree. event.preventDefault() stops the browser from doing its default action — like following a link or submitting a form. These are independent from each other and you can use either one without the other.`,
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
    id: 'pure-functions',
    title: 'Pure Functions & Immutability',
    summary: 'A pure function gives the same result every time it is called with the same inputs, and does not change anything outside itself.',
    body: `A pure function has two properties. First, it is deterministic — the same inputs always produce the same output, every single time. Second, it has no side effects — it does not modify external variables, make API calls, write to the DOM, or read from global state.

Pure functions are easy to test because you just check the return value. They are safe to cache (memoize) because you know the result will not change for the same inputs. They are also predictable — you can read a pure function in isolation and fully understand what it does.

Immutability works alongside pure functions. Instead of modifying an existing object or array, you create a new one with the changes applied. This makes state changes visible and easy to trace. React relies on this principle — it detects changes by checking if the value is a new reference. You can achieve immutable updates with spread syntax, Object.assign(), or a library like Immer for nested structures.`,
    tags: ['pure-functions', 'immutability', 'functional', 'side-effects'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'currying',
    title: 'Currying & Partial Application',
    summary: 'Currying breaks a function that takes multiple arguments into a chain of functions that each take one argument.',
    body: `A curried function does not take all its arguments at once. Instead it takes the first argument and returns a new function that takes the next argument, and so on until all arguments are provided. This lets you partially apply a function — supply some arguments now and get back a ready-to-use function that remembers those values.

This is useful when you have a function that is almost the same across many calls but one argument always changes. You bake in the shared arguments and create a specialized function. Libraries like Ramda and lodash/fp curry all their functions automatically.

Partial application is a related idea. Instead of going one argument at a time, you fix several arguments at once using Function.prototype.bind or a helper function. Both currying and partial application make it easier to reuse and combine small functions into larger ones.`,
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
    id: 'functional-programming-concepts',
    title: 'Functional Programming in JavaScript',
    summary: 'Functional programming is a style that focuses on pure functions, avoiding shared state, and treating data as immutable.',
    body: `Key functional programming concepts in JavaScript:

Pure functions: same inputs always give the same output, with no side effects. Easy to test and safe to cache.

Immutability: do not change data in place. Create a new value with the update applied. JavaScript arrays and objects are mutable by default, so use spread, map, filter, and reduce to create new values rather than editing the originals.

Higher-order functions (HOF): functions that accept other functions as arguments, or return a function as their result. map, filter, and reduce are HOFs. This pattern makes it easy to combine behavior.

Function composition: build complex behavior by combining small pure functions. The output of one function becomes the input of the next. pipe() runs them left to right; compose() runs them right to left. Libraries like Ramda provide these utilities.

Currying and partial application: break a multi-argument function into a chain of single-argument functions. This lets you create specialized versions — for example, const double = multiply(2) — and reuse them across your code.

JavaScript is not a purely functional language — it has mutable data, loops, and side effects. But applying these ideas selectively makes your code more predictable and easier to test.`,
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
    id: 'observer-pattern',
    title: 'Observer / Pub-Sub Pattern',
    summary: 'A pattern where objects can subscribe to be notified when another object changes — the foundation of DOM events and many reactive systems.',
    body: `The Observer pattern sets up a relationship where one object (the publisher) notifies many other objects (subscribers) whenever something happens. The publisher does not need to know who is listening — it just announces the event and the subscribers react. This separation makes it easy to add or remove listeners without touching the publisher.

JavaScript's DOM event system is a built-in example of this pattern — addEventListener and removeEventListener let you subscribe and unsubscribe. Node.js EventEmitter, RxJS Observables, Vue's reactivity system, and Redux's store.subscribe are all variations of the same idea.

The Pub/Sub (publish/subscribe) variation adds an event bus in the middle. The publisher and subscriber do not even hold a reference to each other — they only know about the shared bus. This is useful when different parts of an app need to communicate without being directly connected.`,
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
    id: 'modules-commonjs-vs-esm',
    title: 'Module Systems: CommonJS vs ESM',
    summary: 'JavaScript has two module systems — the older CommonJS used in Node.js, and the modern ESM standard — and they work differently in important ways.',
    body: `CommonJS uses require() and module.exports. It loads modules synchronously (one at a time, blocking) at runtime. You can call require() anywhere — inside an if block or inside a function. Modules are cached after the first load, so requiring the same file twice returns the same object. This is the default in older Node.js code.

ESM uses import and export. It is analyzed before any code runs — the module graph (which file imports which) is fully resolved at parse time. This makes it possible for bundlers to do tree shaking (removing unused exports). Imports are live bindings, meaning if the module that exported a value later changes it, importers see the updated value. The dynamic import() form is async and can go anywhere.

Key differences to remember: ESM is always in strict mode. ESM does not have __dirname or __filename — use import.meta.url instead. You cannot use require() in an ESM file.

Node.js supports both systems. Files with .mjs use ESM; files with .cjs use CommonJS. Setting "type": "module" in package.json makes plain .js files use ESM by default.`,
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
    id: 'garbage-collection',
    title: 'Garbage Collection',
    summary: 'JavaScript automatically frees memory you are no longer using — but certain patterns can accidentally keep memory alive longer than intended.',
    body: `JavaScript engines handle memory for you automatically using a garbage collector (GC). The most common approach is called mark-and-sweep: the GC starts from known roots (global variables, the current call stack), marks every object it can reach by following references, then frees everything that was not marked.

Memory leaks happen when you accidentally hold a reference to something you no longer need. Common causes are forgotten event listeners, closures that keep large data alive, DOM elements removed from the page but still referenced in JavaScript, and caches that grow without limit.

WeakMap and WeakSet hold references weakly, meaning the garbage collector can still free an object even if it is in a WeakMap. This makes them useful for storing extra data about DOM nodes or other objects without preventing those objects from being cleaned up when they are no longer needed elsewhere.`,
    tags: ['garbage-collection', 'memory', 'weakmap', 'performance'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'memory-management',
    title: 'Memory Management & Leaks',
    summary: 'V8 frees memory automatically using mark-and-sweep, but leaks happen when your code keeps references alive longer than needed.',
    body: `V8 (the JavaScript engine used in Chrome and Node.js) manages memory in two areas. The heap stores objects and arrays. The stack stores primitive values and references. The garbage collector (GC) uses mark-and-sweep: it starts from GC roots (global variables and the current call stack), marks everything it can reach, then frees everything it could not.

Common sources of memory leaks:
1. Forgotten event listeners — adding a listener but never removing it keeps the element and its callback in memory even after the element is gone from the page.
2. Closures holding large data — any inner function that is referenced somewhere keeps its entire outer scope alive in memory.
3. Detached DOM nodes — elements removed from the page but still referenced in a JavaScript variable cannot be freed.
4. Unbounded caches — a Map or array that only grows and never shrinks will keep consuming memory.
5. Accidental globals — writing to a variable without let, const, or var creates a property on the global window object that persists indefinitely.

WeakMap and WeakRef let you hold a reference to an object without preventing garbage collection. When no other strong reference to the key exists, the WeakMap entry can be freed. This makes them ideal for caching computed results or storing metadata keyed to DOM nodes.`,
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
    summary: 'V8 compiles JavaScript to native machine code at runtime to make it fast — and it uses hidden classes to make object property access nearly as fast as compiled languages.',
    body: `V8 does not simply read and execute your JavaScript line by line. It compiles it to native machine code using JIT (Just-In-Time) compilation. JIT means the compilation happens at runtime — right before the code runs — rather than ahead of time. V8 watches which code runs frequently (called "hot paths") and applies aggressive optimizations based on what it observes. If those observations turn out to be wrong, it falls back to slower unoptimized code — this is called deoptimization.

Hidden classes are V8's internal system for making object property access fast. When you create multiple objects with the same properties in the same order, V8 gives them all the same hidden class. This lets it access properties using a direct pointer offset instead of doing a hash-table lookup each time, which is much faster.

Patterns that cause deoptimization (and slow down your hot code):
- Adding properties to an object after it was created, rather than in the constructor
- Mixing types for the same property across different calls (e.g., sometimes a number, sometimes a string)
- Using delete on object properties — it leaves gaps in the hidden class layout
- Calling the same function with objects of different shapes`,
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
    id: 'performance-measurement',
    title: 'JavaScript Performance Measurement & Optimization',
    summary: 'Always measure before you optimize — the browser DevTools and the Performance API show you exactly where time is being spent.',
    body: `Do not guess at performance problems and do not optimize before you have measured. Optimizing code without data wastes time, adds complexity, and often targets the wrong thing.

The browser DevTools Performance panel records a timeline of everything happening on the main thread — JavaScript execution, layout, paint, and compositing. Look for long tasks (tasks over 50ms are flagged with a red triangle) because these block user input and cause the page to feel sluggish.

The Performance API lets you measure your own code precisely. performance.now() gives you a high-resolution timestamp. performance.mark() and performance.measure() let you label a section of code and see its duration in the DevTools timeline.

Common JavaScript bottlenecks to look for:
1. Long synchronous tasks — break them into smaller chunks using scheduler.yield() or setTimeout(0) to give the browser a chance to handle input between chunks.
2. Forced reflow (also called layout thrashing) — reading a layout property like offsetWidth right after writing to the DOM forces the browser to synchronously recalculate the layout, which is slow.
3. Memory leaks — if the memory usage in DevTools keeps growing, something is holding references that should be freed.
4. Lots of short-lived objects in hot paths — creating many temporary objects puts pressure on the garbage collector.

Web Workers let you move heavy computation to a background thread entirely, keeping the main thread free to respond to the user.`,
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
  {
    id: 'event-loop-rendering',
    title: 'Event Loop, Tasks & Rendering',
    summary: 'The browser paints a new frame between tasks — if your JavaScript takes too long, it delays the paint and the page feels frozen.',
    body: `The browser\'s main thread does one thing at a time. The event loop runs in a repeating cycle: pick one task, run it to completion, drain all microtasks, then — if a frame is due — run animation callbacks and paint the screen.

Tasks (also called macrotasks): setTimeout, setInterval, I/O events, and user input events. Only one runs per loop iteration.
Microtasks: Promise.then callbacks, queueMicrotask, and MutationObserver callbacks. All microtasks queued during a task run immediately after that task finishes, before the next paint. Be careful — creating microtasks in a loop can block rendering just as much as a long synchronous task.
Animation frames: requestAnimationFrame runs just before each paint, synchronized to the screen refresh rate (usually 60 times per second, meaning each frame has about 16.7ms). Use it for any visual update that needs to be smooth.

The long task problem: the browser targets 60 frames per second. Any synchronous JavaScript task that takes longer than 50ms is called a "long task." During that time the browser cannot handle clicks, key presses, or paint a new frame. Users experience this as the page being frozen or inputs feeling laggy.

Breaking up long tasks: instead of doing all the work in one go, split it into chunks. Use setTimeout(chunk, 0) or scheduler.yield() between chunks. This releases the main thread so the browser can handle input and paint between chunks of work.`,
    diagram: {
      type: 'ascii',
      content: `Event loop iteration:
┌─────────────────────────────────────────────────┐
│ 1. Pick one Task (setTimeout cb, click handler) │
│ 2. Run it to completion                         │
│ 3. Drain ALL microtasks (Promise.then)          │
│ 4. If frame due: run rAF callbacks → Paint      │
│ 5. Repeat                                       │
└─────────────────────────────────────────────────┘

Long task (bad):              Chunked (good):
[====50ms+ task====]          [=10ms=] yield [=10ms=] yield [=10ms=]
    ↑ blocks input                   ↑ input handled between chunks
    ↑ drops frames`,
    },
    tags: ['event-loop', 'tasks', 'microtasks', 'requestAnimationFrame', 'long-tasks', 'rendering', 'performance'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'profiling-devtools',
    title: 'Performance Profiling with Chrome DevTools',
    summary: 'A practical workflow for using Chrome DevTools to find slow JavaScript, memory leaks, and rendering problems.',
    body: `Chrome DevTools has several panels for diagnosing performance issues:

Performance panel: Click Record, reproduce the issue, then stop. The flame chart (the graph that shows function calls over time — wider bars mean longer duration) is your main tool. Look for long tasks flagged with red triangles, yellow bars (JavaScript), purple bars (layout/reflow), and green bars (paint). The "Bottom-Up" and "Call Tree" tabs show which functions consumed the most time.

Memory panel: Take a heap snapshot (a snapshot of every object in memory) before and after you suspect a leak, then compare the two. Objects that grew between snapshots are suspects. Search for "Detached" DOM nodes — elements removed from the page but still held in JavaScript variables, which is one of the most common leak patterns.

Coverage panel: Open it via Ctrl+Shift+P and search "Coverage." It shows which JavaScript and CSS bytes are not used on initial load. This guides decisions about code splitting and lazy loading.

Rendering panel: Available under More Tools. "Paint flashing" highlights which parts of the screen are being repainted each frame. "Layout shift regions" shows where content is unexpectedly moving (CLS). "Frame rendering stats" overlays an FPS counter.

Remote debugging: Use chrome://inspect to connect a real Android device via USB. This is important because desktop CPUs are roughly 5–8x faster than mobile chips. A page that feels fast on your laptop may feel slow on a real phone.

For timing your own code, always use performance.now() — it has sub-millisecond precision and is not affected by system clock changes. Date.now() is only millisecond precision and can jump if the system clock is adjusted.`,
    diagram: {
      type: 'ascii',
      content: `Performance panel anatomy:
┌──────────────────────────────────────────────────┐
│  FPS  ████████░░░░████████   ← green=good, red=drop
│  CPU  ████░░████████░░████   ← yellow=JS, purple=layout
│  NET  ─┬──┬─────────────    ← resource waterfall
│        │  │
│  Main: [Script][Layout][Paint][Composite]
│        └── flame chart (call stack over time)    │
└──────────────────────────────────────────────────┘

Red triangle on task = Long Task (>50ms)
Purple bar          = Layout / Reflow
Green bar           = Paint`,
    },
    tags: ['profiling', 'devtools', 'performance', 'flame-chart', 'heap-snapshot', 'long-tasks', 'coverage'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'fetch-api-deep-dive',
    title: 'Fetch API: Request/Response Model & Gotchas',
    summary: 'The Fetch API is built on Promises, but its error handling, body reading rules, and CORS behavior work differently from what most developers expect.',
    body: `Fetch is built around two objects: Request and Response. You pass a URL (or a Request object) to fetch(). The Promise resolves to a Response object as soon as the response headers arrive — the body has not been read yet. That is why you must call res.json(), res.text(), or res.blob() to actually get the data (each one returns another Promise).

The most important gotcha: fetch only rejects its Promise on a network failure (no connection, DNS error). A 404 or 500 response still resolves the Promise — res.ok is just set to false. Always check res.ok before calling res.json(), or wrap fetch in a helper function that throws for you.

The response body can only be read once. Once you call res.json() or res.text(), the underlying stream is consumed. If you need to read it twice — for example to log the raw body and parse it — call res.clone() first to get a copy.

The Headers object is case-insensitive, so 'Content-Type' and 'content-type' are the same. Some headers like Cookie and Origin are controlled by the browser — your code cannot set them.

CORS (Cross-Origin Resource Sharing): when your page at one domain makes a fetch request to a different domain, the server must respond with an Access-Control-Allow-Origin header that allows your domain. For requests that include cookies, the server also needs Access-Control-Allow-Credentials: true, and you must pass credentials: 'include' to fetch. Without both, cookies are not sent.

AbortController lets you cancel a fetch. Pass its signal to the fetch options. One controller can cancel multiple fetches at once. When aborted, the Promise rejects with an AbortError — always handle this separately from real network errors.

The response body is a ReadableStream, which means you can read it piece by piece using getReader(). This is useful for large file downloads, server-sent events, or streaming AI responses.

Fetch does not have a built-in timeout, upload progress reporting, automatic retry, or interceptors. You need to add those yourself or use Axios.`,
    diagram: {
      type: 'ascii',
      content: `fetch(url, options)
  └─ resolves to Response (headers received)
       ├─ res.ok        → true if status 200–299
       ├─ res.status    → 200, 404, 500 …
       ├─ res.headers   → Headers object
       └─ res.body      → ReadableStream (unconsumed)
            ├─ res.json()   → Promise<any>
            ├─ res.text()   → Promise<string>
            └─ res.blob()   → Promise<Blob>

Network error → Promise rejects (TypeError)
4xx / 5xx    → Promise resolves, res.ok === false

AbortController:
const ac = new AbortController();
fetch(url, { signal: ac.signal });
ac.abort(); → fetch rejects with AbortError`,
    },
    tags: ['fetch', 'http', 'AbortController', 'CORS', 'streaming', 'network', 'response'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'axios-vs-fetch',
    title: 'Axios vs Fetch: Tradeoffs & When to Use Each',
    summary: 'Axios adds automatic JSON parsing, HTTP error rejection, interceptors, and upload progress on top of what Fetch offers — at the cost of adding a dependency.',
    body: `Fetch is built into browsers and Node 18+. Axios is a third-party library (about 13 kB gzipped) that provides a consistent HTTP API across browser and Node environments.

Key differences:

Error handling: Fetch resolves its Promise for any HTTP response, including 4xx and 5xx errors — you must check res.ok manually and throw yourself. Axios rejects the Promise for any non-2xx status code, so your catch blocks handle both network failures and HTTP errors in one place.

JSON: with Fetch you call res.json() to parse the response and JSON.stringify() to serialize the request body. Axios does both automatically.

Interceptors (middleware for requests): Axios has a built-in pipeline — interceptors.request and interceptors.response — that runs before every request is sent and after every response arrives. Common uses are attaching auth tokens, logging, refreshing expired tokens, and normalizing error shapes. Fetch has no equivalent — you have to wrap it in your own function.

Cancellation: both support AbortController. Pass a signal to either one. Older Axios code used CancelToken, which is now deprecated.

Upload progress: Axios exposes an onUploadProgress callback with the percentage complete. Fetch cannot report upload progress natively.

Node support: Fetch is native in Node 18+. Axios works in Node 10+ without any polyfills.

Instance pattern: axios.create() gives you a pre-configured instance with a shared base URL, default headers, and timeout. With Fetch you have to build that wrapper yourself.

When to use Fetch: simple projects, when you want zero dependencies, or when you are writing browser-only code and do not need interceptors.

When to use Axios: apps with auth tokens and token refresh logic, when you need upload progress, when the team wants a shared and consistent HTTP layer, or when targeting older Node versions.`,
    diagram: {
      type: 'ascii',
      content: `Feature comparison:
                        Fetch           Axios
──────────────────────────────────────────────
Built-in (no install)    ✓               ✗
Rejects on 4xx/5xx       ✗               ✓
Auto JSON parse          ✗               ✓
Request interceptors     ✗               ✓
Response interceptors    ✗               ✓
AbortController          ✓               ✓ (v1+)
Upload progress          ✗               ✓
Base URL / instance      ✗ (manual)      ✓
Node 18+ native          ✓               ✓ (any Node)
Bundle cost              0 kB            ~13 kB gz`,
    },
    tags: ['axios', 'fetch', 'http', 'interceptors', 'network', 'comparison'],
    tier: 'advanced',
    level: 'experienced',
  },
];

export default jsTheory;
