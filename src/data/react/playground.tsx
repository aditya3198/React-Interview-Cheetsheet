import { useState, useEffect, type ReactNode } from 'react';
import type { PlaygroundConfig, ControlValues } from '@/types/playground';

function CounterFactory(values: ControlValues): ReactNode {
  const Counter = () => {
    const [count, setCount] = useState(Number(values.initialValue));
    const step = Number(values.step);
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '2rem', margin: '0 0 1rem', fontWeight: 700 }}>{count}</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button onClick={() => setCount((c) => c - step)}>−{step}</button>
          <button onClick={() => setCount(Number(values.initialValue))}>Reset</button>
          <button onClick={() => setCount((c) => c + step)}>+{step}</button>
        </div>
      </div>
    );
  };
  Counter.displayName = 'Counter';
  return <Counter />;
}

function ControlledInputFactory(values: ControlValues): ReactNode {
  const ControlledInput = () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type={String(values.type)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={String(values.placeholder)}
          maxLength={Number(values.maxLength)}
          style={{ width: '100%', maxWidth: '280px' }}
        />
        <p style={{ margin: 0, fontSize: '0.8125rem', color: '#94a3b8' }}>
          {value.length} / {values.maxLength} chars
        </p>
      </div>
    );
  };
  ControlledInput.displayName = 'ControlledInput';
  return <ControlledInput />;
}

function TimerFactory(values: ControlValues): ReactNode {
  const Timer = () => {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(Boolean(values.autoStart));

    useEffect(() => {
      if (!running) return;
      const id = setInterval(() => setCount((c) => c + 1), Number(values.interval));
      return () => clearInterval(id);
    }, [running]);

    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 1rem', fontVariantNumeric: 'tabular-nums' }}>
          {count}s
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</button>
          <button onClick={() => { setCount(0); setRunning(false); }}>Reset</button>
        </div>
      </div>
    );
  };
  Timer.displayName = 'Timer';
  return <Timer />;
}

const reactPlaygroundConfigs: PlaygroundConfig[] = [
  {
    id: 'usestate-counter',
    title: 'useState Counter',
    description: 'A counter with configurable initial value and step size.',
    previewType: 'react-component',
    subject: 'useState-counter',
    componentFactory: CounterFactory,
    controls: [
      { id: 'initialValue', label: 'initialValue', type: 'slider', defaultValue: 0, min: -10, max: 50, step: 1, explain: (v) => `useState(${v}) — the component mounts with count set to ${v}.` },
      { id: 'step', label: 'step', type: 'slider', defaultValue: 1, min: 1, max: 10, step: 1, explain: (v) => `Each button press adds or subtracts ${v} from the current count.` },
    ],
  },
  {
    id: 'controlled-input',
    title: 'Controlled Input',
    description: 'React controls the input value — every keystroke passes through state.',
    previewType: 'react-component',
    subject: 'controlled-input',
    componentFactory: ControlledInputFactory,
    controls: [
      {
        id: 'type',
        label: 'type',
        type: 'select',
        defaultValue: 'text',
        explain: (v) => ({ 'text': 'Any characters accepted. value is always a string in React.', 'email': 'Same as text in a controlled input — React does not validate format, the browser does on submit.', 'password': 'Characters are masked visually but value in state is plain text.', 'search': 'Like text but may show a browser-native clear button.' })[String(v)] ?? '',
        options: [
          { label: 'text', value: 'text' },
          { label: 'email', value: 'email' },
          { label: 'password', value: 'password' },
          { label: 'search', value: 'search' },
        ],
      },
      { id: 'placeholder', label: 'placeholder', type: 'text', defaultValue: 'Type something...', placeholder: 'Placeholder text' },
      { id: 'maxLength', label: 'maxLength', type: 'slider', defaultValue: 50, min: 5, max: 200, step: 5, explain: (v) => `Input is capped at ${v} characters. The counter below updates on every keystroke via onChange.` },
    ],
  },
  {
    id: 'useeffect-timer',
    title: 'useEffect Timer',
    description: 'A timer using useEffect with interval and cleanup — shows why cleanup matters.',
    previewType: 'react-component',
    subject: 'useEffect-timer',
    componentFactory: TimerFactory,
    controls: [
      { id: 'interval', label: 'interval (ms)', type: 'slider', defaultValue: 1000, min: 100, max: 3000, step: 100, unit: 'ms', explain: (v) => `setInterval fires every ${v}ms. The useEffect cleanup calls clearInterval to prevent memory leaks when the component unmounts.` },
      { id: 'autoStart', label: 'auto-start', type: 'toggle', defaultValue: true, explain: (v) => Boolean(v) ? 'Timer starts immediately on mount.' : 'Timer waits for the Start button — demonstrates conditional effect execution.' },
    ],
  },
];

export default reactPlaygroundConfigs;
