import { CHANGE_FIELD, JOIN, LOGIN } from "../../actionTypes/auth";
import { changeFieldType } from "./type";

export const changeField = (props: changeFieldType) => {
  return { type: CHANGE_FIELD, payload: props };
};
