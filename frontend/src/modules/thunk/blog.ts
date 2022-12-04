import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { getBlog, getBlogs } from "../actions/blog";

export const getBlogsThunk = createAsyncThunk(
  getBlogs,
  invokeAPI({ method: "get", path: "/api/content/get/list" })
);

export const getBlogThunk = createAsyncThunk(
  getBlog,
  invokeAPI({ method: "get", path: "/api/content/get" })
);
