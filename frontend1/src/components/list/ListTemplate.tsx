import React, { FC, HTMLAttributes, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import invokeAPI from "../../modules/restAPI";
import Header from "./Header";

const ListTemplateBlock = styled.div`
  flex: 1;
  border: 1px solid orange;
  background: #e9ecef;
`;

interface ListTemplateProps extends HTMLAttributes<HTMLDivElement> {}

const ListTemplate: FC<ListTemplateProps> = (props) => {
  return (
    <ListTemplateBlock>
      <Header />
    </ListTemplateBlock>
  );
};

export default ListTemplate;
