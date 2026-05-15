import type { SyntaxEntry } from '@/types/content';

const reactSyntax: SyntaxEntry[] = [
  {
    id: 'jsx-basics',
    title: 'JSX Basics',
    description: 'JSX is a syntax extension that lets you write HTML-like code in JavaScript files.',
    language: 'jsx',
    tags: ['jsx', 'syntax', 'expressions'],
    tier: 'core',
    level: 'fresher',
    code: `// JSX compiles to React.createElement calls
const element = <h1 className="title">Hello, {name}!</h1>;

// Expressions in curly braces
const el = <p>{isLoggedIn ? 'Welcome back!' : 'Please log in'}</p>;

// Self-closing tags must use />
const img = <img src={url} alt="description" />;

// Fragment — group without a DOM wrapper
const frag = (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// className, htmlFor (not class, for)
const form = (
  <form>
    <label htmlFor="email">Email</label>
    <input id="email" className="input" type="email" />
  </form>
);`,
  },
  {
    id: 'usestate',
    title: 'useState',
    description: 'Adds local state to a function component. Returns the current value and a setter function.',
    language: 'jsx',
    tags: ['hooks', 'state', 'useState'],
    tier: 'core',
    level: 'fresher',
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// Object state — always spread to merge
function Form() {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return <input name="name" value={form.name} onChange={handleChange} />;
}

// Lazy initialization (runs only once)
const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data') ?? 'null'));`,
  },
  {
    id: 'useeffect',
    title: 'useEffect',
    description: 'Synchronize a component with an external system. Runs after render; cleanup runs before next effect or unmount.',
    language: 'jsx',
    tags: ['hooks', 'effects', 'useEffect', 'lifecycle'],
    tier: 'core',
    level: 'fresher',
    code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✓ Abort in-flight request on cleanup
    const controller = new AbortController();

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(setUser)
      .catch(err => { if (err.name !== 'AbortError') throw err; });

    return () => controller.abort(); // cleanup
  }, [userId]); // re-run when userId changes

  return <div>{user?.name}</div>;
}

// [] = run once on mount
useEffect(() => { init(); return () => cleanup(); }, []);

// No deps array = run after every render (rare)
useEffect(() => { document.title = count.toString(); });`,
  },
  {
    id: 'useref',
    title: 'useRef',
    description: 'Holds a mutable value that persists across renders without causing re-renders. Also used for DOM references.',
    language: 'jsx',
    tags: ['hooks', 'useRef', 'dom', 'mutable'],
    tier: 'core',
    level: 'experienced',
    code: `import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}

// Mutable value — doesn't trigger re-render
function Timer() {
  const [running, setRunning] = useState(false);
  const intervalId = useRef(null);

  const start = () => {
    intervalId.current = setInterval(tick, 1000);
    setRunning(true);
  };
  const stop = () => {
    clearInterval(intervalId.current);
    setRunning(false);
  };

  return <button onClick={running ? stop : start}>{running ? 'Stop' : 'Start'}</button>;
}

// Track previous value
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}`,
  },
  {
    id: 'usememo',
    title: 'useMemo',
    description: 'Memoizes the result of an expensive computation, recomputing only when dependencies change.',
    language: 'jsx',
    tags: ['hooks', 'useMemo', 'performance', 'memoization'],
    tier: 'core',
    level: 'experienced',
    code: `import { useMemo } from 'react';

function ProductList({ products, filter }) {
  // Expensive filter — only recomputes when products or filter changes
  const filtered = useMemo(
    () => products.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    ),
    [products, filter]
  );

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// Stable reference for child props
function Parent({ items }) {
  const config = useMemo(() => ({
    sortOrder: 'asc',
    limit: 10,
  }), []); // empty deps = computed once

  return <Child config={config} />;
}

// DON'T useMemo for cheap computations
// const doubled = useMemo(() => count * 2, [count]); // overkill`,
  },
  {
    id: 'usecallback',
    title: 'useCallback',
    description: 'Memoizes a function reference, preventing recreation on every render. Essential for passing callbacks to memoized children.',
    language: 'jsx',
    tags: ['hooks', 'useCallback', 'performance', 'memoization'],
    tier: 'core',
    level: 'experienced',
    code: `import { useCallback, memo } from 'react';

// Without useCallback, handleClick is a new function every render
// → ExpensiveChild re-renders even when nothing changed
const ExpensiveChild = memo(({ onClick }) => (
  <button onClick={onClick}>Click</button>
));

function Parent({ id }) {
  const [count, setCount] = useState(0);

  // Stable function — only changes when id changes
  const handleClick = useCallback(() => {
    fetchData(id);
  }, [id]);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <ExpensiveChild onClick={handleClick} />
    </>
  );
}

// Use with useEffect dependency arrays
const fetchUser = useCallback(async () => {
  const data = await api.getUser(userId);
  setUser(data);
}, [userId]);

useEffect(() => { fetchUser(); }, [fetchUser]);`,
  },
  {
    id: 'usecontext',
    title: 'useContext & createContext',
    description: 'Share state across the component tree without prop drilling.',
    language: 'jsx',
    tags: ['hooks', 'useContext', 'context', 'state'],
    tier: 'core',
    level: 'experienced',
    code: `import { createContext, useContext, useState } from 'react';

// 1. Create the context
const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

// 2. Provide it at a high level
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume anywhere in the tree
function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>Current: {theme}</button>;
}

// Custom hook pattern (recommended)
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}`,
  },
  {
    id: 'usereducer',
    title: 'useReducer',
    description: 'Manages complex state logic through a pure reducer function, similar to Redux patterns.',
    language: 'jsx',
    tags: ['hooks', 'useReducer', 'state', 'reducer'],
    tier: 'core',
    level: 'experienced',
    code: `import { useReducer } from 'react';

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET'; payload: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    case 'RESET':     return action.payload;
    default: return state;
  }
}

function Counter({ initialCount = 0 }) {
  const [count, dispatch] = useReducer(reducer, initialCount);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET', payload: initialCount })}>
        Reset
      </button>
    </div>
  );
}`,
  },
  {
    id: 'custom-hooks',
    title: 'Custom Hooks',
    description: 'Extract stateful logic into reusable functions that start with "use".',
    language: 'jsx',
    tags: ['hooks', 'custom-hooks', 'composition'],
    tier: 'core',
    level: 'experienced',
    code: `// Custom hook: data fetching
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json(); })
      .then(setData)
      .catch(err => { if (err.name !== 'AbortError') setError(err); })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserCard({ id }: { id: number }) {
  const { data: user, loading, error } = useFetch<User>(\`/api/users/\${id}\`);
  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <div>{user?.name}</div>;
}`,
  },
  {
    id: 'react-memo',
    title: 'React.memo',
    description: 'Wraps a component to skip re-rendering when props are shallowly equal to the previous render.',
    language: 'jsx',
    tags: ['memo', 'performance', 'optimization', 'pure-components'],
    tier: 'core',
    level: 'experienced',
    code: `import { memo, useState, useCallback } from 'react';

// Without memo: re-renders every time Parent renders
// With memo: skips re-render if count didn't change
const ExpensiveList = memo(function ExpensiveList({ items, onSelect }) {
  console.log('ExpensiveList render');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

function Parent() {
  const [other, setOther] = useState(0);
  const items = useMemo(() => getItems(), []);        // stable array
  const onSelect = useCallback(id => select(id), []); // stable function

  return (
    <>
      <button onClick={() => setOther(c => c + 1)}>{other}</button>
      <ExpensiveList items={items} onSelect={onSelect} />
    </>
  );
}

// Custom comparison function
const Equal = memo(Component, (prev, next) => prev.id === next.id);`,
  },
  {
    id: 'forwardref',
    title: 'forwardRef & useImperativeHandle',
    description: 'Forward a ref through a component to a DOM node; useImperativeHandle exposes a custom API.',
    language: 'jsx',
    tags: ['forwardRef', 'useImperativeHandle', 'refs', 'dom'],
    tier: 'advanced',
    level: 'experienced',
    code: `import { forwardRef, useImperativeHandle, useRef } from 'react';

// forwardRef — pass ref to a DOM element
const FancyInput = forwardRef<HTMLInputElement, { label: string }>(
  function FancyInput({ label }, ref) {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} className="fancy" />
      </div>
    );
  }
);

// Usage
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <FancyInput ref={inputRef} label="Name" />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}

// useImperativeHandle — expose custom API
const Dialog = forwardRef(function Dialog(props, ref) {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  return open ? <div className="dialog">{props.children}</div> : null;
});`,
  },
  {
    id: 'lazy-suspense',
    title: 'lazy & Suspense',
    description: 'Code-split components by dynamic import; Suspense shows a fallback while the component loads.',
    language: 'jsx',
    tags: ['lazy', 'suspense', 'code-splitting', 'performance'],
    tier: 'advanced',
    level: 'experienced',
    code: `import { lazy, Suspense } from 'react';

// Lazy load a component (code splits here)
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// Named export — need to wrap in a default
const Chart = lazy(() =>
  import('./charts').then(m => ({ default: m.LineChart }))
);

// Preload on hover
function NavLink({ to, component }: { to: string; component: LazyComponent }) {
  const prefetch = () => component._payload?._status === -1 && component._payload._result();
  return <Link to={to} onMouseEnter={prefetch}>...</Link>;
}`,
  },
  {
    id: 'create-portal',
    title: 'createPortal',
    description: 'Render children into a DOM node outside the parent component hierarchy.',
    language: 'jsx',
    tags: ['portal', 'createPortal', 'dom', 'modal'],
    tier: 'advanced',
    level: 'experienced',
    code: `import { createPortal } from 'react-dom';
import { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>,
    document.body // renders here — outside .app-root
  );
}

// Portals maintain React event bubbling even out of the DOM tree
function App() {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => console.log('Parent click')}>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <p>Content</p>
      </Modal>
    </div>
  );
}`,
  },
  {
    id: 'error-boundary',
    title: 'Error Boundary',
    description: 'Class component that catches JavaScript errors in its child tree and shows a fallback UI.',
    language: 'jsx',
    tags: ['error-boundary', 'error-handling', 'class-component'],
    tier: 'advanced',
    level: 'experienced',
    code: `import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to error reporting service
    reportError(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Dashboard />
    </ErrorBoundary>
  );
}`,
  },
  {
    id: 'uselayouteffect',
    title: 'useLayoutEffect',
    description: 'Like useEffect but fires synchronously after DOM mutations and before the browser paints.',
    language: 'jsx',
    tags: ['hooks', 'useLayoutEffect', 'dom', 'timing'],
    tier: 'advanced',
    level: 'experienced',
    code: `import { useLayoutEffect, useRef, useState } from 'react';

// Measure DOM dimensions before paint (no flash)
function Tooltip({ text, anchor }) {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!tooltipRef.current || !anchor) return;
    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    setPosition({
      top: anchorRect.bottom + 8,
      left: anchorRect.left - tooltipRect.width / 2,
    });
  }, [anchor]);

  return (
    <div
      ref={tooltipRef}
      style={{ position: 'fixed', ...position }}
    >
      {text}
    </div>
  );
}

// Rule: prefer useEffect; use useLayoutEffect only when
// you need to read/write DOM before paint to prevent flicker`,
  },
  {
    id: 'usetransition',
    title: 'useTransition & useDeferredValue',
    description: 'Mark state updates as non-urgent to keep the UI responsive during expensive renders.',
    language: 'jsx',
    tags: ['hooks', 'useTransition', 'useDeferredValue', 'concurrent', 'performance'],
    tier: 'advanced',
    level: 'expert',
    code: `import { useState, useTransition, useDeferredValue } from 'react';

// useTransition — wrap the state update
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e) {
    setQuery(e.target.value); // urgent — updates input immediately

    startTransition(() => {
      // non-urgent — can be interrupted by urgent updates
      setResults(expensiveSearch(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending ? <Spinner /> : <ResultList results={results} />}
    </>
  );
}

// useDeferredValue — defer an existing value
function FilteredList({ items, filter }) {
  const deferredFilter = useDeferredValue(filter); // lags behind intentionally
  const filtered = useMemo(
    () => items.filter(i => i.name.includes(deferredFilter)),
    [items, deferredFilter]
  );
  return <ul>{filtered.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`,
  },
  {
    id: 'use-hook-react19',
    title: 'use() Hook (React 19)',
    description: 'Read a Promise or Context inside the render function — including conditionally.',
    language: 'jsx',
    tags: ['hooks', 'use', 'react19', 'suspense', 'promises'],
    tier: 'advanced',
    level: 'expert',
    since: 'React 19',
    code: `import { use, Suspense, createContext } from 'react';

// Read a Promise (component suspends until resolved)
function UserProfile({ userPromise }) {
  const user = use(userPromise); // suspends if promise is pending
  return <div>{user.name}</div>;
}

function App() {
  const userPromise = fetchUser(1); // created outside, passed in
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}

// Read Context (unlike useContext, can be called conditionally)
const ThemeContext = createContext('light');

function ConditionalTheme({ showTheme }) {
  if (!showTheme) return null;
  const theme = use(ThemeContext); // OK — use() can be conditional
  return <div className={theme}>Themed content</div>;
}`,
  },
  {
    id: 'server-components',
    title: 'React Server Components',
    description: 'Components that render on the server only — can fetch data directly, have no client bundle.',
    language: 'jsx',
    tags: ['server-components', 'rsc', 'react19', 'next.js'],
    tier: 'advanced',
    level: 'expert',
    since: 'React 19',
    code: `// Server Component (default in Next.js App Router)
// - No 'use client' directive
// - Can use async/await directly
// - Cannot use hooks, browser APIs, or event handlers
// - Zero bundle impact — code never sent to the browser

async function ProductPage({ params }) {
  // Direct DB call — no API route needed
  const product = await db.products.findById(params.id);

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client component receives serializable props */}
      <AddToCartButton productId={product.id} price={product.price} />
    </main>
  );
}

// Client Component — interactive parts only
'use client';

function AddToCartButton({ productId, price }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => { addToCart(productId); setAdded(true); }}>
      {added ? 'Added!' : \`Add to Cart — \$\${price}\`}
    </button>
  );
}`,
  },
  {
    id: 'react19-actions',
    title: 'React 19 Actions',
    description: 'Server and client actions simplify form handling and async mutations in React 19.',
    language: 'jsx',
    tags: ['actions', 'react19', 'forms', 'server-actions'],
    tier: 'advanced',
    level: 'expert',
    since: 'React 19',
    code: `'use server'; // server action file

// Server Action — runs on server, can be called from client
async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  await db.users.create({ name });
  revalidatePath('/users');
}

// Client usage with useActionState (React 19)
'use client';
import { useActionState } from 'react';

function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(
    createUser,
    null // initial state
  );

  return (
    <form action={formAction}>
      <input name="name" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>
      {state?.error && <p role="alert">{state.error}</p>}
    </form>
  );
}`,
  },
];

export default reactSyntax;
