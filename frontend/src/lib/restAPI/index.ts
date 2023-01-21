import { apiType1, apiType2, fileUpload } from "./type";
import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { isActiveInServer } from "../../config";
import moment from "moment";

const cookies = new Cookies();

export const setCookies = (key: string, data: any) => {
  cookies.remove(key);
  const date = new Date();
  date.setHours(date.getHours() + 6);
  return cookies.set(key, data, {
    expires: date,
  });
};

export const getCookies = (key: string) => {
  return cookies.get(key);
};

export const removeCookies = (key: string) => {
  return cookies.remove(key);
};

export const invokeFileUpload = ({ path, data, uploadType }: fileUpload) => {
  const form = new FormData();
  form.append("file", data);
  return axios.post(path, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: getCookies("access_token"),
    },
    params: {
      uploadType,
    },
  });
};

const invokeAPI =
  ({ method, path }: apiType1) =>
  ({ subPath = null, params = null, data = null }: apiType2) => {
    let axiosReq: AxiosRequestConfig = {
      method,
      url: subPath ? `${path}${subPath}` : path,
      params,
      data,
    };
    const token = getCookies("access_token");
    if (token) {
      axiosReq = {
        ...axiosReq,
        headers: {
          Authorization: token,
        },
      };
    }

    !isActiveInServer && console.log("request req: ", axiosReq);
    return axios(axiosReq);
  };

export default invokeAPI;
