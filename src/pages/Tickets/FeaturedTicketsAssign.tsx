import React, { useCallback, useEffect, useMemo, useState } from "react";
import Carousel, { Modal as ImagesModal, ModalGateway } from "react-images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  useMediaQuery,
} from "@mui/material";

import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { AppCard, AppPageTitle, AppTableCell, FlexRow, LoadingView, TicketFeaturedRowSkeleton } from "../../components";
import { ticketSelector } from "../../redux/ticket/selector";
import { assignFeatureTicketAction, fetchTicketsAction } from "../../redux/ticket/actions";
import { RoutePath } from "../../routes";
import { Formatter } from "../../utils";

export const FeaturedTicketsAssign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImageIndex, setPreviewImageIndex] = useState(-1);
  const [previewImages, setPreviewImages] = useState([""]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { items, isLoading, isSucceeded, error } = useSelector(ticketSelector);

  const fetchData = useCallback(() => dispatch(fetchTicketsAction()), [dispatch]);
  const assignItems = useCallback((ids: string[]) => dispatch(assignFeatureTicketAction(ids)), [dispatch]);

  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;
  const noFeaturedTickets = useMemo(() => items.filter((one) => !one.isFeatured), [items]);

  useEffect(() => {
    if (items.length === 0) {
      fetchData();
    }
  }, [items]);

  useEffect(() => {
    isSucceeded && setSelectedIds([]);
  }, [isSucceeded]);

  const doAssignFeaturedTicket = () => {
    assignItems(selectedIds);
  };

  const onSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelected = noFeaturedTickets.map((one) => one.id);
      setSelectedIds(newSelected);
      return;
    }
    setSelectedIds([]);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedIds.slice(0, selectedIndex), selectedIds.slice(selectedIndex + 1));
    }

    setSelectedIds(newSelected);
  };

  return (
    <Box sx={{ gap: 2, mt: 0, display: "flex", flexDirection: "column" }}>
      <LoadingView visible={isLoading} message={"Assigning featrued to selected tickets..."} />
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
      <AppPageTitle
        title="Assign Featured Ticket"
        rightAction={
          <>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ mr: 1 }}
              onClick={() => navigate(RoutePath.featuredTickets)}
            >
              {isSmallScreen ? <AirplaneTicketIcon sx={{ width: 23, height: 23 }} /> : "View Featured"}
            </Button>
            <Button
              variant="contained"
              disabled={selectedIds.length === 0}
              color="light"
              size="small"
              onClick={doAssignFeaturedTicket}
            >
              {isSmallScreen ? <AssignmentTurnedInIcon sx={{ width: 23, height: 23 }} /> : "Assign Tickets"}
            </Button>
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
          <Table sx={{ minWidth: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <AppTableCell padding="checkbox" isFirstCell>
                  <Checkbox
                    color="light"
                    sx={{ p: 0 }}
                    indeterminate={selectedIds.length > 0 && selectedIds.length < noFeaturedTickets.length}
                    checked={noFeaturedTickets.length > 0 && selectedIds.length === noFeaturedTickets.length}
                    onChange={onSelectAllClick}
                    inputProps={{ "aria-label": "select all tickets" }}
                  />
                </AppTableCell>
                <AppTableCell value="No" isTitle sx={{ width: { xs: 40, sm: 70 } }} />
                <AppTableCell value="Title" isTitle sx={{ flexGrow: 1, width: { xs: 120, sm: 200 } }} />
                <AppTableCell value="Description" isTitle />
                <AppTableCell value="Images" isTitle sx={{ width: { sm: 120, md: 140 } }} />
                <AppTableCell value="Action" isTitle align="center" sx={{ width: { sm: 60, md: 80 } }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {noFeaturedTickets.length === 0 &&
                isLoading &&
                Formatter.nArray(5).map((index) => <TicketFeaturedRowSkeleton key={index} />)}

              {noFeaturedTickets.length === 0 && !isLoading && (
                <TableRow sx={{ "&:last-child td": { border: 0, pb: 0 } }}>
                  <AppTableCell
                    value="There is no ticket to assign"
                    sx={{ py: 3 }}
                    isTitle
                    align="center"
                    colSpan={6}
                  />
                </TableRow>
              )}

              {noFeaturedTickets.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={index}
                    hover
                    onClick={(event) => handleRowClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <AppTableCell scope="row" isFirstCell padding="checkbox" isVerticalTop>
                      <Checkbox
                        color="light"
                        checked={isItemSelected}
                        sx={{ p: 0 }}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </AppTableCell>
                    <AppTableCell value={index + 1} isVerticalTop />
                    <AppTableCell value={row.title} isVerticalTop />
                    <AppTableCell value={row.description} lineCount={3} isVerticalTop />
                    <AppTableCell onClick={(e: any) => e.stopPropagation()}>
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
                    <AppTableCell align="center" onClick={(e: any) => e.stopPropagation()}>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        href={`https://staging.tvgtraveldeals.com/tickets?id=${row.id}`}
                        target="_blank"
                      >
                        {isSmallScreen ? <VisibilityIcon sx={{ width: 20, height: 20 }} /> : "View"}
                      </Button>
                    </AppTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </AppCard>
    </Box>
  );
};
