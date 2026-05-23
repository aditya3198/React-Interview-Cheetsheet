import type { QnaItem } from '@/types/content';

const tsQna: QnaItem[] = [
  {
    id: 'ts-what-and-why',
    question: 'What is TypeScript and why use it over plain JavaScript?',
    answer: `TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional type annotations, interfaces, generics, enums, and access modifiers. Every valid JavaScript file is valid TypeScript.

Why use it: (1) Catch bugs at compile time — null dereferences, wrong argument types, missing properties. (2) Better IDE experience — precise autocompletion, inline documentation, safe refactoring. (3) Acts as documentation — function signatures communicate intent without runtime checks. (4) Scales with team size — types enforce contracts across files and contributors.

The cost is a compilation step and learning curve for advanced type features. The tradeoff is almost always worth it for codebases beyond a few hundred lines.`,
    codeExample: `// JavaScript — runtime error only
function greet(user) {
  return 'Hello, ' + user.nane; // typo — undefined, no error
}

// TypeScript — compile-time error
function greet(user: { name: string }): string {
  return 'Hello, ' + user.nane; // Error: Property 'nane' does not exist
}`,
    codeLanguage: 'typescript',
    difficulty: 'fresher',
    tags: ['typescript', 'basics', 'type-safety'],
    tier: 'core',
  },
  {
    id: 'ts-interface-vs-type',
    question: 'What is the difference between interface and type alias in TypeScript?',
    answer: `Both describe the shape of an object, and in most cases they are interchangeable. Key differences:

1. Declaration merging: interfaces can be re-declared to add properties (merged). Type aliases cannot — redeclaring a type is always an error.

2. Extension syntax: interfaces use extends; type aliases use intersection (&). Both work for inheritance-like patterns.

3. What they can name: type aliases can name any type — primitives, unions, tuples, conditional types. Interfaces are restricted to object/function shapes.

4. Error messages: TypeScript often shows the interface name in errors instead of expanding the structure, which can be cleaner.

Rule of thumb: use interface for public APIs, object shapes, and anything that might be augmented. Use type for unions, intersections, utility types, and anything that isn't a plain object shape.`,
    codeExample: `// Interface — mergeable, extends syntax
interface User { id: number; name: string; }
interface User { email: string; } // merged: now has id, name, email
interface AdminUser extends User { permissions: string[]; }

// Type alias — not mergeable, & for intersection
type User = { id: number; name: string; };
// type User = { email: string }; // Error — duplicate identifier
type AdminUser = User & { permissions: string[] };

// Types can express what interfaces cannot
type ID = string | number;
type Nullable<T> = T | null;`,
    codeLanguage: 'typescript',
    difficulty: 'fresher',
    tags: ['interface', 'type-alias', 'basics'],
    tier: 'core',
  },
  {
    id: 'ts-structural-typing',
    question: 'What is structural typing in TypeScript?',
    answer: `TypeScript uses structural typing — compatibility is determined by the shape of a type (its properties and their types), not by declared names or class hierarchy.

If an object has all the properties a type requires, it satisfies that type, regardless of how it was declared. A plain object literal, a class instance, and a separately defined interface are all mutually assignable if they share the same structure.

This contrasts with nominal typing (Java, C#) where you must explicitly declare that a class implements an interface for compatibility.

One subtlety: TypeScript applies excess property checking when you pass a fresh object literal directly to a typed location — extra properties cause an error. But if you assign the same literal to an intermediate variable first, the check is skipped.`,
    codeExample: `interface Point { x: number; y: number; }

class Coordinate {
  x = 0;
  y = 0;
  label = 'origin'; // extra property
}

const c = new Coordinate();
const p: Point = c; // OK — Coordinate has x and y

// Excess property check on fresh literals
const p2: Point = { x: 0, y: 0, label: 'hi' }; // Error
const obj = { x: 0, y: 0, label: 'hi' };
const p3: Point = obj; // OK — intermediate variable bypasses check`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['structural-typing', 'type-system', 'compatibility'],
    tier: 'core',
  },
  {
    id: 'ts-unknown-any-never',
    question: 'What is the difference between unknown, any, and never?',
    answer: `These three types sit at the extremes of TypeScript's type hierarchy:

any: the escape hatch. Assignable to and from every type. TypeScript stops checking any values — no errors, no autocomplete. Every any is a hole in your type safety. Use only for gradual migration or unavoidably dynamic code.

unknown: the type-safe any. You can assign anything to unknown, but you can't use an unknown value without narrowing it first (typeof, instanceof, etc.). It forces explicit handling — use it for values from external sources, error catch variables, or generic "I don't know yet" values.

never: the bottom type. No value can ever have this type. It's the return type of functions that always throw, the result of impossible intersections (string & number), and the type in unreachable branches — enabling exhaustiveness checking.

Hierarchy: unknown is the top type (every type extends it). never is the bottom type (extends every type). any floats outside the normal lattice — it's both assignable to and from everything.`,
    codeExample: `// any — dangerous
let a: any = 'hello';
a.notReal(); // no error — runtime surprise

// unknown — safe, must narrow
let u: unknown = getData();
// u.toUpperCase(); // Error — must narrow first
if (typeof u === 'string') u.toUpperCase(); // OK

// never — unreachable / bottom
function fail(msg: string): never { throw new Error(msg); }
type Impossible = string & number; // never

// Exhaustiveness check
type Shape = 'circle' | 'rect';
function area(s: Shape) {
  if (s === 'circle') return 0;
  if (s === 'rect')   return 0;
  const _: never = s; // Error if new member added to Shape
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['unknown', 'any', 'never', 'type-system'],
    tier: 'core',
  },
  {
    id: 'ts-narrowing',
    question: 'How does type narrowing work in TypeScript?',
    answer: `TypeScript performs control flow analysis — it tracks which types are possible for a variable at each point in the code, based on type guards, assignments, and early returns.

Type guards that trigger narrowing:
- typeof: typeof x === 'string' narrows to string
- instanceof: x instanceof Error narrows to Error
- in operator: 'prop' in x narrows to types that have that property
- Equality: x === null narrows to null (eliminates the rest)
- Truthiness: if (x) narrows out null/undefined/0/''
- User-defined predicates: (val: unknown): val is User
- Discriminated union: checking a shared literal "tag" property

After a return/throw, TypeScript knows that code path ended and narrows accordingly. This makes early return guard clauses idiomatic — they progressively eliminate types so the rest of the function works with a narrower, safer type.`,
    codeExample: `function process(value: string | number | null) {
  if (value === null) return;       // null eliminated
  // value: string | number

  if (typeof value === 'string') {
    value.toUpperCase();            // value: string
    return;
  }
  // value: number — string eliminated by typeof + return
  value.toFixed(2);
}

// Discriminated union narrowing
type Event = { type: 'click'; x: number } | { type: 'keydown'; key: string };
function handle(e: Event) {
  if (e.type === 'click') e.x; // Event & { type: 'click' }
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['narrowing', 'type-guards', 'control-flow'],
    tier: 'core',
  },
  {
    id: 'ts-generics-explanation',
    question: 'What are generics in TypeScript and when should you use them?',
    answer: `Generics let you write reusable, type-safe abstractions where the types involved are parameters rather than fixed types. They preserve type information through transformations — something any[] and union types cannot do.

Use generics when the output type depends on the input type. The canonical example: a function that returns the first element of an array should return T, not any. A function that maps over an array should return U[], where U depends on the callback's return type.

Constraints (T extends SomeType) limit what T can be, letting you access specific properties while remaining generic.

When not to use generics: don't add a type parameter just because a function accepts multiple types. If the output type doesn't depend on which specific type was passed in, a union is simpler. A function that accepts string | number and always returns string doesn't benefit from generics.`,
    codeExample: `// Generic — return type depends on input type
function first<T>(arr: T[]): T | undefined { return arr[0]; }
first([1, 2, 3]);  // number | undefined
first(['a', 'b']); // string | undefined

// Constrained generic
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // safe — TypeScript knows T[K]
}

// Generic interface
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['generics', 'type-parameters', 'reusability'],
    tier: 'core',
  },
  {
    id: 'ts-mapped-types-explanation',
    question: 'What are mapped types and how do they work?',
    answer: `Mapped types iterate over the keys of an existing type and transform each property. The syntax uses [K in keyof T] to loop over every key, and you can change the value type, add/remove modifiers, and remap key names.

Modifiers: add or remove optional (?) and readonly with + (default) or - prefixes. -? makes all properties required; -readonly makes them mutable.

Key remapping: the as clause in [K in keyof T as NewKeyType] renames keys. Using as never filters a key out entirely. Combined with template literal types, this lets you compute getter/setter method names from an object shape.

All built-in utility types (Partial, Required, Readonly, Pick, Omit, Record) are implemented with mapped types — reading their definitions in lib.es5.d.ts is the best way to truly understand them.`,
    codeExample: `// How Partial<T> works
type Partial<T> = { [K in keyof T]?: T[K] };

// Remove optional with -?
type Required<T> = { [K in keyof T]-?: T[K] };

// Key remapping — create getter names
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }

// Filter keys by value type (as never removes a key)
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['mapped-types', 'utility-types', 'type-manipulation'],
    tier: 'advanced',
  },
  {
    id: 'ts-conditional-types-explanation',
    question: 'What are conditional types and what is the infer keyword?',
    answer: `Conditional types use the syntax T extends U ? TrueType : FalseType — if T is assignable to U, the type resolves to TrueType, otherwise FalseType.

Distributivity: by default, conditional types distribute over union members. If T is A | B, then T extends U ? X : Y becomes (A extends U ? X : Y) | (B extends U ? X : Y). Wrap in brackets [T] extends [U] to prevent this.

The infer keyword appears inside conditional types to capture a matched sub-type and name it for use in the true branch. T extends Promise<infer R> ? R : never extracts R from a Promise wrapper. This is how ReturnType, Parameters, Awaited, and InstanceType are all implemented.

Conditional types enable computing types that would otherwise require runtime reflection or code generation — extracting array element types, function return types, constructor instance types, and more.`,
    codeExample: `// Conditional type — branch on type relationship
type IsArray<T> = T extends any[] ? true : false;
type A = IsArray<string[]>; // true
type B = IsArray<number>;   // false

// infer — extract a matched type
type ElementOf<T>  = T extends (infer E)[] ? E : never;
type StringElement = ElementOf<string[]>; // string

// ReturnType implementation
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type R = ReturnType<() => { id: number }>; // { id: number }

// Await implementation
type Awaited<T> = T extends Promise<infer V> ? Awaited<V> : T;
type D = Awaited<Promise<Promise<string>>>; // string`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['conditional-types', 'infer', 'type-manipulation'],
    tier: 'advanced',
  },
  {
    id: 'ts-template-literal-types-explanation',
    question: 'What are template literal types in TypeScript?',
    answer: `Template literal types use backtick syntax at the type level to construct new string literal types. They mirror JavaScript template literals but operate on types.

When a union type is embedded, the template distributes over every member, producing a union of all combinations.

Built-in string utilities: Uppercase<S>, Lowercase<S>, Capitalize<S>, Uncapitalize<S>.

The most powerful patterns combine template literal types with mapped types and key remapping (as clause) to transform entire object shapes: generate getter/setter method names, CSS property variants, or event handler names from object keys.

Template literal types can also be used with infer in conditional types to parse string patterns at the type level — extracting route parameters, prefix/suffix substrings, and more.`,
    codeExample: `type Side = 'top' | 'right' | 'bottom' | 'left';
type Margin = \`margin-\${Side}\`;
// 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left'

// Getter generation — mapped type + key remapping
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

// Extract path param from route string
type ExtractParam<T extends string> =
  T extends \`:\${infer Param}\` ? Param : never;
type P = ExtractParam<':userId'>; // 'userId'

// Strongly typed event names
type Events = 'click' | 'focus' | 'blur';
type Handlers = { [K in Events as \`on\${Capitalize<K>}\`]: () => void };
// { onClick: () => void; onFocus: () => void; onBlur: () => void }`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['template-literal-types', 'string-types', 'type-manipulation'],
    tier: 'advanced',
  },
  {
    id: 'ts-discriminated-unions-explanation',
    question: 'What are discriminated unions and why are they useful?',
    answer: `A discriminated union is a union of object types that each have a shared property with a unique literal type value. TypeScript uses this "discriminant" to narrow the full union to its specific member when you check the tag property.

The pattern is TypeScript-idiomatic alternative to class hierarchies for polymorphism. It works well because the data is plain objects — easy to serialize, log, and test.

Exhaustiveness checking: add a default branch that assigns the remaining type to a never variable. If all union members are handled, the assignment is valid. If a new member is added to the union later without updating the switch, TypeScript reports an error — the new member can't be assigned to never.

Common applications: Redux action types, API response shapes, state machines, AST nodes.`,
    codeExample: `type Action =
  | { type: 'increment'; amount: number }
  | { type: 'reset' }
  | { type: 'setValue'; value: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment': return state + action.amount;
    case 'reset':     return 0;
    case 'setValue':  return action.value;
    default: {
      const _exhaustive: never = action;
      return _exhaustive; // Error if new action type added without a case
    }
  }
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['discriminated-unions', 'narrowing', 'exhaustiveness', 'pattern'],
    tier: 'advanced',
  },
  {
    id: 'ts-satisfies-explanation',
    question: 'What is the satisfies operator and how does it differ from a type annotation?',
    answer: `A type annotation (const x: Type = value) validates the value but widens its inferred type to Type. Accessing properties gives you the Type's property types, not the literal values.

The satisfies operator (value satisfies Type) also validates the value against the type, but preserves the original inferred type. You get both validation and the precise literal types.

The practical difference: if a value's property is string | number[] in the target type but you write a number[] literal, with an annotation you can't call .map without narrowing. With satisfies, TypeScript knows it's a number[] and lets you call .map directly.

satisfies is especially useful for configuration objects and lookup tables where you want type validation but need the specific inferred types for downstream usage.`,
    codeExample: `type Palette = Record<string, string | number[]>;

// Type annotation — widens to string | number[]
const p1: Palette = { red: [255, 0, 0], green: '#00ff00' };
p1.red.map(c => c / 255); // Error — could be string

// satisfies — validates shape, keeps inferred type
const p2 = { red: [255, 0, 0], green: '#00ff00' } satisfies Palette;
p2.red.map(c => c / 255); // OK — p2.red is number[]
p2.green.toUpperCase();   // OK — p2.green is string

// Also catches missing/extra keys
type Config = { host: string; port: number };
const c = {
  host: 'localhost',
  port: 3000,
  extra: true, // Error — extra property
} satisfies Config;`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['satisfies', 'type-validation', 'inference'],
    tier: 'advanced',
  },
  {
    id: 'ts-strict-null-checks',
    question: 'How does strictNullChecks work and why does it matter?',
    answer: `Without strictNullChecks, null and undefined are silently assignable to every type. A variable typed as string can actually hold null, making null-dereference bugs invisible to the type checker.

With strictNullChecks enabled (which is included in "strict": true), null and undefined are distinct types. A string variable cannot be null unless you explicitly write string | null. This makes all null/undefined paths visible and forces you to handle them.

The discipline: when a function returns string | null, callers must check for null before using the result. TypeScript tracks this via control flow analysis — after if (x !== null), x is narrowed to string.

Optional chaining (?.) and nullish coalescing (??) work seamlessly with strictNullChecks to handle nullable values concisely.`,
    codeExample: `// Without strictNullChecks — null sneaks in silently
let name: string = null; // OK but dangerous

// With strictNullChecks: true
let name: string = null;       // Error
let name: string | null = null; // OK — explicit

// Must narrow before use
function upper(s: string | null): string {
  if (s === null) return '';
  return s.toUpperCase(); // s: string — narrowed
}

// Optional chaining + nullish coalescing
function getCity(user: { address?: { city?: string } } | null): string {
  return user?.address?.city ?? 'Unknown';
}`,
    codeLanguage: 'typescript',
    difficulty: 'fresher',
    tags: ['strictNullChecks', 'null', 'undefined', 'strict'],
    tier: 'core',
  },
  {
    id: 'ts-utility-types-explanation',
    question: 'What are TypeScript utility types and which are most commonly used?',
    answer: `Utility types are generic types in TypeScript's standard library for common type transformations. They're built with mapped types and conditional types under the hood.

Most commonly used:
- Partial<T> — all properties optional (good for update/patch payloads)
- Required<T> — all properties required (remove optionals)
- Readonly<T> — all properties readonly (immutable contracts)
- Record<K, V> — object type from key union and value type
- Pick<T, K> — select a subset of properties
- Omit<T, K> — exclude specific properties
- Exclude<T, U> / Extract<T, U> — manipulate union members
- NonNullable<T> — remove null and undefined
- ReturnType<T> / Parameters<T> — introspect function types
- Awaited<T> — unwrap Promise types recursively

Understanding how they're implemented helps you write your own: most are a few lines of mapped or conditional types.`,
    codeExample: `type User = { id: number; name: string; email: string };

type Patch      = Partial<User>;            // all optional
type Safe       = Omit<User, 'email'>;      // { id, name }
type NameOnly   = Pick<User, 'name'>;       // { name }
type RoleMap    = Record<'admin'|'user', string[]>;

// Function introspection
async function getUser(id: string): Promise<User> { /* ... */ }
type GetUserArgs   = Parameters<typeof getUser>;   // [id: string]
type GetUserResult = Awaited<ReturnType<typeof getUser>>; // User`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['utility-types', 'partial', 'pick', 'omit', 'record'],
    tier: 'core',
  },
  {
    id: 'ts-function-overloads-explanation',
    question: 'What are function overloads and when should you use them?',
    answer: `Function overloads let you declare multiple call signatures for a single function. Each signature describes a specific combination of argument and return types. Callers see only the overload signatures; the implementation signature is hidden.

Use overloads when a function's return type genuinely depends on which argument types are passed — where a union return type would be too imprecise. For example, a format function that returns string for all inputs doesn't need overloads, but a createElement function that returns a specific element type based on the tag name does.

Implementation: write two or more overload signatures, then an implementation signature that is a union of all overloads. The implementation must handle all cases; TypeScript type-checks the implementation against the broader signature.

Prefer overloads over a single union signature when callers benefit from knowing the specific return type based on what they passed in.`,
    codeExample: `// Return type depends on argument type
function createElement(tag: 'a'): HTMLAnchorElement;
function createElement(tag: 'input'): HTMLInputElement;
function createElement(tag: 'div'): HTMLDivElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const link = createElement('a'); // HTMLAnchorElement — not HTMLElement
link.href = 'https://example.com'; // OK — href exists on HTMLAnchorElement

// Without overloads — caller gets HTMLElement (less specific)
function createElementSimple(tag: string): HTMLElement {
  return document.createElement(tag);
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['overloads', 'functions', 'polymorphism'],
    tier: 'advanced',
  },
  {
    id: 'ts-declaration-merging-explanation',
    question: 'What is declaration merging in TypeScript?',
    answer: `Declaration merging happens when TypeScript sees multiple declarations with the same name in the same scope and combines them into a single definition. The most practical form is interface merging: declaring the same interface name twice merges both sets of properties into one type.

This is the standard mechanism for extending third-party types:
- Module augmentation: declare module 'library-name' { interface X { newProp: T } } adds to an existing module's types
- Global augmentation: declare global { interface Window { ... } } extends global types
- Namespace + function/class merging allows attaching static properties to a function via a same-named namespace

A key consequence: interfaces merge, type aliases do not. Redeclaring type Foo twice is always a duplicate identifier error — this is one concrete behavioral difference between them.

Module augmentation files must be actual module files (they contain at least one top-level import or export). Otherwise all declarations become global.`,
    codeExample: `// Interface merging
interface Config { host: string; }
interface Config { port: number; }
// Config: { host: string; port: number } — merged

// Module augmentation
import 'express';
declare module 'express-serve-static-core' {
  interface Request { user?: { id: string }; }
}
// req.user is now typed everywhere

// Global augmentation
declare global {
  interface Window { myLib: { version: string }; }
}
window.myLib.version; // typed`,
    codeLanguage: 'typescript',
    difficulty: 'expert',
    tags: ['declaration-merging', 'module-augmentation', 'interfaces'],
    tier: 'advanced',
  },
  {
    id: 'ts-decorators-explanation',
    question: 'How do TypeScript 5 decorators work?',
    answer: `TypeScript 5.0 adopted the TC39 Stage 3 decorator proposal, replacing the older experimental decorators (emitDecoratorMetadata era).

New decorators can be applied to: classes, class methods, class fields, class accessors (getter/setter pairs), and auto-accessors (the new accessor keyword). Each type receives a specific context object describing the decorated target.

A decorator is a function that either modifies or replaces the decorated value. Method decorators wrap the method; field decorators return an initializer function; class decorators transform the class.

Key difference from legacy decorators: the new API doesn't rely on Reflect.metadata — it uses context.metadata for metadata scenarios. The enable flag changed too: set "experimentalDecorators": false (or omit it) for the new spec-compliant decorators.`,
    codeExample: `// Method decorator — wraps the original method
function memoize(target: Function, ctx: ClassMethodDecoratorContext) {
  const cache = new Map<string, unknown>();
  return function (this: unknown, ...args: unknown[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = target.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

class MathUtils {
  @memoize
  fibonacci(n: number): number {
    return n <= 1 ? n : this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['decorators', 'classes', 'metadata'],
    tier: 'advanced',
  },
  {
    id: 'ts-variance-explanation',
    question: 'What is covariance and contravariance in TypeScript?',
    answer: `Variance describes how generic type compatibility relates to the compatibility of their type arguments.

Covariant: if Dog extends Animal, then Container<Dog> extends Container<Animal>. Safe for read-only / output positions. Arrays and return types are covariant.

Contravariant: the relationship reverses. If Dog extends Animal, then (animal: Animal) => void extends (dog: Dog) => void. A handler that accepts any Animal can certainly handle a Dog — it handles a broader set. Function parameters are contravariant.

Invariant: neither direction holds. A mutable container (Ref<T> with get and set) can't be either — writing Animal into Ref<Dog> would break it.

TypeScript's method parameters are historically bivariant (both directions) for practical compatibility, but function-typed properties use proper contravariance in strict mode. TypeScript 4.7 introduced in/out annotations for explicit variance marking, improving both documentation and compiler performance on complex generics.`,
    codeExample: `class Animal { move() {} }
class Dog extends Animal { bark() {} }

// Covariant — return types
type GetAnimal = () => Animal;
type GetDog    = () => Dog;
const getA: GetAnimal = () => new Dog(); // OK — Dog extends Animal

// Contravariant — parameter types
type HandleAnimal = (a: Animal) => void;
type HandleDog    = (d: Dog)    => void;
const h: HandleDog = (a: Animal) => a.move(); // OK — handles more than asked

// TypeScript 4.7 explicit annotations
interface Provider<out T> { get(): T; }        // covariant
interface Consumer<in T>  { consume(x: T): void } // contravariant`,
    codeLanguage: 'typescript',
    difficulty: 'expert',
    tags: ['variance', 'covariance', 'contravariance', 'generics'],
    tier: 'advanced',
  },
  {
    id: 'ts-index-signatures-explanation',
    question: 'What are index signatures and when should you use them?',
    answer: `An index signature describes an object with dynamic (runtime-determined) keys. The syntax [key: string]: ValueType tells TypeScript that any string key maps to ValueType.

Use index signatures when you genuinely have a homogeneous dynamic map — for example, a cache keyed by ID, a lookup table, or a dictionary. Avoid them when you know the specific set of keys upfront — use an object type or Record<'specific' | 'keys', ValueType> instead.

Important constraints: all specific named properties on the interface must be assignable to the index signature type. If the index signature says [key: string]: string, then every named property must also be a string.

Prefer Record<K, V> for simple maps — it's cleaner and the K parameter enforces allowed keys. Use index signatures when K must literally be any string (or any number).

TypeScript 4.4 added template literal index signatures: [event: \`on\${string}\`]: Handler works as expected.`,
    codeExample: `// Index signature for a cache
interface Cache {
  [id: string]: { value: unknown; expiresAt: number };
}

// Specific keys must satisfy the index type
interface Config {
  version: string;       // must be string (to match index type)
  [key: string]: string;
}

// Cleaner alternative for known key unions
type RoleMap = Record<'admin' | 'user' | 'guest', string[]>;

// Template literal index signature (TS 4.4)
interface Handlers {
  [event: \`on\${string}\`]: (...args: unknown[]) => void;
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['index-signatures', 'dynamic-keys', 'record'],
    tier: 'core',
  },
  {
    id: 'ts-deep-readonly',
    question: 'How do you create a deep Readonly or deep Partial type in TypeScript?',
    answer: `TypeScript's built-in Readonly<T> and Partial<T> only operate one level deep — nested objects are still mutable/optional. For deeply nested structures, you need recursive versions using conditional types and mapped types.

DeepReadonly<T>: map over all keys and recursively apply DeepReadonly if the property is an object. Primitive types pass through unchanged.

DeepPartial<T>: map over all keys with ?, and recursively apply DeepPartial if the property is an object.

Caveats: TypeScript's recursive type support has depth limits. Very deeply nested types may trigger "Type instantiation is excessively deep" errors. Functions, Maps, Sets, and arrays often need special handling if you want them treated differently from plain objects.

For production use, libraries like type-fest provide battle-tested implementations that handle edge cases (functions, arrays, Maps) correctly.`,
    codeExample: `// Deep Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Deep Partial
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

type Config = {
  db: { host: string; port: number };
  cache: { ttl: number; max: number };
};

type ImmutableConfig = DeepReadonly<Config>;
// config.db.host is readonly — nested too

type PatchConfig = DeepPartial<Config>;
// { db?: { host?: string; port?: number }; cache?: {...} }`,
    codeLanguage: 'typescript',
    difficulty: 'expert',
    tags: ['deep-readonly', 'deep-partial', 'recursive', 'mapped-types'],
    tier: 'advanced',
  },
  {
    id: 'ts-ambient-declarations',
    question: 'What are ambient declarations and .d.ts files?',
    answer: `Ambient declarations tell TypeScript about the types of things that exist at runtime but weren't written in TypeScript — existing JavaScript modules, browser globals injected by a bundler, or global polyfills.

.d.ts files contain only type information (no implementation). They're automatically included from node_modules/@types packages (DefinitelyTyped) and can be written manually for untyped modules or to describe global augmentations.

declare module 'module-name' { ... } describes the shape of a JS module. declare const __DEV__: boolean describes a bundler-injected global. declare global { ... } adds to the global scope from inside a module file.

Triple-slash directives (/// <reference types="..." />) are a legacy way to add type dependencies, now mostly replaced by the types field in tsconfig. They're still used when imports aren't available.

Writing a .d.ts file is how you add TypeScript support to an untyped npm package when @types/package doesn't exist.`,
    codeExample: `// my-lib.d.ts — describe a JavaScript module
declare module 'my-untyped-lib' {
  export function compute(value: number): number;
  export const version: string;

  export interface Options { timeout?: number; }
  export default class MyLib {
    constructor(opts?: Options);
    run(): Promise<void>;
  }
}

// Bundler-injected globals
declare const __DEV__: boolean;
declare const __VERSION__: string;

// Asset modules
declare module '*.svg' { const url: string; export default url; }
declare module '*.png' { const url: string; export default url; }`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['ambient', 'dts', 'declaration-files', 'modules'],
    tier: 'advanced',
  },
  {
    id: 'ts-as-const-explanation',
    question: 'What does as const do in TypeScript?',
    answer: `as const is a type assertion that tells TypeScript to infer the narrowest possible type for a value — literal types instead of widened primitives, and readonly modifiers throughout.

Without as const: const config = { port: 3000 } gives port: number (widened). TypeScript figures you might change it or pass it to something accepting any number.

With as const: port is typed as 3000 (literal), and the object is deeply readonly. This means you can't mutate any property, and TypeScript knows the exact value.

Common use cases:
- Extracting a string/number union from an object's values: (typeof COLORS)[keyof typeof COLORS]
- Enum-like patterns without enums (no runtime overhead)
- Typed route or config definitions where exact values matter
- Tuples — without as const, [1, 'hello'] infers (number | string)[], not [number, string]`,
    codeExample: `// Without as const
const COLORS = { red: 'red', green: 'green', blue: 'blue' };
type Color = (typeof COLORS)[keyof typeof COLORS]; // string (widened)

// With as const
const COLORS = { red: 'red', green: 'green', blue: 'blue' } as const;
type Color = (typeof COLORS)[keyof typeof COLORS]; // 'red' | 'green' | 'blue'

// Tuple inference
const pair = [1, 'hello'];         // (number | string)[]
const pair2 = [1, 'hello'] as const; // readonly [1, 'hello'] — tuple

// Exact config values
const config = { port: 3000, env: 'production' } as const;
type Env = typeof config['env']; // 'production' — not string`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['as-const', 'literal-types', 'readonly'],
    tier: 'core',
  },
  {
    id: 'ts-excess-property-checking',
    question: 'How does excess property checking work in TypeScript?',
    answer: `TypeScript has two modes of checking objects against a type:

Structural compatibility check: used when assigning a variable to another typed variable. Only required properties are checked — extra properties are allowed because TypeScript only requires the shape to be at least as wide as the target type.

Excess property check: applied specifically to fresh object literals passed directly to a typed location (function argument, assignment, return). Any property not in the target type is flagged as an error. This catches common typos in property names.

The check applies only to fresh literals — if you assign the literal to an intermediate variable first, the excess check is skipped on the assignment to the typed location. This is intentional: the intermediate variable might legitimately have extra properties for other uses.

This asymmetry is why the same object passes when assigned through a variable but fails when written inline.`,
    codeExample: `interface Options { timeout: number; retries?: number; }

function request(opts: Options) { /* ... */ }

// Fresh literal — excess property check
request({ timeout: 5000, debug: true });  // Error — 'debug' not in Options

// Via variable — no excess check (structural only)
const opts = { timeout: 5000, debug: true };
request(opts); // OK — opts has at least { timeout: number }

// Assignment to typed variable — excess check applies
const o: Options = { timeout: 5000, debug: true }; // Error`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['excess-property-checking', 'structural-typing', 'object-literals'],
    tier: 'core',
  },
  {
    id: 'ts-const-type-params-explanation',
    question: 'What are const type parameters in TypeScript 5?',
    answer: `Const type parameters (added in TypeScript 5.0) let generic functions infer literal types without requiring as const at every call site.

Without const: a generic function like identity<T>(value: T) infers T as string[], not readonly ['a', 'b'] when called with ['a', 'b']. The type is widened.

With const: function identity<const T>(value: T): T infers the literal/readonly type directly. The caller gets back readonly ['a', 'b'] without writing anything extra.

This is especially useful for library authors building typed route definitions, query builders, or any API where the precise literal value matters to the return type. Previously, callers had to sprinkle as const everywhere — now the function signature communicates the intent.`,
    codeExample: `// Without const — infers widened type
function wrap<T>(value: T): { value: T } { return { value }; }
const a = wrap(['x', 'y']); // { value: string[] } — not ideal

// With const — infers literal/tuple type
function wrap<const T>(value: T): { value: T } { return { value }; }
const b = wrap(['x', 'y']); // { value: readonly ['x', 'y'] }

// Practical: typed route builder
function defineRoutes<const T extends readonly { path: string }[]>(
  routes: T,
): T { return routes; }

const routes = defineRoutes([
  { path: '/',      component: 'Home' },
  { path: '/about', component: 'About' },
]);
type Paths = (typeof routes)[number]['path']; // '/' | '/about'`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['const-type-params', 'generics', 'literal-types'],
    tier: 'advanced',
  },
  {
    id: 'ts-using-declarations-explanation',
    question: 'What are using declarations (TypeScript 5.2) and how do they work?',
    answer: `using declarations (TypeScript 5.2) implement the TC39 explicit resource management proposal. They ensure a resource's cleanup method is called automatically when the variable leaves scope, similar to a try/finally or Python's with statement.

A synchronous Disposable implements [Symbol.dispose](): void. using x = ... calls x[Symbol.dispose]() at the end of the enclosing block, even if an exception is thrown.

AsyncDisposable implements [Symbol.asyncDispose](): Promise<void>. await using x = ... awaits the cleanup automatically.

When multiple using declarations exist in the same scope, they're disposed in reverse order (last declared, first disposed) — like a stack.

This eliminates a common bug pattern: forgetting to close a database connection, release a lock, or remove an event listener in a finally block.`,
    codeExample: `class Connection implements Disposable {
  constructor(readonly url: string) { console.log('Connected to', url); }
  query(sql: string): unknown[] { return []; }
  [Symbol.dispose]() { console.log('Disconnected from', this.url); }
}

function withDb() {
  using db = new Connection('postgres://localhost/mydb');
  // Connected to postgres://localhost/mydb

  const rows = db.query('SELECT * FROM users');
  return rows;
  // Disconnected from postgres://localhost/mydb — even if query throws
}

// Async version
class FileStream implements AsyncDisposable {
  async [Symbol.asyncDispose]() { await this.close(); }
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['using', 'disposable', 'resource-management', 'typescript-5'],
    tier: 'advanced',
  },
  {
    id: 'ts-keyof-usage',
    question: 'What is the keyof operator and what are its common use cases?',
    answer: `keyof T produces a union of all property names (keys) of type T as string (or number/symbol) literal types. It's fundamental to writing type-safe generic utilities.

Common use cases:
1. Constrain a key parameter to only valid keys of an object: K extends keyof T
2. Index safely into an object at a generic key: obj[key] where key: keyof T
3. Derive a union of valid keys for runtime validation
4. Combined with typeof to get key unions from runtime objects: keyof typeof obj
5. Combined with indexed access to get the union of all value types: T[keyof T]

keyof on a union type: keyof (A | B) gives only the keys that appear in both — the intersection of key sets. keyof (A & B) gives the union of all keys.`,
    codeExample: `type User = { id: number; name: string; email: string };
type UserKey = keyof User; // 'id' | 'name' | 'email'

// Type-safe property accessor
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
get({ name: 'Alice' }, 'name');   // string
// get({ name: 'Alice' }, 'age'); // Error — 'age' not a key

// All value types
type UserValues = User[keyof User]; // number | string

// From a runtime object
const config = { host: 'localhost', port: 3000 };
type ConfigKey = keyof typeof config; // 'host' | 'port'`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['keyof', 'type-operators', 'generics'],
    tier: 'core',
  },
];

export default tsQna;
