import { combineReducers } from "redux";
import AppInfo from "./AppInfo";
import Auth from "./Auth";
import Blog from "./Blog";
import Menu from "./Menu";

const rootReducer = combineReducers({
  AppInfo,
  Auth,
  Blog,
  Menu,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
