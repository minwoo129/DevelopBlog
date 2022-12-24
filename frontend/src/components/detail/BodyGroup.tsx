import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../modules/initialStates/initialStateType";
import CommentView from "./comment/CommentView";
import ContentView from "./ContentView";

const BodyGroupBlock = styled.div`
  flex: 1;
  display: block;
  flex-direction: column;
  padding: 0 5rem;

  @media (max-width: 700px) {
    padding: 0;
  }
  @media (min-width: 700px) {
    padding: 0 50px;
    width: 700px;
  }
  @media (min-width: 1000px) {
    padding: 0 100px;
    width: 700px;
  }
`;

interface BodyGroupProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
  onPressDelete(): void;
  onPressRevise(): void;
}

const BodyGroup: FC<BodyGroupProps> = ({
  blog,
  onPressDelete,
  onPressRevise,
  ...props
}) => {
  return (
    <BodyGroupBlock {...props}>
      <ContentView
        blog={blog}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
      />
      <CommentView />
    </BodyGroupBlock>
  );
};

export default BodyGroup;
