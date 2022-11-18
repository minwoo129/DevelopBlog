import { ActionType } from "typesafe-actions";
import { changeField } from "./auth";

export type AuthActionTypes = ActionType<typeof changeField>;
