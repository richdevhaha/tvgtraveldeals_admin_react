import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { History } from "history";
import { connectRouter } from "connected-react-router";

import { RootState } from "../types";
import { templateReducer } from "./template/reducer";
import { uiReducer } from "./ui/reducer";
import { authReducer } from "./auth/reducer";
import { dashboardReducer } from "./dashboard/reducer";
import { destinationReducer } from "./destination/reducer";
import { blogReducer } from "./blog/reducer";
import { currencyReducer } from "./currency/reducer";
import { qrReducer, barcodeReducer, ticketReducer } from "./ticket/reducer";
import { helpReducer } from "./helpRequest/reducer";
import { userReducer } from "./user/reducer";
import { bookingReducer } from "./booking/reducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn", "token"],
};

const currencyPersistConfig = {
  key: "currency",
  storage,
  whitelist: ["items"],
};

const destinationPersistConfig = {
  key: "destination",
  storage,
  whitelist: ["items"],
};

const blogPersistConfig = {
  key: "blog",
  storage,
  whitelist: ["items"],
};

const ticketPersistConfig = {
  key: "ticket",
  storage,
  whitelist: ["items"],
};

const qrPersistConfig = {
  key: "qr",
  storage,
  whitelist: ["items"],
};

const barcodePersistConfig = {
  key: "barcode",
  storage,
  whitelist: ["items"],
};

export default function rootReducer(history: History) {
  return combineReducers<RootState>({
    router: connectRouter(history),
    template: templateReducer,
    auth: persistReducer<any, any>(authPersistConfig, authReducer),
    currency: persistReducer<any, any>(currencyPersistConfig, currencyReducer),
    dashboard: dashboardReducer,
    destination: persistReducer<any, any>(destinationPersistConfig, destinationReducer),
    blog: persistReducer<any, any>(blogPersistConfig, blogReducer),
    helpRequest: helpReducer,
    ticket: persistReducer<any, any>(ticketPersistConfig, ticketReducer),
    qr: persistReducer<any,any>(qrPersistConfig,qrReducer),
    barcode: persistReducer<any,any>(barcodePersistConfig,barcodeReducer),
    ui: uiReducer,
    user: userReducer,
    booking: bookingReducer
  });
}
