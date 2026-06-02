import type { QnaItem } from '@/types/content';

const reactQna: QnaItem[] = [
  {
    id: 'virtual-dom-purpose',
    question: 'What is the Virtual DOM and why does React use it?',
    answer: `The Virtual DOM (VDOM) is a lightweight JavaScript representation of the real DOM tree, maintained in memory. When state changes, React creates a new VDOM, diffs it against the previous one (reconciliation), and applies only the minimal set of real DOM mutations needed. This is faster than rebuilding the entire DOM because real DOM operations are expensive — forcing layout recalculations. The VDOM also enables React to batch multiple updates into a single flush and to build renderers for non-DOM targets (React Native, servers).`,
    codeExample: `// React creates this VDOM tree
{ type: 'div', props: { className: 'card' }, children: [
  { type: 'h2', props: {}, children: ['Title'] },
  { type: 'p', props: {}, children: ['Body text'] }
]}

// After state change: diff, then only update changed nodes
// No full DOM rebuild — only precise mutations applied`,
    codeLanguage: 'javascript',
    difficulty: 'fresher',
    tags: ['virtual-dom', 'reconciliation', 'performance'],
    tier: 'core',
  },
  {
    id: 'useeffect-cleanup',
    question: 'Why and how do you clean up useEffect?',
    answer: `Effects that subscribe to external systems (event listeners, WebSockets, timers, fetch requests) must clean up when the component unmounts or before the effect re-runs with new dependencies. Without cleanup you get memory leaks, duplicate subscriptions, and state updates on unmounted components. Return a function from useEffect — React calls it before running the next effect and on unmount. React 18 StrictMode double-invokes effects in development; if your effect breaks, you have a real cleanup bug.`,
    codeExample: `useEffect(() => {
  // Set up
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(setData);

  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  return () => {
    // Cleanup — runs before next effect + on unmount
    controller.abort();
    window.removeEventListener('resize', handleResize);
  };
}, [url]);`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['useEffect', 'cleanup', 'memory-leaks', 'lifecycle'],
    tier: 'core',
  },
  {
    id: 'usememo-vs-usecallback',
    question: 'What is the difference between useMemo and useCallback?',
    answer: `useMemo memoizes the result of a function call (a value). useCallback memoizes the function itself (a reference). Conceptually: useCallback(fn, deps) === useMemo(() => fn, deps). Use useMemo for expensive computations (filtered lists, derived data) to avoid recomputing on every render. Use useCallback to stabilize a function reference passed to memoized children or listed in a useEffect dependency array. Neither should be used by default — only when you've identified a concrete performance issue.`,
    codeExample: `// useMemo — memoize a VALUE
const filtered = useMemo(
  () => products.filter(p => p.inStock),
  [products]
);

// useCallback — memoize a FUNCTION REFERENCE
const handleDelete = useCallback(
  (id) => dispatch({ type: 'DELETE', id }),
  [dispatch]
);

// useCallback = useMemo returning a function
const handleDelete2 = useMemo(
  () => (id) => dispatch({ type: 'DELETE', id }),
  [dispatch]
);`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['useMemo', 'useCallback', 'performance', 'memoization'],
    tier: 'core',
  },
  {
    id: 'key-prop-importance',
    question: 'Why is the key prop important for lists?',
    answer: `Keys tell React which items in a list correspond to which items across re-renders. Without a key, React re-renders from the first changed index onward. With stable, unique keys (typically database IDs), React can move, reuse, and update only the items that actually changed. Using the array index as a key breaks when items are reordered, inserted, or deleted — the index shifts, making React think different items changed. Also, keys must be unique among siblings but not globally.`,
    codeExample: `// Bad: index as key (breaks on reorder/insert)
items.map((item, i) => <li key={i}>{item.name}</li>)

// Good: stable ID from data
items.map(item => <li key={item.id}>{item.name}</li>)

// Proof of the bug:
// Original: [A(0), B(1), C(2)]
// Prepend D: [D(0), A(1), B(2), C(3)]
// React sees key=0 changed from A to D — updates all items!
// With IDs: React sees D is new, A/B/C are unchanged`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['keys', 'lists', 'reconciliation'],
    tier: 'core',
  },
  {
    id: 'lifting-state-up',
    question: 'What is lifting state up and when should you do it?',
    answer: `Lifting state up means moving state to the closest common ancestor of components that need to share or coordinate on it. When two sibling components need to share state, the state lives in their parent and is passed down as props. This makes state flow explicit and keeps a single source of truth. Lift state when: multiple components need to react to the same state, a child needs to update state that affects a sibling, or when you need to derive a value from multiple pieces of state.`,
    codeExample: `// Two inputs must stay in sync
function TemperatureConverter() {
  // State lifted to parent — single source of truth
  const [celsius, setCelsius] = useState('');

  const fahrenheit = celsius ? (celsius * 9/5 + 32).toFixed(1) : '';

  return (
    <>
      <input
        value={celsius}
        onChange={e => setCelsius(e.target.value)}
        placeholder="Celsius"
      />
      <input
        value={fahrenheit}
        onChange={e => setCelsius(((e.target.value - 32) * 5/9).toFixed(1))}
        placeholder="Fahrenheit"
      />
    </>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['state', 'lifting-state', 'props', 'data-flow'],
    tier: 'core',
  },
  {
    id: 'prop-drilling-solutions',
    question: 'What are the solutions to prop drilling?',
    answer: `Prop drilling (passing props through many layers) has several solutions of increasing complexity: (1) Component composition — restructure to collocate the data consumer closer to the provider. (2) Context — React's built-in mechanism for sharing state without explicit prop passing. (3) State management libraries — Zustand, Jotai (atom-based, selective subscriptions), Redux Toolkit (larger teams). Choose the simplest solution that works. Context is great for low-frequency updates (theme, locale, user); use a library for high-frequency or complex state.`,
    codeExample: `// Solution 1: Composition (move state down, render as prop)
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user}>{/* no drilling */}</Layout>;
}

// Solution 2: Context
const UserContext = createContext(null);
function App() {
  const [user] = useState(null);
  return (
    <UserContext.Provider value={user}>
      <Layout /> {/* no user prop needed */}
    </UserContext.Provider>
  );
}
function DeepChild() {
  const user = useContext(UserContext); // direct access
}`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['prop-drilling', 'context', 'state', 'composition'],
    tier: 'core',
  },
  {
    id: 'controlled-forms',
    question: 'What is a controlled component in React forms?',
    answer: `A controlled component has its form element value driven by React state, with onChange updating that state. React is the single source of truth — every keystroke goes through setState. Benefits: instant validation, conditional disabling, format-on-type, derived values. The tradeoff is more code. Uncontrolled components store value in the DOM, accessed via ref — less code, fewer re-renders, but less control. For simple forms, uncontrolled is fine; for complex validation or inter-field logic, controlled is better.`,
    codeExample: `function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Validate on change
    if (name === 'email' && !value.includes('@')) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }));
    } else {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
    </form>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['controlled', 'forms', 'state', 'validation'],
    tier: 'core',
  },
  {
    id: 'error-boundary-pattern',
    question: 'How do Error Boundaries work and what are their limitations?',
    answer: `Error Boundaries are class components that implement getDerivedStateFromError (to render a fallback UI) and/or componentDidCatch (to log the error). They catch errors during rendering, in lifecycle methods, and in constructors of the entire child tree. Limitations: they only work with class components (no hook equivalent for the boundary itself, though the children can use hooks). They do NOT catch: errors in event handlers (use try/catch), async errors (promises), server-side rendering errors, or errors in the boundary itself.`,
    codeExample: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, { componentStack }) {
    logToMonitoring(error, componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <p>Something went wrong.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage — wrap at appropriate granularity
<ErrorBoundary>
  <Dashboard /> {/* isolated — failure here doesn't crash all */}
</ErrorBoundary>`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['error-boundary', 'error-handling', 'class-components'],
    tier: 'advanced',
  },
  {
    id: 'hooks-not-conditional',
    question: 'Why can\'t hooks be called conditionally?',
    answer: `React tracks hooks by their call order on each render. If you call a hook conditionally, the order changes between renders — React can't match hook state to the right call site and throws an error. The Rules of Hooks: only call hooks at the top level of a function (not inside if/for/while), and only in React function components or custom hooks. Move conditions inside the hook or into what you pass to the hook. Note: React 19's use() can be called conditionally — it's not a hook in the traditional sense.`,
    codeExample: `// WRONG — order changes when condition changes
function Component({ isAdmin }) {
  if (isAdmin) {
    const [data, setData] = useState(null); // Error!
  }
  const [count, setCount] = useState(0);
}

// CORRECT — condition inside the hook call
function Component({ isAdmin }) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isAdmin) return; // condition inside the effect
    fetchAdminData().then(setData);
  }, [isAdmin]);
}`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['hooks', 'rules-of-hooks', 'conditional'],
    tier: 'core',
  },
  {
    id: 'react18-batching',
    question: 'What changed with batching in React 18?',
    answer: `Before React 18, batching (grouping multiple setState calls into one re-render) only worked inside React event handlers. Calls inside setTimeout, Promises, or native event listeners triggered separate re-renders for each setState. React 18 introduces automatic batching — all setState calls are batched by default, regardless of where they occur. This reduces unnecessary re-renders. To opt out of batching when needed, use ReactDOM.flushSync.`,
    codeExample: `// React 17: two separate re-renders
setTimeout(() => {
  setCount(c => c + 1); // re-render
  setName('Alice');     // re-render
}, 1000);

// React 18: automatically batched — ONE re-render
setTimeout(() => {
  setCount(c => c + 1); // }
  setName('Alice');     // } batched → single re-render
}, 1000);

// Opt out with flushSync
import { flushSync } from 'react-dom';
flushSync(() => setCount(c => c + 1)); // immediate re-render
flushSync(() => setName('Alice'));      // immediate re-render`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['react18', 'batching', 'performance', 'setState'],
    tier: 'advanced',
  },
  {
    id: 'suspense-use-cases',
    question: 'What are the use cases for React Suspense?',
    answer: `Suspense shows a fallback UI while its children are "suspended" (waiting for something). Use cases: (1) Code splitting — React.lazy wraps a dynamic import; Suspense shows a spinner while the bundle loads. (2) Data fetching — in React 18+, libraries like React Query and Relay can trigger suspension; in React 19, use() with a Promise does this natively. (3) Images and resources — frameworks can suspend while critical assets load. Suspense boundaries are similar to error boundaries — place them at meaningful UI boundaries to control granularity of loading states.`,
    codeExample: `// Code splitting
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Dashboard />
    </Suspense>
  );
}

// React 19: data with use()
function UserCard({ userPromise }) {
  const user = use(userPromise); // suspends
  return <div>{user.name}</div>;
}

<Suspense fallback={<CardSkeleton />}>
  <UserCard userPromise={fetchUser(id)} />
</Suspense>`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['suspense', 'lazy', 'code-splitting', 'data-fetching'],
    tier: 'advanced',
  },
  {
    id: 'forwardref-pattern',
    question: 'When and why would you use forwardRef?',
    answer: `By default, React components don't expose their DOM nodes to parents. forwardRef lets a component receive a ref and forward it to a DOM element or another component. Use it when: building a reusable input/button component library where consumers need to focus/blur the underlying element; integrating with animation libraries that need direct DOM access; implementing useImperativeHandle to expose a component's imperative API. In React 19, ref can be passed as a regular prop — forwardRef is no longer required.`,
    codeExample: `import { forwardRef, useImperativeHandle, useRef } from 'react';

// Forward ref to underlying DOM element
const TextInput = forwardRef<HTMLInputElement, InputProps>(
  function TextInput({ label, ...props }, ref) {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} {...props} />
      </div>
    );
  }
);

// Expose custom API
const VideoPlayer = forwardRef(function VideoPlayer(props, ref) {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
  }));

  return <video ref={videoRef} {...props} />;
});`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['forwardRef', 'refs', 'useImperativeHandle', 'dom'],
    tier: 'advanced',
  },
  {
    id: 'memo-bailout',
    question: 'When does React.memo fail to prevent re-renders?',
    answer: `React.memo uses shallow comparison by default — it compares prop values with ===. It fails when: (1) Object or array props are created inline (new reference each render, even if contents are equal). (2) Function props are created inline (new function each render). (3) Children is a JSX element (new object each render). Fix by memoizing the problematic props with useMemo or useCallback in the parent. Alternatively, pass a custom comparison function as the second argument to memo.`,
    codeExample: `const List = memo(function List({ items, config, onSelect }) {
  console.log('render');
  return items.map(i => <li key={i.id} onClick={() => onSelect(i.id)}>{i.name}</li>);
});

function Parent() {
  // PROBLEM: new object and function every render → memo useless
  return <List items={data} config={{ sort: 'asc' }} onSelect={id => select(id)} />;
}

function ParentFixed() {
  // FIX: stable references
  const config = useMemo(() => ({ sort: 'asc' }), []);
  const onSelect = useCallback(id => select(id), []);
  return <List items={data} config={config} onSelect={onSelect} />;
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['memo', 'performance', 'shallow-comparison', 're-render'],
    tier: 'advanced',
  },
  {
    id: 'uselayouteffect-vs-useeffect',
    question: 'When should you use useLayoutEffect instead of useEffect?',
    answer: `useEffect fires asynchronously after the browser has painted — it's the right choice for most effects (data fetching, subscriptions, logging). useLayoutEffect fires synchronously after DOM mutations but before the browser paints — use it when you need to read a DOM measurement and apply a change before the user sees the initial render. Classic use cases: measuring element dimensions for tooltips/popovers, preventing flicker when applying scroll position, integrating third-party DOM libraries that must execute before paint. Never use useLayoutEffect for things that don't need DOM measurement — it blocks painting.`,
    codeExample: `// useEffect — flickers (renders at wrong position first, then corrects)
useEffect(() => {
  const rect = tooltipRef.current.getBoundingClientRect();
  setPosition(computePosition(rect)); // applied AFTER paint — visible jump
}, [target]);

// useLayoutEffect — no flicker (applied BEFORE paint)
useLayoutEffect(() => {
  const rect = tooltipRef.current.getBoundingClientRect();
  setPosition(computePosition(rect)); // applied before browser paints
}, [target]);`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['useLayoutEffect', 'useEffect', 'dom', 'painting', 'timing'],
    tier: 'advanced',
  },
  {
    id: 'server-components-boundaries',
    question: 'How do Server and Client Components interoperate?',
    answer: `In Next.js App Router (React 19), all components default to Server Components. Add "use client" to make a component and all its imports Client Components. The boundary: Server Components can import Client Components and pass serializable props to them. Client Components CANNOT import Server Components (they'd run on the client). However, Client Components can receive Server Component children via the children prop or other slot props — the Server Component is rendered on the server and the result (React tree) is passed as a prop.`,
    codeExample: `// Server Component (default, no directive)
async function ProductPage({ id }) {
  const product = await db.getProduct(id); // server-only
  return (
    <article>
      <h1>{product.name}</h1>
      {/* Client Component receives serializable props only */}
      <AddToCart productId={product.id} price={product.price} />
      {/* Pass Server Component as children to a Client Component */}
      <ClientLayout>
        <ProductDetails product={product} /> {/* Server Component */}
      </ClientLayout>
    </article>
  );
}

'use client';
// Client Component — receives children from server
function ClientLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div>{children}</div>; // Server content rendered here
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['server-components', 'client-components', 'react19', 'boundaries'],
    tier: 'advanced',
  },
  {
    id: 'react-use-hook',
    question: 'What is the use() hook in React 19 and how is it different from useEffect for data fetching?',
    answer: `use() reads the value of a Promise or Context in the render function. Unlike useEffect (which runs after render), use() runs during render and suspends the component until the Promise resolves. This means: no loading state boilerplate, no empty initial renders, and data is available on first meaningful render. Unlike useEffect, use() can be called conditionally. The Promise must be created outside the component (or memoized) — creating it inside render would create a new Promise every render, causing an infinite loop.`,
    codeExample: `// useEffect pattern: empty render → loading → data render (2+ renders)
function Profile({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUser(id).then(u => { setUser(u); setLoading(false); });
  }, [id]);
  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}

// use() pattern: one render with data (Suspense handles loading)
function Profile({ userPromise }) {
  const user = use(userPromise); // suspends until resolved
  return <div>{user.name}</div>;
}

// In parent — Promise created outside (stable reference)
function App() {
  const [id, setId] = useState(1);
  const userPromise = useMemo(() => fetchUser(id), [id]);
  return (
    <Suspense fallback={<Spinner />}>
      <Profile userPromise={userPromise} />
    </Suspense>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['use', 'react19', 'suspense', 'data-fetching', 'promises'],
    tier: 'advanced',
  },
  {
    id: 'react-concurrent-priority',
    question: 'How does React 18 prioritize updates in concurrent mode?',
    answer: `React 18 uses a scheduler with multiple priority lanes. Highest priority: user input (typing, clicking) — must respond immediately. Default priority: state updates from normal event handlers. Low priority: useTransition updates — can be interrupted by higher-priority updates. Background: useDeferredValue — runs when the browser is idle. React can interrupt a low-priority render mid-flight if a higher-priority update arrives (e.g., user types while a filtered list is rendering). This ensures the UI stays responsive even during expensive renders.`,
    codeExample: `function SearchPage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleInput(e) {
    // High priority — updates input field immediately
    setInput(e.target.value);

    // Low priority — can be interrupted if user types again
    startTransition(() => {
      setResults(heavySearch(e.target.value));
    });
  }

  return (
    <>
      <input value={input} onChange={handleInput} />
      {isPending ? <LoadingIndicator /> : <ResultsList results={results} />}
    </>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['concurrent', 'react18', 'useTransition', 'scheduling', 'priority'],
    tier: 'advanced',
  },
  {
    id: 'strict-mode-double-effect',
    question: 'Why does useEffect run twice in development with React 18 StrictMode?',
    answer: `React 18 StrictMode intentionally mounts, unmounts, and remounts components in development. This means effects run, cleanup runs, then effects run again — twice total. The purpose: simulate an upcoming React feature where components may be unmounted and remounted while preserving state. If your app breaks when an effect runs twice, you have a missing cleanup bug. The fix is always to return a cleanup function that completely undoes what the setup function did. This only happens in development — StrictMode has zero effect on production.`,
    codeExample: `// BROKEN: no cleanup — subscription duplicated
useEffect(() => {
  socket.on('message', handleMessage); // added twice in dev!
}, []);

// FIXED: cleanup removes the listener
useEffect(() => {
  socket.on('message', handleMessage);
  return () => socket.off('message', handleMessage); // cleanup
}, []);

// BROKEN: increment fires twice in dev
useEffect(() => {
  analytics.pageView++; // counted twice!
}, []);

// For non-reversible ops: skip in strict mode (use a ref flag)
const didInit = useRef(false);
useEffect(() => {
  if (didInit.current) return;
  didInit.current = true;
  analytics.pageView++;
}, []);`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['strict-mode', 'useEffect', 'cleanup', 'react18', 'development'],
    tier: 'advanced',
  },
  {
    id: 'useoptimistic-pattern',
    question: 'What is useOptimistic and when would you use it?',
    answer: `useOptimistic (React 19) lets you show a temporary "optimistic" state while an async mutation is in progress, reverting automatically if it fails. This eliminates the delay between user action and visible feedback. Pattern: the user performs an action, the UI immediately shows the expected result, the server request happens in parallel, and either the real data confirms the optimistic state or an error rolls it back. Common use cases: likes/reactions, todo item completion, shopping cart updates.`,
    codeExample: `import { useOptimistic, useTransition } from 'react';

function LikeButton({ post }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    post.likes,
    (currentLikes, delta) => currentLikes + delta
  );
  const [, startTransition] = useTransition();

  function handleLike() {
    startTransition(async () => {
      addOptimisticLike(+1); // immediate — shown before server responds
      try {
        await likePost(post.id); // actual server call
      } catch {
        // useOptimistic auto-reverts to post.likes on error
      }
    });
  }

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes} {/* shows +1 immediately */}
    </button>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['useOptimistic', 'react19', 'optimistic-ui', 'mutations'],
    tier: 'advanced',
  },
  {
    id: 'compound-components-qna',
    question: 'What is the compound component pattern and when should you use it?',
    answer: `Compound components are a set of related components that share implicit state through React Context. The parent owns the state; children consume it without needing explicit props threaded through. The API is declarative — consumers assemble children in any order without understanding the internal state model.

Use it when: a component has multiple sub-parts that need to coordinate (Tabs/Tab/Panel, Select/Option, Accordion/Item), and you want consumers to compose them freely rather than driving everything through a single config prop. The tradeoff is added complexity inside the implementation versus a cleaner external API.`,
    codeExample: `const TabsCtx = createContext(null);

function Tabs({ defaultTab, children }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsCtx.Provider value={{ active, setActive }}>
      {children}
    </TabsCtx.Provider>
  );
}

function Tab({ value, children }) {
  const { active, setActive } = useContext(TabsCtx);
  return (
    <button
      aria-selected={active === value}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

function Panel({ value, children }) {
  const { active } = useContext(TabsCtx);
  return active === value ? <div>{children}</div> : null;
}

Tabs.Tab = Tab;
Tabs.Panel = Panel;`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['compound-components', 'context', 'patterns', 'composition'],
    tier: 'advanced',
  },
  {
    id: 'state-management-choice',
    question: 'How do you decide between useState, Context, Zustand, and Redux?',
    answer: `Choose based on scope, update frequency, and team size.

useState/useReducer: UI state owned by one component. Zero overhead, co-located logic.

Context API: Low-frequency global values — theme, locale, auth. Not built for high-frequency updates because every context consumer re-renders on every value change. Splitting contexts or memoizing values mitigates this.

Zustand: Lightweight global state with selective subscriptions. Components subscribe to slices — only re-render if their slice changes. Best for moderate shared state without Redux ceremony.

React Query / SWR: Server-state. Async fetching, caching, background refetching, pagination. Replaces "fetch in useEffect + loading/error state" for most API data patterns.

Redux Toolkit: Large teams, strict conventions, complex async flows, or need for devtools with time-travel debugging. The boilerplate cost is justified at scale.

Rule of thumb: start local, lift when needed, reach for Zustand before Redux.`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['state-management', 'zustand', 'redux', 'context', 'react-query', 'architecture'],
    tier: 'advanced',
  },
  {
    id: 'performance-profiling',
    question: 'How do you identify and fix React performance problems in production?',
    answer: `Identify first, then fix. Guessing wastes time.

Tools: React DevTools Profiler shows which components rendered, how long they took, and why (what prop/state changed). Chrome DevTools Performance panel shows frame timing and long tasks.

Common culprits: (1) Unnecessary re-renders — parent re-renders cause child re-renders even when props didn't change. Fix: React.memo on children, useCallback/useMemo on passed values. (2) Large list rendering — rendering 1000+ items at once. Fix: virtualization (react-window, TanStack Virtual). (3) Expensive renders — heavy computation on every render. Fix: useMemo for derived data. (4) Too many state updates — multiple setStates triggering multiple renders. Fix: batch them or use useReducer.

Measure Core Web Vitals (LCP, CLS, INP) in production — user-facing performance, not just synthetic benchmarks.`,
    codeExample: `// Profiler API — measure programmatically
import { Profiler } from 'react';

<Profiler
  id="ProductList"
  onRender={(id, phase, actualDuration) => {
    if (actualDuration > 16) { // >1 frame = janky
      console.warn(\`\${id} (\${phase}) took \${actualDuration.toFixed(1)}ms\`);
    }
  }}
>
  <ProductList items={items} />
</Profiler>`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['performance', 'profiling', 'react-memo', 'virtualization', 'core-web-vitals'],
    tier: 'advanced',
  },
  // ─── Fresher additions ───────────────────────────────────────────────────
  {
    id: 'jsx-rules-and-limits',
    question: 'What are the rules and limitations of JSX?',
    answer: `JSX is syntactic sugar for React.createElement() calls. Key rules:

1. Single root element — each JSX expression must return one root. Use a Fragment (<> </> or <React.Fragment>) to avoid adding an extra DOM node.
2. Expressions in curly braces — use {expr} for JS expressions. Statements (if, for) don't work directly; use ternary or && instead.
3. className, not class — HTML attributes are camelCase in JSX (htmlFor, onClick, tabIndex).
4. Self-closing tags — elements with no children must be self-closed (<img />, <br />).
5. Boolean attributes — <input disabled /> is equivalent to disabled={true}.
6. Conditional rendering — falsy values: false, null, undefined don't render. Be careful with 0 — it does render!`,
    codeExample: `// Fragment avoids extra DOM node
function List({ items }) {
  return (
    <>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

// Conditional rendering gotcha
const count = 0;
return <div>{count && <Badge />}</div>; // renders "0" ← bug!
return <div>{count > 0 && <Badge />}</div>; // correct
return <div>{count ? <Badge /> : null}</div>; // also correct`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['jsx', 'fragments', 'conditional-rendering', 'basics'],
    tier: 'core',
  },
  {
    id: 'props-vs-state-difference',
    question: 'What is the difference between props and state in React?',
    answer: `Props are inputs passed from parent to child — read-only, immutable inside the component. A component cannot modify its own props. They flow downward (one-way data flow).

State is internal, mutable data owned by the component. Only the component itself can update its state via the setter from useState. When state changes, React schedules a re-render.

A useful mental model: props are like function arguments; state is like variables declared inside the function. Choose state for data that changes over time and owned by that component; choose props for passing data and behavior down from parent.

Rule: if a value can be derived from props or other state, don't put it in state — compute it during render.`,
    codeExample: `// Props — parent controls, child reads only
function Button({ label, onClick, disabled = false }) {
  // ✗ props.label = 'other'; // TypeError — props are read-only
  return <button disabled={disabled} onClick={onClick}>{label}</button>;
}

// State — component owns, controls its own data
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount); // state

  // Derived value — NOT state (computed from count)
  const isNegative = count < 0;

  return (
    <div>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <span style={{ color: isNegative ? 'red' : 'inherit' }}>{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['props', 'state', 'data-flow', 'fundamentals'],
    tier: 'core',
  },
  {
    id: 'react-event-handling',
    question: 'How does event handling work in React?',
    answer: `React uses synthetic events — cross-browser wrappers around native DOM events. They're normalized so they work identically in all browsers.

Event handlers are camelCase props (onClick, onChange, onSubmit). Pass a function reference, not a function call.

React 17+ attaches event listeners to the root container element (not document), which matters for portals and microfrontend isolation.

For form inputs, onChange fires on every keystroke (unlike native change which fires on blur). For performance with complex handlers, wrap them in useCallback to maintain stable references.`,
    codeExample: `// Pass function reference, not a call
<button onClick={handleClick}>OK</button>     // ✓
<button onClick={handleClick()}>OK</button>   // ✗ fires on render!

// Passing arguments — wrap in arrow function
<button onClick={() => handleDelete(item.id)}>Delete</button>

// Synthetic event object
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); // prevents page reload
  const data = new FormData(e.currentTarget);
  submit(data);
}

// onChange — fires every keystroke
function SearchBox() {
  const [query, setQuery] = useState('');
  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['events', 'synthetic-events', 'event-handling', 'forms'],
    tier: 'core',
  },
  {
    id: 'react-fragments-portals',
    question: 'What are React Fragments and when would you use Portals?',
    answer: `Fragments let you return multiple elements without adding a wrapper DOM node. The short syntax <> </> is equivalent to <React.Fragment>. Use the long form when you need a key prop (in lists).

Portals (ReactDOM.createPortal) render children into a DOM node that exists outside the component's DOM hierarchy, while keeping them in the React tree. The portal's children still receive context and events bubble up through the React tree as normal.

Use portals for: modals and dialogs (to escape overflow: hidden or z-index stacking contexts), tooltips, notification toasts, dropdown menus — anything that needs to visually "escape" its container.`,
    codeExample: `// Fragment — no extra DOM node
function TableRow({ data }) {
  return (
    <>
      <td>{data.name}</td>
      <td>{data.value}</td>
    </>
  );
}

// Fragment with key (lists)
function List({ items }) {
  return items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.definition}</dd>
    </React.Fragment>
  ));
}

// Portal — renders into document.body, escaping overflow:hidden
function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,
    document.body // target DOM node
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'fresher',
    tags: ['fragments', 'portals', 'dom', 'modals'],
    tier: 'core',
  },
  // ─── Experienced additions ────────────────────────────────────────────────
  {
    id: 'useref-use-cases',
    question: 'What are the use cases for useRef?',
    answer: `useRef returns a mutable container { current: value } that persists across renders without triggering re-renders when mutated.

Two main use cases:

1. DOM access — assign ref={myRef} to a JSX element. React sets myRef.current to the DOM node after mount. Use for: focus management, measuring dimensions, integrating third-party DOM libraries, scroll control.

2. Storing non-reactive values — values you want to persist across renders without causing re-renders: previous values, timer IDs, instance variables, WebSocket/abort controller references.

Key difference from useState: updating .current doesn't schedule a re-render. Never read or write .current during rendering — it bypasses React's tracking.`,
    codeExample: `// DOM access — auto-focus on mount
function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} type="search" />;
}

// Storing timer ID (no re-render needed)
function Debounced() {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  function handleChange(value: string) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(value), 300);
  }

  // Storing previous prop value
  const prevCount = useRef(count);
  useEffect(() => { prevCount.current = count; }, [count]);
  const increased = count > prevCount.current;

  return <input onChange={e => handleChange(e.target.value)} />;
}`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['useRef', 'refs', 'dom', 'non-reactive', 'focus'],
    tier: 'core',
  },
  {
    id: 'usereducer-when-to-use',
    question: 'When should you use useReducer instead of useState?',
    answer: `Prefer useReducer when:
1. Next state depends on previous state and multiple actions update it differently.
2. You have several related state variables that change together.
3. State transitions have complex logic that you want to keep outside the component (pure, testable).
4. You need to pass the dispatch function deep in the tree (dispatch is stable, unlike setter functions created with useState).

useState is simpler and fine for independent, simple values. useReducer is better when the logic resembles a state machine with well-defined transitions.`,
    codeExample: `type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_DATA'; data: User[] }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'RESET' };

type State = { status: 'idle' | 'loading' | 'success' | 'error'; data: User[]; error: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, status: 'loading', error: null };
    case 'SET_DATA':    return { status: 'success', data: action.data, error: null };
    case 'SET_ERROR':   return { ...state, status: 'error', error: action.error };
    case 'RESET':       return { status: 'idle', data: [], error: null };
    default:            return state;
  }
}

function UserList() {
  const [state, dispatch] = useReducer(reducer, { status: 'idle', data: [], error: null });

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    fetchUsers()
      .then(data => dispatch({ type: 'SET_DATA', data }))
      .catch(err => dispatch({ type: 'SET_ERROR', error: err.message }));
  }, []);
}`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['useReducer', 'state', 'state-machine', 'complex-state'],
    tier: 'core',
  },
  {
    id: 'custom-hooks-pattern',
    question: 'What is the custom hook pattern and when should you extract one?',
    answer: `A custom hook is a function whose name starts with "use" and calls other hooks. It lets you extract stateful logic from components so the same logic can be shared without changing the component hierarchy (unlike HOCs or render props).

Extract a custom hook when: the same stateful logic appears in multiple components, a component has too much hook code making it hard to read, or you want to test state logic independently.

Custom hooks can return any value — the component consuming the hook decides what to do with it. Unlike HOCs, there's no wrapper component in the tree.`,
    codeExample: `// useLocalStorage — persisted state
function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });

  const setAndPersist = useCallback((next: T | ((prev: T) => T)) => {
    setValue(prev => {
      const newVal = typeof next === 'function' ? (next as Function)(prev) : next;
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    });
  }, [key]);

  return [value, setAndPersist] as const;
}

// useFetch — data fetching with loading/error state
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    fetch(url, { signal: ctrl.signal })
      .then(r => r.json()).then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e); })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [url]);

  return { data, loading, error };
}`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['custom-hooks', 'abstraction', 'reusability', 'patterns'],
    tier: 'advanced',
  },
  {
    id: 'context-performance-patterns',
    question: 'What are common performance pitfalls with React Context and how do you fix them?',
    answer: `Every consumer of a context re-renders when the context value changes — even if the component only uses part of the value. Common pitfall: putting many values in one context and updating frequently.

Solutions:
1. Split context by update frequency — separate AuthContext (changes rarely) from CartContext (changes often).
2. Memoize the context value with useMemo to prevent creating a new object on every parent render.
3. Use specialized state managers (Zustand, Jotai) for high-frequency state — they support selective subscriptions.
4. The "context selector" pattern with useRef + useSyncExternalStore for fine-grained subscriptions.`,
    codeExample: `// Bad — one context, every consumer re-renders on any change
const AppContext = createContext({ theme, user, cart, notifications });

// Good — split by frequency
const ThemeContext = createContext(theme);      // rarely changes
const UserContext  = createContext(user);       // on login/logout
const CartContext  = createContext(cartState);  // often changes

// Memoize value to prevent unnecessary renders
function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Without useMemo: new object every render → all consumers re-render
  const value = useMemo(
    () => ({ cart, dispatch }),
    [cart] // only creates new object when cart changes
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['context', 'performance', 're-renders', 'memoization'],
    tier: 'advanced',
  },
  // ─── Expert / Architect additions ─────────────────────────────────────────
  {
    id: 'react-accessibility-patterns',
    question: 'What are key accessibility patterns to implement in React applications?',
    answer: `React apps have unique accessibility challenges because of dynamic content, SPA navigation, and focus management.

Focus management: after modal opens, move focus into it. After it closes, return focus to the trigger element. After route navigation, move focus to the main heading or new content.

Announcements: use aria-live regions for dynamic updates (search results, notifications). role="status" for polite, role="alert" for assertive.

Keyboard navigation: ensure all interactive elements are focusable and operable via keyboard. Custom widgets (dropdown, combobox, tabs) must implement ARIA patterns with correct key handlers.

Skip links: provide a "Skip to main content" link as the first focusable element to let keyboard users bypass navigation.`,
    codeExample: `// Focus management in modal
function Modal({ isOpen, onClose, children }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus(); // trap focus on open
    }
  }, [isOpen]);

  return (
    <dialog
      open={isOpen}
      aria-modal="true"
      aria-labelledby="modal-title"
      onClose={onClose}
    >
      <h2 id="modal-title">Confirm Action</h2>
      {children}
      <button ref={closeButtonRef} onClick={onClose}>Close</button>
    </dialog>
  );
}

// aria-live region for dynamic updates
function SearchResults({ results, loading }) {
  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        {loading ? 'Loading...' : \`\${results.length} results found\`}
      </div>
      <ul>{results.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['accessibility', 'a11y', 'aria', 'focus-management', 'keyboard'],
    tier: 'advanced',
  },
  {
    id: 'react-testing-strategy',
    question: 'What is the recommended testing strategy for React applications?',
    answer: `Follow the Testing Trophy (Kent C. Dodds): most tests should be integration tests, fewer unit tests, and fewer still E2E tests.

Integration tests (React Testing Library): render a component tree, interact as a user would (click, type, wait for updates), assert on visible output. RTL's guiding principle: "test behavior, not implementation." Use queries in priority: getByRole > getByLabelText > getByText > getByTestId.

Unit tests: pure utility functions, custom hooks (via renderHook), reducers.

E2E tests (Playwright/Cypress): critical user flows — checkout, signup, login. Run on real browsers against a real (or staging) server.

Avoid testing implementation details: internal state, component names, CSS classes. Tests that break on refactors without behavior changing are a liability.`,
    codeExample: `// Integration test with React Testing Library
import { render, screen, userEvent } from '@testing-library/react';

test('submits search and displays results', async () => {
  const user = userEvent.setup();
  render(<SearchPage />);

  // Interact as a user
  await user.type(screen.getByRole('searchbox'), 'react hooks');
  await user.click(screen.getByRole('button', { name: /search/i }));

  // Assert on visible output — not internal state
  expect(await screen.findByText('10 results found')).toBeInTheDocument();
  expect(screen.getByRole('list')).toBeInTheDocument();
});

// Custom hook unit test
import { renderHook, act } from '@testing-library/react';
test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(0));
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['testing', 'react-testing-library', 'jest', 'integration-tests', 'e2e'],
    tier: 'advanced',
  },
  {
    id: 'react-ssr-ssg-tradeoffs',
    question: 'What are the tradeoffs between SSR, SSG, ISR, and CSR in Next.js?',
    answer: `CSR (Client-Side Rendering): React renders entirely in the browser. Best for: dashboards behind auth, highly interactive apps. Problems: slow initial load (blank page until JS parses), poor SEO, bad LCP.

SSG (Static Site Generation): HTML generated at build time. Best for: marketing pages, docs, blogs with predictable content. Instant TTFB, great SEO, CDN-cacheable. Problem: stale until next build.

SSR (Server-Side Rendering): HTML generated per request on the server. Best for: personalized pages, frequently changing data. Fresh on every request, good SEO. Problem: higher TTFB, server load.

ISR (Incremental Static Regeneration): SSG with automatic revalidation after a time window. Best of both: fast delivery + reasonably fresh data.

React Server Components (RSC) in Next.js 13+ blur the lines further — individual components choose where they execute.`,
    codeExample: `// app/blog/[slug]/page.tsx — Next.js 15 (App Router)

// SSG: build-time static with 1-hour revalidation (ISR)
export const revalidate = 3600;

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.getPost(slug); // server-only, no client bundle cost
  return <Article post={post} />;
}

// SSR: dynamic per-request (opt out of caching)
export const dynamic = 'force-dynamic';

// CSR: client-only data (after hydration)
'use client';
function LiveStats() {
  const { data } = useSWR('/api/stats'); // fetches in browser
  return <div>{data?.visitors}</div>;
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['ssr', 'ssg', 'isr', 'csr', 'nextjs', 'rendering-strategies'],
    tier: 'advanced',
  },
  {
    id: 'micro-frontends-react',
    question: 'How do you architect micro-frontends with React?',
    answer: `Micro-frontends split a large frontend into independently deployable pieces, each owned by a separate team.

Module Federation (Webpack 5 / Rspack): the primary approach. A "host" app loads "remotes" at runtime — each remote exposes React components. Teams deploy independently; the host loads whatever is live. Shared dependencies (React, ReactDOM) can be configured to avoid duplicate bundles.

Alternative approaches: iframes (strongest isolation, hardest communication), Web Components (framework-agnostic), build-time composition (npm packages — simpler but requires coordinated releases).

Key challenges: shared state (use URL params or postMessage), shared design system (publish as a package or a federated remote), authentication (session sharing via cookies, not localStorage), routing (each remote manages its own sub-routes).`,
    codeExample: `// webpack.config.js — Remote app (Team B's checkout)
new ModuleFederationPlugin({
  name: 'checkout',
  filename: 'remoteEntry.js',
  exposes: {
    './CheckoutFlow': './src/components/CheckoutFlow',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});

// webpack.config.js — Host app (Shell)
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    checkout: 'checkout@https://checkout.example.com/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});

// Shell app — loads remote component at runtime
const CheckoutFlow = lazy(() => import('checkout/CheckoutFlow'));

function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <CheckoutFlow userId={user.id} />
    </Suspense>
  );
}`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['micro-frontends', 'module-federation', 'architecture', 'webpack', 'scalability'],
    tier: 'advanced',
  },
  {
    id: 'hydration-explained',
    question: 'What is hydration in React and why can it fail?',
    answer: `Hydration is the process where React attaches event listeners and makes server-rendered HTML interactive on the client. The server renders a complete HTML string (fast first paint, SEO-friendly). The client receives that HTML, React renders the same component tree in memory, and then walks the existing DOM matching nodes — instead of creating new DOM nodes, it reuses the server-rendered ones and attaches event handlers. Hydration fails (mismatch error) when the server-rendered HTML doesn't match what React renders on the client. Common causes: using browser-only APIs (window, localStorage) during render without guards, rendering dates/times that differ between server and client timezones, conditional rendering based on Math.random() or Date.now(), and browser extensions that modify the DOM before hydration. React 18 recovers from mismatches in production but logs warnings in development.`,
    codeExample: `// Hydration mismatch — bad: window not available on server
function Component() {
  return <div>{window.innerWidth}px</div>; // throws on server
}

// Fix: guard with useEffect (runs client-only)
function Component() {
  const [width, setWidth] = useState(0);
  useEffect(() => setWidth(window.innerWidth), []);
  return <div>{width}px</div>;
}

// Fix: suppress mismatch warning for known differences
<time suppressHydrationWarning>
  {new Date().toLocaleString()}
</time>

// React 18 hydrateRoot (replaces ReactDOM.hydrate)
import { hydrateRoot } from 'react-dom/client';
hydrateRoot(document.getElementById('root'), <App />);`,
    codeLanguage: 'jsx',
    difficulty: 'experienced',
    tags: ['hydration', 'ssr', 'hydration-mismatch', 'server-rendering'],
    tier: 'advanced',
  },
  {
    id: 'selective-hydration-streaming',
    question: 'What is selective hydration and how does React 18 streaming SSR work?',
    answer: `Traditional SSR hydrates the entire page at once — the client must download and execute all JS before any part of the page becomes interactive. React 18 introduces two improvements. Streaming SSR: the server sends HTML in chunks as each Suspense boundary resolves, so the browser can render and display content progressively instead of waiting for the full page. Selective hydration: React prioritizes hydrating whichever part the user is interacting with first — if a user clicks a button in a section that hasn't hydrated yet, React hydrates that section immediately before others. Together these mean users see content faster, can interact with loaded parts sooner, and slow data-fetching components don't block the rest of the page.`,
    codeExample: `// Suspense boundaries = hydration units
// Server can stream each boundary independently
function Page() {
  return (
    <Layout>
      <Suspense fallback={<NavSkeleton />}>
        <Nav />           {/* streamed + hydrated first */}
      </Suspense>

      <Suspense fallback={<HeroSkeleton />}>
        <Hero />          {/* streamed when ready */}
      </Suspense>

      <Suspense fallback={<FeedSkeleton />}>
        <SlowFeed />      {/* streams last, doesn't block above */}
      </Suspense>
    </Layout>
  );
}

// User clicks <Hero> before <SlowFeed> hydrates?
// React selectively hydrates <Hero> first`,
    codeLanguage: 'jsx',
    difficulty: 'expert',
    tags: ['selective-hydration', 'streaming-ssr', 'suspense', 'react-18', 'performance'],
    tier: 'advanced',
  },
  {
    id: 'client-side-code-protection',
    question: 'How do you prevent your client-side source code from being easily stolen?',
    answer: `You cannot fully prevent it — if the browser can run it, a determined person can read it. The correct answer has two parts: architecture and obfuscation. Architecture is the real protection: any logic you truly cannot expose should live on the server and only be accessible via API. Secret algorithms, pricing rules, and credentials must never ship to the browser. For what does run client-side: disable source maps in production builds (sourceMap: false in tsconfig.json and sourcemap: false in your bundler) — source maps reconstruct your original TypeScript in DevTools. If you need source maps for error monitoring, generate them, upload to Sentry/Datadog via CLI, then delete them before deploying. Beyond that, code obfuscators (javascript-obfuscator) make reverse engineering significantly harder than minification alone, but still not impossible — they raise the cost, not a hard barrier. Add copyright notices for legal deterrence.`,
    codeExample: `// tsconfig.json — disable in production
{
  "compilerOptions": {
    "sourceMap": false
  }
}

// vite.config.ts
export default defineConfig({
  build: { sourcemap: false }
});

// Best of both worlds: generate maps, upload privately, delete
// (in CI pipeline)
// 1. Build with sourcemaps
// 2. sentry-cli sourcemaps upload ./dist --org=myorg --project=myapp
// 3. rm -rf dist/**/*.map
// 4. Deploy dist/ — no maps exposed to users

// Architecture: never put secrets in frontend code
const API_KEY = process.env.SECRET_KEY; // server only
// Never: const API_KEY = 'sk-...' in React code`,
    codeLanguage: 'javascript',
    difficulty: 'experienced',
    tags: ['security', 'source-maps', 'obfuscation', 'client-side', 'tsconfig'],
    tier: 'advanced',
  },
];

export default reactQna;
