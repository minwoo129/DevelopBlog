import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const CommentInputBlock = styled.textarea`
  height: 4rem;
  border: 1px solid #a4a4a4;
  border-radius: 6px;
  margin-top: 2rem;
  display: block;
  width: 100%;
  vertical-align: top;
  padding: 10px;
  box-sizing: border-box;
`;

interface CommentInputProps extends HTMLAttributes<HTMLTextAreaElement> {}

const CommentInput: FC<CommentInputProps> = ({ ...props }) => {
  return <CommentInputBlock placeholder="댓글 입력" {...props} />;
};

export default CommentInput;
