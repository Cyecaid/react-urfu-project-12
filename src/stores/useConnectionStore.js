import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { useAppContext } from "../context.js";

export const createConnectionStore = () => createStore()((set) => ({
  isConnected: true,
  setConnected: (isConnected) => set({ isConnected }),
}));

const useConnectionStore = (selector) => useStore(useAppContext().stores.connection, selector);

export default useConnectionStore;
