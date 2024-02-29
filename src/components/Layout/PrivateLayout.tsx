import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { DashboardNavbar } from "../Navbars";
import { ScrollTop } from "../ScrollTop";
import { Sidenav } from "../Sidenav";
import { AppConfig } from "../../config";
import { authSelector } from "../../redux/auth/selector";
import { syncUserAction } from "../../redux/auth/actions";
import { sideNavSelector } from "../../redux/ui/selector";
import { setLayoutAction, setMiniSidenavAction } from "../../redux/ui/actions";
import { PrivateRoutes, RoutePath } from "../../routes";

export const PrivateLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, authorizing } = useSelector(authSelector);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { miniSidenav } = useSelector(sideNavSelector);

  const syncUser = useCallback(() => dispatch(syncUserAction()), [dispatch]);

  useEffect(() => {
    dispatch(setLayoutAction(pathname));
  }, [dispatch, pathname]);

  useEffect(() => {
    if (!isLoggedIn) navigate(RoutePath.login);

    if (isLoggedIn && !authorizing) {
      syncUser();
    }
  }, [isLoggedIn, authorizing, syncUser]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch(setMiniSidenavAction(false));
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch(setMiniSidenavAction(true));
      setOnMouseEnter(false);
    }
  };

  return (
    <Box>
      <Sidenav
        color="error"
        brandName={AppConfig.APP_NAME_SHORT}
        routes={PrivateRoutes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Box
        id="back-to-top-anchor"
        sx={(theme) => ({
          p: { xs: 1.5, sm: 2.5 },
          position: "relative",
          [theme.breakpoints.up("xl")]: {
            marginLeft: (miniSidenav ? 120 : AppConfig.SIDEBAR_WIDTH + 8) / 8,
            transition: theme.transitions.create(["margin-left", "margin-right"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
          },
        })}
      >
        <DashboardNavbar />
        <Box
          sx={{
            mt: 1,
            minHeight: { xs: "calc(100vh - 107px)", sm: "calc(100vh - 123px)", md: "calc(100vh - 123px)" },
          }}
        >
          <Outlet />
        </Box>
        {/* <AppFooter pt={{ xs: 2, sm: 4 }} /> */}
      </Box>
      <ScrollTop />
    </Box>
  );
};
