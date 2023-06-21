export type commonResultType<T> = {
  data: T;
  error: boolean;
  result: boolean;
  code?: number;
  message?: string;
};
