import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";

const ListTemplateBlock = styled.div`
  flex: 1;
  background: #e9ecef;
  display: flex;
  flex-direction: column;
`;

interface ListTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const ListTemplate: FC<ListTemplateProps> = ({ ...props }) => {
  return (
    <ListTemplateBlock {...props}>
      <Header />
      <Body />
    </ListTemplateBlock>
  );
};

export default ListTemplate;
