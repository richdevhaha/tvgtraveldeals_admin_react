import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getBookingState = ({ booking }: RootState) => booking;

export const bookingSelector = createSelector([getBookingState], (booking) => booking);
