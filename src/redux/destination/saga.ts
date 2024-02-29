import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient, axiosClientForm } from "../../services";

function* fetchDestinations(): any {
  while (true) {
    yield take(actions.FETCH_DESTINATION + START);
    try {
      const { data } = yield axiosClient.get(`/destination/all?limit=10000`);
      yield put({ type: actions.FETCH_DESTINATION + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_DESTINATION + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* createDestination(): any {
  while (true) {
    const { payload } = yield take(actions.CREATE_DESTINATION + START);
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]: [any, any]) => {
        if (key !== "key") {
          formData.append(key, value);
        }
      });

      const { data } = yield axiosClientForm.post("/destination", formData);

      yield put({ type: actions.CREATE_DESTINATION + SUCCESS, payload: data.destination });
      ToastService.showSuccessMessage("New destination has been created successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.CREATE_DESTINATION + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* updateDestination(): any {
  while (true) {
    const {
      payload: { id, data: rquest },
    } = yield take(actions.UPDATE_DESTINATION + START);
    try {
      const formData = new FormData();
      Object.entries(rquest).forEach(([key, value]: [any, any]) => {
        if (key !== "key") {
          formData.append(key, value);
        }
      });

      const { data } = yield axiosClientForm.patch(`/destination/${id}`, formData);
      yield put({ type: actions.UPDATE_DESTINATION + SUCCESS, payload: data.destination });
      ToastService.showSuccessMessage("Destination has been updated successfully.");
    } catch (error: any) {
      yield put({
        type: actions.UPDATE_DESTINATION + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* deleteDestination(): any {
  while (true) {
    const { payload } = yield take(actions.DELETE_DESTINATION + START);
    try {
      yield axiosClient.delete(`/destination/${payload}`);
      yield put({ type: actions.DELETE_DESTINATION + SUCCESS, payload });
      ToastService.showSuccessMessage("Destination has been deleted successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.DELETE_DESTINATION + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

export default function* destinationSaga() {
  yield all([fork(fetchDestinations), fork(createDestination), fork(updateDestination), fork(deleteDestination)]);
}
