import { createReducer } from "typesafe-actions";
import { blogActionType } from "../actions";
import {
  CLEAR_ADDED_IMAGE_IDS,
  CLEAR_SEARCH_BLOGS,
  GET_BLOG,
  GET_BLOGS,
  GET_BLOGS_ERROR,
  GET_BLOGS_SUCCESS,
  GET_BLOG_ERROR,
  GET_BLOG_SUCCESS,
  GET_SEARCH_BLOGS,
  GET_SEARCH_BLOGS_ERROR,
  GET_SEARCH_BLOGS_SUCCESS,
  GET_USER_WRITE_BLOGS,
  GET_USER_WRITE_BLOGS_ERROR,
  GET_USER_WRITE_BLOGS_SUCCESS,
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

  // GET_SEARCH_BLOGS ////////////////////////////////////////////////////
  [GET_SEARCH_BLOGS]: (state, action) => {
    return state;
  },
  [GET_SEARCH_BLOGS_SUCCESS]: (state, { payload: { param, result } }) => {
    const newState: initialStateType = {
      ...state,
      searchBlogs: result.data,
      isExecuteSearch: true,
    };
    return newState;
  },
  [GET_SEARCH_BLOGS_ERROR]: (state, action) => {
    return state;
  },

  // CLEAR_SEARCH_BLOGS ////////////////////////////////////////////////////
  [CLEAR_SEARCH_BLOGS]: (state, { payload: result }) => {
    const newState: initialStateType = {
      ...state,
      searchBlogs: [],
      isExecuteSearch: false,
    };
    return newState;
  },

  // GET_USER_WRITE_BLOGS ////////////////////////////////////////////////////
  [GET_USER_WRITE_BLOGS]: (state, action) => {
    return state;
  },
  [GET_USER_WRITE_BLOGS_SUCCESS]: (state, { payload: { param, result } }) => {
    let newState: initialStateType = {
      ...state,
    };
    if (param?.params?.page == 1) {
      newState = {
        ...newState,
        userWriteBlogs: result.data,
      };
    } else {
      let contents: any[] = [];
      if (newState.userWriteBlogs) {
        contents = [
          ...newState.userWriteBlogs.contents,
          ...result.data.contents,
        ];
        newState = {
          ...newState,
          userWriteBlogs: {
            ...newState.userWriteBlogs,
            contents,
          },
        };
      }
    }
    return newState;
  },
  [GET_USER_WRITE_BLOGS_ERROR]: (state, action) => {
    return state;
  },
});
