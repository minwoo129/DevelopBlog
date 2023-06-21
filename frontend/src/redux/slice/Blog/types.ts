import { PayloadAction } from "@reduxjs/toolkit";
import {
  blogCommentsType,
  blogDetailType,
  blogItemType,
  userWriteBlogsType,
} from "../../state/AdditionalTypes";

// ===========================================================
export type setAddedImageIdsAction = PayloadAction<number>;
// ===========================================================
export type getBlogsResult = {
  data: blogItemType[];
  error: boolean;
  result: boolean;
};
// ===========================================================
export type getBlogResult = {
  data: blogDetailType;
  error: boolean;
  result: boolean;
};
// ===========================================================
export type getSearchBlogsResult = {
  data: blogItemType[];
  error: boolean;
  result: boolean;
};
// ===========================================================
export type getUserWriteBlogsResult = {
  data: userWriteBlogsType;
  error: boolean;
  result: boolean;
};
// ===========================================================
export type setCommentInputAction = PayloadAction<string>;
// ===========================================================
export type addCommentResult = {
  data: boolean;
  error: boolean;
  result: boolean;
};
// ===========================================================
export type getCommentsResult = {
  data: blogCommentsType;
  error: boolean;
  result: boolean;
};
