import React from "react";
import { CardProps, Typography } from "@mui/material";
import { AppCard } from "./AppCard";
import { FlexRow } from "../Commons";

type Props = {
  title: string;
  rightAction?: React.ReactNode;
  bottomChild?: React.ReactNode;
} & CardProps;

export const AppPageTitle = ({ title, children, rightAction, bottomChild, sx, ...rest }: Props) => (
  <AppCard sx={{ p: 1.5, pl: { xs: 1.5, sm: 2.5 }, flexDirection: "column", ...sx }} {...rest}>
    <FlexRow sx={{ justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6" color="white" fontWeight="bold" sx={{ fontSize: 18 }}>
        {title}
      </Typography>
      {rightAction && (
        <FlexRow
          sx={{
            display: "flex",
            alignItems: "center",
            ...(title.length == 0 && { flex: 1, justifyContent: "space-between" }),
          }}
        >
          {rightAction}
        </FlexRow>
      )}
    </FlexRow>
    {bottomChild && <FlexRow sx={{ mt: 1.5 }}>{bottomChild}</FlexRow>}
  </AppCard>
);
