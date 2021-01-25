import React, { useEffect, useRef, useState, useCallback } from "react";
import { fromEvent } from "rxjs";
import { filter as rxFilter, map as rxMap } from "rxjs/operators";
import { getType } from "typesafe-actions";

import { useStore } from "./ctx";
import { todoActions } from "./actions";

const TodoList = () => {
  const {
    state: { todos },
    dispatch,
  } = useStore();
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
  const { dispatch } = useStore();
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputVal) {
      dispatch({
        type: getType(todoActions.add),
        payload: {
          task: inputVal,
        },
      });

      setInputVal("");
    }
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
  const { dispatch } = useStore();

  useEffect(() => {
    dispatch({
      type: getType(todoActions.fetchAsync.request),
    });
  }, []);

  return (
    <>
      <TodoList />
      <AddTodo />
    </>
  );
};
