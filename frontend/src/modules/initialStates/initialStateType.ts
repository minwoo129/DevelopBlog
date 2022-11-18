export type AuthStateType = {
  register: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    isAdmin: boolean;
    adminPwd: string;
  };
  login: {
    email: string;
    password: string;
  };
};
