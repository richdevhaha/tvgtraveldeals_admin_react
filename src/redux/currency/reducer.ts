import { handleActions } from "redux-actions";
import produce from "immer";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { Currency } from "../../types";

export interface CurrencyState {
  items: Currency[];
  page: number;
  limit: number;
  total: number;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: CurrencyState = {
  items: [],
  limit: 20,
  page: 1,
  total: 0,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const currencyReducer = handleActions<CurrencyState, any>(
  {
    /** FETCH_CURRENCY */
    [actions.FETCH_CURRENCY + START]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.items = initialState.items;
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_CURRENCY + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.items = payload.data;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_CURRENCY + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** CREATE_CURRENCY */
    [actions.CREATE_CURRENCY + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CREATE_CURRENCY + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = [payload, ...state.items];
        draft.error = undefined;
        draft.total = state.total++;
      }),
    [actions.CREATE_CURRENCY + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** UPDATE_CURRENCY */
    [actions.UPDATE_CURRENCY + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.UPDATE_CURRENCY + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.map((item) => (item.id === payload.id ? payload : item));
        draft.error = undefined;
      }),
    [actions.UPDATE_CURRENCY + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** DELETE_CURRENCY */
    [actions.DELETE_CURRENCY + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.DELETE_CURRENCY + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.filter((item) => item.id !== payload);
        draft.error = undefined;
      }),
    [actions.DELETE_CURRENCY + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);
