import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient } from "../../services";

function* fetchCurrencies(): any {
  while (true) {
    yield take(actions.FETCH_CURRENCY + START);
    try {
      const { data } = yield axiosClient.get("/currency/all?limit=10000");
      yield put({ type: actions.FETCH_CURRENCY + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_CURRENCY + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* createCurrency(): any {
  while (true) {
    const { payload } = yield take(actions.CREATE_CURRENCY + START);
    try {
      const newData = { ...payload, rate: payload.rate * 1 };
      const { data } = yield axiosClient.post("/currency", newData);

      yield put({ type: actions.CREATE_CURRENCY + SUCCESS, payload: data.currency });
      ToastService.showSuccessMessage("New currency has been created successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.CREATE_CURRENCY + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* updateCurrency(): any {
  while (true) {
    const { payload } = yield take(actions.UPDATE_CURRENCY + START);
    try {
      const { data } = yield axiosClient.patch(`/currency/${payload.id}`, payload.data);
      yield put({ type: actions.UPDATE_CURRENCY + SUCCESS, payload: data.currency });
      ToastService.showSuccessMessage("Currency has been updated successfully.");
    } catch (error: any) {
      yield put({
        type: actions.UPDATE_CURRENCY + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* deleteCurrency(): any {
  while (true) {
    const { payload } = yield take(actions.DELETE_CURRENCY + START);
    try {
      yield axiosClient.delete(`/currency/${payload}`);
      yield put({ type: actions.DELETE_CURRENCY + SUCCESS, payload });
      ToastService.showSuccessMessage("Currency has been deleted successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.DELETE_CURRENCY + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

export default function* currencySaga() {
  yield all([fork(fetchCurrencies), fork(createCurrency), fork(updateCurrency), fork(deleteCurrency)]);
}
