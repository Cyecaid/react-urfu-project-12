import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";

import { useAppContext } from "../context.js";

export const createUiStore = () => createStore()((set) => ({
  currentChannelId: null,
  modal: null,
  setCurrentChannel: (id) => set({ currentChannelId: id }),
  leaveChannel: (id) => set((state) => (state.currentChannelId === id ? { currentChannelId: null } : {})),
  openModal: (type, extra = null) => set({ modal: { type, extra } }),
  closeModal: () => set({ modal: null }),
}));

const useUiStore = (selector) => useStore(useAppContext().stores.ui, selector);

export default useUiStore;
