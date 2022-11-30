export type authInitialStateType = {
  loginForm: {
    email: string;
    pwd: string;
  };
  joinForm: {
    email: string;
    pwd: string;
    pwdCheck: string;
    name: string;
    isAdmin: boolean;
    adminPwd: string;
  };
  login: boolean;
  loginInfo: {
    id: number | null;
    name: string | null;
    email: string | null;
  };
};

export type menuInitialStateType = {
  isMenuVisible: boolean;
  isMenuOpen: boolean;
};
