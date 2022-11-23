import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";

const ListItemBlock = styled.div`
  width: 15%;
  height: 150px;
  border: 1px solid red;
  display: inline-block;
  margin-bottom: 20px;
`;

interface ListItemProps extends HTMLAttributes<HTMLDivElement> {}

const ListItem: FC<ListItemProps> = (props) => {
  return <ListItemBlock></ListItemBlock>;
};

export default ListItem;
