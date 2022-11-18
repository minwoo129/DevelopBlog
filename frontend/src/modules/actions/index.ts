import { ActionType } from "typesafe-actions";
import { changeField, join, login } from "./auth";

export type AuthActionTypes =
  | ActionType<typeof changeField>
  | ActionType<typeof login>
  | ActionType<typeof join>;
