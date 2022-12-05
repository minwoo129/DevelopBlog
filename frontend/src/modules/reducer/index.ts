import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";
import blog from "./blog";
import appInfo from "./appInfo";

const rootReducer = combineReducers({
  auth,
  menu,
  blog,
  appInfo,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
