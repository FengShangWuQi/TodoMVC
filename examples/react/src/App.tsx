import React, { useRef } from "react";

const App = () => {
  const ref = useRef(null);

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          ref={ref}
          className="new-todo"
          placeholder="What needs to be done?"
          // onKeyDown={e => {}}
          autoFocus={true}
        />
      </header>
    </div>
  );
};

export default App;
