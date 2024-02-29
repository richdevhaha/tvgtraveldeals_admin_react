import { Theme } from "@mui/material";

type OwnerState = {
  miniSidenav?: boolean;
  transparentSidenav?: boolean;
};
export const sidenavLogoLabel = (theme: Theme, ownerState: OwnerState) => {
  const { transitions /*breakpoints*/ } = theme;
  // const { transparentSidenav = false } = ownerState;

  return {
    ml: 0.5,
    fontWeight: "medium",
    // wordSpacing: pxToRem(-1),
    transition: transitions.create("opacity", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    // [breakpoints.up("xl")]: { opacity: transparentSidenav ? 0 : 1 },
  };
};
