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
  onPressDelete(): void;
  onPressRevise(): void;
}

const Body: FC<BodyProps> = ({
  blog,
  onPressDelete,
  onPressRevise,
  ...props
}) => {
  return (
    <BodyBlock {...props}>
      <ContentView
        blog={blog}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
      />
    </BodyBlock>
  );
};

export default Body;
