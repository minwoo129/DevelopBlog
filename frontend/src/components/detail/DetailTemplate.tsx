import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";

const DetailTemplateBlock = styled.div`
  flex: 1;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
`;

interface DetailTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const DetailTemplate: FC<DetailTemplateProps> = (props) => {
  return (
    <DetailTemplateBlock>
      <Header />
      <Body />
    </DetailTemplateBlock>
  );
};

export default DetailTemplate;
