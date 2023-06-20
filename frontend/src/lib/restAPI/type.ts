import { AxiosPromise, AxiosResponse } from "axios";

export type invokeFileUploadArgs = {
  path: string;
  data: Blob | File;
  uploadType: string;
};

export type invokeAPIRequestMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete";

export type invokeAPIRequestArgs1 = {
  method: invokeAPIRequestMethod;
  path: string;
};

export type invokeAPIRequestArgs2 = {
  subPath?: string | null;
  params?: any;
  data?: any;
};

// ======================== Function Call Signitures ===================================
export type setCookiesMethType = (key: string, data: any) => void;
export type getCookiesMethType = (key: string) => any;
export type removeCookiesMethType = (key: string) => void;
export type invokeFileUploadMethType = <T = any>(
  args: invokeFileUploadArgs
) => AxiosPromise<T>;
export type invokeAPIMethType = <T = any>(
  args1: invokeAPIRequestArgs1
) => (args2: invokeAPIRequestArgs2) => AxiosPromise<T>;
