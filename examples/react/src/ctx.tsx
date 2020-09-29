import { useContext, createContext } from "react";

const StoreContext = createContext({} as any);
export const StoreProvider = StoreContext.Provider;

export const useStore = () => useContext(StoreContext);
