import { Theme } from "@mui/material";
import { appColors, boxShadows, linearGradient, pxToRem } from "../../../theme";

type OwnerState = {
  absolute?: boolean;
  light?: boolean;
  transparentNavbar?: boolean;
  isMini?: boolean;
};

export const navbar = (theme: Theme, ownerState: OwnerState) => {
  const { transitions, breakpoints } = theme;
  const { transparentNavbar, absolute, light } = ownerState;

  const { dark, gradients, borderCol } = appColors;
  const { navbarBoxShadow } = boxShadows;

  return {
    boxShadow: transparentNavbar || absolute ? "none" : navbarBoxShadow,
    backdropFilter: transparentNavbar || absolute ? "none" : `blur(${pxToRem(42)})`,
    backgroundColor: "transparent !important",
    backgroundImage:
      transparentNavbar || absolute
        ? `none`
        : `${linearGradient(gradients.navbar.main, gradients.navbar.state, gradients.navbar.deg)} !importants`,

    color: () => {
      let color;

      if (light) {
        color = "white";
      } else if (transparentNavbar) {
        color = "black";
      } else {
        color = dark.main;
      }
      color = "white";
      return color;
    },
    top: absolute ? 0 : pxToRem(12),
    minHeight: pxToRem(75),
    display: "grid",
    alignItems: "center",

    borderRadius: 3,
    borderColor: transparentNavbar || absolute ? "transparent !important" : `${borderCol.navbar} !important`,
    paddingTop: { xs: pxToRem(8), sm: 0 },
    // paddingBottom: pxToRem(8),
    paddingRight: absolute ? pxToRem(8) : 0,
    paddingLeft: absolute ? pxToRem(16) : 0,

    "& > *": {
      transition: transitions.create("all", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },
    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      [breakpoints.up("sm")]: {
        minHeight: "auto",
        padding: `${pxToRem(4)} ${pxToRem(16)}`,
      },
    },
  };
};

export const navbarContainer = ({ breakpoints }: Theme) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  pt: 0.5,
  pb: 0.5,
  [breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "0",
    paddingBottom: "0",
  },
});

export const navbarRow = ({ breakpoints }: Theme, { isMini }: OwnerState) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  "&.MuiBox-root": {
    "& nav": {
      "& ol": {
        "& li": {
          "&.MuiBreadcrumbs-li": {
            "& a": {
              "& span": { color: "white" },
            },
          },
          "&.MuiBreadcrumbs-li span.MuiTypography-button": { color: "white" },
          "&.MuiBreadcrumbs-separator": { color: "white" },
        },
      },
    },
  },
  "& h6": {
    color: "rgb(255,255,255)",
  },
  [breakpoints.up("md")]: {
    justifyContent: isMini ? "space-between" : "stretch",
    width: isMini ? "100%" : "max-content",
  },

  [breakpoints.up("xl")]: {
    justifyContent: "stretch !important",
    width: "max-content !important",
  },
});

export const navbarIconButton = ({ breakpoints }: Theme) => ({
  px: 0.75,
  borderRadius: 5,

  "& .material-icons, .material-icons-round": {
    fontSize: `14px !important`,
    color: "black",
  },

  "& .MuiTypography-root": {
    display: "none",
    color: "black",

    [breakpoints.up("sm")]: {
      display: "inline-block",
      lineHeight: 1.2,
      ml: 0.5,
    },
  },
});

export const navbarMobileMenu = (theme: Theme) => ({
  display: "inline-block",
  lineHeight: 0,
  color: "black",

  [theme.breakpoints.up("xl")]: {
    display: "none",
  },
});
