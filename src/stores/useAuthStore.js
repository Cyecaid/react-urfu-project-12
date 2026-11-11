import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      token: null,
      username: null,
      logIn: ({ token, username }) => set({ token, username }),
      logOut: () => set({ token: null, username: null }),
    }),
    { name: "auth" },
  ),
);

export default useAuthStore;
