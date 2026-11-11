import { create } from "zustand";

const useUiStore = create()((set) => ({
  currentChannelId: null,
  modal: null,
  setCurrentChannel: (id) => set({ currentChannelId: id }),
  openModal: (type, extra = null) => set({ modal: { type, extra } }),
  closeModal: () => set({ modal: null }),
}));

export default useUiStore;
