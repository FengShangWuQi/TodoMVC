import { Epic, combineEpics } from "redux-observable";
import { from, of } from "rxjs";
import { takeUntil, filter, switchMap, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { fetchTodosAsync, RootAction } from "./actions";
import { RootState } from "./reducer";
import { Services } from "./services";

export const fetchTodosEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, _, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(fetchTodosAsync.request)),
    switchMap(() =>
      from(todosApi.getTodoList()).pipe(
        map(fetchTodosAsync.success),
        catchError(message => of(fetchTodosAsync.failure(message))),
        takeUntil(action$.pipe(filter(isActionOf(fetchTodosAsync.cancel)))),
      ),
    ),
  );

export const rootEpic = combineEpics(fetchTodosEpic);
