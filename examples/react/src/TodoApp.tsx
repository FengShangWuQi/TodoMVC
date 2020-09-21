import React, {
  useRef,
  useState,
  useReducer,
  useContext,
  useCallback,
  useEffect,
  createContext,
} from "react";
import { fromEvent } from "rxjs";
import { filter as rxFilter, map as rxMap } from "rxjs/operators";
import { getType } from "typesafe-actions";

import { todosReducer, TodosState } from "./reducer";
import { TodoAction, todoActions } from "./actions";

interface ITodoContext {
  todos: TodosState[];
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext({} as ITodoContext);
const TodoProvider = TodoContext.Provider;

const useTodo = () => useContext(TodoContext);

const TodoList = () => {
  const { todos, dispatch } = useTodo();
  const ref = useRef<HTMLUListElement>(null);

  const handleDelete = useCallback((todoID: string) => {
    dispatch({
      type: getType(todoActions.delete),
      payload: {
        todoID,
      },
    });
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const clicksOnTodoList = fromEvent(ref.current, "click");
    const clicksOnDelButton = clicksOnTodoList.pipe(
      rxFilter(
        ev => (ev.target as HTMLElement).tagName === "button".toUpperCase(),
      ),
      rxMap(ev => (ev.target as HTMLElement).dataset.value),
    );

    const sub = clicksOnDelButton.subscribe(id => {
      handleDelete(id as string);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [handleDelete]);

  return (
    <ul ref={ref}>
      {todos.map(todo => (
        <li key={todo.todoID}>
          <div>{todo.task}</div>
          <button data-value={todo.todoID}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const AddTodo = () => {
  const { dispatch } = useTodo();
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: getType(todoActions.add),
      payload: {
        task: inputVal,
      },
    });

    setInputVal("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        placeholder="add todo"
        autoFocus={true}
      />
    </form>
  );
};

export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todosReducer, [
    { todoID: "0", task: "1", completed: false },
  ]);

  return (
    <TodoProvider value={{ todos, dispatch }}>
      <TodoList />
      <AddTodo />
    </TodoProvider>
  );
};
