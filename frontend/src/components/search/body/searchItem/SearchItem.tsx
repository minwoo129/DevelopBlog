import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogItemType } from "../../../../modules/initialStates/initialStateType";
import {
  InformationGrid,
  StyledImg,
  StyledImgGrid,
} from "./AdditionalComponent";

const SearchItemBlock = styled.div`
  border-radius: 6px;
  margin-top: 20px;
  border: 1px solid #848484;
  @media (max-width: 768px) {
    width: 500px;
    height: 700px;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 768px) {
    width: 700px;
    height: 200px;
    display: flex;
    flex-direction: row;
  }
  @media (min-width: 906px) {
    width: 700px;
    height: 200px;
    display: flex;
    flex-direction: row;
  }
  @media (min-width: 1400px) {
    width: 900px;
    height: 200px;
    display: flex;
    flex-direction: row;
  }
  & + & {
    margin-bottom: 30px;
  }
  &:hover {
    background: #d8d8d8;
  }
`;

interface SearchItemProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogItemType;
  onPress(id: number): void;
}

const SearchItem: FC<SearchItemProps> = ({ blog, onPress, ...props }) => {
  return (
    <SearchItemBlock {...props} onClick={() => onPress(blog.id)}>
      <StyledImgGrid>
        <StyledImg src={blog.thumbnailUrl} />
      </StyledImgGrid>
      <InformationGrid blog={blog} />
    </SearchItemBlock>
  );
};

export default SearchItem;
