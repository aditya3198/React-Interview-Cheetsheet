import type { ConceptCard } from '@/types/content';

const reactTheory: ConceptCard[] = [
  {
    id: 'virtual-dom',
    title: 'Virtual DOM & Reconciliation',
    summary: 'React keeps a lightweight copy of the page structure in memory and uses it to figure out the smallest number of real DOM changes needed.',
    body: `The virtual DOM (VDOM) is a plain JavaScript object that describes what the real DOM should look like. When state changes, React builds a new VDOM and compares it to the previous one. This comparison process is called reconciliation (or diffing).

The comparison follows two rules: (1) if the element type changes (e.g. a div becomes a span), React throws away the old tree and builds a new one; (2) if the element has a stable key, React reuses the existing DOM node instead of replacing it. This lets React figure out the smallest set of real DOM changes needed, then applies them all at once.

React 18 adds automatic batching — when you call setState multiple times in a row (even inside a setTimeout or Promise), React groups them into a single re-render instead of running one per call. The virtual DOM adds some overhead for very simple pages, but it significantly cuts down on expensive real DOM work for complex, frequently-updating UIs.`,
    diagram: {
      type: 'ascii',
      content: `State change
     ↓
New VDOM tree
     ↓
Diff (reconcile) with previous VDOM
     ↓
Minimal DOM patches
     ↓
Real DOM update (one flush)`,
    },
    tags: ['virtual-dom', 'reconciliation', 'diffing', 'performance'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'keys-list-rendering',
    title: 'Keys & List Rendering',
    summary: 'Keys tell React which list items are which across re-renders, so it only updates the items that actually changed.',
    body: `When you render a list, React needs to track each item across renders to know what changed, what was added, and what was removed. A key is a unique identifier you give each item so React does not have to guess.

Without keys, React rebuilds the list from the point of the first change onward. With stable keys (usually IDs from your data), React can reuse the existing DOM nodes for items that did not change, and only create or remove what actually changed.

A common mistake is using the array index as the key. This breaks when items are reordered or inserted because the index shifts — React thinks items changed when they did not, causing unnecessary re-renders or even incorrect UI. Always use a stable, unique ID from your data instead. Keys only need to be unique among their siblings, not across the whole page.`,
    diagram: {
      type: 'ascii',
      content: `// Bad: index as key
['A', 'B', 'C'].map((item, i) => <li key={i}>{item}</li>)
// After prepending 'X': [0:'X', 1:'A', 2:'B', 3:'C']
// React sees key=0 changed value — re-renders all

// Good: stable ID
items.map(item => <li key={item.id}>{item.name}</li>)
// React matches by ID — only new item is created`,
    },
    tags: ['keys', 'lists', 'reconciliation', 'performance'],
    tier: 'core',
    level: 'fresher',
  },
  {
    id: 'component-lifecycle',
    title: 'Component Lifecycle (Functional)',
    summary: 'Function components go through three stages: appearing on the page (mount), reacting to changes (update), and being removed (unmount) — all handled through useEffect.',
    body: `In function components, useEffect covers all three lifecycle stages:

Mount (equivalent to componentDidMount in class components): pass an empty array [] as the second argument. The effect runs once after the component first appears on the page.

Update (equivalent to componentDidUpdate): pass specific values in the array. The effect re-runs after any render where one of those values changed. If you omit the array entirely, the effect re-runs after every render.

Unmount (equivalent to componentWillUnmount): return a function from the effect. React calls this cleanup function before the component is removed from the page, and also before the effect runs again when dependencies change.

React 18 StrictMode (a development-only tool) runs effects twice on purpose to catch bugs caused by missing cleanup. If your effect breaks when run twice, that means you have a real cleanup problem to fix.`,
    diagram: {
      type: 'ascii',
      content: `useEffect(() => {
  // 1. MOUNT — effect runs
  const sub = subscribe(id);

  return () => {
    // 2. CLEANUP — before next effect or unmount
    sub.unsubscribe();
  };
}, [id]); // 3. UPDATE — re-runs when id changes`,
    },
    tags: ['lifecycle', 'useEffect', 'mount', 'unmount', 'cleanup'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'controlled-vs-uncontrolled',
    title: 'Controlled vs Uncontrolled Inputs',
    summary: 'Controlled inputs get their value from React state; uncontrolled inputs let the browser\'s DOM manage the value on its own.',
    body: `A controlled input has its value set by React state. Every time the user types, onChange fires, setState updates the value, and React re-renders the input with the new value. React is in charge. This lets you validate, format, or transform the input as the user types.

An uncontrolled input stores its value in the DOM itself. You access it with a ref (ref.current.value) — usually only when the user submits the form. This means less code and fewer re-renders, and it is easier to mix with non-React libraries.

React 19 adds a third option: server actions with <form action={serverAction}>. The form handles its own submission state through useActionState, which combines some of the best parts of both approaches.`,
    diagram: {
      type: 'ascii',
      content: `Controlled:
User types → onChange → setState → re-render → input value set by React

Uncontrolled:
User types → DOM stores value → ref.current.value on submit`,
    },
    tags: ['controlled', 'uncontrolled', 'forms', 'inputs', 'useRef'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'context-vs-prop-drilling',
    title: 'Context vs Prop Drilling',
    summary: 'Prop drilling means passing data down through many component layers; Context lets any component in the tree read the data directly without passing it through every level.',
    body: `Prop drilling happens when you need to pass data through several components that do not actually use it — they just pass it along to a child that does. For shallow trees (two or three levels), prop drilling is fine. It makes data flow easy to follow and keeps components independent.

Context solves deep drilling. You wrap part of your component tree in a Provider, give it a value, and any component inside that tree can read the value directly with useContext. No manual passing required. The downside is that every component reading the context re-renders whenever the context value changes, even if the part of the value it uses did not change.

For data that changes often, this can cause too many re-renders. Common fixes: split your contexts by concern (one ThemeContext, one UserContext) so a theme change does not re-render components that only care about the user, memoize the context value, or use a library like Zustand that lets components subscribe only to the specific data they need.`,
    tags: ['context', 'prop-drilling', 'state', 'performance'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'when-react-renders',
    title: 'When Does React Render?',
    summary: 'React re-runs your component function when its state changes, its parent re-renders, or its context value changes. Knowing this helps you avoid unnecessary work.',
    body: `React re-renders a component (calls your function again) in these situations:

1. State change: you call a state setter. React schedules a re-render for that component and all its child components.
2. Parent re-renders: if the parent component re-renders, every child re-renders too — even if their props did not change. This is the most common cause of renders you did not expect.
3. Context change: any component that reads from a context will re-render when the context value changes.
4. Force update (rare): calling forceUpdate() in older class-based components.

Re-rendering does not mean the DOM gets updated. React first runs your component function to produce a new description of the UI, then compares it to the previous one (diffing). The DOM is only touched if something actually changed.

memo() (short for memoize, meaning "remember the result") prevents re-renders caused by a parent re-rendering, as long as the component's props have not changed. It uses a shallow comparison (checking top-level values only). It does not prevent re-renders caused by state changes inside the component or context changes.`,
    diagram: {
      type: 'ascii',
      content: `Triggers for render:
setState / dispatch → component + descendants
Parent renders     → all children (unless memo'd)
Context change     → all consumers

memo optimization:
Parent renders → children checked by memo:
  props same?  → bail out (no render)
  props differ → render

render vs DOM update:
render     → component function called, virtual DOM produced
DOM update → only if virtual DOM diff found changes`,
    },
    tags: ['rendering', 'performance', 'memo', 're-renders', 'optimization'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'state-colocation-principle',
    title: 'State Colocation Principle',
    summary: 'Put state in the component that needs it. Only move it up the tree when another component also needs it.',
    body: `State colocation means keeping state as close as possible to the component that uses it. Only move state higher up the tree when you have a specific reason to.

Putting too much state at the top level (over-lifting) causes problems: components that do not care about the state still re-render when it changes, logic becomes harder to follow, and testing gets more complicated.

A simple rule for deciding where state lives:
1. Only one component uses it — keep it as local state in that component.
2. Two sibling components need it — move it up to their closest shared parent.
3. Many components at different levels need it — use Context or a global store like Zustand.
4. It comes from the server (API data) — use React Query or SWR, which handle caching and refetching for you.

Defaulting to a global store for everything is an anti-pattern (a common mistake with a better solution). It makes every component dependent on a central store, which makes refactoring and testing much harder than they need to be.`,
    diagram: {
      type: 'ascii',
      content: `// Over-lifted — everything in App, causes wide re-renders
App (isDropdownOpen)
 └─ Header
     └─ Nav
         └─ Dropdown ← only user of isDropdownOpen!

// Co-located — state lives where it's used
App
 └─ Header
     └─ Nav
         └─ Dropdown (isOpen local state) ← correct

// Lift only when siblings need to share
App
 └─ SearchBar (updates query)  ← siblings share
 └─ Results   (reads query)
  ↑ query state lifted to App`,
    },
    tags: ['state', 'colocation', 'lifting-state', 'architecture', 'performance'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'composition-vs-inheritance',
    title: 'Composition Over Inheritance',
    summary: 'React builds UIs by combining small components together (composition), not by having components inherit behavior from a base class (inheritance).',
    body: `React is built around composition. Instead of extending a base class to add behavior, you build new components by combining smaller ones. The simplest example is the children prop: a wrapper component renders whatever its parent passes into it. Other patterns like render props and higher-order components (HOCs) do similar things, but hooks have largely replaced them.

For creating specialized components, composition is the right approach. A WelcomeDialog should be a Dialog that receives specific props — not a class that extends Dialog.

Hooks completed this picture. Stateful logic can now be pulled into custom hooks and shared across components without wrapping them in extra HOC layers. This makes the logic easier to test and easier to reason about.`,
    diagram: {
      type: 'ascii',
      content: `// Inheritance approach (discouraged in React)
class Button extends BaseButton { ... }

// Composition approach (React way)
function Button({ variant = 'primary', ...props }) {
  return <BaseButton className={variants[variant]} {...props} />;
}

// Shared logic via custom hook
function useHoverState() { ... }
function useFocusState() { ... }
function ButtonWithHover() {
  const hovered = useHoverState();
  return <button className={hovered ? 'hovered' : ''} />;
}`,
    },
    tags: ['composition', 'inheritance', 'hooks', 'patterns'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'hooks-lifecycle-mapping',
    title: 'Hooks ↔ Lifecycle Method Mapping',
    summary: 'Every class component lifecycle method has a hook equivalent in function components — and hooks let you share that logic across components more easily.',
    body: `If you have worked with class components before, this mapping helps you understand when hook code actually runs.

constructor → useState with a lazy initializer (useState(() => expensiveInit())), which runs the function only once.

componentDidMount → useEffect(() => { ... }, []). Runs once after the component first appears on the page.

componentDidUpdate → useEffect(() => { ... }, [dep]). Runs after any render where the value of dep changed.

componentWillUnmount → the function returned from useEffect (the cleanup function). React runs this before the component is removed from the page, and also before the effect runs again when dependencies change.

shouldComponentUpdate (which let you skip a re-render) → React.memo for checking props, plus useMemo and useCallback for keeping references stable.

getDerivedStateFromProps → just calculate the value directly during render. No hook needed — derive it from props or existing state.

getSnapshotBeforeUpdate → useLayoutEffect with a ref to capture what the DOM looks like before React changes it.

componentDidCatch / getDerivedStateFromError (catching errors during rendering) → still requires a class-based Error Boundary. There is no hook that can catch render errors yet.`,
    diagram: {
      type: 'ascii',
      content: `Class lifecycle          Hook equivalent
───────────────────────  ────────────────────────────
constructor              useState / useReducer
componentDidMount        useEffect(fn, [])
componentDidUpdate       useEffect(fn, [deps])
componentWillUnmount     return () => cleanup from useEffect
shouldComponentUpdate    React.memo + useMemo/useCallback
getSnapshotBeforeUpdate  useLayoutEffect + useRef
componentDidCatch        Error Boundary (class, no hook yet)

useLayoutEffect  ← fires before browser paint (sync)
useEffect        ← fires after browser paint (async)`,
    },
    tags: ['hooks', 'lifecycle', 'useEffect', 'class-components', 'migration'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'strict-mode',
    title: 'StrictMode & Double Invocation',
    summary: 'StrictMode is a development-only tool that runs your effects twice on purpose to help you find bugs caused by missing cleanup.',
    body: `React.StrictMode is a wrapper you add around your app during development. It does not change how your app looks or behaves for users. In development only, it intentionally runs component render functions, state initializers, and useEffect setup and cleanup twice. This helps you spot bugs that only appear when an effect runs more than once.

If your component breaks when effects run twice, that is a real bug — usually a missing cleanup function, an effect that adds an event listener without removing it, or code that mutates something instead of using state.

StrictMode also shows warnings for outdated React patterns, such as legacy lifecycle methods. It has no effect in production builds.`,
    tags: ['strict-mode', 'debugging', 'effects', 'cleanup', 'development'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'compound-component-pattern',
    title: 'Compound Components Pattern',
    summary: 'A set of components that work together by sharing state through Context — without needing to pass props between them.',
    body: `Compound components are a group of related components designed to work together. The parent component owns the state and shares it through Context. Each child component reads from that Context directly — no props need to be passed through.

This gives the consumer (the person using your component library) a clean, flexible API. They can arrange the child components in any order they want without needing to understand the internal state.

Common examples: a Tabs component with Tab and Panel children, a Select with Option children, or an Accordion with Item children. The parent provides the active state through a Context; the children read it.

There are two common ways to implement this pattern: (1) Static properties — attach child components as properties of the parent, so users write <Tabs.Tab> and <Tabs.Panel>. (2) Context-based — export the child components separately and use Context inside the module. The second approach is more flexible when children need to be nested deeper.`,
    diagram: {
      type: 'ascii',
      content: `// Usage (no prop threading):
<Tabs defaultTab="a">
  <Tabs.List>
    <Tabs.Tab value="a">Overview</Tabs.Tab>
    <Tabs.Tab value="b">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="a"><Overview /></Tabs.Panel>
  <Tabs.Panel value="b"><Details /></Tabs.Panel>
</Tabs>

// Tabs shares activeTab via Context — Tab + Panel read it
const TabsCtx = createContext(null);
function Tabs({ defaultTab, children }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsCtx.Provider value={{ active, setActive }}>
    {children}
  </TabsCtx.Provider>;
}`,
    },
    tags: ['compound-components', 'context', 'patterns', 'composition'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'state-management-architecture',
    title: 'State Management: Choosing the Right Tool',
    summary: 'Local state, Context, Zustand, Redux — each tool fits a different situation depending on how widely the state is shared and how often it changes.',
    body: `Picking the right state tool comes down to three questions: who needs the state, how often does it change, and is the data coming from the server?

Local state (useState/useReducer): UI state owned by one component or a small part of the tree. Fast, simple, and lives next to the code that uses it.

Context API: Low-frequency global values like theme, language setting, or the logged-in user. Not built for rapid updates — every component that reads the context re-renders whenever the value changes. Split contexts by concern or memoize the value to limit unnecessary re-renders.

Zustand / Jotai / Valtio: Small, lightweight global stores. Zustand is the most popular. Components subscribe only to the piece of state they need, so they only re-render when that piece changes. Good for global state that updates more often than Context can handle comfortably.

Redux Toolkit: Best for large teams or large codebases that need strict conventions, complex async logic, or time-travel debugging (stepping backward through state changes). The extra structure pays off at scale.

React Query / SWR: Built specifically for data that comes from a server (API responses). Handles caching, background refetching, and loading/error states so you do not have to. Replaces the common "fetch in useEffect + useState for loading" pattern.`,
    diagram: {
      type: 'ascii',
      content: `Decision tree:
Is it UI state (open/closed, hover)?  → useState
Is it form state?                      → local state or react-hook-form
Is it shared by a few components?      → lift state / Context
Is it infrequently updated global?     → Context
Is it frequently updated global?       → Zustand / Jotai
Is it server data (API responses)?     → React Query / SWR
Is it complex + large team?            → Redux Toolkit`,
    },
    tags: ['state-management', 'zustand', 'redux', 'context', 'react-query', 'architecture'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'react-design-patterns',
    title: 'Essential React Design Patterns',
    summary: 'Five common patterns — compound components, render props, HOCs, custom hooks, and controlled components — each solve a specific problem around sharing logic or state.',
    body: `Compound components: a group of related components that share state through Context. The parent owns the state; the child components read it. This makes for a clean, flexible API (Tabs, Select, Accordion).

Render props: a component accepts a function as a prop and calls it with some data, letting the parent decide what to render. Mostly replaced by custom hooks today, but still found in some virtualization libraries.

Higher-Order Components (HOC): a function that takes a component and returns a new, enhanced version of it. Older libraries like Redux and React Router used this pattern. Hooks are now preferred because HOCs add extra wrapper components to the tree.

Custom hooks: the modern way to share stateful logic between components. No extra wrapper components, easy to combine, and works well with TypeScript.

Controlled / Uncontrolled: a controlled component lets React manage a form input's value through state. An uncontrolled component lets the browser's DOM manage the value, accessed via a ref. Controlled gives you more power; uncontrolled is simpler when you just need the value on submit.

Provider pattern: wrap part of your component tree in a Context Provider to give any component inside it access to shared data, without passing props through every level. Works best for data that changes infrequently (auth, theme, language).`,
    diagram: {
      type: 'ascii',
      content: `Compound:  <Tabs>            HOC:       withAuth(Dashboard)
           <Tabs.Tab />             ↓
           <Tabs.Panel />     AuthDashboard

Render prop:                 Custom hook:
<Mouse render={pos =>        const { data, loading } = useFetch(url);
  <Cat pos={pos} />          return loading ? <Spinner /> : <List data={data} />;
} />

Provider:
<CartContext.Provider value={cartState}>
  <Header />  ← no cart prop needed
  <Main />    ← reads cart via useContext`,
    },
    tags: ['design-patterns', 'compound-components', 'hoc', 'render-props', 'custom-hooks', 'patterns'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'react-fiber',
    title: 'React Fiber Architecture',
    summary: 'Fiber is React\'s internal engine for working out what changed. It can pause, prioritize, and resume rendering work so the page stays responsive.',
    body: `React Fiber (introduced in React 16) is a rewrite of the internal system that handles rendering. Before Fiber, rendering was all-or-nothing — once React started, it ran until it finished, even if that took 500ms and caused the page to freeze.

Fiber breaks rendering into small units of work called fiber nodes. Each component in your tree becomes a fiber node, linked together in a structure React can walk piece by piece. React can pause work in the middle of a render, let the browser handle something more urgent (like a button click), then come back and finish.

The process has two stages: (1) The render phase — React walks the fiber tree, figures out what changed, and can be interrupted at any point. (2) The commit phase — React applies the actual DOM changes and runs effects. The commit phase always runs to completion without interruption. This split is what makes concurrent features possible.`,
    diagram: {
      type: 'ascii',
      content: `Fiber tree (linked list):
App → Header → Nav → Link
 ↓           ↑
Main → Section → Article
 ↓
Footer

Each fiber: { type, stateNode, child, sibling, return, effectTag }`,
    },
    tags: ['fiber', 'concurrent', 'reconciler', 'performance', 'scheduling'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'concurrent-rendering',
    title: 'Concurrent Rendering',
    summary: 'React 18 can work on multiple versions of the UI at the same time, pausing lower-priority work to keep the page feeling fast.',
    body: `Concurrent rendering (React 18+) means React no longer has to finish a render before handling something more urgent. Before React 18, any ongoing render would block everything else until it completed. Now, React can pause a render in the middle and handle higher-priority updates first.

Key APIs that take advantage of this: useTransition lets you mark a state update as low-priority (a "transition"). React will start working on it but can interrupt it if the user does something more urgent, like typing into an input field. Suspense works alongside concurrent rendering to show loading states without blocking the rest of the page.

Automatic batching is another React 18 improvement. Before, only state updates inside React event handlers were grouped into a single re-render. Now, multiple setState calls inside Promises, setTimeout, and native event handlers are all grouped automatically, reducing unnecessary re-renders.`,
    tags: ['concurrent', 'react18', 'useTransition', 'batching', 'suspense'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'reconciler-renderer-split',
    title: 'Reconciler vs Renderer',
    summary: 'React splits its work into two layers: one that figures out what changed (the reconciler) and one that applies those changes to a specific output (the renderer).',
    body: `React is made of two separate layers. The reconciler (in the react package) is responsible for understanding your component tree: running hooks, tracking what changed, and scheduling work. It does not know or care whether the output is a browser, a phone, or something else.

The renderer takes the reconciler's output and applies it to a specific target. react-dom writes changes to the browser's DOM. react-native writes them to iOS and Android views. react-test-renderer writes to a plain JavaScript object, which is useful for tests.

This separation is why the same React component code works on web, mobile, and servers. You can even build custom renderers using the react-reconciler package — tools like Ink (for terminal output), React Three Fiber (for 3D scenes), and PDF generators all work this way.

The commit phase (where the renderer does its actual work) always runs to completion without interruption. Only the earlier reconciliation phase can be paused by concurrent React.`,
    diagram: {
      type: 'ascii',
      content: `┌─────────────────────────────────────┐
│        react (reconciler)            │
│  Fiber tree diffing + scheduling     │
│  Hooks, priorities, transitions      │
└──────────────┬──────────────────────┘
               │ "here are the changes"
     ┌─────────┼──────────┐
     ▼         ▼          ▼
react-dom  react-native  custom
(Browser)  (iOS/Android)  (Ink, R3F, PDF...)`,
    },
    tags: ['reconciler', 'renderer', 'fiber', 'react-native', 'architecture'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'react19-overview',
    title: 'React 19 — Key Changes',
    summary: 'React 19 adds the use() hook, a new Actions system for forms, simpler ref handling, and stable Server Components support.',
    body: `React 19 (released December 2024) brings several significant additions:

use() hook: Read a Promise or Context value directly inside your render function. Unlike useEffect, it can be called inside an if statement. When you pass a Promise to use(), the component pauses (suspends) until the Promise resolves.

Actions: Async functions designed for handling form submissions and data changes. useActionState wraps an action and automatically tracks whether it is pending or has errored. Works with both server and client actions.

Server Components (stable): Components that run only on the server. They can query a database or call an API directly, and their code is never sent to the browser. The boundary between server and client code is defined by "use client" and "use server" directives.

Ref as prop: You can now pass a ref as a regular prop in React 19. The forwardRef wrapper is no longer needed in most cases.

Improved hydration errors: When the server-rendered HTML does not match what React renders on the client (a hydration mismatch), React 19 shows clearer error messages and highlights the difference.`,
    tags: ['react19', 'use', 'actions', 'server-components', 'ref'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'react-server-components-model',
    title: 'React Server Components (RSC) Mental Model',
    summary: 'RSC lets individual components run only on the server — they can access databases directly, never ship any JavaScript to the browser, and still compose with interactive client components.',
    body: `React Server Components (available in Next.js 13+ App Router) change how data fetching works. Instead of the browser fetching data after the page loads, individual components run on the server and send their output directly.

Server Components (the default in App Router): run only on the server. They can query a database, read a file, or call a private API directly. Their code is never sent to the browser, so they add zero weight to the page's JavaScript bundle. They can use async/await directly. They cannot use hooks, browser APIs, or event handlers.

Client Components ("use client"): run in the browser (and also on the server for the first render). They can use hooks, handle events, and access browser APIs. Their code is included in the JavaScript bundle sent to the browser.

The client boundary: when you add "use client" at the top of a file, that component and everything it imports become client components. You can still pass Server Components as children or props to a client component — they render on the server, and only their output is passed through.

RSC payload: instead of sending HTML, the server sends a special format that React on the client understands. This lets parts of the page stream in progressively as each component finishes rendering on the server.`,
    diagram: {
      type: 'ascii',
      content: `Server Components:             Client Components:
─────────────────────────      ──────────────────────────
Runs on server only            Runs on browser (+ SSR)
Can be async functions         Uses hooks, events
Zero client bundle cost        In client JS bundle
Direct DB/API access           No direct server access
No hooks / browser APIs        useState, useEffect, etc.
Can pass data to clients       Can receive RSC as children

Data flow:
Server → RSC payload (not HTML) → Client React reconciles
           ↓
    Streaming: chunks arrive progressively`,
    },
    tags: ['server-components', 'rsc', 'nextjs', 'react19', 'architecture', 'streaming'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'context-api-deep-dive',
    title: 'Context API: Patterns & Pitfalls',
    summary: 'Context is a way to pass data to components deep in the tree without threading props through every level. It is not a general-purpose state manager.',
    body: `Context solves one specific problem: avoiding prop drilling. It is not designed for state that changes frequently.

How it works: createContext creates a context object. You wrap part of your component tree in a Provider and give it a value. Any component inside that tree can call useContext to read the value. When the Provider's value changes, every component reading that context re-renders. React does not check what part of the value each component uses — it just re-renders all of them.

The re-render problem: if you store an object in context and update any property on it, every consumer re-renders, even components that only read a different property. The most effective fix is to split your context by concern (a separate ThemeContext, AuthContext, CartContext) so that a cart update does not re-render components that only care about the theme.

Memoization helps too: wrap the context value in useMemo and any functions in useCallback. This prevents a new object reference from being created every time the parent re-renders, which would otherwise trigger all consumers unnecessarily.

Custom hook pattern: instead of exporting the raw context object, export a useMyContext() function. The hook can throw a clear error message if a component uses it outside the Provider, and it hides the internal context shape from consumers.

When not to use Context: rapidly changing values like mouse position, scroll offset, or animation state. Every change re-renders all consumers. For this kind of data, useRef or a library like Zustand (which supports selective subscriptions) is a better fit.

Context vs state management libraries: Context is built into React with no extra dependencies. Libraries like Zustand add selective subscriptions, meaning a component only re-renders when the specific piece of state it subscribes to changes.`,
    diagram: {
      type: 'ascii',
      content: `Context data flow:
<ThemeContext.Provider value={theme}>   ← value change re-renders ALL consumers
  <App>
    <Header />   ← useContext(ThemeContext) → re-renders on any theme change
    <Main>
      <Sidebar /> ← useContext(ThemeContext) → re-renders too
    </Main>
  </App>
</ThemeContext.Provider>

Fix — split contexts:
<ThemeContext.Provider value={theme}>     ← only theme consumers re-render
  <UserContext.Provider value={user}>    ← only user consumers re-render
    <App />
  </UserContext.Provider>
</ThemeContext.Provider>`,
    },
    tags: ['context', 'context-api', 'state-management', 're-renders', 'performance'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'redux-mental-model',
    title: 'Redux & Redux Toolkit: Core Concepts',
    summary: 'Redux keeps all your app state in one place and enforces a strict pattern for how state can change — making it predictable and easy to debug.',
    body: `Redux is built on three rules: one store holds all state, state can only change through actions, and those changes happen in pure functions called reducers (functions with no side effects that return a new state).

Core vocabulary:
Store: a single object that holds your entire application's state. Created once with configureStore.
Action: a plain object describing something that happened. It always has a type field, like { type: 'counter/increment' }.
Reducer: a function that takes the current state and an action, and returns the new state. It must not mutate (directly change) state.
Dispatch: the function you call to send an action to the store. store.dispatch(increment()).
Selector: a function that reads a specific piece of state. (state) => state.counter.value.

Redux Toolkit (RTK) is the official, recommended way to write Redux today. It removes most of the boilerplate:
createSlice lets you define your initial state and reducers in one place. It uses Immer internally, so you can write code that looks like it mutates state (state.count += 1), and Immer handles producing the correct immutable update behind the scenes.
configureStore wires up Redux DevTools and common middleware automatically.
createAsyncThunk handles async operations like API calls. It automatically creates three actions — pending, fulfilled, and rejected — so you can track loading and error state in the store.
RTK Query is an optional built-in data-fetching and caching layer — a simpler alternative to React Query if you are already using RTK.

When Redux makes sense: large teams, strict conventions, complex async flows, time-travel debugging (stepping back through state changes), or codebases where many teams share global state.

When it is too much: small to medium apps where Zustand or Context is enough.`,
    diagram: {
      type: 'ascii',
      content: `Redux data flow (strictly unidirectional):

  UI event
     ↓
  dispatch(action)
     ↓
  Reducer(currentState, action) → newState
     ↓
  Store updated
     ↓
  useSelector re-runs → component re-renders

createSlice shorthand:
  createSlice({ name, initialState, reducers })
  → generates: actions + reducer
  → Immer handles immutability inside reducers`,
    },
    tags: ['redux', 'redux-toolkit', 'state-management', 'createSlice', 'reducer', 'store'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'zustand-mental-model',
    title: 'Zustand: Lightweight Global State',
    summary: 'Zustand is a minimal global state library. No Provider needed, no boilerplate — just a store hook where each component subscribes only to what it needs.',
    body: `Zustand creates a store as a regular React hook. The store holds both your state values and the functions that update them in one place. There is no Provider to wrap your app in, no action type strings, and no reducers — just a function that calls set.

Selective subscriptions are the most important feature. Each component passes a selector function to the hook: useStore(s => s.count). Zustand compares the previous and next selector result using a shallow equality check. If the result has not changed, the component does not re-render. A component subscribed to state.count will not re-render when state.name changes.

The set function: Zustand's set does a shallow merge, similar to React's setState. When the new value depends on the current state, use set((state) => ...) instead of set({ ... }).

Middleware: Zustand has a simple middleware system. persist syncs the store to localStorage or sessionStorage so state survives a page refresh. devtools connects the store to Redux DevTools for debugging. immer lets you write code that looks like direct mutation, just like Redux Toolkit does.

Slices pattern: for large stores, define each concern as a separate function (a slice) and combine them in a single create call. This keeps the store organized without splitting into completely separate stores.

Zustand vs Context: Context re-renders every consumer when the value changes. Zustand only re-renders components whose specific selector result changed. This makes Zustand the right choice when state updates more than a few times per user interaction.

Zustand vs Redux: Zustand has almost no boilerplate and does not force any particular structure. Redux enforces strict conventions (actions, reducers, middleware) that pay off on very large codebases. For most apps, Zustand is the simpler, better starting point for global state.`,
    diagram: {
      type: 'ascii',
      content: `Zustand store (no Provider needed):

const useStore = create((set) => ({
  count: 0,
  name: '',
  increment: () => set(s => ({ count: s.count + 1 })),
}));

Component A: useStore(s => s.count)   ← re-renders on count change only
Component B: useStore(s => s.name)    ← re-renders on name change only
Component C: useStore(s => s.increment) ← action ref is stable, never re-renders

Middleware chain:
create()(persist(devtools(immer(storeSlice)), { name: 'my-store' }))`,
    },
    tags: ['zustand', 'state-management', 'selective-subscriptions', 'store', 'middleware'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'react-query-mental-model',
    title: 'React Query: Server State Management',
    summary: 'React Query manages data that comes from a server. Think of it as a smart cache layer between your UI and your API, not a general state store.',
    body: `The key insight: client state and server state are different things. Client state (is the dropdown open, what tab is selected) lives in your component or Zustand. Server state (a list of users, an order's details) lives on the server — your UI is just a local copy that can go out of date.

React Query handles the full lifecycle of server state: fetching, caching, running background refetches when data goes stale, deduplicating duplicate requests, and handling mutations (create, update, delete).

Query keys: every query gets a key, written as an array. React Query uses this as a cache identifier. ['users'] caches all users. ['users', 42] caches user #42 separately. When you invalidate ['users'], every query whose key starts with 'users' is refetched.

Stale-while-revalidate strategy: React Query serves data from the cache immediately (even if it might be slightly out of date), then refetches in the background and updates the UI when fresh data arrives. staleTime controls how long React Query considers data fresh enough to skip a background refetch. cacheTime (gcTime in v5) controls how long inactive cached data is kept in memory before being cleared.

useQuery: for reading data. Returns { data, isLoading, isError, error, isFetching }. isLoading is true only on the very first fetch (no cached data yet). isFetching is true any time a fetch is in progress, including background refetches.

useMutation: for writing data (create, update, delete). Returns { mutate, isPending, isError }. Use onSuccess to invalidate the relevant query keys so the UI refetches and stays in sync.

Optimistic updates: update the local cache immediately when the user takes an action, then roll back if the server returns an error. React Query provides onMutate, onError, and onSettled callbacks to implement this pattern.

React Query vs Redux/Zustand for server data: React Query is designed specifically for async server data. It handles edge cases (race conditions, background sync, stale data) that a manual useEffect + useState approach will likely miss.`,
    diagram: {
      type: 'ascii',
      content: `Cache lifecycle:

fetch('/api/users')
  ↓
QueryCache['users']
  ├─ fresh (within staleTime)  → serve from cache, no refetch
  ├─ stale (past staleTime)    → serve from cache + refetch in background
  └─ no cache                  → show isLoading, fetch, cache result

invalidateQueries(['users'])
  → marks ['users'], ['users', 1], ['users', 2] … as stale
  → triggers background refetch for active queries

Mutation flow:
mutate(data) → API call → onSuccess → invalidateQueries → UI updates`,
    },
    tags: ['react-query', 'tanstack-query', 'server-state', 'caching', 'useQuery', 'useMutation'],
    tier: 'advanced',
    level: 'experienced',
  },
];

export default reactTheory;
