import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getHelpState = ({ helpRequest }: RootState) => helpRequest;

export const helpSelector = createSelector([getHelpState], (helpRequest) => helpRequest);
