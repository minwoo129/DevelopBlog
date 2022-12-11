import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import DefaultUserImage from "../../../common/DefaultUserImage";

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
  border: 1px solid #e9ecef;
  color: #fff;
  &:hover {
    background: #2efe64;
  }
`;

interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {
  isRevise: boolean;
  setRevise(value: boolean): void;
}

const UserInfo: FC<UserInfoProps> = ({ isRevise, setRevise, ...props }) => {
  return (
    <UserInfoBlock {...props}>
      <UserInfoGrid>
        <DefaultUserImage
          style={{ width: "120px", height: "120px", borderRadius: "60px" }}
          iconDetailStyle={{ width: "60px", height: "60px" }}
        />
        <UserDetailInfoGrid>
          <NickName>test</NickName>
        </UserDetailInfoGrid>
      </UserInfoGrid>
      <ReviseBtn>수정하기</ReviseBtn>
    </UserInfoBlock>
  );
};

export default UserInfo;
