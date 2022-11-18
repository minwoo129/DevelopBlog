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
});
