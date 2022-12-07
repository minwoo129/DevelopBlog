import React, { FC, HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const moveToDetail = (id: number) => {
    navigate(`/detail?id=${id}`);
  };

  return (
    <BodyBlock {...props}>
      {searchBlogs.map((item, index) => {
        return <SearchItem blog={item} key={index} onPress={moveToDetail} />;
      })}
    </BodyBlock>
  );
};

export default Body;
