// ================================ Auth =======================================
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
    nickname: string;
  };
  login: boolean;
  loginInfo: {
    id: number | null;
    name: string | null;
    email: string | null;
  };
};
// ================================ menu =======================================
export type menuInitialStateType = {
  isMenuVisible: boolean;
  isMenuOpen: boolean;
};
// ================================ blog =======================================

export type blogInitialStateType = {
  addedImageIds: number[];
  blogs: blogItemType[];
  blog: blogDetailType | null;
};
// ================================ appInfo =======================================
export type appInfoInitialStateType = {
  searchBarVisible: boolean;
  searchTxt: string;
};

// =============================================================================

export interface blogItemType {
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
    nickname: string;
  };
}

export interface blogDetailType extends blogItemType {
  authorization: {
    writeComment: boolean;
    reviseContent: boolean;
    deleteContent: boolean;
  };
}
