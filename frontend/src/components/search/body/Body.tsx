import _ from "lodash";
import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EmptyLayer from "../../../common/EmptyLayer";
import SearchItem from "./searchItem/SearchItem";
import { blogItemType } from "../../../redux/state/AdditionalTypes";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  height: 90%;
  flex-direction: column;
  overflow: scroll;
  align-items: center;
`;

const BodyInsideGridBlock = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (min-width: 700px) {
    width: 700px;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 50px;
`;

const BodyRowBlock = styled.div`
  @media (max-width: 700px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  @media (min-width: 700px) {
    width: 700px;
    display: flex;
    flex-direction: row;
  }
  @media (min-width: 1200px) {
    width: 1200px;
    display: flex;
    flex-direction: row;
  }
  margin-bottom: 50px;
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  searchBlogs: blogItemType[];
  isExecuteSearch: boolean;
  searchTxt: string;
}

interface BodyInsideGridProps extends HTMLAttributes<HTMLDivElement> {
  blogs: blogItemType[];
  onPress(idx: number): void;
}

const BodyInsideGrid: FC<BodyInsideGridProps> = ({ blogs, onPress }) => {
  const [rowList, setRowList] = useState<blogItemType[][]>([]);
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, [blogs]);
  const resizeEvent = () => {
    if (window.innerWidth >= 1200) {
      setRowList(_.chunk(blogs, 3));
    } else if (window.innerWidth >= 700) {
      setRowList(_.chunk(blogs, 2));
    } else {
      setRowList(_.chunk(blogs, 1));
    }
  };

  return (
    <BodyInsideGridBlock>
      {rowList.map((item, idx) => {
        return (
          <BodyRowBlock key={idx}>
            {item.map((blog, idx1) => {
              return (
                <SearchItem
                  blog={blog}
                  onPress={onPress}
                  key={blog.id}
                  idx={idx1}
                />
              );
            })}
          </BodyRowBlock>
        );
      })}
    </BodyInsideGridBlock>
  );
};

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
      <BodyInsideGrid blogs={searchBlogs} onPress={moveToDetail} />
    </BodyBlock>
  );
};

export default Body;
