import { CHANGE_FIELD, JOIN, LOGIN } from "../../actionTypes/auth";
import { createPromiseThunk } from "../../lib/asyncUtils";
import invokeAPI from "../../restAPI/restAPI";
import { changeFieldType } from "./type";

export const changeField = (props: changeFieldType) => {
  return { type: CHANGE_FIELD, payload: props };
};

export const login = createPromiseThunk(
  LOGIN,
  invokeAPI({ method: "post", path: "/login" })
);

export const join = createPromiseThunk(
  JOIN,
  invokeAPI({ method: "post", path: "/join" })
);
