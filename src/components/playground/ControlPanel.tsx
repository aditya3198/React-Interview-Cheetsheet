import type { PlaygroundConfig, ControlValues, ControlValue } from '@/types/playground';
import ToggleControl from './controls/ToggleControl';
import RadioControl from './controls/RadioControl';
import SelectControl from './controls/SelectControl';
import SliderControl from './controls/SliderControl';
import TextControl from './controls/TextControl';
import styles from './ControlPanel.module.scss';

interface Props {
  config: PlaygroundConfig;
  values: ControlValues;
  onChange: (key: string, value: ControlValue) => void;
  onReset: () => void;
}

export default function ControlPanel({ config, values, onChange, onReset }: Props) {
  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>{config.title}</h3>
        <button className={styles.resetBtn} onClick={onReset} title="Reset to defaults">
          Reset
        </button>
      </div>
      <p className={styles.description}>{config.description}</p>
      <div className={styles.controls}>
        {config.controls.filter((control) => !control.showWhen || control.showWhen(values)).map((control) => {
          const value = values[control.id] ?? control.defaultValue;
          const handleChange = (val: ControlValue) => onChange(control.id, val);

          switch (control.type) {
            case 'toggle':
              return <ToggleControl key={control.id} control={control} value={value} onChange={handleChange} />;
            case 'radio':
              return <RadioControl key={control.id} control={control} value={value} onChange={handleChange} />;
            case 'select':
              return <SelectControl key={control.id} control={control} value={value} onChange={handleChange} />;
            case 'slider':
              return <SliderControl key={control.id} control={control} value={value} onChange={handleChange} />;
            case 'text':
              return <TextControl key={control.id} control={control} value={value} onChange={handleChange} />;
          }
        })}
      </div>
    </aside>
  );
}
