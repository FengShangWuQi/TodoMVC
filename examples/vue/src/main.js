import { createApp } from "vue";

import TodoApp from "./TodoApp.vue";
import { store } from "./store";

const app = createApp(TodoApp);

app.use(store);

app.mount("#app");
