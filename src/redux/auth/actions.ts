import { createAction } from "redux-actions";
import { START } from "../constant";

export const INIT_AUTH = "INIT_AUTH";
export const FETCH_LOGIN = "FETCH_LOGIN";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const LOG_OUT = "LOG_OUT";

export const FETCH_AUTH_USER = "FETCH_AUTH_USER";
export const SET_SESSION = "SET_SESSION";
export const SYNC_USER = "SYNC_USER";

export const initAuthAction = createAction(INIT_AUTH);
export const fetchLoginAction = createAction(FETCH_LOGIN + START);
export const changePasswordAction = createAction(CHANGE_PASSWORD + START);
export const logOutAction = createAction(LOG_OUT);

export const fetchAuthUserAction = createAction(FETCH_AUTH_USER + START);
export const setSessionAction = createAction(SET_SESSION);
export const syncUserAction = createAction(SYNC_USER + START);
