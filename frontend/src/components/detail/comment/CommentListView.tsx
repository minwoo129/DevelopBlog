import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { CommentType } from "../../../modules/initialStates/initialStateType";
import CommentItem from "./CommentItem";

const CommentListViewBlock = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

interface CommentListViewProps extends HTMLAttributes<HTMLDivElement> {
  comments?: CommentType[];
}

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
