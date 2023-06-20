export type initialStateType = {
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

export interface userProfileImgType {
  id: number;
  publishedUrl: string;
}
