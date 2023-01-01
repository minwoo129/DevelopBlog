import { HTMLAttributes } from "react";
import {
  blogDetailType,
  CommentType,
} from "../../modules/initialStates/initialStateType";

export interface DetailPageProps extends HTMLAttributes<HTMLDivElement> {}

export interface DetailTemplateProps
  extends HTMLAttributes<HTMLDivElement>,
    BodyProps,
    HeaderProps {}
// ======================================== Header ====================================
export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  isMenuVisible: boolean;
  setMenuOpen(): void;
}

// ======================================== Body ====================================
export interface BodyProps
  extends HTMLAttributes<HTMLDivElement>,
    BodyGroupProps {}
// ======================================== BodyGroup ====================================
export interface BodyGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    CommentViewProps,
    ContentViewProps {}
// ======================================== ContentView ====================================
export interface ContentViewProps extends HTMLAttributes<HTMLDivElement> {
  blog: blogDetailType | null;
  onPressDelete(): void;
  onPressRevise(): void;
}
// ======================================== CommentView ====================================
export interface CommentViewProps
  extends HTMLAttributes<HTMLDivElement>,
    ButtonViewProps,
    CommentListViewProps {
  blog: blogDetailType | null;
  commentInput: string;
  setCommentInput(value: string): void;
}

export interface CommentInputProps
  extends HTMLAttributes<HTMLTextAreaElement> {}

export interface ButtonViewProps extends HTMLAttributes<HTMLDivElement> {
  onPressAdd(): void;
}

export interface CommentListViewProps extends HTMLAttributes<HTMLDivElement> {
  comments?: CommentType[];
}

export interface CommentItemProps extends HTMLAttributes<HTMLDivElement> {
  comment: CommentType;
}
