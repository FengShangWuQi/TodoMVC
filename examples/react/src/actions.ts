import { ActionType, createAsyncAction } from "typesafe-actions";
import produce from "immer";
import { v4 as uuidv4 } from "uuid";

import { actor, asyncActor } from "./actor";

export interface Todo {
  todoID: string;
  task: string;
  completed: boolean;
}

const todosActor = actor("todo");
const todosAsyncActor = asyncActor("todo");

const completedTodoAsync = todosAsyncActor<{ todoID: string }, Todo[], Error>(
  "completed",
);

export const todoActions = {
  completedAsync: completedTodoAsync.success,
  add: todosActor<{ task: string }>("add"),
  delete: todosActor<{ todoID: string }>("delete"),
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
