import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../modules/initialStates/initialStateType";
import CommentView from "./CommentView";
import ContentView from "./ContentView";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  overflow: scroll;
  flex-direction: column;
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
      {/* <CommentView /> */}
    </BodyBlock>
  );
};

export default Body;
