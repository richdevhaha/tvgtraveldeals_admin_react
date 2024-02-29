import React from "react";
import { Skeleton, Stack, Typography } from "@mui/material";

export const EmptySkeleton = () => (
  <Stack spacing={1} sx={{ my: 2, p: 2, borderRadius: 4 }} bgcolor="background.paper">
    <Stack direction="row" sx={{}}>
      <Skeleton variant="circular" animation="wave" width={40} height={40} sx={{ opacity: 0.4, flexShrink: 0 }} />
      <Typography variant="h4" sx={{ opacity: 0.4, width: "30%", ml: 1 }}>
        <Skeleton variant="text" animation="wave" />
      </Typography>
      <Typography variant="h4" sx={{ opacity: 0.4, width: "10%", ml: "auto" }}>
        <Skeleton variant="text" animation="wave" />
      </Typography>
    </Stack>
    <Typography variant="h4">
      <Skeleton variant="text" animation="wave" sx={{ opacity: 0.4 }} />
    </Typography>
    <Skeleton variant="rectangular" animation="wave" height={200} sx={{ opacity: 0.4, borderRadius: 2 }} />
    <Typography variant="h4" sx={{ opacity: 0.4, width: "100%" }}>
      <Skeleton variant="text" animation="wave" />
    </Typography>
  </Stack>
);
