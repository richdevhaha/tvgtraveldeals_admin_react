import { createAction } from "redux-actions";
import { START } from "../constant";

export const FETCH_BLOG = "FETCH_BLOG";
export const CREATE_BLOG = "CREATE_BLOG";
export const UPDATE_BLOG = "UPDATE_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";

export const fetchBlogsAction = createAction(FETCH_BLOG + START);
export const createBlogAction = createAction(CREATE_BLOG + START);
export const updateBlogAction = createAction(UPDATE_BLOG + START);
export const deleteBlogAction = createAction(DELETE_BLOG + START);
