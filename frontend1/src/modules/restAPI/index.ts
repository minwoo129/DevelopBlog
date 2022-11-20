import { apiType1, apiType2 } from "./type";
import axios from "axios";

export const setToken = (token: string) => {
  axios.defaults.headers.common["authorization"] = token;
};

const invokeAPI =
  ({ method, path }: apiType1) =>
  ({ subPath, params, data }: apiType2) => {
    return axios({
      method,
      url: subPath ? `${path}${subPath}` : path,
      params,
      data,
    });
  };

export default invokeAPI;
