import { create } from 'zustand';

interface LoadingStore {
  isLoading: boolean;
  setLoading: (v: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setLoading: (v) => set({ isLoading: v }),
}));

export default useLoadingStore;
