import {
  appInfoInitialStateType,
  authInitialStateType,
  blogInitialStateType,
  menuInitialStateType,
} from "./initialStateType";
// ================================ Auth =======================================
export const authInitialState: authInitialStateType = {
  loginForm: {
    email: "",
    pwd: "",
  },
  joinForm: {
    email: "",
    pwd: "",
    pwdCheck: "",
    name: "",
    isAdmin: false,
    adminPwd: "",
    nickname: "",
    imageFile: null,
  },
  login: false,
  loginInfo: {
    id: null,
    name: null,
    email: null,
  },
};
// ================================ menu =======================================
export const menuInitialState: menuInitialStateType = {
  isMenuVisible: false,
  isMenuOpen: false,
};
// ================================ blog =======================================
export const blogInitialState: blogInitialStateType = {
  addedImageIds: [],
  blogs: [],
  blog: null,
  searchBlogs: [],
  isExecuteSearch: false,
  userWriteBlogs: null,
  commentInput: "",
  comments: null,
};
// ================================ appInfo =======================================
export const appInfoInitialState: appInfoInitialStateType = {
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
