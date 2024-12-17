import produce from "immer";
import { handleActions } from "redux-actions";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { Blog } from "../../types";

export interface BlogState {
  items: Blog[];
  page: number;
  limit: number;
  total: number;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: BlogState = {
  items: [],
  limit: 20,
  page: 1,
  total: 0,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const blogReducer = handleActions<BlogState, any>(
  {
    /** FETCH_BLOG */
    [actions.FETCH_BLOG + START]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.items = initialState.items;
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_BLOG + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.items = payload.data;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_BLOG + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** CREATE_BLOG */
    [actions.CREATE_BLOG + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CREATE_BLOG + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = [payload, ...state.items];
        draft.error = undefined;
        draft.total = state.total++;
      }),
    [actions.CREATE_BLOG + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** UPDATE_BLOG */
    [actions.UPDATE_BLOG + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.UPDATE_BLOG + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.map((item) => (item.id === payload.id ? payload : item));
        draft.error = undefined;
      }),
    [actions.UPDATE_BLOG + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** DELETE_BLOG */
    [actions.DELETE_BLOG + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.DELETE_BLOG + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.filter((item) => item.id !== payload);
        draft.error = undefined;
      }),
    [actions.DELETE_BLOG + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);