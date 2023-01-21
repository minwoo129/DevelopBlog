import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import { blogItemType } from "../../../../modules/initialStates/initialStateType";
import {
  InformationGrid,
  StyledImg,
  StyledImgGrid,
} from "./AdditionalComponent";

const SearchItemBlock = styled.div`
  border-radius: 6px;
  width: 300px;
  height: 350px;
  display: block;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.7);
  border: 1px solid grey;
  background: #e9ecef;
  padding: 10px;
  &:hover {
    background: #d8d8d8;
  }
`;

interface SearchItemProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogItemType;
  onPress(id: number): void;
  idx: number;
}

const SearchItem: FC<SearchItemProps> = ({ blog, onPress, idx, ...props }) => {
  const [marginRight, setMarginRight] = useState(0);

  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const resizeEvent = () => {
    if (window.innerWidth >= 1200) {
      setMarginRight(idx % 3 !== 2 ? 150 : 0);
    } else if (window.innerWidth >= 700) {
      setMarginRight(idx % 2 !== 1 ? 100 : 0);
    } else {
      setMarginRight(0);
    }
  };
  return (
    <SearchItemBlock
      onClick={() => onPress(blog.id)}
      style={{
        marginRight,
      }}
      {...props}
    >
      <StyledImgGrid>
        <StyledImg src={blog.thumbnailUrl} />
      </StyledImgGrid>
      <InformationGrid blog={blog} />
    </SearchItemBlock>
  );
};

export default SearchItem;
