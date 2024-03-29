import React, { FC, HTMLAttributes, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailTemplate from "../components/detail/DetailTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import qs from "qs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import invokeAPI from "../lib/restAPI";
import { batch } from "react-redux";
import { isActiveInServer } from "../config";
import { DetailPageProps } from "../components/detail/DetailType";
import { RootState } from "../redux/slice";
import {
  addComment,
  getBlog,
  getBlogs,
  getComments,
  setCommentInput,
} from "../redux/slice/Blog";
import { setMenuOpen } from "../redux/slice/Menu";
import { useQuery, useQueryClient } from "react-query";
import { getBlogComments, getBlogDetail } from "../query/detailQuery";

const DetailPage: FC<DetailPageProps> = ({ ...props }) => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const navigate = useNavigate();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const isMenuVisible = useSelector(
    (state: RootState) => state.Menu.isMenuVisible
  );
  const commentInput = useSelector(
    (state: RootState) => state.Blog.commentInput
  );
  const login = useSelector((state: RootState) => state.Auth.login);

  const queryClient = useQueryClient();

  const { data: blog } = useQuery("detail", () =>
    getBlogDetail(Number(query.id))
  );
  const { data: comments } = useQuery("detailComments", () =>
    getBlogComments(Number(query.id))
  );

  useEffect(() => {
    document.title = "DEVLOG-상세";
  }, []);

  const onPressDelete = () => {
    const confirmDelete = window.confirm("게시글을 삭제하시겠습니까?.");
    if (confirmDelete) __delContent(blog?.id ?? 0);
  };

  const onPressRevise = () => {
    navigate("/write/revise");
  };

  const __delContent = async (id: number) => {
    try {
      await invokeAPI({
        method: "delete",
        path: "/api/content/del",
      })({
        subPath: `/${id}`,
      });
      await _getBlogs();
      navigate("/");
    } catch (err) {
      !isActiveInServer && console.log("DetailPage __delContent error: ", err);
    }
  };

  const _getBlogs = async () => {
    try {
      await dispatch(
        getBlogs({
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

  const _addComment = async () => {
    if (!login) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await invokeAPI({ method: "post", path: "/api/comment/save" })({
        data: {
          comment: commentInput,
          contentId: blog?.id,
        },
      });
      queryClient.invalidateQueries("detailComments");
    } catch (err) {
      !isActiveInServer && console.log("DetailPage _addComment error: ", err);
    }
  };

  const onPressDeleteComment = (id: number) => {
    const deleteCheck = window.confirm(
      "삭제시 내용을 복원할 수 없습니다.\n삭제하시겠습니까?"
    );

    if (!deleteCheck) return;

    __delComment(id);
  };

  const onPressEditComment = (id: number) => {
    console.log("onPressEditComment");
  };

  const __delComment = async (id: number) => {
    try {
      await invokeAPI({
        method: "delete",
        path: `/api/comment/del/${id}`,
      })({});
      queryClient.invalidateQueries("detailComments");
    } catch (err) {
      !isActiveInServer && console.log("DetailPage __delComment error: ", err);
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
        onPressAdd={_addComment}
        comments={comments?.contents}
        onPressDeleteComment={onPressDeleteComment}
        onPressEditComment={onPressEditComment}
      />
    </MenuTemplate>
  );
};

export default DetailPage;
