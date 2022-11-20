import { apiType1, apiType2 } from "./type";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setToken = (loginData: any) => {
  axios.defaults.headers.common["authorization"] = loginData.token;
};

export const setCookies = (loginData: any) => {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return cookies.set("loginToken", loginData.token, {
    expires: date,
  });
};

export const getCookies = () => {
  return cookies.get("loginToken");
};

const invokeAPI =
  ({ method, path }: apiType1) =>
  ({ subPath = null, params = null, data = null }: apiType2) => {
    return axios({
      method,
      url: subPath ? `${path}${subPath}` : path,
      params,
      data,
    });
  };

export default invokeAPI;
