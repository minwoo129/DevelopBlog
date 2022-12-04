import { createReducer } from "typesafe-actions";
import { blogActionType } from "../actions";
import {
  CLEAR_ADDED_IMAGE_IDS,
  GET_BLOG,
  GET_BLOGS,
  GET_BLOGS_ERROR,
  GET_BLOGS_SUCCESS,
  GET_BLOG_ERROR,
  GET_BLOG_SUCCESS,
  SET_ADDED_IMAGE_IDS,
} from "../actions/blog";
import { blogInitialState as initialState } from "../initialStates/initialState";
import { blogInitialStateType as initialStateType } from "../initialStates/initialStateType";

export default createReducer<initialStateType, blogActionType>(initialState, {
  // SET_ADDED_IMAGE_IDS ////////////////////////////////////////////////////
  [SET_ADDED_IMAGE_IDS]: (state, { payload: id }) => {
    let newIds = [...state.addedImageIds, id ?? 0];
    const newState: initialStateType = {
      ...state,
      addedImageIds: newIds,
    };
    return newState;
  },

  // CLEAR_ADDED_IMAGE_IDS ////////////////////////////////////////////////////
  [CLEAR_ADDED_IMAGE_IDS]: (state, { payload: result }) => {
    const newState: initialStateType = {
      ...state,
      addedImageIds: [],
    };
    return newState;
  },

  // GET_BLOGS ////////////////////////////////////////////////////
  [GET_BLOGS]: (state, action) => {
    return state;
  },
  [GET_BLOGS_SUCCESS]: (state, { payload: { param, result } }) => {
    const newState: initialStateType = {
      ...state,
      blogs: result.data,
    };
    return newState;
  },
  [GET_BLOGS_ERROR]: (state, action) => {
    return state;
  },

  // GET_BLOG ////////////////////////////////////////////////////
  [GET_BLOG]: (state, action) => {
    return state;
  },
  [GET_BLOG_SUCCESS]: (state, { payload: { param, result } }) => {
    const newState: initialStateType = {
      ...state,
      blog: result.data,
    };
    return newState;
  },
  [GET_BLOG_ERROR]: (state, action) => {
    return state;
  },
});