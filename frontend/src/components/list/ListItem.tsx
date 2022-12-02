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
  margin-top: 25px;
  margin-bottom: 20px;
  border-radius: 6px;
  &:last-child {
    margin-left: auto;
  }
  @media (max-width: 1000px) {
    width: 500px;
  }
  @media (min-width: 1000px) {
    width: 500px;
  }
  @media (min-width: 1200px) {
    width: 400px;
  }
  @media (min-width: 1500px) {
    width: 500px;
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
