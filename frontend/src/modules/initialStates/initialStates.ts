import { AuthStateType } from "./initialStateType";

export const AuthInitialState: AuthStateType = {
  register: {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    isAdmin: false,
    admiinPwd: "",
  },
  login: {
    email: "",
    password: "",
  },
};
