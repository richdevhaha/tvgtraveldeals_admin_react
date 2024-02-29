import React from "react";
import { Typography, TypographyProps } from "@mui/material";
import { appColors, linearGradient } from "../../theme";

type Props = {
  textGradient?: boolean;
  shadowColor?: undefined | string;
  children: React.ReactNode;
  opacity?: number;
} & TypographyProps;

export const AppTypography = (props: Props) => {
  const { textGradient = false, shadowColor, opacity, children, sx, ...rest } = props;
  const { gradients } = appColors;

  return (
    <Typography
      // variant="subtitle1"
      fontWeight="medium"
      mb="10px"
      sx={{
        mb: 1,
        opacity,
        textDecoration: "none",
        letterSpacing: "8px",
        ...(textGradient && {
          backgroundImage: linearGradient(gradients.primary.main, "white", 90),
          // color !== "inherit" && color !== "text" && color !== "white" && gradients[color]
          //   ? linearGradient(gradients[color].main, gradients[color].state, gradients[color].deg)
          //   : linearGradient(gradients.primary.main, gradients.primary.state),
          display: "inline-block",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "relative",
          zIndex: 1,
        }),
        ...(shadowColor && { textShadow: `2px 2px ${shadowColor}` }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};
