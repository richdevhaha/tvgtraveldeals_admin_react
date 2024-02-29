import produce from "immer";
import { handleActions } from "redux-actions";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { HelpRequest } from "../../types";
import { Booking } from "../../types/Booking";

export interface BookingState {
  items: Booking[];
  page: number;
  limit: number;
  total: number;

  oneRequest: Booking | null;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: BookingState = {
  items: [],
  limit: 20,
  page: 1,
  total: 0,
  oneRequest: null,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const bookingReducer = handleActions<BookingState, any>(
  {
    /** FETCH ALL BOOKINGS */
    [actions.FETCH_ALL_BOOKING + START]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.items = initialState.items;
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_ALL_BOOKING + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.items = payload.data;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_ALL_BOOKING + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** FETCH_ONE_BOOKING_BY_ID */
    [actions.FETCH_ONE_BOOKING_BY_ID + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_BOOKING_BY_ID + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.oneRequest = payload;
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_BOOKING_BY_ID + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);
