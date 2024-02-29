import { handleActions } from "redux-actions";
import produce from "immer";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";

export interface DashboardState {
  data: {
    currencyCount: number;
    destinationCount: number;
    ticketAllCount: number;
    ticketFeaturedCount: number;
    activeHelpCount: number;
    statistics: any;
  };
  isSucceeded: boolean;
  isLoading: boolean;
  error: any;
}

const initialState: DashboardState = {
  data: {
    currencyCount: 0,
    destinationCount: 0,
    ticketAllCount: 0,
    ticketFeaturedCount: 0,
    activeHelpCount: 0,
    statistics: undefined,
  },
  isSucceeded: false,
  isLoading: false,
  error: undefined,
};

export const dashboardReducer = handleActions<DashboardState, any>(
  {
    [actions.FETCH_DASHBOARD + START]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.data = initialState.data;
        draft.isLoading = true;
        draft.isSucceeded = false;
        draft.error = undefined;
      }),

    [actions.FETCH_DASHBOARD + SUCCESS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = true;
        draft.error = undefined;
        draft.data = payload;
      }),
    [actions.FETCH_DASHBOARD + FAIL]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isLoading = false;
        draft.isSucceeded = false;
        draft.error = payload;
      }),
  },
  initialState
);
