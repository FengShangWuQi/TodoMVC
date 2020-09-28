import { createAction, createAsyncAction } from "typesafe-actions";

import { formatActionConstants } from "./constants";

export enum AsyncStage {
  REQUEST = "REQUEST",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  CANCEL = "CANCEL",
}

export const actor = (key: string) => <
  TPayload extends any = undefined,
  TMeta extends any = undefined
>(
  type: string,
) => {
  return createAction(formatActionConstants(key, type))<TPayload, TMeta>();
};

export const asyncActor = (key: string) => <
  TPayloadMeta1 extends any = undefined,
  TPayloadMeta2 extends any = undefined,
  TPayloadMeta3 extends any = undefined,
  TPayloadMeta4 extends any = undefined
>(
  type: string,
) => {
  const args = Object.keys(AsyncStage).map(stage =>
    formatActionConstants(key, type, stage),
  );
  return createAsyncAction(args[0], args[1], args[2], args[3])<
    TPayloadMeta1,
    TPayloadMeta2,
    TPayloadMeta3,
    TPayloadMeta4
  >();
};
