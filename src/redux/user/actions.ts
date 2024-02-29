import { createAction } from "redux-actions";
import { START } from "../constant";

export const INIT_CREATE_FLAGS = "INIT_CREATE_FLAGS";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_ONE_USER = "FETCH_ONE_USER";
export const DELETE_USER = "DELETE_USER";
export const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";

export const initCreateFlagsAction = createAction(INIT_CREATE_FLAGS);
export const fetchUsersAction = createAction(FETCH_USERS + START);
export const fetchOneUserAction = createAction(FETCH_ONE_USER + START);
export const deleteUserAction = createAction(DELETE_USER + START);
export const changeUserStatusAction = createAction(CHANGE_USER_STATUS + START);
