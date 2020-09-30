import { combineReducers } from "redux";
import { StateType, createReducer } from "typesafe-actions";

import { addTodo, deleteTodo, todoActions, TodoAction } from "./actions";
import { Todo } from "./client";

const todosReducer = createReducer<Todo[], TodoAction>([])
  .handleAction(todoActions.add, addTodo)
  .handleAction(todoActions.delete, deleteTodo)
  .handleAction(todoActions.fetchAsync.success, (_, action) => action.payload);

export const rootReducers = combineReducers({ todos: todosReducer });

export type RootState = StateType<typeof rootReducers>;
