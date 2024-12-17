import { useCallback, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { AppCard, AppPageTitle } from "../../components";
import { linearGradient, rgba } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { bookingSelector } from "../../redux/booking/selector";

import { fetchAllBookingAction } from "../../redux/booking/actions";
import { AnalyticsTable } from "./AnalyticsTable";

const DateFilterOption = [
  { id: "daily", name: "Daily" },
  { id: "monthly", name: "Monthly" },
  { id: "yearly", name: "Yearly" },
];

export const BookingAnalytics = () => {
  const dispatch = useDispatch();
  const { items, isLoading, isSucceeded } = useSelector(bookingSelector);
  const anchorTypeRef = useRef<HTMLDivElement>(null);
  const [isOpenType, setIsOpenType] = useState(false);
  const [barChartOption, setBarChartOption] = useState<any>({
    chart: {
      toolbar: { show: true },
    },
    tooltip: {
      style: { fontSize: "10px" },
      onDatasetHover: { highlightDataSeries: true },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: {
      title: {
        text: '$'
      }
    },
    theme: {
      palette: 'palette2',
    },
    dataLabels: { enabled: false },
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
  });
  const [barChartData, setBarChartData] = useState<any>([]);
  const [selectedTypeOption, setSelectedTypeOption] = useState(DateFilterOption[1]);
  const fetchAllBooking = useCallback(() => dispatch(fetchAllBookingAction()), [dispatch]);

  useEffect(() => {
    fetchAllBooking();
  }, []);

  useEffect(() => {
    let updatedCategories: string[] = [];
    let priceData: { [year: string]: number[] } = {};
    if (selectedTypeOption.id === "yearly" || selectedTypeOption.id === "monthly") {
      items.forEach(item => {
        const bookingDate = new Date(item.bookingDate);
        const year = bookingDate.getFullYear().toString();
        const month = bookingDate.getMonth();

        const price = +(item.adultCount * item.adultPrice + item.childCount * item.childPrice + item.infantPrice * item.infantCount + item.seniorPrice * item.seniorCount).toFixed(2);
        if (!priceData[year]) {
          priceData[year] = Array(12).fill(0);
        }
        priceData[year][month] += price;
      });
    }

    if (selectedTypeOption.id === "yearly") {
      const result = Object.keys(priceData).reduce<{ name: string, data: number[] }>((acc, year) => {
        const sum = priceData[year].reduce((total, currentValue) => total + currentValue, 0);
        acc.data.push(Math.round(sum * 100) / 100);
        return acc;
      }, { name: 'sum', data: [] });

      setBarChartData([result]);
      updatedCategories = Object.keys(priceData);
    } else if (selectedTypeOption.id === "monthly") {
      const result = Object.entries(priceData).map(([year, data]) => ({
        name: year,
        data: data.map(price => Math.round(price * 100) / 100)
      }));
      setBarChartData(result);
      updatedCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    } else {
      // Get the recent 30 days' dates
      const recent30DaysDates = getRecent30DaysDates();

      // Filter items within the last 30 days
      const filteredItems = items.filter(item => {
        const itemDate = new Date(item.bookingDate).toISOString().split('T')[0];
        return recent30DaysDates.includes(itemDate);
      });

      const dailySums: number[] = recent30DaysDates.map(date => {
        const sum = filteredItems
          .filter(item => new Date(item.bookingDate).toISOString().split('T')[0] === date)
          .reduce((acc, item) => acc + (item.adultCount * item.adultPrice + item.childCount * item.childPrice + item.infantPrice * item.infantCount + item.seniorPrice * item.seniorCount), 0);
        return Number(sum.toFixed(2));
      });
      setBarChartData([{
        name: "Booking value",
        data: dailySums
      }]);
      updatedCategories = recent30DaysDates;
    }

    setBarChartOption((prevOptions: { xaxis: any; }) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: updatedCategories,
      },
    }));
  }, [items, selectedTypeOption]);

  const getRecent30DaysDates = (): string[] => {
    const dates: string[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  /** ticket type */
  const toggleTypeGroup = () => {
    setIsOpenType((prev) => !prev);
  };

  const closeTypeGroup = (event: Event) => {
    if (anchorTypeRef.current && anchorTypeRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsOpenType(false);
  };

  const handleTypeMenuClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: any) => {
    setSelectedTypeOption(option);
    setIsOpenType(false);
  };

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
      {/* for Date filter */}
      <Popper
        open={isOpenType}
        anchorEl={anchorTypeRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "right top" : "right bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={closeTypeGroup}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {DateFilterOption.map((option: any, index) => (
                    <MenuItem
                      key={option.name}
                      selected={option.id === selectedTypeOption.id}
                      onClick={(event) => handleTypeMenuClick(event, option)}
                      sx={{ fontSize: 14 }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <AppPageTitle
        title={"Booking value"}
        rightAction={
          <>
            <ButtonGroup
              variant="contained"
              size="small"
              color="success"
              ref={anchorTypeRef}
              aria-label="destination button"
              sx={{ mr: 1 }}
            >
              <Button
                onClick={toggleTypeGroup}
                sx={{
                  "& .MuiButton-endIcon": { ml: 0, mr: -1 },
                  textTransform: "uppercase",
                  fontSize: { xs: 12, sm: 13 },
                  lineHeight: 1,
                }}
                endIcon={<ArrowDropDownIcon sx={{ width: 24, height: 24 }} />}
              >
                {selectedTypeOption.name}
              </Button>
            </ButtonGroup>
          </>
        }
      />
      <AppCard sx={{ p: { xs: 1.5, sm: 2 }, pb: { xs: 2, sm: 3 }, borderRadius: 1 }}>
        <Box
          mb={3}
          height={280}
          sx={{
            background: linearGradient(rgba("white", 0.3), rgba("white", 0.5), 180),
            borderRadius: 2,
          }}
        >
          {barChartData.length &&
            <Chart
              options={barChartOption}
              series={barChartData}
              type="bar"
              width="100%"
              height="100%"
            />
          }
        </Box>
      </AppCard>
      <AnalyticsTable
        items={items}
      />
    </Box>
  );
};
