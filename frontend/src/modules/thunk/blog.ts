import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import {
  addComment,
  getBlog,
  getBlogs,
  getComments,
  getSearchBlogs,
  getUserWriteBlogs,
} from "../actions/blog";

export const getBlogsThunk = createAsyncThunk(
  getBlogs,
  invokeAPI({ method: "get", path: "/api/content/get/list" })
);

export const getBlogThunk = createAsyncThunk(
  getBlog,
  invokeAPI({ method: "get", path: "/api/content/get" })
);

export const getSearchBlogsThunk = createAsyncThunk(
  getSearchBlogs,
  invokeAPI({ method: "get", path: "/api/content/search" })
);

export const getUserWriteBlogsThunk = createAsyncThunk(
  getUserWriteBlogs,
  invokeAPI({ method: "get", path: "/api/content/get/list/userWrite" })
);

export const addCommentThunk = createAsyncThunk(
  addComment,
  invokeAPI({ method: "post", path: "/api/comment/save" })
);

export const getCommentsThunk = createAsyncThunk(
  getComments,
  invokeAPI({ method: "get", path: "/api/comment/get/list" })
);
