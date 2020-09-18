import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import { ITodoState } from "./TodoReducer";

export enum ActionType {
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
}

export type ITodoAction = addAction | deleteAction;

type addAction = {
  type: ActionType.ADD_TODO;
  payload: { task: string };
};

export const addTodo = (state: ITodoState[], arg: { task: string }) =>
  produce(state, (draft: ITodoState[]) => {
    draft.push({ ...arg, todoID: uuidv4(), completed: false });
  });

type deleteAction = {
  type: ActionType.DELETE_TODO;
  payload: { todoID: string };
};

export const deleteTodo = (state: ITodoState[], arg: { todoID: string }) =>
  produce(state, draft => {
    const index = draft.findIndex(todo => todo.todoID === arg.todoID);
    if (index !== -1) draft.splice(index, 1);
  });
