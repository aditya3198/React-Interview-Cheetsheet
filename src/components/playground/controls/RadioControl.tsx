import type { RadioControl as RadioControlDef, ControlValue } from '@/types/playground';
import styles from './RadioControl.module.scss';

interface Props {
  control: RadioControlDef;
  value: ControlValue;
  onChange: (value: ControlValue) => void;
}

export default function RadioControl({ control, value, onChange }: Props) {
  const hint = control.explain?.(value);
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{control.label}</legend>
      <div className={styles.options}>
        {control.options.map((opt) => (
          <label key={opt.value} className={styles.option}>
            <input
              type="radio"
              name={control.id}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className={styles.input}
            />
            <span className={styles.optionLabel}>{opt.label}</span>
          </label>
        ))}
      </div>
      {hint && <p className={styles.hint}>{hint}</p>}
    </fieldset>
  );
}
