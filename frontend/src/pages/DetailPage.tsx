import React, { FC, HTMLAttributes, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailTemplate from "../components/detail/DetailTemplate";
import MenuTemplate from "../components/menu/MenuTemplate";
import qs from "qs";
import { useDispatch } from "react-redux";
import {
  addCommentThunk,
  getBlogsThunk,
  getBlogThunk,
  getCommentsThunk,
} from "../modules/thunk/blog";
import { useSelector } from "react-redux";
import { RootState } from "../modules/reducer";
import { setMenuOpen } from "../modules/actions/menu";
import invokeAPI from "../lib/restAPI";
import { batch } from "react-redux";
import { setCommentInput } from "../modules/actions/blog";
import { isActiveInServer } from "../config";
import { DetailPageProps } from "../components/detail/DetailType";

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
  const login = useSelector((state: RootState) => state.auth.login);
  const comments = useSelector(
    (state: RootState) => state.blog.comments?.contents
  );

  useEffect(() => {
    document.title = "DEVLOG-상세";
    batch(() => {
      _getBlog(Number(query.id));
      _getComments(Number(query.id));
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

  const _getComments = async (id: number) => {
    try {
      const result = await dispatch(
        getCommentsThunk({
          subPath: `/${id}`,
          params: {
            page: 1,
            size: 10,
          },
        })
      );
      !isActiveInServer &&
        console.log("DetailPage _getComments result: ", result);
    } catch (err) {
      !isActiveInServer && console.log("DetailPage _getComments error: ", err);
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
      await _getBlogs();
      navigate("/");
    } catch (err) {
      !isActiveInServer && console.log("DetailPage __delContent error: ", err);
    }
  };

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

  const _addComment = async () => {
    if (!login) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const result = await dispatch(
        addCommentThunk({
          data: {
            comment: commentInput,
            contentId: blog?.id,
          },
        })
      );
      if (blog) _getComments(blog.id);
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
      const result = await invokeAPI({
        method: "delete",
        path: `/api/comment/del/${id}`,
      })({});
      _getComments(Number(query.id));
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
        comments={comments}
        onPressDeleteComment={onPressDeleteComment}
        onPressEditComment={onPressEditComment}
      />
    </MenuTemplate>
  );
};

export default DetailPage;
