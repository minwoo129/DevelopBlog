import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice";
import logger from "redux-logger";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export default store;
