import { createReducer } from "typesafe-actions";
import { appInfoActionType } from "../actions";
import {
  CLEAR_DATA_WHEN_LOGOUT,
  CLEAR_REVISE_DATA,
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
      let newState: initialStateType = {
        ...state,
        userInfo: result.data,
      };
      if (result.data.profileImg) {
        newState = {
          ...newState,
          userImgSrc: result.data.profileImg.publishedUrl,
        };
      }
      if (result.data.backgroundImg) {
        newState = {
          ...newState,
          backgroundImgSrc: result.data.backgroundImg.publishedUrl,
        };
      }
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

    // CLEAR_REVISE_DATA ////////////////////////////////////////////////////
    [CLEAR_REVISE_DATA]: (state, { payload: result }) => {
      let newState: initialStateType = {
        ...state,
        userImgTempData: null,
        backgroundImgTempData: null,
        isReviseUserInfo: false,
        userImgSrc: null,
        backgroundImgSrc: null,
        tempNickname: "",
      };
      if (state.userInfo?.profileImg) {
        newState = {
          ...newState,
          userImgSrc: state.userInfo.profileImg.publishedUrl,
        };
      }
      if (state.userInfo?.backgroundImg) {
        newState = {
          ...newState,
          backgroundImgSrc: state.userInfo.backgroundImg.publishedUrl,
        };
      }
      return newState;
    },

    // CLEAR_DATA_WHEN_LOGOUT ////////////////////////////////////////////////////
    [CLEAR_DATA_WHEN_LOGOUT]: (state, { payload: result }) => {
      return {
        ...initialState,
      };
    },
  }
);
