import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import ContentView from "./ContentView";

const BodyBlock = styled.div`
  flex: 1;
  border: 1px solid red;
  display: flex;
  flex-flow: row wrap;
  overflow: scroll;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  return (
    <BodyBlock>
      <ContentView />
    </BodyBlock>
  );
};

export default Body;
