import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getCurrencyState = ({ currency }: RootState) => currency;

export const currencySelector = createSelector([getCurrencyState], (currency) => currency);
