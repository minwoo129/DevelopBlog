import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { join, login, tokenCheck } from "../actions/auth";

export const loginThunk = createAsyncThunk(
  login,
  invokeAPI({ method: "post", path: "/api/oauth/token" })
);

export const joinThunk = createAsyncThunk(
  join,
  invokeAPI({ method: "post", path: "/api/users/join" })
);

export const tokenCheckThunk = createAsyncThunk(
  tokenCheck,
  invokeAPI({ method: "post", path: "/api/oauth/token/validate" })
);
