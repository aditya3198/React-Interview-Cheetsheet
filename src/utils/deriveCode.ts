import type { ControlValues } from '@/types/playground';

export function deriveHtmlCode(subject: string, values: ControlValues): string {
  if (subject === 'input') {
    const type = String(values.type);
    const isTextBased = ['text','email','password','search','tel','url'].includes(type);
    const isNumericOrDate = ['number','range','date'].includes(type);
    const hasLabel = String(values.labelText ?? '').trim() !== '';
    const attrs = [
      `type="${type}"`,
      hasLabel ? `id="demo"` : '',
      values.name ? `name="${values.name}"` : '',
      (isTextBased || type === 'number') && values.placeholder ? `placeholder="${values.placeholder}"` : '',
      type !== 'file' && values.value ? `value="${values.value}"` : '',
      isTextBased && values.maxlength ? `maxlength="${values.maxlength}"` : '',
      isNumericOrDate && values.min !== '' && values.min !== undefined ? `min="${values.min}"` : '',
      isNumericOrDate && values.max !== '' && values.max !== undefined ? `max="${values.max}"` : '',
      isNumericOrDate && values.step !== '' && values.step !== undefined ? `step="${values.step}"` : '',
      isTextBased && values.autocomplete && values.autocomplete !== 'off' ? `autocomplete="${values.autocomplete}"` : '',
      ['email','file'].includes(type) && values.multiple ? 'multiple' : '',
      !['checkbox','radio','color','range','file'].includes(type) && values.readonly ? 'readonly' : '',
      values.disabled ? 'disabled' : '',
      !['color','range'].includes(type) && values.required ? 'required' : '',
    ].filter(Boolean).join('\n  ');
    const inputEl = `<input\n  ${attrs}\n/>`;
    if (hasLabel) {
      return `<label for="demo">${values.labelText}\n  ${inputEl}\n</label>`;
    }
    return inputEl;
  }

  if (subject === 'button') {
    const attrs = [
      `type="${values.type}"`,
      values.disabled ? 'disabled' : '',
    ].filter(Boolean).join('\n  ');
    return `<button\n  ${attrs}\n>\n  ${values.label ?? 'Button'}\n</button>`;
  }

  if (subject === 'hover-button') {
    return `<style>
  .btn {
    padding: 0.625rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    background: #6366f1;
    color: white;
    cursor: pointer;
    font-size: 1rem;
    transition: ${values.property} ${values.duration}ms ${values.easing};
  }
  .btn:hover {
    background: ${values.hoverBg};
    transform: scale(${values.hoverScale});${values.hoverShadow ? '\n    box-shadow: 0 8px 24px rgba(0,0,0,0.4);' : ''}
  }
</style>
<button class="btn" type="button">Hover me</button>`
  }

  if (subject === 'select') {
    const attrs = [
      values.multiple ? 'multiple' : '',
      values.required ? 'required' : '',
      values.disabled ? 'disabled' : '',
    ].filter(Boolean).join('\n  ');
    return `<select${attrs ? `\n  ${attrs}` : ''}>\n  <option value="">Choose...</option>\n  <option value="a">Option A</option>\n  <option value="b">Option B</option>\n  <option value="c">Option C</option>\n</select>`;
  }

  return `<${subject} />`;
}

export function deriveCssCode(subject: string, values: ControlValues): string {
  if (subject === 'flexbox') {
    return `.container {
  display: flex;
  flex-direction: ${values.direction};
  justify-content: ${values.justifyContent};
  align-items: ${values.alignItems};
  flex-wrap: ${values.wrap};
  gap: ${values.gap}px;
}`;
  }

  if (subject === 'grid') {
    return `.container {
  display: grid;
  grid-template-columns: repeat(${values.columns}, 1fr);
  grid-template-rows: repeat(${values.rows}, auto);
  gap: ${values.gap}px;
  grid-auto-flow: ${values.autoFlow};
}`;
  }

  if (subject === 'box-model') {
    return `.box {
  box-sizing: ${values.boxSizing};
  padding: ${values.padding}px;
  margin: ${values.margin}px;
  border: ${values.borderWidth}px solid #6366f1;
  border-radius: ${values.borderRadius}px;
}`;
  }

  if (subject === 'typography') {
    return `p {
  font-size: ${values.fontSize}px;
  font-weight: ${values.fontWeight};
  line-height: ${values.lineHeight};
  letter-spacing: ${values.letterSpacing}px;
  text-align: ${values.textAlign};
  text-transform: ${values.textTransform};
}`;
  }

  return `.${subject} {}`;
}

export function deriveReactCode(subject: string, values: ControlValues): string {
  if (subject === 'useState-counter') {
    return `function Counter() {
  const [count, setCount] = useState(${values.initialValue});
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + ${values.step})}>
        +{String(values.step)}
      </button>
      <button onClick={() => setCount(c => c - ${values.step})}>
        -{String(values.step)}
      </button>
    </div>
  );
}`;
  }

  if (subject === 'controlled-input') {
    return `function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <input
      type="${values.type}"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="${values.placeholder}"
      maxLength={${values.maxLength}}
    />
  );
}`;
  }

  if (subject === 'useEffect-timer') {
    return `function Timer() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    ${values.autoStart ? '' : '// Start the timer when autoStart is true\n    '}const id = setInterval(
      () => setCount(c => c + 1),
      ${values.interval}
    );
    return () => clearInterval(id);
  }, []);
  return <p>Elapsed ticks: {count}</p>;
}`;
  }

  return `// ${subject}`;
}
