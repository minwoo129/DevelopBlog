import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { AuthStateType } from "../initialStates/initialStateType";

export const CHANGE_FIELD = "auth/CHANGE_FIELD";

export const LOGIN = "auth/LOGIN";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_ERROR = "auth/LOGIN_ERROR";

export const JOIN = "auth/JOIN";
export const JOIN_SUCCESS = "auth/JOIN_SUCCESS";
export const JOIN_ERROR = "auth/JOIN_ERROR";
