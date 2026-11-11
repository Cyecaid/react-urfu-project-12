import { create } from "zustand";

const useConnectionStore = create()((set) => ({
  isConnected: true,
  setConnected: (isConnected) => set({ isConnected }),
}));

export default useConnectionStore;
