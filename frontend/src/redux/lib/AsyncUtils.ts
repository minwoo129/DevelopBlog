import { createAsyncThunk } from "@reduxjs/toolkit";
import invokeAPI from "../../lib/restAPI";
import {
  invokeAPIRequestArgs2,
  invokeAPIRequestMethod,
} from "../../lib/restAPI/type";

type promiseThunkArgs = {
  type: string;
  method: invokeAPIRequestMethod;
  path: string;
};
export const createPromiseThunk = <T>(args: promiseThunkArgs) => {
  const { type, method, path } = args;
  return createAsyncThunk<T, invokeAPIRequestArgs2>(
    type,
    async (data, { rejectWithValue }) => {
      try {
        const result = await invokeAPI<T>({ method, path })({ ...data });
        return result.data;
      } catch (e: any) {
        if (!e.response) throw e;
        return rejectWithValue(e.response);
      }
    }
  );
};
