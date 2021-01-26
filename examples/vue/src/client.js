import { nanoid } from "nanoid";

const getTodoList = () => {
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
