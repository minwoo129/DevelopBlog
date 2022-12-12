import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { getUserInfo, getUserWriteBlogs } from "../actions/appInfo";

export const getUserInfoThunk = createAsyncThunk(
  getUserInfo,
  invokeAPI({ method: "get", path: "/api/users/get" })
);

export const getUserWriteBlogsThunk = createAsyncThunk(
  getUserWriteBlogs,
  invokeAPI({ method: "get", path: "/api/content/get/list/userWrite" })
);
