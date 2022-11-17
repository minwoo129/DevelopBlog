import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../modules/reducer";

const configure = () => {
  return createStore(rootReducer, applyMiddleware(createLogger()));
};

export default configure;
