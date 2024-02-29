import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getTemplateState = ({ template }: RootState) => template;

export const templateSelector = createSelector(
  [getTemplateState],
  ({ value }) => value
);
