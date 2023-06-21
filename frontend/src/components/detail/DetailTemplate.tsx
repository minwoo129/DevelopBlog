import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
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
  onPressDeleteComment,
  onPressEditComment,
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
        onPressDeleteComment={onPressDeleteComment}
        onPressEditComment={onPressEditComment}
      />
    </DetailTemplateBlock>
  );
};

export default DetailTemplate;
