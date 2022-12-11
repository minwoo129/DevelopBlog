import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const UserInfoBlock = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  border: 1px solid green;
`;

interface UserInfoProps extends HTMLAttributes<HTMLDivElement> {}

const UserInfo: FC<UserInfoProps> = (props) => {
  return <UserInfoBlock></UserInfoBlock>;
};

export default UserInfo;
