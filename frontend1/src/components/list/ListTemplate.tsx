import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const ListTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid orange;
  color: orange;
`;

interface ListTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const ListTemplate: FC<ListTemplateProps> = (props) => {
  return <ListTemplateBlock>리스트</ListTemplateBlock>;
};

export default ListTemplate;
