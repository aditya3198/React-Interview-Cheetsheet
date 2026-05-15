import type { ReactNode } from 'react';

export type ControlValue = string | number | boolean;
export type ControlValues = Record<string, ControlValue>;
export type ControlType = 'toggle' | 'radio' | 'select' | 'slider' | 'text';

interface BaseControl {
  id: string;
  label: string;
  type: ControlType;
  defaultValue: ControlValue;
  showWhen?: (values: ControlValues) => boolean;
  explain?: (value: ControlValue) => string;
}

export interface ToggleControl extends BaseControl {
  type: 'toggle';
  defaultValue: boolean;
}

export interface RadioControl extends BaseControl {
  type: 'radio';
  options: { label: string; value: string }[];
  defaultValue: string;
}

export interface SelectControl extends BaseControl {
  type: 'select';
  options: { label: string; value: string }[];
  defaultValue: string;
}

export interface SliderControl extends BaseControl {
  type: 'slider';
  min: number;
  max: number;
  step: number;
  unit?: string;
  defaultValue: number;
}

export interface TextControl extends BaseControl {
  type: 'text';
  placeholder?: string;
  defaultValue: string;
}

export type ControlDef = ToggleControl | RadioControl | SelectControl | SliderControl | TextControl;

export interface PlaygroundConfig {
  id: string;
  title: string;
  description: string;
  previewType: 'html-element' | 'css-property' | 'react-component';
  subject: string;
  controls: ControlDef[];
  componentFactory?: (values: ControlValues) => ReactNode;
}
