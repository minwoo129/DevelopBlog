import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const SearchTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid blue;
  color: blue;
  background: #e9ecef;
`;

interface SearchTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const SearchTemplate: FC<SearchTemplateProps> = (props) => {
  return (
    <SearchTemplateBlock>
      <SearchBar />
    </SearchTemplateBlock>
  );
};

export default SearchTemplate;
