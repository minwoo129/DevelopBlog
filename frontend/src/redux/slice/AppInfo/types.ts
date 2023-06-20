import { PayloadAction } from "@reduxjs/toolkit";
import {
  AppInfoInitialStateSelectableType,
  userDetailInfoType,
} from "../../state/AdditionalTypes";

// ===========================================================
export type setSearchbarVisibleAction = PayloadAction<boolean>;

// ===========================================================
export type setSearchTxtAction = PayloadAction<string>;

// ===========================================================
export type getUserInfoRetType = {
  data: userDetailInfoType;
  error: boolean;
  result: boolean;
};
// ===========================================================
export type setAppStateAction =
  PayloadAction<AppInfoInitialStateSelectableType>;
// ===========================================================
export type clearReviseDataAction = PayloadAction<undefined>;
// ===========================================================
export type clearDataWhenLogoutAction = PayloadAction<undefined>;
