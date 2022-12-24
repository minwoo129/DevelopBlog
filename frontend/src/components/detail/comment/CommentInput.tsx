import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const CommentInputBlock = styled.textarea`
  height: 4rem;
  border: 1px solid #a4a4a4;
  border-radius: 6px;
  margin-top: 2rem;
  display: inline;
  min-width: 600px;
  vertical-align: top;
  padding: 10px;
`;

interface CommentInputProps extends HTMLAttributes<HTMLTextAreaElement> {}

const CommentInput: FC<CommentInputProps> = ({ ...props }) => {
  return <CommentInputBlock placeholder="댓글 입력" {...props} />;
};

export default CommentInput;
