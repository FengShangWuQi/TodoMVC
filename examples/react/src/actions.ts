import { ActionType, createAction } from "typesafe-actions";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  todoID: string;
  task: string;
  completed: boolean;
}

export const todoActions = {
  add: createAction("@todos/ADD")<{ task: string }>(),
  delete: createAction("@todos/REMOVE")<{ todoID: string }>(),
};

export type TodoAction = ActionType<typeof todoActions>;

export const addTodo = (
  state: Todo[],
  action: ActionType<typeof todoActions.add>,
) =>
  produce(state, draft => {
    draft.push({ ...action.payload, todoID: uuidv4(), completed: false });
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
