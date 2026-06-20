import type { QnaItem } from '@/types/content';

const reactQna: QnaItem[] = [
  {
    id: 'virtual-dom-purpose',
    question: 'What is the Virtual DOM and why does React use it?',
    answer: `The Virtual DOM (VDOM) is a plain JavaScript object that describes what the real DOM should look like. React keeps this in memory. When state changes, React builds a new VDOM and compares it to the previous one — this comparison process is called reconciliation. React then figures out the smallest set of real DOM changes needed and applies only those. This is faster than rebuilding the entire DOM from scratch because real DOM operations are slow — browsers have to recalculate layout and repaint the page. The VDOM also lets React group multiple updates and apply them in one go, and it is why the same React code can power non-browser targets like React Native and server rendering.`,
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
    answer: `When an effect sets up a connection to something external — an event listener, a WebSocket, a timer, or a fetch request — you need to undo that setup when the component is removed from the page, or before the effect runs again with new values. Without cleanup, you end up with memory leaks (resources that stay in use after they are no longer needed), duplicate subscriptions (the same listener registered twice), or state updates running on a component that is no longer on the page. To clean up, return a function from useEffect. React calls this function before running the effect again and when the component is removed. React 18 StrictMode runs effects twice in development on purpose. If your effect breaks when run twice, you have a real cleanup bug to fix.`,
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
    answer: `useMemo caches the result of a function call — it gives you back a value. useCallback caches the function itself — it gives you back a stable function reference. They are two sides of the same idea: useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). Use useMemo when a computation is slow (filtering a large list, processing data) and you want to avoid repeating it on every render. Use useCallback when you pass a function as a prop to a child component you are trying to prevent from re-rendering, or when you include a function in a useEffect dependency array and want it to stay stable. Neither hook should be your default — add them only when you have spotted a real performance issue.`,
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
    answer: `Keys tell React which item in the list corresponds to which item from the previous render. Without a key, React starts re-rendering everything from the first position that changed. With stable, unique keys — usually IDs from your database — React can reuse existing DOM nodes for items that did not change and only create, move, or remove what actually needs to change. Using the array index as a key causes bugs when items are reordered, inserted, or deleted. When you prepend an item, every index shifts, and React thinks every item changed. Keys only need to be unique within the same list, not across the whole page.`,
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
    answer: `Lifting state up means moving state to the nearest parent component that both components needing it have in common. When two sibling components need to share the same piece of data, put the state in their parent and pass it down as props. This keeps a single source of truth — there is only one place where the data lives and changes, which prevents the two components from getting out of sync. Lift state when multiple components need to react to the same data, when a child needs to change something that affects a sibling, or when you need to combine data from multiple places to derive a value.`,
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
    answer: `Prop drilling happens when you pass data through several intermediate components that do not actually use it — they just forward it along. There are a few solutions in order of increasing complexity: (1) Component composition — restructure so the component that needs the data is closer to where the data lives, without needing intermediaries. (2) Context — React's built-in way to share a value with any component in a part of the tree, without passing props through every level. (3) State management libraries — Zustand gives you selective subscriptions (a component only re-renders when its specific piece of state changes). Redux Toolkit is for larger teams that need strict conventions. Start with the simplest solution. Context works well for values that change rarely (theme, language, logged-in user). Reach for a library when the state changes often or the logic gets complex.`,
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
    answer: `A controlled component is a form input whose current value comes from React state. Every time the user types, onChange fires, you call setState with the new value, and React re-renders the input showing that value. React is always in charge of what the input shows. The benefit is full control: you can validate on each keystroke, disable the submit button until the form is valid, or format the input as the user types. The tradeoff is more code. An uncontrolled component stores its value in the browser's DOM rather than in React. You read the value with a ref (ref.current.value) — usually only when the form is submitted. This means less code and fewer re-renders. For simple forms, uncontrolled is fine. For complex validation or when one field's value affects another, controlled is the better choice.`,
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
    answer: `Error Boundaries are class components that catch JavaScript errors thrown during rendering anywhere in their child component tree. They implement two special methods: getDerivedStateFromError (which receives the error and returns new state to show a fallback UI) and componentDidCatch (which receives the error and component stack trace, good for logging to an error monitoring service). Limitations: Error Boundaries can only be class components — there is no hook that does the same thing. They do not catch errors in event handlers (use a regular try/catch block there), errors inside async operations like Promises, errors during server-side rendering, or errors thrown by the Error Boundary component itself.`,
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
    answer: `React tracks hook state by the order in which hooks are called on each render. React does not know hook names or variables — it only knows "the first useState call, the second useState call," and so on. If you call a hook inside an if statement, the order can change between renders. React then tries to match the wrong hook state to the wrong hook, which leads to bugs or a thrown error. The Rules of Hooks: always call hooks at the top level of your function, never inside conditionals, loops, or nested functions. Only call them inside React function components or custom hooks. If you need conditional behavior, put the condition inside the hook or pass it as an argument. Note: React 19's use() is an exception — it can be called conditionally because it works differently from regular hooks.`,
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
    answer: `Batching means React groups multiple setState calls together and runs a single re-render for all of them, instead of re-rendering once per call. Before React 18, this only happened inside React event handlers (like onClick). If you called setState multiple times inside a setTimeout or a Promise, you got a separate re-render for each call. React 18 extends automatic batching everywhere — setState calls inside setTimeout, Promises, and native DOM event listeners are all grouped by default. This means fewer re-renders and better performance with no code changes. If you ever need to force a synchronous re-render outside of batching, use ReactDOM.flushSync.`,
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
    answer: `Suspense lets you show a fallback UI (like a spinner or skeleton screen) while a part of your component tree is not ready yet. A component "suspends" when it tells React "I am waiting for something — show the fallback until I am ready." Use cases: (1) Code splitting — React.lazy loads a component's code on demand. Suspense shows a fallback while the code bundle is downloading. (2) Data fetching — in React 18+, libraries like React Query and Relay can trigger suspension. In React 19, use() with a Promise does this natively without any library. (3) Images and other resources — frameworks can suspend while critical assets finish loading. Think of Suspense boundaries like Error Boundaries — place them at meaningful points in your UI to control exactly which part shows a loading state.`,
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
    answer: `By default, when you pass a ref to a component, React does not do anything with it — the component's internal DOM nodes stay hidden from the parent. forwardRef is a wrapper that lets a component accept a ref from its parent and attach it to one of its own DOM elements. This is useful when: you are building a reusable component library and consumers need to focus or measure the underlying input or button; you are integrating with an animation library that needs direct DOM access; or you want to expose a controlled API with useImperativeHandle (which lets you decide exactly what methods the parent can call through the ref). In React 19, ref can be passed as a plain prop, so forwardRef is no longer needed in most cases.`,
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
    answer: `React.memo compares props using shallow equality — it checks each prop with ===. This works for primitive values (numbers, strings, booleans), but fails for objects, arrays, and functions because JavaScript creates a brand-new reference for each of these on every render, even if the contents look identical. React.memo sees a new reference and decides the props changed. Common cases where memo stops working: (1) object or array props defined inline — new reference every render. (2) Function props defined inline — new function every render. (3) JSX passed as children — new object every render. The fix is to stabilize those references in the parent: useMemo for objects and arrays, useCallback for functions. As a last resort, you can pass a custom comparison function as the second argument to memo to control exactly what counts as "equal."`,
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
    answer: `useEffect runs after the browser has already drawn the updated content to the screen. This is the right choice for most effects — data fetching, setting up subscriptions, logging. useLayoutEffect runs after React updates the DOM but before the browser draws anything. Use it when you need to measure a DOM element and apply a change based on that measurement before the user sees anything — if you wait until after paint, the user sees a flicker as the position or size corrects itself. Classic use cases: measuring element dimensions for tooltips or popovers that need to position themselves, applying scroll position after navigation, integrating third-party DOM libraries that must run before the first paint. Do not use useLayoutEffect for anything that does not involve reading or writing the DOM immediately — it blocks the browser from painting, which can make the page feel slow.`,
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
    answer: `In Next.js App Router (React 19), every component is a Server Component by default — it runs on the server and its code never reaches the browser. Add "use client" at the top of a file to make that component and everything it imports a Client Component that runs in the browser. The boundary works one way: Server Components can import and use Client Components, passing them serializable (JSON-compatible) props. Client Components cannot import Server Components because Server Components are server-only code. However, a Client Component can receive a Server Component as children or through another prop — the Server Component is rendered on the server first, and the resulting React tree is passed through as a prop. The Server Component's output arrives in the Client Component without any server-only code reaching the browser.`,
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
    answer: `use() is a React 19 function that reads a Promise or Context value directly inside your render function. Unlike useEffect, which runs after render, use() runs during render. If the Promise is not yet resolved, React pauses (suspends) the component and shows the nearest Suspense fallback. When the Promise resolves, React re-renders the component with the data ready. This removes the need for separate loading state variables and the empty initial render you get with useEffect. Unlike regular hooks, use() can be called inside an if statement. One important rule: the Promise must be created outside the component (or wrapped in useMemo inside it). If you create the Promise directly inside render, React creates a brand-new Promise on every render and the component loops forever.`,
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
    answer: `React 18 has a built-in scheduler that assigns a priority level to every update. Highest priority: user input like typing and clicking — these must feel instant. Normal priority: state updates from regular event handlers. Low priority: updates wrapped in startTransition — React will work on these but can pause and cancel them if something more urgent arrives. Background priority: useDeferredValue — runs only when the browser has idle time. This means React can start rendering an expensive list update, get interrupted when the user types a new character, immediately process the typing (high priority), and then restart the list render with the new value. The user never sees the page freeze.`,
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
    answer: `React 18 StrictMode (a development-only tool) deliberately mounts, unmounts, and mounts your component again right at startup. Because of this, every effect runs once, its cleanup runs, then the effect runs a second time — two full cycles total. The reason is to prepare for a future React feature where components might be unmounted and remounted while keeping their state. If your app breaks during that second cycle, you have a cleanup bug. The fix is always the same: return a cleanup function from useEffect that completely undoes what the setup code did — if you added an event listener, remove it; if you started a connection, close it. This double-mount only happens in development. StrictMode has no effect on production builds.`,
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
    answer: `useOptimistic (React 19) lets you show an immediate, temporary UI update while a server request is still in progress. Instead of waiting for the server to respond before updating the UI, you show the user the expected result right away. If the server responds successfully, the real data takes over. If it fails, useOptimistic automatically reverts to the original value. This pattern — showing the expected result immediately, then confirming or rolling back — is called an optimistic update. Common use cases: toggling a like button, checking off a to-do item, updating a cart quantity. It makes these interactions feel instant even over a slow connection.`,
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
    answer: `Compound components are a group of related components that work together and share state through React Context. The parent component owns the state and provides it through a Context. The child components read from that Context directly — no props need to be passed between them. The consumer (the developer using your component) can arrange the children in any order they want without knowing how the internal state works.

Use this pattern when a component naturally has multiple coordinating parts: Tabs with Tab and Panel children, a Select with Options, an Accordion with Items. The alternative is a single component driven by a config prop (tabs={[...]}) — that works but gives the consumer less flexibility over layout. The tradeoff of compound components is that the implementation is more complex, but the external API is much cleaner.`,
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
    answer: `Choose based on who needs the state, how often it changes, and whether it comes from a server.

useState/useReducer: UI state owned by one component. No setup required, and the logic lives right next to the component that uses it.

Context API: Global values that change rarely — theme, language, the logged-in user. Not designed for high-frequency updates because every component reading the context re-renders whenever the value changes. Splitting contexts by concern or memoizing the value helps limit unnecessary re-renders.

Zustand: Lightweight global state where components only re-render when the specific piece of state they subscribe to changes. Good for shared state that does not need the full Redux structure.

React Query / SWR: Data that comes from a server. These libraries handle caching, background refetching, loading and error states for you. They replace the common "fetch in useEffect + useState for loading" pattern.

Redux Toolkit: Large teams, strict conventions, complex async flows, or situations where you need time-travel debugging (stepping backward through state changes in devtools). The extra structure pays off at scale.

Rule of thumb: start with local state, lift it when siblings need it, reach for Zustand before Redux.`,
    codeLanguage: 'javascript',
    difficulty: 'expert',
    tags: ['state-management', 'zustand', 'redux', 'context', 'react-query', 'architecture'],
    tier: 'advanced',
  },
  {
    id: 'performance-profiling',
    question: 'How do you identify and fix React performance problems in production?',
    answer: `Always measure first, then fix. Optimizing based on guesses usually wastes time and adds complexity without improving anything the user notices.

Tools: React DevTools Profiler shows which components rendered, how long each one took, and what triggered the render (which prop or state changed). The Chrome DevTools Performance panel shows frame timing and highlights "long tasks" — stretches of work that block the main thread and can make the page feel slow.

Common culprits:
(1) Unnecessary re-renders — a parent re-renders and all its children re-render too, even if their props did not change. Fix: wrap children with React.memo, and use useCallback and useMemo to keep the values you pass them stable.
(2) Long lists — rendering hundreds or thousands of items at once. Fix: virtualization (react-window, TanStack Virtual), which only renders the items currently visible in the viewport.
(3) Slow computations inside render — heavy calculations running on every render. Fix: useMemo to cache the result and only recalculate when inputs change.
(4) Too many separate state updates — each setState triggers its own re-render. Fix: batch related updates together or use useReducer to handle multiple state changes in one function.

Also measure Core Web Vitals (LCP, CLS, INP) in production with real users. These are the metrics that reflect actual user experience, not just synthetic benchmarks run in a lab environment.`,
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
    answer: `JSX is just a shorthand that the build tool (Babel or TypeScript) converts into React.createElement() calls. It looks like HTML, but it follows JavaScript rules. Key rules:

1. Single root element — each JSX expression can only return one top-level element. Use a Fragment (<> </> or <React.Fragment>) to group multiple elements without adding a real DOM node.
2. Expressions in curly braces — use {expr} for any JavaScript expression inside JSX. Full statements (if, for loops) do not work inside JSX directly; use a ternary (condition ? a : b) or the && operator instead.
3. className, not class — JSX uses camelCase for HTML attributes because class is a reserved word in JavaScript. Use className, htmlFor, onClick, tabIndex.
4. Self-closing tags — any element with no children must be closed with a slash: <img />, <br />.
5. Boolean attributes — writing <input disabled /> is the same as <input disabled={true} />.
6. Conditional rendering — false, null, and undefined do not render anything. Watch out for 0 — it is falsy in JavaScript but JSX will actually render it as the text "0" on the page.`,
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
    answer: `Props are values passed from a parent component to a child component. They are read-only inside the child — the child cannot change its own props. Data flows in one direction: from parent to child.

State is data that a component owns and manages itself. Only the component can update its own state, using the setter function from useState. When state changes, React re-renders the component.

A useful mental model: props are like arguments you pass into a function; state is like variables you declare inside the function. Use state for values that change over time and belong to that component. Use props for values that come from outside the component.

One important rule: if a value can be calculated from existing props or state, do not store it in state. Just calculate it while the component is rendering. Storing derived values in state creates two sources of truth that can get out of sync.`,
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
    answer: `React uses synthetic events — wrapper objects around the browser's native DOM events. React normalizes them so the same code works the same way across all browsers.

Event handler props use camelCase: onClick, onChange, onSubmit. Pass a function reference, not a function call. Writing onClick={handleClick} is correct. Writing onClick={handleClick()} calls the function immediately when the component renders, not when the user clicks.

React 17+ attaches all event listeners to the root container element rather than to individual DOM nodes. This matters if you are mixing React with other libraries or building microfrontends (multiple separate React apps on one page).

For form inputs, React's onChange fires on every single keystroke, unlike the browser's native change event which only fires when the input loses focus. If you have a handler function that is expensive to create, wrapping it in useCallback keeps the same function reference across renders.`,
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
    answer: `Fragments let you return multiple elements from a component without wrapping them in an extra DOM node. The short syntax (<> </>) is equivalent to <React.Fragment>. Use the long form (<React.Fragment key={...}>) when you need to add a key prop, such as when rendering a list of fragment groups.

Portals (ReactDOM.createPortal) render a component's output into a different DOM node — one that exists outside the normal component hierarchy. The component still lives in the React tree (so Context and event bubbling work normally), but its HTML is placed somewhere else in the document.

Common uses for portals: modals and dialog boxes that need to escape overflow: hidden or z-index stacking issues created by their parent's styles, tooltips that need to appear above everything else, notification toasts, and dropdown menus that would otherwise be clipped by their container.`,
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
    answer: `useRef gives you a plain object with a current property ({ current: value }) that persists between renders. Changing current does not trigger a re-render — that is the key difference from useState.

Two main use cases:

1. DOM access — attach ref={myRef} to a JSX element. After the component mounts, myRef.current points to the actual DOM node. Use this for focus management (programmatically focusing an input), measuring element dimensions, integrating third-party libraries that need direct DOM access, or controlling scroll position.

2. Storing values that should not trigger a re-render — timer IDs from setInterval or setTimeout, a previous render's value you want to compare against, WebSocket references, or AbortController instances. These need to survive re-renders but do not need to cause one when they change.

Important: do not read or write ref.current during rendering. Refs are a way to "escape" React's control — reading them during render can lead to inconsistent behavior because React may run your function more than once during a single update.`,
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
1. The new state depends on the previous state, and there are multiple different actions that update it in different ways.
2. You have several related state variables that should always update together.
3. The update logic is complex enough that you want to keep it in a separate, pure function (a function with no side effects) that is easy to test independently.
4. You need to pass the ability to update state deep into the component tree. The dispatch function from useReducer stays the same reference between renders, which makes it safe to pass without wrapping in useCallback.

useState is the simpler choice for independent values or simple on/off toggles. useReducer starts to pay off when your state starts to resemble a state machine — where a finite set of actions leads to predictable, well-defined transitions between states.`,
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
    answer: `A custom hook is a function whose name starts with "use" and that calls React hooks inside it. It lets you pull stateful logic out of a component and into a reusable function. Multiple components can share the same custom hook without adding extra wrapper components to the tree (unlike Higher-Order Components, which wrap the component in another component).

Extract a custom hook when: the same useState or useEffect logic appears in more than one component, a component has so many hooks that it becomes hard to read, or you want to test the logic in isolation.

A custom hook can return anything — an object, an array, a value, or nothing. The component using the hook decides what to do with the return value.`,
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
    answer: `Every component that reads from a context re-renders whenever the context value changes — even if that component only uses one property of a large context object. The most common pitfall is putting many different values into a single context and then updating any of them frequently.

Solutions:
1. Split context by update frequency — keep AuthContext (changes rarely, only on login/logout) separate from CartContext (changes whenever items are added). A cart update will no longer re-render components that only care about the user.
2. Memoize the context value with useMemo — if the Provider's parent re-renders, useMemo ensures the context value object stays the same reference as long as the underlying data has not changed. Without this, a new object is created every render and all consumers re-render unnecessarily.
3. Use Zustand or Jotai for high-frequency state — these libraries support selective subscriptions, meaning a component only re-renders when the specific piece of state it subscribes to changes.
4. The "context selector" pattern using useRef and useSyncExternalStore can give fine-grained subscription control, but it is complex and rarely needed over simpler fixes.`,
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
    answer: `React apps have specific accessibility (a11y, short for accessibility) challenges because content changes dynamically, navigation happens without full page reloads, and the browser does not automatically manage focus the way it does with regular page navigations.

Focus management: when a modal opens, move keyboard focus into it so keyboard and screen reader users can interact with it. When it closes, return focus to the element that triggered it. After the user navigates to a new route, move focus to the main heading or the new content area.

Announcements with aria-live: screen readers (software that reads the page aloud) do not automatically read dynamic content changes. Wrap areas that update dynamically (search results, form errors, notifications) in an element with an aria-live attribute. Use role="status" for non-urgent updates and role="alert" for important, immediate announcements.

Keyboard navigation: every interactive element should be reachable and usable with the keyboard alone. Custom widgets like dropdowns, comboboxes, and tab panels must follow ARIA (Accessible Rich Internet Applications) patterns, which define the correct keyboard interactions.

Skip links: add a "Skip to main content" link as the very first focusable element on the page. This lets keyboard users jump past navigation menus without tabbing through every link.`,
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
    answer: `Follow the Testing Trophy (a model by Kent C. Dodds): write the most integration tests, fewer unit tests, and even fewer end-to-end (E2E) tests.

Integration tests (React Testing Library): render a realistic component tree and interact with it the same way a user would — click buttons, type in inputs, wait for updates. Assert on what the user actually sees. RTL's guiding principle is "test behavior, not implementation." When querying elements, prefer: getByRole first (most accessible and resilient), then getByLabelText, then getByText, and only as a last resort getByTestId.

Unit tests: pure utility functions, reducers, and custom hooks (using renderHook from RTL). These are fast and do not need a browser.

E2E tests (Playwright or Cypress): the most critical user flows — checkout, signup, login, payment. These run in a real browser against a real or staging server and catch issues that component tests miss.

Do not test implementation details: internal component state, component names, or CSS class names. Tests that break when you refactor without changing any behavior are a cost, not a benefit.`,
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
    answer: `CSR (Client-Side Rendering): React runs entirely in the browser. The server sends a nearly empty HTML file; JavaScript downloads, runs, and builds the page. Best for: authenticated dashboards, highly interactive apps where SEO does not matter. Downsides: the user sees a blank page until the JavaScript loads and runs, which is slow for the first load and bad for search engine indexing.

SSG (Static Site Generation): HTML is built at deploy time and stored as files on a CDN (a network of servers close to the user). Best for: marketing pages, documentation, blogs — content that does not change often. Very fast delivery (TTFB, the time for the first byte to arrive, is near-instant) and great SEO. Downside: content is stale until the next build and deploy.

SSR (Server-Side Rendering): the server generates fresh HTML for each request. Best for: personalized pages, frequently changing data, pages where SEO matters and content is dynamic. Always up to date. Downsides: higher TTFB because the server has to fetch data and render HTML per request, and the server carries more load.

ISR (Incremental Static Regeneration): SSG with a background revalidation window. Pages are served from cache like SSG (fast), but automatically regenerated after a set time. This gives you the speed of static files with reasonably fresh data — a good middle ground.

React Server Components (RSC) in Next.js 13+ go further still — individual components decide whether they run on the server or client, which blurs the line between these strategies.`,
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
    answer: `Micro-frontends take the idea of microservices (splitting a large backend into small, independently deployable services) and apply it to the frontend. A large UI is split into smaller pieces, each owned and deployed by a separate team.

Module Federation (Webpack 5 / Rspack): the main approach for React micro-frontends. One app (the "host") loads components from other apps ("remotes") at runtime, not at build time. Each team deploys their remote independently, and the host picks up whatever version is live. You can configure shared dependencies like React and ReactDOM to load only once so they are not duplicated across remotes.

Alternative approaches: iframes give the strongest isolation (each remote is a separate page) but make communication between parts difficult. Web Components are framework-agnostic but more verbose. Build-time composition (publishing remotes as npm packages) is simpler but requires all teams to coordinate releases.

Key challenges to plan for: shared state between remotes (use URL parameters or the postMessage browser API to communicate); a shared design system (publish it as a package or a federated remote); authentication (share sessions via cookies rather than localStorage, which is per-origin); routing (each remote manages its own sub-routes internally).`,
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
    answer: `Hydration is the process React uses to make server-rendered HTML interactive. Here is what happens step by step: the server renders your React components to a complete HTML string and sends it to the browser — the user sees content immediately without waiting for JavaScript. Then the browser downloads and runs the JavaScript. React renders the same component tree in memory and walks the existing HTML, matching each DOM node to the corresponding component. Instead of creating new DOM nodes, React reuses the ones the server already created and attaches event listeners to them. This is faster than building the DOM from scratch in JavaScript.

Hydration fails with a "hydration mismatch" error when the HTML the server sent does not match what React produces on the client. Common causes: reading browser-only APIs like window or localStorage during render without checking if they exist first (they do not exist on the server), rendering dates or times that differ between the server's timezone and the user's timezone, using Math.random() or Date.now() in render (produces different values on server and client), and browser extensions that modify the DOM before React runs.

React 18 recovers from mismatches in production (it re-renders the affected part on the client) but shows warnings in development so you can fix them.`,
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
    answer: `Traditional SSR (server-side rendering) hydrates the entire page at once. The browser has to download and execute all the JavaScript before any part of the page becomes interactive — a slow section can block the whole page.

React 18 introduces two improvements to this:

Streaming SSR: instead of waiting for all components to finish rendering before sending anything, the server sends HTML in chunks. Each Suspense boundary (a wrapper you add around components that might be slow) acts as a unit — the server sends the fast parts immediately and streams the slow parts as they finish. The browser can display content progressively rather than waiting for one big response.

Selective hydration: when the HTML arrives, React does not hydrate (attach event listeners to) the whole page at once. If a user clicks a button in a section that has not been hydrated yet, React immediately prioritizes hydrating that section first before continuing with the rest. The user gets an interactive experience sooner, even if other parts of the page are still loading.

Together, these two features mean users see content faster, can interact with ready sections sooner, and a slow API call in one part of the page does not delay everything else.`,
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
    answer: `You cannot fully prevent it. If the browser can run your code, a determined person can read it. There are two practical layers of defense: architecture and obfuscation.

Architecture is the real protection. Any logic you genuinely cannot expose — secret algorithms, pricing rules, API keys, credentials — must live on the server and only be accessible through an API. It should never ship to the browser. This is the only reliable way to keep logic secret.

For code that does run in the browser, the first step is disabling source maps in production. Source maps (files that map minified code back to your original TypeScript) are great for debugging but they hand the original code to anyone who opens DevTools. Disable them with sourceMap: false in tsconfig.json and sourcemap: false in your bundler config. If you need source maps for error monitoring (to see readable stack traces in Sentry or Datadog), generate them, upload them to your monitoring service via their CLI, then delete the map files before you deploy. The monitoring service gets readable stack traces; users do not.

Beyond that, code obfuscators (like javascript-obfuscator) transform your code into something much harder to follow than plain minification — renaming variables to random strings, inserting dead code, and scrambling control flow. This raises the effort required to reverse-engineer your code, but it is not an impenetrable barrier. Add copyright notices for legal protection on top of the technical measures.`,
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
  {
    id: 'context-api-patterns',
    question: 'How do you use the Context API correctly and avoid common performance pitfalls?',
    answer: `Context is a way to pass a value to any component in a part of the tree — similar to dependency injection (a design pattern where a value is provided from outside rather than created inside the function that needs it). It is not a general-purpose state manager. Using it as one causes unnecessary re-renders throughout your app.

The correct pattern: createContext to create the context → a Provider component that owns the state → a custom hook (useMyContext) that reads the context. Always throw a clear error from the custom hook if it is used outside the Provider — this catches the mistake immediately instead of giving a confusing undefined value.

Re-render problem: when the Provider's value changes, every component that reads the context re-renders. If you pass an object literal ({ user, setUser }) as the value, a new object is created on every render, even if user and setUser did not change. This triggers all consumers unnecessarily. Fix: wrap the value in useMemo and wrap callbacks in useCallback.

Split contexts by concern: one AuthContext for the logged-in user, one ThemeContext for the theme. This way a theme change does not re-render components that only care about auth.

When not to use Context: high-frequency updates like mouse position, scroll offset, or animation frame values. Every change re-renders all consumers. Use useRef for values you only need to read without re-rendering, or Zustand for values that multiple components need to react to selectively.

Context is the right tool for values that change rarely but are needed in many places: the logged-in user, the current theme, the UI language, feature flags.`,
    codeExample: `// Correct pattern with memoization
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Memoize to prevent new reference on every parent render
  const value = useMemo(
    () => ({ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['context', 'context-api', 'state-management', 're-renders', 'useMemo', 'performance'],
    tier: 'core',
  },
  {
    id: 'redux-vs-toolkit',
    question: 'What problems does Redux Toolkit solve over vanilla Redux, and when would you still skip it?',
    answer: `Vanilla Redux (Redux without any helpers) requires a lot of boilerplate code: separate files for action type strings, action creator functions, and reducer functions. You also have to manually keep state immutable (never directly modify it — always copy and change the copy). Redux Toolkit (RTK) removes almost all of this.

createSlice is the biggest improvement: you define the name, initial state, and reducer functions all in one object. RTK automatically generates the action creators and action type strings from your reducer names. Reducers use Immer (a library that tracks changes to a draft copy), which means you can write state.count += 1 — code that looks like a direct mutation — and Immer produces the correct immutable update behind the scenes.

configureStore automatically adds Redux DevTools (for inspecting and time-traveling through state changes), the redux-thunk middleware (for async actions), and development-only checks for accidental mutations and non-serializable (non-JSON-compatible) values in state.

createAsyncThunk wraps any async operation (like an API call) and automatically generates three actions: pending (the request started), fulfilled (it succeeded), and rejected (it failed). You handle each in your extraReducers to track loading and error state.

RTK Query is an optional add-on built into RTK that handles data fetching and caching. If you are already using RTK, it can replace React Query for many use cases.

When to skip Redux entirely: for small to medium apps, teams of one to three developers, no complex async flows, or no need for time-travel debugging. Zustand handles most global state use cases with far less code. Reach for Redux/RTK when you have a large team, need strict conventions everyone must follow, or have complex multi-step async logic.`,
    codeExample: `// Vanilla Redux — lots of ceremony
const INCREMENT = 'counter/increment';
const incrementAction = () => ({ type: INCREMENT });
function counterReducer(state = 0, action) {
  if (action.type === INCREMENT) return state + 1;
  return state;
}

// Redux Toolkit — same result, zero ceremony
import { createSlice } from '@reduxjs/toolkit';
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1, // Immer handles immutability
  },
});
export const { increment } = counterSlice.actions;
export default counterSlice.reducer;`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['redux', 'redux-toolkit', 'createSlice', 'state-management', 'boilerplate'],
    tier: 'advanced',
  },
  {
    id: 'redux-async-thunks',
    question: 'How does createAsyncThunk work and how do you handle loading and error states?',
    answer: `createAsyncThunk is a helper that wraps an async function and automatically dispatches three actions based on the outcome: pending (the async function started), fulfilled (it resolved successfully), and rejected (it threw an error). You handle each case in extraReducers to update loading and error state in the store.

The async function you pass to createAsyncThunk receives two arguments: the payload (the value you passed when dispatching), and a thunkAPI object that gives you access to getState, dispatch, rejectWithValue, and a signal for cancelling fetch requests (an AbortController signal).

Use rejectWithValue to pass custom error data when something goes wrong. Without it, Redux would use the raw error object — which is not always serializable (JSON-compatible), which Redux warns about. rejectWithValue lets you pass a plain object instead.

When you dispatch a thunk, you get back a Promise. You can await dispatch(fetchUser(id)).unwrap() in a component to get the resolved value directly or catch the error. This is useful when you need to trigger a side effect in the component after the action succeeds or fails — like showing a toast notification or redirecting to another page.

Cancellation: pass thunkAPI.signal to fetch() as the signal option. If the component unmounts before the request finishes, RTK automatically cancels the request so you do not get state updates for data you no longer need.`,
    codeExample: `export const fetchUser = createAsyncThunk(
  'user/fetchById',
  async (userId: number, { rejectWithValue, signal }) => {
    const res = await fetch(\`/api/users/\${userId}\`, { signal });
    if (!res.ok) return rejectWithValue({ status: res.status });
    return res.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false; state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message;
      });
  },
});

// In component — unwrap gives resolved value or throws
async function handleLoad(id: number) {
  try {
    const user = await dispatch(fetchUser(id)).unwrap();
    toast.success(\`Loaded \${user.name}\`);
  } catch (err) {
    toast.error('Failed to load user');
  }
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['redux-toolkit', 'createAsyncThunk', 'async', 'thunk', 'loading-state'],
    tier: 'advanced',
  },
  {
    id: 'zustand-patterns',
    question: 'How does Zustand work, and what are its patterns for slices, persistence, and avoiding re-renders?',
    answer: `Zustand creates a store with create(). The store holds both state values and the functions that update them (called actions). There is no Provider to wrap your app in, no dispatch function to call, and no action type strings — just a function that calls set with the new state.

Selective subscriptions are the key feature that makes Zustand more performant than Context. You pass a selector function to the hook: useStore(s => s.count). Zustand runs a shallow equality check on the selector's result after each store update. If the result did not change, the component does not re-render. A component subscribed to count will not re-render when name changes — unlike Context, where any value change triggers every consumer.

Shallow comparison for object selectors: if your selector returns an object ({ user, setUser }), use the useShallow helper. Without it, Zustand creates a new object reference every time and the shallow check always sees it as changed, defeating the optimization.

Slices pattern for large stores: when a store gets large, define each area of concern as a separate "slice" function that takes set and get as arguments. Then compose all slices in a single create call. This keeps things organized without splitting into completely separate stores that cannot share state.

Middleware: persist syncs the store to localStorage so state survives page refreshes. devtools connects the store to Redux DevTools for inspection and time-travel debugging. immer lets you write direct mutations like RTK. Stack middleware by wrapping them: create()(persist(devtools(storeSlice))).

Zustand vs Context: Context re-renders every consumer on any change. Zustand re-renders only the components whose selector result changed. Use Zustand for any state that updates more than a handful of times per user interaction.`,
    codeExample: `import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

// Slice pattern
const createUserSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

const createCartSlice = (set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  clearCart: () => set({ items: [] }),
});

const useStore = create()(
  devtools(
    persist(
      (...args) => ({ ...createUserSlice(...args), ...createCartSlice(...args) }),
      { name: 'app-store' }
    )
  )
);

// Selective subscription — only re-renders when items.length changes
function CartBadge() {
  const count = useStore((s) => s.items.length);
  return <span>{count}</span>;
}

// Shallow comparison for object selectors
function UserInfo() {
  const { user, setUser } = useStore(
    useShallow((s) => ({ user: s.user, setUser: s.setUser }))
  );
  return <div>{user?.name}</div>;
}`,
    codeLanguage: 'typescript',
    difficulty: 'experienced',
    tags: ['zustand', 'state-management', 'slices', 'persist', 'selective-subscriptions'],
    tier: 'advanced',
  },
  {
    id: 'react-query-patterns',
    question: 'How does React Query manage server state, and how do you handle mutations, invalidation, and optimistic updates?',
    answer: `React Query treats your server as the source of truth and your UI as a local cache that may be out of date. The two main tools are useQuery (for reading data) and useMutation (for creating, updating, or deleting data).

Query keys are how React Query identifies cached data. ['users'] and ['users', 42] are separate cache entries. Using structured array keys means you can invalidate a whole group: invalidateQueries({ queryKey: ['users'] }) marks everything starting with 'users' as stale and refetches any that are currently on the screen.

staleTime vs cacheTime (gcTime in v5): staleTime is how long React Query considers data fresh enough to skip a background refetch. Within the stale window, data is served from cache with no network request. cacheTime (gcTime) is how long data that is no longer needed (no component is subscribed to it) stays in memory before being cleared.

Dependent queries: use the enabled option to skip a query until a prerequisite value exists. enabled: !!userId tells React Query not to run the query until userId is truthy.

Optimistic updates (showing the expected result before the server confirms): in onMutate, snapshot the current cache value and update it speculatively — return the snapshot as context. In onError, use the context to roll back to the snapshot. In onSettled (runs whether success or failure), invalidate the query to sync with the real server data. This pattern gives instant UI feedback and automatic rollback on failure.

Prefetching: queryClient.prefetchQuery lets you fetch and cache data before the component that needs it is even on the screen — useful for hover-to-prefetch on a link, or prefetching the next page of results.

React Query is not a replacement for client state: use useState or Zustand for UI state like open/closed dialogs or form field values.`,
    codeExample: `// Dependent query
const { data: user } = useQuery({ queryKey: ['user', userId], queryFn: fetchUser });
const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchPosts(user!.id),
  enabled: !!user, // waits for user to load
});

// Optimistic update pattern
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (updated) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    const previous = queryClient.getQueryData(['todos']);
    // Optimistically update cache
    queryClient.setQueryData(['todos'], (old: Todo[]) =>
      old.map(t => t.id === updated.id ? { ...t, ...updated } : t)
    );
    return { previous }; // returned as context
  },
  onError: (_err, _updated, context) => {
    // Roll back on failure
    queryClient.setQueryData(['todos'], context?.previous);
  },
  onSettled: () => {
    // Always sync with server
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});`,
    codeLanguage: 'typescript',
    difficulty: 'expert',
    tags: ['react-query', 'tanstack-query', 'useMutation', 'optimistic-updates', 'invalidation', 'server-state'],
    tier: 'advanced',
  },
];

export default reactQna;
