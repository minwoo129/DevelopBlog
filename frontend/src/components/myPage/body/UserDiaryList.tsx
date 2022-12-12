import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { userWriteBlogsType } from "../../../modules/initialStates/initialStateType";
import UserDiaryItem from "./listItem/UserDiaryItem";

const UserDiaryListBlock = styled.div`
  width: 100%;
  min-height: 920px;
  display: flex;
  background: #fff;
  flex-wrap: wrap;
`;

const EmptyBlogLayer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 518px;
  background: #fff;
  justify-content: center;
`;
const EmptyLayerTitle = styled.h1`
  color: #424242;
  margin-top: 200px;
`;

interface UserDiaryListProps extends HTMLAttributes<HTMLDivElement> {
  userBlogs: userWriteBlogsType | null;
}

const UserDiaryList: FC<UserDiaryListProps> = ({ userBlogs, ...props }) => {
  if (!userBlogs) {
    return (
      <EmptyBlogLayer>
        <EmptyLayerTitle>작성된 글이 없습니다</EmptyLayerTitle>
      </EmptyBlogLayer>
    );
  }
  return (
    <UserDiaryListBlock {...props}>
      {userBlogs.contents.map((item, index) => {
        return <UserDiaryItem item={item} key={index} />;
      })}
    </UserDiaryListBlock>
  );
};

export default UserDiaryList;
