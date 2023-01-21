import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { asyncCommonReturnType } from "./actionType";
import { ChangeFieldParam, InitializeByTokenParam } from "./actionType/auth";

export const CHANGE_FIELD = "auth/CHANGE_FIELD";

export const LOGIN = "auth/LOGIN";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_ERROR = "auth/LOGIN_ERROR";

export const JOIN = "auth/JOIN";
export const JOIN_SUCCESS = "auth/JOIN_SUCCESS";
export const JOIN_ERROR = "auth/JOIN_ERROR";

export const INITIALIZE_BY_TOKEN = "auth/INITIALIZE_BY_TOKEN";

export const TOKEN_CHECK = "auth/TOKEN_CHECK";
export const TOKEN_CHECK_SUCCESS = "auth/TOKEN_CHECK_SUCCESS";
export const TOKEN_CHECK_ERROR = "auth/TOKEN_CHECK_ERROR";

export const LOGOUT = "auth/LOGOUT";

export const CLEAR_LOGIN_FORM = "auth/CLEAR_LOGIN_FORM";

export const CLEAR_JOIN_FORM = "auth/CLEAR_JOIN_FORM";

// ********************************** Action *******************************************
export const changeField = ({ form, key, value }: ChangeFieldParam) => {
  return { type: CHANGE_FIELD, payload: { form, key, value } };
};

export const login = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<
  any,
  asyncCommonReturnType,
  AxiosError
>();

export const join = createAsyncAction(JOIN, JOIN_SUCCESS, JOIN_ERROR)<
  any,
  asyncCommonReturnType,
  AxiosError
>();

export const initializeByToken = ({
  name,
  email,
  token,
  id,
}: InitializeByTokenParam) => {
  return { type: INITIALIZE_BY_TOKEN, payload: { name, email, token, id } };
};

export const tokenCheck = createAsyncAction(
  TOKEN_CHECK,
  TOKEN_CHECK_SUCCESS,
  TOKEN_CHECK_ERROR
)<any, asyncCommonReturnType, AxiosError>();

export const logout = () => {
  return { type: LOGOUT, payload: null };
};

export const clearLoginForm = () => {
  return { type: CLEAR_LOGIN_FORM, payload: null };
};

export const clearJoinForm = () => {
  return { type: CLEAR_JOIN_FORM, payload: null };
};
