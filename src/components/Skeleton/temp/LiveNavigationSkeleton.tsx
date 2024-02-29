import { Skeleton, Stack, Typography } from "@mui/material";

export const LiveNavigationSkeleton = () => (
  <Stack spacing={1} direction="row" sx={{ my: 1, ml: 1.5, alignItems: "center" }}>
    <Skeleton variant="circular" animation="wave" width={36} height={36} sx={{ opacity: 1 }} />
    <Typography variant="h4" sx={{ opacity: 0.4, flex: 1, ml: 1 }}>
      <Skeleton variant="text" animation="wave" sx={{ opacity: 1 }} />
    </Typography>
  </Stack>
);
