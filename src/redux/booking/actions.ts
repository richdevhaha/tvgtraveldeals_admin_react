import { createAction } from "redux-actions";
import { START } from "../constant";

export const FETCH_ALL_BOOKING = "FETCH_ALL_BOOKING"
export const FETCH_ONE_BOOKING_BY_ID = "FETCH_ONE_BOOKING_BY_ID"

export const fetchAllBookingAction = createAction(FETCH_ALL_BOOKING + START);