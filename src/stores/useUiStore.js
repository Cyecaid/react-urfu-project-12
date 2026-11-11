import { create } from "zustand";

const useUiStore = create()((set) => ({
  currentChannelId: null,
  modal: null,
  setCurrentChannel: (id) => set({ currentChannelId: id }),
  leaveChannel: (id) => set((state) => (state.currentChannelId === id ? { currentChannelId: null } : {})),
  openModal: (type, extra = null) => set({ modal: { type, extra } }),
  closeModal: () => set({ modal: null }),
}));

export default useUiStore;
