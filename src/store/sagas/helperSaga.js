import { toast } from "react-toastify";
import { put } from "redux-saga/effects";
export function* catchHandler(error, failSaga) {
  console.log(`came in catch block of ${failSaga} funciton \n`, error.message);
  if (error.message === "Network Error") {
    toast.error("Network Error");
  }
  if (
    error !== undefined &&
    error.response !== undefined &&
    error.response.status !== undefined
  ) {
    if (error.response.status === 400) {
      yield put(failSaga(error.response.data.message));
    } else if (
      error.response.data.message !== undefined &&
      error.response.data.message !== "" &&
      typeof error.response.data.message === "string"
    ) {
      yield put(failSaga(error.response.data.message));
    } else {
      yield put(failSaga("Server error! Please try again."));
    }
  } else {
    yield put(failSaga("Something went wrong! Please try again."));
  }
}
