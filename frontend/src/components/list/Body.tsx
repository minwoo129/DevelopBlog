import React, { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import ListItem from "./listItem/ListItem";
import { useSelector } from "react-redux";
import { blogItemType } from "../../modules/initialStates/initialStateType";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlogsThunk } from "../../modules/thunk/blog";
import EmptyLayer from "../../common/EmptyLayer";
import { isActiveInServer } from "../../config";
import { BodyInsideGridProps, BodyProps } from "./ListTypes";
import _ from "lodash";
import { RootState } from "../../redux/slice";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  overflow: scroll;
  justify-content: center;
  padding-top: 50px;
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

const BodyInsideGrid: FC<BodyInsideGridProps> = ({ blogs, onPress }) => {
  const [rowList, setRowList] = useState<blogItemType[][]>([]);
  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);
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
                <ListItem
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

const Body: FC<BodyProps> = (props) => {
  const blogs = useSelector((state: RootState) => state.Blog.blogs);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    _getBlogs();
  }, []);

  const _getBlogs = async () => {
    try {
      const result = await dispatch(
        getBlogsThunk({
          params: {
            page: 1,
            size: 20,
          },
        })
      );
    } catch (err) {
      !isActiveInServer && console.log("MainPage _getBlogs error: ", err);
    }
  };

  const onPress = (id: number) => {
    navigate(`/detail?id=${id}`);
  };

  if (blogs.length == 0) {
    return <EmptyLayer isSearch={false} />;
  }
  return (
    <BodyBlock>
      <BodyInsideGrid blogs={blogs} onPress={onPress} />
    </BodyBlock>
  );
};

export default Body;
