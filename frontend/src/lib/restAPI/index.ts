import {
  getCookiesMethType,
  invokeAPIMethType,
  invokeFileUploadMethType,
  removeCookiesMethType,
  setCookiesMethType,
} from "./type";
import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { isActiveInServer } from "../../config";

const cookies = new Cookies();

export const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = token;
};

export const setCookies: setCookiesMethType = (key, data) => {
  cookies.remove(key);
  const date = new Date();
  date.setHours(date.getHours() + 6);
  return cookies.set(key, data, {
    expires: date,
  });
};

export const getCookies: getCookiesMethType = (key) => {
  return cookies.get(key);
};

export const removeCookies: removeCookiesMethType = (key) => {
  return cookies.remove(key);
};

export const invokeFileUpload: invokeFileUploadMethType = (args) => {
  const { path, data, uploadType } = args;
  const form = new FormData();
  form.append("file", data);
  return axios.post(path, form, {
    params: {
      uploadType,
    },
  });
};

const invokeAPI: invokeAPIMethType =
  ({ method, path }) =>
  ({ subPath = null, params = null, data = null }) => {
    let axiosReq: AxiosRequestConfig = {
      method,
      url: subPath ? `${path}${subPath}` : path,
      params,
      data,
    };

    !isActiveInServer && console.log("request req: ", axiosReq);
    return axios(axiosReq);
  };

export default invokeAPI;
