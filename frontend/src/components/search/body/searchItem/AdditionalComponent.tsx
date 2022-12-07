import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogItemType } from "../../../../modules/initialStates/initialStateType";

export const StyledImgGrid = styled.div`
  border-radius: 6px;
  @media (max-width: 768px) {
    width: 500px;
    height: 300px;
  }
  @media (min-width: 768px) {
    width: 300px;
    height: 200px;
  }
  @media (min-width: 906px) {
    width: 300px;
    height: 200px;
  }
  @media (min-width: 1400px) {
    width: 400px;
    height: 200px;
  }
`;

export const StyledImg = styled.img`
  border-radius: 6px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 500px;
    height: 300px;
  }
  @media (min-width: 768px) {
    width: 280px;
    height: 180px;
    margin: 10px;
  }
  @media (min-width: 906px) {
    width: 280px;
    height: 180px;
    margin: 10px;
  }
  @media (min-width: 1400px) {
    width: 380px;
    height: 180px;
    margin: 10px;
  }
`;

const InformationGridBlock = styled.div`
  display: flex;
  flex: 1;
  border-radius: 6px;
  flex-direction: column;
  padding: 10px;
  @media (max-width: 768px) {
    width: 480px;
  }
  @media (min-width: 768px) {
    width: 370px;
  }
  @media (min-width: 906px) {
    width: 370px;
  }
  @media (min-width: 1400px) {
    width: 470px;
  }
`;

interface InformationGridProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogItemType;
}

export const InformationGrid: FC<InformationGridProps> = ({
  blog,
  ...props
}) => {
  const newContent = blog.htmlContent.replace(/(<([^>]+)>)/gi, "");
  return (
    <InformationGridBlock {...props}>
      <StyledTitle>{blog.title}</StyledTitle>
      <StyledContent>{newContent}</StyledContent>
      <StyledWriter>{`${blog.User.nickname}`}</StyledWriter>
    </InformationGridBlock>
  );
};

const StyledTitle = styled.h1`
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidded;
  color: #1c1c1c;
`;
const StyledContent = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  height: 2.4em;
  margin-top: -20px;
  color: #6e6e6e;
`;
const StyledWriter = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.2em;
  height: 1.2em;
  color: #1c1c1c;
`;
