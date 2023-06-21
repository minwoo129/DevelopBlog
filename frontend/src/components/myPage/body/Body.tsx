import React, { FC, HTMLAttributes, RefObject } from "react";
import styled from "styled-components";
import { BodyProps } from "../myPageTypes";
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
  bodyRef,
  onPressItem,
  ...props
}) => {
  return (
    <BodyBlock {...props} ref={bodyRef}>
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
      <UserDiaryList userBlogs={userBlogs} onPress={onPressItem} />
    </BodyBlock>
  );
};

export default Body;
