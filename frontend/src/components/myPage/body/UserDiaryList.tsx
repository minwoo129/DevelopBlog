import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const UserDiaryListBlock = styled.div`
  width: 100%;
  min-height: 920px;
  display: flex;
  background: #fff;
`;

interface UserDiaryListProps extends HTMLAttributes<HTMLDivElement> {}

const UserDiaryList: FC<UserDiaryListProps> = ({ ...props }) => {
  return <UserDiaryListBlock></UserDiaryListBlock>;
};

export default UserDiaryList;
