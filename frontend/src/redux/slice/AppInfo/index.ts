import { createSlice } from "@reduxjs/toolkit";
import { AppInfoInitialState as initialState } from "../../state";
import {
  clearDataWhenLogoutAction,
  clearReviseDataAction,
  getUserInfoRetType,
  setAppStateAction,
  setSearchTxtAction,
  setSearchbarVisibleAction,
} from "./types";
import { createPromiseThunk } from "../../lib/AsyncUtils";

export const getUserInfo = createPromiseThunk<getUserInfoRetType>({
  type: "appInfo/GET_USER_INFO",
  method: "get",
  path: "/api/users/get",
});

const appInfoSlice = createSlice({
  name: "appInfo",
  initialState,
  reducers: {
    setSearchbarVisible: (state, action: setSearchbarVisibleAction) => {
      state.searchBarVisible = action.payload;
    },
    setSearchTxt: (state, action: setSearchTxtAction) => {
      state.searchTxt = action.payload;
    },
    setAppState: (state, action: setAppStateAction) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
    clearReviseData: (state, action: clearReviseDataAction) => {
      state.userImgTempData = null;
      state.backgroundImgTempData = null;
      state.isReviseUserInfo = false;
      state.userImgSrc = null;
      state.backgroundImgSrc = null;
      state.tempNickname = "";

      if (state.userInfo?.profileImg) {
        state.userImgSrc = state.userImgSrc.profileImg.publishedUrl;
      }
      if (state.userInfo?.backgroundImg) {
        state.backgroundImgSrc = state.userInfo.backgroundImg.publishedUrl;
      }
    },
    clearDataWhenLogout: (state, action: clearDataWhenLogoutAction) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // getUserInfo ==============================================
    builder.addCase(getUserInfo.pending, (state, action) => {});
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.userInfo = data;

      if (data.profileImg) {
        state.userImgSrc = data.profileImg.publishedUrl;
      }
      if (data.backgroundImg) {
        state.backgroundImgSrc = data.backgroundImg.publishedUrl;
      }
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export default appInfoSlice.reducer;
export const {
  clearDataWhenLogout,
  clearReviseData,
  setAppState,
  setSearchTxt,
  setSearchbarVisible,
} = appInfoSlice.actions;
