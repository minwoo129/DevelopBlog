export type AuthStateType = {
  register: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    isAdmin: boolean;
    admiinPwd: string;
  };
  login: {
    email: string;
    password: string;
  };
};
