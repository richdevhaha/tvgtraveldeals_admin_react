import { appColors } from "./appColors";
import { rgba } from "../themeUtils";

const { primary, light } = appColors;
const primarySide = rgba(primary.main, 0.2);
const primaryCenter = rgba(primary.main, 1);
const lightSide = rgba(light.main, 0);
const lightCenter = rgba("white", 1);

export const divider = {
  styleOverrides: {
    root: {
      backgroundColor: "transparent",
      backgroundImage: `linear-gradient(to right, ${primarySide}, ${primaryCenter}, ${primarySide}) !important`,
      height: 1,
      margin: `2px 0`,
      borderBottom: "none",
      // opacity: 0.25,
    },

    vertical: {
      backgroundColor: "transparent",
      backgroundImage: `linear-gradient(to bottom, ${primarySide}, ${primaryCenter}, ${primarySide}) !important`,
      width: 1,
      height: "100%",
      margin: `0 2px`,
      borderRight: "none",
    },

    light: {
      backgroundColor: "transparent",
      backgroundImage: `linear-gradient(to right, ${lightSide}, ${lightCenter}, ${lightSide}) !important`,

      "&.MuiDivider-vertical": {
        backgroundImage: `linear-gradient(to bottom, ${lightSide}, ${lightCenter}, ${lightSide}) !important`,
      },
    },
  },
};
