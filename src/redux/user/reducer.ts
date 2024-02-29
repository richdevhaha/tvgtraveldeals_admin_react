import produce from "immer";
import { handleActions } from "redux-actions";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { User } from "../../types";

export interface UserState {
  users: User[];
  page: number;
  limit: number;
  total: number;
  oneUser: User | undefined;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: UserState = {
  users: [],
  limit: 20,
  page: 1,
  total: 0,
  oneUser: undefined,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const userReducer = handleActions<UserState, any>(
  {
    /** INIT_CREATE_FLAGS */
    [actions.INIT_CREATE_FLAGS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),

    /** FETCH_USERS */
    [actions.FETCH_USERS + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_USERS + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.users = payload.data;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_USERS + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** FETCH_ONE_USER */
    [actions.FETCH_ONE_USER + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.oneUser = undefined;
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_USER + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.oneUser = payload;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_USER + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** CHANGE_USER_STATUS */
    [actions.CHANGE_USER_STATUS + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CHANGE_USER_STATUS + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        const curItems = state.users.map((one) => (one.id == payload.id ? payload : one));

        draft.users = curItems;
        draft.oneUser = payload;
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.CHANGE_USER_STATUS + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** DELETE_USER */
    [actions.DELETE_USER + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.DELETE_USER + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.users = state.users.filter((one) => one.id !== payload);
        draft.error = undefined;
      }),
    [actions.DELETE_USER + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);
