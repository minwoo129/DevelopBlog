import { HTMLAttributes } from "react";

export interface WritePostProps extends HTMLAttributes<HTMLDivElement> {}

// ====================================== Function Call Signitures ==============================================
export type addImageBlobHook = (
  data: Blob | File,
  callback: ToastEditorHookCallback
) => Promise<void>;
export type ToastEditorHookCallback = (url: string, text?: string) => void;
