import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient } from "../../services";

function* fetchDashboard(): any {
  while (true) {
    yield take(actions.FETCH_DASHBOARD + START);

    try {
      const { data } = yield axiosClient.get("/dashboard");
      yield put({ type: actions.FETCH_DASHBOARD + SUCCESS, payload: data.data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_DASHBOARD + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

export default function* dashboardSaga() {
  yield all([fork(fetchDashboard)]);
}
