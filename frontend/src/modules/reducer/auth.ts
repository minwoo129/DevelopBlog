import { createReducer } from "typesafe-actions";
import { AuthActionTypes } from "../actions";
import { AuthStateType } from "../initialStates/initialStateType";
import { AuthInitialState as initialState } from "../initialStates/initialStates";
import {
  CHANGE_FIELD,
  JOIN,
  JOIN_ERROR,
  JOIN_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "../actionTypes/auth";
import produce from "immer";

export default createReducer<AuthStateType, AuthActionTypes>(initialState, {
  // CHANGE_FIELD ================================================
  [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => {
    return produce(state, (draft: any) => {
      draft[form][key] = value;
    });
  },
  // LOGIN ================================================
  [LOGIN]: (state, action) => {
    return state;
  },
  [LOGIN_SUCCESS]: (state, { payload }) => {
    console.log("result(LOGIN_SUCCESS): ", payload);
    return state;
  },
  [LOGIN_ERROR]: (state, action) => {
    console.log("result(LOGIN_ERROR): ", action);
    return state;
  },
  // JOIN ================================================
  [JOIN]: (state, action) => {
    return state;
  },
  [JOIN_SUCCESS]: (state, { payload }) => {
    console.log("result(JOIN_SUCCESS): ", payload);
    return state;
  },
  [JOIN_ERROR]: (state, action) => {
    console.log("result(JOIN_ERROR): ", action);
    return state;
  },
});
