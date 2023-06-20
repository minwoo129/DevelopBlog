import { initialStateType } from "./types";

export const initialState: initialStateType = {
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
