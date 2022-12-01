import { applyMiddleware, createStore } from "redux";
import rootReducer from "../modules/reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
const configure = () => {
  return createStore(rootReducer, applyMiddleware(logger, thunk));
};

export default configure;
