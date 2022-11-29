import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { login } from "../actions/auth";

export const loginThunk = createAsyncThunk(
  login,
  invokeAPI({ method: "post", path: "/api/users/login" })
);
