import { useCallback, useEffect, useMemo, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
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
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  AppCard,
  AppPageTitle,
  AppTableCell,
  AppTextField,
  ConfirmModal,
  FlexCol,
  FlexRow,
  LoadingViewInComponent,
  TicketFeaturedRowSkeleton,
} from "../../components";
import { SITE } from "../../config";
import { RoutePath } from "../../routes";
import { ticketSelector } from "../../redux/ticket/selector";
import { deleteTicketAction, fetchTicketsAction } from "../../redux/ticket/actions";
import { Formatter } from "../../utils";
import { BOOKING_TYPE, STATUS } from "../../types";

export const FeaturedTickets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [selectedData, setSelectedData] = useState<null | any>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [previewImages, setPreviewImages] = useState([""]);
  const [search, setSearch] = useState("");

  const { items, isLoading, isSucceeded } = useSelector(ticketSelector);
  const fetchData = useCallback(() => dispatch(fetchTicketsAction()), [dispatch]);
  const deleteItem = useCallback((id: string) => dispatch(deleteTicketAction(id)), [dispatch]);

  const filteredTickets = useMemo(() => {
    const data = items.filter((one) => one.isFeatured);

    return search.length == 0
      ? data
      : data.filter((one) => one.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }, [items, search]);

  useEffect(() => {
    if (items.length === 0 && !isSucceeded) {
      fetchData();
    }
  }, [items, isSucceeded]);

  useEffect(() => {
    !isLoading && isSucceeded && closeDeleteWin();
  }, [isLoading, isSucceeded]);

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

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
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
      <AppPageTitle
        title="Featured Tickets"
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
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ mr: 1, textTransform: "unset" }}
              onClick={() => navigate(RoutePath.featuredTicketsAssign)}
            >
              {isSmallScreen ? <AssignmentTurnedInIcon sx={{ width: 23, height: 23 }} /> : "Assign Featured Ticket"}
            </Button>
            <Button
              variant="contained"
              color="light"
              size="small"
              sx={{ textTransform: "unset" }}
              onClick={() => navigate(RoutePath.editTickets)}
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
                <AppTableCell value="Title" isTitle sx={{ flexGrow: 1, width: { xs: 120, sm: 200 } }} />
                <AppTableCell value="Description" isTitle />
                <AppTableCell value="Images" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Price" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell isTitle>
                  <FlexCol sx={{ alignItems: "center", ".MuiTypography-root": { fontSize: 12, fontWeight: "bold" } }}>
                    <Typography>STATUS /</Typography>
                    <Typography>BookingType</Typography>
                  </FlexCol>
                </AppTableCell>
                <AppTableCell value="Action" isTitle align="center" sx={{ width: { sm: 120, md: 180 } }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.length === 0 &&
                isLoading &&
                Formatter.nArray(5).map((index) => <TicketFeaturedRowSkeleton key={index} />)}

              {filteredTickets.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell value="There is no featured ticket" sx={{ py: 3 }} isTitle align="center" colSpan={6} />
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
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
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
