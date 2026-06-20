import type { SyntaxEntry } from '@/types/content';

const tsSyntax: SyntaxEntry[] = [
  {
    id: 'ts-type-annotations',
    title: 'Type Annotations',
    description: 'Add a type label to variables, function parameters, and return values using a colon after the name.',
    language: 'typescript',
    tags: ['types', 'annotations', 'basics'],
    tier: 'core',
    level: 'fresher',
    code: `// Variable annotations
let name: string = 'Alice';
let age: number = 30;
let active: boolean = true;
let data: unknown = fetch('/api'); // safe — must narrow before use

// Function annotations
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// void — function that returns nothing
function log(msg: string): void {
  console.log(msg);
}

// Inferred types — annotation optional when value is obvious
const x = 42;         // inferred: number
const y = [1, 2, 3];  // inferred: number[]`,
  },
  {
    id: 'ts-interfaces',
    title: 'Interfaces',
    description: 'A named definition that describes the required properties (and their types) an object or class must have.',
    language: 'typescript',
    tags: ['interfaces', 'objects', 'types'],
    tier: 'core',
    level: 'fresher',
    code: `interface User {
  id: number;
  name: string;
  email?: string;           // optional property
  readonly createdAt: Date; // cannot be reassigned after init
}

// Implementing an interface
interface Serializable {
  serialize(): string;
}

class Config implements Serializable {
  private data: Record<string, unknown> = {};
  serialize() { return JSON.stringify(this.data); }
}

// Extending interfaces
interface AdminUser extends User {
  permissions: string[];
}

// Index signature — dynamic keys
interface Dictionary {
  [key: string]: string;
}

// Call signature
interface Comparator<T> {
  (a: T, b: T): number;
}`,
  },
  {
    id: 'ts-type-aliases',
    title: 'Type Aliases',
    description: 'Give a reusable name to any type — including primitives, unions, object shapes, function signatures, and generics.',
    language: 'typescript',
    tags: ['type-alias', 'unions', 'types'],
    tier: 'core',
    level: 'fresher',
    code: `// Object type
type Point = { x: number; y: number };

// Union type
type ID = string | number;

// Intersection (combine shapes)
type Named = { name: string };
type Aged  = { age: number };
type Person = Named & Aged; // { name: string; age: number }

// Literal union — string "enum" without enum overhead
type Direction = 'north' | 'south' | 'east' | 'west';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Generic type alias
type Maybe<T> = T | null | undefined;
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

// Function type
type Predicate<T> = (value: T) => boolean;
const isEven: Predicate<number> = (n) => n % 2 === 0;`,
  },
  {
    id: 'ts-union-types',
    title: 'Union Types',
    description: 'A value that can be one of several types. Use type guards (like typeof or instanceof) to check which type you are dealing with before using it.',
    language: 'typescript',
    tags: ['union-types', 'type-narrowing'],
    tier: 'core',
    level: 'fresher',
    code: `type StringOrNumber = string | number;

function format(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase(); // value: string here
  }
  return value.toFixed(2);     // value: number here
}

// Literal unions — prefer over enums for simple cases
type Status = 'pending' | 'active' | 'inactive';
type Side   = 'top' | 'right' | 'bottom' | 'left';

// Nullable union
type MaybeString = string | null;
function upper(s: MaybeString): string {
  return s?.toUpperCase() ?? '';
}

// Width of a union — distributive utility types
type Strings   = Extract<string | number | boolean, string>; // string
type NonNulls  = NonNullable<string | null | undefined>;     // string`,
  },
  {
    id: 'ts-intersection-types',
    title: 'Intersection Types',
    description: 'Merge multiple types into one. The result must satisfy all of them, so it has every property from each combined type.',
    language: 'typescript',
    tags: ['intersection-types', 'composition'],
    tier: 'core',
    level: 'fresher',
    code: `type HasName = { name: string };
type HasAge  = { age: number };
type HasRole = { role: 'admin' | 'user' };

type AdminUser = HasName & HasAge & HasRole;
const admin: AdminUser = { name: 'Alice', age: 30, role: 'admin' };

// Mixin pattern
type Loggable     = { log(): void };
type Serializable = { serialize(): string };
type Service      = Loggable & Serializable;

// Common in React — extend HTML element props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary';
  loading?: boolean;
};`,
  },
  {
    id: 'ts-enums',
    title: 'Enums',
    description: 'A set of named constants (fixed values). String enums are preferred for readability. Use const enum to have TypeScript replace the name with its value during compilation, leaving no runtime object.',
    language: 'typescript',
    tags: ['enums', 'constants'],
    tier: 'core',
    level: 'fresher',
    code: `// Numeric enum (auto-incremented from 0)
enum Direction { Up, Down, Left, Right }
Direction.Up;   // 0

// String enum — explicit values, preferred for readability
enum Status {
  Pending  = 'PENDING',
  Active   = 'ACTIVE',
  Inactive = 'INACTIVE',
}

// const enum — inlined at compile time, no runtime object
const enum Color { Red = 'red', Green = 'green', Blue = 'blue' }

function move(dir: Direction) { /* ... */ }
move(Direction.Up); // Direction.Up, not 0

// Alternative: literal union (no runtime overhead, no reverse lookup)
type Role = 'admin' | 'user' | 'guest';`,
  },
  {
    id: 'ts-tuple-types',
    title: 'Tuple Types',
    description: 'An array with a fixed number of elements where each position has its own specific type.',
    language: 'typescript',
    tags: ['tuples', 'arrays'],
    tier: 'core',
    level: 'fresher',
    code: `// Basic tuple
type Pair = [number, number];
const p: Pair = [10, 20];

// Named elements (TypeScript 4.0+)
type Range = [start: number, end: number];

// Optional tail element
type WithOptional = [string, number?];

// Rest elements
type OneOrMore = [string, ...string[]];

// Destructuring
const [x, y]: Pair = [10, 20];
const [first, ...rest]: OneOrMore = ['a', 'b', 'c'];

// Common: useState-like return values
function useToggle(): [boolean, () => void] {
  let on = false;
  return [on, () => { on = !on; }];
}
const [isOpen, toggle] = useToggle();`,
  },
  {
    id: 'ts-type-assertions',
    title: 'Type Assertions & Non-null Assertion',
    description: 'Tell TypeScript to treat a value as a specific type when you know something the compiler does not. Use as rarely as possible — it bypasses type checking.',
    language: 'typescript',
    tags: ['type-assertions', 'as', 'non-null'],
    tier: 'core',
    level: 'fresher',
    code: `// as assertion — tell TS what type you know it to be
const el = document.getElementById('root') as HTMLDivElement;
const user = response.json() as User;

// Non-null assertion (!) — assert value is not null/undefined
const el2 = document.getElementById('root')!;
el2.style.color = 'red'; // no "possibly null" error

// as const — infer literal types instead of widened types
const config = { port: 3000, env: 'production' } as const;
// config.port: 3000  (literal, not number)
// config is readonly

// Double assertion — forced override, use rarely
const value = (getValue() as unknown) as SpecificType;

// Prefer type predicates over raw assertions
function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'name' in val;
}`,
  },
  {
    id: 'ts-generics',
    title: 'Generics',
    description: 'Write functions, interfaces, and classes that work with any type by using a type parameter (like T) as a placeholder. The actual type is filled in when the code is called or used.',
    language: 'typescript',
    tags: ['generics', 'type-parameters'],
    tier: 'core',
    level: 'experienced',
    code: `// Generic function
function identity<T>(value: T): T { return value; }
const n = identity(42);     // T inferred as number
const s = identity('hello'); // T inferred as string

// Generic interface
interface Box<T> {
  value: T;
  map<U>(fn: (v: T) => U): Box<U>;
}

// Generic class
class Stack<T> {
  #items: T[] = [];
  push(item: T): void       { this.#items.push(item); }
  pop(): T | undefined      { return this.#items.pop(); }
  peek(): T | undefined     { return this.#items.at(-1); }
  get size(): number        { return this.#items.length; }
}

// Multiple type parameters
function zip<T, U>(a: T[], b: U[]): [T, U][] {
  return a.map((item, i) => [item, b[i]]);
}
zip([1, 2], ['a', 'b']); // [[1,'a'], [2,'b']]`,
  },
  {
    id: 'ts-generic-constraints',
    title: 'Generic Constraints',
    description: 'Restrict what types are allowed for a type parameter using extends. This lets you safely access properties that are guaranteed to exist on the narrowed type.',
    language: 'typescript',
    tags: ['generics', 'constraints', 'extends'],
    tier: 'core',
    level: 'experienced',
    code: `// Constrain T to have a length property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest('hello', 'hi');      // string
longest([1, 2, 3], [1, 2]); // number[]
// longest(1, 2);            // Error — number has no length

// K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
getProperty({ name: 'Alice', age: 30 }, 'name'); // string

// Default type parameter
interface Container<T = string> {
  value: T;
}
const c1: Container       = { value: 'hello' }; // T = string (default)
const c2: Container<number> = { value: 42 };`,
  },
  {
    id: 'ts-keyof-typeof',
    title: 'keyof & typeof Operators',
    description: 'keyof gives you a union of all property names of a type. typeof gives you the type of any runtime value or variable.',
    language: 'typescript',
    tags: ['keyof', 'typeof', 'type-operators'],
    tier: 'core',
    level: 'experienced',
    code: `// keyof — union of object property names
type User = { id: number; name: string; email: string };
type UserKey = keyof User; // 'id' | 'name' | 'email'

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, k) => ({ ...acc, [k]: obj[k] }), {} as Pick<T, K>);
}

// typeof — get the type of a variable
const config = { port: 3000, host: 'localhost', debug: false };
type Config = typeof config; // { port: number; host: string; debug: boolean }

// typeof on a function
function fetchUser(id: string) { return { id, name: '' }; }
type FetchReturn = ReturnType<typeof fetchUser>; // { id: string; name: string }

// Combine keyof + typeof to extract value union
const ROUTES = { home: '/', about: '/about', contact: '/contact' } as const;
type Route = (typeof ROUTES)[keyof typeof ROUTES]; // '/' | '/about' | '/contact'`,
  },
  {
    id: 'ts-indexed-access',
    title: 'Indexed Access Types',
    description: 'Look up the type of a specific property on another type using bracket notation (T[K]). Works on nested types too.',
    language: 'typescript',
    tags: ['indexed-access', 'type-operators'],
    tier: 'advanced',
    level: 'experienced',
    code: `type User = { id: number; address: { city: string; zip: string } };

type UserID  = User['id'];              // number
type Address = User['address'];         // { city: string; zip: string }
type City    = User['address']['city']; // string

// Union of keys
type IdOrName = User['id' | 'name'];    // would Error — use keyof for dynamic

// Array element type
type FruitItem = string[][number];      // string (any array index)

// Tuple element types
type Tuple = [string, number, boolean];
type First      = Tuple[0];             // string
type AnyElement = Tuple[number];        // string | number | boolean

// Extract element type from a const array
const routes = [
  { path: '/', component: 'Home' },
] as const;
type RouteItem = (typeof routes)[number];
// { readonly path: '/'; readonly component: 'Home' }`,
  },
  {
    id: 'ts-utility-types-object',
    title: 'Utility Types: Object Transformation',
    description: 'Partial, Required, Readonly, Record, Pick, and Omit — built-in helpers that transform object types so you do not have to rewrite them from scratch.',
    language: 'typescript',
    tags: ['utility-types', 'partial', 'pick', 'omit', 'record'],
    tier: 'core',
    level: 'experienced',
    code: `type User = { id: number; name: string; email: string; role: 'admin' | 'user' };

// Partial — all properties optional (useful for PATCH payloads)
type UpdateUser = Partial<User>;

// Required — remove all ? modifiers
type RequiredUser = Required<Partial<User>>;

// Readonly — prevent reassignment
const user: Readonly<User> = { id: 1, name: 'Alice', email: '', role: 'user' };
// user.name = 'Bob'; // Error

// Record — object type from key union + value type
type RolePerms = Record<'admin' | 'user', string[]>;
const perms: RolePerms = { admin: ['read', 'write'], user: ['read'] };

// Pick — select a subset of properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit — exclude properties
type PublicUser = Omit<User, 'email' | 'role'>;`,
  },
  {
    id: 'ts-utility-types-function',
    title: 'Utility Types: Unions & Functions',
    description: 'Built-in helpers for working with union types and function types: Exclude, Extract, NonNullable, ReturnType, Parameters, and Awaited.',
    language: 'typescript',
    tags: ['utility-types', 'exclude', 'extract', 'returntype', 'awaited'],
    tier: 'advanced',
    level: 'experienced',
    code: `// Exclude — remove members from a union
type A = Exclude<'a' | 'b' | 'c', 'a' | 'c'>; // 'b'

// Extract — keep matching members
type B = Extract<string | number | boolean, number | boolean>; // number | boolean

// NonNullable — remove null and undefined
type C = NonNullable<string | null | undefined>; // string

// ReturnType / Parameters — introspect functions
type Fn = (a: string, b: number) => boolean;
type P  = Parameters<Fn>; // [a: string, b: number]
type R  = ReturnType<Fn>;  // boolean

// Awaited — unwrap Promise recursively
type D = Awaited<Promise<string>>;            // string
type E = Awaited<Promise<Promise<number>>>;   // number

async function fetchData(): Promise<{ id: number }> { /* ... */ }
type Data = Awaited<ReturnType<typeof fetchData>>; // { id: number }`,
  },
  {
    id: 'ts-type-guards',
    title: 'Type Guards',
    description: 'Checks that tell TypeScript which specific type a value is at a given point in the code. You can use built-in checks like typeof and instanceof, or write your own.',
    language: 'typescript',
    tags: ['type-guards', 'narrowing', 'typeof', 'instanceof'],
    tier: 'core',
    level: 'experienced',
    code: `// typeof guard
function process(val: string | number) {
  if (typeof val === 'string') val.toUpperCase(); // string
  else val.toFixed(2);                            // number
}

// instanceof guard
function handle(err: unknown) {
  if (err instanceof TypeError)  console.error('Type error:', err.message);
  else if (err instanceof Error) console.error('Error:', err.message);
  else console.error('Unknown:', err);
}

// in guard
type Cat = { meow(): void };
type Dog = { bark(): void };
function sound(pet: Cat | Dog) {
  if ('meow' in pet) pet.meow(); // Cat
  else               pet.bark(); // Dog
}

// User-defined type predicate
function isUser(val: unknown): val is User {
  return (
    typeof val === 'object' &&
    val !== null &&
    typeof (val as User).name === 'string'
  );
}
const values: unknown[] = getValues();
const users = values.filter(isUser); // User[]`,
  },
  {
    id: 'ts-discriminated-unions',
    title: 'Discriminated Unions',
    description: 'A union of object types that each share a common property (like kind or type) with a unique string value. TypeScript uses that property to figure out which specific variant you are working with.',
    language: 'typescript',
    tags: ['discriminated-unions', 'pattern', 'exhaustiveness'],
    tier: 'advanced',
    level: 'experienced',
    code: `type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error';   message: string; code: number }
  | { status: 'loading' };

function render<T>(result: Result<T>): string {
  switch (result.status) {
    case 'success': return \`Data: \${JSON.stringify(result.data)}\`;
    case 'error':   return \`Error \${result.code}: \${result.message}\`;
    case 'loading': return 'Loading...';
    default: {
      const _exhaustive: never = result; // compile error if new status added
      return _exhaustive;
    }
  }
}`,
  },
  {
    id: 'ts-mapped-types',
    title: 'Mapped Types',
    description: 'Loop over every property in a type and produce a new type from it. This is how all built-in utility types like Partial and Readonly are built.',
    language: 'typescript',
    tags: ['mapped-types', 'type-manipulation'],
    tier: 'advanced',
    level: 'experienced',
    code: `// Add optional modifier (+?)
type Partial<T> = { [K in keyof T]?: T[K] };

// Remove optional modifier (-?)
type Required<T> = { [K in keyof T]-?: T[K] };

// Add readonly
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Remove readonly
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// Key remapping with as
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }

// Filter keys by value type (as never removes a key)
type PickByValue<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
type StringProps = PickByValue<{ a: string; b: number; c: string }, string>;
// { a: string; c: string }`,
  },
  {
    id: 'ts-conditional-types',
    title: 'Conditional Types',
    description: 'Choose between two types based on a condition using T extends U ? A : B. When T is a union, the condition is applied to each member separately.',
    language: 'typescript',
    tags: ['conditional-types', 'infer', 'type-manipulation'],
    tier: 'advanced',
    level: 'experienced',
    code: `// Basic conditional
type IsString<T> = T extends string ? true : false;
type A = IsString<string>;        // true
type B = IsString<number>;        // false

// Distributive over unions
type C = IsString<string | number>; // true | false

// Non-distributive (bracketed)
type IsStringExact<T> = [T] extends [string] ? true : false;
type D = IsStringExact<string | number>; // false

// infer — extract a type from a position
type Unwrap<T> = T extends Promise<infer R> ? R : T;
type E = Unwrap<Promise<string>>; // string
type F = Unwrap<number>;          // number

// Flatten arrays one level
type Flatten<T> = T extends (infer E)[] ? E : T;
type G = Flatten<string[]>; // string`,
  },
  {
    id: 'ts-infer',
    title: 'The infer Keyword',
    description: 'Pull out and name a piece of a type inside a conditional type. Used to extract things like the return type of a function or the value type inside a Promise.',
    language: 'typescript',
    tags: ['infer', 'conditional-types', 'type-manipulation'],
    tier: 'advanced',
    level: 'expert',
    code: `// Extract return type (like ReturnType<T>)
type MyReturnType<T> =
  T extends (...args: any[]) => infer R ? R : never;
type R = MyReturnType<(n: number) => boolean>; // boolean

// Extract parameter types
type Params<T> =
  T extends (...args: infer P) => unknown ? P : never;
type P = Params<(a: string, b: number) => void>; // [string, number]

// Unwrap a Promise
type Await<T> = T extends Promise<infer V> ? V : T;

// Extract both key and value from Map
type UnpackMap<T> =
  T extends Map<infer K, infer V> ? { key: K; value: V } : never;
type KV = UnpackMap<Map<string, number>>; // { key: string; value: number }

// Get constructor instance type
type NewableReturn<T> =
  T extends new (...args: any[]) => infer I ? I : never;`,
  },
  {
    id: 'ts-template-literal-types',
    title: 'Template Literal Types',
    description: 'Build new string literal types by combining strings and other types using backtick syntax, the same way you write template strings in JavaScript.',
    language: 'typescript',
    tags: ['template-literal-types', 'string-manipulation'],
    tier: 'advanced',
    level: 'experienced',
    since: 'TS 4.1',
    code: `type Direction = 'top' | 'right' | 'bottom' | 'left';
type CSSMargin = \`margin-\${Direction}\`;
// 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left'

// Built-in string manipulation types
type Upper  = Uppercase<'hello'>;  // 'HELLO'
type Cap    = Capitalize<'world'>; // 'World'

// Event handler map from shape
type EventHandlers<T extends string> = {
  [K in T as \`on\${Capitalize<K>}\`]: (e: Event) => void;
};
type ClickFocusBlur = EventHandlers<'click' | 'focus' | 'blur'>;
// { onClick: ..., onFocus: ..., onBlur: ... }

// Strongly typed column ordering
type Column  = 'name' | 'age' | 'email';
type OrderBy = \`\${Column} ASC\` | \`\${Column} DESC\`;

// Extract from template with infer
type ExtractId<T extends string> =
  T extends \`\${string}_\${infer ID}\` ? ID : never;
type Id = ExtractId<'user_abc123'>; // 'abc123'`,
  },
  {
    id: 'ts-class-modifiers',
    title: 'Class Modifiers',
    description: 'TypeScript adds keywords to classes that control visibility (public, protected, private), prevent reassignment (readonly), require subclasses to implement a method (abstract), and confirm a method overrides a parent method (override).',
    language: 'typescript',
    tags: ['classes', 'modifiers', 'oop'],
    tier: 'core',
    level: 'experienced',
    code: `class Animal {
  readonly name: string;         // cannot be reassigned after init
  public  species: string = '';  // visible everywhere (default)
  protected age: number = 0;     // accessible in subclasses
  #secret: string = '';          // truly private (JS private field)

  constructor(name: string) { this.name = name; }
}

class Dog extends Animal {
  override speak(): void {       // 'override' asserts this overrides a base method
    console.log(\`\${this.name} barks!\`);
  }
  birthday() { this.age++; }    // OK — protected accessible here
}

// Parameter properties — shorthand: declare + assign in one step
class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}
}
// equivalent to: class Point { readonly x; readonly y; constructor(x,y) {...} }`,
  },
  {
    id: 'ts-abstract-classes',
    title: 'Abstract Classes',
    description: 'A class that acts as a template for other classes. It can define methods that every subclass must provide, but you cannot create an instance of the abstract class itself.',
    language: 'typescript',
    tags: ['classes', 'abstract', 'oop'],
    tier: 'advanced',
    level: 'experienced',
    code: `abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;

  describe(): string { // concrete method on abstract class
    return \`Area: \${this.area().toFixed(2)}, P: \${this.perimeter().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(private r: number) { super(); }
  area()      { return Math.PI * this.r ** 2; }
  perimeter() { return 2 * Math.PI * this.r; }
}

class Rectangle extends Shape {
  constructor(private w: number, private h: number) { super(); }
  area()      { return this.w * this.h; }
  perimeter() { return 2 * (this.w + this.h); }
}

// new Shape(); // Error — cannot instantiate abstract class
const shapes: Shape[] = [new Circle(5), new Rectangle(3, 4)];
shapes.forEach(s => console.log(s.describe()));`,
  },
  {
    id: 'ts-function-overloads',
    title: 'Function Overloads',
    description: 'Write multiple signatures for the same function so TypeScript knows exactly what return type to expect based on what argument types you pass in.',
    language: 'typescript',
    tags: ['overloads', 'functions', 'polymorphism'],
    tier: 'advanced',
    level: 'experienced',
    code: `// Overload signatures — these are what callers see
function format(value: string): string;
function format(value: number, decimals?: number): string;
function format(value: Date): string;

// Implementation signature — not visible to callers
function format(value: string | number | Date, decimals = 2): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return value.toFixed(decimals);
  return value.toISOString();
}

format('  hello  ');  // string overload
format(3.14, 2);      // number overload
format(new Date());   // Date overload

// Method overloads on classes
class EventBus {
  on(event: 'data',  fn: (data: Buffer) => void): this;
  on(event: 'end',   fn: () => void): this;
  on(event: 'error', fn: (e: Error) => void): this;
  on(event: string,  fn: (...args: any[]) => void): this {
    return this;
  }
}`,
  },
  {
    id: 'ts-as-const',
    title: 'as const',
    description: 'Tell TypeScript to lock a value to its exact literal type (like 3000 instead of number) and treat the entire structure as read-only.',
    language: 'typescript',
    tags: ['as-const', 'literal-types', 'readonly'],
    tier: 'core',
    level: 'experienced',
    code: `// Without as const — types are widened
const config1 = { port: 3000, env: 'production' };
// config1.port: number  (not 3000)
// config1.env: string   (not 'production')

// With as const — literal types preserved, object readonly
const config2 = { port: 3000, env: 'production' } as const;
// config2.port: 3000          (literal)
// config2.env: 'production'   (literal)
// config2 is Readonly<...>

// Arrays — inferred as readonly tuple
const tuple = [1, 'hello', true] as const;
// readonly [1, 'hello', true]

// Extract a value union from a const object
const STATUS = {
  Pending:  'pending',
  Active:   'active',
  Inactive: 'inactive',
} as const;
type Status = (typeof STATUS)[keyof typeof STATUS];
// 'pending' | 'active' | 'inactive'`,
  },
  {
    id: 'ts-satisfies',
    title: 'satisfies Operator',
    description: 'Check that a value matches a type, but keep TypeScript\'s precise inferred type rather than broadening it to the target type.',
    language: 'typescript',
    tags: ['satisfies', 'type-validation'],
    tier: 'advanced',
    level: 'experienced',
    since: 'TS 4.9',
    code: `type Config = { host: string; port: number; debug?: boolean };

// as Config — validates but widens to Config
const c1: Config = { host: 'localhost', port: 3000 };
// c1.port: number — literal 3000 is lost

// satisfies — validates shape, preserves inferred type
const c2 = { host: 'localhost', port: 3000 } satisfies Config;
// c2.port: 3000  (literal — not widened)
// c2.host: 'localhost' (literal)

// Mixed-value objects
type Palette = Record<string, string | number[]>;
const palette = {
  red:   [255, 0, 0],
  green: '#00ff00',
} satisfies Palette;

// palette.red is number[], not string | number[]
palette.red.map(c => c / 255); // OK`,
  },
  {
    id: 'ts-index-signatures',
    title: 'Index Signatures',
    description: 'Describe objects where the property names are not known ahead of time — any string or number key maps to a specific value type.',
    language: 'typescript',
    tags: ['index-signatures', 'dynamic-keys'],
    tier: 'core',
    level: 'experienced',
    code: `// Basic index signature
interface StringMap {
  [key: string]: string;
}
const map: StringMap = {};
map.anyKey = 'value'; // OK

// Mix of specific and indexed properties
// (specific properties must satisfy the index signature type)
interface Config {
  version: string;        // must be string to match index type
  [key: string]: string;
}

// Number index
interface ArrayLike {
  [index: number]: string;
  length: number;
}

// Template literal index signature (TS 4.4)
interface EventHandlers {
  [event: \`on\${string}\`]: (...args: unknown[]) => void;
}

// Prefer Record<K, V> for simple homogeneous maps
type Cache = Record<string, { value: unknown; expiresAt: number }>;`,
  },
  {
    id: 'ts-using-declarations',
    title: 'using & await using',
    description: 'Automatically run cleanup code (like closing a database connection) when a variable goes out of scope, without needing a try/finally block.',
    language: 'typescript',
    tags: ['using', 'disposable', 'resource-management'],
    tier: 'advanced',
    level: 'experienced',
    since: 'TS 5.2',
    code: `// Implement Disposable
class DatabaseConnection implements Disposable {
  constructor() { console.log('Connected'); }
  query(sql: string) { /* ... */ }
  [Symbol.dispose]() { console.log('Closed'); }
}

// using — auto-disposed at block exit
function runQuery() {
  using db = new DatabaseConnection();
  return db.query('SELECT * FROM users');
} // db[Symbol.dispose]() called here

// AsyncDisposable
class FileHandle implements AsyncDisposable {
  async [Symbol.asyncDispose]() {
    await this.flush();
    await this.close();
  }
}

async function processFile() {
  await using file = openFile('./data.csv');
  return file.read();
} // file[Symbol.asyncDispose]() awaited here`,
  },
  {
    id: 'ts-declaration-merging',
    title: 'Module Augmentation & Declaration Merging',
    description: 'Add new properties to existing types from third-party libraries, or extend global objects like Window, without changing the library\'s source code.',
    language: 'typescript',
    tags: ['declaration-merging', 'module-augmentation', 'ambient'],
    tier: 'advanced',
    level: 'expert',
    code: `// Augment Express Request
import 'express';
declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; role: 'admin' | 'user' };
    requestId: string;
  }
}
// req.user is now typed in all route handlers

// Interface merging — extend an existing interface
interface Window {
  analytics: { track(event: string, data?: object): void };
}
window.analytics.track('pageview'); // typed

// Global augmentation inside a module file
declare global {
  interface Array<T> {
    groupBy<K extends PropertyKey>(fn: (item: T) => K): Record<K, T[]>;
  }
}

// Ambient declarations (.d.ts or declare blocks)
declare const __DEV__: boolean; // injected by bundler
declare module '*.svg' { const url: string; export default url; }`,
  },
  {
    id: 'ts-decorators',
    title: 'Decorators (TC39 Stage 3)',
    description: 'Special annotations (prefixed with @) that wrap or modify classes, methods, and fields — letting you add behaviour like logging or validation without changing the original code.',
    language: 'typescript',
    tags: ['decorators', 'metadata', 'classes'],
    tier: 'advanced',
    level: 'experienced',
    since: 'TS 5.0',
    code: `// Method decorator — wrap with timing
function timed(target: unknown, ctx: ClassMethodDecoratorContext) {
  return function (this: unknown, ...args: unknown[]) {
    const t = performance.now();
    const result = (target as Function).apply(this, args);
    console.log(\`\${String(ctx.name)}: \${(performance.now() - t).toFixed(1)}ms\`);
    return result;
  };
}

// Field decorator — validate on assignment
function positive(_: unknown, ctx: ClassFieldDecoratorContext) {
  return (value: number) => {
    if (value < 0) throw new RangeError(\`\${String(ctx.name)} must be positive\`);
    return value;
  };
}

class Counter {
  @positive count = 0;

  @timed
  increment() { this.count++; }
}`,
  },
  {
    id: 'ts-const-type-params',
    title: 'const Type Parameters',
    description: 'Make a generic function automatically infer precise literal types from its arguments, so callers do not have to write as const every time.',
    language: 'typescript',
    tags: ['generics', 'const', 'literal-types'],
    tier: 'advanced',
    level: 'experienced',
    since: 'TS 5.0',
    code: `// Without const — infers widened type
function identity<T>(value: T): T { return value; }
const a = identity(['a', 'b']); // string[] — not ideal

// With const modifier — infers literal/readonly type
function identity<const T>(value: T): T { return value; }
const b = identity(['a', 'b']); // readonly ['a', 'b']

// Practical: route definitions with literal path types
function defineRoutes<const T extends readonly { path: string }[]>(
  routes: T,
): T { return routes; }

const routes = defineRoutes([
  { path: '/',       component: 'Home' },
  { path: '/about',  component: 'About' },
]);
// routes[0].path: '/'  — literal, not just string`,
  },
  {
    id: 'ts-recursive-types',
    title: 'Recursive Types',
    description: 'Types that include themselves as part of their definition. Useful for describing tree-like structures, JSON data, or anything with unlimited nesting.',
    language: 'typescript',
    tags: ['recursive', 'types', 'json'],
    tier: 'advanced',
    level: 'experienced',
    code: `// JSON value type
type JSONValue =
  | null | boolean | number | string
  | JSONValue[]
  | { [key: string]: JSONValue };

// Tree node
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

// Deep Partial — optional at every nesting level
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// Deep Readonly — readonly at every nesting level
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Config = { db: { host: string; port: number }; debug: boolean };
type ImmutableConfig = DeepReadonly<Config>;
// config.db.host is readonly — nested too`,
  },
  {
    id: 'ts-noinfer',
    title: 'NoInfer Utility Type',
    description: 'Stop TypeScript from using a particular argument when deciding what a type parameter should be. Only the other arguments drive the inference.',
    language: 'typescript',
    tags: ['utility-types', 'generics', 'inference'],
    tier: 'advanced',
    level: 'expert',
    since: 'TS 5.4',
    code: `// Without NoInfer — both arguments influence T inference
function createStore<T>(initial: T, defaultState: T): T { return initial; }
// If initial: { count: 0 } and default: { count: 0, extra: '' }
// T widens to { count: number; extra: string } — may be unintended

// With NoInfer — only 'initial' drives T; defaultState must match
function createStore<T>(initial: T, defaultState: NoInfer<T>): T {
  return initial ?? defaultState;
}

createStore({ count: 0 }, { count: 0 });               // OK
// createStore({ count: 0 }, { count: 0, extra: '' }); // Error — extra not in T

// Default fallback that shouldn't widen the inferred type
function withDefault<T>(value: T | undefined, fallback: NoInfer<T>): T {
  return value ?? fallback;
}
const n = withDefault<number>(undefined, 0); // fallback must be number`,
  },
  {
    id: 'ts-type-predicates',
    title: 'Type Predicates & Assertion Functions',
    description: 'Functions that tell TypeScript what type a value is after a check — so the calling code benefits from a narrower type without extra casts.',
    language: 'typescript',
    tags: ['type-predicates', 'assertion-functions', 'narrowing'],
    tier: 'advanced',
    level: 'experienced',
    code: `// Type predicate — val is Type in the true branch
function isString(val: unknown): val is string {
  return typeof val === 'string';
}

function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'id' in val;
}

// filter retains the narrowed element type
const values: unknown[] = getValues();
const users = values.filter(isUser); // User[]

// Assertion function — throws if condition fails, narrows for caller
function assertDefined<T>(
  val: T | null | undefined,
  msg = 'Expected defined value',
): asserts val is T {
  if (val == null) throw new Error(msg);
}

let maybeUser: User | null = getUser();
assertDefined(maybeUser, 'User not found');
maybeUser.name; // User — not User | null`,
  },
];

export default tsSyntax;
