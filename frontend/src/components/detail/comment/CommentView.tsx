import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import {
  blogDetailType,
  CommentType,
} from "../../../modules/initialStates/initialStateType";
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
  ...props
}) => {
  return (
    <CommentViewBlock {...props}>
      <StyledTitle>{`총 ${blog?.commentCount ?? 0}개의 댓글`}</StyledTitle>
      <CommentInput
        defaultValue={commentInput}
        onMouseOut={(e) => {
          setCommentInput(e.currentTarget.value);
        }}
      />
      <ButtonView onPressAdd={onPressAdd} />
      <CommentListView comments={comments} />
    </CommentViewBlock>
  );
};

export default CommentView;
