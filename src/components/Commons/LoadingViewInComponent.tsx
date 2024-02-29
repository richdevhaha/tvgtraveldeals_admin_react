import React from "react";
import { CircularProgress, SxProps, Theme } from "@mui/material";
import { FlexCol } from "./FlexCol";

type Props = {
  sx?: SxProps;
  visible?: boolean;
} & React.HTMLProps<HTMLElement>;

export const LoadingViewInComponent = ({ children, sx, visible = false }: Props) => {
  if (!visible) return null;
  return (
    <FlexCol
      sx={{
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        ...sx,
      }}
    >
      <CircularProgress size={34} color="primary" />
    </FlexCol>
  );
};
