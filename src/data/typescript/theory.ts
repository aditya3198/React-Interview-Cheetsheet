import type { ConceptCard } from '@/types/content';

const tsTheory: ConceptCard[] = [
  {
    id: 'structural-typing',
    title: 'Structural Typing',
    summary: 'TypeScript checks whether two types are compatible based on their properties, not their names. If an object has all the required properties, it satisfies the type.',
    body: `TypeScript uses structural typing. Two types are compatible if they have the same shape — the same property names and types — regardless of what they are called or where they were defined. This is sometimes called "duck typing": if it has the right fields, it qualifies.

This is different from languages like Java or C# (which use nominal typing), where you must explicitly declare that a class implements an interface for it to be compatible. In TypeScript, a plain object literal { name: string } is assignable to a class Person { name: string } with no extra syntax.

One important detail: extra properties are fine when assigning through a variable, but not when writing an object literal directly in place. TypeScript applies "excess property checking" on fresh object literals to help catch typos in property names.

This approach suits JavaScript well. Libraries and utilities can share data as long as their shapes match, without needing a shared base class.`,
    diagram: {
      type: 'ascii',
      content: `interface Point { x: number; y: number; }

class Coordinate {
  x = 0;
  y = 0;
  label = 'origin'; // extra property
}

const c = new Coordinate();
const p: Point = c; // OK — Coordinate has x and y

// Fresh literal triggers excess property checking:
const p2: Point = { x: 0, y: 0, label: 'hi' }; // Error — extra 'label'`,
    },
    tags: ['structural-typing', 'type-system', 'duck-typing', 'compatibility'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'type-inference',
    title: 'Type Inference',
    summary: 'TypeScript figures out types on its own in many situations — you do not need to write type annotations everywhere.',
    body: `TypeScript's type inference (automatically working out the type from context) covers most situations:

Variable initializers: const x = 5 gives x the type number. TypeScript uses the value on the right to decide the type.

Return types: TypeScript reads all the return statements in a function and works out the return type. If different branches return different types, it produces a union (for example, string | null).

Generic arguments: calling identity(42) lets TypeScript figure out that T is number, so you do not need to write identity<number>(42) explicitly.

Contextual typing: when a function is assigned to a typed variable or passed into a typed parameter, TypeScript uses that context to infer parameter types. For example, the e parameter in button.addEventListener('click', e => ...) is inferred as MouseEvent automatically.

Best practice: always annotate function parameters (TypeScript cannot infer them without context) and the return types of functions that are part of a public API. Let inference handle local variables — it keeps the code cleaner while TypeScript still catches mismatches.`,
    diagram: {
      type: 'ascii',
      content: `const n     = 42;            // number
const s     = 'hello';       // string
const arr   = [1, 2, 3];     // number[]
const mixed = [1, 'a'];      // (string | number)[]

function add(a: number, b: number) {
  return a + b;               // return type: number (inferred)
}

// Contextual typing
const nums = [1, 2, 3];
nums.forEach(n => {           // n inferred as number
  console.log(n.toFixed(2));  // OK
});`,
    },
    tags: ['type-inference', 'type-system', 'generics'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'type-narrowing',
    title: 'Type Narrowing & Control Flow Analysis',
    summary: 'TypeScript follows every branch and assignment in your code to track which types are possible at each point, narrowing down union types as it goes.',
    body: `TypeScript performs control flow analysis — it reads every branch, early return, assignment, and thrown exception to know what type a variable can be at any given line.

Type guards (checks that trigger narrowing):
- typeof: typeof x === 'string' narrows x to string in that branch
- instanceof: x instanceof Error narrows x to Error
- in operator: 'name' in x narrows to types that have that property
- Equality checks: x === null eliminates non-null types
- Truthiness: if (x) rules out null, undefined, 0, and empty string
- User-defined predicates: functions with a return type like val is User
- Discriminated union tag: switching on a shared literal property (like kind or type)

After a return or throw, TypeScript knows that code path has ended. It continues the rest of the function with a narrower type. This is why writing early return checks at the top of a function is a good habit — each one removes a type from the possible set, making the rest of the code simpler to reason about.`,
    diagram: {
      type: 'ascii',
      content: `function process(value: string | number | null) {
  if (value === null) return;    // null eliminated below
  // value: string | number

  if (typeof value === 'string') {
    value.toUpperCase();         // value: string
    return;
  }
  // value: number — string eliminated by typeof + return

  value.toFixed(2);              // value: number
}`,
    },
    tags: ['type-narrowing', 'type-guards', 'control-flow', 'union-types'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'generics-design',
    title: 'Generics',
    summary: 'Generics let you write a function, interface, or class once and use it safely with different types, without losing type information.',
    body: `Generics let you write reusable code where the type is a placeholder (called a type parameter) rather than something fixed. This preserves type information through transformations in a way that using any[] or a union type cannot.

Type parameters are declared in angle brackets, like <T>. Common conventions: T for a general type, K and V for key and value, E for element, R for return type.

Constraints: T extends SomeType restricts what T can be. For example, T extends { length: number } means T must have a length property. This lets you access that property safely inside the function.

Defaults: <T = string> means if no type is provided or inferred, T falls back to string.

Multiple parameters: you can use <T, U>, or something like <K extends keyof T> to express relationships between type parameters.

When to use generics vs. unions: use generics when the output type depends on what input type was passed in. Use a union when the function accepts multiple types but always returns the same type regardless.

Do not make everything generic. Only use a type parameter when the variation actually matters to whoever is calling the function.`,
    diagram: {
      type: 'ascii',
      content: `// Without generics — loses type information
function first(arr: any[]): any { return arr[0]; }
first([1, 2, 3]); // any — not useful

// With generics — preserves type
function first<T>(arr: T[]): T | undefined { return arr[0]; }
first([1, 2, 3]);  // number | undefined
first(['a', 'b']); // string | undefined

// Constrained generic
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // safe — K can only be a key of T
}`,
    },
    tags: ['generics', 'type-parameters', 'constraints', 'reusability'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'mapped-conditional-types',
    title: 'Mapped Types & Conditional Types',
    summary: 'Mapped types transform every property in a type. Conditional types pick between two types based on a condition. Together they are the building blocks of all utility types.',
    body: `Mapped types loop over the keys of an existing type and produce a new type from them:
{ [K in keyof T]: NewType }

You can add or remove modifiers with + or -. For example, -readonly makes all properties writable, and -? removes the optional marker, making all properties required. The as clause (like [K in keyof T as NewKey]) lets you rename keys or filter them out entirely (using as never removes a key from the result).

Conditional types choose between two types based on a relationship:
T extends U ? TrueType : FalseType

When T is a union type, the condition runs separately for each member of the union. If you want to prevent that, wrap in brackets: [T] extends [U].

The infer keyword appears inside conditional types to pull out and name a piece of a matched type. For example:
T extends Promise<infer R> ? R : never
This extracts R from inside a Promise.

This is exactly how built-in utility types like ReturnType, Parameters, and Awaited are written. Reading their definitions in lib.es5.d.ts is one of the best ways to understand both features in practice.`,
    diagram: {
      type: 'ascii',
      content: `// Mapped type — how Partial<T> works
type Partial<T> = { [K in keyof T]?: T[K] };

// Key remapping with template literal
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
};

// Conditional type with infer
type Awaited<T> =
  T extends Promise<infer R> ? Awaited<R> : T;
// Awaited<Promise<Promise<string>>> = string

// Distributive conditional
type IsString<T> = T extends string ? true : false;
type A = IsString<string | number>; // true | false`,
    },
    tags: ['mapped-types', 'conditional-types', 'infer', 'utility-types'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'discriminated-unions-theory',
    title: 'Discriminated Unions & Exhaustiveness',
    summary: 'A union where each member has a shared property with a unique string value — TypeScript uses that property to tell the variants apart.',
    body: `A discriminated union is a union of object types that each share a property (called a discriminant) with a unique literal value. TypeScript uses this property to narrow the union in switch or if statements.

The pattern has three parts:
1. A shared tag property with a unique literal type per variant — for example, kind: 'circle'
2. A union type that includes all the variants
3. A switch or if block on the tag that narrows to each specific variant

Exhaustiveness checking: in the default branch of a switch, assign the remaining value to a variable typed as never. If every variant is handled, this works fine. If a new variant is added to the union later without a matching case, TypeScript will report an error — because the new variant cannot be assigned to never.

This is a clean alternative to class inheritance for handling different shapes of data. The data stays as plain objects, which makes it easy to serialize, log, and test. It is also the pattern behind Redux action types and most state machine implementations.`,
    diagram: {
      type: 'ascii',
      content: `type Shape =
  | { kind: 'circle';   radius: number }
  | { kind: 'rect';     width: number; height: number }
  | { kind: 'triangle'; base: number;  height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle':   return Math.PI * s.radius ** 2;
    case 'rect':     return s.width * s.height;
    case 'triangle': return 0.5 * s.base * s.height;
    default: {
      const _exhaustive: never = s; // Error if a new kind is added
      return _exhaustive;
    }
  }
}`,
    },
    tags: ['discriminated-unions', 'exhaustiveness', 'narrowing', 'pattern'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'unknown-any-never',
    title: 'unknown, any, and never',
    summary: 'Three special types at opposite ends of TypeScript\'s type system — any is the escape hatch, unknown is the safe alternative, and never means a value is impossible.',
    body: `any: the escape hatch. A value typed as any can be assigned to or from any other type. TypeScript completely stops checking it. Every use of any is a gap in your type safety. Legitimate reasons to use it: gradually migrating JavaScript code, working with APIs that have no type definitions, or very dynamic code that genuinely cannot be typed.

unknown: the safer version of any. You can assign anything to unknown, but you cannot call methods or access properties on it until you narrow it first (using typeof, instanceof, or a similar check). It forces you to handle the uncertainty explicitly, unlike any which silently passes through everywhere.

never: means "this can never happen." No value can have type never. It appears as the return type of functions that always throw an error or run forever, as the result of impossible type intersections (like string & number), and in the unreachable default branch of exhaustive switch statements.

Type hierarchy: unknown is at the top — every type is a subtype of it. never is at the bottom — it is a subtype of every type. any is the exception and sits outside this ordering: it is both assignable to and from everything.`,
    diagram: {
      type: 'ascii',
      content: `// any — disables type checking
let x: any = 'hello';
x.notAMethod(); // no error — unsafe

// unknown — must narrow before use
let y: unknown = getData();
y.toUpperCase();              // Error — must narrow
if (typeof y === 'string') {
  y.toUpperCase();            // OK — narrowed to string
}

// never — unreachable / bottom type
function fail(msg: string): never { throw new Error(msg); }
type Impossible = string & number; // never

Type hierarchy:
  unknown (top)
    ├─ string, number, boolean, object, ...
    │    └─ never (bottom — subtype of everything)
    └─ any (special — assignable both ways)`,
    },
    tags: ['unknown', 'any', 'never', 'type-system', 'safety'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'template-literal-types-theory',
    title: 'Template Literal Types',
    summary: 'Build new string types by combining string pieces and other types using backtick syntax — useful for generating precise string patterns at the type level.',
    body: `Template literal types use backtick syntax at the type level, mirroring the way JavaScript template strings work at runtime. When you embed a union type inside a template literal type, TypeScript generates every possible combination and produces a union of all of them.

Built-in string helpers: Uppercase<S>, Lowercase<S>, Capitalize<S>, Uncapitalize<S>.

Combining template literal types with mapped types gives you powerful patterns. You can generate getter and setter method names from an object's property names, produce CSS property name combinations, or build a typed dictionary of event handlers — all at the type level.

Template literal types also work with infer inside conditional types. This lets you extract segments from string patterns, like pulling a route parameter out of '/users/:id'.

Common practical uses: generating event handler names (onClick, onChange), CSS property names (margin-top, padding-left), and any case where you want TypeScript to enforce a specific string format.`,
    diagram: {
      type: 'ascii',
      content: `type Side = 'top' | 'right' | 'bottom' | 'left';
type Margin = \`margin-\${Side}\`;
// 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left'

// Getter generation via mapped type + key remapping
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }

// Extract from template
type ExtractParam<T extends string> =
  T extends \`:\${infer Param}\` ? Param : never;
type P = ExtractParam<':userId'>; // 'userId'`,
    },
    tags: ['template-literal-types', 'string-types', 'type-manipulation'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'utility-types-theory',
    title: 'Utility Types',
    summary: 'TypeScript includes built-in generic helpers for the most common type transformations. Learning to read their implementations is a great way to understand mapped and conditional types.',
    body: `TypeScript's standard library ships utility types that handle the most common type transformations, so you do not have to write them yourself:

Object shape helpers:
- Partial<T> / Required<T> — add or remove the optional marker (?) from all properties
- Readonly<T> — add readonly to all properties so they cannot be reassigned
- Record<K, V> — create an object type where K is the key union and V is the value type
- Pick<T, K> / Omit<T, K> — keep only the listed properties, or exclude them

Union manipulation:
- Exclude<T, U> — keeps only the members of T that are not in U
- Extract<T, U> — keeps only the members of T that are also in U
- NonNullable<T> — removes null and undefined from a type

Function inspection:
- Parameters<T> — gives you a tuple (fixed-length array) of a function's parameter types
- ReturnType<T> — gives you the return type of a function
- ConstructorParameters<T> / InstanceType<T> — useful for working with class types

Async:
- Awaited<T> — unwraps a Promise<T> all the way down, no matter how many layers deep

All of these are written using mapped types and conditional types inside lib.es5.d.ts. Reading those definitions is one of the best ways to understand how both features work in practice.`,
    diagram: {
      type: 'ascii',
      content: `type User = { id: number; name: string; email: string };

type UpdatePayload  = Partial<User>;               // all optional
type NameOnly       = Pick<User, 'id' | 'name'>;   // { id, name }
type PublicUser     = Omit<User, 'email'>;          // { id, name }

type RoleMap        = Record<'admin' | 'user', string[]>;
type NonNull        = NonNullable<string | null>;   // string

async function loadUser(): Promise<User> { ... }
type LoadResult     = Awaited<ReturnType<typeof loadUser>>; // User`,
    },
    tags: ['utility-types', 'partial', 'pick', 'omit', 'record', 'type-manipulation'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'variance-theory',
    title: 'Variance & Type Compatibility',
    summary: 'Variance describes how a subtype relationship between types carries through into generic containers like arrays or functions.',
    body: `Variance describes how a generic Container<T>'s assignability relates to T's assignability. There are three possibilities:

Covariant (same direction): if Dog extends Animal, then Container<Dog> also extends Container<Animal>. This holds for output positions — like return types and read-only arrays. It is always safe to return a more specific type where a general one is expected.

Contravariant (reversed direction): the relationship flips for input positions. If Dog extends Animal, then a function that accepts Animal can also be used where a function that accepts Dog is expected — because it handles a broader set of values. Function parameters are contravariant.

Invariant (neither direction): applies when a type is both read and written. A Ref<Dog> (which you can both get and set) is not compatible with Ref<Animal>, because setting an Animal into a Ref<Dog> would break it.

TypeScript has historically allowed method parameters to be bivariant (both directions) for practical reasons, but strict mode enables proper contravariance for function-typed properties.

TypeScript 4.7 added explicit variance annotations: out T marks a covariant position, in T marks a contravariant one. This makes intent clearer and can help the compiler avoid expensive variance calculations for complex generic types.`,
    diagram: {
      type: 'ascii',
      content: `// Covariant — T in output position only
interface Provider<out T> { get(): T; }
// Provider<Dog> assignable to Provider<Animal> ✓

// Contravariant — T in input position only
interface Consumer<in T> { consume(val: T): void; }
// Consumer<Animal> assignable to Consumer<Dog> ✓
// (handles any Animal, certainly can handle a Dog)

// Invariant — T in both positions
interface Ref<in out T> { get(): T; set(v: T): void; }
// Ref<Dog> NOT assignable to Ref<Animal> — invariant`,
    },
    tags: ['variance', 'covariance', 'contravariance', 'generics', 'type-system'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'declaration-merging-theory',
    title: 'Declaration Merging & Module Augmentation',
    summary: 'When you declare the same name more than once, TypeScript merges the declarations — useful for adding properties to third-party types without editing their source.',
    body: `TypeScript merges multiple declarations of the same name in the same scope. The most common and useful case is with interfaces: writing the same interface name twice produces one combined type with all the properties from both declarations.

Module augmentation: you can re-open an existing module by writing a declare module 'module-name' block with matching name. Inside it, you can extend existing interfaces or add new exports. This is how you add properties to Express's Request type, React's JSX.IntrinsicElements, or any other library type — without changing the library's code.

Global augmentation: writing declare global { ... } inside a module file lets you extend global types like Window, add polyfill type definitions, or extend process.env.

A key difference between interface and type alias: interfaces can be merged by declaring the same name twice. Type aliases cannot — writing type Foo twice in the same scope is always an error.

Augmentation only works inside a module file — a file that has at least one top-level import or export. In a plain script file with no imports or exports, all declarations are automatically global.`,
    diagram: {
      type: 'ascii',
      content: `// Augment Express Request
import 'express';
declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; role: 'admin' | 'user' };
  }
}
// Now req.user is typed in every route

// Interface merging
interface Window {
  analytics: { track(event: string): void };
}
window.analytics.track('pageview'); // typed

// Global augmentation inside a module
declare global {
  interface Array<T> { first(): T | undefined; }
}`,
    },
    tags: ['declaration-merging', 'module-augmentation', 'ambient', 'interfaces'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'tsconfig-theory',
    title: 'tsconfig.json & Compiler Options',
    summary: 'tsconfig.json is the configuration file that controls how TypeScript checks your code and what it outputs. Start every new project with strict: true.',
    body: `tsconfig.json is where you configure TypeScript. The most important option groups are:

Strictness — "strict": true turns on a set of checks that catch real bugs:
- strictNullChecks: null and undefined become their own types, not silently accepted everywhere
- noImplicitAny: TypeScript reports an error when a variable's type would silently become any
- strictFunctionTypes: function parameters are checked more carefully (contravariant — see the Variance section)
- useUnknownInCatchVariables: variables in catch blocks are unknown instead of any, so you have to check them before using them

Module resolution (how TypeScript finds imported files):
- "moduleResolution": "bundler" for projects using Vite, webpack, or esbuild
- "moduleResolution": "node16" or "nodenext" for native Node.js ES modules
- "paths" lets you set up import aliases like @/ pointing to src/

Output:
- "target": which version of JavaScript to output (e.g. ES2020, ES2022, ESNext)
- "module": which module format to use in the output (ESNext, CommonJS, NodeNext)
- "noEmit": true means TypeScript only type-checks and never writes output files — useful when your bundler handles compilation
- "declaration": true emits .d.ts type definition files — needed when publishing a library

Best practice: always start with "strict": true. It catches real bugs and makes null handling, generics, and function types work correctly. Turning off strict options to silence errors usually creates problems later.`,
    diagram: {
      type: 'ascii',
      content: `{
  "compilerOptions": {
    "strict": true,              // all strict checks
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM"],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] },
    "noEmit": true,              // type-check only (bundler transpiles)
    "declaration": true,         // emit .d.ts files (for libraries)
    "skipLibCheck": true         // skip .d.ts files in node_modules
  }
}`,
    },
    tags: ['tsconfig', 'strict', 'compiler-options', 'configuration'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'type-level-programming',
    title: 'Type-Level Programming',
    summary: 'At the advanced level, TypeScript\'s type system can compute, filter, and transform types at compile time — without any runtime code.',
    body: `TypeScript's type system is powerful enough to compute types entirely at compile time, using the same logic as a programming language. Conditional types, mapped types, template literals, and recursive types let you derive complex types automatically — the kind of thing that would otherwise need code generation or runtime reflection.

Key building blocks:
- Mapped types: loop over a type's keys and produce a new type from them
- Conditional types: choose between two types based on a relationship (T extends U ? A : B)
- infer: pull out and name a piece of a matched type inside a conditional type
- Template literal types: build and parse string types using template syntax
- Recursion: types that reference themselves, used for trees and deeply nested structures

Practical uses:
- Deep Readonly or Deep Partial — making every level of a nested object read-only or optional
- Extracting route parameters from URL strings at the type level ('/user/:id' → { id: string })
- Strongly typed query builders
- Event systems where event names and handler types are derived from an object shape
- API response types that are computed automatically from request types

Limits to be aware of: deeply recursive types can slow down the TypeScript compiler or hit an instantiation depth limit. TypeScript caps how deep it will go to prevent runaway computation. When a type becomes very hard to read, it is often better to use a simpler approximation — the goal is making wrong code fail at compile time, not writing a perfect type for every edge case.`,
    diagram: {
      type: 'ascii',
      content: `// Extract path params from route string
type ExtractParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? Param | ExtractParams<\`/\${Rest}\`>
    : T extends \`\${string}:\${infer Param}\`
      ? Param
      : never;

type Params = ExtractParams<'/users/:id/posts/:postId'>;
// 'id' | 'postId'

// Builder pattern with chaining types
type Builder<T> = {
  set<K extends keyof T>(key: K, val: T[K]): Builder<T>;
  build(): T;
};`,
    },
    tags: ['type-level', 'advanced', 'conditional-types', 'mapped-types', 'recursion'],
    tier: 'advanced',
    level: 'expert',
  },
];

export default tsTheory;
