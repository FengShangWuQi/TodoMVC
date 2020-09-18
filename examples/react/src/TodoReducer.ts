import { ITodoAction, ActionType, addTodo, deleteTodo } from "./TodoAction";

export interface ITodoState {
  todoID: string;
  task: string;
  completed: boolean;
}

export const initTodos: ITodoState[] = [];

export const todoReducer = (state: ITodoState[], action: ITodoAction) => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return addTodo(state, action.payload);

    case ActionType.DELETE_TODO:
      return deleteTodo(state, action.payload);
  }
};
