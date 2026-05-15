import type { ToggleControl as ToggleControlDef, ControlValue } from '@/types/playground';
import styles from './ToggleControl.module.scss';

interface Props {
  control: ToggleControlDef;
  value: ControlValue;
  onChange: (value: ControlValue) => void;
}

export default function ToggleControl({ control, value, onChange }: Props) {
  const hint = control.explain?.(value);
  return (
    <div className={styles.wrapper}>
      <label className={styles.toggle}>
        <span className={styles.label}>{control.label}</span>
        <span className={styles.switch}>
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className={styles.input}
          />
          <span className={styles.slider} aria-hidden="true" />
        </span>
      </label>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
