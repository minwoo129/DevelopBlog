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
  isMenuVisible: true,
  isMenuOpen: false,
};
// ================================ blog =======================================
export const blogInitialState: blogInitialStateType = {
  addedImageIds: [],
  blogs: [],
  blog: null,
  searchBlogs: [],
  isExecuteSearch: false,
};
// ================================ appInfo =======================================
export const appInfoInitialState: appInfoInitialStateType = {
  searchBarVisible: false,
  searchTxt: "",
  userInfo: null,
  userWriteBlogs: null,
  isReviseUserInfo: false,
  userImgTempData: null,
  backgroundImgTempData: null,
};
