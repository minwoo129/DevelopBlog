import { handleActions } from "redux-actions";
import produce from "immer";
import { createPromiseThunk } from "../lib/styles/api/asyncUtils";
import invokeAPI, { setToken } from "./restAPI";
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
};

// ********************************** 액션 정의 **********************************
//  비동기 액션일 때는 _SUCCESS, _ERROR 추가
// ******************************************************************************
const CHANGE_FIELD = "auth/CHANGE_FIELD";

const LOGIN = "auth/LOGIN";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_ERROR = "auth/LOGIN_ERROR";

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
      console.log("result(LOGIN_SUCCESS): ", result);
      const { token } = result;
      setToken(token);
      return state;
    },
    [LOGIN_ERROR]: (state, action) => {
      return state;
    },
  },
  initialState
);
