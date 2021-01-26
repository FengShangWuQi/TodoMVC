import { nanoid } from "nanoid";

import { services } from "../client.js";
import { TODO_ACTION_TYPE } from "../constants.js";

const todoState = {
  todos: [],
};

const todoActions = {
  [TODO_ACTION_TYPE.fetchAsync]: async ({ commit }) => {
    const todos = await services.todosApi.getTodoList();
    commit(TODO_ACTION_TYPE.fetchAsync, { todos });
  },
  [TODO_ACTION_TYPE.add]: ({ commit }, task) =>
    commit(TODO_ACTION_TYPE.add, { task }),
  [TODO_ACTION_TYPE.remove]: ({ commit }, todoID) =>
    commit(TODO_ACTION_TYPE.remove, { todoID }),
};

const todoMutations = {
  [TODO_ACTION_TYPE.fetchAsync]: (state, { todos }) => {
    state.todos = todos;
  },
  [TODO_ACTION_TYPE.add]: (state, { task }) => {
    state.todos = [
      ...state.todos,
      { todoID: nanoid(), completed: false, task },
    ];
  },
  [TODO_ACTION_TYPE.remove]: (state, { todoID }) => {
    state.todos = state.todos.filter(todo => todo.todoID !== todoID);
  },
};

export default {
  state: {
    ...todoState,
  },
  actions: {
    ...todoActions,
  },
  mutations: {
    ...todoMutations,
  },
};
