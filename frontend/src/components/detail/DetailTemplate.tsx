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
`;

interface DetailTemplateProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
  isMenuVisible: boolean;
  setMenuOpen(): void;
  onPressDelete(): void;
  onPressRevise(): void;
}

const DetailTemplate: FC<DetailTemplateProps> = ({
  blog,
  isMenuVisible,
  setMenuOpen,
  onPressDelete,
  onPressRevise,
  ...props
}) => {
  return (
    <DetailTemplateBlock>
      <Header isMenuVisible={isMenuVisible} setMenuOpen={setMenuOpen} />
      <Body
        blog={blog}
        onPressRevise={onPressRevise}
        onPressDelete={onPressDelete}
      />
    </DetailTemplateBlock>
  );
};

export default DetailTemplate;
