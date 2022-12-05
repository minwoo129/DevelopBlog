import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import SearchItem from "./searchItem/SearchItem";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  height: 90%;
  flex-flow: row wrap;
  overflow: scroll;
  border: 1px solid red;
  justify-content: center;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  return (
    <BodyBlock>
      <SearchItem />
    </BodyBlock>
  );
};

export default Body;
