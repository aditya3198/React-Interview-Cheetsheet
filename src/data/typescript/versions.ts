import type { VersionEntry } from '@/types/content';

const tsVersions: VersionEntry[] = [
  {
    version: 'TypeScript 5.5',
    releaseYear: 2024,
    highlights: [
      {
        feature: 'Inferred Type Predicates',
        description: 'TypeScript now infers return type predicates automatically from function bodies — filter(isString) finally returns string[].',
        codeExample: `function isString(x: unknown) {
  return typeof x === 'string'; // inferred: x is string
}

const mixed: (string | number)[] = [1, 'hello', 2, 'world'];
const strings = mixed.filter(isString); // string[] — previously (string | number)[]`,
      },
      {
        feature: 'Isolated Declarations',
        description: 'New --isolatedDeclarations flag enforces explicit types on exports so .d.ts files can be generated without full type-checking — enables parallel DTS emit in monorepos.',
        codeExample: `// With isolatedDeclarations, public exports need explicit types
export function add(a: number, b: number): number { // explicit return type required
  return a + b;
}
// export function add(a: number, b: number) { ... } // Error — inferred return`,
      },
      {
        feature: 'Regular Expression Syntax Checking',
        description: 'TypeScript validates regex syntax and flags at compile time, catching typos in regex literals.',
        codeExample: `/(?<year>\\d{4})-(?<month>\\d{2})/; // OK — valid named groups
// /[a-z]/Z;  // Error: Unknown flag 'Z'
// /(?!abc/;  // Error: Unterminated group`,
      },
    ],
  },
  {
    version: 'TypeScript 5.2',
    releaseYear: 2023,
    highlights: [
      {
        feature: 'using & await using Declarations',
        description: 'Explicit resource management via the Disposable interface — resources call [Symbol.dispose] automatically when they leave scope.',
        codeExample: `class DatabaseConnection implements Disposable {
  [Symbol.dispose]() { this.close(); }
  query(sql: string) { /* ... */ }
}

function runQuery() {
  using db = new DatabaseConnection(); // auto-closed at block exit
  return db.query('SELECT * FROM users');
} // db[Symbol.dispose]() called here`,
      },
      {
        feature: 'Decorator Metadata',
        description: 'Decorators can access context.metadata to attach and read metadata about the decorated class member.',
        codeExample: `function logged(_target: unknown, ctx: ClassMethodDecoratorContext) {
  console.log(\`Registering method: \${String(ctx.name)}\`);
}

class Greeter {
  @logged
  greet(name: string) { return \`Hello, \${name}\`; }
}`,
      },
    ],
  },
  {
    version: 'TypeScript 5.0',
    releaseYear: 2023,
    highlights: [
      {
        feature: 'Standard Decorators (TC39 Stage 3)',
        description: 'Decorators now follow the TC39 Stage 3 proposal with a new API — class, method, field, accessor, getter/setter decorators.',
        codeExample: `function sealed(target: typeof MyClass, _ctx: ClassDecoratorContext) {
  Object.seal(target);
  Object.seal(target.prototype);
}

@sealed
class MyClass { name = 'TypeScript'; }`,
      },
      {
        feature: 'const Type Parameters',
        description: 'Generic functions with const modifier infer literal types instead of widened types, eliminating the need for as const at every call site.',
        codeExample: `function identity<const T>(value: T): T { return value; }

const a = identity(['a', 'b', 'c']);
// readonly ['a', 'b', 'c']  — not string[]

function defineRoutes<const T extends { path: string }[]>(routes: T): T {
  return routes;
}`,
      },
      {
        feature: 'All enums are Union enums',
        description: 'Enums are now treated as unions of their member types, enabling narrowing per member.',
        codeExample: `enum Status { Active = 'active', Inactive = 'inactive' }

function handle(s: Status) {
  if (s === Status.Active) { /* narrowed to Status.Active */ }
}`,
      },
    ],
  },
  {
    version: 'TypeScript 4.9',
    releaseYear: 2022,
    highlights: [
      {
        feature: 'satisfies Operator',
        description: 'Validates that a value matches a type while preserving the inferred literal type — get both validation and precision.',
        codeExample: `type Palette = Record<'red' | 'green' | 'blue', string | number[]>;

const palette = {
  red:   [255, 0, 0],
  green: '#00ff00',
  blue:  [0, 0, 255],
} satisfies Palette;

palette.red.map(c => c / 255); // OK — red is number[], not string | number[]`,
      },
      {
        feature: 'Auto-Accessor in Classes',
        description: 'The accessor keyword generates a private backing field with a getter/setter pair — designed for use with decorators.',
        codeExample: `class Person {
  accessor name: string; // generates #name field + get/set name

  constructor(name: string) { this.name = name; }
}`,
      },
    ],
  },
  {
    version: 'TypeScript 4.1',
    releaseYear: 2020,
    highlights: [
      {
        feature: 'Template Literal Types',
        description: 'Construct string literal types using template syntax — distributes over union members to produce every combination.',
        codeExample: `type Direction = 'top' | 'right' | 'bottom' | 'left';
type CSSMargin = \`margin-\${Direction}\`;
// 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left'

type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // 'onClick'`,
      },
      {
        feature: 'Key Remapping in Mapped Types',
        description: 'Remap keys in a mapped type using the as clause — enables renaming, filtering, and template-based transformations.',
        codeExample: `type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type PersonGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }`,
      },
      {
        feature: 'Recursive Conditional Types',
        description: 'Conditional types can now reference themselves, enabling deep unwrapping and recursive type transformations.',
        codeExample: `type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};`,
      },
    ],
  },
  {
    version: 'TypeScript 3.7',
    releaseYear: 2019,
    highlights: [
      {
        feature: 'Optional Chaining & Nullish Coalescing',
        description: 'TypeScript shipped ?. and ?? before they landed in the ECMAScript standard.',
        codeExample: `const city = user?.address?.city;     // undefined if any part is null/undefined
const port = config.port ?? 3000;    // default only for null/undefined (not 0 or '')`,
      },
      {
        feature: 'Assertion Functions',
        description: 'Functions annotated with asserts narrow the type for the caller after the call returns.',
        codeExample: `function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw new Error('Expected string');
}

let x: unknown = getValue();
assertIsString(x);
x.toUpperCase(); // x is string here — no error`,
      },
      {
        feature: 'Recursive Type Aliases',
        description: 'Type aliases can now directly reference themselves, enabling types like JSONValue without interface indirection.',
        codeExample: `type JSONValue =
  | null | boolean | number | string
  | JSONValue[]
  | { [key: string]: JSONValue };`,
      },
    ],
  },
  {
    version: 'TypeScript 3.0',
    releaseYear: 2018,
    highlights: [
      {
        feature: 'unknown Type',
        description: 'A type-safe alternative to any — values typed as unknown must be narrowed before use.',
        codeExample: `function process(value: unknown) {
  // value.toUpperCase(); // Error — must narrow first
  if (typeof value === 'string') {
    value.toUpperCase(); // OK — narrowed to string
  }
}`,
      },
      {
        feature: 'Project References',
        description: 'Split a TypeScript codebase into sub-projects that can reference each other, enabling incremental builds and better monorepo support.',
        codeExample: `// tsconfig.json
{
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" }
  ]
}
// tsc --build  — builds only what changed`,
      },
      {
        feature: 'Tuple Types with Rest Elements',
        description: 'Rest elements in tuple types enable precise typing of heterogeneous rest parameters and variadic generics.',
        codeExample: `type Strings = [string, ...string[]];
type Head<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never;
type Tail<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;`,
      },
    ],
  },
  {
    version: 'TypeScript 2.0',
    releaseYear: 2016,
    highlights: [
      {
        feature: 'strictNullChecks',
        description: 'null and undefined are no longer silently assignable to every type — eliminates an entire class of null-dereference bugs.',
        codeExample: `// With strictNullChecks: true
let name: string = null;         // Error — null not assignable to string
let name: string | null = null;  // OK — explicit

function greet(name: string | null) {
  if (name !== null) {
    name.toUpperCase(); // narrowed to string
  }
}`,
      },
      {
        feature: 'Non-null Assertion Operator (!)',
        description: 'Tell the compiler a value is definitely non-null when it cannot verify it — a targeted escape hatch.',
        codeExample: `const input = document.getElementById('name')!; // asserts non-null
input.value = 'Alice'; // no "possibly null" error

const first = arr[0]!; // assert first element exists`,
      },
      {
        feature: 'Control Flow Based Type Analysis',
        description: 'TypeScript follows every branch and assignment to narrow types at each point — the foundation of modern type narrowing.',
        codeExample: `function f(x: string | null) {
  if (x === null) return;     // eliminated null
  x.toUpperCase();             // x: string — null was ruled out
}`,
      },
    ],
  },
  {
    version: 'TypeScript 1.0',
    releaseYear: 2014,
    highlights: [
      {
        feature: 'Static Type Annotations',
        description: 'Optional type annotations for variables, parameters, and return types layered on top of JavaScript.',
        codeExample: `function greet(name: string): string {
  return 'Hello, ' + name;
}`,
      },
      {
        feature: 'Interfaces & Structural Typing',
        description: 'Named structural contracts — types are compatible if they share the right shape, not by name.',
        codeExample: `interface Animal {
  name: string;
  sound(): string;
}`,
      },
      {
        feature: 'Generics',
        description: 'Type-safe parameterized abstractions that preserve type information through transformations.',
        codeExample: `function identity<T>(arg: T): T { return arg; }
const n = identity(42);   // T = number
const s = identity('hi'); // T = string`,
      },
      {
        feature: 'Enums & Classes',
        description: 'Enum types for named constants and class syntax with access modifiers (public, private, protected).',
        codeExample: `enum Direction { Up, Down, Left, Right }

class Animal {
  private name: string;
  constructor(name: string) { this.name = name; }
}`,
      },
    ],
  },
];

export default tsVersions;
