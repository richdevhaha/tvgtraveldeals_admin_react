import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getAuthState = ({ auth }: RootState) => auth;

export const authSelector = createSelector([getAuthState], (auth) => auth);
