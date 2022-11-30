import { createReducer } from "typesafe-actions";
import { menuActionType } from "../actions";
import { SET_MENU_OPEN, SET_MENU_VISIBLE } from "../actions/menu";
import { menuInitialState as initialState } from "../initialStates/initialState";
import { menuInitialStateType as initialStateType } from "../initialStates/initialStateType";

export default createReducer<initialStateType, menuActionType>(initialState, {
  // SET_MENU_VISIBLE ////////////////////////////////////////////////////
  [SET_MENU_VISIBLE]: (state, { payload: result }) => {
    const newState: initialStateType = {
      ...state,
      isMenuVisible: result,
    };
    return newState;
  },
  // SET_MENU_OPEN ////////////////////////////////////////////////////
  [SET_MENU_OPEN]: (state, { payload: result }) => {
    const newState: initialStateType = {
      ...state,
      isMenuOpen: result,
    };
    return newState;
  },
});
