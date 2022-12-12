import React, { FC, HTMLAttributes, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import ListItem from "./listItem/ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/reducer";
import { blogItemType } from "../../modules/initialStates/initialStateType";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlogsThunk } from "../../modules/thunk/blog";
import EmptyLayer from "../../common/EmptyLayer";
import { isActiveInServer } from "../../config";

const BodyBlock = styled.div`
  flex: 1;
  display: flex;
  overflow: scroll;
  @media (max-width: 768px) {
    padding: 0 50px;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 768px) {
    padding: 0 120px;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1400px) {
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 100px;
  }
`;

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body: FC<BodyProps> = (props) => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
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
      {blogs.map((item: blogItemType, index: number) => {
        return <ListItem blog={item} onPress={onPress} key={index} />;
      })}
    </BodyBlock>
  );
};

export default Body;
