import React, { FC, HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EmptyLayer from "../../../common/EmptyLayer";
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
  isExecuteSearch: boolean;
  searchTxt: string;
}

const Body: FC<BodyProps> = ({
  searchBlogs,
  isExecuteSearch,
  searchTxt,
  ...props
}) => {
  const navigate = useNavigate();

  const moveToDetail = (id: number) => {
    navigate(`/detail?id=${id}`);
  };

  if (isExecuteSearch && searchBlogs.length == 0) {
    return <EmptyLayer isSearch={true} searchText={searchTxt} />;
  }
  return (
    <BodyBlock {...props}>
      {searchBlogs.map((item, index) => {
        return <SearchItem blog={item} key={index} onPress={moveToDetail} />;
      })}
    </BodyBlock>
  );
};

export default Body;
