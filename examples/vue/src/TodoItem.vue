<template>
  <li>
    <div>{{ todo.task }}</div>
    <button @click="removeTodo(todo.todoID)">Delete</button>
  </li>
</template>

<script>
import { useStore } from "vuex";

import { TODO_ACTION_TYPE } from "./constants.js";

export default {
  props: ["todo"],
  setup() {
    const store = useStore();

    const removeTodo = todoID =>
      store.dispatch(TODO_ACTION_TYPE.remove, todoID);

    return {
      removeTodo,
    };
  },
};
</script>
