import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import CommentInput from "./CommentInput";

const CommentViewBlock = styled.div`
  display: block;
  min-height: 300px;
  border: 1px solid green;
  height: 500px;
  padding-left: 50px;
  padding-right: 50px;
`;

interface CommentViewProps extends HTMLAttributes<HTMLDivElement> {}

const CommentView: FC<CommentViewProps> = ({ ...props }) => {
  return (
    <CommentViewBlock {...props}>
      <CommentInput />
    </CommentViewBlock>
  );
};

export default CommentView;
