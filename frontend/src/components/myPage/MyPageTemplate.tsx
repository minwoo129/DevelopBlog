import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const MyPageTemplateBlock = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid red;
  background: #e9ecef;
`;

interface MyPageTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const MyPageTemplate: FC<MyPageTemplateProps> = (props) => {
  return <MyPageTemplateBlock></MyPageTemplateBlock>;
};

export default MyPageTemplate;
