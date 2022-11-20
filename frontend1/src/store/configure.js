import { createStore, applyMiddleware } from "redux";
import rootReducer from "../modules";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

const configure = () => {
  return createStore(
    rootReducer,
    // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
    applyMiddleware(logger, ReduxThunk)
  );
};

export default configure;
