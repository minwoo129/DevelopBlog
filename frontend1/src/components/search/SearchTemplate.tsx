import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const SearchTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid blue;
  color: blue;
`;

interface SearchTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const SearchTemplate: FC<SearchTemplateProps> = (props) => {
  return <SearchTemplateBlock>검색</SearchTemplateBlock>;
};

export default SearchTemplate;
