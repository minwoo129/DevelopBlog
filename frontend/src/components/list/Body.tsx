import React, { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
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
import { BodyInsideGridProps, BodyProps } from "./ListTypes";
import _ from "lodash";

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
        console.log(item);
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
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  let testBlogs: blogItemType[] = [];

  for (let i = 0; i < 100; i++) {
    testBlogs.push({
      id: i,
      User: {
        nickname: "test",
      },
      content: "당신의 일기를 기록해주세요",
      htmlContent: "<p>당신의 일기를 기록해주세요.</p>",
      public: true,
      thumbnailUrl:
        "https://developblog.s3.amazonaws.com/image/content/2022/1223/2c644cb1-3dbf-46cb-9301-a055d4fc0ffb",
      title: `테스트${i}`,
      updatedAt: "2022-12-23 13:34:21",
      userId: 1,
      createdAt: "2022-12-23 13:34:21",
      deletedAt: null,
    });
  }

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
      <BodyInsideGrid blogs={testBlogs} onPress={onPress} />
    </BodyBlock>
  );
};

export default Body;
