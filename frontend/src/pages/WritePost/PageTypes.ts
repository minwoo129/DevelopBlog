import { HTMLAttributes } from "react";

export type addBlogRequestData = {
  title: string;
  content: string | undefined;
  thumbnailUrl: string;
  htmlContent: string | undefined;
  imageIds: number[];
  public: boolean;
  contentId?: number;
};
// ================================= Component Prop Types ===============================
export interface WritePostProps extends HTMLAttributes<HTMLDivElement> {}

export interface WritePostHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  setTitle(value: string): void;
  onClick(): void;
}

export interface WritePostModalProps
  extends HTMLAttributes<HTMLDivElement>,
    WritePostModalCommonProps {
  visible: boolean;
  setVisible(value: boolean): void;
}

export interface WritePostModalInputInfoProps
  extends HTMLAttributes<HTMLDivElement>,
    WritePostModalCommonProps {
  close(): void;
}

interface WritePostModalCommonProps {
  thumbnailUrl: string;
  setThumbnailUrl(value: string): void;
  isPublic: boolean;
  setPublic(value: boolean): void;
  addBlog(): void;
}

// ====================================== Function Call Signitures ==============================================
export type addImageBlobHook = (
  data: Blob | File,
  callback: ToastEditorHookCallback
) => Promise<void>;
export type ToastEditorHookCallback = (url: string, text?: string) => void;
