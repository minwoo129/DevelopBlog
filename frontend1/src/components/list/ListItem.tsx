import React, { FC, HTMLAttributes } from "react";
import styled, {
  css,
  DefaultTheme,
  ThemedCssFunction,
} from "styled-components";

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  isLastRow?: boolean;
}

const ListItemBlock = styled.div`
  width: 284.6px;
  height: 150px;
  border: 1px solid green;
  display: inline-block;
`;

const ListItem: FC<ListItemProps> = (props) => {
  return <ListItemBlock></ListItemBlock>;
};

export default ListItem;
