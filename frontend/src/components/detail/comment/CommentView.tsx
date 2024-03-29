import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { CommentViewProps } from "../DetailType";
import ButtonView from "./ButtonView";
import CommentInput from "./CommentInput";
import CommentListView from "./CommentListView";

const CommentViewBlock = styled.div`
  display: block;
  min-height: 300px;
  padding-left: 50px;
  padding-right: 50px;
`;

const StyledTitle = styled.h2``;

const CommentView: FC<CommentViewProps> = ({
  blog,
  commentInput,
  setCommentInput,
  onPressAdd,
  comments,
  onPressEditComment,
  onPressDeleteComment,
  ...props
}) => {
  return (
    <CommentViewBlock {...props}>
      <StyledTitle>{`총 ${blog?.commentCount ?? 0}개의 댓글`}</StyledTitle>
      <CommentInput
        value={commentInput}
        onChange={(e) => {
          setCommentInput(e.target.value);
        }}
      />
      <ButtonView onPressAdd={onPressAdd} />
      <CommentListView
        comments={comments}
        onPressEditComment={onPressEditComment}
        onPressDeleteComment={onPressDeleteComment}
      />
    </CommentViewBlock>
  );
};

export default CommentView;
