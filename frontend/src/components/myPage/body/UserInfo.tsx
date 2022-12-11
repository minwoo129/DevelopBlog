import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import DefaultUserImage from "../../../common/DefaultUserImage";

const UserInfoBlock = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
`;

const UserInfoGrid = styled.div`
  width: 400px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 906px) {
    margin: 50px auto 0 auto;
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

interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {}

const UserInfo: FC<UserInfoProps> = ({ ...props }) => {
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
    </UserInfoBlock>
  );
};

export default UserInfo;
