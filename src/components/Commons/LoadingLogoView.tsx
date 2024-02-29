import { Avatar, Backdrop, CircularProgress, SxProps } from "@mui/material";

import { APP_LOGO, AppConfig } from "../../config";
import { appColors, rgba } from "../../theme";

interface Props {
  variant?: "white" | "primary";
  visible?: boolean;
  sx?: SxProps;
}

export const LoadingLogoView = ({ variant = "primary", sx, visible = true }: Props) => (
  <Backdrop
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      bgcolor: variant === "primary" ? rgba(appColors.primary.main, 0.5) : "#ffffff80",
      ...sx,
    }}
    open={visible}
  >
    <CircularProgress
      color="primary"
      size={165}
      thickness={0.8}
      sx={{ color: variant === "primary" ? "white" : appColors.primary.main }}
    />
    <Avatar
      alt={AppConfig.APP_NAME}
      src={variant === "primary" ? APP_LOGO.White500 : APP_LOGO.Green500}
      sx={{ height: 130, width: 130, p: 1, position: "absolute", "&> img": { objectFit: "contain" } }}
      variant="square"
    />
  </Backdrop>
);
