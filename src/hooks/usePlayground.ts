import { useEffect } from 'react';
import usePlaygroundStore from '@/store/usePlaygroundStore';
import type { PlaygroundConfig, ControlValues } from '@/types/playground';

function buildDefaults(config: PlaygroundConfig): ControlValues {
  return Object.fromEntries(
    config.controls.map((c) => [c.id, c.defaultValue])
  );
}

export function usePlayground(configs: PlaygroundConfig[]) {
  const { configs: storeConfigs, activeId, values, setConfigs, setActiveId, setValue, resetValues } =
    usePlaygroundStore();

  // Initialize / update configs when the prop changes
  useEffect(() => {
    setConfigs(configs);
  }, [configs, setConfigs]);

  const activeConfig = storeConfigs.find((c) => c.id === activeId) ?? storeConfigs[0];

  // Reset values when active config changes
  useEffect(() => {
    if (activeConfig) {
      resetValues(buildDefaults(activeConfig));
    }
  }, [activeConfig?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    configs: storeConfigs,
    activeConfig,
    activeId,
    values,
    setActiveId,
    setValue,
    reset: () => activeConfig && resetValues(buildDefaults(activeConfig)),
  };
}
