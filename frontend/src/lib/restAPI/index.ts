import { apiType1, apiType2, fileUpload } from "./type";
import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookies = (key: string, loginData: any) => {
  cookies.remove(key);
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return cookies.set(
    key,
    { ...loginData },
    {
      expires: date,
    }
  );
};

export const getCookies = (key: string) => {
  return cookies.get(key);
};

export const removeCookies = (key: string) => {
  return cookies.remove(key);
};

export const invokeFileUpload = ({ path, data }: fileUpload) => {
  const form = new FormData();
  form.append("file", data);
  return axios.post(path, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: getCookies("cookie").token,
    },
    params: {
      uploadType: "content",
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
    if (getCookies("cookie")) {
      axiosReq = {
        ...axiosReq,
        headers: {
          Authorization: getCookies("cookie").token,
        },
      };
    }
    return axios(axiosReq);
  };

export default invokeAPI;
