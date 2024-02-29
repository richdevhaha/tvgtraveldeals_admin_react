import { Theme } from "@mui/material";
// import { deepPurple, yellow } from "@mui/material/colors";
import { appColors, boxShadow } from "../../../theme";

type OwnerState = {
  active?: boolean;
  miniSidenav?: boolean;
  color?: string;
  transparentSidenav?: boolean;
};

export const collapseItem = (theme: Theme, ownerState: OwnerState) => {
  const { transitions, breakpoints } = theme;
  const { active = false, transparentSidenav = false } = ownerState;

  const xxl = boxShadow([0, 20], [27, 0], "black", 0.05);

  return {
    background: active ? appColors.customBackground.main : "transparent",
    color: "white",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: { xs: "4px 2px 4px 4px", sm: "8px 8px 8px 16px" },
    // margin: `0 16px`,
    borderRadius: 3,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: active && transparentSidenav ? xxl : "none",
    [breakpoints.up("xl")]: {
      boxShadow: () => {
        if (active) {
          return transparentSidenav ? xxl : "none";
        }

        return "none";
      },
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
};

export const collapseIconBox = (theme: Theme, ownerState: OwnerState) => {
  const { transitions, breakpoints } = theme;
  const { active, color } = ownerState;

  return {
    background: active ? (color === "default" ? "white" : appColors.primary.main) : appColors.customBackground.main,
    minWidth: 30,
    minHeight: 30,
    borderRadius: 3,
    display: "grid",
    placeItems: "center",
    boxShadow: boxShadow([0, 20], [27, 0], "black", 0.05),
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    [breakpoints.up("xl")]: {
      background: () => {
        let background;

        if (!active) {
          background = appColors.customBackground.main;
        } else if (color === "default") {
          background = "transparent";
        } else if (color === "warning") {
          background = "yellow";
        } else {
          background = appColors.primary.main;
        }

        return background;
      },
    },

    // backgroundColor: active ? appColors.primary.main : "white",
    "& svg, svg g": {
      fill: active ? "white" : appColors.primary.main,
    },
  };
};

export const collapseText = (theme: Theme, ownerState: OwnerState) => {
  const { transitions, breakpoints } = theme;
  const { miniSidenav, active, color } = ownerState;

  return {
    color: color ? color : "black",
    marginLeft: "12px",
    [breakpoints.up("xl")]: {
      opacity: miniSidenav || miniSidenav ? 0 : 1,
      maxWidth: miniSidenav || miniSidenav ? 0 : "100%",
      marginLeft: miniSidenav || miniSidenav ? 0 : "12px",
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },
    "& span": {
      fontWeight: active ? "medium" : "regular",
      fontSize: 15,
      lineHeight: 0,
    },
  };
};
