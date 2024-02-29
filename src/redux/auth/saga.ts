import { Dispatch } from "redux";
import { all, fork, take, put, delay } from "redux-saga/effects";

import * as actions from "./actions";
import { remotePermissions, removeAuthToken, setAuthToken } from "../../config";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, axiosClient, ToastService } from "../../services";

function* fetchLogin(): any {
  while (true) {
    const { payload } = yield take(actions.FETCH_LOGIN + START);
    try {
      const { data } = yield axiosClient.post("/auth/admin/login", payload);
      yield put({ type: actions.FETCH_LOGIN + SUCCESS, payload: data.user });
      yield setAuthToken(data.token);
    } catch (error: any) {
      yield put({ type: actions.FETCH_LOGIN + FAIL, payload: error.response ? error.response.data : error });
    }
  }
}

function* setSession(): any {
  while (true) {
    const { payload } = yield take(actions.SET_SESSION);
    yield setAuthToken(payload?.token);
    window.location.href = "/";
    yield delay(500);
    window.location.reload();
  }
}

function* fetchAuthUser(): any {
  while (true) {
    yield take(actions.FETCH_AUTH_USER + START);
    try {
      const { data } = yield axiosClient.get("/auth/admin/me");
      yield put({ type: actions.FETCH_AUTH_USER + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_AUTH_USER + FAIL, payload: error.response ? error.response.data : error });
      if (AppError(error)?.status === 401) {
        yield removeAuthToken();
        yield put({ type: actions.LOG_OUT });
      }
    }
  }
}

function* changePassword(): any {
  while (true) {
    const { payload } = yield take(actions.CHANGE_PASSWORD + START);
    try {
      const { data } = yield axiosClient.post("/auth/admin/changepassword", payload);
      yield put({ type: actions.CHANGE_PASSWORD + SUCCESS });
      ToastService.showSuccessMessage(data.message);
    } catch (error: any) {
      yield put({ type: actions.CHANGE_PASSWORD + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* logout() {
  while (true) {
    yield take(actions.LOG_OUT);
    yield removeAuthToken();
    yield remotePermissions();
  }
}

export default function* authSaga(dispatch: Dispatch) {
  yield all([fork(fetchLogin), fork(setSession), fork(fetchAuthUser), fork(changePassword), fork(logout)]);
}
