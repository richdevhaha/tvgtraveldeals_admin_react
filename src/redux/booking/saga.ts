import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient, axiosClientForm } from "../../services";

function* fetchAllBooking(): any {
  while (true) {
    yield take(actions.FETCH_ALL_BOOKING + START);
    try {
      const { data } = yield axiosClient.get(`/booking?limit=10000`);
      yield put({ type: actions.FETCH_ALL_BOOKING + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_ALL_BOOKING + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* fetchOneBooking(): any {
  while (true) {
    const { payload } = yield take(actions.FETCH_ONE_BOOKING_BY_ID + START);
    try {
      const { data } = yield axiosClient.get(`/booking/${payload}`);
      yield put({ type: actions.FETCH_ONE_BOOKING_BY_ID + SUCCESS, payload: data.helpRequest });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.FETCH_ONE_BOOKING_BY_ID + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

export default function* bookingSaga() {
  yield all([fork(fetchAllBooking), fork(fetchOneBooking)]);
}
