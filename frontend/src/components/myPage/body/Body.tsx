import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import {
  userDetailInfoType,
  userWriteBlogsType,
} from "../../../modules/initialStates/initialStateType";
import UserDiaryList from "./UserDiaryList";
import UserInfo from "./UserInfo";

const BodyBlock = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  @media (min-width: 906px) {
    margin: 0 100px;
  }
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  userBlogs: userWriteBlogsType | null;
  isRevise: boolean;
  userInfo: userDetailInfoType | null;
  encodeFileToBase64(fileBlob: Blob, type: "userImg" | "background"): void;
  userImgTempSrc: any;
  backgroundImgTempSrc: any;
  onClickRevise(): void;
  onClickReviseCancel(): void;
  tempNickname: string;
  setTempNickname(value: string): void;
}

const Body: FC<BodyProps> = ({
  userBlogs,
  isRevise,
  userInfo,
  encodeFileToBase64,
  userImgTempSrc,
  backgroundImgTempSrc,
  onClickRevise,
  onClickReviseCancel,
  tempNickname,
  setTempNickname,
  ...props
}) => {
  return (
    <BodyBlock {...props}>
      <UserInfo
        isRevise={isRevise}
        userInfo={userInfo}
        encodeFileToBase64={encodeFileToBase64}
        userImgTempSrc={userImgTempSrc}
        onClickRevise={onClickRevise}
        onClickReviseCancel={onClickReviseCancel}
        backgroundImgTempSrc={backgroundImgTempSrc}
        tempNickname={tempNickname}
        setTempNickname={setTempNickname}
      />
      <UserDiaryList userBlogs={userBlogs} />
    </BodyBlock>
  );
};

export default Body;
