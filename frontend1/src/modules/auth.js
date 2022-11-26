import { handleActions } from "redux-actions";
import { createPromiseThunk } from "../lib/api/asyncUtils";
import invokeAPI, { removeCookies, setCookies } from "./restAPI";
// ********************************* state초기화 ********************************
const initialState = {
  loginForm: {
    email: "",
    pwd: "",
  },
  joinForm: {
    email: "",
    pwd: "",
    pwdCheck: "",
    name: "",
    isAdmin: false,
    adminPwd: "",
  },
  login: false,
  loginInfo: {
    id: null,
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

const INITIALIZE_BY_TOKEN = "auth/INITIALIZE_BY_TOKEN";

const LOGOUT = "auth/LOGOUT";

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

export const initializeByToken = (value) => {
  return { type: INITIALIZE_BY_TOKEN, payload: value };
};

export const logout = () => {
  return { type: LOGOUT };
};

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
      setCookies(result.data);
      console.log("result(LOGIN_SUCCESS): ", result);
      const newState = {
        ...state,
        login: true,
        loginInfo: {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
        },
        loginForm: {
          email: "",
          pwd: "",
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
      const newState = {
        ...state,
        login: false,
        loginInfo: {
          name: null,
          email: null,
        },
      };
      return newState;
    },

    // INITIALIZE_BY_TOKEN ////////////////////////////////////////////////////
    [INITIALIZE_BY_TOKEN]: (state, { payload: result }) => {
      const { name, email, token, id } = result;
      const newState = {
        ...state,
        loginInfo: { name, email, id },
        login: true,
      };

      return newState;
    },

    // LOGOUT ////////////////////////////////////////////////////
    [LOGOUT]: (state) => {
      const newState = {
        ...initialState,
      };
      removeCookies("cookie");
      return newState;
    },
  },
  initialState
);
