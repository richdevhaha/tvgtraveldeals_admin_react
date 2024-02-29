import { AppConfig } from "../../config";
import { rgba } from "../themeUtils";

export const sidenav = {
  styleOverrides: {
    root: {
      width: AppConfig.SIDEBAR_WIDTH,
      // whiteSpace: "nowrap",
      border: 0,
    },

    paper: {
      width: AppConfig.SIDEBAR_WIDTH,
      backgroundColor: rgba("white", 0.8),
      backdropFilter: `saturate(200%) blur(30px)`,
      height: `calc(100% - 32px)`,
      margin: 16,
      borderRadius: 12,
      border: 0,
    },

    paperAnchorDockedLeft: {
      borderRight: 0,
    },
  },
};
