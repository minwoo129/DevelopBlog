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
