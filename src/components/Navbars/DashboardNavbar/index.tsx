import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { AppBar, Box, Toolbar, IconButton, Menu, Typography, SxProps } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { AppBreadcrumbs } from "../../CustomMUI";
import { NotificationItem } from "../../NotificationItem";
import { logOutAction } from "../../../redux/auth/actions";
import { sideNavSelector } from "../../../redux/ui/selector";
import { setMiniSidenavAction, setOpenConfiguratorAction, setTransparentNavbarAction } from "../../../redux/ui/actions";
import { PrivateRoutes } from "../../../routes";
import { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu } from "./styles";

import avatar9 from "../../../assets/temp/avatars/avatar9.png";
import logoSpotify from "../../../assets/svgs/brand/logo-spotify.svg";

type Props = {
  absolute?: boolean;
  light?: boolean;
  isMini?: boolean;
  sx?: SxProps;
};

export const DashboardNavbar = ({ absolute = false, light = false, isMini = false, sx = {} }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = useSelector(sideNavSelector);
  const [navbarType, setNavbarType] = useState<"sticky" | "static">();
  const [menuAnchor, setMenuAnchor] = useState<HTMLMenuElement | null>(null);
  const route = location.pathname.split("/").slice(1);
  const queryParams = new URLSearchParams(location.search);
  const idVal = queryParams.get("id");

  useEffect(() => {
    const handleTransparentNavbar = () => {
      dispatch(setTransparentNavbarAction((fixedNavbar && window.scrollY === 0) || !fixedNavbar));
    };

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  useEffect(() => {
    setNavbarType(fixedNavbar ? "sticky" : "static");
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => dispatch(setMiniSidenavAction(!miniSidenav));
  const handleConfiguratorOpen = () => dispatch(setOpenConfiguratorAction(!openConfigurator));
  const handleOpenMenu = (event: any) => setMenuAnchor(event.currentTarget);
  const handleCloseMenu = () => setMenuAnchor(null);

  const getTitle = () => {
    const lastURI = route[route.length - 1];
    let title = PrivateRoutes.find((one) => one.route?.endsWith(lastURI))?.name;
    if (title?.startsWith("Edit") && (idVal === "0" || idVal === null)) title = title.replace("Edit", "New");
    return title || lastURI;
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={menuAnchor}
      anchorReference={undefined}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={Boolean(menuAnchor)}
      onClose={handleCloseMenu}
      sx={{ mt: 2, ...sx }}
    >
      <NotificationItem
        image={<img src={avatar9} alt="person" style={{ width: 35, height: 35 }} />}
        message={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" style={{ width: 35, height: 35 }} />}
        message={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="text"
        image={<CreditCardIcon fontSize="small" sx={{ color: "primary" }} />}
        message={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  const doLogout = useCallback(() => dispatch(logOutAction()), [dispatch]);

  return (
    <AppBar
      component="header"
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <Box color="light" mb={{ xs: 0, md: 1 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <AppBreadcrumbs Icon={HomeIcon} title={getTitle()} route={route} light={light} />
        </Box>
        {isMini ? null : (
          <Box sx={(theme) => navbarRow(theme, { isMini })}>
            <Box
              color={light ? "white" : "inherit"}
              sx={{ display: "flex", flexDirection: "row", flex: 1, justifyContent: "space-between", mx: -1 }}
            >
              <IconButton size="small" color="inherit" sx={navbarMobileMenu} onClick={handleMiniSidenav}>
                {miniSidenav ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
              <Box>
                <Link to="/login">
                  <IconButton sx={(theme) => navbarIconButton(theme)} size="small" onClick={doLogout}>
                    <ExitToAppIcon style={{ color: "white" }} />
                    <Typography fontWeight="medium" color={light ? "dark" : "white"}>
                      Log Out
                    </Typography>
                  </IconButton>
                </Link>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={(theme) => ({ ...navbarIconButton(theme), display: "none" })}
                  onClick={handleConfiguratorOpen}
                >
                  <SettingsIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={(theme) => ({ ...navbarIconButton(theme), display: "none" })}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                >
                  <NotificationsIcon />
                </IconButton>
                {renderMenu()}
              </Box>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
