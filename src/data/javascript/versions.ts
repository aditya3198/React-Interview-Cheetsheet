import type { VersionEntry } from '@/types/content';

const jsVersions: VersionEntry[] = [
  {
    version: 'ES2024',
    releaseYear: 2024,
    highlights: [
      {
        feature: 'Promise.withResolvers',
        description: 'Create a promise with its resolve/reject exposed — cleaner than the constructor pattern.',
        codeExample: `const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(resolve, 1000, 'done');`,
      },
      {
        feature: 'Object.groupBy / Map.groupBy',
        description: 'Group iterables by a key function without a manual reduce.',
        codeExample: `const grouped = Object.groupBy(items, item => item.type);
// { 'fruit': [...], 'veggie': [...] }`,
      },
      {
        feature: 'ArrayBuffer.transfer',
        description: 'Move ownership of an ArrayBuffer to a new one, detaching the old.',
        codeExample: `const newBuf = buf.transfer(newByteLength);`,
      },
      {
        feature: 'Regex /v flag (Unicode Sets)',
        description: 'Enhanced Unicode regex with set notation and string properties.',
        codeExample: `/[\\p{Decimal_Number}--[0-9]]/v.test('٢'); // true`,
      },
    ],
  },
  {
    version: 'ES2023',
    releaseYear: 2023,
    highlights: [
      {
        feature: 'Array findLast / findLastIndex',
        description: 'Search from the end of an array.',
        codeExample: `[1, 2, 3, 2].findLast(n => n === 2); // 2 (last match)`,
      },
      {
        feature: 'Array toSorted / toReversed / toSpliced / with',
        description: 'Non-mutating versions of sort, reverse, splice, and index assignment.',
        codeExample: `const sorted = arr.toSorted(); // arr unchanged
const updated = arr.with(1, 99); // new array, index 1 = 99`,
      },
      {
        feature: 'Hashbang Grammar',
        description: 'Shebangs (#!) at the start of scripts are now part of the spec.',
        codeExample: `#!/usr/bin/env node`,
      },
      {
        feature: 'WeakMap with Symbol keys',
        description: 'Symbols can now be used as WeakMap keys.',
        codeExample: `const wm = new WeakMap();
wm.set(Symbol('key'), value);`,
      },
    ],
  },
  {
    version: 'ES2022',
    releaseYear: 2022,
    highlights: [
      {
        feature: 'Class Fields & Private (#)',
        description: 'Declare instance fields and private members directly in the class body.',
        codeExample: `class Counter {
  #count = 0;
  inc() { this.#count++; }
}`,
      },
      {
        feature: 'Top-level await',
        description: 'Use await at the top level of ES modules without an async wrapper.',
        codeExample: `const data = await fetch('/api').then(r => r.json());`,
      },
      {
        feature: 'Array.at / String.at',
        description: 'Access elements by index with negative index support.',
        codeExample: `[1, 2, 3].at(-1); // 3`,
      },
      {
        feature: 'Object.hasOwn',
        description: 'Safe replacement for hasOwnProperty.',
        codeExample: `Object.hasOwn(obj, 'key'); // true/false`,
      },
      {
        feature: 'Error.cause',
        description: 'Chain errors with a cause property for better diagnostics.',
        codeExample: `throw new Error('Load failed', { cause: originalError });`,
      },
    ],
  },
  {
    version: 'ES2021',
    releaseYear: 2021,
    highlights: [
      {
        feature: 'Logical Assignment (??=, ||=, &&=)',
        description: 'Combine logical operators with assignment.',
        codeExample: `cache[key] ??= compute(key);
user.name ||= 'Anonymous';`,
      },
      {
        feature: 'Promise.any',
        description: 'Resolves with the first fulfilled promise; rejects if all reject.',
        codeExample: `const fastest = await Promise.any([mirror1, mirror2]);`,
      },
      {
        feature: 'String.replaceAll',
        description: 'Replace all occurrences without a regex.',
        codeExample: `'aabbcc'.replaceAll('b', 'x'); // 'aaxxcc'`,
      },
      {
        feature: 'Numeric Separators',
        description: 'Underscores as visual separators in numeric literals.',
        codeExample: `const billion = 1_000_000_000;`,
      },
      {
        feature: 'WeakRef & FinalizationRegistry',
        description: 'Weakly hold object references and register cleanup callbacks.',
        codeExample: `const ref = new WeakRef(target);
ref.deref()?.method();`,
      },
    ],
  },
  {
    version: 'ES2020',
    releaseYear: 2020,
    highlights: [
      {
        feature: 'Optional Chaining (?.)',
        description: 'Safely navigate nested object properties without null checks.',
        codeExample: `user?.address?.city ?? 'Unknown'`,
      },
      {
        feature: 'Nullish Coalescing (??)',
        description: 'Default values only for null/undefined (not other falsy values).',
        codeExample: `const port = config.port ?? 3000;`,
      },
      {
        feature: 'Promise.allSettled',
        description: 'Resolves when all promises settle, returning status + value/reason for each.',
        codeExample: `const results = await Promise.allSettled([p1, p2]);`,
      },
      {
        feature: 'BigInt',
        description: 'Arbitrary-precision integers beyond Number.MAX_SAFE_INTEGER.',
        codeExample: `const big = 9007199254740993n; // note the n suffix`,
      },
      {
        feature: 'Dynamic import()',
        description: 'Lazy-load ES modules on demand.',
        codeExample: `const { add } = await import('./math.js');`,
      },
      {
        feature: 'globalThis',
        description: 'Universal reference to the global object across environments.',
        codeExample: `globalThis.fetch; // works in browser and Node.js`,
      },
    ],
  },
  {
    version: 'ES2019',
    releaseYear: 2019,
    highlights: [
      {
        feature: 'Array.flat / flatMap',
        description: 'Flatten nested arrays and map+flatten in one pass.',
        codeExample: `[[1, 2], [3]].flat();          // [1, 2, 3]
[1, 2, 3].flatMap(n => [n, n]); // [1,1,2,2,3,3]`,
      },
      {
        feature: 'Object.fromEntries',
        description: 'Convert key-value pairs back into an object (inverse of Object.entries).',
        codeExample: `Object.fromEntries([['a', 1], ['b', 2]]); // {a:1, b:2}`,
      },
      {
        feature: 'String.trimStart / trimEnd',
        description: 'Trim whitespace from a specific end of a string.',
        codeExample: `'  hi  '.trimStart(); // 'hi  '`,
      },
      {
        feature: 'Optional catch binding',
        description: 'Omit the error parameter in catch when not needed.',
        codeExample: `try { ... } catch { /* no (err) required */ }`,
      },
    ],
  },
  {
    version: 'ES2018',
    releaseYear: 2018,
    highlights: [
      {
        feature: 'Object Rest/Spread',
        description: 'Spread and rest operators extended to object literals.',
        codeExample: `const { a, ...rest } = { a: 1, b: 2, c: 3 };
const merged = { ...obj1, ...obj2 };`,
      },
      {
        feature: 'Promise.finally',
        description: 'Run cleanup code after a promise settles regardless of outcome.',
        codeExample: `fetch('/api').then(handle).catch(log).finally(cleanup);`,
      },
      {
        feature: 'Async Iteration',
        description: 'for-await-of loop and async generators for async data streams.',
        codeExample: `for await (const chunk of stream) { process(chunk); }`,
      },
      {
        feature: 'Named Capture Groups',
        description: 'Named regex groups for readable captures.',
        codeExample: `const { year, month } = '2024-05'.match(/(?<year>\\d{4})-(?<month>\\d{2})/).groups;`,
      },
    ],
  },
  {
    version: 'ES2017',
    releaseYear: 2017,
    highlights: [
      {
        feature: 'async / await',
        description: 'Syntactic sugar over Promises for sequential async code.',
        codeExample: `async function load() {
  const data = await fetch('/api').then(r => r.json());
  return data;
}`,
      },
      {
        feature: 'Object.entries / Object.values',
        description: 'Iterate over object key-value pairs or values directly.',
        codeExample: `Object.entries({ a: 1, b: 2 }); // [['a',1],['b',2]]`,
      },
      {
        feature: 'String Padding (padStart / padEnd)',
        description: 'Pad strings to a target length.',
        codeExample: `'5'.padStart(3, '0'); // '005'`,
      },
      {
        feature: 'Trailing Commas in Functions',
        description: 'Trailing commas now allowed in function parameter and argument lists.',
        codeExample: `function f(a, b,) {} // valid`,
      },
    ],
  },
  {
    version: 'ES2016',
    releaseYear: 2016,
    highlights: [
      {
        feature: 'Exponentiation Operator (**)',
        description: 'Concise power operator.',
        codeExample: `2 ** 10; // 1024`,
      },
      {
        feature: 'Array.prototype.includes',
        description: 'Check if an array contains a value (handles NaN correctly, unlike indexOf).',
        codeExample: `[1, NaN, 3].includes(NaN); // true`,
      },
    ],
  },
  {
    version: 'ES2015 (ES6)',
    releaseYear: 2015,
    highlights: [
      {
        feature: 'let & const',
        description: 'Block-scoped variable declarations replacing the pitfalls of var.',
        codeExample: `let x = 1;
const PI = 3.14;`,
      },
      {
        feature: 'Arrow Functions',
        description: 'Concise syntax with lexical this binding.',
        codeExample: `const double = n => n * 2;`,
      },
      {
        feature: 'Classes',
        description: 'Syntactic sugar over prototype-based inheritance.',
        codeExample: `class Animal { constructor(name) { this.name = name; } }`,
      },
      {
        feature: 'Template Literals',
        description: 'String interpolation and multi-line strings with backticks.',
        codeExample: `const msg = \`Hello, \${name}!\`;`,
      },
      {
        feature: 'Destructuring, Spread, Rest',
        description: 'Concise patterns for extracting and combining data.',
        codeExample: `const { a, b } = obj;
const arr = [...a, ...b];`,
      },
      {
        feature: 'Promises',
        description: 'Native asynchronous abstraction replacing callback hell.',
        codeExample: `fetch('/api').then(r => r.json()).catch(console.error);`,
      },
      {
        feature: 'Modules (import/export)',
        description: 'Static module system with named and default exports.',
        codeExample: `import { add } from './math.js';
export default function main() {}`,
      },
      {
        feature: 'Map, Set, WeakMap, WeakSet',
        description: 'New built-in collection types.',
        codeExample: `const s = new Set([1, 2, 2]); // {1, 2}`,
      },
      {
        feature: 'Symbol',
        description: 'Unique, immutable primitive for non-colliding property keys.',
        codeExample: `const id = Symbol('id');`,
      },
      {
        feature: 'Iterators & Generators',
        description: 'Custom iterable protocol and pausable function execution.',
        codeExample: `function* gen() { yield 1; yield 2; }`,
      },
      {
        feature: 'Proxy & Reflect',
        description: 'Intercept and redefine fundamental object operations.',
        codeExample: `const p = new Proxy(target, { get(obj, key) { ... } });`,
      },
    ],
  },
  {
    version: 'ES5',
    releaseYear: 2009,
    highlights: [
      {
        feature: 'Strict Mode',
        description: '"use strict" opts into a restricted variant that catches silent errors.',
        codeExample: `"use strict";
x = 10; // ReferenceError — undeclared variable`,
      },
      {
        feature: 'Array Methods',
        description: 'forEach, map, filter, reduce, some, every, indexOf added to Array.prototype.',
        codeExample: `[1, 2, 3].map(n => n * 2);    // [2, 4, 6]
[1, 2, 3].filter(n => n > 1); // [2, 3]`,
      },
      {
        feature: 'JSON Support',
        description: 'Native JSON.parse() and JSON.stringify() built into the language.',
        codeExample: `JSON.stringify({ a: 1 }); // '{"a":1}'
JSON.parse('{"a":1}');    // { a: 1 }`,
      },
      {
        feature: 'Object Methods',
        description: 'Object.create, Object.keys, Object.defineProperty, Object.freeze introduced.',
        codeExample: `const obj = Object.create(null); // no prototype
Object.keys({ a: 1, b: 2 });   // ['a', 'b']`,
      },
    ],
  },
];

export default jsVersions;
