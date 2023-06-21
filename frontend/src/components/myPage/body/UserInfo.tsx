import React, { FC, HTMLAttributes, MouseEvent, useRef } from "react";
import styled from "styled-components";
import { IoMdAdd } from "react-icons/io";
import { DefaultUserImage, UserImg } from "../../../common/UserImage";
import { UserInfoProps } from "../myPageTypes";

const UserInfoBlock = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserInfoGrid = styled.div`
  width: 400px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 906px) {
    margin-top: 50px;
    margin-left: 50px;
  }
  @media (min-width: 906px) {
    margin-left: 50px;
    margin-top: 50px;
  }
`;
const UserDetailInfoGrid = styled.div`
  display: flex;
  flex: 1;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const NickName = styled.h2`
  color: invert(100%);
`;
const NickNameInput = styled.input`
  width: 200px;
  height: 50px;
  color: invert(100%);
  font-size: 1.5rem;
  border-radius: 6px;
  background: #00000000;
  border: 1px solid #e9ecef;
`;

const ReviseBtnView = styled.div`
  display: flex;
  margin-left: 50px;
  margin-bottom: 25px;
`;

const ReviseBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #01df3a;
  color: #000;
  &:hover {
    background: #01df3a;
    color: #fff;
  }
`;
const CancelBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #df0101;
  color: #000;
  margin-left: 1rem;
  &:hover {
    background: #df0101;
    border: 1px solid #df0101;
    color: #fff;
  }
`;
const AddImageButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  border: 1px solid #0174df;
  background: #0174df;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  top: 38px;
  right: 30px;
  &:hover {
    background: #2e9afe;
    border: 1px solid #2e9afe;
  }
`;

const ChangeBackgroundBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background: #0489b1;
  border: 1px solid #0489b1;
  color: #fff;
  &:hover {
    background: #00bfff;
    border: 1px solid #00bfff;
  }
  position: absolute;
  top: 200px;
  left: 50%;
`;

const UserInfo: FC<UserInfoProps> = ({
  isRevise,
  userInfo,
  encodeFileToBase64,
  userImgTempSrc,
  onClickRevise,
  onClickReviseCancel,
  backgroundImgTempSrc,
  tempNickname,
  setTempNickname,
  ...props
}) => {
  const userImgRef = useRef<HTMLInputElement | null>(null);
  const backgroundImgRef = useRef<HTMLInputElement | null>(null);
  const addUserImg = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userImgRef.current) {
      return;
    }
    userImgRef.current.click();
  };
  const addBackgroundImg = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!backgroundImgRef.current) {
      return;
    }
    backgroundImgRef.current.click();
  };
  return (
    <UserInfoBlock {...props}>
      <UserInfoGrid>
        {userImgTempSrc ? (
          <UserImg
            style={{ width: "120px", height: "120px", borderRadius: "60px" }}
            src={userImgTempSrc}
          />
        ) : (
          <DefaultUserImage
            style={{ width: "120px", height: "120px", borderRadius: "60px" }}
            iconDetailStyle={{ width: "60px", height: "60px" }}
          />
        )}
        {isRevise && (
          <AddImageButton onClick={addUserImg}>
            <IoMdAdd style={{ width: "1rem", height: "1rem" }} />
          </AddImageButton>
        )}
        <UserDetailInfoGrid>
          {isRevise ? (
            <NickNameInput
              value={tempNickname}
              onChange={(e) => setTempNickname(e.target.value)}
            />
          ) : (
            <NickName>{userInfo?.nickname ?? ""}</NickName>
          )}
        </UserDetailInfoGrid>
      </UserInfoGrid>
      <ReviseBtnView>
        <ReviseBtn onClick={onClickRevise}>수정하기</ReviseBtn>
        {isRevise && (
          <CancelBtn onClick={onClickReviseCancel}>취소하기</CancelBtn>
        )}
      </ReviseBtnView>
      {isRevise && (
        <ChangeBackgroundBtn onClick={addBackgroundImg}>
          배경화면 바꾸기
        </ChangeBackgroundBtn>
      )}

      <input
        type="file"
        ref={userImgRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files) {
            return;
          }
          encodeFileToBase64(e.target.files[0], "userImg");
        }}
      />
      <input
        type="file"
        ref={backgroundImgRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files) {
            return;
          }
          encodeFileToBase64(e.target.files[0], "background");
        }}
      />
    </UserInfoBlock>
  );
};

export default UserInfo;
