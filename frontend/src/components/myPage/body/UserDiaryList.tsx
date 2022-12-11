import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import UserDiaryItem from "./UserDiaryItem";

const UserDiaryListBlock = styled.div`
  width: 100%;
  min-height: 920px;
  display: flex;
  background: #fff;
`;

interface UserDiaryListProps extends HTMLAttributes<HTMLDivElement> {}

const UserDiaryList: FC<UserDiaryListProps> = ({ ...props }) => {
  return (
    <UserDiaryListBlock {...props}>
      <UserDiaryItem />
    </UserDiaryListBlock>
  );
};

export default UserDiaryList;
