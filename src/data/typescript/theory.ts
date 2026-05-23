import type { ConceptCard } from '@/types/content';

const tsTheory: ConceptCard[] = [
  {
    id: 'structural-typing',
    title: 'Structural Typing',
    summary: 'TypeScript checks type compatibility by shape, not by name — if an object has the right properties, it satisfies the type.',
    body: `TypeScript uses structural typing — two types are compatible if they have the same shape, regardless of how they were declared or named. This is sometimes called "duck typing": if it has the required fields, it qualifies.

This contrasts with nominal typing (C++, Java) where compatibility requires explicit declaration of a class hierarchy. In TypeScript, a plain object literal { name: string } is assignable to a class Person { name: string } and vice versa.

A consequence: extra properties are fine when assigning to a variable — but not when passing an object literal directly. TypeScript applies excess property checking on fresh literals to catch typos in property names.

Structural typing makes TypeScript particularly well-suited to JavaScript's dynamic nature: libraries, utilities, and third-party objects work together as long as their shapes align, without requiring shared base classes.`,
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
    summary: 'TypeScript derives types from context — you rarely need to annotate everything explicitly.',
    body: `TypeScript's type inference derives types automatically from initializers, return statements, and usage context:

Variable initializers: const x = 5 infers x: number. The type of the right-hand side becomes the variable's type.

Return types: TypeScript infers function return types from all return statements. Multiple branches returning different types produce a union.

Generic arguments: identity(42) infers T = number without explicit identity<number>(42).

Contextual typing: function expressions assigned to typed variables or passed to typed parameters get their parameter types from context. The event parameter in button.addEventListener('click', e => ...) is inferred as MouseEvent.

Best practice: annotate function parameters (inference can't help there without context) and public API return types. Let inference handle internal variables — it reduces noise while TypeScript still catches type mismatches.`,
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
    summary: 'TypeScript tracks types through every branch and assignment, narrowing union types to their members.',
    body: `TypeScript performs control flow analysis — it follows every branch, early return, assignment, and thrown exception to track what a variable's type can be at each point in the code.

Type guards that trigger narrowing:
- typeof: typeof x === 'string' narrows to string
- instanceof: x instanceof Error narrows to Error
- in operator: 'name' in x narrows to types with that property
- Equality checks: x === null eliminates non-null types
- Truthiness: if (x) narrows out null/undefined/0/''
- User-defined predicates: (val: unknown): val is User
- Discriminated union tag: switch on a shared literal property

After a return/throw, TypeScript knows that path is gone and continues with a narrower type. This is why early-return guard clauses are idiomatic TypeScript — they progressively eliminate types from the possible set.`,
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
    summary: 'Parameterize functions, interfaces, and classes over types — write code once, use it safely with any type.',
    body: `Generics let you write reusable abstractions where the types involved are variables, not fixed. They preserve type information through transformations that unions and any cannot.

Type parameters: declared in angle brackets <T>. Convention: T for a general type, K/V for key/value, E for element, R for return type.

Constraints: T extends SomeType limits what T can be. Useful when you need a specific property (T extends { length: number }) or when T must satisfy an interface.

Defaults: <T = string> applies when the type argument is neither inferred nor provided.

Multiple parameters: <T, U>, <K extends keyof T>, etc.

When to use generics vs. unions: use generics when the output type depends on the input type (identity, map, flatMap). Use unions when a function accepts multiple types but always returns the same type.

Avoid over-engineering: don't make everything generic. Only parameterize on types that actually vary and where preserving that variation matters to the caller.`,
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
    summary: 'Transform every property in a type or branch on type relationships — the building blocks of all utility types.',
    body: `Mapped types iterate over the keys of an existing type and transform each property:
{ [K in keyof T]: NewType }

Modifiers can be added (+) or removed (-): -readonly makes all props mutable, -? makes all props required. The as clause in [K in keyof T as NewKey] remaps keys using template literals or filters them out (as never removes a key).

Conditional types branch on type relationships:
T extends U ? TrueType : FalseType

When T is a union, the conditional distributes over each member. Wrapping in brackets [T] extends [U] prevents distribution.

The infer keyword inside conditional types captures a matched sub-type:
T extends Promise<infer R> ? R : never

This is how built-in utility types like ReturnType, Parameters, and Awaited are implemented. Reading their definitions in lib.es5.d.ts is the best way to internalize both features.`,
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
    summary: 'A pattern combining union types with a shared literal tag — enables exhaustive, type-safe branching.',
    body: `A discriminated union is a union of object types that each have a shared property with a unique literal value. TypeScript uses this "discriminant" to narrow the union in switch/if statements.

The pattern has three ingredients:
1. A shared tag property with a literal type per variant: kind: 'circle'
2. A union type of all variants
3. Switch/if on the tag to narrow to each specific variant

Exhaustiveness checking: add a default case that assigns the narrowed value to a never variable. If all variants are handled, the assignment works. If a new variant is added to the union without updating the switch, TypeScript reports an error — the new variant isn't never.

This pattern is the TypeScript-idiomatic alternative to inheritance-based polymorphism. It's simpler, more portable, and works well with serialization. It's also the foundation of state machine implementations and Redux action types.`,
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
    summary: 'Three special types at the extremes of TypeScript\'s type hierarchy — top type, escape hatch, and bottom type.',
    body: `any: the escape hatch. Assignable to and from every type. TypeScript disables type checking for any values. Every any is a hole in your type safety. Legitimate uses: migrating JS code gradually, interop with untyped APIs, very dynamic code that genuinely can't be typed.

unknown: the type-safe any. You can assign anything to unknown, but you cannot use an unknown value without narrowing it first. It forces explicit handling before calling methods or accessing properties — unlike any, it won't silently pass through the type system.

never: the bottom type. No value can ever have type never. It's the return type of functions that always throw or loop forever, the result of impossible intersections (string & number = never), and the type in unreachable branches of exhaustive switches.

Type hierarchy: unknown is the top type (every type is a subtype). never is the bottom type (subtype of every type). any is an exception — it both extends and is extended by everything, placing it outside the normal lattice.`,
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
    summary: 'Construct new string literal types using template syntax — enables precise typing of string patterns and dynamic API shapes.',
    body: `Template literal types use backtick syntax at the type level, mirroring JavaScript template literals. Embedding union types distributes across all combinations, producing a union of every possible string.

Built-in string manipulation types: Uppercase<S>, Lowercase<S>, Capitalize<S>, Uncapitalize<S>.

Combining with mapped types unlocks the most powerful patterns: create getter/setter method names from object shapes, CSS property variants from a tuple of values, or strongly-typed event handler dictionaries.

Template literal types also work with infer in conditional types to extract segments from string patterns — useful for parsing route parameters, validating ID formats, or decoding structured strings at the type level.

The practical sweet spot: event name generation (onClick, onChange), CSS property combinations (margin-top, padding-left), and strongly typed string templates where both prefix and suffix are controlled.`,
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
    summary: 'TypeScript ships built-in generic types for common transformations — study their implementations to master mapped and conditional types.',
    body: `TypeScript's standard library includes utility types for the most common type transformations:

Object shape:
- Partial<T> / Required<T> — add or remove ? from all properties
- Readonly<T> — add readonly to all properties
- Record<K, V> — create an object type with K keys and V values
- Pick<T, K> / Omit<T, K> — select or exclude properties

Union manipulation:
- Exclude<T, U> — members of T not assignable to U
- Extract<T, U> — members of T assignable to U
- NonNullable<T> — removes null and undefined

Function introspection:
- Parameters<T> — tuple of parameter types
- ReturnType<T> — return type
- ConstructorParameters<T> / InstanceType<T> — for class types

Async:
- Awaited<T> — recursively unwraps Promise<T>

All are implemented using mapped types and conditional types in lib.es5.d.ts. Reading those definitions is excellent practice for understanding both features at depth.`,
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
    summary: 'Variance describes how subtype relationships propagate through generic containers — covariant, contravariant, or invariant.',
    body: `Variance describes how a generic Container<T>'s subtype relationship relates to T's subtype relationship:

Covariant: if Dog extends Animal, then Container<Dog> extends Container<Animal>. Reading positions (return types, readonly arrays) are covariant — it's always safe to return a more specific type.

Contravariant: the relationship is reversed. If Dog extends Animal, then (animal: Animal) => void extends (dog: Dog) => void. A function that handles any Animal can certainly handle a Dog. Function parameters are contravariant.

Invariant: neither direction holds. A Ref<Dog> (readable + writable) is not assignable to Ref<Animal> — writing an Animal into a Ref<Dog> would break it.

TypeScript historically uses bivariant method parameters for practical compatibility reasons, but strict mode enables proper contravariance for function-typed parameters.

TypeScript 4.7 introduced explicit in/out variance annotations: out T marks covariant positions, in T marks contravariant. This improves documentation clarity and allows the compiler to skip expensive variance inference for complex generics.`,
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
    summary: 'Multiple declarations with the same name merge additively — enabling extension of third-party types without modifying their source.',
    body: `TypeScript merges multiple declarations of the same name in the same scope. The most important case is interfaces: declaring the same interface name twice produces a single type with all properties from both declarations.

Module augmentation: re-open an existing module with a matching declare module 'name' block to add new exports or extend existing interfaces. This is the standard way to extend Express's Request type, React's JSX.IntrinsicElements, or any other library type without forking it.

Global augmentation: declare global { ... } inside any module file adds to the global scope — used to extend Window, add polyfills with types, or extend process.env.

A concrete difference between interface and type alias: interfaces merge, type aliases do not. Declaring type Foo twice is always an error.

Augmentation must be in a module file (a file with at least one import or export). In a script file (no imports/exports), all declarations are global by default.`,
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
    summary: 'tsconfig.json controls type checking strictness, module resolution, and output — strict: true is the modern baseline for all new projects.',
    body: `tsconfig.json drives everything TypeScript does. Key option categories:

Strictness — "strict": true enables a group of checks:
- strictNullChecks: null/undefined are distinct types, not silently assignable everywhere
- noImplicitAny: error when a variable implicitly gets type any
- strictFunctionTypes: proper contravariant function parameter checking
- useUnknownInCatchVariables: catch clause variables are unknown, not any

Module resolution:
- "moduleResolution": "bundler" for Vite/webpack/esbuild projects
- "moduleResolution": "node16" / "nodenext" for native Node.js ESM
- "paths" for import aliases (@/ → src/)

Output:
- "target": JavaScript version to emit (ES2020, ES2022, ESNext)
- "module": module system for emitted code (ESNext, CommonJS, NodeNext)
- "noEmit": true for type-check-only — let the bundler handle transpilation
- "declaration": true for library authoring to emit .d.ts files

Best practice: always start with "strict": true. The strictness catches real bugs and makes null handling, function overloads, and generic inference correct. Selectively disabling strict options is a warning sign for technical debt.`,
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
    summary: 'Advanced TypeScript uses the type system itself as a computation engine — mapping, filtering, and transforming types at compile time.',
    body: `TypeScript's type system is Turing-complete. Conditional types, mapped types, template literals, and recursion let you compute types that would otherwise require code generation or runtime reflection.

Key building blocks:
- Mapped types: iterate over keys and transform values
- Conditional types: branch on type relationships (T extends U ? A : B)
- infer: extract sub-types from complex positions
- Template literal types: construct and decompose string types
- Recursion: types that reference themselves for deeply nested structures

Practical applications:
- Deep Readonly/Partial for immutable data structures
- Extract route parameters from URL string types ('/user/:id' → { id: string })
- Strongly typed ORM query builders
- Type-safe event systems from object shapes
- API response types inferred from request types

Limits and tradeoffs: deeply recursive types can slow the compiler or hit recursion limits. TypeScript caps instantiation depth to prevent runaway computation. When a type becomes illegible, it's often better to use a simpler approximation — the goal is making incorrect code a compile error, not perfecting the type.`,
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
