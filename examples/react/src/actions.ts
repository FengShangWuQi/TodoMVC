import { createAction, createAsyncAction, ActionType } from "typesafe-actions";
import produce from "immer";
import { nanoid } from "nanoid";

export interface Todo {
  todoID: string;
  task: string;
  completed: boolean;
}

export const fetchTodosAsync = createAsyncAction(
  "@todo/FETCH_REQUEST",
  "@todo/FETCH_SUCCESS",
  "@todo/FETCH_FAILURE",
  "@todo/FETCH_CANCEL",
)<undefined, Todo[], Error, undefined>();

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
