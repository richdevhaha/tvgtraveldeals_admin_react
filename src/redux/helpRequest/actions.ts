import { createAction } from "redux-actions";
import { START } from "../constant";

export const FETCH_HELP_REQUESTS = "FETCH_HELP_REQUESTS";
export const FETCH_ONE_HELP_REQUEST = "FETCH_ONE_HELP_REQUEST";
export const UPDATE_HELP_REQUEST = "UPDATE_HELP_REQUEST";
export const DELETE_HELP_REQUEST = "DELETE_HELP_REQUEST";

export const fetchHelpRequestsAction = createAction(FETCH_HELP_REQUESTS + START);
export const fetchOneRequestAction = createAction(FETCH_ONE_HELP_REQUEST + START);
export const updateRequestAction = createAction(UPDATE_HELP_REQUEST + START);
export const deleteRequestAction = createAction(DELETE_HELP_REQUEST + START);
