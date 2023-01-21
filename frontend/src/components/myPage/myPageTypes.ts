import { HTMLAttributes, RefObject } from "react";
import {
  blogItemType,
  userDetailInfoType,
  userWriteBlogsType,
} from "../../modules/initialStates/initialStateType";
// ==================================== MyPageTemplate =====================================
export interface MyPageTemplateProps extends HTMLAttributes<HTMLDivElement> {
  getUserWriteBlogs(page: number): void;
  page: number;
}

export type updateUserInfoArgs = {
  profileImgIdx: number | null;
  backgroundImgIdx: number | null;
  nickname: string;
};
// ==================================== Body =====================================
export interface BodyProps
  extends HTMLAttributes<HTMLDivElement>,
    UserInfoProps {
  userBlogs: userWriteBlogsType | null;
  bodyRef: RefObject<HTMLDivElement>;
  onPressItem(id: number): void;
}
// ==================================== UserInfo =====================================
export interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {
  isRevise: boolean;
  userInfo: userDetailInfoType | null;
  encodeFileToBase64(fileBlob: Blob, type: encodeFileSelectType): void;
  onClickRevise(): void;
  onClickReviseCancel(): void;
  userImgTempSrc: any;
  backgroundImgTempSrc: any;
  tempNickname: string;
  setTempNickname(value: string): void;
}

export type encodeFileSelectType = "userImg" | "background";
// ==================================== UserDiaryList =====================================
export interface UserDiaryListProps
  extends HTMLAttributes<HTMLDivElement>,
    UserDiaryListCommonProps {
  userBlogs: userWriteBlogsType | null;
}
export interface UserDiaryListCommonProps {
  onPress(id: number): void;
}
// ==================================== UserDiaryList =====================================
export interface UserDiaryItemProps
  extends HTMLAttributes<HTMLDivElement>,
    UserDiaryListCommonProps {
  item: blogItemType;
}
