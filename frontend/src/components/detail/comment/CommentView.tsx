import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { CommentType } from "../../../modules/initialStates/initialStateType";
import ButtonView from "./ButtonView";
import CommentInput from "./CommentInput";
import CommentListView from "./CommentListView";

const CommentViewBlock = styled.div`
  display: block;
  min-height: 300px;
  border: 1px solid green;
  padding-left: 50px;
  padding-right: 50px;
`;

const StyledTitle = styled.h2``;

interface CommentViewProps extends HTMLAttributes<HTMLDivElement> {
  commentInput: string;
  setCommentInput(value: string): void;
  onPressAdd(): void;
  comments?: CommentType[];
}

const CommentView: FC<CommentViewProps> = ({
  commentInput,
  setCommentInput,
  onPressAdd,
  comments,
  ...props
}) => {
  return (
    <CommentViewBlock {...props}>
      <StyledTitle>테스트</StyledTitle>
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
