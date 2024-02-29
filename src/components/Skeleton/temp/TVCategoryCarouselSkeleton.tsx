import { Skeleton, Stack, Typography } from "@mui/material";

export const TVCategoryCarouselSkeleton = () => (
  <Stack spacing={1} direction="column" sx={{ width: "100%", px: 4, mt: 2 }}>
    <Typography variant="h3" sx={{ opacity: 0.4, my: 1, width: { xs: "100%", md: 150 } }}>
      <Skeleton variant="text" animation="wave" sx={{ backgroundColor: "background.paper" }} />
    </Typography>
    <Stack direction="row">
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          opacity: 0.4,
          backgroundColor: "background.paper",
          width: { xs: 164, md: 200 },
          minWidth: { xs: 164, md: 200 },
          height: { xs: 92, md: 112 },
          borderRadius: { xs: 2, md: 2.5 },
          mr: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          opacity: 0.4,
          backgroundColor: "background.paper",
          width: { xs: 164, md: 200 },
          minWidth: { xs: 164, md: 200 },
          height: { xs: 92, md: 112 },
          borderRadius: { xs: 2, md: 2.5 },
          mr: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          opacity: 0.4,
          width: { xs: 164, md: 200 },
          backgroundColor: "background.paper",
          minWidth: { xs: 164, md: 200 },
          height: { xs: 92, md: 112 },
          borderRadius: { xs: 2, md: 2.5 },
          mr: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          opacity: 0.4,
          backgroundColor: "background.paper",
          width: { xs: 164, md: 200 },
          minWidth: { xs: 164, md: 200 },
          height: { xs: 92, md: 112 },
          borderRadius: { xs: 2, md: 2.5 },
          mr: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          opacity: 0.4,
          backgroundColor: "background.paper",
          width: { xs: 164, md: 200 },
          minWidth: { xs: 164, md: 200 },
          height: { xs: 92, md: 112 },
          borderRadius: { xs: 2, md: 2.5 },
          mr: 1,
        }}
      />
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{
          opacity: 0.4,
          backgroundColor: "background.paper",
          width: { xs: 164, md: 200 },
          minWidth: { xs: 164, md: 200 },
          height: { xs: 92, md: 112 },
          borderRadius: { xs: 2, md: 2.5 },
          mr: 1,
        }}
      />
    </Stack>
  </Stack>
);
