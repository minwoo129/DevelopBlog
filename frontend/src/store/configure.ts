import { applyMiddleware, createStore } from "redux";
import rootReducer from "../modules/reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { isActiveInServer } from "../config";
const configure = () => {
  if (isActiveInServer) {
    return createStore(rootReducer, applyMiddleware(thunk));
  }
  return createStore(rootReducer, applyMiddleware(logger, thunk));
};

export default configure;
