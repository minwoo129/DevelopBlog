import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import Body from "./body/Body";
import Header from "./Header";

const MyPageTemplateBlock = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid red;
  background: #e9ecef;
  flex-direction: column;
`;

interface MyPageTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const MyPageTemplate: FC<MyPageTemplateProps> = (props) => {
  return (
    <MyPageTemplateBlock>
      <Header />
      <Body />
    </MyPageTemplateBlock>
  );
};

export default MyPageTemplate;