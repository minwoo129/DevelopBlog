import { handleActions } from "redux-actions";
import produce from "immer";
import { createPromiseThunk } from "../lib/api/asyncUtils";
import invokeAPI, { setCookies, setToken } from "./restAPI";
// ********************************* state초기화 ********************************
const initialState = {
  login: {
    email: "",
    pwd: "",
  },
  join: {
    email: "",
    pwd: "",
    pwdCheck: "",
    name: "",
    isAdmin: false,
    adminPwd: "",
  },
  login: false,
  loginInfo: {
    name: null,
    email: null,
  },
};

// ********************************** 액션 정의 **********************************
//  비동기 액션일 때는 _SUCCESS, _ERROR 추가
// ******************************************************************************
const CHANGE_FIELD = "auth/CHANGE_FIELD";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_ERROR = "auth/LOGIN_ERROR";

const LOGIN_TOKEN = "auth/LOGIN_TOKEN";
const LOGIN_TOKEN_SUCCESS = "auth/LOGIN_TOKEN_SUCCESS";
const LOGIN_TOKEN_ERROR = "auth/LOGIN_TOKEN_ERROR";

// *********************************** thunk ************************************
//  비동기 액션일 때는 createPromiseThunk 호출, 아니면 그냥 action(object) 리턴
// ******************************************************************************
export const changeField = (value) => {
  return { type: CHANGE_FIELD, payload: value };
};

export const login = createPromiseThunk(
  LOGIN,
  invokeAPI({ method: "post", path: "/users/login" })
);

export const loginToken = createPromiseThunk(
  LOGIN_TOKEN,
  invokeAPI({ method: "post", path: "/users/token" })
);

// *********************************** reducer ***********************************
export default handleActions(
  {
    // CHANGE_FIELD ////////////////////////////////////////////////////
    [CHANGE_FIELD]: (state, { payload: result }) => {
      const { form, key, value } = result;

      const newState = {
        ...state,
        [form]: {
          ...state[form],
          [key]: value,
        },
      };

      return newState;
    },

    // LOGIN ////////////////////////////////////////////////////
    [LOGIN]: (state, action) => {
      return state;
    },
    [LOGIN_SUCCESS]: (state, { payload: { param, result } }) => {
      setToken(result);
      setCookies(result);
      const newState = {
        ...state,
        login: true,
        loginInfo: {
          name: result.name,
          email: result.email,
        },
      };
      return newState;
    },
    [LOGIN_ERROR]: (state, action) => {
      return state;
    },

    // LOGIN_TOKEN ////////////////////////////////////////////////////
    [LOGIN_TOKEN]: (state, action) => {
      return state;
    },
    [LOGIN_TOKEN_SUCCESS]: (state, { payload: { param, result } }) => {
      setToken(result);
      setCookies(result);
      const newState = {
        ...state,
        login: true,
        loginInfo: {
          name: result.name,
          email: result.email,
        },
      };
      return newState;
    },
    [LOGIN_TOKEN_ERROR]: (state, action) => {
      return state;
    },
  },
  initialState
);
