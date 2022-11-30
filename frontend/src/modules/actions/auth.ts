import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { asyncCommonReturnType } from "./actionType";
import { ChangeFieldParam } from "./actionType/auth";

export const CHANGE_FIELD = "auth/CHANGE_FIELD";

export const LOGIN = "auth/LOGIN";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_ERROR = "auth/LOGIN_ERROR";

export const INITIALIZE_BY_TOKEN = "auth/INITIALIZE_BY_TOKEN";

export const LOGOUT = "auth/LOGOUT";

// ********************************** Action *******************************************
export const changeField = ({ form, key, value }: ChangeFieldParam) => {
  return { type: CHANGE_FIELD, payload: { form, key, value } };
};

export const login = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<
  any,
  asyncCommonReturnType,
  AxiosError
>();
