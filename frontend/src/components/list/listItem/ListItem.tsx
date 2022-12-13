import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogItemType } from "../../../modules/initialStates/initialStateType";
import {
  ContentDetailGrid,
  InsideContentGrid,
  LockedIcon,
  StyledContent,
  StyledImg,
  StyledTitle,
} from "./AdditionalComponent";

const ListItemBlock = styled.div`
  border-radius: 6px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 500px;
  height: 300px;
  display: block;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.7);
  border: 1px solid grey;
  background: #e9ecef;
  &:hover {
    background: #d8d8d8;
  }
  @media (min-width: 1400px) {
    width: 600px;
    height: 300px;
  }
`;

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogItemType;
  onPress(id: number): void;
}

const ListItem: FC<ListItemProps> = ({ blog, onPress }) => {
  let newContent = blog.htmlContent.replace(/(<([^>]+)>)/gi, "");
  return (
    <ListItemBlock
      onClick={(e) => {
        onPress(blog.id);
      }}
    >
      <LockedIcon isPublic={blog.public} />
      <InsideContentGrid>
        <StyledImg src={blog.thumbnailUrl} />
        <ContentDetailGrid>
          <StyledTitle>{blog.title}</StyledTitle>
          <StyledContent>{newContent}</StyledContent>
          <h6 style={{ color: "#6E6E6E" }}>{blog.User.nickname}</h6>
        </ContentDetailGrid>
      </InsideContentGrid>
    </ListItemBlock>
  );
};

export default ListItem;
