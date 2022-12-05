import React, { FC, HTMLAttributes, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import ListItem from "./ListItem";
import lodash from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../modules/reducer";
import { blogItemType } from "../../modules/initialStates/initialStateType";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlogsThunk } from "../../modules/thunk/blog";

const BodyBlock = styled.div`
  flex: 1;
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
      console.log("MainPage _getBlogs error: ", err);
    }
  };

  const onPress = (id: number) => {
    navigate(`/detail?id=${id}`);
  };

  return (
    <BodyBlock>
      {blogs.map((item: blogItemType, index: number) => {
        return <ListItem blog={item} onPress={onPress} key={index} />;
      })}
    </BodyBlock>
  );
};

export default Body;
