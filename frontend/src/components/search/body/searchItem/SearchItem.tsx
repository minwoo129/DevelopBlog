import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const SearchItemBlock = styled.div`
  height: 300px;
  border: 1px solid blue;
  @media (max-width: 768px) {
    width: 500px;
    border: 1px solid orange;
  }
  @media (min-width: 768px) {
    width: 700px;
    border: 1px solid blue;
  }
  @media (min-width: 906px) {
    width: 700px;
    border: 1px solid green;
  }
  @media (min-width: 1400px) {
    width: 1000px;
    border: 1px solid red;
  }
`;

interface SearchItemProps extends HTMLAttributes<HTMLDivElement> {}

const SearchItem: FC<SearchItemProps> = (props) => {
  return <SearchItemBlock></SearchItemBlock>;
};

export default SearchItem;
