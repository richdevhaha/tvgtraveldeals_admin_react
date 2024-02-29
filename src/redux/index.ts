import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { setAutoFreeze } from "immer";
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

setAutoFreeze(false);
export const history = createBrowserHistory();

const rootReducerInstance = rootReducer(history);

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducerInstance);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

sagaMiddleware.run(rootSaga as any, store.dispatch);

export const persistor = persistStore(store);
