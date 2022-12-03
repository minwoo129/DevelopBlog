import React, { FC, HTMLAttributes, useMemo } from "react";
import styled, { css } from "styled-components";
import ListItem from "./ListItem";
import lodash from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/reducer";
import { blogType } from "../../modules/initialStates/initialStateType";

interface BodyRowSectionProps extends HTMLAttributes<HTMLDivElement> {
  items: number[];
}

const BodyBlock = styled.div`
  flex: 1;
  border: 1px solid red;
  display: flex;
  flex-flow: row wrap;
  overflow: scroll;
  @media (max-width: 768px) {
    justify-content: center;
    padding: 0 50px;
  }
  @media (min-width: 768px) {
    justify-content: center;
    padding: 0 120px;
  }
  @media (min-width: 1400px) {
    justify-content: space-between;
    padding: 0 100px;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  let arr = [];
  for (let i = 0; i < 50; i++) arr.push(i);

  return (
    <BodyBlock>
      {blogs.map((item: blogType, index: number) => {
        return <ListItem value={item.id} blog={item} key={index} />;
      })}
    </BodyBlock>
  );
};

export default Body;
