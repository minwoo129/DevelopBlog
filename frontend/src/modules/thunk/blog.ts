import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { getBlogs } from "../actions/blog";

export const getBlogsThunk = createAsyncThunk(
  getBlogs,
  invokeAPI({ method: "get", path: "/api/content/get/list" })
);
