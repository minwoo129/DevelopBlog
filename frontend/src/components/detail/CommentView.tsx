import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const CommentViewBlock = styled.div`
  min-height: 300px;
  border: 1px solid red;
  height: 500px;
  @media (max-width: 700px) {
    margin: 0;
  }
  @media (min-width: 700px) {
    margin: 0 50px;
  }
  @media (min-width: 1000px) {
    margin: 0 100px;
  }
`;

interface CommentViewProps extends HTMLAttributes<HTMLDivElement> {}

const CommentView: FC<CommentViewProps> = ({ ...props }) => {
  return <CommentViewBlock {...props}></CommentViewBlock>;
};

export default CommentView;
