import { createSelector } from "reselect";
import { RootState } from "../../types/store";

const getBlogState = ({ blog }: RootState) => blog;

export const blogSelector = createSelector([getBlogState], (blog) => blog);
