const createAction = (typePrefix, types) => {
  return types.reduce((prev, curr) => {
    return {
      ...prev,
      [`${curr}`]: `@${typePrefix}/${curr.toUpperCase()}`,
    };
  }, {});
};

export const TODO_ACTION_TYPE = createAction("todo", [
  "fetchAsync",
  "add",
  "remove",
]);
