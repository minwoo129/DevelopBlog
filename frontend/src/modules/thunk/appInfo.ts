import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { getUserInfo } from "../actions/appInfo";

export const getUserInfoThunk = createAsyncThunk(
  getUserInfo,
  invokeAPI({ method: "get", path: "/api/users/get" })
);
