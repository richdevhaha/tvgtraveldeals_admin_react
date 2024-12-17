import { Dispatch } from "redux";
import { all, fork } from "redux-saga/effects";

import templateSaga from "./template/saga";
import authSaga from "./auth/saga";
import currencySaga from "./currency/saga";
import dashboardSaga from "./dashboard/saga";
import destinationSaga from "./destination/saga";
import blogSaga from "./blog/saga";
import helpSaga from "./helpRequest/saga";
import ticketSaga from "./ticket/saga";
import userSaga from "./user/saga";
import uiSaga from "./ui/saga";
import bookingSaga from "./booking/saga";

export default function* rootSaga(dispatch: Dispatch) {
  yield all([
    fork(templateSaga),
    fork(authSaga, dispatch),
    fork(currencySaga),
    fork(dashboardSaga),
    fork(destinationSaga),
    fork(blogSaga),
    fork(helpSaga),
    fork(ticketSaga),
    fork(uiSaga),
    fork(userSaga),
    fork(bookingSaga)
  ]);
}
