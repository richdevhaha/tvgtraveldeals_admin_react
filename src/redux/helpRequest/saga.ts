import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient, axiosClientForm } from "../../services";

function* fetchHelpRequests(): any {
  while (true) {
    yield take(actions.FETCH_HELP_REQUESTS + START);
    try {
      const { data } = yield axiosClient.get(`/help-request?limit=10000`);
      yield put({ type: actions.FETCH_HELP_REQUESTS + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_HELP_REQUESTS + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* fetchOneRequest(): any {
  while (true) {
    const { payload } = yield take(actions.FETCH_ONE_HELP_REQUEST + START);
    try {
      const { data } = yield axiosClient.get(`/help-request/${payload}`);
      yield put({ type: actions.FETCH_ONE_HELP_REQUEST + SUCCESS, payload: data.helpRequest });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.FETCH_ONE_HELP_REQUEST + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* updateRequest(): any {
  while (true) {
    const { payload } = yield take(actions.UPDATE_HELP_REQUEST + START);
    try {
      const { id, request } = payload;
      const { data } = yield axiosClient.patch(`/help-request/${id}`, request);
      yield put({ type: actions.UPDATE_HELP_REQUEST + SUCCESS, payload: data.helpRequest });
      ToastService.showSuccessMessage("Help request has been updated successfully.");
      yield put({ type: actions.FETCH_ONE_HELP_REQUEST + START, payload: id });
    } catch (error: any) {
      yield put({
        type: actions.UPDATE_HELP_REQUEST + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* deleteRequest(): any {
  while (true) {
    const { payload } = yield take(actions.DELETE_HELP_REQUEST + START);
    try {
      yield axiosClient.delete(`/help-request/${payload}`);
      yield put({ type: actions.DELETE_HELP_REQUEST + SUCCESS, payload });
      ToastService.showSuccessMessage("Help request has been deleted successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.DELETE_HELP_REQUEST + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

export default function* helpSaga() {
  yield all([fork(fetchHelpRequests), fork(fetchOneRequest), fork(updateRequest), fork(deleteRequest)]);
}
