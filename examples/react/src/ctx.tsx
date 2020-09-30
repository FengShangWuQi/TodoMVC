import React, { useContext, useEffect, useState, createContext } from "react";

import { RootState } from "./reducer";
import { RootAction } from "./actions";

const StoreContext = createContext({} as any);
export const StoreProvider = StoreContext.Provider;

export const useStore = () => {
  const storeCtx = useContext(StoreContext);

  const [state, setstate] = useState<RootState>({
    todos: [],
  });

  useEffect(() => {
    const unsubscribe = storeCtx.subscribe(() => {
      setstate(storeCtx.getState());
    });

    return unsubscribe;
  }, []);

  return { state, dispatch: storeCtx.dispatch as React.Dispatch<RootAction> };
};
