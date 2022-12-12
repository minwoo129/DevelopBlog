import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import DefaultUserImage from "../../../common/DefaultUserImage";
import { IoMdAdd } from "react-icons/io";
import { userDetailInfoType } from "../../../modules/initialStates/initialStateType";

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
  color: #151515;
`;

const ReviseBtn = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 6px;
  background: #01df3a;
  margin-left: 50px;
  margin-bottom: 25px;
  border: 1px solid #01df3a;
  color: #fff;
  &:hover {
    background: #2efe64;
    border: 1px solid #2efe64;
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

interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {
  isRevise: boolean;
  setRevise(value: boolean): void;
  userInfo: userDetailInfoType | null;
}

const UserInfo: FC<UserInfoProps> = ({
  isRevise,
  setRevise,
  userInfo,
  ...props
}) => {
  return (
    <UserInfoBlock {...props}>
      <UserInfoGrid>
        <DefaultUserImage
          style={{ width: "120px", height: "120px", borderRadius: "60px" }}
          iconDetailStyle={{ width: "60px", height: "60px" }}
        />
        {isRevise && (
          <AddImageButton>
            <IoMdAdd style={{ width: "1rem", height: "1rem" }} />
          </AddImageButton>
        )}
        <UserDetailInfoGrid>
          <NickName>{userInfo?.nickname ?? ""}</NickName>
        </UserDetailInfoGrid>
      </UserInfoGrid>
      <ReviseBtn onClick={() => setRevise(!isRevise)}>수정하기</ReviseBtn>
      {isRevise && <ChangeBackgroundBtn>배경화면 바꾸기</ChangeBackgroundBtn>}
    </UserInfoBlock>
  );
};

export default UserInfo;
