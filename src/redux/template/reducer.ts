import { handleActions } from "redux-actions";
import produce from "immer";

import * as actions from "./actions";

export interface TemplateState {
  value: boolean;
}

const initialState: TemplateState = {
  value: false,
};

export const templateReducer = handleActions<TemplateState, any>(
  {
    [actions.TEMPLATE_ACTION]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.value = payload;
      }),
  },
  initialState
);
