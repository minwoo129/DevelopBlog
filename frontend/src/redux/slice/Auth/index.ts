import { createSlice } from "@reduxjs/toolkit";
import { AuthInitialState as initialState } from "../../state";
import {
  changeJoinFieldAction,
  changeLoginFieldAction,
  clearJoinFormAction,
  clearLoginFormAction,
  initializeByTokenAction,
  joinRetType,
  loginRetType,
  logoutAction,
} from "./types";
import { createPromiseThunk } from "../../lib/AsyncUtils";
import { removeCookies } from "../../../lib/restAPI";

export const login = createPromiseThunk<loginRetType>({
  type: "auth/LOGIN",
  method: "post",
  path: "/api/oauth/token",
});

export const join = createPromiseThunk<joinRetType>({
  type: "auth/JOIN",
  method: "post",
  path: "/api/users/join",
});

export const tokenCheck = createPromiseThunk<loginRetType>({
  type: "auth/TOKEN_CHECK",
  method: "post",
  path: "/api/oauth/token/validate",
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeLoginField: (state, action: changeLoginFieldAction) => {
      state.loginForm = {
        ...state.loginForm,
        ...action.payload,
      };
    },
    changeJoinField: (state, action: changeJoinFieldAction) => {
      state.joinForm = {
        ...state.joinForm,
        ...action.payload,
      };
    },
    initializeByToken: (state, action: initializeByTokenAction) => {
      const { name, email, id } = action.payload;
      state.loginInfo = { name, email, id };
      state.login = true;
    },
    logout: (state, action: logoutAction) => {
      state = initialState;
      removeCookies("access_token");
    },
    clearLoginForm: (state, action: clearLoginFormAction) => {
      state.loginForm.email = "";
      state.loginForm.pwd = "";
    },
    clearJoinForm: (state, action: clearJoinFormAction) => {
      state.joinForm.adminPwd = "";
      state.joinForm.email = "";
      state.joinForm.imageFile = null;
      state.joinForm.isAdmin = false;
      state.joinForm.name = "";
      state.joinForm.nickname = "";
      state.joinForm.pwd = "";
      state.joinForm.pwdCheck = "";
    },
  },
  extraReducers: (builder) => {
    // login =======================================================
    builder.addCase(login.pending, (state, action) => {});
    builder.addCase(login.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.login = true;
      state.loginInfo.id = data.id;
      state.loginInfo.name = data.name;
      state.loginInfo.email = data.email;
      state.loginForm.email = "";
      state.loginForm.pwd = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      throw action.payload;
    });
    // join =======================================================
    builder.addCase(join.pending, (state, action) => {});
    builder.addCase(join.fulfilled, (state, action) => {
      state.joinForm.adminPwd = "";
      state.joinForm.email = "";
      state.joinForm.imageFile = null;
      state.joinForm.isAdmin = false;
      state.joinForm.name = "";
      state.joinForm.nickname = "";
      state.joinForm.pwd = "";
      state.joinForm.pwdCheck = "";
    });
    builder.addCase(join.rejected, (state, action) => {
      throw action.payload;
    });
    // tokenCheck =======================================================
    builder.addCase(tokenCheck.pending, (state, action) => {});
    builder.addCase(tokenCheck.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.login = true;
      state.loginInfo.id = data.id;
      state.loginInfo.name = data.name;
      state.loginInfo.email = data.email;
      state.loginForm.email = "";
      state.loginForm.pwd = "";
    });
    builder.addCase(tokenCheck.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export default authSlice.reducer;
export const {
  changeJoinField,
  changeLoginField,
  clearJoinForm,
  clearLoginForm,
  initializeByToken,
  logout,
} = authSlice.actions;
