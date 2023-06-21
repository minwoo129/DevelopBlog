import { createSlice } from "@reduxjs/toolkit";
import { BlogInitialState as initialState } from "../../state";
import {
  addCommentResult,
  getBlogResult,
  getBlogsResult,
  getCommentsResult,
  getSearchBlogsResult,
  getUserWriteBlogsResult,
  setAddedImageIdsAction,
  setCommentInputAction,
} from "./types";
import { createPromiseThunk } from "../../lib/AsyncUtils";
import { blogItemType } from "../../state/AdditionalTypes";

export const getBlogs = createPromiseThunk<getBlogsResult>({
  type: "blog/GET_BLOGS",
  method: "get",
  path: "/api/content/get/list",
});

export const getBlog = createPromiseThunk<getBlogResult>({
  type: "blog/GET_BLOG",
  method: "get",
  path: "/api/content/get",
});

export const getSearchBlogs = createPromiseThunk<getSearchBlogsResult>({
  type: "blog/GET_SEARCH_BLOGS",
  method: "get",
  path: "/api/content/search",
});

export const getUserWriteBlogs = createPromiseThunk<getUserWriteBlogsResult>({
  type: "blog/GET_USER_WRITE_BLOGS",
  method: "get",
  path: "/api/content/get/list/userWrite",
});

export const addComment = createPromiseThunk<addCommentResult>({
  type: "blog/ADD_COMMENT",
  method: "post",
  path: "/api/comment/save",
});

export const getComments = createPromiseThunk<getCommentsResult>({
  type: "blog/GET_COMMENTS",
  method: "get",
  path: "/api/comment/get/list",
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setAddedImageIds: (state, action: setAddedImageIdsAction) => {
      const newIds = [...state.addedImageIds, action.payload];
      state.addedImageIds = newIds;
    },
    clearAddedImageIds: (state, action) => {
      state.addedImageIds = [];
    },
    clearSearchBlogs: (state, action) => {
      state.searchBlogs = [];
      state.isExecuteSearch = false;
    },
    setCommentInput: (state, action: setCommentInputAction) => {
      state.commentInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    // getBlogs =======================================================
    builder.addCase(getBlogs.pending, (state, action) => {});
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload.data;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      throw action.payload;
    });
    // getBlog =======================================================
    builder.addCase(getBlog.pending, (state, action) => {});
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.blog = action.payload.data;
    });
    builder.addCase(getBlog.rejected, (state, action) => {
      throw action.payload;
    });
    // getSearchBlogs =======================================================
    builder.addCase(getSearchBlogs.pending, (state, action) => {});
    builder.addCase(getSearchBlogs.fulfilled, (state, action) => {
      state.searchBlogs = action.payload.data;
      state.isExecuteSearch = true;
    });
    builder.addCase(getSearchBlogs.rejected, (state, action) => {
      throw action.payload;
    });
    // getUserWriteBlogs =======================================================
    builder.addCase(getUserWriteBlogs.pending, (state, action) => {});
    builder.addCase(getUserWriteBlogs.fulfilled, (state, action) => {
      const { params } = action.meta.arg;
      const { data } = action.payload;
      if (params?.page === 1) {
        state.userWriteBlogs = data;
      } else {
        let contents: blogItemType[] = [];
        if (state.userWriteBlogs) {
          contents = [...state.userWriteBlogs.contents, ...data.contents];
          state.userWriteBlogs.contents = contents;
        }
      }
    });
    builder.addCase(getUserWriteBlogs.rejected, (state, action) => {
      throw action.payload;
    });
    // addComment =======================================================
    builder.addCase(addComment.pending, (state, action) => {});
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.commentInput = "";
    });
    builder.addCase(addComment.rejected, (state, action) => {
      throw action.payload;
    });
    // getComments =======================================================
    builder.addCase(getComments.pending, (state, action) => {});
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload.data;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export default blogSlice.reducer;
export const {
  clearAddedImageIds,
  clearSearchBlogs,
  setAddedImageIds,
  setCommentInput,
} = blogSlice.actions;
