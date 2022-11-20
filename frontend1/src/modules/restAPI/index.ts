import { apiType1, apiType2, fileUpload } from "./type";
import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setToken = (loginData: any) => {
  axios.defaults.headers.common["authorization"] = loginData.token;
};

export const setCookies = (loginData: any) => {
  cookies.remove("cookie");
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return cookies.set(
    "cookie",
    { ...loginData },
    {
      expires: date,
    }
  );
};

export const getCookies = (key: string) => {
  return cookies.get(key);
};

export const invokeFileUpload = ({ path, data }: fileUpload) => {
  const form = new FormData();
  form.append("img", data);

  return axios.post(path, form, {
    headers: {
      "Content-Type": "multipart/form-data",
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
