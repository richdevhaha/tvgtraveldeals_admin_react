import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getDestinationState = ({ destination }: RootState) => destination;

export const destinationSelector = createSelector([getDestinationState], (destination) => destination);
