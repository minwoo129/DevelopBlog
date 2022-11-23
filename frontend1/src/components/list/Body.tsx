import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const BodyBlock = styled.div`
  flex: 1;
  border: 1px solid red;
  overflow: scroll;
  padding: 20px 20px 0 20px;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  return (
    <BodyBlock>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </BodyBlock>
  );
};

export default Body;
