export type initialStateType = {
  addedImageIds: number[];
  blogs: blogItemType[];
  blog: blogDetailType | null;
  searchBlogs: blogItemType[];
  isExecuteSearch: boolean;
  userWriteBlogs: userWriteBlogsType | null;
  commentInput: string;
  comments: blogCommentsType | null;
};

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
  User: blogItemUser;
}

export type blogItemUser = {
  nickname: string;
};

export interface blogDetailType extends blogItemType {
  authorization: {
    writeComment: boolean;
    reviseContent: boolean;
    deleteContent: boolean;
  };
  commentCount: number;
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
  User: CommentUserType;
  contentId: number;
  deletedAt: null | string;
};

export type CommentUserType = {
  nickname: string;
  profileImgUrl: string | null;
  id: number;
};
