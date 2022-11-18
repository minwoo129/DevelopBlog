export type apiParam1 = {
  method: "get" | "post" | "patch" | "put" | "delete";
  path: string;
};

export type apiParam2 = {
  subPath?: string | null;
  params?: any;
  data?: any;
};
