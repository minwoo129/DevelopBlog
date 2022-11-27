import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import invokeAPI from "../../modules/restAPI";
import Body from "./Body";
import Header from "./Header";

const ListTemplateBlock = styled.div`
  flex: 1;
  background: #e9ecef;
`;

interface ListTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const ListTemplate: FC<ListTemplateProps> = (props) => {
  return (
    <ListTemplateBlock>
      <Header />
      <Body />
    </ListTemplateBlock>
  );
};

export default ListTemplate;
