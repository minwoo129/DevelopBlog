import axios from "axios";
import { apiParam1, apiParam2 } from "./APIType";

const invokeAPI =
  ({ method, path }: apiParam1) =>
  ({ subPath = null, params = null, data = null }: apiParam2) => {
    return axios({
      method,
      url: subPath ? path : `${path}${subPath}`,
      params,
      data,
    });
  };

export default invokeAPI;
