import { Skeleton, Typography } from "@mui/material";

export const TypographySkeleton = ({ width = 100 }: { width?: number }) => (
  <Typography variant="h4" sx={{ width: `${width}%` }}>
    <Skeleton variant="text" animation="wave" />
  </Typography>
);
