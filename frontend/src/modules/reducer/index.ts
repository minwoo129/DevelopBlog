import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import blog from "./blog";

const rootReducer = combineReducers({
  auth,
  menu,
  blog,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
