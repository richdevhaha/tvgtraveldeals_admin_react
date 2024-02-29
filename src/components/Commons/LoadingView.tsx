import React from "react";
import { Backdrop, CircularProgress, SxProps, Typography } from "@mui/material";

type Props = {
  sx?: SxProps;
  visible?: boolean;
  message?: string;
} & React.HTMLProps<HTMLElement>;

export const LoadingView = ({ children, sx, visible = false, message = "" }: Props) => (
  <Backdrop sx={{ flexDirection: "column", zIndex: (theme) => theme.zIndex.drawer + 1, ...sx }} open={visible}>
    <CircularProgress color="primary" />
    {message && <Typography sx={{ color: "white", mt: 2 }}>{message}</Typography>}
  </Backdrop>
);
