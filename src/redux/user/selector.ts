import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getUserState = ({ user }: RootState) => user;

export const userSelector = createSelector([getUserState], (user) => user);
