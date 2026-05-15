import type { ConceptCard } from '@/types/content';

const reactTheory: ConceptCard[] = [
  {
    id: 'virtual-dom',
    title: 'Virtual DOM & Reconciliation',
    summary: 'React maintains a lightweight copy of the DOM in memory and diffs it to minimize real DOM updates.',
    body: `The virtual DOM (VDOM) is a JavaScript object tree that mirrors the real DOM structure. When state changes, React creates a new VDOM tree and compares it to the previous one — a process called reconciliation (or diffing).

The diffing algorithm works on two assumptions: (1) elements of different types produce different trees; (2) elements with stable keys across renders can be reused. This allows React to compute the minimal set of real DOM mutations needed, batching them into a single update.

React 18 further optimizes this with automatic batching — multiple setState calls within async operations are batched together rather than triggering separate renders. The virtual DOM approach has overhead for very simple UIs but significantly reduces expensive real DOM operations for complex, frequently-updating UIs.`,
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
    id: 'react-fiber',
    title: 'React Fiber Architecture',
    summary: 'Fiber is React\'s internal reconciliation engine — a unit of work that can be paused, prioritized, and resumed.',
    body: `React Fiber (introduced in React 16) is a reimplementation of the reconciler that turns rendering into an incremental, interruptible process. Before Fiber, rendering was synchronous and blocking — once started, it ran to completion even if it took 500ms, dropping frames.

Fiber represents each component as a "fiber node" — a linked list structure that can be traversed incrementally. React can pause work mid-render, yield to higher-priority updates (like user input), then resume. This is the foundation of concurrent features.

The fiber algorithm has two phases: (1) Render phase (reconciliation) — traverses the fiber tree, determines changes, can be interrupted. (2) Commit phase — applies DOM mutations synchronously and fires effects. Only the commit phase is interruptible-free.`,
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
    summary: 'React 18 can prepare multiple UI versions simultaneously, pausing and resuming work to keep the UI responsive.',
    body: `Concurrent rendering (React 18+) lets React work on multiple state trees simultaneously. Before concurrent mode, any render blocked the main thread until complete. With concurrent React, renders can be interrupted by more urgent updates.

Key APIs: useTransition marks state updates as "transitions" (interruptible, lower priority) — the input updates immediately while an expensive list render can be paused. Suspense integrates with concurrent rendering to show fallbacks while data loads without blocking higher-priority updates.

Automatic batching (React 18) means setState calls inside Promises, setTimeout, and native event handlers are now batched together by default — previously, only calls inside React event handlers were batched.`,
    tags: ['concurrent', 'react18', 'useTransition', 'batching', 'suspense'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'component-lifecycle',
    title: 'Component Lifecycle (Functional)',
    summary: 'Function components have three lifecycle phases: mount, update, and unmount — all expressed through useEffect.',
    body: `Functional components express lifecycle through useEffect:

Mount (componentDidMount equivalent): useEffect with an empty dependency array []. Runs once after the initial render.

Update (componentDidUpdate equivalent): useEffect with specific dependencies. Runs after every render where those deps changed. Run on every render by omitting the deps array entirely.

Unmount (componentWillUnmount equivalent): Return a cleanup function from useEffect. It runs before the component is removed from the DOM and before the effect runs again.

React 18 StrictMode double-invokes effects in development to surface bugs with missing cleanup. This is intentional — if your effect breaks when run twice, you have a real bug.`,
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
    id: 'context-vs-prop-drilling',
    title: 'Context vs Prop Drilling',
    summary: 'Prop drilling passes data through many layers; Context provides global-like access without explicit passing.',
    body: `Prop drilling occurs when data must be passed through intermediate components that don't need it just to reach deeply nested consumers. For shallow trees (2-3 levels), prop drilling is preferable — it makes data flow explicit and components reusable.

Context solves deep drilling by providing a mechanism to inject values into any component in the subtree without passing props through intermediaries. However, Context has a tradeoff: every consumer re-renders when the context value changes, regardless of whether the specific value it uses changed.

For performance-sensitive cases with frequently-changing values, split contexts (ThemeContext separate from UserContext), memoize the context value, or use a state management library (Zustand, Jotai) that provides selective subscriptions.`,
    tags: ['context', 'prop-drilling', 'state', 'performance'],
    tier: 'core',
    level: 'experienced',
  },
  {
    id: 'composition-vs-inheritance',
    title: 'Composition Over Inheritance',
    summary: 'React strongly favors component composition — building UIs from smaller pieces — over class inheritance.',
    body: `React's component model is built on composition. Instead of inheriting behavior from a base class, you compose components from smaller units. The children prop is the simplest form: a wrapper component renders whatever its children are. Render props and higher-order components (now largely replaced by hooks) are other patterns.

The recommended pattern for "specialization" is composition: a WelcomeDialog is a Dialog configured with specific props, not a class extending Dialog.

Hooks brought the final piece — stateful logic can now be extracted and shared through composition (custom hooks) rather than inheritance (mixins) or component wrapping (HOCs). This makes logic far more composable and testable.`,
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
    id: 'controlled-vs-uncontrolled',
    title: 'Controlled vs Uncontrolled Inputs',
    summary: 'Controlled inputs are driven by React state; uncontrolled inputs rely on the DOM as the source of truth.',
    body: `A controlled input has its value driven by React state — the component owns the value and updates it through onChange. Every keystroke triggers a setState, which re-renders the component. This gives React full control: you can validate, format, or transform input in real time.

An uncontrolled input stores its value in the DOM. You access it via a ref (ref.current.value) — typically only when needed (on submit). Less code, fewer re-renders, easier to integrate with non-React code.

React 19 introduces server actions with <form action={serverAction}> as a third pattern — the form manages its own submission state through useActionState, combining some benefits of both approaches.`,
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
    id: 'keys-list-rendering',
    title: 'Keys & List Rendering',
    summary: 'Keys help React identify which items changed in a list, enabling efficient reconciliation.',
    body: `When rendering lists, React needs to match elements across renders to determine what changed, was added, or was removed. Keys are stable identifiers you provide so React doesn't have to guess.

Without keys, React re-renders the entire list from the changed index. With stable keys (usually IDs from your data), React reuses DOM nodes for unchanged items, only creating/destroying what actually changed.

Common mistakes: using array index as a key is problematic when items can be reordered or inserted — the index changes, forcing React to re-render items that didn't change. Use a stable, unique ID from your data. Keys must be unique among siblings but not globally.`,
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
    id: 'strict-mode',
    title: 'StrictMode & Double Invocation',
    summary: 'StrictMode intentionally double-invokes render and effects in development to surface side effect bugs.',
    body: `React.StrictMode is a development tool that wraps your app (or a subtree) and activates additional checks. In development only, it double-invokes: render functions, state initializers, and useEffect setup+cleanup functions. This double invocation helps detect bugs in effects that lack proper cleanup.

If your component breaks when rendered twice, you have a real bug — typically a missing cleanup function, a mutation instead of a state update, or an effect that sets up something without tearing it down.

StrictMode also warns about deprecated APIs (legacy lifecycle methods, string refs, findDOMNode). It has zero impact on production builds.`,
    tags: ['strict-mode', 'debugging', 'effects', 'cleanup', 'development'],
    tier: 'advanced',
    level: 'experienced',
  },
  {
    id: 'react19-overview',
    title: 'React 19 — Key Changes',
    summary: 'React 19 introduces the use() hook, Actions, improved ref handling, and full Server Components support.',
    body: `React 19 (released December 2024) brings several major additions:

use() hook: Read Promises and Context inside render — unlike useEffect, it can be called conditionally. Components using use(promise) automatically suspend until the promise resolves.

Actions: Async functions that handle form submissions and mutations. useActionState wraps an action and tracks pending/error state. Works with both server and client actions.

Server Components (stable): Components that run only on the server — can fetch data directly, have no client bundle cost. Client/Server boundary is explicit via "use client" / "use server" directives.

Ref as prop: In React 19, ref can be passed as a regular prop — forwardRef is no longer required for most cases.

Improved hydration: Error messages are clearer and diffs are shown for hydration mismatches.`,
    tags: ['react19', 'use', 'actions', 'server-components', 'ref'],
    tier: 'advanced',
    level: 'expert',
  },
  {
    id: 'compound-component-pattern',
    title: 'Compound Components Pattern',
    summary: 'Share implicit state between a parent component and its children via Context — no prop drilling.',
    body: `Compound components are a set of components that work together and share implicit state through React Context. The parent manages state; children access it via useContext without receiving props explicitly. This gives consumers a clean, declarative API while keeping implementation details inside the component family.

Classic examples: a Select with Option children, an Accordion with Item children, a Tab group with Panel children. The parent passes state and setters through a Context; children read from it. Consumers mix and match children in any order without prop threading.

The pattern has two common implementations: (1) Static properties — attach child components as properties of the parent (Tabs.Panel = Panel). (2) Context-based — use React.createContext inside the component module. The Context approach is more flexible for deeply nested children.`,
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
    summary: 'Local state, Context, Zustand, Redux — each fits a different scope and update frequency.',
    body: `State management choice depends on three dimensions: scope (local vs global), update frequency (infrequent vs rapid), and derivation (computed vs raw).

Local state (useState/useReducer): For UI state that belongs to one component or a small subtree. Fast, simple, co-located with the component.

Context API: For low-frequency global values (theme, locale, auth user). Not optimized for frequent updates — every consumer re-renders on any value change. Use multiple contexts or memoization to narrow re-render scope.

Zustand / Jotai / Valtio: Lightweight atomic stores. Zustand gives you a central store with selective subscriptions (components only re-render if their slice changes). Best for moderate global state with clear ownership.

Redux Toolkit: For large teams/codebases needing strict conventions, time-travel debugging, or complex update logic (sagas, thunks). The boilerplate cost pays off at scale.

React Query / SWR: For server-state (cache, background refetch, pagination). Not general state — specifically for async data fetched from APIs. Replaces most "fetch in useEffect + useState" patterns.`,
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
    id: 'reconciler-renderer-split',
    title: 'Reconciler vs Renderer',
    summary: 'React separates tree diffing (reconciler) from output generation (renderer) — enabling React Native, testing, and custom targets.',
    body: `React is split into two distinct layers. The reconciler (react package) handles the component tree: running hooks, diffing fiber nodes, scheduling work, and computing what changed. It's completely target-agnostic — it produces a description of changes, not actual output.

The renderer (react-dom, react-native, etc.) takes that description and applies it to a specific output target. react-dom writes to the browser DOM. react-native writes to native iOS/Android views. react-test-renderer writes to a JSON tree for testing.

This split is why the same component code runs on web, mobile, and servers. Custom renderers can be built using react-reconciler — used by tools like Ink (CLI output), React Three Fiber (Three.js scenes), and PDF generators.

The commit phase (where the renderer does actual work) is always synchronous and uninterruptible — only the reconcile phase can be paused by concurrent React.`,
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
    id: 'hooks-lifecycle-mapping',
    title: 'Hooks ↔ Lifecycle Method Mapping',
    summary: 'Every class component lifecycle method has a functional hook equivalent — and hooks are more composable.',
    body: `Understanding the mapping between class lifecycle methods and hooks helps engineers transitioning from class components and reasoning about when code runs.

constructor → useState initial value (lazy initializer form: useState(() => expensiveInit())).

componentDidMount → useEffect(() => { ... }, []). Runs once after the first render.

componentDidUpdate → useEffect(() => { ... }, [dep]). Runs after every render where dep changed.

componentWillUnmount → the cleanup function returned from useEffect. Runs before the component unmounts AND before the next effect run if dependencies changed.

shouldComponentUpdate → React.memo (for props comparison) + useMemo/useCallback (for stable references).

getDerivedStateFromProps → compute during render (no hook equivalent needed — just derive from props/state).

getSnapshotBeforeUpdate → useLayoutEffect with a ref to capture pre-update DOM state.

componentDidCatch / getDerivedStateFromError → still requires a class-based Error Boundary (no hook equivalent for catching render errors yet in production React).`,
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
    id: 'when-react-renders',
    title: 'When Does React Render?',
    summary: 'React renders a component when its state changes, its parent re-renders, or its context value changes — understanding this prevents wasted renders.',
    body: `React renders (calls your function component) in these situations:

1. State change: calling a state setter. React schedules a re-render of that component and all its descendants.
2. Parent re-renders: if the parent renders, all children render too — regardless of whether props changed. This is the most common source of "unnecessary" renders.
3. Context change: any consumer of a context re-renders when the context value changes.
4. Force update (rare): calling forceUpdate() in class components.

React doesn't update the DOM on every render — it diffs the virtual DOM first. But the function component does run, which is why expensive computations inside render need useMemo.

Rendering ≠ DOM update. React bails out of DOM updates if the virtual DOM diff shows no changes.

memo() prevents re-renders caused by parent renders IF props haven't changed (shallow comparison). It doesn't help with state changes inside the component or context changes.`,
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
    summary: 'Keep state as close to where it\'s used as possible — lift only when required by siblings.',
    body: `State colocation is the principle that state should live at the lowest possible point in the component tree that still gives all necessary consumers access to it.

Over-lifting state (putting everything in a global store or top-level component) causes: unnecessary re-renders for components that don't care about the state, harder-to-test components, and more complex state management.

The hierarchy for deciding where state lives:
1. Only one component uses it → local state in that component.
2. Two sibling components need it → lift to their closest common ancestor.
3. Many components at different levels need it → Context or global store.
4. Persisted/server state → React Query, SWR, or a dedicated cache.

The "global store by default" anti-pattern leads to systems where every component is tightly coupled to a central store, making refactoring and testing harder.`,
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
    id: 'react-server-components-model',
    title: 'React Server Components (RSC) Mental Model',
    summary: 'RSC lets individual components opt into server-only execution — zero bundle cost, direct backend access, no client JavaScript.',
    body: `React Server Components (Next.js 13+ App Router) change the fundamental model: instead of the client fetching data after hydration, components run on the server and send rendered output.

Server Components (default in App Router): run only on the server. Can access databases, file system, secrets directly. Never appear in the client JS bundle — zero cost to the user. Can be async (await data directly). Cannot use hooks, browser APIs, or event handlers.

Client Components ("use client"): run in the browser (and on server for initial SSR). Can use hooks, events, browser APIs. Add to the client JS bundle.

The "client boundary": once you add "use client", that component and all its direct imports become client components. But you can still receive Server Components as props/children — they render on the server and their HTML is passed through.

RSC payload: the server sends a special wire format (not HTML) that React on the client uses to reconcile. This allows streaming partial updates without full page reload.`,
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
    id: 'react-design-patterns',
    title: 'Essential React Design Patterns',
    summary: 'Five structural patterns — compound components, render props, HOC, custom hooks, and controlled components — solve recurring composition challenges.',
    body: `Compound components: related components share implicit state via Context. The parent owns state; sub-components consume it. Enables declarative, flexible APIs (Tabs, Select, Accordion).

Render props: a component accepts a function as a prop and calls it with data to render. Now largely replaced by custom hooks, but still useful for scoped rendering (virtualization libraries).

Higher-Order Components (HOC): a function that wraps a component and returns an enhanced version. Used by older Redux connect(), React Router withRouter(). Hooks are now preferred — they don't add wrapper nodes to the tree.

Custom hooks: the modern way to share stateful logic. No wrapper components, composable, TypeScript-friendly.

Controlled / Uncontrolled: controlled = React owns the value (form inputs driven by state). Uncontrolled = DOM owns the value (accessed via ref). Controlled is more powerful; uncontrolled is simpler for basic cases.

Provider pattern: wrap a subtree in a Context Provider to supply data/API without prop drilling. Works best for low-frequency updates (auth, theme, locale).`,
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
];

export default reactTheory;
