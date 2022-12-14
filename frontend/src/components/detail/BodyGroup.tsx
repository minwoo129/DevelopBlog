import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import {
  blogDetailType,
  CommentType,
} from "../../modules/initialStates/initialStateType";
import CommentView from "./comment/CommentView";
import ContentView from "./ContentView";
import { BodyGroupProps } from "./DetailType";

const BodyGroupBlock = styled.div`
  flex: 1;
  display: block;
  flex-direction: column;
  @media (max-width: 700px) {
    padding: 0;
    min-width: 500px;
  }
  @media (min-width: 700px) {
    width: 700px;
  }
  @media (min-width: 1000px) {
    width: 700px;
  }
`;

const BodyGroup: FC<BodyGroupProps> = ({
  blog,
  onPressDelete,
  onPressRevise,
  commentInput,
  setCommentInput,
  onPressAdd,
  comments,
  ...props
}) => {
  return (
    <BodyGroupBlock {...props}>
      <ContentView
        blog={blog}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
      />
      <CommentView
        blog={blog}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        onPressAdd={onPressAdd}
        comments={comments}
      />
    </BodyGroupBlock>
  );
};

export default BodyGroup;
