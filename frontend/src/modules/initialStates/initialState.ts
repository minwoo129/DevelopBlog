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
};
// ================================ appInfo =======================================
export const appInfoInitialState: appInfoInitialStateType = {
  searchBarVisible: false,
  searchTxt: "",
};
