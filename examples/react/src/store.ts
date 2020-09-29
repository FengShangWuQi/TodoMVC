import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { StateType } from "typesafe-actions";

import { rootReducers } from "./reducer";

const middlewares = [logger];

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(rootReducers, {}, enhancer);

export type RootState = StateType<typeof rootReducers>;
