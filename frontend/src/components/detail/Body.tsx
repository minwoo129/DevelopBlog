import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../modules/initialStates/initialStateType";
import ContentView from "./ContentView";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  overflow: scroll;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
}

const Body: FC<BodyProps> = ({ blog, ...props }) => {
  return (
    <BodyBlock>
      <ContentView blog={blog} />
    </BodyBlock>
  );
};

export default Body;
