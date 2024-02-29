import produce from "immer";
import { handleActions } from "redux-actions";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AdminUserItem } from "../../types";

export interface AuthState {
  isLoggedIn: boolean;
  authorizing: boolean;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
  user?: AdminUserItem;
}

const initialState: AuthState = {
  isLoggedIn: false,
  authorizing: true,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
  user: undefined,
};

export const authReducer = handleActions<AuthState, any>(
  {
    [actions.LOG_OUT]: () => ({ ...initialState, authorizing: false }),

    [actions.INIT_AUTH]: (state) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = false;
        draft.error = undefined;
      }),

    /** FETCH_LOGIN */
    [actions.FETCH_LOGIN + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = true;
        draft.error = undefined;
      }),
    [actions.FETCH_LOGIN + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = true;
        draft.authorizing = false;
        draft.error = undefined;
        draft.user = payload;
      }),
    [actions.FETCH_LOGIN + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = false;
        draft.error = payload;
      }),

    /** CHANGE_PASSWORD */
    [actions.CHANGE_PASSWORD + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CHANGE_PASSWORD + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.CHANGE_PASSWORD + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** FETCH_AUTH_USER */
    [actions.FETCH_AUTH_USER + START]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.isLoggedIn = false;
        draft.authorizing = true;
        draft.error = undefined;
      }),
    [actions.FETCH_AUTH_USER + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = true;
        draft.authorizing = false;
        draft.error = undefined;
        draft.user = payload;
      }),
    [actions.FETCH_AUTH_USER + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoggedIn = false;
        draft.authorizing = false;
        draft.error = payload;
      }),
  },
  initialState
);
