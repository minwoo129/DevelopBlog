import React, { FC, HTMLAttributes, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailTemplate from "../components/detail/DetailTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import qs from "qs";
import { useDispatch } from "react-redux";
import { getBlogThunk } from "../modules/thunk/blog";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducer";
import { setMenuOpen } from "../modules/actions/menu";
import invokeAPI from "../lib/restAPI";
import { batch } from "react-redux";
import { clearSearchBlogs, setCommentInput } from "../modules/actions/blog";
import { setSearchTxt } from "../modules/actions/appInfo";
import { isActiveInServer } from "../config";

interface DetailPageProps extends HTMLAttributes<HTMLDivElement> {}

const DetailPage: FC<DetailPageProps> = ({ ...props }) => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const navigate = useNavigate();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const blog = useSelector((state: RootState) => state.blog.blog);
  const isMenuVisible = useSelector(
    (state: RootState) => state.menu.isMenuVisible
  );
  const commentInput = useSelector(
    (state: RootState) => state.blog.commentInput
  );

  useEffect(() => {
    document.title = "DEVELOPBLOG-상세";
    batch(() => {
      _getBlog(Number(query.id));
      //__getComments(Number(query.id));
    });
  }, []);

  const _getBlog = async (id: number) => {
    try {
      const result = await dispatch(
        getBlogThunk({
          subPath: `/${id}`,
        })
      );
    } catch (err) {
      !isActiveInServer && console.log("DetailPage _getBlog error: ", err);
    }
  };

  const __getComments = async (id: number) => {
    try {
      const result = await invokeAPI({
        method: "get",
        path: `/api/comment/get/list/${id}`,
      })({
        params: {
          page: 1,
          size: 10,
        },
      });
      !isActiveInServer &&
        console.log("DetailPage __getComments result: ", result);
    } catch (err) {
      !isActiveInServer && console.log("DetailPage __getComments error: ", err);
    }
  };

  const onPressDelete = () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?.");
    if (confirmDelete) __delContent(blog?.id ?? 0);
  };

  const onPressRevise = () => {
    navigate("/write/revise");
  };

  const __delContent = async (id: number) => {
    try {
      const result = await invokeAPI({
        method: "delete",
        path: "/api/content/del",
      })({
        subPath: `/${id}`,
      });
      navigate("/");
    } catch (err) {
      !isActiveInServer && console.log("DetailPage __delContent error: ", err);
    }
  };

  return (
    <MenuTemplate {...props}>
      <DetailTemplate
        blog={blog}
        isMenuVisible={isMenuVisible}
        setMenuOpen={() => dispatch(setMenuOpen(true))}
        onPressDelete={onPressDelete}
        onPressRevise={onPressRevise}
        commentInput={commentInput}
        setCommentInput={(value) => {
          dispatch(setCommentInput(value));
        }}
        onPressAdd={() => {}}
      />
    </MenuTemplate>
  );
};

export default DetailPage;
