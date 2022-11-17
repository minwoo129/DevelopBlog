import { AuthStateType } from "./initialStateType";

export const AuthInitialState: AuthStateType = {
  register: {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    email: "",
    password: "",
  },
};
