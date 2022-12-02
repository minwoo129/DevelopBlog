import React, { FC, HTMLAttributes, useMemo } from "react";
import styled, { css } from "styled-components";
import ListItem from "./ListItem";
import lodash from "lodash";

interface BodyRowSectionProps extends HTMLAttributes<HTMLDivElement> {
  items: number[];
}

const BodyRowSectionBlock = styled.div`
  width: 100%;
  border: 1px solid blue;
  flex-direction: row;
  display: flex;
  div:not(:last-child) {
    margin-right: 92.3px;
  }
  margin-top: 40px;
  margin-bottom: 40px;
`;

const BodyRowSection: FC<BodyRowSectionProps> = (props) => {
  const { items } = props;
  return <BodyRowSectionBlock></BodyRowSectionBlock>;
};

const BodyBlock = styled.div`
  flex: 1;
  border: 1px solid red;
  display: flex;
  flex-flow: row wrap;
  overflow: scroll;
  justify-content: space-between;
  &:after {
    content: "";
    flex: content;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  let arr = [];
  for (let i = 0; i < 50; i++) arr.push(i);

  return (
    <BodyBlock>
      {arr.map((item: number, index: number) => {
        return <ListItem value={item} key={index} />;
      })}
    </BodyBlock>
  );
};

export default Body;
