import { createAction } from "redux-actions";
import { START } from "../constant";

export const FETCH_DESTINATION = "FETCH_DESTINATION";
export const CREATE_DESTINATION = "CREATE_DESTINATION";
export const UPDATE_DESTINATION = "UPDATE_DESTINATION";
export const DELETE_DESTINATION = "DELETE_DESTINATION";

export const fetchDestinationsAction = createAction(FETCH_DESTINATION + START);
export const createDestinationAction = createAction(CREATE_DESTINATION + START);
export const updateDestinationAction = createAction(UPDATE_DESTINATION + START);
export const deleteDestinationAction = createAction(DELETE_DESTINATION + START);
