import { createAction } from "redux-actions";
import { START } from "../constant";

export const FETCH_CURRENCY = "FETCH_CURRENCY";
export const CREATE_CURRENCY = "CREATE_CURRENCY";
export const UPDATE_CURRENCY = "UPDATE_CURRENCY";
export const DELETE_CURRENCY = "DELETE_CURRENCY";

export const fetchCurrenciesAction = createAction(FETCH_CURRENCY + START);
export const createCurrencyAction = createAction(CREATE_CURRENCY + START);
export const updateCurrencyAction = createAction(UPDATE_CURRENCY + START);
export const deleteCurrencyAction = createAction(DELETE_CURRENCY + START);
