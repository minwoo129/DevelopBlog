import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import {
  blogDetailType,
  CommentType,
} from "../../modules/initialStates/initialStateType";
import BodyGroup from "./BodyGroup";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  border: 1px solid blue;
  align-items: center;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
  onPressDelete(): void;
  onPressRevise(): void;
  commentInput: string;
  setCommentInput(value: string): void;
  onPressAdd(): void;
  comments?: CommentType[];
}

const Body: FC<BodyProps> = ({
  blog,
  onPressDelete,
  onPressRevise,
  commentInput,
  setCommentInput,
  onPressAdd,
  comments,
  ...props
}) => {
  return (
    <BodyBlock {...props}>
      <BodyGroup
        blog={blog}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        onPressAdd={onPressAdd}
        comments={comments}
      />
    </BodyBlock>
  );
};

export default Body;
