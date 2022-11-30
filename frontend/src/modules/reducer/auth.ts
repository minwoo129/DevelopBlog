import { createReducer } from "typesafe-actions";
import { authActionType } from "../actions";
import { authInitialStateType as initialStateType } from "../initialStates/initialStateType";
import { authInitialState as initialState } from "../initialStates/initialState";
import {
  CHANGE_FIELD,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "../actions/auth";

export default createReducer<initialStateType, authActionType>(initialState, {
  // CHANGE_FIELD ////////////////////////////////////////////////////
  [CHANGE_FIELD]: (state, { payload: result }) => {
    const { form, key, value } = result;
    let newForm: "loginForm" | "joinForm" = form;
    const newState = {
      ...state,
      [form]: {
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
  [LOGIN_SUCCESS]: (state, { payload: result }) => {
    console.log("result(LOGIN_SUCCESS): ", result);
    return state;
  },
  [LOGIN_ERROR]: (state, action) => {
    return state;
  },
});
