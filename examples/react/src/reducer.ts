import { createReducer, StateType } from "typesafe-actions";

import { addTodo, deleteTodo, todoActions, TodoAction, Todo } from "./actions";

export const todosReducer = (state: Todo[], action: TodoAction) =>
  createReducer([])
    .handleAction(todoActions.add, addTodo)
    .handleAction(todoActions.delete, deleteTodo)
    .handlers[action.type](state, action);

export type TodosState = StateType<typeof todosReducer>;
