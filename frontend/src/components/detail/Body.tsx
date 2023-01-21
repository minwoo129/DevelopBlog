import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import {
  blogDetailType,
  CommentType,
} from "../../modules/initialStates/initialStateType";
import BodyGroup from "./BodyGroup";
import { BodyProps } from "./DetailType";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
`;

const Body: FC<BodyProps> = ({
  blog,
  onPressDelete,
  onPressRevise,
  commentInput,
  setCommentInput,
  onPressAdd,
  comments,
  onPressDeleteComment,
  onPressEditComment,
  ...props
}) => {
  return (
    <BodyBlock {...props}>
      <BodyGroup
        blog={blog}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        onPressAdd={onPressAdd}
        comments={comments}
        onPressDeleteComment={onPressDeleteComment}
        onPressEditComment={onPressEditComment}
      />
    </BodyBlock>
  );
};

export default Body;
