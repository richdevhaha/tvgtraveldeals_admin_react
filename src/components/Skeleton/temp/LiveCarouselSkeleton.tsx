import { Skeleton, Stack } from "@mui/material";

export const LiveCarouselSkeleton = () => (
  <Stack
    spacing={1}
    direction="row"
    sx={{ alignItems: "center", width: "100%", height: undefined, aspectRatio: "1185/371" }}
  >
    <Skeleton
      variant="rectangular"
      animation="wave"
      sx={{ opacity: 0.4, width: "100%", height: "100%", flexShrink: 0, backgroundColor: "background.paper" }}
    />
  </Stack>
);
