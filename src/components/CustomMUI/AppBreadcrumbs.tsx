import React from "react";
import { Link } from "react-router-dom";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { appColors } from "../../theme";
import { RoutePath } from "../../routes";

type Props = {
  Icon: React.ElementType;
  title: string;
  route: string[];
  light?: boolean;
};

export const AppBreadcrumbs = ({ Icon, title, route, light = false }: Props) => {
  const routes = route.slice(0, -1);

  return (
    <Box mr={{ xs: 0, xl: 8 }}>
      <Breadcrumbs sx={{ "& .MuiBreadcrumbs-separator": { color: light ? "white" : "grey" } }}>
        <Link to={RoutePath.dashboard}>
          <Icon
            style={{
              width: 24,
              height: 24,
              color: light ? appColors.primary.main : "white",
              opacity: light ? 0.8 : 0.5,
              verticalAlign: "top",
            }}
          />
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <Typography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              sx={{ lineHeight: 0, opacity: light ? 0.8 : 0.5 }}
            >
              {el.replaceAll("-", " ")}
            </Typography>
          </Link>
        ))}
        <Typography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replaceAll("-", " ")}
        </Typography>
      </Breadcrumbs>
      {/* <Typography fontWeight="bold" textTransform="capitalize" variant="h6" color={light ? "white" : "dark"} noWrap>
        {title.replaceAll("-", " ")}
      </Typography> */}
    </Box>
  );
};
