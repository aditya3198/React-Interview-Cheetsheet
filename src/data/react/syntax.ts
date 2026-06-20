import type { SyntaxEntry } from '@/types/content';

const reactSyntax: SyntaxEntry[] = [
  {
    id: 'jsx-basics',
    title: 'JSX Basics',
    description: 'JSX lets you write HTML-like markup directly in your JavaScript files. It compiles down to regular JavaScript function calls.',
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
    description: 'Adds local state (data that can change over time) to a function component. Returns the current value and a function to update it.',
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
    description: 'Run code after a component renders to connect it to something outside React — like an API, a timer, or a browser event. The cleanup function runs when the component is removed or before the effect runs again.',
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
    description: 'Stores a value that persists between renders without triggering a re-render when it changes. Also used to get a direct reference to a DOM element.',
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
    id: 'usecontext',
    title: 'useContext & createContext',
    description: 'Share data across many components without passing it as a prop through every level of the tree.',
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
    description: 'An alternative to useState for managing state that has multiple sub-values or complex update logic. You describe what happened (an action), and a separate function decides how state changes.',
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
    id: 'usememo',
    title: 'useMemo',
    description: 'Caches the result of a slow calculation so React does not redo it on every render. The cached value is only recalculated when the values it depends on change.',
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
    description: 'Keeps the same function reference between renders so it does not get recreated every time. Important when passing a function as a prop to a child component that you are trying to prevent from re-rendering.',
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
    id: 'react-memo',
    title: 'React.memo',
    description: 'Wraps a component so React skips re-rendering it when its props have not changed. React compares props using a shallow check (top-level values only, not deep object contents).',
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
    id: 'custom-hooks',
    title: 'Custom Hooks',
    description: 'Pull stateful logic out of a component into its own function so you can reuse it across multiple components. The function name must start with "use".',
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
    id: 'forwardref',
    title: 'forwardRef & useImperativeHandle',
    description: 'Lets a parent component pass a ref into a child component so it can access the child\'s DOM node directly. useImperativeHandle lets you control exactly what the parent can do with that ref.',
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
    id: 'uselayouteffect',
    title: 'useLayoutEffect',
    description: 'Similar to useEffect, but runs before the browser draws anything to the screen. Use this when you need to read or change the DOM right after React updates it, to avoid a visible flicker.',
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
    id: 'error-boundary',
    title: 'Error Boundary',
    description: 'A class component that catches JavaScript errors thrown during rendering in any of its child components and displays a fallback UI instead of crashing the whole page.',
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
    id: 'create-portal',
    title: 'createPortal',
    description: 'Renders a component\'s output into a different part of the HTML page, outside the normal component tree. Useful for modals and tooltips that need to visually escape their container.',
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
    id: 'lazy-suspense',
    title: 'lazy & Suspense',
    description: 'Load a component\'s code only when it is actually needed (code splitting), keeping the initial page load smaller. Suspense shows a fallback (like a spinner) while the component\'s code is downloading.',
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
    id: 'usetransition',
    title: 'useTransition & useDeferredValue',
    description: 'Tell React that a state update is low-priority so it can be interrupted if the user does something more urgent. This keeps the UI feeling fast even while running expensive renders in the background.',
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
    description: 'Read a Promise or Context value directly inside your component\'s render logic — even inside an if statement. Unlike most hooks, it can be called conditionally.',
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
    description: 'Components that run only on the server, never in the browser. They can fetch data directly from a database or API, and their code is never sent to the user\'s browser.',
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
    description: 'A new way in React 19 to handle form submissions and data changes. Actions can run on the server or client, and React tracks their pending and error states automatically.',
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
  {
    id: 'context-api-pattern',
    title: 'Context API Pattern',
    description: 'A complete example of the Context API pattern: create a context, wrap your app in a Provider, and expose a custom hook so any component can access the shared data safely.',
    language: 'jsx',
    tags: ['context', 'state-management', 'context-api', 'custom-hooks'],
    tier: 'core',
    level: 'experienced',
    code: `import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define shape
interface AuthContextValue {
  user: { name: string } | null;
  login: (name: string) => void;
  logout: () => void;
}

// 2. Create context (undefined default catches missing Provider)
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// 3. Provider component owns the state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const login = (name: string) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom hook — throws if used outside Provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// 5. Wrap your app
function App() {
  return (
    <AuthProvider>
      <Header />
    </AuthProvider>
  );
}

// 6. Consume anywhere in the tree
function Header() {
  const { user, logout } = useAuth();
  return user ? <button onClick={logout}>Sign out {user.name}</button> : null;
}`,
  },
  {
    id: 'redux-toolkit',
    title: 'Redux Toolkit',
    description: 'The modern, recommended way to use Redux. Redux Toolkit removes most of the boilerplate by combining action creators, reducers, and async logic into a much simpler API.',
    language: 'jsx',
    tags: ['redux', 'redux-toolkit', 'state-management', 'createSlice', 'useSelector'],
    tier: 'advanced',
    level: 'experienced',
    code: `// store/counterSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Async thunk — handles loading/error states automatically
export const fetchUser = createAsyncThunk('user/fetch', async (id: number) => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json(); // returned value becomes action.payload
});

interface CounterState { value: number; status: 'idle' | 'loading' | 'failed' }
const initialState: CounterState = { value: 0, status: 'idle' };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Immer lets you write "mutating" logic — it produces immutable updates
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending,   (state) => { state.status = 'loading'; })
      .addCase(fetchUser.fulfilled, (state) => { state.status = 'idle'; })
      .addCase(fetchUser.rejected,  (state) => { state.status = 'failed'; });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: { counter: counterReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Typed hooks — use these instead of plain useSelector/useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// main.tsx
import { Provider } from 'react-redux';
function Main() {
  return <Provider store={store}><App /></Provider>;
}

// Counter.tsx — consuming the store
function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}`,
  },
  {
    id: 'zustand',
    title: 'Zustand',
    description: 'A lightweight library for global state. Each component subscribes only to the specific piece of state it needs, so it only re-renders when that piece changes — not whenever anything in the store changes.',
    language: 'jsx',
    tags: ['zustand', 'state-management', 'store', 'selective-subscriptions'],
    tier: 'advanced',
    level: 'experienced',
    code: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Basic store ---
interface BearStore {
  bears: number;
  increase: () => void;
  reset: () => void;
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  reset: () => set({ bears: 0 }),
}));

// Component only re-renders when bears changes (not whole store)
function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} bears</h1>;
}

function Controls() {
  const increase = useBearStore((state) => state.increase);
  return <button onClick={increase}>Add bear</button>;
}

// --- Persisted store (localStorage) ---
interface SettingsStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    { name: 'settings-storage' } // localStorage key
  )
);

// --- Slice pattern (large stores) ---
const useStore = create<{ count: number; name: string }>()((set) => ({
  count: 0,
  name: '',
}));

// Select only what you need — prevents unnecessary re-renders
const count = useStore((s) => s.count);
const name  = useStore((s) => s.name);`,
  },
  {
    id: 'react-query',
    title: 'React Query (TanStack Query)',
    description: 'Handles all the complexity of loading data from an API: caching the results, refetching them in the background when they go stale, and tracking loading and error states automatically.',
    language: 'jsx',
    tags: ['react-query', 'tanstack-query', 'server-state', 'useQuery', 'useMutation', 'data-fetching'],
    tier: 'advanced',
    level: 'experienced',
    code: `import {
  QueryClient, QueryClientProvider,
  useQuery, useMutation, useQueryClient,
} from '@tanstack/react-query';

// Setup — wrap your app once
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 } }, // 1 min cache
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

// --- useQuery: fetch & cache data ---
function UserList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],          // cache key — must be unique
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 30_000,            // treat as fresh for 30s
    refetchOnWindowFocus: true,   // refetch when tab regains focus
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// --- useQuery with params ---
function UserDetail({ id }: { id: number }) {
  const { data: user } = useQuery({
    queryKey: ['users', id],      // key includes params
    queryFn: () => fetch(\`/api/users/\${id}\`).then(r => r.json()),
    enabled: id > 0,              // skip query when id is invalid
  });
  return <div>{user?.name}</div>;
}

// --- useMutation: create/update/delete ---
function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser: { name: string }) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      }).then(r => r.json()),
    onSuccess: () => {
      // Invalidate cache so UserList refetches
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => console.error('Failed:', error),
  });

  return (
    <button
      onClick={() => mutation.mutate({ name: 'Alice' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Creating…' : 'Create User'}
    </button>
  );
}`,
  },
];

export default reactSyntax;
