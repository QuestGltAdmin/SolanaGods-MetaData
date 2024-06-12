import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import createSagaMiddleWare from "redux-saga";
import {
  watchAuthentication,
} from "./sagas/watcherSagas";

const saga = createSagaMiddleWare();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [saga],
});

saga.run(watchAuthentication);

