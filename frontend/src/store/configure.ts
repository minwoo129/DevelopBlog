import { applyMiddleware, createStore } from "redux";
import rootReducer from "../modules/reducer";
import thunk from "redux-thunk";
const configure = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configure;
