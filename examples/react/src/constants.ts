export const formatActionConstants = (key: string, ...rest: string[]) =>
  `@${key}/${rest.map(name => name.toUpperCase()).join("_")}`;
