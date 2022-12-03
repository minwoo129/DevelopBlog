import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const DetailTemplateBlock = styled.div`
  display: flex;
  flex: 1;
  border: 1px solid red;
`;

interface DetailTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const DetailTemplate: FC<DetailTemplateProps> = (props) => {
  return <DetailTemplateBlock></DetailTemplateBlock>;
};

export default DetailTemplate;
