import { create } from 'zustand';
import type { PlaygroundConfig, ControlValues, ControlValue } from '@/types/playground';

interface PlaygroundStore {
  configs: PlaygroundConfig[];
  activeId: string;
  values: ControlValues;
  setConfigs: (configs: PlaygroundConfig[]) => void;
  setActiveId: (id: string) => void;
  setValue: (key: string, value: ControlValue) => void;
  resetValues: (defaults: ControlValues) => void;
}

const usePlaygroundStore = create<PlaygroundStore>((set) => ({
  configs: [],
  activeId: '',
  values: {},
  setConfigs: (configs) =>
    set({
      configs,
      activeId: configs[0]?.id ?? '',
      values: configs[0]
        ? Object.fromEntries(configs[0].controls.map((c) => [c.id, c.defaultValue]))
        : {},
    }),
  setActiveId: (id) =>
    set((state) => {
      const config = state.configs.find((c) => c.id === id);
      return {
        activeId: id,
        values: config
          ? Object.fromEntries(config.controls.map((c) => [c.id, c.defaultValue]))
          : state.values,
      };
    }),
  setValue: (key, value) =>
    set((state) => ({ values: { ...state.values, [key]: value } })),
  resetValues: (defaults) => set({ values: { ...defaults } }),
}));

export default usePlaygroundStore;
