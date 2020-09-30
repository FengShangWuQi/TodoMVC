import { compose, createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";

import { RootState, rootReducers } from "./reducer";
import { RootAction } from "./actions";
import { rootEpic } from "./epics";
import { Services, services } from "./services";

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

const middlewares = [epicMiddleware, logger];

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(rootReducers, {}, enhancer);

epicMiddleware.run(rootEpic);
