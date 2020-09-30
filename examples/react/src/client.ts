import { createAsyncAction } from "typesafe-actions";
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

const getTodoList = (): Promise<Todo[]> => {
  const initTodos = [
    {
      todoID: nanoid(),
      task: "1",
      completed: false,
    },
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(initTodos);
    }, 500);
  });
};

export const services = {
  todosApi: {
    getTodoList,
  },
};

export type Services = typeof services;
