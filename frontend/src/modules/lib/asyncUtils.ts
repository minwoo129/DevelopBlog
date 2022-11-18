import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { apiParam2 } from "../restAPI/APIType";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducer";

export const createPromiseThunk = (type: string, promiseCreator: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param: any) => async (dispatch: Dispatch<any>) => {
    dispatch({ type, param });
    try {
      const response = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload: {
          param,
          result: response.data,
        },
      });
      return response.data;
    } catch (e) {
      console.log("createPromiseThunk error", e);
      dispatch({ type: ERROR, payload: e, error: true });
      throw e;
    }
  };
};
