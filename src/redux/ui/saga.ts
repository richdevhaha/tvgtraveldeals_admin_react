import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { AppError, ToastService } from "../../services";

function* toggleBottomNav() {
  while (true) {
    yield take(actions.TOGGLE_BOTTOM_NAVIGATION);
    try {
      yield put({ type: actions.TOGGLE_BOTTOM_NAVIGATION });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* setMiniSidenav() {
  while (true) {
    const { payload } = yield take(actions.MINI_SIDENAV);
    try {
      yield put({ type: actions.MINI_SIDENAV, payload });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* setTransparentSidenav() {
  while (true) {
    const { payload } = yield take(actions.TRANSPARENT_SIDENAV);
    try {
      yield put({ type: actions.TRANSPARENT_SIDENAV, payload });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* setSidenavColor() {
  while (true) {
    const { payload } = yield take(actions.SIDENAV_COLOR);
    try {
      yield put({ type: actions.SIDENAV_COLOR, payload });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* setTransparentNavbar() {
  while (true) {
    const { payload } = yield take(actions.TRANSPARENT_NAVBAR);
    try {
      yield put({ type: actions.TRANSPARENT_NAVBAR, payload });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* setFixedNavbar() {
  while (true) {
    const { payload } = yield take(actions.FIXED_NAVBAR);
    try {
      yield put({ type: actions.FIXED_NAVBAR, payload });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* setOpenConfigurator() {
  while (true) {
    const { payload } = yield take(actions.OPEN_CONFIGURATOR);
    try {
      yield put({ type: actions.OPEN_CONFIGURATOR, payload });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* setLayout() {
  while (true) {
    const { payload } = yield take(actions.LAYOUT);
    try {
      yield put({ type: actions.LAYOUT, payload });
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

export default function* uiSaga() {
  yield all([
    fork(toggleBottomNav),
    fork(setMiniSidenav),
    fork(setTransparentSidenav),
    fork(setSidenavColor),
    fork(setTransparentNavbar),
    fork(setFixedNavbar),
    fork(setOpenConfigurator),
    fork(setLayout),
  ]);
}
