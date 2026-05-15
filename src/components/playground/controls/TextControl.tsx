import type { TextControl as TextControlDef, ControlValue } from '@/types/playground';
import styles from './TextControl.module.scss';

interface Props {
  control: TextControlDef;
  value: ControlValue;
  onChange: (value: ControlValue) => void;
}

export default function TextControl({ control, value, onChange }: Props) {
  const hint = control.explain?.(value);
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{control.label}</span>
      <input
        type="text"
        className={styles.input}
        value={String(value)}
        placeholder={control.placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}
