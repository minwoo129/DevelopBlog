import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const UserDiaryItemBlock = styled.div`
  margin: 20px 10px;
  border-radius: 6px;
  border: 1px solid red;
  display: flex;
  width: 100%;
  height: 300px;
`;

interface UserDiaryItemProps extends HTMLAttributes<HTMLDivElement> {}

const UserDiaryItem: FC<UserDiaryItemProps> = ({ ...props }) => {
  return <UserDiaryItemBlock {...props}></UserDiaryItemBlock>;
};

export default UserDiaryItem;
