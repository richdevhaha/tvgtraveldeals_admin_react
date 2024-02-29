import { Link } from "react-router-dom";
import { Box, BoxProps, Grid, SxProps, Typography } from "@mui/material";

import { appColors } from "../../theme";
import { AppConfig } from "../../config";

type AppFooterProps = {
  children?: React.ReactNode;
  sx?: SxProps;
} & BoxProps;

export const AppFooter = ({ sx, ...rest }: AppFooterProps) => (
  <Box component="footer" sx={{ ...sx }} {...rest}>
    <Grid container rowSpacing={1} sx={{ "&  .MuiTypography-root": { lineHeight: 1 } }}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography
          component={Link}
          to="https://travelvago-asia.com"
          target="_blank"
          rel="noreferrer"
          variant="button"
          fontWeight="bold"
          color={appColors.primary.main}
          fontSize={14}
        >
          {AppConfig.COMPANY_NAME}
        </Typography>
        <Typography variant="button" color="white">
          {" "}
          {/* ❤️ */}
          &copy; {new Date().getFullYear()} All rights reserved
        </Typography>
      </Grid>
    </Grid>
  </Box>
);
