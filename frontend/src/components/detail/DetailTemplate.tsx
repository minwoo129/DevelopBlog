import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import {
  blogDetailType,
  CommentType,
} from "../../modules/initialStates/initialStateType";
import Body from "./Body";
import { DetailTemplateProps } from "./DetailType";
import Header from "./Header";

const DetailTemplateBlock = styled.div`
  flex: 1;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const DetailTemplate: FC<DetailTemplateProps> = ({
  blog,
  isMenuVisible,
  setMenuOpen,
  onPressDelete,
  onPressRevise,
  commentInput,
  setCommentInput,
  onPressAdd,
  comments,
  ...props
}) => {
  return (
    <DetailTemplateBlock {...props}>
      <Header isMenuVisible={isMenuVisible} setMenuOpen={setMenuOpen} />
      <Body
        blog={blog}
        onPressRevise={onPressRevise}
        onPressDelete={onPressDelete}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        onPressAdd={onPressAdd}
        comments={comments}
      />
    </DetailTemplateBlock>
  );
};

export default DetailTemplate;
