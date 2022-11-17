export type AuthStateType = {
  register: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  login: {
    email: string;
    password: string;
  };
};
