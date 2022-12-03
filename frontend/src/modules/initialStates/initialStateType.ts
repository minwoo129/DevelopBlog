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

export type blogInitialStateType = {
  addedImageIds: number[];
  blogs: blogType[];
  blog: blogType | null;
};

export type blogType = {
  id: number;
  thumbnailUrl: string;
  content: string;
  createdAt?: string | null;
  deletedAt?: string | null;
  htmlContent: string;
  title: string;
  updatedAt: string;
  userId: number;
  User: {
    createdAt: string;
    email: string;
    id: number;
    isAdmin: boolean;
    name: string;
    password: string;
    updatedAt: string;
  };
};
