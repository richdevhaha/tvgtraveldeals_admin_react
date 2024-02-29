import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Chip,
  ClickAwayListener,
  GlobalStyles,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  TicketAllRowSkeleton,
  AppCard,
  AppPageTitle,
  AppTableCell,
  ConfirmModal,
  FlexRow,
  LoadingViewInComponent,
  AppTextField,
  FlexCol,
} from "../../components";
import { SITE } from "../../config";
import { deleteTicketAction, fetchTicketsAction } from "../../redux/ticket/actions";
import { ticketSelector } from "../../redux/ticket/selector";
import { RoutePath } from "../../routes";
import { Formatter } from "../../utils";
import { appColors, rgba } from "../../theme";
import { BOOKING_TYPE, STATUS } from "../../types";

const AllTypeOption = [
  { id: "all", name: "All Ticket" },
  { id: "featured", name: "Featrued" },
  { id: "likelySell", name: "Likely Sell" },
];

const AllStatusOption = [
  { id: "all", name: "All Status" },
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
  { id: "draft", name: "Draft" },
];

const AllHomeOption = [
  { id: "all", name: "All Ticket" },
  { id: "visible", name: "Show Home" },
  { id: "invisible", name: "Other" },
];

const AllBookingOption = [
  { id: "all", name: "All Ticket" },
  { id: "affilate", name: "Affilate" },
  { id: "directly", name: "Directly" },
];

export const AllTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const isMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  /** select buttons */
  const [isOpenType, setIsOpenType] = useState(false);
  const [selectedTypeOption, setSelectedTypeOption] = useState(AllTypeOption[0]);
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [selectedStatusOption, setSelectedStatusOption] = useState(AllStatusOption[0]);
  const [isOpenHome, setIsOpenHome] = useState(false);
  const [selectedHomeOption, setSelectedHomeOption] = useState(AllHomeOption[0]);
  const [isOpenBooking, setIsOpenBooking] = useState(false);
  const [selectedBookingOption, setSelectedBookingOption] = useState(AllBookingOption[0]);

  const [selectedData, setSelectedData] = useState<null | any>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [previewImages, setPreviewImages] = useState([""]);
  const [search, setSearch] = useState("");

  /** page navigation */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const anchorTypeRef = useRef<HTMLDivElement>(null);
  const anchorHomeRef = useRef<HTMLDivElement>(null);
  const anchorStatusRef = useRef<HTMLDivElement>(null);
  const anchorBookingRef = useRef<HTMLDivElement>(null);

  const { items, total, isLoading, isSucceeded } = useSelector(ticketSelector);
  const fetchData = useCallback(() => dispatch(fetchTicketsAction()), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteTicketAction(id)), [dispatch]);

  const filteredData = useMemo(() => {
    if (
      selectedHomeOption.id === "all" &&
      selectedStatusOption.id === "all" &&
      selectedTypeOption.id === "all" &&
      selectedBookingOption.id === "all" &&
      search.length == 0
    ) {
      return items;
    }

    return items.filter((one) => {
      let isContain = true;

      switch (selectedHomeOption.id) {
        case "visible":
          isContain &&= one.isShowHome === true;
          break;
        case "invisible":
          isContain &&= one.isShowHome === false;
          break;
        default:
          break;
      }

      switch (selectedTypeOption.id) {
        case "featured":
          isContain &&= one.isFeatured === true;
          break;
        case "likelySell":
          isContain &&= one.isLikelySell === true;
          break;
        default:
          break;
      }

      switch (selectedStatusOption.id) {
        case "active":
          isContain &&= one.status === STATUS.ACTIVE;
          break;
        case "inactive":
          isContain &&= one.status === STATUS.INACTIVE;
          break;
        case "draft":
          isContain &&= one.status === STATUS.DRAFT;
          break;
        default:
          break;
      }

      switch (selectedBookingOption.id) {
        case "affilate":
          isContain &&= one.bookingType === BOOKING_TYPE.AFFILATE_LINK;
          break;
        case "directly":
          isContain &&= one.bookingType === BOOKING_TYPE.DIRECTLY;
          break;
        default:
          break;
      }

      if (search.length > 0) isContain &&= one.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());

      return isContain;
    });
  }, [items, search, selectedHomeOption, selectedTypeOption, selectedStatusOption, selectedBookingOption]);

  const emptyMsg = useMemo(() => {
    let option = "";
    if (selectedTypeOption.id === "featured") option = "featured ";
    else if (selectedTypeOption.id === "likelySell") option = "Likey Sell ";

    return `There is no ${option}ticket now`;
  }, [selectedTypeOption]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    !isLoading && isSucceeded && closeDeleteWin();
  }, [isLoading, isSucceeded]);

  useEffect(() => {
    setPage(0);
  }, [search]);

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

  /** ticket home */
  const toggleHomeGroup = () => {
    setIsOpenHome((prev) => !prev);
  };

  const closeHomeGroup = (event: Event) => {
    if (anchorHomeRef.current && anchorHomeRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsOpenHome(false);
  };

  const handleHomeMenuClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: any) => {
    setSelectedHomeOption(option);
    setIsOpenHome(false);
  };

  /** ticket status */
  const toggleStatusGroup = () => {
    setIsOpenStatus((prev) => !prev);
  };

  const closeStatusGroup = (event: Event) => {
    if (anchorStatusRef.current && anchorStatusRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsOpenStatus(false);
  };

  const handleStatusMenuClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: any) => {
    setSelectedStatusOption(option);
    setIsOpenStatus(false);
  };

  /** ticket booking */
  const toggleBookingGroup = () => {
    setIsOpenBooking((prev) => !prev);
  };

  const closeBookingGroup = (event: Event) => {
    if (anchorBookingRef.current && anchorBookingRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsOpenBooking(false);
  };

  const handleBookingMenuClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: any) => {
    setSelectedBookingOption(option);
    setIsOpenBooking(false);
  };

  /** editTicket */
  const editTicket = (id: string) => {
    navigate(`${RoutePath.editTickets}?id=${id}`);
  };

  const confirmDeleteItem = (data: any) => {
    setSelectedData(data);
    setIsDelete(true);
  };

  const closeDeleteWin = () => {
    setIsDelete(false);
    setSelectedData(null);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
      <GlobalStyles
        styles={{
          ".MuiButton-root": { px: "6px" },
          "li.Mui-selected": { backgroundColor: `${rgba(appColors.primary.main, 0.3)} !important` },
          "li.MuiMenuItem-root, li.MuiTablePagination-menuItem": { fontSize: 12 },
          ".MuiButtonGroup-root .MuiButton-root": { textTransform: "unset !important" },
        }}
      />
      {previewImageIndex > -1 && previewImages.length > 0 && (
        <ModalGateway>
          <ImagesModal onClose={() => setPreviewImageIndex(-1)}>
            <Carousel
              currentIndex={previewImageIndex}
              styles={{
                // container: (base, state) => ({ backdropFilter: "blur(7px)" }),
                headerFullscreen: (base, state) => ({ display: "none" }),
                view: (base, state) => ({
                  ...base,
                  ...state,
                  maxHeight: "95vh",
                  "&>img": { width: "auto", height: "100%", objectFit: "contain" },
                }),
              }}
              views={previewImages.map((one, index) => ({
                source: one,
                caption: `Ticket image - ${previewImageIndex + 1}`,
                alt: `Ticket image - ${previewImageIndex + 1}`,
                loading: "lazy",
              }))}
            />
          </ImagesModal>
        </ModalGateway>
      )}
      <ConfirmModal
        open={isDelete}
        title="Confirm Delete"
        description={`Would you like to delete the ticket "${selectedData?.title}"?`}
        onConfirm={() => deleteItem(selectedData?.id)}
        onClose={closeDeleteWin}
      >
        <LoadingViewInComponent visible={isLoading} sx={{ backgroundColor: "#00000080" }} />
      </ConfirmModal>

      {/* for ticket type */}
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
                  {AllTypeOption.map((option: any, index) => (
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

      {/* for ticket home */}
      <Popper
        open={isOpenHome}
        anchorEl={anchorHomeRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "right top" : "right bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={closeHomeGroup}>
                <MenuList id="split-home-button-menu" autoFocusItem>
                  {AllHomeOption.map((option: any, index) => (
                    <MenuItem
                      key={option.name}
                      selected={option.id === selectedHomeOption.id}
                      onClick={(event) => handleHomeMenuClick(event, option)}
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

      {/* for ticket status */}
      <Popper
        open={isOpenStatus}
        anchorEl={anchorStatusRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "right top" : "right bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={closeStatusGroup}>
                <MenuList id="split-status-button-menu" autoFocusItem>
                  {AllStatusOption.map((option: any, index) => (
                    <MenuItem
                      key={option.name}
                      selected={option.id === selectedStatusOption.id}
                      onClick={(event) => handleStatusMenuClick(event, option)}
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

      {/* for ticket booking type */}
      <Popper
        open={isOpenBooking}
        anchorEl={anchorBookingRef.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "right top" : "right bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={closeBookingGroup}>
                <MenuList id="split-booking-button-menu" autoFocusItem>
                  {AllBookingOption.map((option: any, index) => (
                    <MenuItem
                      key={option.name}
                      selected={option.id === selectedBookingOption.id}
                      onClick={(event) => handleBookingMenuClick(event, option)}
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
        title={isSmallScreen ? "" : `All Tickets: ${total}`}
        sx={{ "& .MuiTextField-root input": { width: 200 } }}
        rightAction={
          <>
            <AppTextField
              fullWidth={false}
              placeholder="Search ticket with title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mr: 1, display: { xs: "none", lg: "unset" } }}
            />

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

            <ButtonGroup
              variant="contained"
              size="small"
              color="warning"
              ref={anchorHomeRef}
              aria-label="home button"
              sx={{ mr: 1 }}
            >
              <Button
                onClick={toggleHomeGroup}
                sx={{
                  "& .MuiButton-endIcon": { ml: 0, mr: -1 },
                  textTransform: "uppercase",
                  fontSize: { xs: 12, sm: 13 },
                  lineHeight: 1,
                }}
                endIcon={<ArrowDropDownIcon sx={{ width: 24, height: 24 }} />}
              >
                {selectedHomeOption.name}
              </Button>
            </ButtonGroup>

            <ButtonGroup
              variant="contained"
              size="small"
              color="info"
              ref={anchorStatusRef}
              aria-label="status button"
              sx={{ mr: 1 }}
            >
              <Button
                onClick={toggleStatusGroup}
                sx={{
                  "& .MuiButton-endIcon": { ml: 0, mr: -1 },
                  textTransform: "uppercase",
                  fontSize: { xs: 12, sm: 13 },
                  lineHeight: 1,
                }}
                endIcon={<ArrowDropDownIcon sx={{ width: 24, height: 24 }} />}
              >
                {selectedStatusOption.name}
              </Button>
            </ButtonGroup>

            <ButtonGroup
              variant="contained"
              size="small"
              color="inherit"
              ref={anchorBookingRef}
              aria-label="booking type button"
              sx={{ mr: 1 }}
            >
              <Button
                onClick={toggleBookingGroup}
                sx={{
                  "& .MuiButton-endIcon": { ml: 0, mr: -1 },
                  textTransform: "uppercase",
                  fontSize: { xs: 12, sm: 13 },
                  lineHeight: 1,
                }}
                endIcon={<ArrowDropDownIcon sx={{ width: 24, height: 24 }} />}
              >
                {selectedBookingOption.name}
              </Button>
            </ButtonGroup>

            <Button
              variant="contained"
              color="light"
              size="small"
              onClick={() => navigate("/all-tickets/edit-ticket?id=new")}
              sx={{ display: { xs: "none", lg: "unset" }, textTransform: "unset" }}
            >
              {isSmallScreen ? <AddIcon sx={{ width: 23, height: 23 }} /> : "New Ticket"}
            </Button>
            {/* <Button
              variant="contained"
              color="warning"
              size="small"
              sx={{ ml: 1 }}
              onClick={() => navigate(RoutePath.destinationTickets)}
            >
              {isSmallScreen ? <AirlineStopsIcon sx={{ width: 23, height: 23 }} /> : "By Destination"}
            </Button> */}
          </>
        }
        bottomChild={
          isMdScreen && (
            <>
              <AppTextField
                fullWidth
                placeholder="Search ticket with title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                color="light"
                size="small"
                sx={{ width: { xs: 50, sm: 120 }, mr: { xs: 0, sm: 1 } }}
                onClick={() => navigate("/all-tickets/edit-ticket?id=new")}
              >
                {isSmallScreen ? <AddIcon sx={{ width: 23, height: 23 }} /> : "New Ticket"}
              </Button>
            </>
          )
        }
      />
      <AppCard
        sx={{
          p: 1,
          "& th": { borderBottom: "1px solid #ffffff80" },
          "& .MuiTableRow-root:not(:last-child)": { "& td": { borderBottom: "1px solid #ffffff30" } },
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 40, sm: 50 } }} />
                <AppTableCell value="Title" isTitle sx={{ flexGrow: 1 }} />
                <AppTableCell value="Description" isTitle />
                <AppTableCell value="Images" isTitle />
                <AppTableCell value="Is Featured" isTitle sx={{ width: 100 }} />
                <AppTableCell value="Destination" isTitle sx={{ display: { xs: "none", sm: "table-cell" } }} />
                <AppTableCell value="Price" isTitle sx={{ width: 100 }} />
                <AppTableCell value="Show Home" isTitle sx={{ width: 80 }} />
                <AppTableCell isTitle>
                  <FlexCol sx={{ alignItems: "center", ".MuiTypography-root": { fontSize: 12, fontWeight: "bold" } }}>
                    <Typography>STATUS /</Typography>
                    <Typography>BookingType</Typography>
                  </FlexCol>
                </AppTableCell>
                <AppTableCell value="Action" isTitle align="center" />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 &&
                isLoading &&
                Formatter.nArray(5).map((index) => <TicketAllRowSkeleton key={index} />)}

              {filteredData.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value={emptyMsg} sx={{ py: 3 }} isTitle align="center" colSpan={8} />
                </TableRow>
              )}
              {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={page * rowsPerPage + index + 1} isFirstCell isVerticalTop />
                  <AppTableCell value={row.title} isVerticalTop />
                  <AppTableCell value={row.description} lineCount={3} isVerticalTop />
                  <AppTableCell>
                    {row.images && row.images.length > 0 && (
                      <FlexRow sx={{ display: "flex", flexDirection: "row" }}>
                        <AvatarGroup
                          max={4}
                          total={row.images.length}
                          sx={{ ".MuiAvatar-root": { fontSize: 14, borderWidth: 0, color: "black !important" } }}
                        >
                          {row.images.map((one, index) => (
                            <Avatar
                              key={index}
                              src={one}
                              alt="name"
                              variant="rounded"
                              sx={{ cursor: "pointer", borderRadius: 2.5 }}
                              onClick={() => {
                                setPreviewImages(row.images);
                                setPreviewImageIndex(index);
                              }}
                            />
                          ))}
                        </AvatarGroup>
                      </FlexRow>
                    )}
                  </AppTableCell>
                  <AppTableCell value={row.isFeatured ? "Featured" : ""} isVerticalTop />
                  <AppTableCell
                    value={row.destination?.name}
                    isVerticalTop
                    sx={{ display: { xs: "none", sm: "table-cell" } }}
                  />
                  <AppTableCell value={`${row.currency?.symbol}${row.price}`} isVerticalTop />
                  <AppTableCell
                    value={`${row.isShowHome ? "Yes" : "No"}`}
                    isVerticalTop
                    sx={{ color: row.isShowHome ? "white" : "yellow" }}
                  />
                  <AppTableCell isVerticalTop>
                    <FlexCol sx={{ alignItems: "center" }}>
                      <Typography
                        sx={{
                          fontSize: { xs: 12, sm: 14 },
                          color:
                            row.status == STATUS.ACTIVE ? "white" : row.status == STATUS.INACTIVE ? "yellow" : "red",
                          ":first-letter": { textTransform: "uppercase" },
                        }}
                      >
                        {row.status}
                      </Typography>
                      <Chip
                        label={row.bookingType === BOOKING_TYPE.AFFILATE_LINK ? "Affilate" : "Derectly"}
                        variant="filled"
                        color={row.bookingType === BOOKING_TYPE.AFFILATE_LINK ? "info" : "error"}
                        sx={{ height: 20, borderRadius: 1 }}
                      />
                    </FlexCol>
                  </AppTableCell>
                  <AppTableCell align="center">
                    <Box sx={{ display: "flex", gap: { xs: 0.4, sm: 0.8 }, width: { xs: 100, sm: "auto" } }}>
                      <Button variant="contained" color="success" size="small" onClick={() => editTicket(row.id)}>
                        <EditIcon sx={{ width: 20, height: 20 }} />
                      </Button>
                      {row.status === STATUS.ACTIVE && (
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          href={`${SITE.WEB}/tickets/${row.uri}`}
                          target="_blank"
                        >
                          <VisibilityIcon sx={{ width: 20, height: 20 }} />
                        </Button>
                      )}
                      <Button variant="contained" color="error" size="small" onClick={() => confirmDeleteItem(row)}>
                        <DeleteIcon sx={{ width: 20, height: 20 }} />
                      </Button>
                      {/* <Button variant="outlined" color="light" size="small">
                        {row.status === STATUS.ACTIVE ? "Inactive" : "Active"}
                      </Button> */}
                    </Box>
                  </AppTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={isSmallScreen ? "Rows/page:" : "Rows per page:"}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            mb: { xs: 4, sm: 0 },
            color: "white",
            ".MuiSvgIcon-root": { fill: "white !important" },
            ".Mui-disabled .MuiSvgIcon-root": { fill: "#00000050 !important" },
          }}
          showFirstButton={!isSmallScreen}
          showLastButton={!isSmallScreen}
        />
      </AppCard>
    </Box>
  );
};
