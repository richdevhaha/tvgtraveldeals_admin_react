import produce from "immer";
import { handleActions } from "redux-actions";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { Ticket } from "../../types";

export interface TicketState {
  items: Ticket[];
  page: number;
  limit: number;
  total: number;
  selectedTicket: Ticket | null;
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: TicketState = {
  items: [],
  limit: 20,
  page: 1,
  total: 0,
  selectedTicket: null,
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const ticketReducer = handleActions<TicketState, any>(
  {
    /** INIT_CREATE_FLAGS */
    [actions.INIT_CREATE_FLAGS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),

    /** FETCH_TICKETS */
    [actions.FETCH_TICKETS + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_TICKETS + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.items = payload.data;
        draft.page = payload.page;
        draft.limit = payload.limit;
        draft.total = payload.total;

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_TICKETS + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** FETCH_ONE_TICKET */
    [actions.FETCH_ONE_TICKET + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_TICKET + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.items = payload.data;
        draft.items = state.items.map((item) => (item.id === payload.id ? payload : item));
        draft.selectedTicket = payload;
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
      }),
    [actions.FETCH_ONE_TICKET + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** CREATE_TICKET */
    [actions.CREATE_TICKET + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CREATE_TICKET + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = [payload, ...state.items];
        draft.error = undefined;
        draft.total = state.total++;
      }),
    [actions.CREATE_TICKET + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** CREATE_DRAFT_TICKET */
    [actions.CREATE_DRAFT_TICKET + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CREATE_DRAFT_TICKET + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = [payload, ...state.items];
        draft.error = undefined;
        draft.total = state.total++;
      }),
    [actions.CREATE_DRAFT_TICKET + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** UPDATE_TICKET */
    [actions.UPDATE_TICKET + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.UPDATE_TICKET + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.map((item) => (item.id === payload.id ? payload : item));
        draft.error = undefined;
      }),
    [actions.UPDATE_TICKET + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** ASSIN_FEATURE_TICKETS */
    [actions.ASSIN_FEATURE_TICKETS + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.ASSIN_FEATURE_TICKETS + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        const curItems = [...state.items];
        payload.forEach((id: string) => {
          const index = curItems.findIndex((one) => one.id === id);
          if (index > -1) curItems[index].isFeatured = true;
        });

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = curItems;
        draft.error = undefined;
      }),
    [actions.ASSIN_FEATURE_TICKETS + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** CHANGE_TICKET_STATUS */
    [actions.CHANGE_TICKET_STATUS + START]: (state) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.CHANGE_TICKET_STATUS + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        const curItems = [...state.items];
        payload.forEach((id: string) => {
          const index = curItems.findIndex((one) => one.id === id);
          if (index > -1) curItems[index].isFeatured = true;
        });

        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = curItems;
        draft.error = undefined;
      }),
    [actions.CHANGE_TICKET_STATUS + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),

    /** DELETE_TICKET */
    [actions.DELETE_TICKET + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),
    [actions.DELETE_TICKET + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.items = state.items.filter((item) => item.id !== payload);
        draft.error = undefined;
      }),
    [actions.DELETE_TICKET + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);
