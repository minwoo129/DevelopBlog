import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogDetailType } from "../../modules/initialStates/initialStateType";
import Body from "./Body";
import Header from "./Header";

const DetailTemplateBlock = styled.div`
  flex: 1;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
  width: 600px;
`;

interface DetailTemplateProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
  isMenuVisible: boolean;
  setMenuOpen(): void;
  onPressDelete(): void;
  onPressRevise(): void;
  commentInput: string;
  setCommentInput(value: string): void;
  onPressAdd(): void;
}

const DetailTemplate: FC<DetailTemplateProps> = ({
  blog,
  isMenuVisible,
  setMenuOpen,
  onPressDelete,
  onPressRevise,
  commentInput,
  setCommentInput,
  onPressAdd,
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
      />
    </DetailTemplateBlock>
  );
};

export default DetailTemplate;
