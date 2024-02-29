import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useLocation, useNavigate } from "react-router-dom";
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
  TableRow,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  AppCard,
  AppPageTitle,
  AppTableCell,
  AppTextField,
  ConfirmModal,
  FlexCol,
  FlexRow,
  LoadingViewInComponent,
  TicketDestinationRowSkeleton,
} from "../../components";
import { SITE } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { ticketSelector } from "../../redux/ticket/selector";
import { deleteTicketAction, fetchTicketsAction } from "../../redux/ticket/actions";
import { destinationSelector } from "../../redux/destination/selector";
import { fetchDestinationsAction } from "../../redux/destination/actions";
import { Formatter } from "../../utils";
import { BOOKING_TYPE, STATUS } from "../../types";

const allOption = { id: "all", name: "All Destination" };

export const DestinationTickets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const anchorRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [previewImages, setPreviewImages] = useState([""]);
  const [selectedData, setSelectedData] = useState<null | any>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(allOption);
  const [search, setSearch] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const idVal = queryParams.get("id");

  const { items: destinations, isSucceeded: dSuccess } = useSelector(destinationSelector);
  const { items, isLoading, isSucceeded } = useSelector(ticketSelector);

  const fetchTickets = useCallback(() => dispatch(fetchTicketsAction()), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteTicketAction(id)), [dispatch]);
  const fetchDestination = useCallback(() => dispatch(fetchDestinationsAction()), [dispatch]);

  const allDestination = useMemo(() => [allOption, ...destinations], [destinations]);

  const filteredTickets = useMemo(() => {
    let data = [];
    if (selectedDestination.id === allOption.id) data = items;
    else data = items.filter((one) => one.destination.id === selectedDestination.id);

    return search.length == 0
      ? data
      : data.filter((one) => one.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [items, selectedDestination, search]);

  useEffect(() => {
    fetchTickets();
    fetchDestination();
  }, []);

  useEffect(() => {
    if (destinations.length === 0 && !dSuccess) {
      fetchDestination();
    }
  }, [destinations, dSuccess]);

  useEffect(() => {
    if (items.length === 0 && !isSucceeded) {
      fetchTickets();
    }
  }, [items, isSucceeded]);

  useEffect(() => {
    if (idVal) {
      const des = destinations.find((one) => one.id === idVal);
      // setSelectedDestinationIndex(itemIndex > -1 ? itemIndex + 1 : 0);
      !!des && setSelectedDestination(des);
    }
  }, [location, idVal]);

  useEffect(() => {
    !isLoading && isSucceeded && closeDeleteWin();
  }, [isLoading, isSucceeded]);

  const editTicket = (id: string) => {
    navigate("/all-tickets/edit-ticket?id=" + id);
  };

  const confirmDeleteItem = (data: any) => {
    setSelectedData(data);
    setIsDelete(true);
  };

  const closeDeleteWin = () => {
    setIsDelete(false);
    setSelectedData(null);
  };

  const toggleDestination = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  const closeDestination = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setIsOpen(false);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, option: any) => {
    setSelectedDestination(option);
    setIsOpen(false);
  };

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
      <GlobalStyles styles={{ ".MuiButtonGroup-root .MuiButton-root": { textTransform: "unset !important" } }} />
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

      <Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal sx={{ zIndex: 1 }}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "right top" : "right bottom" }}>
            <Paper>
              <ClickAwayListener onClickAway={closeDestination}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {allDestination.map((option: any, index) => (
                    <MenuItem
                      key={option.name}
                      selected={option.id === selectedDestination.id}
                      onClick={(event) => handleMenuItemClick(event, option)}
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
        title={isSmallScreen ? "" : `Destination Tickets`}
        sx={{ "& .MuiTextField-root input": { width: 200 } }}
        rightAction={
          <>
            <AppTextField
              fullWidth={false}
              placeholder="Search ticket with title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mr: 1, display: { xs: "none", md: "unset" } }}
            />

            <ButtonGroup
              variant="contained"
              size="small"
              color="success"
              ref={anchorRef}
              aria-label="destination button"
              sx={{ mr: 1 }}
            >
              <Button
                onClick={toggleDestination}
                sx={{ "& .MuiButton-endIcon": { ml: 0, mr: -1 }, textTransform: "uppercase" }}
                endIcon={<ArrowDropDownIcon sx={{ width: 24, height: 24 }} />}
              >
                {selectedDestination.name}
              </Button>
            </ButtonGroup>

            <Button
              variant="contained"
              color="light"
              size="small"
              sx={{ textTransform: "unset" }}
              onClick={() => navigate("/all-tickets/edit-ticket?id=new")}
            >
              {isSmallScreen ? <AddIcon sx={{ width: 23, height: 23 }} /> : "New Ticket"}
            </Button>
          </>
        }
        bottomChild={
          isSmallScreen && (
            <AppTextField
              fullWidth
              placeholder="Search ticket with title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ display: { xs: "unset", md: "none" } }}
            />
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
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <AppTableCell value="No" isTitle isFirstCell sx={{ width: { xs: 40, sm: 70 } }} />
                <AppTableCell value="Title" isTitle sx={{ flexGrow: 1, width: { xs: 150, sm: 200 } }} />
                <AppTableCell value="Description" isTitle />
                <AppTableCell value="Images" isTitle />
                <AppTableCell value="Destination" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Price" isTitle sx={{ width: { sm: 80, md: 100 } }} />
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
              {filteredTickets.length === 0 &&
                isLoading &&
                Formatter.nArray(5).map((index) => <TicketDestinationRowSkeleton key={index} />)}

              {filteredTickets.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value="There is no ticket now" sx={{ py: 3 }} isTitle align="center" colSpan={6} />
                </TableRow>
              )}
              {filteredTickets.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <AppTableCell scope="row" value={index + 1} isFirstCell isVerticalTop />
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
                              sx={{ cursor: "pointer" }}
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
                  <AppTableCell value={row.destination?.name} lineCount={3} isVerticalTop />
                  <AppTableCell value={`${row.currency?.symbol}${row.price}`} isVerticalTop />
                  <AppTableCell isVerticalTop>
                    <FlexCol sx={{ alignItems: "center" }}>
                      <Typography
                        sx={{
                          color:
                            row.status == STATUS.ACTIVE ? "white" : row.status == STATUS.INACTIVE ? "yellow" : "red",
                          fontSize: { xs: 12, sm: 14 },
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
                    <Box sx={{ display: "flex", justifyContent: "start", gap: 1 }}>
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
                    </Box>
                  </AppTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AppCard>
    </Box>
  );
};
