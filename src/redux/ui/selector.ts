import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getUiState = ({ ui }: RootState) => ui;

export const uiSelector = createSelector([getUiState], (ui) => ui);
export const sideNavSelector = createSelector([uiSelector], ({ sideNav }) => sideNav);
