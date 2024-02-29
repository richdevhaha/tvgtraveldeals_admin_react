import produce from "immer";
import { handleActions } from "redux-actions";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { Destination } from "../../types";

export interface DestinationState {
  items: Destination[];
  page: number;
  limit: number;
  total: number;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: DestinationState = {
  items: [],
  limit: 20,
  page: 1,
  total: 0,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const destinationReducer = handleActions<DestinationState, any>(
  {
    /** FETCH_DESTINATION */
    [actions.FETCH_DESTINATION + START]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.items = initialState.items;
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_DESTINATION + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.items = payload.data;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_DESTINATION + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** CREATE_DESTINATION */
    [actions.CREATE_DESTINATION + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CREATE_DESTINATION + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = [payload, ...state.items];
        draft.error = undefined;
        draft.total = state.total++;
      }),
    [actions.CREATE_DESTINATION + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** UPDATE_DESTINATION */
    [actions.UPDATE_DESTINATION + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.UPDATE_DESTINATION + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.map((item) => (item.id === payload.id ? payload : item));
        draft.error = undefined;
      }),
    [actions.UPDATE_DESTINATION + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** DELETE_DESTINATION */
    [actions.DELETE_DESTINATION + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.DELETE_DESTINATION + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.filter((item) => item.id !== payload);
        draft.error = undefined;
      }),
    [actions.DELETE_DESTINATION + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);
