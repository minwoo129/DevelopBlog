import { PayloadAction } from "@reduxjs/toolkit";
import {
  joinSelectableForm,
  loginSelectableForm,
  userProfileImgType,
} from "../../state/AdditionalTypes";

// ===========================================================
export type changeLoginFieldAction = PayloadAction<loginSelectableForm>;
// ===========================================================
export type changeJoinFieldAction = PayloadAction<joinSelectableForm>;
// ===========================================================
export type loginRetType = {
  data: loginResult;
  error: boolean;
  result: boolean;
};

type loginResult = {
  backgroundImg: userProfileImgType | null;
  backgroundImgIdx: number | null;
  email: string;
  id: number;
  name: string;
  password: string;
  profileImgIdx: number | null;
  profileImg: userProfileImgType | null;
  token: string;
};
// ===========================================================
export type joinRetType = {
  data: null;
  error: boolean;
  result: boolean;
};
// ===========================================================
export type initializeByTokenAction = PayloadAction<InitializeByTokenParam>;
type InitializeByTokenParam = {
  name: string;
  email: string;
  token: string;
  id: number;
};
// ===========================================================
export type logoutAction = PayloadAction<undefined>;
// ===========================================================
export type clearLoginFormAction = PayloadAction<undefined>;
// ===========================================================
export type clearJoinFormAction = PayloadAction<undefined>;
