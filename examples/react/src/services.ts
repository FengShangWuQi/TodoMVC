import { nanoid } from "nanoid";

import { Todo } from "./actions";

const initTodos = [
  {
    todoID: nanoid(),
    task: "1",
    completed: false,
  },
];

const getTodoList = (): Promise<Todo[]> => {
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
