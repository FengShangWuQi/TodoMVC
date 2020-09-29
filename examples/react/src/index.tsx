import React from "react";
import ReactDOM from "react-dom";

import { StoreProvider } from "./ctx";
import { store } from "./store";
import { TodoApp } from "./TodoApp";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <TodoApp />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
