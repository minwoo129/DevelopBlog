import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import Body from "./body/Body";
import SearchBar from "./SearchBar";

const SearchTemplateBlock = styled.div`
  flex: 1;
  color: blue;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
`;

interface SearchTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const SearchTemplate: FC<SearchTemplateProps> = (props) => {
  return (
    <SearchTemplateBlock>
      <SearchBar />
      <Body />
    </SearchTemplateBlock>
  );
};

export default SearchTemplate;
