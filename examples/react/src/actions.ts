import { createAction, ActionType } from "typesafe-actions";
import produce from "immer";
import { nanoid } from "nanoid";

import { fetchTodosAsync, Todo } from "./client";

export const todoActions = {
  fetchAsync: fetchTodosAsync,
  add: createAction("@todo/ADD")<{ task: string }>(),
  delete: createAction("@todo/DELETE")<{ todoID: string }>(),
};

export type TodoAction = ActionType<typeof todoActions>;

export type RootAction = TodoAction;

export const addTodo = (
  state: Todo[],
  action: ActionType<typeof todoActions.add>,
) =>
  produce(state, draft => {
    draft.push({ ...action.payload, todoID: nanoid(), completed: false });
  });

export const deleteTodo = (
  state: Todo[],
  action: ActionType<typeof todoActions.delete>,
) =>
  produce(state, draft => {
    const index = draft.findIndex(
      todo => todo.todoID === action.payload.todoID,
    );
    if (index !== -1) draft.splice(index, 1);
  });
