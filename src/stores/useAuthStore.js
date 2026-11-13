import { useStore } from "zustand";
import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import { useAppContext } from "../context.js";

export const createAuthStore = () => createStore()(
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

const useAuthStore = (selector) => useStore(useAppContext().stores.auth, selector);

export default useAuthStore;
