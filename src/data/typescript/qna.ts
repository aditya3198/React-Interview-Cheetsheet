import type { QnaItem } from '@/types/content';

const tsQna: QnaItem[] = [
  {
    id: 'ts-what-and-why',
    question: 'What is TypeScript and why use it over plain JavaScript?',
    answer: `TypeScript is JavaScript with optional type annotations added on top. It compiles (transforms) to plain JavaScript before running, so browsers and Node.js never see the TypeScript syntax. Every valid JavaScript file is also valid TypeScript, which makes it easy to adopt gradually.

Why use it:
(1) Catch bugs before running the code — things like accessing a property that does not exist, passing the wrong type of argument, or forgetting to handle null.
(2) Better editor experience — precise autocompletion, inline documentation, and safe renaming of variables and functions.
(3) Types as documentation — a function signature tells you what it expects and returns without needing comments.
(4) Scales with team size — types create clear contracts between different parts of a codebase, reducing misunderstandings.

The cost is a build step and some extra learning for advanced features. For any codebase larger than a few hundred lines, that tradeoff is almost always worth it.`,
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
    answer: `Both describe the shape of an object, and for simple cases they are interchangeable. Here are the practical differences:

1. Declaration merging: you can write the same interface name twice and TypeScript merges both sets of properties into one type. With a type alias, writing the same name twice is always an error.

2. Extension syntax: interfaces use extends to build on another type. Type aliases use intersection (&). Both achieve a similar result.

3. What they can name: type aliases can name any type — primitives, unions, tuples, conditional types. Interfaces are limited to object and function shapes.

4. Error messages: TypeScript often displays the interface name in error messages rather than expanding all its properties, which can be easier to read.

Rule of thumb: use interface for object shapes that might be extended or augmented by other code (like library types). Use type for unions, intersections, utility types, and anything that is not a plain object shape.`,
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
    answer: `TypeScript uses structural typing — whether two types are compatible is decided by their properties, not by their names or how they were declared.

If an object has all the properties a type requires, it satisfies that type. It does not matter if it was created as a class instance, an object literal, or matches some unrelated interface — as long as the shape matches, TypeScript accepts it.

This is different from languages like Java or C# (which use nominal typing), where a class must explicitly declare that it implements an interface before it can be used as that type.

One detail worth knowing: TypeScript applies "excess property checking" when you pass a fresh object literal directly to a typed location. Any extra properties that are not in the target type will cause an error. But if you first assign the literal to a variable and then pass the variable, the extra properties are allowed — only the required shape is checked at that point.`,
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
    answer: `These three types sit at opposite ends of TypeScript's type system:

any: the escape hatch. A value typed as any can be assigned to or from any other type. TypeScript stops type-checking it entirely — no errors, no autocomplete help. Every any is a gap in your safety net. Use it only for gradual migration from JavaScript or code that is genuinely too dynamic to type.

unknown: the safer version of any. You can assign anything to unknown, but you cannot call methods or read properties on it until you narrow the type first (using typeof, instanceof, or a similar check). It forces you to handle the uncertainty. Use it for values from external sources (like API responses), catch clause variables, or any "I do not know what this is yet" situation.

never: means "this is impossible." No value can have type never. It is the return type of functions that always throw an error or never finish. It is also the result of impossible type intersections (like string & number), and it shows up in the unreachable default branch of an exhaustive switch — which lets TypeScript warn you when you forget to handle a new union member.

Hierarchy: unknown is the top type — every type is a subtype of it. never is the bottom type — it is a subtype of every other type. any sits outside this ordering and is compatible in both directions.`,
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
    answer: `TypeScript performs control flow analysis — it reads your code branch by branch to track which types are still possible for a variable at each point.

Type guards (checks that trigger narrowing):
- typeof: typeof x === 'string' makes x a string in that branch
- instanceof: x instanceof Error makes x an Error
- in operator: 'prop' in x narrows to types that have that property
- Equality: x === null eliminates all non-null types in that branch
- Truthiness: if (x) rules out null, undefined, 0, and empty string
- User-defined predicates: functions with a return type like val is User
- Discriminated union tag: checking a shared literal property like type or kind

After a return or throw, TypeScript knows that path has ended and continues with the remaining types. This is why writing guard checks at the top of a function works so well — each one removes a type from the possible set, making the code below it simpler and safer to work with.`,
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
    answer: `Generics let you write reusable, type-safe code where the type is a variable (called a type parameter) rather than something fixed. This preserves type information through transformations in a way that any[] or a union type cannot.

Use generics when the output type depends on the input type. A clear example: a function that returns the first element of an array should return T (the element type), not any. The caller needs to know what type they will get back.

Constraints (T extends SomeType) limit what T can be, so you can safely access specific properties inside the function while still being flexible about what exact type is passed in.

When not to use generics: do not add a type parameter just because a function accepts multiple types. If the output type is always the same regardless of what was passed in, a union is simpler and clearer. For example, a function that accepts string | number and always returns string does not need generics.`,
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
    answer: `Mapped types loop over every key of an existing type and produce a new type from it. The syntax [K in keyof T] is the loop, and you can change the value type, add or remove modifiers, and rename keys.

Modifiers: use + or - before ? and readonly to add or remove them. For example, -? removes the optional marker from all properties (making them required), and -readonly makes all properties writable.

Key remapping: the as clause in [K in keyof T as NewKey] renames keys. Using as never removes a key from the result entirely. Combining this with template literal types lets you generate method names from an object's property names — for example, name → getName.

All built-in utility types like Partial, Required, Readonly, Pick, Omit, and Record are implemented using mapped types. Reading their definitions in lib.es5.d.ts is the best way to understand them at a deeper level.`,
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
    answer: `Conditional types use the syntax T extends U ? TrueType : FalseType. If T is assignable to U, the type resolves to TrueType. Otherwise it resolves to FalseType.

Distributivity: when T is a union type, the condition runs separately for each member. So if T is A | B, the result is (A extends U ? X : Y) | (B extends U ? X : Y). To prevent this and treat the union as one unit, wrap in brackets: [T] extends [U].

The infer keyword: inside a conditional type, infer lets you pull out and name a piece of the matched type. For example, T extends Promise<infer R> ? R : never extracts the type R from inside a Promise. This is exactly how built-in types like ReturnType, Parameters, Awaited, and InstanceType are written.

Conditional types let you compute types at compile time — extracting element types from arrays, return types from functions, instance types from classes, and more — without any runtime code.`,
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
    answer: `Template literal types use backtick syntax at the type level, the same way you write template strings in JavaScript. They let you build new string types by combining fixed strings with other types.

When a union type is embedded inside the template, TypeScript generates every possible combination and produces a union of all the resulting strings.

Built-in string helpers: Uppercase<S>, Lowercase<S>, Capitalize<S>, Uncapitalize<S>.

The most useful patterns combine template literal types with mapped types and key remapping (the as clause) to transform object shapes. For example, you can turn every property name into a corresponding getter method name — name becomes getName, age becomes getAge.

Template literal types also work with infer inside conditional types. This lets you parse string patterns at the type level — for example, extracting a route parameter from a string like ':userId'.`,
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
    answer: `A discriminated union is a union of object types where each one has a shared property (called a discriminant) with a unique literal value — for example, type: 'click' or kind: 'circle'. TypeScript uses this property to narrow the union to the specific variant when you check it in a switch or if statement.

This is a clean alternative to class inheritance when you need to handle multiple shapes of data. Because each variant is a plain object, it is easy to serialize (for example, to JSON), log, and test.

Exhaustiveness checking: in the default branch of a switch, assign the remaining value to a variable typed as never. If every union member has been handled, this works fine. If you add a new member to the union later without adding a case for it, TypeScript reports an error — because the new member cannot be assigned to never.

Common uses: Redux action types, API response shapes, state machine states, and AST nodes (the structure compilers use to represent code).`,
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
    answer: `A type annotation (const x: Type = value) checks that the value matches the type, but then broadens the type of x to Type. When you access a property later, TypeScript gives you the wider type, not the specific literal value you wrote.

The satisfies operator (value satisfies Type) also checks that the value matches the type. The difference is that it keeps TypeScript's precise inferred type. You get both validation and the exact types from the value you wrote.

A concrete example: if a property is typed as string | number[] in the target type but you write a number[] literal, a type annotation makes TypeScript treat it as string | number[] — so you cannot call .map without narrowing first. With satisfies, TypeScript knows it is a number[] and allows .map directly.

satisfies is especially useful for configuration objects and lookup tables where you want type safety but also need to use the specific inferred types of each property afterwards.`,
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
    answer: `Without strictNullChecks, null and undefined are silently accepted everywhere. A variable typed as string can hold null with no error, which means null-related bugs only show up at runtime.

With strictNullChecks (included in "strict": true), null and undefined become their own distinct types. A string variable cannot be null unless you explicitly write string | null. This forces all null and undefined paths to be visible and handled.

In practice: when a function returns string | null, the caller must check for null before using the value. TypeScript tracks this via control flow analysis — after if (x !== null), the type of x becomes just string in that branch.

Optional chaining (?.) and nullish coalescing (??) work well alongside strictNullChecks and make handling nullable values concise. For example, user?.address?.city ?? 'Unknown' safely handles a chain of possibly-null values in one expression.`,
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
    answer: `Utility types are generic helpers that TypeScript ships in its standard library. They handle the most common type transformations so you do not have to write them from scratch. They are built using mapped types and conditional types.

The most commonly used ones:
- Partial<T> — makes all properties optional (useful for update or patch payloads)
- Required<T> — makes all properties required (removes any optional markers)
- Readonly<T> — makes all properties read-only
- Record<K, V> — creates an object type where K is the set of keys and V is the value type
- Pick<T, K> — keeps only the listed properties from T
- Omit<T, K> — removes the listed properties from T
- Exclude<T, U> / Extract<T, U> — filter members in or out of a union type
- NonNullable<T> — removes null and undefined from a type
- ReturnType<T> / Parameters<T> — get the return type or parameter types of a function
- Awaited<T> — unwraps a Promise type all the way down, even if nested

Learning how they are implemented (a few lines each in lib.es5.d.ts) helps you understand mapped and conditional types and write your own transformations when needed.`,
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
    answer: `Function overloads let you declare multiple signatures for one function, where each signature describes a specific combination of argument types and the matching return type. Callers only see the overload signatures. The actual implementation is hidden from them.

Use overloads when the return type genuinely depends on what argument types were passed in, and a union return type would be too vague. For example, a function that returns string for every input does not need overloads. But a createElement function that returns HTMLAnchorElement specifically when passed 'a', or HTMLInputElement when passed 'input', does benefit from overloads — because without them, the caller just gets HTMLElement and loses the specific type.

How to write them: write two or more overload signatures first, then write one implementation signature that covers all cases using a union type. TypeScript checks the implementation against the broader combined signature.

Use overloads when callers genuinely benefit from getting a more specific return type based on what they passed in.`,
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
    answer: `Declaration merging happens when TypeScript sees multiple declarations with the same name in the same scope and combines them into one. The most practical case is interface merging: writing the same interface name twice produces a single type with all the properties from both declarations combined.

This is how you extend types from third-party libraries without editing their source:
- Module augmentation: write declare module 'library-name' { interface X { newProp: T } } to add properties to an existing type in that module
- Global augmentation: write declare global { interface Window { ... } } to extend global types like Window
- Namespace merging: a namespace with the same name as a function or class lets you attach extra properties to it

A key practical difference: interfaces merge, type aliases do not. Writing type Foo twice in the same scope is always a duplicate identifier error.

For module augmentation to work, the file must be a module file — meaning it has at least one top-level import or export. Without that, TypeScript treats all declarations as global, which changes the behaviour.`,
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
    answer: `TypeScript 5.0 adopted the TC39 Stage 3 decorator proposal. This replaced the older experimental decorators that required the experimentalDecorators flag.

Decorators are special functions prefixed with @ that can be placed on classes, class methods, class fields, getter/setter pairs (accessors), and auto-accessors (a new accessor keyword). Each type of decorator receives a context object that describes what is being decorated.

A decorator either modifies or replaces the value it is applied to. Method decorators wrap the original method. Field decorators return an initializer function that runs when the field is set up. Class decorators can transform or extend the class itself.

Key change from the old system: the new API does not depend on Reflect.metadata. Instead it uses context.metadata. To use the new decorators, do not set "experimentalDecorators": true (or remove it entirely) in tsconfig.json — the new behaviour is the default in TypeScript 5.`,
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
    answer: `Variance describes how the assignability of a generic type (like Container<T>) relates to the assignability of the type it wraps (T).

Covariant (same direction): if Dog extends Animal, then Container<Dog> also extends Container<Animal>. This applies to output positions — return types and read-only arrays. It is always safe to return a more specific type than required.

Contravariant (reversed direction): the relationship flips for input positions. If Dog extends Animal, then a function that accepts Animal can be used where a function that accepts Dog is expected — because it handles a broader set of values. Function parameters are contravariant.

Invariant (neither direction): a mutable container typed as Ref<T> (with both get and set) is invariant. Ref<Dog> is not assignable to Ref<Animal> because you could then set an Animal into it, which would break Dog-specific behaviour.

TypeScript's method parameters are historically bivariant (both directions allowed) for compatibility reasons. Function-typed properties use proper contravariance in strict mode. TypeScript 4.7 added in/out variance annotations so you can mark this explicitly, which also helps the compiler skip expensive variance calculations for complex generics.`,
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
    answer: `An index signature describes an object where the property names are not known ahead of time. The syntax [key: string]: ValueType tells TypeScript that any string key on this object maps to ValueType.

Use index signatures when you have a genuinely dynamic map — for example, a cache keyed by ID, a lookup table, or a dictionary where entries are added at runtime. If you know the set of keys in advance, use a specific object type or Record<'key1' | 'key2', ValueType> instead — it is more precise and easier to work with.

One constraint to know: if you use an index signature, every specific named property on the same interface must be assignable to the index signature's value type. So if the index says [key: string]: string, then every named property must also be a string.

For simple maps, prefer Record<K, V> — it is cleaner and K enforces the allowed keys. Use index signatures only when the keys can truly be any string or number.

TypeScript 4.4 added template literal index signatures, so something like [event: \`on\${string}\`]: Handler is valid and works as you would expect.`,
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
    answer: `TypeScript's built-in Readonly<T> and Partial<T> only work one level deep. Nested object properties are left mutable or required. To make every level of a nested structure read-only or optional, you need recursive versions built with mapped types and conditional types.

DeepReadonly<T>: loop over all keys and apply DeepReadonly again if the value is an object. Primitive types (string, number, boolean, etc.) pass through unchanged.

DeepPartial<T>: loop over all keys, mark them optional with ?, and recursively apply DeepPartial if the value is an object.

Things to be aware of: TypeScript has a limit on how deeply it will recurse when computing types. Very deeply nested structures can trigger a "Type instantiation is excessively deep" error. Functions, Maps, Sets, and arrays may need special handling if you want them treated differently from plain objects.

For production code, libraries like type-fest provide well-tested implementations that handle those edge cases correctly.`,
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
    answer: `Ambient declarations tell TypeScript about the types of things that exist at runtime but were not written in TypeScript. Common examples include JavaScript modules without types, global variables injected by a bundler, and polyfills added to the global scope.

.d.ts files (type declaration files) contain only type information — no runtime code. TypeScript automatically picks them up from node_modules/@types packages (which come from the DefinitelyTyped community project). You can also write them manually for untyped packages or to describe custom globals.

Common patterns:
- declare module 'module-name' { ... } — describes the shape of a plain JavaScript module
- declare const __DEV__: boolean — describes a global variable injected by a build tool
- declare global { ... } — adds type definitions to the global scope from inside a module file

Triple-slash directives (lines like /// <reference types="..." />) are an older way to include type dependencies. They have mostly been replaced by the types array in tsconfig.json, but are still used in some .d.ts files.

Writing a .d.ts file is how you add TypeScript support to an npm package that has no types, when @types/package-name does not exist.`,
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
    answer: `as const is a type assertion that tells TypeScript to use the most specific (narrowest) type possible for a value. Instead of widening 3000 to number, it keeps the literal type 3000. It also marks the entire structure as deeply read-only.

Without as const: const config = { port: 3000 } gives port the type number. TypeScript assumes you might change it later or pass it somewhere that accepts any number.

With as const: port becomes the literal type 3000, and the object is read-only throughout. TypeScript knows the exact value, which unlocks more precise type checking.

Common uses:
- Extracting a union of an object's values: (typeof COLORS)[keyof typeof COLORS] gives 'red' | 'green' | 'blue' instead of just string
- Enum-like constants without enums (simpler, no runtime object generated)
- Route or config definitions where the exact string or number values matter to the type system
- Tuple inference — without as const, [1, 'hello'] becomes (number | string)[] instead of the more useful readonly [1, 'hello']`,
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
    answer: `TypeScript applies two different checks when comparing an object to a type:

Structural compatibility check: used when assigning a variable to another typed variable. TypeScript only requires the object to have at least the properties the target type needs — extra properties are fine because the structural shape is satisfied.

Excess property check: applied when you write an object literal directly in place (as a function argument, in an assignment, or as a return value). Any property not listed in the target type is flagged as an error. This catches typos in property names before they cause silent bugs at runtime.

The excess check only applies to fresh object literals. If you assign the literal to a variable first and then pass that variable, the excess check is skipped — TypeScript only does the structural check. This is intentional, because the variable might be used in other places where the extra properties are valid.

This is why the exact same object can fail when written inline but pass when assigned through a variable first.`,
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
    answer: `Const type parameters (added in TypeScript 5.0) let a generic function automatically infer literal types from its arguments, without requiring callers to write as const every time.

Without const: identity<T>(value: T) called with ['a', 'b'] infers T as string[]. The array type is widened — TypeScript assumes the array might hold any string.

With const: identity<const T>(value: T) called with ['a', 'b'] infers T as readonly ['a', 'b']. TypeScript uses the narrowest possible type, the same as if the caller had written as const.

This is especially useful when building APIs where the exact values matter to the return type — for example, typed route definitions or query builders. Before this feature, callers had to write as const at every call site. Now the function signature itself communicates that intent.`,
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
    answer: `using declarations (TypeScript 5.2) implement the TC39 Explicit Resource Management proposal. They automatically call a cleanup method when a variable goes out of scope — similar to try/finally, but without the boilerplate.

For synchronous cleanup: a class implements [Symbol.dispose](): void. Declaring a variable with using x = ... makes TypeScript call x[Symbol.dispose]() automatically at the end of the block, even if an exception was thrown.

For asynchronous cleanup: a class implements [Symbol.asyncDispose](): Promise<void>. Using await using x = ... awaits the cleanup method automatically.

When multiple using declarations appear in the same block, they are disposed in reverse order — last declared, first cleaned up. This is the same order as stack unwinding, which ensures dependent resources are released safely.

The main benefit: you no longer need to remember to write a finally block to close a database connection, release a lock, or remove an event listener. The cleanup is guaranteed by the language.`,
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
    answer: `keyof T produces a union type of all the property names of T as string (or number or symbol) literal types. It is a building block for writing type-safe generic utilities.

Common uses:
1. Restrict a key parameter to only valid property names of an object: K extends keyof T
2. Index into an object at a generic key safely: obj[key] where key has type keyof T
3. Generate a union of valid keys, useful for runtime validation logic
4. Combined with typeof to get keys from a runtime object: keyof typeof someObject
5. Combined with indexed access to get a union of all value types: T[keyof T]

One detail to know: keyof (A | B) gives only the keys that exist in both A and B (the intersection of their key sets). keyof (A & B) gives all the keys from both (the union of their key sets).`,
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
