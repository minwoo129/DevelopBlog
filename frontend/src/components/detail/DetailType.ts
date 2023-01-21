import { HTMLAttributes, TextareaHTMLAttributes } from "react";
import {
  blogDetailType,
  CommentType,
  CommentUserType,
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
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface ButtonViewProps extends HTMLAttributes<HTMLDivElement> {
  onPressAdd(): void;
}

export interface CommentListViewProps
  extends HTMLAttributes<HTMLDivElement>,
    CommentItemExtendProps {
  comments?: CommentType[];
}

export interface CommentItemProps
  extends HTMLAttributes<HTMLDivElement>,
    CommentItemExtendProps {
  comment: CommentType;
}

interface CommentItemExtendProps {
  onPressEditComment(id: number): void;
  onPressDeleteComment(id: number): void;
}

export interface CommentItemImageViewProps {
  user: CommentUserType;
}

export interface CommentInputStyledButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  visible: boolean;
}
