import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import ButtonView from "./ButtonView";
import CommentInput from "./CommentInput";

const CommentViewBlock = styled.div`
  display: block;
  min-height: 300px;
  border: 1px solid green;
  padding-left: 50px;
  padding-right: 50px;
`;

const StyledTitle = styled.h2``;

interface CommentViewProps extends HTMLAttributes<HTMLDivElement> {}

const CommentView: FC<CommentViewProps> = ({ ...props }) => {
  return (
    <CommentViewBlock {...props}>
      <StyledTitle>테스트</StyledTitle>
      <CommentInput />
      <ButtonView />
    </CommentViewBlock>
  );
};

export default CommentView;
