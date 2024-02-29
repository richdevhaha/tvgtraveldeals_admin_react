import { Box, CardProps, Grid, Typography } from "@mui/material";
import { appColors } from "../theme";
import { AppCard } from "./CustomMUI";
import { TextSkeleton } from "./Skeleton";

type Props = {
  loading?: boolean;
  title: string;
  count: { value: number; color: string };
  percentage?: { value: string; color: string };
  // Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  Icon: React.ElementType;
  bgcolor: string;
} & CardProps;

export const MiniStatisticsCard = ({
  loading = false,
  title,
  count,
  percentage,
  Icon,
  bgcolor,
  sx,
  ...rest
}: Props) => (
  <AppCard sx={{ pl: 2.5, p: 2, borderRadius: 3, ...sx }} {...rest}>
    <Grid container alignItems="center">
      <Grid item xs={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            "& > .MuiTypography-root": { lineHeight: 1 },
          }}
        >
          <Typography
            variant="body2"
            color="white"
            textTransform="capitalize"
            sx={{
              fontWeight: "bold",
              // textOverflow: "ellipsis",
              // whiteSpace: "nowrap",
              // overflow: "hidden",
            }}
          >
            {title}
          </Typography>

          <Typography fontWeight="bold" color={count.color} sx={{ fontSize: 35, mt: 1 }}>
            <TextSkeleton visible={loading} sx={{ height: 35, width: 50 }} />
            {!loading && count.value}
            {!loading && percentage && (
              <Typography variant="button" color={percentage.color} fontWeight="bold" sx={{ px: 1 }}>
                {percentage.value}
              </Typography>
            )}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box
          bgcolor={appColors.customBackground.bgcolor}
          width={50}
          height={50}
          marginLeft="auto"
          borderRadius={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon fontSize="large" color="primary" />
        </Box>
      </Grid>
    </Grid>
  </AppCard>
);
