import type { PlaygroundConfig } from '@/types/playground';

const htmlPlaygroundConfigs: PlaygroundConfig[] = [
  {
    id: 'input-type-explorer',
    title: 'Input Type Explorer',
    description: 'See how different input types and attributes affect behavior, keyboard, and validation.',
    previewType: 'html-element',
    subject: 'input',
    controls: [
      {
        id: 'type',
        label: 'type',
        type: 'select',
        defaultValue: 'text',
        explain: (v) => ({
          'text': 'General single-line text input. Accepts any characters.',
          'email': 'Validates email format (user@domain.tld) on submit. Mobile shows email keyboard.',
          'password': 'Masks characters as the user types. Value is still plain text in JS — always use HTTPS.',
          'number': 'Accepts only numeric input. Shows up/down spinner controls.',
          'range': 'Renders a slider. Value is always a number between min and max.',
          'color': 'Opens the OS color picker. Value is a hex string like #ff0000.',
          'date': 'Opens the OS date picker. Value format is YYYY-MM-DD.',
          'checkbox': 'Boolean on/off toggle. Only submits the "value" attribute when checked.',
          'radio': 'One choice from a group. Group radios by giving them the same "name" attribute.',
          'file': 'Opens a file picker. The value is read-only — access files via the FileList API.',
          'search': 'Functionally like text but hints the browser to show a clear (×) button.',
          'tel': 'For phone numbers. No built-in format validation. Mobile shows a dial pad.',
          'url': 'Validates URL format on submit. Mobile shows a URL-optimised keyboard.',
        })[String(v)] ?? '',
        options: [
          { label: 'text', value: 'text' },
          { label: 'email', value: 'email' },
          { label: 'password', value: 'password' },
          { label: 'number', value: 'number' },
          { label: 'range', value: 'range' },
          { label: 'color', value: 'color' },
          { label: 'date', value: 'date' },
          { label: 'checkbox', value: 'checkbox' },
          { label: 'radio', value: 'radio' },
          { label: 'file', value: 'file' },
          { label: 'search', value: 'search' },
          { label: 'tel', value: 'tel' },
          { label: 'url', value: 'url' },
        ],
      },
      { id: 'labelText', label: 'label', type: 'text', defaultValue: '', placeholder: 'e.g. Email address' },
      { id: 'name', label: 'name', type: 'text', defaultValue: '', placeholder: 'e.g. email' },
      {
        id: 'placeholder', label: 'placeholder', type: 'text', defaultValue: 'Type here...', placeholder: 'Placeholder text',
        showWhen: (v) => ['text','email','password','search','tel','url','number'].includes(String(v.type)),
      },
      {
        id: 'value', label: 'value', type: 'text', defaultValue: '', placeholder: 'Default value',
        showWhen: (v) => !['file'].includes(String(v.type)),
      },
      {
        id: 'maxlength', label: 'maxlength', type: 'text', defaultValue: '', placeholder: 'e.g. 50',
        showWhen: (v) => ['text','email','password','search','tel','url'].includes(String(v.type)),
      },
      {
        id: 'min', label: 'min', type: 'text', defaultValue: '', placeholder: 'e.g. 0',
        showWhen: (v) => ['number','range','date'].includes(String(v.type)),
      },
      {
        id: 'max', label: 'max', type: 'text', defaultValue: '', placeholder: 'e.g. 100',
        showWhen: (v) => ['number','range','date'].includes(String(v.type)),
      },
      {
        id: 'step', label: 'step', type: 'text', defaultValue: '', placeholder: 'e.g. 1',
        showWhen: (v) => ['number','range','date'].includes(String(v.type)),
      },
      {
        id: 'autocomplete',
        label: 'autocomplete',
        type: 'select',
        defaultValue: 'off',
        showWhen: (v) => ['text','email','password','search','tel','url'].includes(String(v.type)),
        options: [
          { label: 'off', value: 'off' },
          { label: 'on', value: 'on' },
          { label: 'name', value: 'name' },
          { label: 'email', value: 'email' },
          { label: 'username', value: 'username' },
          { label: 'current-password', value: 'current-password' },
          { label: 'new-password', value: 'new-password' },
          { label: 'tel', value: 'tel' },
          { label: 'url', value: 'url' },
        ],
      },
      {
        id: 'multiple', label: 'multiple', type: 'toggle', defaultValue: false,
        showWhen: (v) => ['email','file'].includes(String(v.type)),
      },
      {
        id: 'readonly', label: 'readonly', type: 'toggle', defaultValue: false,
        showWhen: (v) => !['checkbox','radio','color','range','file'].includes(String(v.type)),
      },
      { id: 'disabled', label: 'disabled', type: 'toggle', defaultValue: false },
      {
        id: 'required', label: 'required', type: 'toggle', defaultValue: false,
        showWhen: (v) => !['color','range'].includes(String(v.type)),
      },
    ],
  },
  {
    id: 'button-explorer',
    title: 'Button Explorer',
    description: 'Explore button types and how the type and disabled attributes affect behavior.',
    previewType: 'html-element',
    subject: 'button',
    controls: [
      {
        id: 'type',
        label: 'type',
        type: 'radio',
        defaultValue: 'button',
        explain: (v) => ({ 'button': 'No default behaviour — action must be wired via JavaScript.', 'submit': 'Submits the nearest ancestor <form> when clicked.', 'reset': 'Resets all fields in the nearest ancestor <form> to their default values.' })[String(v)] ?? '',
        options: [
          { label: 'button', value: 'button' },
          { label: 'submit', value: 'submit' },
          { label: 'reset', value: 'reset' },
        ],
      },
      { id: 'label', label: 'text', type: 'text', defaultValue: 'Click me', placeholder: 'Button label' },
      { id: 'disabled', label: 'disabled', type: 'toggle', defaultValue: false, explain: (v) => Boolean(v) ? 'Button is non-interactive. It is excluded from form submission and cannot be focused or clicked.' : 'Button is interactive and included in form submission.' },
    ],
  },
  {
    id: 'select-explorer',
    title: 'Select Element Explorer',
    description: 'See how multiple, required, and disabled change the select element.',
    previewType: 'html-element',
    subject: 'select',
    controls: [
      { id: 'multiple', label: 'multiple', type: 'toggle', defaultValue: false, explain: (v) => Boolean(v) ? 'Ctrl/Cmd+click to select multiple options. The submitted value becomes an array.' : 'Only one option can be selected at a time.' },
      { id: 'required', label: 'required', type: 'toggle', defaultValue: false, explain: (v) => Boolean(v) ? 'Form cannot be submitted until an option other than the placeholder is selected.' : 'Selection is optional — form can be submitted without choosing.' },
      { id: 'disabled', label: 'disabled', type: 'toggle', defaultValue: false, explain: (v) => Boolean(v) ? 'Select is greyed out and cannot be interacted with. Its value is excluded from form data.' : 'Select is interactive and its value is included in form submission.' },
    ],
  },
];

export default htmlPlaygroundConfigs;
