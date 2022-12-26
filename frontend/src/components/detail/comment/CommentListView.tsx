import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const CommentListViewBlock = styled.div``;

interface CommentListViewProps extends HTMLAttributes<HTMLDivElement> {}

const CommentListView: FC<CommentListViewProps> = ({ ...props }) => {
  return <CommentListViewBlock {...props}></CommentListViewBlock>;
};

export default CommentListView;
