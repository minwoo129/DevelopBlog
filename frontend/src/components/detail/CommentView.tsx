import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const CommentViewBlock = styled.div`
  display: block;
  min-height: 300px;
  border: 1px solid green;
  height: 500px;
`;

interface CommentViewProps extends HTMLAttributes<HTMLDivElement> {}

const CommentView: FC<CommentViewProps> = ({ ...props }) => {
  return <CommentViewBlock {...props}></CommentViewBlock>;
};

export default CommentView;
