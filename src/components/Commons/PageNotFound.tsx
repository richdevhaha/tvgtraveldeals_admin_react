import React from "react";
import { Typography } from "@mui/material";
import { FlexCol } from "./FlexCol";

export const PageNotFound = () => (
  <FlexCol sx={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }}>
    <Typography variant="h5">Page Not Found.</Typography>
  </FlexCol>
);
