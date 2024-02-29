import produce from "immer";
import { handleActions } from "redux-actions";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { HelpRequest } from "../../types";

export interface HelpState {
  items: HelpRequest[];
  page: number;
  limit: number;
  total: number;

  oneRequest: HelpRequest | null;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: HelpState = {
  items: [],
  limit: 20,
  page: 1,
  total: 0,
  oneRequest: null,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const helpReducer = handleActions<HelpState, any>(
  {
    /** FETCH_HELP_REQUESTS */
    [actions.FETCH_HELP_REQUESTS + START]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.items = initialState.items;
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_HELP_REQUESTS + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.items = payload.data;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_HELP_REQUESTS + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** FETCH_ONE_HELP_REQUEST */
    [actions.FETCH_ONE_HELP_REQUEST + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_HELP_REQUEST + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.oneRequest = payload;
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_HELP_REQUEST + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** UPDATE_HELP_REQUEST */
    [actions.UPDATE_HELP_REQUEST + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.UPDATE_HELP_REQUEST + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.map((item) => (item.id === payload.id ? payload : item));
        draft.error = undefined;
      }),
    [actions.UPDATE_HELP_REQUEST + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** DELETE_HELP_REQUEST */
    [actions.DELETE_HELP_REQUEST + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.DELETE_HELP_REQUEST + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.filter((item) => item.id !== payload);
        draft.error = undefined;
      }),
    [actions.DELETE_HELP_REQUEST + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);
