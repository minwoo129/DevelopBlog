import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { CommentType } from "../../../modules/initialStates/initialStateType";
import { CommentListViewProps } from "../DetailType";
import CommentItem from "./CommentItem";

const CommentListViewBlock = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const CommentListView: FC<CommentListViewProps> = ({ comments, ...props }) => {
  return (
    <CommentListViewBlock {...props}>
      {comments?.map((item, index) => {
        return <CommentItem comment={item} key={index} />;
      })}
    </CommentListViewBlock>
  );
};

export default CommentListView;
