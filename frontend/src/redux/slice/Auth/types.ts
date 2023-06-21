import { PayloadAction } from "@reduxjs/toolkit";
import {
  joinSelectableForm,
  loginSelectableForm,
  userProfileImgType,
} from "../../state/AdditionalTypes";
import { commonResultType } from "../commonTypes";

// ===========================================================
export type changeLoginFieldAction = PayloadAction<loginSelectableForm>;
// ===========================================================
export type changeJoinFieldAction = PayloadAction<joinSelectableForm>;
// ===========================================================
export type loginRetType = commonResultType<loginResult>;

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
export type joinRetType = commonResultType<null>;
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
