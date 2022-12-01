import invokeAPI from "../../lib/restAPI";
import createAsyncThunk from "../../lib/thunk/createAsyncThunk";
import { login, tokenCheck } from "../actions/auth";

export const loginThunk = createAsyncThunk(
  login,
  invokeAPI({ method: "post", path: "/api/oauth/token" })
);

export const tokenCheckThunk = createAsyncThunk(
  tokenCheck,
  invokeAPI({ method: "post", path: "/api/token/validate" })
);
