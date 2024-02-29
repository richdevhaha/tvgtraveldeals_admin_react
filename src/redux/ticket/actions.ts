import { createAction } from "redux-actions";
import { START } from "../constant";

export const INIT_CREATE_FLAGS = "INIT_CREATE_FLAGS";
export const FETCH_TICKETS = "FETCH_TICKETS";
export const FETCH_ONE_TICKET = "FETCH_ONE_TICKET";
export const CREATE_TICKET = "CREATE_TICKET";
export const UPDATE_TICKET = "UPDATE_TICKET";
export const CREATE_DRAFT_TICKET = "CREATE_DRAFT_TICKET";
export const DELETE_TICKET = "DELETE_TICKET";
export const ASSIN_FEATURE_TICKETS = "ASSIN_FEATURE_TICKETS";
export const CHANGE_TICKET_STATUS = "CHANGE_TICKET_STATUS";
export const UPLOAD_TICKET_IMAGE = "UPLOAD_TICKET_IMAGE";

export const initCreateFlagsAction = createAction(INIT_CREATE_FLAGS);
export const fetchTicketsAction = createAction(FETCH_TICKETS + START);
export const fetchOneTicketAction = createAction(FETCH_ONE_TICKET + START);
export const createTicketAction = createAction(CREATE_TICKET + START);
export const updateTicketAction = createAction(UPDATE_TICKET + START);
export const createDraftTicketAction = createAction(CREATE_DRAFT_TICKET + START);
export const deleteTicketAction = createAction(DELETE_TICKET + START);
export const assignFeatureTicketAction = createAction(ASSIN_FEATURE_TICKETS + START);
export const changeTicketStatusAction = createAction(CHANGE_TICKET_STATUS + START);
export const uploadTicketImageAction = createAction(UPLOAD_TICKET_IMAGE + START);
