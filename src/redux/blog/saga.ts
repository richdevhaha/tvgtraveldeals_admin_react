import { all, fork, put, take } from "redux-saga/effects";

import * as actions from "./actions";
import { FAIL, START, SUCCESS } from "../constant";
import { AppError, ToastService, axiosClient, axiosClientForm } from "../../services";

function* fetchBlogs(): any {
  while (true) {
    yield take(actions.FETCH_BLOG + START);
    try {
      const { data } = yield axiosClient.get(`/blog/all?limit=10000`);
      yield put({ type: actions.FETCH_BLOG + SUCCESS, payload: data });
    } catch (error: any) {
      yield put({ type: actions.FETCH_BLOG + FAIL, payload: error.response ? error.response.data : error });
      ToastService.showErrorMessage(AppError(error).message);
    }
  }
}

function* createBlog(): any {
  while (true) {
    const { payload } = yield take(actions.CREATE_BLOG + START);
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]: [any, any]) => {
        if (key !== "key") {
          formData.append(key, value);
        }
      });

      const { data } = yield axiosClientForm.post("/blog", formData);

      yield put({ type: actions.CREATE_BLOG + SUCCESS, payload: data.blog });
      ToastService.showSuccessMessage("New blog has been created successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.CREATE_BLOG + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* updateBlog(): any {
  while (true) {
    const {
      payload: { id, data: rquest },
    } = yield take(actions.UPDATE_BLOG + START);
    try {
      const formData = new FormData();
      Object.entries(rquest).forEach(([key, value]: [any, any]) => {
        if (key !== "key") {
          formData.append(key, value);
        }
      });

      const { data } = yield axiosClientForm.patch(`/blog/${id}`, formData);
      yield put({ type: actions.UPDATE_BLOG + SUCCESS, payload: data.blog });
      ToastService.showSuccessMessage("Blog has been updated successfully.");
    } catch (error: any) {
      yield put({
        type: actions.UPDATE_BLOG + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

function* deleteBlog(): any {
  while (true) {
    const { payload } = yield take(actions.DELETE_BLOG + START);
    try {
      yield axiosClient.delete(`/blog/${payload}`);
      yield put({ type: actions.DELETE_BLOG + SUCCESS, payload });
      ToastService.showSuccessMessage("Blog has been deleted successfully.");
    } catch (error: any) {
      ToastService.showErrorMessage(AppError(error).message);
      yield put({
        type: actions.DELETE_BLOG + FAIL,
        payload: error.response ? error.response.data : error,
      });
    }
  }
}

export default function* blogSaga() {
  yield all([fork(fetchBlogs), fork(createBlog), fork(updateBlog), fork(deleteBlog)]);
}
