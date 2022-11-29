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
  height: 300px;
  border: 1px solid green;
  display: inline-block;
  @media (max-width: 1000px) {
    width: 100%;
    background: green;
  }
  @media (min-width: 1000px) {
    width: 40%;
    background: red;
  }
  @media (min-width: 1500px) {
    width: 40%;
    background: blue;
  }
`;

const ListItem: FC<ListItemProps> = (props) => {
  return (
    <ListItemBlock>
      <h6>{props.value}</h6>
    </ListItemBlock>
  );
};

export default ListItem;
