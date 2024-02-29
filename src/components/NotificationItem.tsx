import React from "react";
import { Box, MenuItem, MenuItemProps, Typography } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

import { appColors, linearGradient } from "../theme";
import { ThemeColorType } from "../types";

type Props = {
  color?: string;
  image: React.ReactNode;
  message: string[];
  date: string;
} & MenuItemProps;

export const NotificationItem = React.forwardRef<HTMLLIElement, Props>((props, ref) => {
  const { color, image, message, date, sx, ...rest } = props;
  const { gradients } = appColors;
  return (
    <MenuItem
      ref={ref}
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        width: "100%",
        px: 2,
        color: "primary",
        transition: theme.transitions.create("background-color", {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),

        // "&:not(:last-child)": { mb: 1.25 },
        "&:hover": { backgroundColor: appColors.customBackground.main },
        ...(sx && { sx }),
      })}
      {...rest}
    >
      <Box
        width="2.25rem"
        height="2.25rem"
        mt={0.25}
        mr={2}
        mb={0.25}
        sx={{
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          backgroundImage: gradients[color as ThemeColorType]
            ? linearGradient(gradients[color as ThemeColorType].main, gradients[color as ThemeColorType].state)
            : linearGradient(gradients.light.main, gradients.light.state),
          "& img": { width: "100%", borderRadius: 2 },
        }}
      >
        {image}
      </Box>
      <Box>
        <Typography variant="button" textTransform="capitalize" fontWeight="regular">
          <strong>{message[0]}</strong> {message[1]}
        </Typography>
        <Typography variant="caption" sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="button" color="text">
            <WatchLaterIcon sx={{ lineHeight: 1.2, mr: 0.5, mt: 0.4 }} fontSize="small" />
          </Typography>
          {date}
        </Typography>
      </Box>
    </MenuItem>
  );
});
