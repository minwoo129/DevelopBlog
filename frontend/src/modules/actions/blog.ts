import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import { asyncCommonReturnType } from "./actionType";

export const SET_ADDED_IMAGE_IDS = "blog/SET_ADDED_IMAGE_IDS";

export const CLEAR_ADDED_IMAGE_IDS = "blog/CLEAR_ADDED_IMAGE_IDS";

export const GET_BLOGS = "blog/GET_BLOGS";
export const GET_BLOGS_SUCCESS = "blog/GET_BLOGS_SUCCESS";
export const GET_BLOGS_ERROR = "blog/GET_BLOGS_ERROR";

export const GET_BLOG = "blog/GET_BLOG";
export const GET_BLOG_SUCCESS = "blog/GET_BLOG_SUCCESS";
export const GET_BLOG_ERROR = "blog/GET_BLOG_ERROR";

export const GET_SEARCH_BLOGS = "blog/GET_SEARCH_BLOGS";
export const GET_SEARCH_BLOGS_SUCCESS = "blog/GET_SEARCH_BLOGS_SUCCESS";
export const GET_SEARCH_BLOGS_ERROR = "blog/GET_SEARCH_BLOGS_ERROR";

export const CLEAR_SEARCH_BLOGS = "blog/CLEAR_SEARCH_BLOGS";

export const GET_USER_WRITE_BLOGS = "blog/GET_USER_WRITE_BLOGS";
export const GET_USER_WRITE_BLOGS_SUCCESS = "blog/GET_USER_WRITE_BLOGS_SUCCESS";
export const GET_USER_WRITE_BLOGS_ERROR = "blog/GET_USER_WRITE_BLOGS_ERROR";
// ********************************** Action *******************************************e
export const setAddedImageIds = (id: number) => {
  return { type: SET_ADDED_IMAGE_IDS, payload: id };
};

export const clearAddedImageIds = () => {
  return { type: CLEAR_ADDED_IMAGE_IDS, payload: null };
};

export const getBlogs = createAsyncAction(
  GET_BLOGS,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_ERROR
)<any, asyncCommonReturnType, AxiosError>();

export const getBlog = createAsyncAction(
  GET_BLOG,
  GET_BLOG_SUCCESS,
  GET_BLOG_ERROR
)<any, asyncCommonReturnType, AxiosError>();

export const getSearchBlogs = createAsyncAction(
  GET_SEARCH_BLOGS,
  GET_SEARCH_BLOGS_SUCCESS,
  GET_SEARCH_BLOGS_ERROR
)<any, asyncCommonReturnType, AxiosError>();

export const clearSearchBlogs = () => {
  return { type: CLEAR_SEARCH_BLOGS, payload: null };
};

export const getUserWriteBlogs = createAsyncAction(
  GET_USER_WRITE_BLOGS,
  GET_USER_WRITE_BLOGS_SUCCESS,
  GET_USER_WRITE_BLOGS_ERROR
)<any, asyncCommonReturnType, AxiosError>();
