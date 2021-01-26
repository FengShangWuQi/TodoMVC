import { createStore, createLogger } from "vuex";

import modules from "./store-modules";

export const store = createStore({
  modules,
  plugins: [createLogger()],
});
