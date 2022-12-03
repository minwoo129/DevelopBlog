import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogType } from "../../modules/initialStates/initialStateType";

const ListItemBlock = styled.div`
  border-radius: 6px;
  margin-top: 25px;
  margin-bottom: 25px;
  width: 500px;
  height: 200px;
  display: block;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.7);
  border: 1px solid grey;
  &:hover {
    background: #d8d8d8;
  }
`;

const InsideContentGrid = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
`;

const ContentDetailGrid = styled.div`
  display: inline-block;
  flex: 1;
  padding: 0 1rem;
  width: 250px;
  height: 150px;
`;

const StyledImg = styled.img`
  width: 250px;
  height: 150px;
  border-radius: 6px;
  object-fit: cover;
`;
const StyledTitle = styled.h2`
  display: inline-block;
  width: 218px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidded;
`;
const StyledContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 3.6em;
  height: "4rem";
  margin-top: -0.5rem;
`;

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogType;
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
      <InsideContentGrid>
        <StyledImg src={blog.thumbnailUrl} />
        <ContentDetailGrid>
          <StyledTitle>{blog.title}</StyledTitle>
          <StyledContent>{newContent}</StyledContent>
        </ContentDetailGrid>
      </InsideContentGrid>
    </ListItemBlock>
  );
};

export default ListItem;
