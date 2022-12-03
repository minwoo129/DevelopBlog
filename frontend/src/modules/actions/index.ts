import { ActionType } from "typesafe-actions";
import { changeField, login } from "./auth";
import * as auth from "./auth";
import * as menu from "./menu";
import * as blog from "./blog";

export type authActionType = ActionType<typeof auth>;
export type menuActionType = ActionType<typeof menu>;
export type blogActionType = ActionType<typeof blog>;
