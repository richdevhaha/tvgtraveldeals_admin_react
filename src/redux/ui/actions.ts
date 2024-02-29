import { createAction } from "redux-actions";

//bottom navigation
export const TOGGLE_BOTTOM_NAVIGATION = "TOGGLE_BOTTOM_NAVIGATION";

export const TOGGLE_MOBILE_OPEN = "TOGGLE_MOBILE_OPEN";
export const SET_ACTIVE_NAV_ITEM = "SET_ACTIVE_NAV_ITEM";
export const UPDATE_PAGE_TITLE = "UPDATE_PAGE_TITLE";

//side navigation
export const MINI_SIDENAV = "MINI_SIDENAV";
export const TRANSPARENT_SIDENAV = "TRANSPARENT_SIDENAV";
export const SIDENAV_COLOR = "SIDENAV_COLOR";
export const TRANSPARENT_NAVBAR = "TRANSPARENT_NAVBAR";
export const FIXED_NAVBAR = "FIXED_NAVBAR";
export const OPEN_CONFIGURATOR = "OPEN_CONFIGURATOR";
export const LAYOUT = "LAYOUT";

export const toggleBottomNavAction = createAction(TOGGLE_BOTTOM_NAVIGATION);
export const toggleMobileOpen = createAction(TOGGLE_MOBILE_OPEN);
export const setActiveNavItem = createAction(SET_ACTIVE_NAV_ITEM);
export const updatePageTitleAction = createAction(UPDATE_PAGE_TITLE);

export const setMiniSidenavAction = createAction(MINI_SIDENAV);
export const setTransparentSidenavAction = createAction(TRANSPARENT_SIDENAV);
export const setSidenavColorAction = createAction(SIDENAV_COLOR);
export const setTransparentNavbarAction = createAction(TRANSPARENT_NAVBAR);
export const setFixedNavbarAction = createAction(FIXED_NAVBAR);
export const setOpenConfiguratorAction = createAction(OPEN_CONFIGURATOR);
export const setLayoutAction = createAction(LAYOUT);
