import type { SliderControl as SliderControlDef, ControlValue } from '@/types/playground';
import styles from './SliderControl.module.scss';

interface Props {
  control: SliderControlDef;
  value: ControlValue;
  onChange: (value: ControlValue) => void;
}

export default function SliderControl({ control, value, onChange }: Props) {
  const num = Number(value);

  const hint = control.explain?.(value);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{control.label}</span>
        <span className={styles.value}>
          {num}{control.unit ?? ''}
        </span>
      </div>
      <input
        type="range"
        className={styles.range}
        min={control.min}
        max={control.max}
        step={control.step}
        value={num}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className={styles.bounds}>
        <span>{control.min}{control.unit ?? ''}</span>
        <span>{control.max}{control.unit ?? ''}</span>
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
