import { Theme, Drawer, DrawerProps } from "@mui/material";

import { appColors, boxShadow } from "../../theme";
import { AppConfig } from "../../config";

type Props = {
  ownerState: {
    transparentSidenav?: boolean;
    miniSidenav?: boolean;
  };
} & DrawerProps;

export const SidenavRoot = (props: Props, theme: Theme) => {
  const { ownerState, children, sx, ...rest } = props;
  const { transparentSidenav, miniSidenav } = ownerState;
  const boxShadowXXL = boxShadow([0, 20], [27, 0], "black", 0.05);

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = (theme: Theme) => ({
    transform: "translateX(0)",
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),

    [theme.breakpoints.up("xl")]: {
      boxShadow: transparentSidenav ? "none" : boxShadowXXL,
      marginBottom: transparentSidenav ? 0 : "inherit",
      left: "0",
      width: AppConfig.SIDEBAR_WIDTH,
      transform: "translateX(0)",
      transition: theme.transitions.create(["width", "background-color"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = (theme: Theme) => ({
    transform: "translateX(-320px)",
    transition: theme.transitions.create("transform", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),

    [theme.breakpoints.up("xl")]: {
      boxShadow: transparentSidenav ? "none" : boxShadowXXL,
      marginBottom: transparentSidenav ? 0 : "inherit",
      left: 0,
      width: 96,
      overflowX: "hidden",
      transform: "translateX(0)",
      transition: theme.transitions.create(["width", "background-color"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    },
  });

  return (
    <Drawer
      sx={(theme) => ({
        "& .MuiDrawer-paper": {
          zIndex: 1199,
          boxShadow: boxShadowXXL,
          border: "none",
          background: transparentSidenav ? "transparent" : appColors.primary.main,
          backdropFilter: transparentSidenav ? "unset" : "blur(120px)",
          ...(miniSidenav ? drawerCloseStyles(theme) : drawerOpenStyles(theme)),
        },
      })}
      {...rest}
    >
      {children}
    </Drawer>
  );
};
