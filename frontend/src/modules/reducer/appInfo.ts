import { createReducer } from "typesafe-actions";
import { appInfoActionType } from "../actions";
import {
  GET_USER_INFO,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_SUCCESS,
  GET_USER_WRITE_BLOGS,
  GET_USER_WRITE_BLOGS_ERROR,
  GET_USER_WRITE_BLOGS_SUCCESS,
  SET_APP_STATE,
  SET_SEARCHBAR_VISIBLE,
  SET_SEARCH_TXT,
} from "../actions/appInfo";
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

    // GET_USER_INFO ////////////////////////////////////////////////////
    [GET_USER_INFO]: (state, action) => {
      return state;
    },
    [GET_USER_INFO_SUCCESS]: (state, { payload: { param, result } }) => {
      const newState: initialStateType = {
        ...state,
        userInfo: result.data,
      };
      return newState;
    },
    [GET_USER_INFO_ERROR]: (state, action) => {
      return state;
    },

    // GET_USER_WRITE_BLOGS ////////////////////////////////////////////////////
    [GET_USER_WRITE_BLOGS]: (state, action) => {
      return state;
    },
    [GET_USER_WRITE_BLOGS_SUCCESS]: (state, { payload: { param, result } }) => {
      const newState: initialStateType = {
        ...state,
        userWriteBlogs: result.data,
      };
      return newState;
    },
    [GET_USER_WRITE_BLOGS_ERROR]: (state, action) => {
      return state;
    },

    // SET_APP_STATE ////////////////////////////////////////////////////
    [SET_APP_STATE]: (state, { payload: result }) => {
      const { key, value } = result;
      const newState: initialStateType = {
        ...state,
        [key]: value,
      };
      return newState;
    },
  }
);
