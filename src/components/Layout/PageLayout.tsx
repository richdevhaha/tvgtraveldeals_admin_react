import { Box, BoxProps } from "@mui/material";

type Props = {
  children: React.ReactNode;
} & BoxProps;

export const PageLayout = ({ children, sx, ...rest }: Props) => (
  <Box
    width="100vw"
    maxWidth="100%"
    height="100%"
    minHeight="100vh"
    sx={{
      overflowX: "hidden",
      // backgroundImage: tripleLinearGradient("red", appColors.gradients.cover.state, "white", 90),
      // position: "relative",
      ...sx,
    }}
    {...rest}
  >
    {children}
  </Box>
);
