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
  return (
    <BodyRowSectionBlock>
      {items.map((item, index) => {
        return <ListItem isLastRow={items.length % 4 != 0} key={index} />;
      })}
    </BodyRowSectionBlock>
  );
};

const BodyBlock = styled.div`
  flex: 1;
  height: 919px;
  border: 1px solid red;
  overflow: scroll;
  padding: 0 70px;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: scroll;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  const arr = Array(46).fill(1);
  const section = lodash.chunk(arr, 4);
  console.log("section: ", section);

  return (
    <BodyBlock>
      {section.map((item, index) => {
        return <BodyRowSection items={item} key={index} />;
      })}
    </BodyBlock>
  );
};

export default Body;