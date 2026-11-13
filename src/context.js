import { createContext, useContext } from "react";

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const useRequest = () => useAppContext().request;

export const useToasts = () => useAppContext().toasts;
