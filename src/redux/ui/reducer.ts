import { handleActions } from "redux-actions";
import produce from "immer";

import * as actions from "./actions";
import { SideNavColor } from "../../types";

export interface UiState {
  isShowBottomNav: boolean;
  mobileOpen: boolean;
  activePage: string;
  pageTitle?: string;

  sideNav: {
    miniSidenav: boolean;
    transparentSidenav: boolean;
    sidenavColor: SideNavColor;
    transparentNavbar: boolean;
    fixedNavbar: boolean;
    openConfigurator: boolean;
    layout: string;
  };
}

const initialState: UiState = {
  isShowBottomNav: false,
  mobileOpen: false,
  activePage: "dashboard",
  pageTitle: "",

  sideNav: {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: false,
    fixedNavbar: true,
    openConfigurator: false,
    layout: "dashboard",
  },
};

export const uiReducer = handleActions<UiState, any>(
  {
    [actions.TOGGLE_BOTTOM_NAVIGATION]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.isShowBottomNav = payload.isShowBottomNav;
      }),

    [actions.TOGGLE_MOBILE_OPEN]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.mobileOpen = payload.mobileOpen;
        draft.activePage = payload.activePage;
      }),
    [actions.SET_ACTIVE_NAV_ITEM]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.activePage = payload;
        draft.mobileOpen = false;
      }),
    [actions.UPDATE_PAGE_TITLE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.pageTitle = payload;
      }),

    //side navigation
    [actions.MINI_SIDENAV]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.sideNav.miniSidenav = payload;
      }),

    [actions.TRANSPARENT_SIDENAV]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.sideNav.transparentSidenav = payload;
      }),

    [actions.SIDENAV_COLOR]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.sideNav.sidenavColor = payload;
      }),

    [actions.TRANSPARENT_NAVBAR]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.sideNav.transparentNavbar = payload;
      }),

    [actions.FIXED_NAVBAR]: (state, { payload }) =>
      produce(state, (draft) => {
        // draft.sideNav.fixedNavbar = payload;
      }),

    [actions.OPEN_CONFIGURATOR]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.sideNav.openConfigurator = payload;
      }),

    [actions.LAYOUT]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.sideNav.layout = payload;
      }),
  },
  initialState
);
