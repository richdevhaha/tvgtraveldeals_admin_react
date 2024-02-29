import Box, { BoxProps } from "@mui/material/Box";
import { ReactNode } from "react";

type Props = {
  backgroundImage: string;
  children: ReactNode;
} & BoxProps;

export const GradientBorder = (props: Props) => {
  const { backgroundImage, children, borderRadius, ...rest } = props;
  return (
    <Box
      padding="2px"
      borderRadius={borderRadius}
      sx={{
        width: "fit-content",
        height: "fit-content",
        // backgroundImage: "radial-gradient(69.43% 69.43% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)  ",

        backgroundImage: backgroundImage
          ? backgroundImage
          : "radial-gradient(94.43% 69.43% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
