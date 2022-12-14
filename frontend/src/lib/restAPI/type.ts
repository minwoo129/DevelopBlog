export type apiType1 = {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
};

export type apiType2 = {
  subPath?: string | null;
  params?: any;
  data?: any;
};

export type fileUpload = {
  path: string;
  data: Blob | File;
  uploadType: string;
};
