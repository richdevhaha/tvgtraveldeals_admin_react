import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient } from "../../services";

function* fetchUsers(): any {
  while (true) {
    yield take(actions.FETCH_USERS + START);
    try {
      const { data } = yield axiosClient.get(`/user?limit=10000`);
      yield put({ type: actions.FETCH_USERS + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_USERS + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* fetchOneUser(): any {
  while (true) {
    const { payload } = yield take(actions.FETCH_ONE_USER + START);
    try {
      const { data } = yield axiosClient.get(`/user/${payload}`);
      yield put({ type: actions.FETCH_ONE_USER + SUCCESS, payload: data.user });
    } catch (error: any) {
      yield put({ type: actions.FETCH_ONE_USER + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* changeUserStatus(): any {
  while (true) {
    const { payload } = yield take(actions.CHANGE_USER_STATUS + START);
    try {
      const { id, status } = payload;
      const { data } = yield axiosClient.post(`/user/status/${id}`, { status });
      yield put({ type: actions.CHANGE_USER_STATUS + SUCCESS, payload: data.user });
      ToastService.showSuccessMessage("Selected user has been updated successfully.");
    } catch (error: any) {
      yield put({
        type: actions.CHANGE_USER_STATUS + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* deleteUser(): any {
  while (true) {
    const { payload } = yield take(actions.DELETE_USER + START);
    try {
      yield axiosClient.delete(`/user/${payload}`);
      yield put({ type: actions.DELETE_USER + SUCCESS, payload });
      ToastService.showSuccessMessage("User has been deleted successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.DELETE_USER + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

export default function* userSaga() {
  yield all([fork(fetchUsers), fork(fetchOneUser), fork(changeUserStatus), fork(deleteUser)]);
}
