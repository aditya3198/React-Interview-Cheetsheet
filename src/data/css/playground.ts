import type { PlaygroundConfig } from '@/types/playground';

const DIRECTION_HINTS: Record<string, string> = {
  'row': 'Items flow left → right. Main axis is horizontal, cross axis is vertical.',
  'column': 'Items stack top → bottom. Main axis is vertical, cross axis is horizontal.',
  'row-reverse': 'Items flow right → left along the horizontal main axis.',
  'column-reverse': 'Items stack bottom → top along the vertical main axis.',
};
const JUSTIFY_HINTS: Record<string, string> = {
  'flex-start': 'Items packed at the start of the main axis.',
  'flex-end': 'Items packed at the end of the main axis.',
  'center': 'Items centered along the main axis.',
  'space-between': 'First and last items at edges; remaining space distributed evenly between.',
  'space-around': 'Equal space around each item — half-size gaps at the edges.',
  'space-evenly': 'Equal space between all items including the edges.',
};
const ALIGN_HINTS: Record<string, string> = {
  'stretch': 'Items stretch to fill the container\'s cross-axis size (default).',
  'flex-start': 'Items aligned to the start of the cross axis.',
  'flex-end': 'Items aligned to the end of the cross axis.',
  'center': 'Items centered along the cross axis.',
  'baseline': 'Items aligned so their text baselines line up.',
};
const WRAP_HINTS: Record<string, string> = {
  'nowrap': 'All items stay on one line — may overflow if they don\'t fit.',
  'wrap': 'Items wrap onto new lines when the container is too narrow.',
  'wrap-reverse': 'Items wrap upward onto previous lines.',
};
const AUTO_FLOW_HINTS: Record<string, string> = {
  'row': 'New items fill each row left → right before moving to the next row.',
  'column': 'New items fill each column top → bottom before moving to the next column.',
  'row dense': 'Fills earlier gaps with later items for a denser layout.',
};
const BOX_SIZING_HINTS: Record<string, string> = {
  'border-box': 'Width and height include padding and border — the box stays its declared size.',
  'content-box': 'Width and height are content-only. Padding and border add extra size on top.',
};

const cssPlaygroundConfigs: PlaygroundConfig[] = [
  {
    id: 'flexbox-explorer',
    title: 'Flexbox Explorer',
    description: 'Interactively explore flexbox container properties and see how items respond.',
    previewType: 'css-property',
    subject: 'flexbox',
    controls: [
      {
        id: 'direction',
        label: 'flex-direction',
        type: 'radio',
        defaultValue: 'row',
        explain: (v) => DIRECTION_HINTS[String(v)] ?? '',
        options: [
          { label: 'row', value: 'row' },
          { label: 'column', value: 'column' },
          { label: 'row-reverse', value: 'row-reverse' },
          { label: 'column-reverse', value: 'column-reverse' },
        ],
      },
      {
        id: 'justifyContent',
        label: 'justify-content',
        type: 'select',
        defaultValue: 'flex-start',
        explain: (v) => JUSTIFY_HINTS[String(v)] ?? '',
        options: [
          { label: 'flex-start', value: 'flex-start' },
          { label: 'flex-end', value: 'flex-end' },
          { label: 'center', value: 'center' },
          { label: 'space-between', value: 'space-between' },
          { label: 'space-around', value: 'space-around' },
          { label: 'space-evenly', value: 'space-evenly' },
        ],
      },
      {
        id: 'alignItems',
        label: 'align-items',
        type: 'select',
        defaultValue: 'stretch',
        explain: (v) => ALIGN_HINTS[String(v)] ?? '',
        options: [
          { label: 'stretch', value: 'stretch' },
          { label: 'flex-start', value: 'flex-start' },
          { label: 'flex-end', value: 'flex-end' },
          { label: 'center', value: 'center' },
          { label: 'baseline', value: 'baseline' },
        ],
      },
      {
        id: 'wrap',
        label: 'flex-wrap',
        type: 'radio',
        defaultValue: 'nowrap',
        explain: (v) => WRAP_HINTS[String(v)] ?? '',
        options: [
          { label: 'nowrap', value: 'nowrap' },
          { label: 'wrap', value: 'wrap' },
          { label: 'wrap-reverse', value: 'wrap-reverse' },
        ],
      },
      { id: 'gap', label: 'gap', type: 'slider', defaultValue: 8, min: 0, max: 40, step: 4, unit: 'px', explain: (v) => Number(v) === 0 ? 'No space between items.' : `Adds ${v}px of space between every flex item.` },
    ],
  },
  {
    id: 'grid-explorer',
    title: 'Grid Explorer',
    description: 'See how grid-template-columns, rows, and auto-flow affect item placement.',
    previewType: 'css-property',
    subject: 'grid',
    controls: [
      { id: 'columns', label: 'columns', type: 'slider', defaultValue: 3, min: 1, max: 6, step: 1, explain: (v) => `Creates ${v} equal-width columns using repeat(${v}, 1fr).` },
      { id: 'rows', label: 'rows', type: 'slider', defaultValue: 2, min: 1, max: 4, step: 1, explain: (v) => `Defines ${v} explicit row track${Number(v) === 1 ? '' : 's'}. Extra items create implicit rows.` },
      { id: 'gap', label: 'gap', type: 'slider', defaultValue: 8, min: 0, max: 40, step: 4, unit: 'px', explain: (v) => Number(v) === 0 ? 'No gutter between cells.' : `Adds ${v}px gutter between rows and columns.` },
      {
        id: 'autoFlow',
        label: 'grid-auto-flow',
        type: 'radio',
        defaultValue: 'row',
        explain: (v) => AUTO_FLOW_HINTS[String(v)] ?? '',
        options: [
          { label: 'row', value: 'row' },
          { label: 'column', value: 'column' },
          { label: 'dense', value: 'row dense' },
        ],
      },
    ],
  },
  {
    id: 'box-model-explorer',
    title: 'Box Model Explorer',
    description: 'Visualize how padding, margin, border, and box-sizing affect element dimensions.',
    previewType: 'css-property',
    subject: 'box-model',
    controls: [
      { id: 'padding', label: 'padding', type: 'slider', defaultValue: 16, min: 0, max: 48, step: 4, unit: 'px', explain: (v) => `${v}px of inner space between the content and the border.` },
      { id: 'margin', label: 'margin', type: 'slider', defaultValue: 8, min: 0, max: 48, step: 4, unit: 'px', explain: (v) => `${v}px of outer space that separates this element from its neighbors.` },
      { id: 'borderWidth', label: 'border-width', type: 'slider', defaultValue: 2, min: 0, max: 12, step: 1, unit: 'px', explain: (v) => Number(v) === 0 ? 'No border.' : `${v}px border drawn between padding and margin.` },
      { id: 'borderRadius', label: 'border-radius', type: 'slider', defaultValue: 6, min: 0, max: 48, step: 2, unit: 'px', explain: (v) => Number(v) === 0 ? 'Sharp corners — no rounding.' : `Corners rounded by ${v}px.` },
      {
        id: 'boxSizing',
        label: 'box-sizing',
        type: 'radio',
        defaultValue: 'border-box',
        explain: (v) => BOX_SIZING_HINTS[String(v)] ?? '',
        options: [
          { label: 'border-box', value: 'border-box' },
          { label: 'content-box', value: 'content-box' },
        ],
      },
    ],
  },
  {
    id: 'typography-explorer',
    title: 'Typography Explorer',
    description: 'Explore font-size, weight, line-height, letter-spacing, and text transforms.',
    previewType: 'css-property',
    subject: 'typography',
    controls: [
      { id: 'fontSize', label: 'font-size', type: 'slider', defaultValue: 16, min: 10, max: 48, step: 2, unit: 'px', explain: (v) => `Text rendered at ${v}px. Browser default is 16px.` },
      {
        id: 'fontWeight',
        label: 'font-weight',
        type: 'select',
        defaultValue: '400',
        explain: (v) => ({ '300': 'Light — thinner strokes, airy feel.', '400': 'Regular — the browser default weight.', '500': 'Medium — slightly heavier than regular.', '600': 'Semi-bold — noticeable weight without full bold.', '700': 'Bold — standard bold, equivalent to <strong>.', '800': 'Extra-bold — heavy emphasis.' })[String(v)] ?? '',
        options: [
          { label: '300 — light', value: '300' },
          { label: '400 — regular', value: '400' },
          { label: '500 — medium', value: '500' },
          { label: '600 — semi-bold', value: '600' },
          { label: '700 — bold', value: '700' },
          { label: '800 — extra-bold', value: '800' },
        ],
      },
      { id: 'lineHeight', label: 'line-height', type: 'slider', defaultValue: 1.5, min: 1, max: 3, step: 0.1, explain: (v) => `Each line is ${v}× the font-size tall. Values of 1.4–1.6 are recommended for body text.` },
      { id: 'letterSpacing', label: 'letter-spacing', type: 'slider', defaultValue: 0, min: -2, max: 8, step: 0.5, unit: 'px', explain: (v) => Number(v) === 0 ? 'Default tracking — no extra space between letters.' : Number(v) > 0 ? `${v}px extra space between letters (tracked out — common for headings).` : `${v}px tightened space between letters (tracked in).` },
      {
        id: 'textAlign',
        label: 'text-align',
        type: 'radio',
        defaultValue: 'left',
        explain: (v) => ({ 'left': 'Text flows from the left edge (default for LTR languages).', 'center': 'Each line is centered within the container.', 'right': 'Text flows from the right edge.' })[String(v)] ?? '',
        options: [
          { label: 'left', value: 'left' },
          { label: 'center', value: 'center' },
          { label: 'right', value: 'right' },
        ],
      },
      {
        id: 'textTransform',
        label: 'text-transform',
        type: 'select',
        defaultValue: 'none',
        explain: (v) => ({ 'none': 'Text renders exactly as written in HTML.', 'uppercase': 'All characters forced to uppercase — does not change the DOM text.', 'lowercase': 'All characters forced to lowercase.', 'capitalize': 'First letter of each word capitalized.' })[String(v)] ?? '',
        options: [
          { label: 'none', value: 'none' },
          { label: 'uppercase', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' },
          { label: 'capitalize', value: 'capitalize' },
        ],
      },
    ],
  },
  {
    id: 'hover-transitions',
    title: 'Hover & Transitions',
    description: 'See how transition-duration, easing, and property affect hover animations.',
    previewType: 'html-element',
    subject: 'hover-button',
    controls: [
      { id: 'duration', label: 'duration', type: 'slider', defaultValue: 300, min: 0, max: 1000, step: 50, unit: 'ms', explain: (v) => Number(v) === 0 ? 'Instant — no animation.' : `Transition takes ${v}ms. Human perception notices changes under ~100ms as instant.` },
      {
        id: 'property',
        label: 'transition-property',
        type: 'select',
        defaultValue: 'all',
        explain: (v) => ({ 'all': 'All animatable CSS properties transition. Convenient but can hurt performance.', 'background-color': 'Only the background color animates — other changes are instant.', 'transform': 'Only transforms (scale, rotate, translate) animate. GPU-accelerated — very performant.', 'opacity': 'Only opacity animates. Also GPU-accelerated and cheap to run.', 'box-shadow': 'Only the shadow animates. More expensive than transform or opacity.' })[String(v)] ?? '',
        options: [
          { label: 'all', value: 'all' },
          { label: 'background-color', value: 'background-color' },
          { label: 'transform', value: 'transform' },
          { label: 'opacity', value: 'opacity' },
          { label: 'box-shadow', value: 'box-shadow' },
        ],
      },
      {
        id: 'easing',
        label: 'timing-function',
        type: 'select',
        defaultValue: 'ease',
        explain: (v) => ({ 'ease': 'Starts slow, speeds up, then slows — the default. Feels natural.', 'linear': 'Constant speed throughout. Feels mechanical.', 'ease-in': 'Starts slow then accelerates — good for elements leaving the screen.', 'ease-out': 'Starts fast then decelerates — good for elements entering the screen.', 'ease-in-out': 'Slow at both ends — smooth and polished.' })[String(v)] ?? '',
        options: [
          { label: 'ease', value: 'ease' },
          { label: 'linear', value: 'linear' },
          { label: 'ease-in', value: 'ease-in' },
          { label: 'ease-out', value: 'ease-out' },
          { label: 'ease-in-out', value: 'ease-in-out' },
        ],
      },
      { id: 'hoverScale', label: 'hover scale', type: 'slider', defaultValue: 1.08, min: 0.8, max: 1.4, step: 0.02, explain: (v) => Number(v) === 1 ? 'No size change on hover.' : Number(v) > 1 ? `Element grows to ${v}× its original size on hover.` : `Element shrinks to ${v}× its original size on hover.` },
      {
        id: 'hoverBg',
        label: 'hover color',
        type: 'select',
        defaultValue: '#4f46e5',
        explain: () => 'The background color the element transitions to when hovered.',
        options: [
          { label: 'dark indigo', value: '#4f46e5' },
          { label: 'blue', value: '#2563eb' },
          { label: 'green', value: '#16a34a' },
          { label: 'red', value: '#dc2626' },
          { label: 'dark gray', value: '#334155' },
        ],
      },
      { id: 'hoverShadow', label: 'shadow on hover', type: 'toggle', defaultValue: true, explain: (v) => Boolean(v) ? 'A drop shadow appears on hover, adding perceived depth.' : 'No shadow on hover.' },
    ],
  },
];

export default cssPlaygroundConfigs;
