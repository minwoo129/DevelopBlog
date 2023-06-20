import { initialStateType } from "./types";

export const initialState: initialStateType = {
  searchBarVisible: false,
  searchTxt: "",
  userInfo: null,
  isReviseUserInfo: false,
  userImgTempData: null,
  backgroundImgTempData: null,
  userImgSrc: null,
  backgroundImgSrc: null,
  isUserImgChanged: false,
  isBackgroundImgChanged: false,
  tempNickname: "",
};
