import invokeAPI from "../lib/restAPI";
import { getBlogResult, getCommentsResult } from "../redux/slice/Blog/types";

export const getBlogDetail = async (id: number) => {
  try {
    const result = await invokeAPI<getBlogResult>({
      method: "get",
      path: `/api/content/get/${id}`,
    })({});
    console.log("detail result: ", result);
    return result.data.data;
  } catch (e) {
    throw e;
  }
};

export const getBlogComments = async (id: number) => {
  try {
    const result = await invokeAPI<getCommentsResult>({
      method: "get",
      path: `/api/comment/get/list/${id}`,
    })({
      params: {
        page: 1,
        size: 10,
      },
    });
    console.log("comment result: ", result);
    return result.data.data;
  } catch (e) {
    throw e;
  }
};
