import type { VersionEntry } from '@/types/content';

const reactVersions: VersionEntry[] = [
  {
    version: 'React 19',
    releaseYear: 2024,
    highlights: [
      {
        feature: 'use() Hook',
        description: 'Read Promises or Context in the render function — can be called conditionally.',
        codeExample: `function UserProfile({ userPromise }) {
  const user = use(userPromise); // suspends until resolved
  return <h1>{user.name}</h1>;
}`,
      },
      {
        feature: 'Server Components (stable)',
        description: 'Run-on-server components with direct data access and zero client bundle impact.',
        codeExample: `// No 'use client' = Server Component
async function Page({ params }) {
  const data = await db.query(params.id);
  return <Layout data={data} />;
}`,
      },
      {
        feature: 'Actions & useActionState',
        description: 'Async functions for form submissions and mutations with built-in pending/error state.',
        codeExample: `const [state, action, isPending] = useActionState(serverAction, null);`,
      },
      {
        feature: 'ref as a prop',
        description: 'ref can now be passed as a regular prop — forwardRef is no longer required.',
        codeExample: `// React 19: no forwardRef needed
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}`,
      },
      {
        feature: 'useOptimistic',
        description: 'Show an optimistic state immediately while an async operation completes in the background.',
        codeExample: `const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (state, delta) => state + delta
);`,
      },
      {
        feature: 'Document metadata support',
        description: 'title, meta, and link tags inside components are hoisted to <head> automatically.',
        codeExample: `function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <h1>{post.title}</h1>
    </article>
  );
}`,
      },
    ],
  },
  {
    version: 'React 18 — Concurrent',
    releaseYear: 2022,
    highlights: [
      {
        feature: 'Concurrent Rendering',
        description: 'React can interrupt, pause, and resume renders to keep the UI responsive.',
      },
      {
        feature: 'Automatic Batching',
        description: 'setState calls inside Promises, setTimeout, and native events are now automatically batched.',
        codeExample: `// React 17: two re-renders
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// React 18: one re-render (automatic batching)`,
      },
      {
        feature: 'useTransition & useDeferredValue',
        description: 'Mark non-urgent updates to prioritize responsive interactions.',
        codeExample: `const [isPending, startTransition] = useTransition();
startTransition(() => setFilter(input)); // interruptible`,
      },
      {
        feature: 'Suspense on the server',
        description: 'Streaming SSR with selective hydration — progressively stream HTML with Suspense boundaries.',
      },
      {
        feature: 'useId',
        description: 'Generate stable IDs for accessibility attributes, safe across server and client.',
        codeExample: `const id = useId(); // ':r0:' — stable across renders`,
      },
      {
        feature: 'createRoot',
        description: 'New root API replaces ReactDOM.render. Required to opt into React 18 features.',
        codeExample: `import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);`,
        breakingChange: true,
      },
    ],
  },
  {
    version: 'React 17',
    releaseYear: 2020,
    highlights: [
      {
        feature: 'No breaking changes for apps',
        description: 'A "stepping stone" release focused on making future upgrades easier.',
      },
      {
        feature: 'New JSX Transform',
        description: 'No longer need to import React in every file with JSX.',
        codeExample: `// Before React 17: required
import React from 'react';

// After React 17: not needed for JSX
function App() { return <h1>Hello</h1>; }`,
      },
      {
        feature: 'Event delegation change',
        description: 'Events now attach to the React root instead of document — fixes issues with multiple React versions.',
        breakingChange: true,
      },
      {
        feature: 'Gradual upgrades',
        description: 'Multiple versions of React can run on the same page, enabling gradual migration.',
      },
    ],
  },
  {
    version: 'React 16.8 — Hooks',
    releaseYear: 2019,
    highlights: [
      {
        feature: 'useState',
        description: 'Local state in function components.',
        codeExample: `const [count, setCount] = useState(0);`,
      },
      {
        feature: 'useEffect',
        description: 'Side effects and lifecycle in function components.',
        codeExample: `useEffect(() => { document.title = count; }, [count]);`,
      },
      {
        feature: 'useContext, useReducer, useRef',
        description: 'Context consumption, complex state, and mutable refs in functions.',
      },
      {
        feature: 'useMemo & useCallback',
        description: 'Memoize values and functions for performance optimization.',
      },
      {
        feature: 'Custom Hooks',
        description: 'Extract and share stateful logic between components without HOCs or render props.',
        codeExample: `function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}`,
      },
    ],
  },
  {
    version: 'React 16.6',
    releaseYear: 2018,
    highlights: [
      {
        feature: 'React.lazy & Suspense',
        description: 'Code-split components with dynamic imports and show fallbacks during loading.',
        codeExample: `const OtherComponent = React.lazy(() => import('./Other'));

<Suspense fallback={<Spinner />}>
  <OtherComponent />
</Suspense>`,
      },
      {
        feature: 'React.memo',
        description: 'HOC equivalent of PureComponent for function components.',
        codeExample: `const Expensive = React.memo(function Expensive({ value }) {
  return <div>{value}</div>;
});`,
      },
      {
        feature: 'static contextType',
        description: 'Subscribe to context in class components without Consumer wrapper.',
      },
    ],
  },
  {
    version: 'React 16.3',
    releaseYear: 2018,
    highlights: [
      {
        feature: 'New Context API',
        description: 'createContext and Context.Provider replaced the old context API.',
        codeExample: `const ThemeContext = createContext('light');
<ThemeContext.Provider value="dark">...</ThemeContext.Provider>`,
      },
      {
        feature: 'createRef',
        description: 'Object-based ref API replacing callback refs for most use cases.',
        codeExample: `this.myRef = createRef();
<input ref={this.myRef} />`,
      },
      {
        feature: 'getDerivedStateFromProps',
        description: 'Replaces componentWillReceiveProps for syncing state from props.',
      },
      {
        feature: 'Lifecycle method deprecations',
        description: 'componentWillMount, componentWillReceiveProps, componentWillUpdate marked UNSAFE_.',
        breakingChange: true,
      },
    ],
  },
  {
    version: 'React 16 — Fiber',
    releaseYear: 2017,
    highlights: [
      {
        feature: 'Fiber Reconciler',
        description: 'Rewrote the reconciler for incremental rendering. Foundation for all future concurrent features.',
      },
      {
        feature: 'Error Boundaries',
        description: 'componentDidCatch and getDerivedStateFromError catch errors in the component tree.',
        codeExample: `class Boundary extends Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
}`,
      },
      {
        feature: 'Portals',
        description: 'Render children outside the parent DOM hierarchy.',
        codeExample: `ReactDOM.createPortal(children, document.body)`,
      },
      {
        feature: 'Fragments',
        description: 'Return multiple elements from render without a wrapping DOM node.',
        codeExample: `return <><h1>Title</h1><p>Body</p></>;`,
      },
      {
        feature: 'Return arrays and strings',
        description: 'Components can now return arrays of elements or plain strings from render.',
      },
    ],
  },
  {
    version: 'React 0.14',
    releaseYear: 2015,
    highlights: [
      {
        feature: 'Functional Components',
        description: 'Stateless functional components introduced as pure functions from props to UI.',
        codeExample: `// Stateless functional component
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;`,
      },
      {
        feature: 'ReactDOM split',
        description: 'React and ReactDOM separated into two packages, enabling React Native and other renderers.',
      },
      {
        feature: 'Refs as callbacks',
        description: 'Ref callbacks allow direct DOM access.',
        codeExample: `<input ref={node => { this.input = node; }} />`,
      },
    ],
  },
];

export default reactVersions;
