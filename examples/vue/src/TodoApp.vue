<template>
  <ul>
    <TodoItem v-for="todo in todos" :key="todo.todoID" :todo="todo" />
  </ul>

  <input autofocus placeholder="add todo" @keyup.enter="addTodo" />
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

import TodoItem from "./TodoItem.vue";
import { TODO_ACTION_TYPE } from "./constants.js";

export default {
  components: { TodoItem },
  setup() {
    const store = useStore();

    const addTodo = e => {
      const inputVal = e.target.value;

      if (inputVal.trim()) {
        store.dispatch(TODO_ACTION_TYPE.add, inputVal);
      }

      e.target.value = "";
    };

    onMounted(() => {
      store.dispatch(TODO_ACTION_TYPE.fetchAsync);
    });

    return {
      todos: computed(() => store.state.todo.todos),
      addTodo,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
