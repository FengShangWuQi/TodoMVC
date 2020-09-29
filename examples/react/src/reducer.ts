import { combineReducers } from "redux";
import { createReducer } from "typesafe-actions";

import { addTodo, deleteTodo, todoActions, TodoAction, Todo } from "./actions";

const todosReducer = createReducer<Todo[], TodoAction>([])
  .handleAction(todoActions.add, addTodo)
  .handleAction(todoActions.delete, deleteTodo)
  .handleAction(todoActions.completedAsync, state => state);

export const rootReducers = combineReducers({ todos: todosReducer });
