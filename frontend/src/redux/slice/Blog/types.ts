import { PayloadAction } from "@reduxjs/toolkit";
import {
  blogCommentsType,
  blogDetailType,
  blogItemType,
  userWriteBlogsType,
} from "../../state/AdditionalTypes";
import { commonResultType } from "../commonTypes";

// ===========================================================
export type setAddedImageIdsAction = PayloadAction<number>;
// ===========================================================
export type clearAddedImageIdsAction = PayloadAction<undefined>;
// ===========================================================
export type clearSearchBlogsAction = PayloadAction<undefined>;
// ===========================================================
export type getBlogsResult = commonResultType<blogItemType[]>;
// ===========================================================
export type getBlogResult = commonResultType<blogDetailType>;
// ===========================================================
export type getSearchBlogsResult = commonResultType<blogItemType[]>;
// ===========================================================
export type getUserWriteBlogsResult = commonResultType<userWriteBlogsType>;
// ===========================================================
export type setCommentInputAction = PayloadAction<string>;
// ===========================================================
export type addCommentResult = commonResultType<boolean>;
// ===========================================================
export type getCommentsResult = commonResultType<blogCommentsType>;
