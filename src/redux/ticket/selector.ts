import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getTicketState = ({ ticket }: RootState) => ticket;

export const ticketSelector = createSelector([getTicketState], (ticket) => ticket);
