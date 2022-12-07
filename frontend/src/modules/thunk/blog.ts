import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { getBlog, getBlogs, getSearchBlogs } from "../actions/blog";

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
