import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { CommentListViewProps } from "../DetailType";
import CommentItem from "./CommentItem";

const CommentListViewBlock = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const CommentListView: FC<CommentListViewProps> = ({
  comments,
  onPressDeleteComment,
  onPressEditComment,
  ...props
}) => {
  return (
    <CommentListViewBlock {...props}>
      {comments?.map((item, index) => {
        return (
          <CommentItem
            comment={item}
            onPressDeleteComment={onPressDeleteComment}
            onPressEditComment={onPressEditComment}
            key={index}
          />
        );
      })}
    </CommentListViewBlock>
  );
};

export default CommentListView;
