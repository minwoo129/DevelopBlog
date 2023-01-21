import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { userWriteBlogsType } from "../../../modules/initialStates/initialStateType";
import { UserDiaryListProps } from "../myPageTypes";
import UserDiaryItem from "./listItem/UserDiaryItem";

const UserDiaryListBlock = styled.div`
  width: 100%;
  min-height: 920px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 905px) {
    background: #fff;
  }
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

const UserDiaryList: FC<UserDiaryListProps> = ({
  userBlogs,
  onPress,
  ...props
}) => {
  if (!userBlogs) {
    return (
      <EmptyBlogLayer>
        <EmptyLayerTitle>작성된 글이 없습니다</EmptyLayerTitle>
      </EmptyBlogLayer>
    );
  } else if (userBlogs.contents.length == 0) {
    return (
      <EmptyBlogLayer>
        <EmptyLayerTitle>작성된 글이 없습니다</EmptyLayerTitle>
      </EmptyBlogLayer>
    );
  }
  return (
    <UserDiaryListBlock {...props}>
      {userBlogs.contents.map((item, index) => {
        return <UserDiaryItem item={item} key={index} onPress={onPress} />;
      })}
    </UserDiaryListBlock>
  );
};

export default UserDiaryList;
