import React, { FC, HTMLAttributes } from "react";
import styled, {
  css,
  DefaultTheme,
  ThemedCssFunction,
} from "styled-components";

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

const ListItemBlock = styled.div`
  width: 290px;
  height: 150px;
  border: 1px solid green;
  display: inline-block;
`;

const ListItem: FC<ListItemProps> = (props) => {
  return (
    <ListItemBlock>
      <h6>{props.value}</h6>
    </ListItemBlock>
  );
};

export default ListItem;
