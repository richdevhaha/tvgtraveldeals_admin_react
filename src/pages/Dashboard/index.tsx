import { useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import BuildIcon from "@mui/icons-material/Build";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HelpIcon from "@mui/icons-material/Help";
import PlaceIcon from "@mui/icons-material/Place";
import RocketIcon from "@mui/icons-material/Rocket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorageIcon from "@mui/icons-material/Storage";
import WalletIcon from "@mui/icons-material/Wallet";

import { AppCard, MiniStatisticsCard } from "../../components";
import { appColors, linearGradient, rgba } from "../../theme";
import { RoutePath } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector } from "../../redux/dashboard/selector";
import { fetchDashboardAction } from "../../redux/dashboard/actions";

const barChartDataDashboard = [
  {
    name: "Sales",
    data: [330, 250, 110, 300, 490, 350, 270, 130, 425, 270, 130, 425],
  },
];

const barChartOptionsDashboard = {
  chart: {
    toolbar: { show: false },
  },
  tooltip: {
    style: { fontSize: "10px" },
    onDatasetHover: { highlightDataSeries: true },
    // theme: "dark",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#000",
        fontSize: "10px",
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    show: true,
    color: "#000",
    labels: {
      show: true,
      style: {
        colors: "#000",
        fontSize: "10px",
      },
    },
  },
  grid: { show: true },
  fill: { colors: ["#fff"] },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      // borderRadius: 4,
      columnWidth: 16,
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: { borderRadius: 1, columnWidth: 12 },
        },
      },
    },
  ],
};

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = useCallback(() => dispatch(fetchDashboardAction()), [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const {
    isLoading,
    data: { currencyCount, destinationCount, ticketAllCount, ticketFeaturedCount, activeHelpCount, statistics },
  } = useSelector(dashboardSelector);

  return (
    <Box sx={{ mt: 0, display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2.5} xl={2}>
          <MiniStatisticsCard
            loading={isLoading}
            title="Currencies"
            count={{ value: currencyCount, color: "white" }}
            Icon={CurrencyExchangeIcon}
            bgcolor={appColors.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(RoutePath.currencies)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.5} xl={2}>
          <MiniStatisticsCard
            loading={isLoading}
            title="Destinations"
            count={{ value: destinationCount, color: "white" }}
            Icon={PlaceIcon}
            bgcolor={appColors.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(RoutePath.destination)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.5} xl={2}>
          <MiniStatisticsCard
            loading={isLoading}
            title="All Tickets"
            count={{ value: ticketAllCount, color: "white" }}
            Icon={StorageIcon}
            bgcolor={appColors.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(RoutePath.allTickets)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.5} xl={2}>
          <MiniStatisticsCard
            loading={isLoading}
            title="Featured Tickets"
            count={{ value: ticketFeaturedCount, color: "white" }}
            // percentage={{ value: "-10%", color: "red" }}
            Icon={AirplaneTicketIcon}
            bgcolor={appColors.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(RoutePath.featuredTickets)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.5} xl={2}>
          <MiniStatisticsCard
            loading={isLoading}
            title="Active Requests"
            count={{ value: activeHelpCount, color: "white" }}
            Icon={HelpIcon}
            bgcolor={appColors.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(RoutePath.HelpRequest)}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: statistics ? "flex" : "none" }}>
          <AppCard sx={{ p: { xs: 1.5, sm: 2 }, pb: { xs: 2, sm: 3 }, borderRadius: 3 }}>
            <Box>
              <Box
                mb={3}
                height={280}
                sx={{
                  background: linearGradient(rgba("white", 0.3), rgba("white", 0.5), 180),
                  borderRadius: 2,
                }}
              >
                <Chart
                  options={barChartOptionsDashboard}
                  series={barChartDataDashboard}
                  type="bar"
                  width="100%"
                  height="100%"
                />
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={6} md={3} lg={3}>
                  <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
                    <Box
                      bgcolor="info"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                    >
                      <WalletIcon style={{ color: "white", width: 20, height: 20 }} />
                    </Box>
                    <Typography color="white" variant="button" fontWeight="medium">
                      Users
                    </Typography>
                  </Stack>
                  <Typography color="white" fontWeight="bold" mb="8px">
                    32,984
                  </Typography>
                  <LinearProgress variant="determinate" value={60} color="info" sx={{ background: "#fff" }} />
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
                    <Box
                      bgcolor="info"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                    >
                      <RocketIcon style={{ color: "white", width: 20, height: 20 }} />
                    </Box>
                    <Typography color="white" variant="button" fontWeight="medium">
                      Clicks
                    </Typography>
                  </Stack>
                  <Typography color="white" fontWeight="bold" mb="8px">
                    2,42M
                  </Typography>
                  <LinearProgress variant="determinate" value={60} color="info" sx={{ background: "#fff" }} />
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
                    <Box
                      bgcolor="info"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                    >
                      <ShoppingCartIcon style={{ color: "white", width: 20, height: 20 }} />
                    </Box>
                    <Typography color="white" variant="button" fontWeight="medium">
                      Sales
                    </Typography>
                  </Stack>
                  <Typography color="white" fontWeight="bold" mb="8px">
                    2,400$
                  </Typography>
                  <LinearProgress variant="determinate" value={60} color="info" sx={{ background: "#fff" }} />
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <Stack direction="row" spacing={{ sm: "10px", xl: "4px", xxl: "10px" }} mb="6px">
                    <Box
                      bgcolor="info"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                    >
                      <BuildIcon style={{ color: "white", width: 20, height: 20 }} />
                    </Box>
                    <Typography color="white" variant="button" fontWeight="medium">
                      Tasks
                    </Typography>
                  </Stack>
                  <Typography color="white" fontWeight="bold" mb="8px">
                    320
                  </Typography>
                  <LinearProgress variant="determinate" value={60} color="info" sx={{ background: "#fff" }} />
                </Grid>
              </Grid>
            </Box>
          </AppCard>
        </Grid>
      </Grid>
    </Box>
  );
};
