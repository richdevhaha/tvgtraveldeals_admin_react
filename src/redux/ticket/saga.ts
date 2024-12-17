import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient } from "../../services";

function* fetchTickets(): any {
  while (true) {
    yield take(actions.FETCH_TICKETS + START);
    try {
      const { data } = yield axiosClient.get(`/ticket/all?limit=10000`);
      yield put({ type: actions.FETCH_TICKETS + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_TICKETS + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* fetchOneTicket(): any {
  while (true) {
    const { payload } = yield take(actions.FETCH_ONE_TICKET + START);
    try {
      const { data } = yield axiosClient.get(`/ticket/admin/${payload}`);
      yield put({ type: actions.FETCH_ONE_TICKET + SUCCESS, payload: data.data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_ONE_TICKET + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* createTicket(): any {
  while (true) {
    const { payload } = yield take(actions.CREATE_TICKET + START);
    try {
      const { data } = yield axiosClient.post("/ticket", payload);

      yield put({ type: actions.CREATE_TICKET + SUCCESS, payload: data.ticket });
      ToastService.showSuccessMessage("New ticket has been created successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.CREATE_TICKET + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* onQr(): any {
  while (true) {
    const { payload: { id, data: rquest } } = yield take(actions.ON_QR + START);
    try {
      const { data } = yield axiosClient.post(`/ticket/qr/${id}`, rquest);
      yield put({ type: actions.ON_QR + SUCCESS, payload: data });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.ON_QR + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* onBarcode(): any {
  while (true) {
    const { payload: { id, data: rquest } } = yield take(actions.ON_BARCODE + START);
    try {
      const { data } = yield axiosClient.post(`/ticket/barcode/${id}`, rquest);
      yield put({ type: actions.ON_BARCODE + SUCCESS, payload: data });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.ON_BARCODE + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* updateTicket(): any {
  while (true) {
    const {
      payload: { id, data: rquest },
    } = yield take(actions.UPDATE_TICKET + START);
    try {
      const { data } = yield axiosClient.patch(`/ticket/${id}`, rquest);
      yield put({ type: actions.UPDATE_TICKET + SUCCESS, payload: data.ticket });
      ToastService.showSuccessMessage("Ticket has been updated successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.UPDATE_TICKET + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* createDraftTicket(): any {
  while (true) {
    const { payload } = yield take(actions.CREATE_DRAFT_TICKET + START);
    try {
      const { data } = yield axiosClient.post("/ticket/draft", payload);

      yield put({ type: actions.CREATE_DRAFT_TICKET + SUCCESS, payload: data.ticket });
      ToastService.showSuccessMessage("New Draft ticket has been created successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.CREATE_DRAFT_TICKET + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* assignFeatureTicket(): any {
  while (true) {
    const { payload } = yield take(actions.ASSIN_FEATURE_TICKETS + START);
    try {
      const { data } = yield axiosClient.post(`/ticket/assign`, { ids: payload });
      yield put({ type: actions.ASSIN_FEATURE_TICKETS + SUCCESS, payload });
      ToastService.showSuccessMessage("Selected tickets has been updated successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.ASSIN_FEATURE_TICKETS + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* disssociateFeatureTicket(): any {
  while (true) {
    const { payload } = yield take(actions.DISSOCIATE_FEATURE_TICKETS + START);
    try {
      const { data } = yield axiosClient.post(`/ticket/dissociate`, { id: payload });
      yield put({ type: actions.DISSOCIATE_FEATURE_TICKETS + SUCCESS, payload });
      ToastService.showSuccessMessage("Selected ticket has been updated successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.DISSOCIATE_FEATURE_TICKETS + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* changeTicketStatus(): any {
  while (true) {
    const { payload } = yield take(actions.ASSIN_FEATURE_TICKETS + START);
    try {
      const { id, status } = payload;
      const { data } = yield axiosClient.post(`/ticket/status/${id}`, { status });
      yield put({ type: actions.ASSIN_FEATURE_TICKETS + SUCCESS, payload });
      ToastService.showSuccessMessage("Selected tickets has been updated successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.ASSIN_FEATURE_TICKETS + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* deleteTicket(): any {
  while (true) {
    const { payload } = yield take(actions.DELETE_TICKET + START);
    try {
      yield axiosClient.delete(`/ticket/${payload}`);
      yield put({ type: actions.DELETE_TICKET + SUCCESS, payload });
      ToastService.showSuccessMessage("Ticket has been deleted successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.DELETE_TICKET + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

export default function* ticketSaga() {
  yield all([
    fork(fetchTickets),
    fork(fetchOneTicket),
    fork(createTicket),
    fork(onQr),
    fork(onBarcode),
    fork(createDraftTicket),
    fork(updateTicket),
    fork(assignFeatureTicket),
    fork(disssociateFeatureTicket),
    fork(changeTicketStatus),
    fork(deleteTicket),
  ]);
}
