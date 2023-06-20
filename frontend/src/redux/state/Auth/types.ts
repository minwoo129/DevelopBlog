export type initialStateType = {
  loginForm: loginForm;
  joinForm: joinForm;
  login: boolean;
  loginInfo: loginInfo;
};

export type loginForm = {
  email: string;
  pwd: string;
};

export type joinForm = {
  email: string;
  pwd: string;
  pwdCheck: string;
  name: string;
  isAdmin: boolean;
  adminPwd: string;
  nickname: string;
  imageFile: File | Blob | null;
};

export type loginInfo = {
  id: number | null;
  name: string | null;
  email: string | null;
};
