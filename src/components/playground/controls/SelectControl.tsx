import type { SelectControl as SelectControlDef, ControlValue } from '@/types/playground';
import styles from './SelectControl.module.scss';

interface Props {
  control: SelectControlDef;
  value: ControlValue;
  onChange: (value: ControlValue) => void;
}

export default function SelectControl({ control, value, onChange }: Props) {
  const hint = control.explain?.(value);
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>{control.label}</span>
      <select
        className={styles.select}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
      >
        {control.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}
