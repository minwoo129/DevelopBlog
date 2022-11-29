import { ActionType } from "typesafe-actions";
import { changeField, login } from "./auth";
import * as auth from "./auth";

export type authActionType = ActionType<typeof auth>;
