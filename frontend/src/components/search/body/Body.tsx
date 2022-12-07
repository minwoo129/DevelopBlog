import React, { FC, HTMLAttributes } from "react";
import styled from "styled-components";
import { blogItemType } from "../../../modules/initialStates/initialStateType";
import SearchItem from "./searchItem/SearchItem";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  height: 90%;
  flex-direction: column;
  overflow: scroll;
  align-items: center;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  searchBlogs: blogItemType[];
}

const Body: FC<BodyProps> = ({ searchBlogs, ...props }) => {
  return (
    <BodyBlock {...props}>
      {searchBlogs.map((item, index) => {
        return <SearchItem blog={item} key={index} />;
      })}
    </BodyBlock>
  );
};

export default Body;
