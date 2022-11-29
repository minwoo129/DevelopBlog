import { authInitialStateType } from "./initialStateType";

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
  },
  login: false,
  loginInfo: {
    id: null,
    name: null,
    email: null,
  },
};
