import { Theme } from "@mui/material";

import backgroundImage from "../../../assets/sidenav/sidenav-card-background.png";
import { appColors, borders } from "../../../theme";

type OwnerState = {
  color?: string;
  miniSidenav?: boolean;
};

export const card = (theme: Theme, ownerState: OwnerState) => {
  const { transitions, breakpoints } = theme;
  const { miniSidenav } = ownerState;
  const { borderRadius } = borders;

  return {
    minWidth: "auto",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "50%",
    backgroundSize: "cover",
    borderRadius: borderRadius.md,
    boxShadow: "none",

    [breakpoints.up("xl")]: {
      maxHeight: miniSidenav ? 64 : 192,
      transition: transitions.create("max-height", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },
    padding: "0px",
  };
};

export const cardContent = (theme: Theme) => {
  const { borderRadius } = borders;

  return {
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "100%",
    p: 2,

    "&::after": {
      content: '""',
      display: "block",
      height: "100%",
      width: "100%",
      borderRadius: borderRadius.xl,
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.65,
      zIndex: -1,
    },

    "& .MuiButton-root": { color: appColors.primary.main },
    "&:last-child": { pb: 2 },
  };
};

export const cardIconBox = {
  display: "grid",
  placeItems: "center",
  transition: ({ transitions }: Theme) =>
    transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),
};

export const cardIcon = (theme: Theme, ownerState: OwnerState) => {
  const { color } = ownerState;

  return {
    WebkitTextFillColor: color,
  };
};
