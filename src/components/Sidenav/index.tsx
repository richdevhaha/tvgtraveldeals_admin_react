import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { Avatar, Box, BoxProps, Button, Divider, Link, List, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { SidenavCard } from "./SidenavCard";
import { SidenavCollapse } from "./SidenavCollapse";
import { SidenavRoot } from "./SidenavRoot";
import { sidenavLogoLabel } from "./styles";
import { APP_LOGO } from "../../config";
import { logOutAction } from "../../redux/auth/actions";
import { setMiniSidenavAction, setTransparentSidenavAction } from "../../redux/ui/actions";
import { sideNavSelector } from "../../redux/ui/selector";
import { SideNavColor } from "../../types";
import { RoutePath } from "../../routes";

type Props = {
  color: SideNavColor;
  brandName: string;
  routes: any[];
} & BoxProps;

export const Sidenav = ({ color = "info", brandName, routes, onMouseEnter, onMouseLeave }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { miniSidenav, transparentSidenav } = useSelector(sideNavSelector);
  const { pathname } = location;
  // const collapseName = pathname.split("/").slice(1)[0];

  const closeSidenav = () => dispatch(setMiniSidenavAction(true));

  useEffect(() => {
    const handleMiniSidenav = () => {
      dispatch(setMiniSidenavAction(window.innerWidth < 1024));
    };

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  useEffect(() => {
    if (window.innerWidth < 1440) {
      dispatch(setTransparentSidenavAction(false));
    }
  }, [dispatch]);

  const doLogout = useCallback(() => dispatch(logOutAction()), [dispatch]);

  // const checkActiveMenu = (route) => {
  //   return pathname.includes(route);
  // };

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, route, href, isSideMenu = true }, index) => {
      let returnValue;

      if (!isSideMenu) returnValue = null;
      else if (type === "collapse") {
        returnValue = href ? (
          <Link href={href} key={index} target="_blank" rel="noreferrer" sx={{ textDecoration: "none" }}>
            <SidenavCollapse
              color="primary"
              name={route}
              Icon={icon}
              active={pathname.includes(route)}
              // active={pathname === route}
              // noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={index}>
            <SidenavCollapse
              color="primary"
              name={name}
              Icon={icon}
              active={pathname.includes(route)}
              // active={pathname === route}
              // noCollapse={noCollapse}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <Typography
            key={index}
            display="block"
            variant="body2"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{ pl: { xs: 1.5, sm: 3 }, mt: { xs: 1, sm: 1.5 }, ml: 1 }}
          >
            {title}
          </Typography>
        );
      } else if (type === "divider") {
        returnValue = <Divider light key={key} />;
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot variant="permanent" ownerState={{ transparentSidenav: false, miniSidenav }}>
      <Box pt={2.5} pb={1.5} px={4} textAlign="center" sx={{ overflow: "unset !important" }}>
        <Box
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <CloseIcon style={{ color: "white" }} />
        </Box>
        <Box component={NavLink} to="/dashboard" display="flex" alignItems="center">
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              margin: "0 auto",
              ...sidenavLogoLabel(theme, { miniSidenav }),
            })}
          >
            <Box
              display="flex"
              sx={(theme) => ({
                mr: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                ...sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
              })}
            >
              <Avatar
                alt={brandName}
                src={APP_LOGO.White500}
                sx={{ width: 35, height: 35, "&> img": { objectFit: "contain" } }}
                variant="rounded"
              />
            </Box>
            <Typography
              variant="button"
              fontSize={20}
              sx={(theme) => ({
                color: "white",
                opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
                margin: "0 auto",
                ...sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
              })}
            >
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider light />
      <List sx={{ maxHeight: "calc(100% - 140px)", overflowY: "auto" }} className="white_scrollbar">
        {renderRoutes}
      </List>
      <Box
        m={2}
        mx={2}
        mt="auto"
        // display={{ xs: "none", sm: "flex" }}
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: { pt: 1 },
          [breakpoints.only("xl")]: { pt: 1 },
          [breakpoints.down("xl")]: { pt: 1 },
        })}
      >
        <SidenavCard color={color} />
        <Box mt={2}>
          <Button
            href={RoutePath.login}
            variant="contained"
            color="light"
            fullWidth
            sx={{ borderRadius: 3 }}
            onClick={doLogout}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </SidenavRoot>
  );
};
