import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { asyncCommonReturnType } from "./actionType";
import { setAppStateParams } from "./actionType/appInfo";

export const SET_SEARCHBAR_VISIBLE = "appInfo/SET_SEARCHBAR_VISIBLE";

export const SET_SEARCH_TXT = "appInfo/SET_SEARCH_TXT";

export const GET_USER_INFO = "appInfo/GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "appInfo/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_ERROR = "appInfo/GET_USER_INFO_ERROR";

export const SET_APP_STATE = "appInfo/SET_APP_STATE";

export const CLEAR_REVISE_DATA = "appInfo/CLEAR_REVISE_DATA";

export const CLEAR_DATA_WHEN_LOGOUT = "appInfo/CLEAR_DATA_WHEN_LOGOUT";
// ********************************** Action *******************************************
export const setSearchbarVisible = (value: boolean) => {
  return { type: SET_SEARCHBAR_VISIBLE, payload: value };
};

export const setSearchTxt = (value: string) => {
  return { type: SET_SEARCH_TXT, payload: value };
};

export const getUserInfo = createAsyncAction(
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR
)<any, asyncCommonReturnType, AxiosError>();

export const setAppState = (value: setAppStateParams) => {
  return { type: SET_APP_STATE, payload: value };
};

export const clearReviseData = () => {
  return { type: CLEAR_REVISE_DATA, payload: null };
};

export const clearDataWhenLogout = () => {
  return { type: CLEAR_DATA_WHEN_LOGOUT, payload: null };
};
