import { createReducer } from "typesafe-actions";
import { appInfoActionType } from "../actions";
import { SET_SEARCHBAR_VISIBLE, SET_SEARCH_TXT } from "../actions/appInfo";
import { appInfoInitialState as initialState } from "../initialStates/initialState";
import { appInfoInitialStateType as initialStateType } from "../initialStates/initialStateType";

export default createReducer<initialStateType, appInfoActionType>(
  initialState,
  {
    // SET_SEARCHBAR_VISIBLE ////////////////////////////////////////////////////
    [SET_SEARCHBAR_VISIBLE]: (state, { payload: result }) => {
      let searchBarVisible: boolean = false;
      if (typeof result == "boolean") searchBarVisible = result;
      const newState: initialStateType = {
        ...state,
        searchBarVisible,
      };
      return newState;
    },
    // SET_SEARCH_TXT ////////////////////////////////////////////////////
    [SET_SEARCH_TXT]: (state, { payload: result }) => {
      let searchTxt: string = "";
      if (typeof result == "string") searchTxt = result;
      const newState: initialStateType = {
        ...state,
        searchTxt,
      };
      return newState;
    },
  }
);
