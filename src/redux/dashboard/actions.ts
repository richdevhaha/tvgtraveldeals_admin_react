import { createAction } from "redux-actions";
import { START } from "../constant";

export const FETCH_DASHBOARD = "FETCH_DASHBOARD";

export const fetchDashboardAction = createAction(FETCH_DASHBOARD + START);
