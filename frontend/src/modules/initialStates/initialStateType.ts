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
    imageFile: File | Blob | null;
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
  searchBlogs: blogItemType[];
  isExecuteSearch: boolean;
  userWriteBlogs: userWriteBlogsType | null;
  commentInput: string;
  comments: blogCommentsType | null;
};
// ================================ appInfo =======================================
export type appInfoInitialStateType = {
  searchBarVisible: boolean;
  searchTxt: string;
  userInfo: userDetailInfoType | null;
  isReviseUserInfo: boolean;
  userImgTempData: File | Blob | null;
  backgroundImgTempData: File | Blob | null;
  userImgSrc: any;
  backgroundImgSrc: any;
  isUserImgChanged: boolean;
  isBackgroundImgChanged: boolean;
  tempNickname: string;
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
  public: boolean;
  User: {
    nickname: string;
  };
}

export interface blogDetailType extends blogItemType {
  authorization: {
    writeComment: boolean;
    reviseContent: boolean;
    deleteContent: boolean;
  };
  commentCount: number;
}

export interface userDetailInfoType {
  createdAt: string;
  email: string;
  id: number;
  isAdmin: boolean;
  name: string;
  updatedAt: string;
  nickname: string;
  profileImgIdx: number | null;
  profileImg: userProfileImgType | null;
  backgroundImg: userProfileImgType | null;
}

interface userProfileImgType {
  id: number;
  publishedUrl: string;
}

export interface userWriteBlogsType {
  contents: blogItemType[];
  totalElements: number;
  totalPages: number;
}

export interface blogCommentsType {
  contents: CommentType[];
  totalElements: number;
  totalPages: number;
}

export type CommentType = {
  id: number;
  comment: string;
  enableDelete: boolean;
  enableEdit: boolean;
  updatedAt: string;
  createdAt: string;
  userId: number;
  User: {
    nickname: string;
    profileImgUrl: string | null;
    id: number;
  };
  contentId: number;
  deletedAt: null | string;
};
