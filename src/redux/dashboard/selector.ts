import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getDashboardState = ({ dashboard }: RootState) => dashboard;

export const dashboardSelector = createSelector([getDashboardState], (dashboard) => dashboard);
