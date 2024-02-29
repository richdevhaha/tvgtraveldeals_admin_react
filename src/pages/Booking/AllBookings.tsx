import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, ButtonGroup, ClickAwayListener, GlobalStyles, Grow, MenuItem, MenuList, Paper, Popper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { AppCard, AppPageTitle, AppTableCell, AppTextField } from "../../components";
import { bookingSelector } from "../../redux/booking/selector";
import { fetchAllBookingAction } from "../../redux/booking/actions";
import { SITE } from "../../config";

export const AllBookings = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const anchorRef = useRef<HTMLDivElement>(null);
  const emptyMsg = "There is no booking now"

  const { items, isLoading, isSucceeded } = useSelector(bookingSelector);
  const fetchAllBooking = useCallback(() => dispatch(fetchAllBookingAction()), [dispatch]);

  const filteredData = useMemo(() => {
    if (search.length > 0) {
      return items.filter((one) => {
        let isContain = true;  
        if (search.length > 0) isContain &&= one.id.toLocaleLowerCase().includes(search.toLocaleLowerCase());  
        return isContain;
      });
    } else {
      return items;
    }    
  }, [items, search])
  
  useEffect(() => {
    fetchAllBooking();
  }, []);

  const formatDate = (inputDateString: string) => {
    const inputDate = new Date(inputDateString);

    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);

    return formattedDate;
  };

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
      <GlobalStyles styles={{ ".MuiButton-root": { px: "6px" } }} />
      <AppPageTitle
        title={"All Bookings"}
        rightAction={
          <>
            <AppTextField
              fullWidth={true}
              placeholder="Search booking by 'BOOKING ID'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mr: 1, width: { xs: "200px", md: "300px" } }}
            />
          </>
        }
      />
      <AppCard
        sx={{
          "& th": { borderBottom: "1px solid #ffffff80" },
          "& .MuiTableRow-root:not(:last-child)": { "& td": { borderBottom: "1px solid #ffffff30" } },
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 30, sm: 50 } }} />
                <AppTableCell value="Booking ID" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Ticket Title" isTitle sx={{ width: { sm: 150, md: 200 } }} />
                <AppTableCell value="Email" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Name" isTitle sx={{ width: { sm: 140, md: 160 } }} />
                <AppTableCell value="Date" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Adult" isTitle sx={{ width: { sm: 40, md: 60 } }} />
                <AppTableCell value="Child" isTitle sx={{ width: { sm: 40, md: 60 } }} />
                <AppTableCell value="Senior" isTitle sx={{ width: { sm: 40, md: 60 } }} />
                <AppTableCell value="Infant" isTitle sx={{ width: { sm: 40, md: 60 } }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value={emptyMsg} sx={{ py: 3 }} isTitle align="center" colSpan={8} />
                </TableRow>
              )}
              {filteredData.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={index + 1} isFirstCell isVerticalTop />
                  <AppTableCell value={row.id} isVerticalTop />
                  <AppTableCell value={row.ticketTitle} isVerticalTop />
                  <AppTableCell value={row.email} isVerticalTop />
                  <AppTableCell value={`${row.firstName} ${row.lastName}`} isVerticalTop />
                  <AppTableCell value={formatDate(row.bookingDate)} isVerticalTop />
                  <AppTableCell value={row.adultCount} isVerticalTop align="center"/>
                  <AppTableCell value={row.childCount} isVerticalTop align="center"/>
                  <AppTableCell value={row.seniorCount} isVerticalTop align="center"/>
                  <AppTableCell value={row.infantCount} isVerticalTop align="center"/>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppCard>
    </Box>
  )
}