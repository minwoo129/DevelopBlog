import { createReducer } from "typesafe-actions";
import { authActionType } from "../actions";
import { authInitialStateType as initialStateType } from "../initialStates/initialStateType";
import { authInitialState as initialState } from "../initialStates/initialState";
import {
  CHANGE_FIELD,
  INITIALIZE_BY_TOKEN,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/auth";
import { removeCookies, setCookies } from "../../lib/restAPI";

export default createReducer<initialStateType, authActionType>(initialState, {
  // CHANGE_FIELD ////////////////////////////////////////////////////
  [CHANGE_FIELD]: (state, { payload: result }) => {
    const { form, key, value } = result;
    let newForm: "loginForm" | "joinForm" = form;
    const newState = {
      ...state,
      [newForm]: {
        ...state[newForm],
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
    setCookies("cookie", result.data);
    const newState: initialStateType = {
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
  [LOGOUT]: (state, action) => {
    const newState = {
      ...initialState,
    };
    removeCookies("cookie");
    return newState;
  },
});
